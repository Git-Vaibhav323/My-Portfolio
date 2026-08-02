"use client";

import { Eye } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SlidingNumber } from "@/components/ui/shadcn-io/sliding-number";

function formatCount(n: number): string {
  if (n < 1000) return n.toString();
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0)}k`;
  return `${(n / 1_000_000).toFixed(1)}M`;
}

export function VisitorCountButton({ className }: { className?: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/visitors", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { count?: number }) => {
        if (!cancelled && typeof data.count === "number") {
          setCount(data.count);
        }
      })
      .catch(() => {
        if (!cancelled) setCount(0);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  const display = formatCount(count);
  const isPlainNumber = /^\d+$/.test(display);

  return (
    <motion.div
      title={`${count.toLocaleString()} visitors`}
      aria-label={`${count.toLocaleString()} portfolio visitors`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "cursor-default border-2 border-black/30 dark:border-white/30 relative text-sm rounded-lg whitespace-nowrap font-medium",
        className,
      )}
    >
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 h-10">
        <Eye className="size-[18px] shrink-0 text-foreground" aria-hidden />
        <span className="inline-flex items-center tabular-nums min-w-[1ch]">
          {isPlainNumber
            ? display.split("").map((digit, i) => (
                <SlidingNumber key={`${digit}-${i}`} number={Number(digit)} />
              ))
            : display}
        </span>
      </div>
    </motion.div>
  );
}
