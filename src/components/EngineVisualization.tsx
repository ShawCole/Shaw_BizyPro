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
import { motion } from "framer-motion";
import { engineNodes, engineEdges, type EngineNodeData } from "@/lib/engine-nodes";
import EngineNodeDetail from "./EngineNodeDetail";

function EngineNode({ data }: NodeProps<Node<EngineNodeData>>) {
  return (
    <div
      className="bg-slate-800/90 backdrop-blur border border-white/10 rounded-xl p-4 cursor-pointer hover:border-white/20 transition-all group"
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

      <p className="text-xs text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
        Click for details
      </p>
    </div>
  );
}

export default function EngineVisualization() {
  const [selectedNode, setSelectedNode] = useState<EngineNodeData | null>(null);
  const nodeTypes = useMemo(() => ({ engineNode: EngineNode }), []);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node<EngineNodeData>) => {
    setSelectedNode(node.data);
  }, []);

  return (
    <section id="engine" className="relative py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-green font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase mb-4">
            The Architecture
          </p>
          <h2 className="font-[family-name:var(--font-merriweather)] text-3xl sm:text-4xl font-bold text-white mb-4">
            One Engine. Three Products.
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Click any node to explore how anonymous traffic becomes actionable revenue.
          </p>
        </motion.div>

        <motion.div
          className="h-[500px] rounded-2xl overflow-hidden border border-white/10 bg-navy-dark"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
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
            minZoom={0.5}
            maxZoom={1.5}
          >
            <Background color="#ffffff08" gap={30} />
          </ReactFlow>
        </motion.div>
      </div>

      <EngineNodeDetail
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </section>
  );
}
