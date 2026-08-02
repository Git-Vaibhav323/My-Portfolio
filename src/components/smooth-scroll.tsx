"use client";

import React, { useEffect, useRef, useState } from "react";
import { ReactLenis, useLenis } from "@/lib/lenis";
import type { gsap as GsapNS } from "gsap";

// Do not import gsap/ScrollTrigger at module scope — both call Date.now()
// during evaluation and break Next.js client prerender.

interface LenisProps {
  children: React.ReactNode;
  isInsideModal?: boolean;
}

function SmoothScroll({ children, isInsideModal = false }: LenisProps) {
  const scrollTriggerRef = useRef<{ update: () => void } | null>(null);
  const gsapRef = useRef<typeof GsapNS | null>(null);
  const [gsapReady, setGsapReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        gsapRef.current = gsap;
        scrollTriggerRef.current = ScrollTrigger;
        setGsapReady(true);
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const lenis = useLenis(() => {
    scrollTriggerRef.current?.update();
  });

  useEffect(() => {
    if (!lenis || !gsapReady) return;
    const gsap = gsapRef.current;
    if (!gsap) return;

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
    };
  }, [lenis, gsapReady]);

  return (
    <ReactLenis
      root
      autoRaf={!gsapReady}
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
