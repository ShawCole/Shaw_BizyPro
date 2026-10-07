"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DUR, tween } from "@/lib/motion";

const FRAMES = [
  { word: "Systems", line1: "Turn Anonymous Traffic", line2: "Into Revenue" },
  { word: "Tools", line1: "Empower Leadership With", line2: "Actionable Insights" },
  { word: "Landing Pages", line1: "Optimize Conversion Rates", line2: "With Avatar-Specific Content Copy" },
  { word: "Ads", line1: "Target Intent-Aware Traffic", line2: "Anywhere On The Internet" },
  { word: "Campaigns", line1: "Rival ABM Teams:", line2: "Multi-Touch, Multi-Channel" },
  { word: "Scripts", line1: "Resonate With Target Avatars", line2: "Without The Guesswork" },
  { word: "Websites", line1: "Dynamically Display", line2: "Avatar-Specific Content" },
];

const DWELL_MS = 4000;

/**
 * Every frame is rendered into the same grid cell (see .cycle-stack in
 * globals.css), so the slot reserves the size of its largest frame and never
 * shifts layout. Switching frames is a pure opacity/transform crossfade.
 */
function CycleStack({
  active,
  pick,
  className = "",
  enterDelayMs = 0,
  nowrap = false,
}: {
  active: number;
  pick: (f: (typeof FRAMES)[number]) => string;
  className?: string;
  enterDelayMs?: number;
  nowrap?: boolean;
}) {
  return (
    <span
      className={`cycle-stack justify-items-center ${className}`}
      style={{ "--enter-delay": `${enterDelayMs}ms` } as CSSProperties}
    >
      {FRAMES.map((f, i) => (
        <span
          key={i}
          data-active={i === active}
          aria-hidden={i !== active}
          className={nowrap ? "whitespace-nowrap" : "text-balance"}
        >
          {pick(f)}
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [onScreen, setOnScreen] = useState(true);

  // Only cycle while the hero is visible (and never under reduced motion).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !onScreen) return;
    const id = setInterval(() => {
      if (document.visibilityState === "visible") {
        setIndex((prev) => (prev + 1) % FRAMES.length);
      }
    }, DWELL_MS);
    return () => clearInterval(id);
  }, [reducedMotion, onScreen]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh flex items-center justify-center overflow-hidden bg-gradient-to-b from-navy-dark via-navy to-slate-900 pt-24 pb-20 sm:py-24"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow — a radial gradient, not a blurred layer (no filter to repaint on scroll) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px circle at 50% 33%, rgba(57,181,74,0.07), transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tween(DUR.slow)}
        >
          <p className="text-green font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase mb-5 sm:mb-6">
            Go-To-Market Engineer
          </p>

          <h1 className="font-[family-name:var(--font-merriweather)] font-bold leading-tight">
            {/* Line 1: "I Build [word] That" — stacked on phones, one row from sm up */}
            <span className="flex flex-col items-center sm:flex-row sm:items-baseline sm:justify-center sm:gap-x-[0.3em] text-[1.875rem] sm:text-[2.25rem] lg:text-[3.5rem] text-white">
              <span>I Build</span>
              <CycleStack active={index} pick={(f) => f.word} className="text-green" nowrap />
              <span>That</span>
            </span>

            {/* Line 2: green phrase — enters second */}
            <CycleStack
              active={index}
              pick={(f) => f.line1}
              enterDelayMs={80}
              className="mt-3 text-[1.375rem] sm:text-3xl lg:text-[2.5rem] leading-snug text-green"
            />

            {/* Line 3: white phrase — enters third */}
            <CycleStack
              active={index}
              pick={(f) => f.line2}
              enterDelayMs={160}
              className="mt-1 sm:mt-2 text-lg sm:text-2xl lg:text-[2rem] leading-snug text-slate-200"
            />
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mt-6 mb-8 sm:mt-8 sm:mb-10">
            Three companies. One data engine. Zero wasted ad spend.{" "}
            <br className="hidden sm:block" />
            Visitor identification, audience building, and omnichannel activation.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tween(DUR.slow, 0.1)}
        >
          <a
            href="#engine"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-full transition-colors duration-150"
          >
            See the Engine
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3v10M8 13l4-4M8 13l-4-4" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-green hover:bg-green-dark text-white font-semibold px-8 py-3.5 rounded-full transition-colors duration-150"
          >
            Book a Strategy Call
          </a>
        </motion.div>
      </div>

      {/* Scroll cue — anchored to the section, hidden on phones where it collided with the CTAs */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="scroll-cue text-slate-500">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
