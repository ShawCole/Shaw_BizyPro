"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DUR, tween } from "@/lib/motion";

const links = [
  { label: "Engine", href: "#engine" },
  { label: "Solutions", href: "#solutions" },
  { label: "Data Viz", href: "#dataviz" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-[250ms]",
        "border-b",
        scrolled || mobileOpen
          ? "bg-slate-900/80 backdrop-blur-xl border-white/10 shadow-lg"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-white py-2.5">
            Shaw Cole
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-300 hover:text-white transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-green text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-green-dark transition-colors duration-150"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2.5 -mr-2.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-white/10 px-4 pb-4"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={tween(DUR.base)}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-slate-300 hover:text-white transition-colors duration-150"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="block mt-2 bg-green text-white text-center font-semibold px-5 py-3 rounded-full"
              onClick={() => setMobileOpen(false)}
            >
              Book a Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
