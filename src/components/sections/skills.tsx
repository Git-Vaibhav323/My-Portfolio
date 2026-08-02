"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { SKILL_GROUPS, SKILLS, type Skill } from "@/data/constants";
import { cn } from "@/lib/utils";

function SkillItem({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
      style={{ "--skill": skill.color } as CSSProperties}
      className="group flex items-center gap-3.5"
    >
      <span
        className={cn(
          "relative flex size-12 shrink-0 items-center justify-center overflow-hidden",
          "rounded-full border border-foreground/12 bg-background",
          "transition-[border-color,box-shadow,transform] duration-300",
          "group-hover:border-[var(--skill)]/70 group-hover:shadow-[inset_0_0_0_1px_var(--skill)]",
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, color-mix(in srgb, var(--skill) 22%, transparent), transparent 65%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={skill.icon}
          alt=""
          width={28}
          height={28}
          loading="lazy"
          className={cn(
            "relative size-7 object-contain transition-transform duration-300 group-hover:scale-110",
            skill.invertOnDark && "dark:invert",
          )}
        />
      </span>

      <span className="font-display text-sm font-semibold tracking-tight text-foreground/90 transition-colors duration-200 group-hover:text-foreground md:text-[15px]">
        {skill.label}
      </span>
    </motion.li>
  );
}

const SkillsSection = () => {
  return (
    <SectionWrapper
      id="skills"
      className="flex w-full min-h-screen flex-col justify-center py-24"
    >
      <SectionHeader
        id="skills"
        title="Tech Stack"
        desc="Tools I build with"
        className="static mb-20"
      />

      <div className="mx-auto w-full max-w-5xl space-y-16 px-4 md:space-y-20">
        {SKILL_GROUPS.map((group, groupIndex) => (
          <section
            key={group.title}
            aria-labelledby={`skill-group-${group.title}`}
            className="grid gap-8 md:grid-cols-[minmax(0,11rem)_1fr] md:gap-12 lg:grid-cols-[minmax(0,14rem)_1fr]"
          >
            <header className="md:pt-1">
              <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                {String(groupIndex + 1).padStart(2, "0")}
              </p>
              <h3
                id={`skill-group-${group.title}`}
                className="mt-2 font-display text-2xl font-bold leading-none tracking-tight text-foreground md:text-3xl"
              >
                {group.title}
              </h3>
            </header>

            <ul className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.skills.map((name, i) => (
                <SkillItem key={name} skill={SKILLS[name]} index={i} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
