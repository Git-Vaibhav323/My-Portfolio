"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { File } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { usePerfProfile } from "@/hooks/use-perf-profile";

import SectionWrapper from "../ui/section-wrapper";

const ROBOT_SCENE_URL =
  "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const HeroSection = () => {
  const { isLoading, markReady } = usePreloader();
  const { ready: perfReady, isMobile, disable3D } = usePerfProfile();
  const robotHostRef = useRef<HTMLDivElement>(null);
  const [robotInView, setRobotInView] = useState(true);

  // Only mount WebGL on desktop with a real-sized, on-screen canvas.
  // `hidden` / off-screen 0×0 canvases spam GL_INVALID_* in the console.
  const wantRobot = perfReady && !isMobile && !disable3D;

  useEffect(() => {
    if (!wantRobot) return;
    const el = robotHostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setRobotInView(entry.isIntersecting && entry.intersectionRatio > 0),
      { threshold: [0, 0.05, 0.1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [wantRobot]);

  return (
    <SectionWrapper id="hero" className={cn("relative w-full h-screen overflow-x-clip md:overflow-hidden")}>
      {/* Interactive 3D robot — desktop only, unmounted when scrolled away */}
      {wantRobot && (
        <div
          ref={robotHostRef}
          className={cn(
            "absolute inset-y-0 right-0 z-[1]",
            "w-[55%] lg:w-[50%]",
            "pointer-events-auto overflow-hidden",
            "[mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]",
            "[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]",
            isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"
          )}
        >
          {robotInView && (
            <InteractiveRobotSpline
              scene={ROBOT_SCENE_URL}
              className="absolute inset-0 h-full w-full scale-110 origin-center"
              onReady={() => markReady("hero-scene")}
            />
          )}
        </div>
      )}

      <div className="relative z-[2] grid md:grid-cols-2 pointer-events-none">
        <div
          className={cn(
            "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)]",
            "col-span-1 w-full max-w-full",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "px-5 pt-28 pb-16 sm:px-8 sm:pb-16 md:p-20 lg:p-24 xl:p-28",
            "pointer-events-none"
          )}
        >
          {!isLoading && (
            <div className="flex w-full max-w-full flex-col pointer-events-auto md:max-w-none">
              <div className="w-full min-w-0">
                <BlurIn delay={0.2}>
                  <p
                    className={cn(
                      "md:self-start mt-2 font-medium text-base text-slate-500 dark:text-zinc-400",
                      "cursor-default sm:text-xl md:text-xl bg-clip-text"
                    )}
                  >
                    Hi, I am
                  </p>
                </BlurIn>

                <BlurIn delay={0.35} className="w-full min-w-0">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <h1
                        className={cn(
                          "mt-1 w-full max-w-full text-left font-bold font-display",
                          "cursor-default text-foreground tracking-tight",
                          // Fit “Vaibhav” / “Dwivedi” to the phone width (Unbounded is wide)
                          "text-[min(2.75rem,calc((100vw-2.75rem)/5.6))] leading-[0.95]",
                          "sm:text-6xl sm:leading-none",
                          "md:text-7xl lg:text-8xl xl:text-9xl"
                        )}
                      >
                        <span className="block">{config.author.split(" ")[0]}</span>
                        <span className="block">{config.author.split(" ")[1]}</span>
                      </h1>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="dark:bg-white dark:text-black"
                    >
                      theres something waiting for you in devtools
                    </TooltipContent>
                  </Tooltip>
                </BlurIn>
                <BlurIn delay={0.45}>
                  <p
                    className={cn(
                      "md:self-start mt-3 md:mt-4 font-medium text-sm text-slate-500 dark:text-zinc-400",
                      "cursor-default sm:text-lg md:text-xl bg-clip-text",
                      "max-w-[20rem] sm:max-w-none leading-snug"
                    )}
                  >
                    Full-Stack Developer &amp; AI/ML Engineer
                  </p>
                </BlurIn>
              </div>
              <div className="mt-8 flex w-full max-w-sm flex-col gap-3 md:max-w-none md:w-fit">
                <Link href={"/resume"} className="w-full flex-1">
                  <BoxReveal delay={0.55} width="100%" >
                    <Button className="flex items-center gap-2 w-full">
                      <File size={24} />
                      <p>Resume</p>
                    </Button>
                  </BoxReveal>
                </Link>
                <div className="flex w-full flex-wrap gap-3 md:self-start">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link href={"#contact"} className="min-w-[8.5rem] flex-1 sm:flex-none sm:min-w-[9.5rem]">
                        <Button
                          variant={"outline"}
                          className="block w-full overflow-hidden px-6 sm:px-8"
                        >
                          Hire Me
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>pls 🥹 🙏</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="flex items-center gap-2">
                    <Link
                      href={config.social.github}
                      target="_blank"
                      className="cursor-can-hover"
                    >
                      <Button variant={"outline"}>
                        <SiGithub size={24} />
                      </Button>
                    </Link>
                    <Link
                      href={config.social.linkedin}
                      target="_blank"
                      className="cursor-can-hover"
                    >
                      <Button variant={"outline"}>
                        <SiLinkedin size={24} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="hidden md:block col-span-1" aria-hidden />
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%] z-[2] pointer-events-none">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
