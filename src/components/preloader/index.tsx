"use client";
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useRef,
} from "react";
import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

import Loader from "./loader";
import { usePerfProfile } from "@/hooks/use-perf-profile";

type PreloaderContextType = {
  isLoading: boolean;
  loadingPercent: number;
  bypassLoading: () => void;
};
const INITIAL: PreloaderContextType = {
  isLoading: true,
  loadingPercent: 0,
  bypassLoading: () => {},
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

const LOADING_TIME = 2.5;
/** Hard cap so a failed GSAP load can never leave a blank white screen. */
const FAILSAFE_MS = 4000;

function Preloader({ children, disabled = false }: PreloaderProps) {
  const pathname = usePathname();
  const skip = disabled || pathname?.startsWith("/resume");

  const [isLoading, setIsLoading] = useState(!skip);
  const [loadingPercent, setLoadingPercent] = useState(skip ? 100 : 0);
  const loadingTween = useRef<{
    progress: (n: number) => { kill: () => void };
    kill: () => void;
  } | null>(null);

  const { ready: perfReady } = usePerfProfile();

  const bypassLoading = () => {
    loadingTween.current?.progress(0.99).kill();
    setLoadingPercent(100);
    setIsLoading(false);
  };

  useEffect(() => {
    if (perfReady) bypassLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perfReady]);

  // Always dismiss the splash — never hang on a white screen.
  useEffect(() => {
    if (skip) return;
    const id = window.setTimeout(() => {
      setLoadingPercent(100);
      setIsLoading(false);
    }, FAILSAFE_MS);
    return () => window.clearTimeout(id);
  }, [skip]);

  const loadingPercentRef = useRef<{ value: number }>({ value: 0 });
  useEffect(() => {
    if (skip) return;
    let killed = false;
    void import("gsap")
      .then(({ default: gsap }) => {
        if (killed) return;
        loadingTween.current = gsap.to(loadingPercentRef.current, {
          value: 100,
          duration: LOADING_TIME,
          ease: "slow(0.7,0.7,false)",
          onUpdate: () => {
            setLoadingPercent(loadingPercentRef.current.value);
          },
          onComplete: () => {
            setIsLoading(false);
          },
        });
      })
      .catch(() => {
        setLoadingPercent(100);
        setIsLoading(false);
      });
    return () => {
      killed = true;
      loadingTween.current?.kill();
    };
  }, [skip]);

  return (
    <preloaderContext.Provider
      value={{ isLoading, bypassLoading, loadingPercent }}
    >
      <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
      {children}
    </preloaderContext.Provider>
  );
}

export default Preloader;
