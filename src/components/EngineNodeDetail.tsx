"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { EngineNodeData } from "@/lib/engine-nodes";

interface Props {
  node: EngineNodeData | null;
  onClose: () => void;
}

export default function EngineNodeDetail({ node, onClose }: Props) {
  return (
    <AnimatePresence>
      {node && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-white/10 z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
                aria-label="Close"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${node.color}20` }}
              >
                <svg width="24" height="24" fill="none" stroke={node.color} strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d={node.icon} />
                </svg>
              </div>

              <h3 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-white mb-2">
                {node.label}
              </h3>
              <p className="text-slate-400 mb-6">{node.description}</p>

              {node.metric && (
                <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-white/5">
                  <p className="font-[family-name:var(--font-mono)] text-3xl font-bold" style={{ color: node.color }}>
                    {node.metric}
                  </p>
                  <p className="text-sm text-slate-400">{node.metricLabel}</p>
                </div>
              )}

              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Details
              </h4>
              <ul className="space-y-3">
                {node.details.map((detail, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: node.color }} />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
