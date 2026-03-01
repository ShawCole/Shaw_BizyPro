"use client";

import { motion } from "framer-motion";

const solutions = [
  {
    name: "ArkData",
    tagline: "Visitor Intelligence Platform",
    description: "See who's on your site before they fill out a form.",
    color: "#39B54A",
    icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7",
    features: [
      "Real-time visitor identification dashboard",
      "74-column enrichment on every resolved visitor",
      "CRM sync via Reverse ETL integrations",
      "Multi-tenant with role-based access",
    ],
    metric: "~60%",
    metricLabel: "Resolution Rate",
  },
  {
    name: "ListMagic",
    tagline: "Voice-Driven List Building",
    description: "Build targeted audiences in seconds, not hours.",
    color: "#3B82F6",
    icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
    features: [
      "Embeddable widget for any SaaS platform",
      "Voice-first UX — speak your audience criteria",
      "3,451+ filter options across 39 dimensions",
      "Fraction of the cost of Apollo or ZoomInfo",
    ],
    metric: "3,451+",
    metricLabel: "Filter Options",
  },
  {
    name: "DSP / Activation",
    tagline: "Omnichannel Campaign Execution",
    description: "Reach them on display, email, text, and voice.",
    color: "#8B5CF6",
    icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
    features: [
      "Programmatic display via DSP integration",
      "Behavioral email sequences",
      "SMS campaigns with compliance built in",
      "AI-powered voice outreach",
    ],
    metric: "5",
    metricLabel: "Channels",
  },
];

export default function SolutionsSection() {
  return (
    <section id="solutions" className="py-24 bg-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-green font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase mb-4">
            Solutions
          </p>
          <h2 className="font-[family-name:var(--font-merriweather)] text-3xl sm:text-4xl font-bold text-white mb-4">
            Three Products, One Data Engine
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Each product taps into the same identity resolution pipeline — your data works harder across every channel.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.name}
              className="bg-slate-800/50 rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-all group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ "--accent": sol.color } as React.CSSProperties}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${sol.color}15` }}
              >
                <svg width="24" height="24" fill="none" stroke={sol.color} strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d={sol.icon} />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{sol.name}</h3>
              <p className="text-sm font-medium mb-3" style={{ color: sol.color }}>
                {sol.tagline}
              </p>
              <p className="text-slate-400 text-sm mb-5">{sol.description}</p>

              <ul className="space-y-2 mb-6">
                {sol.features.map((feat, j) => (
                  <li key={j} className="flex gap-2 text-sm text-slate-300">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                      <path d="M4 8l3 3 5-5" stroke={sol.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-white/5">
                <span className="font-[family-name:var(--font-mono)] text-2xl font-bold" style={{ color: sol.color }}>
                  {sol.metric}
                </span>
                <span className="text-xs text-slate-400 ml-2">{sol.metricLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
