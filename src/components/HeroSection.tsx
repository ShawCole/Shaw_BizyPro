"use client";

import { useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

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
const FADE_IN_S = 0.35;
const FADE_OUT_S = 0.4;
const STAGGER_S = 0.15;

function CyclingLine({
  children,
  index,
  className,
  height,
  enterDelay,
}: {
  children: ReactNode;
  index: number;
  className: string;
  height: string;
  enterDelay: number;
}) {
  return (
    <div className={`relative overflow-hidden ${height}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className={`absolute inset-x-0 text-center whitespace-nowrap ${className}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { opacity: { duration: FADE_IN_S, delay: enterDelay, ease: "easeOut" } },
            },
            exit: {
              opacity: 0,
              y: 20,
              transition: {
                opacity: { duration: FADE_OUT_S, ease: "easeIn" },
                y: { duration: FADE_OUT_S, ease: "easeIn" },
              },
            },
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [widthIndex, setWidthIndex] = useState(0);
  const [wordWidth, setWordWidth] = useState<number>(0);
  const reducedMotion = useReducedMotion();
  const measurerRef = useRef<HTMLSpanElement>(null);

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % FRAMES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, DWELL_MS);
    return () => clearInterval(id);
  }, [advance]);

  // Width timing: expand immediately (during exit), shrink after exit
  const prevIndexRef = useRef(index);
  useEffect(() => {
    // Measure new word width to compare
    const tempSpan = document.createElement("span");
    tempSpan.style.cssText = "position:absolute;opacity:0;pointer-events:none;white-space:nowrap;font-weight:bold;";
    tempSpan.className = measurerRef.current?.className || "";
    tempSpan.textContent = FRAMES[index].word;
    document.body.appendChild(tempSpan);
    const newWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);

    const isExpanding = newWidth > wordWidth;
    prevIndexRef.current = index;

    if (isExpanding) {
      // Next word is longer — start expanding immediately so it's ready when fade-in starts
      setWidthIndex(index);
    } else {
      // Next word is shorter — wait for exit to complete before shrinking
      const timer = setTimeout(() => {
        setWidthIndex(index);
      }, FADE_OUT_S * 1000);
      return () => clearTimeout(timer);
    }
  }, [index]);

  // Measure when widthIndex changes (after exit is done)
  useEffect(() => {
    if (measurerRef.current) {
      setWordWidth(measurerRef.current.offsetWidth);
    }
  }, [widthIndex]);

  // Re-measure on resize
  useEffect(() => {
    const onResize = () => {
      if (measurerRef.current) {
        setWordWidth(measurerRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const frame = FRAMES[index];
  const widthTransition = { duration: 0.35, ease: "easeInOut" as const };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-navy-dark via-navy to-slate-900">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green/5 blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-green font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase mb-6">
            Go-To-Market Engineer
          </p>

          <div aria-live="polite" aria-atomic="true">
            {/* Hidden measurer — same font styling, offscreen */}
            <span
              ref={measurerRef}
              aria-hidden="true"
              className="absolute opacity-0 pointer-events-none whitespace-nowrap font-[family-name:var(--font-merriweather)] text-3xl sm:text-[2.75rem] lg:text-[3.5rem] font-bold"
            >
              {FRAMES[widthIndex].word}
            </span>

            {/* Line 1: "I Build [word] That" — enters first (delay: 0) */}
            <div className="font-[family-name:var(--font-merriweather)] text-3xl sm:text-[2.75rem] lg:text-[3.5rem] font-bold text-white leading-tight flex items-baseline justify-center gap-x-[0.25em]">
              <span>I Build</span>

              {/* Animated-width container — pushes "That" smoothly */}
              <motion.span
                className="relative inline-block align-baseline"
                animate={{ width: wordWidth || "auto" }}
                transition={widthTransition}
              >
                {/* Invisible spacer — establishes baseline + height in flow */}
                <span className="invisible whitespace-nowrap" aria-hidden="true">Xg</span>
                {/* The word fades in (no y), fades out + slides down */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`word-${index}`}
                    className="absolute top-0 left-1/2 text-green whitespace-nowrap"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={{
                      initial: { opacity: 0, x: "-50%" },
                      animate: {
                        opacity: 1,
                        x: "-50%",
                        transition: { opacity: { duration: FADE_IN_S, delay: 0, ease: "easeOut" } },
                      },
                      exit: {
                        opacity: 0,
                        y: 20,
                        x: "-50%",
                        transition: {
                          opacity: { duration: FADE_OUT_S, ease: "easeIn" },
                          y: { duration: FADE_OUT_S, ease: "easeIn" },
                        },
                      },
                    }}
                  >
                    {frame.word}
                  </motion.span>
                </AnimatePresence>
              </motion.span>

              <span>That</span>
            </div>

            {/* Line 2: cycling green phrase — enters second (delay: STAGGER_S) */}
            <CyclingLine
              index={index}
              height="h-[36px] sm:h-[46px] lg:h-[56px] mt-3"
              className="font-[family-name:var(--font-merriweather)] text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-green leading-none"
              enterDelay={STAGGER_S}
            >
              {frame.line1}
            </CyclingLine>

            {/* Line 3: cycling white phrase — enters third (delay: STAGGER_S * 2) */}
            <CyclingLine
              index={index}
              height="h-[32px] sm:h-[40px] lg:h-[48px] mt-2"
              className="font-[family-name:var(--font-merriweather)] text-xl sm:text-2xl lg:text-[2rem] font-bold text-slate-200 leading-none"
              enterDelay={STAGGER_S * 2}
            >
              {frame.line2}
            </CyclingLine>
          </div>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mt-8 mb-10">
            Three companies. One data engine. Zero wasted ad spend.
            <br className="hidden sm:block" />
            Visitor identification, audience building, and omnichannel activation.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <a
            href="#engine"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-full transition-all"
          >
            See the Engine
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3v10M8 13l4-4M8 13l-4-4" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-green hover:bg-green-dark text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
          >
            Book a Strategy Call
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
