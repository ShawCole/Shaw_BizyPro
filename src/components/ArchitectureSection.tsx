"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import EngineNodeDetail from "./EngineNodeDetail";
import {
  ACTIVATION,
  CHANNELS,
  CONSULTING,
  ENGINES,
  PRODUCTS,
  type BlockData,
} from "@/lib/architecture";

function Icon({ data, size = 40 }: { data: BlockData; size?: number }) {
  return (
    <span
      className="rounded-xl inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size, backgroundColor: `${data.color}1f` }}
    >
      <svg width="20" height="20" fill="none" stroke={data.color} strokeWidth="1.5" viewBox="0 0 24 24">
        <path d={data.icon} />
      </svg>
    </span>
  );
}

function Metric({ data }: { data: BlockData }) {
  if (!data.metric) return null;
  return (
    <span className="block mt-3">
      <span className="font-[family-name:var(--font-mono)] font-bold" style={{ color: data.color }}>
        {data.metric}
      </span>
      <span className="text-sm text-slate-400 ml-2">{data.metricLabel}</span>
    </span>
  );
}

/** One clickable block. Opens the detail panel. */
function Block({
  data,
  onSelect,
  className = "",
  children,
}: {
  data: BlockData;
  onSelect: (d: BlockData) => void;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(data)}
      className={`group w-full h-full text-left bg-slate-800/60 border rounded-2xl p-5 hover:bg-slate-800 transition-colors duration-150 ${className}`}
      style={{ borderColor: `${data.color}33` }}
    >
      <span className="flex items-center gap-3">
        <Icon data={data} />
        <span className="text-base font-semibold text-white">{data.label}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="ml-auto text-slate-500 group-hover:text-slate-300 transition-colors duration-150 shrink-0"
          aria-hidden="true"
        >
          <path d="M8 5l5 5-5 5" />
        </svg>
      </span>
      <span className="block text-sm text-slate-400 mt-3">{data.description}</span>
      {children}
      <Metric data={data} />
    </button>
  );
}

function LayerLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-slate-500 mb-3">
      <span className="text-slate-600">{n}</span> · {children}
    </p>
  );
}

/** Dashed link between layers: "this layer is built on the one below". */
function Connector() {
  return (
    <svg width="2" height="32" className="mx-auto my-3 block" aria-hidden="true">
      <line x1="1" y1="0" x2="1" y2="32" stroke="#475569" strokeWidth="2" className="flow-dash" />
    </svg>
  );
}

export default function ArchitectureSection() {
  const [selected, setSelected] = useState<BlockData | null>(null);

  return (
    <section id="engine" className="relative py-16 sm:py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10 sm:mb-14">
          <p className="text-green font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase mb-4">
            The Architecture
          </p>
          <h2 className="font-[family-name:var(--font-merriweather)] text-3xl sm:text-4xl font-bold text-white mb-4">
            Two Engines. Everything Built On Top.
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A data engine that finds your buyers, and agent fleets that build and run the rest. Tap any block for
            details.
          </p>
        </Reveal>

        {/* 04 — how clients start */}
        <Reveal>
          <LayerLabel n="04">Work with me</LayerLabel>
          <Block data={CONSULTING} onSelect={setSelected} />
        </Reveal>

        <Connector />

        {/* 03 — activation */}
        <Reveal>
          <LayerLabel n="03">Activation</LayerLabel>
          <Block data={ACTIVATION} onSelect={setSelected}>
            <span className="flex flex-wrap gap-2 mt-4">
              {CHANNELS.map((c) => (
                <span
                  key={c}
                  className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${ACTIVATION.color}1f`, color: "#C4B5FD" }}
                >
                  {c}
                </span>
              ))}
            </span>
          </Block>
        </Reveal>

        <Connector />

        {/* 02 — products */}
        <div>
          <Reveal>
            <LayerLabel n="02">Products</LayerLabel>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.id} index={i}>
                <Block data={p} onSelect={setSelected} />
              </Reveal>
            ))}
          </div>
        </div>

        <Connector />

        {/* 01 — the two engines everything sits on */}
        <div>
          <Reveal>
            <LayerLabel n="01">The two engines</LayerLabel>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <Reveal index={0}>
              <Block data={ENGINES[0]} onSelect={setSelected} className="border-2">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-4 font-[family-name:var(--font-mono)] text-xs text-slate-300">
                  {["Pixel", "Identity", "74-col enrichment"].map((s, i) => (
                    <span key={s} className="flex items-center gap-2">
                      {i > 0 && <span className="text-slate-600" aria-hidden="true">→</span>}
                      <span className="px-2 py-1 rounded-md bg-slate-900/80 border border-white/10">{s}</span>
                    </span>
                  ))}
                </span>
              </Block>
            </Reveal>
            <Reveal index={1}>
              <Block data={ENGINES[1]} onSelect={setSelected} className="border-2">
                <span className="flex flex-wrap items-center gap-2 mt-4 font-[family-name:var(--font-mono)] text-xs text-slate-300">
                  {["Claude", "GPT", "Gemini"].map((m) => (
                    <span key={m} className="px-2 py-1 rounded-md bg-slate-900/80 border border-white/10">
                      {m}
                    </span>
                  ))}
                </span>
              </Block>
            </Reveal>
          </div>
        </div>

        {/* Map Builder, live */}
        <Reveal className="mt-16 sm:mt-20">
          <div className="text-center mb-6">
            <p className="font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase mb-3 text-[#14B8A6]">
              Map Builder, live
            </p>
            <h3 className="font-[family-name:var(--font-merriweather)] text-2xl sm:text-3xl font-bold text-white mb-3">
              A Real Audience, Mapped to the ZIP Code
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Decision-makers researching AI automation in the last 14 days. Aggregate counts only, no individual
              records. Zoom in for ZIP codes.
            </p>
          </div>
          {/* Phones: map only (the side panel would need its own scroll inside the frame). */}
          <iframe
            src="/embed/audience-map.html?panel=0"
            title="Map Builder: live audience map"
            loading="lazy"
            className="sm:hidden w-full h-[560px] rounded-2xl border border-white/10 bg-navy-dark"
          />
          <iframe
            src="/embed/audience-map.html"
            title="Map Builder: live audience map"
            loading="lazy"
            className="hidden sm:block w-full h-[640px] rounded-2xl border border-white/10 bg-navy-dark"
          />
        </Reveal>
      </div>

      <EngineNodeDetail node={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
