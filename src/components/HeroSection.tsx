"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
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
            Data Engine Architect
          </p>
          <h1 className="font-[family-name:var(--font-merriweather)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            I Build the Systems That
            <br />
            <span className="text-green">Turn Anonymous Traffic</span>
            <br />
            Into Revenue
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
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
