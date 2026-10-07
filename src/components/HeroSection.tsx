"use client";

import { useState, useEffect, useLayoutEffect, useRef, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { DUR, EASE_MOVE_CSS } from "@/lib/motion";

const FRAMES = [
  { word: "Systems", line1: "Turn Anonymous Traffic", line2: "Into Revenue" },
  { word: "Tools", line1: "Empower Leadership With", line2: "Actionable Insights" },
  { word: "Landing Pages", line1: "Optimize Conversion Rates", line2: "With Avatar-Specific Content Copy" },
  { word: "Ads", line1: "Target Intent-Aware Traffic", line2: "Anywhere On The Internet" },
  { word: "Campaigns", line1: "Rival ABM Teams:", line2: "Multi-Touch, Multi-Channel" },
  { word: "Scripts", line1: "Resonate With Target Avatars", line2: "Without The Guesswork" },
  { word: "Websites", line1: "Dynamically Display", line2: "Avatar-Specific Content" },
];

const DWELL_MS = 3000;

type FrameState = "active" | "prev" | "next";
const stateOf = (i: number, active: number, prev: number | null): FrameState =>
  i === active ? "active" : i === prev ? "prev" : "next";

/**
 * Lines 2 and 3: every frame sits in the same grid cell, so the line keeps the
 * height of its tallest phrase and the CTAs below never jump. The swap is a
 * slide-up (see .cycle-frame in globals.css).
 */
function CycleStack({
  active,
  prev,
  pick,
  className = "",
  enterDelayMs = 0,
}: {
  active: number;
  prev: number | null;
  pick: (f: (typeof FRAMES)[number]) => string;
  className?: string;
  enterDelayMs?: number;
}) {
  return (
    <span
      className={`cycle-stack justify-items-center ${className}`}
      style={{ "--enter-delay": `${enterDelayMs}ms` } as CSSProperties}
    >
      {FRAMES.map((f, i) => (
        <span
          key={i}
          data-state={stateOf(i, active, prev)}
          aria-hidden={i !== active}
          className="cycle-frame text-balance"
        >
          {pick(f)}
        </span>
      ))}
    </span>
  );
}

/**
 * The cycling word in "I Build [word] That". The slot takes each word's real
 * width, so there is never a gap sized for a longer word. The width itself
 * changes in one step; "I Build" and "That" are then FLIP-animated from where
 * they were with a compositor transform, so they glide even if the main thread
 * is busy (an animated `width` would stutter on any main-thread stall).
 */
function WordSlot({ active, prev, instant }: { active: number; prev: number | null; instant: boolean }) {
  const slotRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [widths, setWidths] = useState<number[]>([]);

  // Measure every word once in the live font/size; re-measure when the
  // breakpoint or web font changes the size.
  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const measure = () =>
      setWidths([...el.children].map((c) => (c as HTMLElement).getBoundingClientRect().width));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  // Order the two motions so the word never runs into its neighbours:
  // growing -> neighbours slide out first, then the new word rises in;
  // shrinking -> the old word leaves first (100ms), then neighbours slide in.
  const grow = prev !== null && widths.length > 0 && widths[active] > widths[prev];

  useLayoutEffect(() => {
    const slot = slotRef.current;
    if (!slot || prev === null || instant || !widths.length) return;
    // Phones stack the three parts on separate rows: nothing beside the word moves.
    if (!window.matchMedia("(min-width: 640px)").matches) return;
    const half = (widths[active] - widths[prev]) / 2;
    if (Math.abs(half) < 0.5) return;
    const opts: KeyframeAnimationOptions = {
      duration: DUR.base * 1000,
      easing: EASE_MOVE_CSS,
      delay: grow ? 0 : 100,
      fill: "backwards",
    };
    const before = slot.previousElementSibling as HTMLElement | null;
    const after = slot.nextElementSibling as HTMLElement | null;
    const anims = [
      before?.animate([{ transform: `translateX(${half}px)` }, { transform: "none" }], opts),
      after?.animate([{ transform: `translateX(${-half}px)` }, { transform: "none" }], opts),
    ];
    return () => anims.forEach((a) => a?.cancel());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per swap
  }, [active]);

  return (
    <span
      ref={slotRef}
      className="word-slot relative inline-block align-baseline text-green"
      data-grow={grow}
      style={widths.length ? { width: widths[active] } : undefined}
    >
      {/* in-flow spacer: the current word, invisible. Gives the slot its baseline
          and, before hydration, its correct width. */}
      <span className="invisible whitespace-nowrap" aria-hidden="true">{FRAMES[active].word}</span>
      {FRAMES.map((f, i) => (
        <span key={i} className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap" aria-hidden={i !== active}>
          <span className="cycle-frame inline-block" data-state={stateOf(i, active, prev)}>
            {f.word}
          </span>
        </span>
      ))}
      {/* hidden measurer: same font, natural widths */}
      <span ref={measureRef} className="absolute invisible whitespace-nowrap pointer-events-none" aria-hidden="true">
        {FRAMES.map((f, i) => (
          <span key={i} className="absolute">{f.word}</span>
        ))}
      </span>
    </span>
  );
}

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [cycled, setCycled] = useState(false);
  const prev = cycled ? (index - 1 + FRAMES.length) % FRAMES.length : null;
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
        setCycled(true);
        setIndex((i) => (i + 1) % FRAMES.length);
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
        {/* No entrance on the text: it is the LCP element, and Chrome won't count
            text whose first paint was transparent. The cycle supplies the motion. */}
        <div>
          <p className="text-green font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase mb-5 sm:mb-6">
            Go-To-Market Engineer
          </p>

          <h1 className="font-[family-name:var(--font-merriweather)] font-bold leading-tight">
            {/* Line 1: "I Build [word] That" — stacked on phones, one row from sm up */}
            <span className="flex flex-col items-center sm:flex-row sm:items-baseline sm:justify-center sm:gap-x-[0.3em] text-[1.875rem] sm:text-[2.25rem] lg:text-[3.5rem] text-white">
              <span>I Build</span>
              <WordSlot active={index} prev={prev} instant={!!reducedMotion} />
              <span>That</span>
            </span>

            {/* Line 2: green phrase — enters second */}
            <CycleStack
              active={index}
              prev={prev}
              pick={(f) => f.line1}
              enterDelayMs={40}
              className="mt-3 text-[1.375rem] sm:text-3xl lg:text-[2.5rem] leading-snug text-green"
            />

            {/* Line 3: white phrase — enters third */}
            <CycleStack
              active={index}
              prev={prev}
              pick={(f) => f.line2}
              enterDelayMs={80}
              className="mt-1 sm:mt-2 text-lg sm:text-2xl lg:text-[2rem] leading-snug text-slate-200"
            />
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mt-6 mb-8 sm:mt-8 sm:mb-10">
            Three companies. One data engine. Zero wasted ad spend.{" "}
            <br className="hidden sm:block" />
            Visitor identification, audience building, and omnichannel activation.
          </p>
        </div>

        <div className="hero-enter-late flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
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
        </div>
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
