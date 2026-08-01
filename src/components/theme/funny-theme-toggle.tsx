"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import { themeDisclaimers } from "@/data/constants";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const iconSun =
  "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0";
const iconMoon =
  "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100";

export default function FunnyThemeToggle({
  className,
}: {
  className?: string;
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [counter, setCounter] = React.useState({ dark: 0, light: 0 });
  const { toast } = useToast();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = async (newTheme: string, event?: React.MouseEvent) => {
    // @ts-ignore
    if (!document.startViewTransition || !event) {
      setTheme(newTheme);
      return;
    }

    const { top, left, width, height } = (
      event.target as HTMLElement
    ).getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  const goLight = (e: React.MouseEvent) => {
    setCounter((c) => ({ ...c, light: c.light + 1 }));
    toggleTheme("light", e);
  };

  const goDark = (e: React.MouseEvent) => {
    const description =
      themeDisclaimers.dark[counter.dark % themeDisclaimers.dark.length];
    setCounter((c) => ({ ...c, dark: c.dark + 1 }));
    toast({
      description: description,
      className:
        "top-0 right-0 flex fixed md:max-w-[420px] md:top-16 md:right-4",
    });
    toggleTheme("dark", e);
  };

  const btnClass = cn("border-none bg-transparent", className);

  // Same markup on server + first client paint — theme is only read after mount.
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className={btnClass}
        aria-label="Toggle theme"
      >
        <Sun className={iconSun} />
        <Moon className={iconMoon} />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <Button
        variant="outline"
        size="icon"
        className={btnClass}
        onClick={goDark}
        aria-label="Switch to dark theme"
      >
        <Sun className={iconSun} />
        <Moon className={iconMoon} />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={btnClass}
          aria-label="Switch to light theme"
        >
          <Sun className={iconSun} />
          <Moon className={iconMoon} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-[99999] flex flex-col items-center gap-2">
        <p className="text-sm text-center">
          {themeDisclaimers.light[counter.light]}
        </p>
        <Button onClick={goLight}>Go Light</Button>
      </PopoverContent>
    </Popover>
  );
}
