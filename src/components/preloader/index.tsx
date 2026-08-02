"use client";
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useRef,
  useCallback,
} from "react";
import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

import Loader from "./loader";
import { usePerfProfile } from "@/hooks/use-perf-profile";

type ReadyKey = "fonts" | "hero-scene" | "min-time";

type PreloaderContextType = {
  isLoading: boolean;
  loadingPercent: number;
  bypassLoading: () => void;
  /** Call when a critical asset is ready (e.g. Spline scene). */
  markReady: (key: ReadyKey) => void;
};

const INITIAL: PreloaderContextType = {
  isLoading: true,
  loadingPercent: 0,
  bypassLoading: () => {},
  markReady: () => {},
};

export const preloaderContext = createContext<PreloaderContextType>(INITIAL);

type PreloaderProps = {
  children: ReactNode;
  disabled?: boolean;
};

export const usePreloader = () => {
  const context = useContext(preloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};

const MIN_MS = 2200;
const FAILSAFE_MS = 12000;
const EXIT_HOLD_MS = 400; // stay on 100% briefly so it reads clearly

function Preloader({ children, disabled = false }: PreloaderProps) {
  const pathname = usePathname();
  const skip = disabled || pathname?.startsWith("/resume");

  const [isLoading, setIsLoading] = useState(!skip);
  const [loadingPercent, setLoadingPercent] = useState(skip ? 100 : 0);
  const readyRef = useRef<Record<ReadyKey, boolean>>({
    fonts: false,
    "hero-scene": false,
    "min-time": false,
  });
  const finishingRef = useRef(false);

  const { ready: perfReady, isMobile, disable3D } = usePerfProfile();

  const finish = useCallback(() => {
    if (finishingRef.current || skip) return;
    finishingRef.current = true;
    setLoadingPercent(100);
    window.setTimeout(() => setIsLoading(false), EXIT_HOLD_MS);
  }, [skip]);

  const tryFinish = useCallback(() => {
    const r = readyRef.current;
    if (r.fonts && r["hero-scene"] && r["min-time"]) {
      finish();
    }
  }, [finish]);

  const markReady = useCallback(
    (key: ReadyKey) => {
      if (readyRef.current[key]) return;
      readyRef.current[key] = true;

      const done = Object.values(readyRef.current).filter(Boolean).length;
      // Climb toward 95% as gates clear; 100% only on finish.
      setLoadingPercent((p) => Math.max(p, Math.min(95, done * 30)));
      tryFinish();
    },
    [tryFinish],
  );

  const bypassLoading = useCallback(() => {
    readyRef.current = { fonts: true, "hero-scene": true, "min-time": true };
    finish();
  }, [finish]);

  // Minimum splash time so 100% feels intentional.
  useEffect(() => {
    if (skip) return;
    const id = window.setTimeout(() => markReady("min-time"), MIN_MS);
    return () => window.clearTimeout(id);
  }, [skip, markReady]);

  // Fonts
  useEffect(() => {
    if (skip) return;
    const done = () => markReady("fonts");
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(done).catch(done);
    } else {
      done();
    }
  }, [skip, markReady]);

  // No 3D on mobile / reduced-motion — don't wait for Spline.
  useEffect(() => {
    if (skip) return;
    if (perfReady && (isMobile || disable3D)) {
      markReady("hero-scene");
    }
  }, [skip, perfReady, isMobile, disable3D, markReady]);

  // Smooth percent crawl while waiting (never past 92 until ready).
  useEffect(() => {
    if (skip || !isLoading) return;
    const id = window.setInterval(() => {
      setLoadingPercent((p) => {
        if (p >= 92) return p;
        return Math.min(92, p + 1.5);
      });
    }, 80);
    return () => window.clearInterval(id);
  }, [skip, isLoading]);

  // Failsafe — never hang forever.
  useEffect(() => {
    if (skip) return;
    const id = window.setTimeout(bypassLoading, FAILSAFE_MS);
    return () => window.clearTimeout(id);
  }, [skip, bypassLoading]);

  return (
    <preloaderContext.Provider
      value={{ isLoading, bypassLoading, loadingPercent, markReady }}
    >
      <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
      {children}
    </preloaderContext.Provider>
  );
}

export default Preloader;
