"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { datasets } from "@/lib/demo-datasets";
import { cn } from "@/lib/utils";
import HorizontalBarChart from "./charts/HorizontalBarChart";
import VerticalBarChart from "./charts/VerticalBarChart";
import DoughnutChart from "./charts/DoughnutChart";
import USAChoroplethMap from "./charts/USAChoroplethMap";
import TreemapChart from "./charts/TreemapChart";

export default function DataVizShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const dataset = datasets[activeTab];

  return (
    <section id="dataviz" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase mb-4" style={{ color: dataset.color }}>
            Data Intelligence
          </p>
          <h2 className="font-[family-name:var(--font-merriweather)] text-3xl sm:text-4xl font-bold text-white mb-4">
            See Your Audience Before You Spend a Dollar
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explore sample enrichment data across four industry verticals. Every chart is powered by the same 74-column identity resolution engine.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {datasets.map((ds, i) => (
            <button
              key={ds.id}
              onClick={() => setActiveTab(i)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                activeTab === i
                  ? "text-white shadow-lg"
                  : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800"
              )}
              style={
                activeTab === i
                  ? { backgroundColor: ds.color }
                  : undefined
              }
            >
              {ds.label}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mb-8">
          {dataset.description}
        </p>

        {/* Chart Grid */}
        <motion.div
          key={dataset.id}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {[...dataset.charts].sort((a, b) =>
            a.type === "choropleth" ? 1 : b.type === "choropleth" ? -1 : 0
          ).map((chart, i) => {
            switch (chart.type) {
              case "horizontal":
                return (
                  <HorizontalBarChart
                    key={`${dataset.id}-${i}`}
                    data={chart.data}
                    title={chart.title}
                    color={dataset.color}
                  />
                );
              case "vertical":
                return (
                  <VerticalBarChart
                    key={`${dataset.id}-${i}`}
                    data={chart.data}
                    title={chart.title}
                    color={dataset.color}
                  />
                );
              case "doughnut":
                return (
                  <DoughnutChart
                    key={`${dataset.id}-${i}`}
                    data={chart.data}
                    title={chart.title}
                    colors={dataset.doughnutColors}
                    isSemi={chart.isSemi}
                  />
                );
              case "choropleth":
                return (
                  <USAChoroplethMap
                    key={`${dataset.id}-${i}`}
                    data={chart.data}
                    title={chart.title}
                    color={dataset.color}
                  />
                );
              case "treemap":
                return (
                  <TreemapChart
                    key={`${dataset.id}-${i}`}
                    data={chart.data}
                    title={chart.title}
                    color={dataset.color}
                  />
                );
              default:
                return null;
            }
          })}
        </motion.div>
      </div>
    </section>
  );
}
