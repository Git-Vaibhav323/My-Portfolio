"use client";

import React, { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "@/lib/lenis";
import gsap from "gsap";

// ScrollTrigger must not be imported at module scope: its bundle calls
// Date.now() during evaluation, which Next.js cacheComponents treats as a
// prerender error unless deferred behind a Suspense boundary / client effect.

interface LenisProps {
  children: React.ReactNode;
  isInsideModal?: boolean;
}

function SmoothScroll({ children, isInsideModal = false }: LenisProps) {
  const scrollTriggerRef = useRef<{ update: () => void } | null>(null);

  useEffect(() => {
    let cancelled = false;
    void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerRef.current = ScrollTrigger;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Re-evaluate every ScrollTrigger on each Lenis scroll frame. Otherwise Lenis
  // smooths scrolling on its own loop while ScrollTrigger samples independently,
  // so a fast flick jumps past a trigger's start line unevaluated.
  const lenis = useLenis(() => {
    scrollTriggerRef.current?.update();
  });

  useEffect(() => {
    if (!lenis) return;
    // Drive Lenis from GSAP's ticker (its own RAF is off via autoRaf below) so
    // scroll and ScrollTrigger share one clock; kill lag smoothing so a dropped
    // frame can't skip a large scroll delta.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(raf);
  }, [lenis]);

  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        duration: 2,
        prevent: (node) => {
          if (isInsideModal) return true;
          const modalOpen = node.classList.contains("modall");
          return modalOpen;
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
