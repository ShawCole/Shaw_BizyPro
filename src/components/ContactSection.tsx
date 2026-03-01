"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const calRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section id="contact" className="py-24 bg-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Pitch */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-green font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase mb-4">
              Let&apos;s Talk
            </p>
            <h2 className="font-[family-name:var(--font-merriweather)] text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to See What Your Traffic Is Worth?
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Book a 30-minute strategy call. I&apos;ll show you exactly how many of your anonymous visitors
              we can identify, what enrichment data we can attach, and which activation channels will
              drive the highest ROI for your specific business.
            </p>
            <ul className="space-y-4">
              {[
                "Live demo with anonymized data from your vertical",
                "Custom resolution rate estimate for your traffic profile",
                "Channel-by-channel activation roadmap",
                "Clear pricing — no hidden fees, no long-term contracts",
                "Pixel deployed and resolving within 48 hours of kickoff",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
                    <circle cx="10" cy="10" r="10" fill="#39B54A20" />
                    <path d="M6 10l3 3 5-5" stroke="#39B54A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Calendly */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              ref={calRef}
              className="calendly-inline-widget rounded-2xl overflow-hidden border border-white/10"
              data-url="https://calendly.com/shawcole"
              style={{ minWidth: "320px", height: "630px" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
