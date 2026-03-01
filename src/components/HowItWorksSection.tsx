"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    description: "30-minute strategy session. We audit your current traffic, identify resolution opportunities, and map the activation channels that fit your business.",
    color: "#39B54A",
  },
  {
    num: "02",
    title: "Engine Setup",
    description: "Deploy the first-party pixel, configure identity resolution, set enrichment parameters, and connect your CRM and activation channels.",
    color: "#3B82F6",
  },
  {
    num: "03",
    title: "Live Campaigns",
    description: "Start resolving visitors on day one. Within two weeks, you have enriched audience segments flowing into display, email, SMS, and voice campaigns.",
    color: "#8B5CF6",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-green font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase mb-4">
            Process
          </p>
          <h2 className="font-[family-name:var(--font-merriweather)] text-3xl sm:text-4xl font-bold text-white mb-4">
            From First Call to Live Campaigns in 2 Weeks
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <span
                className="font-[family-name:var(--font-mono)] text-5xl font-bold opacity-20"
                style={{ color: step.color }}
              >
                {step.num}
              </span>
              <h3 className="text-xl font-bold text-white mt-2 mb-3">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-4 text-slate-600">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Transparency Card */}
        <motion.div
          className="bg-slate-800/50 rounded-2xl p-8 border border-white/5 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-white mb-4">
            What to Expect on the Call
          </h3>
          <ul className="space-y-3">
            {[
              "We walk through your current traffic volume and conversion funnel",
              "I show you a live demo of identity resolution on real (anonymized) data",
              "We estimate your resolution rate based on traffic profile",
              "I map which activation channels will move the needle fastest",
              "You get a clear scope, timeline, and pricing — no hidden costs",
              "No pressure, no 47-slide deck — just a technical conversation",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                  <path d="M4 8l3 3 5-5" stroke="#39B54A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
