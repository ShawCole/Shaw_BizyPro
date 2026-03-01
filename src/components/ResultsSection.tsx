"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "~60%", label: "Visitor Resolution Rate", sub: "Industry avg: 20-30%" },
  { value: "74", label: "Enrichment Columns", sub: "Per resolved identity" },
  { value: "3,451+", label: "Filter Options", sub: "Across 39 dimensions" },
  { value: "13,856", label: "Line Taxonomy", sub: "Fully mapped" },
  { value: "$0", label: "Data COGS", sub: "Strategic partnership" },
  { value: "2 weeks", label: "Implementation", sub: "Pixel to live campaigns" },
];

const scenarios = [
  {
    vertical: "SaaS Platform",
    color: "#39B54A",
    outcome: "Identified 2,400 anonymous trial visitors per month. Enriched with company data, job title, and seniority. Triggered display + email sequences to 1,440 resolved identities. Pipeline influence: $340K in 90 days.",
  },
  {
    vertical: "DTC E-Commerce",
    color: "#EC4899",
    outcome: "Resolved 58% of store visitors to consumer profiles. Built lookalike audiences from highest-LTV segments using income, age, and credit data. ROAS improved 3.2x on retargeting spend within 6 weeks.",
  },
  {
    vertical: "Agency / Multi-Client",
    color: "#8B5CF6",
    outcome: "White-labeled the identity engine across 12 client accounts. Each client got their own dashboard with visitor-level data. Agency margin expanded 40% by bundling identity + activation.",
  },
];

export default function ResultsSection() {
  return (
    <section id="results" className="py-24 bg-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-green font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase mb-4">
            Results
          </p>
          <h2 className="font-[family-name:var(--font-merriweather)] text-3xl sm:text-4xl font-bold text-white mb-4">
            The Numbers Behind the Engine
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-slate-800/50 rounded-xl p-5 border border-white/5 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <p className="font-[family-name:var(--font-mono)] text-2xl lg:text-3xl font-bold text-green mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-white font-medium mb-1">{stat.label}</p>
              <p className="text-xs text-slate-500">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Scenario Cards */}
        <motion.h3
          className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          What This Looks Like in Practice
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-6">
          {scenarios.map((s, i) => (
            <motion.div
              key={s.vertical}
              className="bg-slate-800/50 rounded-2xl p-6 border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: `${s.color}20`, color: s.color }}
              >
                {s.vertical}
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">
                {s.outcome}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
