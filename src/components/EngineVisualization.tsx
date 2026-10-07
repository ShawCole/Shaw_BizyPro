"use client";

import { useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  type NodeProps,
  type Node,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { engineNodes, engineEdges, type EngineNodeData } from "@/lib/engine-nodes";
import EngineNodeDetail from "./EngineNodeDetail";
import Reveal from "./Reveal";
import { useMediaQuery } from "@/lib/useMediaQuery";

const PIPELINE = ["pixel", "identity", "enrichment"];
const PRODUCTS = ["arkdata", "listmagic", "dsp"];
const byId = (id: string) => engineNodes.find((n) => n.id === id)!.data;

function NodeIcon({ data, size = 32 }: { data: EngineNodeData; size?: number }) {
  return (
    <div
      className="rounded-lg flex items-center justify-center shrink-0"
      style={{ width: size, height: size, backgroundColor: `${data.color}20` }}
    >
      <svg width="16" height="16" fill="none" stroke={data.color} strokeWidth="1.5" viewBox="0 0 24 24">
        <path d={data.icon} />
      </svg>
    </div>
  );
}

function MobileNodeCard({ data, onSelect }: { data: EngineNodeData; onSelect: (d: EngineNodeData) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(data)}
      className="w-full text-left bg-slate-800/90 border rounded-xl p-4 flex items-center gap-3 active:bg-slate-800 transition-colors duration-150"
      style={{ borderColor: `${data.color}40` }}
    >
      <NodeIcon data={data} size={36} />
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold text-white">{data.label}</p>
        {data.metric && (
          <p className="mt-0.5">
            <span className="font-[family-name:var(--font-mono)] font-bold" style={{ color: data.color }}>
              {data.metric}
            </span>
            <span className="text-sm text-slate-400 ml-2">{data.metricLabel}</span>
          </p>
        )}
      </div>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500 shrink-0">
        <path d="M8 5l5 5-5 5" />
      </svg>
    </button>
  );
}

function Connector({ from, to }: { from: string; to: string }) {
  return (
    <svg width="2" height="28" className="mx-auto block" aria-hidden="true">
      <defs>
        <linearGradient id={`g-${from}-${to}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={byId(from).color} />
          <stop offset="1" stopColor={byId(to).color} />
        </linearGradient>
      </defs>
      <line x1="1" y1="0" x2="1" y2="28" stroke={`url(#g-${from}-${to})`} strokeWidth="2" className="flow-dash" />
    </svg>
  );
}

/** Phones: a vertical, non-draggable stack instead of a tiny pannable canvas. */
function EngineStack({ onSelect }: { onSelect: (d: EngineNodeData) => void }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-navy-dark p-4">
      {PIPELINE.map((id, i) => (
        <Reveal key={id} index={i}>
          {i > 0 && <Connector from={PIPELINE[i - 1]} to={id} />}
          <MobileNodeCard data={byId(id)} onSelect={onSelect} />
        </Reveal>
      ))}
      <Connector from="enrichment" to="listmagic" />
      <p className="text-center text-xs font-[family-name:var(--font-mono)] uppercase tracking-widest text-slate-500 my-2">
        Feeds three products
      </p>
      <div className="space-y-3">
        {PRODUCTS.map((id, i) => (
          <Reveal key={id} index={i}>
            <MobileNodeCard data={byId(id)} onSelect={onSelect} />
          </Reveal>
        ))}
      </div>
      <p className="text-center text-sm text-slate-500 mt-4">Tap a step for details</p>
    </div>
  );
}

function EngineNode({ data }: NodeProps<Node<EngineNodeData>>) {
  return (
    <div
      className="bg-slate-800/90 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-white/20 transition-colors duration-150 group"
      style={{ borderColor: `${data.color}30` }}
    >
      <Handle type="target" position={Position.Left} className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle type="source" position={Position.Right} className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-0 !h-0" id="bottom" />
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-0 !h-0" id="top" />

      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${data.color}20` }}
        >
          <svg width="16" height="16" fill="none" stroke={data.color} strokeWidth="1.5" viewBox="0 0 24 24">
            <path d={data.icon} />
          </svg>
        </div>
        <h4 className="text-sm font-semibold text-white">{data.label}</h4>
      </div>

      {data.metric && (
        <div className="flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-mono)] text-lg font-bold" style={{ color: data.color }}>
            {data.metric}
          </span>
          <span className="text-xs text-slate-400">{data.metricLabel}</span>
        </div>
      )}

      <p className="text-xs text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        Click for details
      </p>
    </div>
  );
}

export default function EngineVisualization() {
  const [selectedNode, setSelectedNode] = useState<EngineNodeData | null>(null);
  const nodeTypes = useMemo(() => ({ engineNode: EngineNode }), []);
  const isPhone = useMediaQuery("(max-width: 640px)");

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node<EngineNodeData>) => {
    setSelectedNode(node.data);
  }, []);

  return (
    <section id="engine" className="relative py-16 sm:py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10 sm:mb-12">
          <p className="text-green font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase mb-4">
            The Architecture
          </p>
          <h2 className="font-[family-name:var(--font-merriweather)] text-3xl sm:text-4xl font-bold text-white mb-4">
            One Engine. Three Products.
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {isPhone ? "Tap" : "Click"} any node to explore how anonymous traffic becomes actionable revenue.
          </p>
        </Reveal>

        {isPhone ? (
          <EngineStack onSelect={setSelectedNode} />
        ) : (
        <Reveal index={1} className="h-[440px] lg:h-[500px] rounded-2xl overflow-hidden border border-white/10 bg-navy-dark">
          <ReactFlow
            nodes={engineNodes}
            edges={engineEdges}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            proOptions={{ hideAttribution: true }}
            nodesDraggable={false}
            nodesConnectable={false}
            zoomOnScroll={false}
            panOnScroll={false}
            panOnDrag={false}
            zoomOnDoubleClick={false}
            minZoom={0.3}
            maxZoom={1.5}
          >
            <Background color="#ffffff08" gap={30} />
          </ReactFlow>
        </Reveal>
        )}
      </div>

      <EngineNodeDetail
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </section>
  );
}
