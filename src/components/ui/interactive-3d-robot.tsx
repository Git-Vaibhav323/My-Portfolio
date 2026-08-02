"use client";

import { Suspense, lazy, useCallback } from "react";
import type { Application } from "@splinetool/runtime";
import { cn } from "@/lib/utils";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
  /** Fires once the Spline scene has loaded (after platform hide). */
  onReady?: () => void;
}

/** Names / patterns for the floor / platform under Whobee — hide these, keep the robot. */
const PLATFORM_EXACT = new Set(
  [
    "Desktop",
    "Floor",
    "Platform",
    "Plane",
    "Ground",
    "Shadow",
    "Background",
    "Base",
    "Pedestal",
    "Stage",
    "Rectangle",
    "Board",
    "Table",
    "Surface",
    "Backdrop",
    "Spot Light",
    "SpotLight",
    "Studio Lighting 04_1",
  ].map((n) => n.toLowerCase())
);

const PLATFORM_PATTERN =
  /^(desktop|floor|platform|plane|ground|shadow|background|base|pedestal|stage|rectangle|board|table|surface|backdrop|spot\s*light|studio\s*lighting)/i;

const KEEP_PATTERN =
  /robot|whobee|head|body|neck|eye|arm|leg|torso|hand|cube|sphere|character/i;

function hidePlatformObjects(spline: Application) {
  for (const obj of spline.getAllObjects()) {
    const name = (obj.name || "").trim();
    if (!name) continue;
    if (KEEP_PATTERN.test(name)) continue;

    const lower = name.toLowerCase();
    if (PLATFORM_EXACT.has(lower) || PLATFORM_PATTERN.test(name)) {
      obj.visible = false;
    }
  }

  for (const name of [
    "Desktop",
    "Plane",
    "Shadow",
    "Background",
    "Spot Light",
    "Studio Lighting 04_1",
  ]) {
    const obj = spline.findObjectByName(name);
    if (obj) obj.visible = false;
  }
}

export function InteractiveRobotSpline({
  scene,
  className,
  onReady,
}: InteractiveRobotSplineProps) {
  const onLoad = useCallback(
    (spline: Application) => {
      hidePlatformObjects(spline);
      onReady?.();
    },
    [onReady],
  );

  return (
    <Suspense
      fallback={
        <div
          className={cn(
            "flex h-full w-full items-center justify-center bg-transparent text-white",
            className
          )}
        >
          <svg
            className="mr-3 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      }
    >
      <Spline scene={scene} className={className} onLoad={onLoad} />
    </Suspense>
  );
}
