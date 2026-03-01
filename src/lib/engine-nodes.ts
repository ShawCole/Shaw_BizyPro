import type { Node, Edge } from "@xyflow/react";

export interface EngineNodeData {
  label: string;
  description: string;
  metric?: string;
  metricLabel?: string;
  details: string[];
  color: string;
  icon: string;
  [key: string]: unknown;
}

const nodeDefaults = {
  type: "engineNode",
  style: { width: 220 },
};

export const engineNodes: Node<EngineNodeData>[] = [
  {
    id: "pixel",
    position: { x: 50, y: 200 },
    data: {
      label: "Pixel Capture",
      description: "First-party JavaScript pixel deployed on client websites",
      metric: "< 50ms",
      metricLabel: "Load Time",
      details: [
        "First-party JS pixel — no third-party cookie dependency",
        "Captures device fingerprint, page views, session data",
        "Real-time event streaming to identity pipeline",
        "Ad blocker resistant architecture",
      ],
      color: "#39B54A",
      icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    },
    ...nodeDefaults,
  },
  {
    id: "identity",
    position: { x: 350, y: 200 },
    data: {
      label: "Identity Resolution",
      description: "Deterministic + probabilistic matching engine",
      metric: "~60%",
      metricLabel: "Resolution Rate",
      details: [
        "Deterministic matching on hashed email, phone, device ID",
        "Probabilistic scoring across 200+ signals",
        "~60% visitor-to-identity resolution rate",
        "$0 data COGS via strategic partnership",
      ],
      color: "#F59E0B",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    ...nodeDefaults,
  },
  {
    id: "enrichment",
    position: { x: 650, y: 200 },
    data: {
      label: "74-Col Enrichment",
      description: "Deep demographic, firmographic, and intent enrichment",
      metric: "3,451+",
      metricLabel: "Filter Options",
      details: [
        "74 enrichment columns per resolved identity",
        "Demographics: age, income, net worth, education, credit",
        "Firmographics: company, title, industry, revenue, size",
        "3,451+ filter options across 39 filters in 6 categories",
        "13,856-line taxonomy mapping",
      ],
      color: "#3B82F6",
      icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
    },
    ...nodeDefaults,
  },
  {
    id: "arkdata",
    position: { x: 400, y: 420 },
    data: {
      label: "ArkData Platform",
      description: "Full visitor intelligence dashboard for client teams",
      metric: "Real-time",
      metricLabel: "Dashboard",
      details: [
        "Visitor-level analytics with identity profiles",
        "Audience segmentation and list building",
        "Integration with CRMs via Reverse ETL (Multiwoven)",
        "Multi-tenant with role-based access control",
      ],
      color: "#39B54A",
      icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7",
    },
    ...nodeDefaults,
  },
  {
    id: "listmagic",
    position: { x: 700, y: 420 },
    data: {
      label: "ListMagic Widget",
      description: "Embeddable voice-driven list-building for any SaaS",
      metric: "Voice-first",
      metricLabel: "UX",
      details: [
        "Embeddable widget for any SaaS platform",
        "Voice-driven audience building — speak your criteria",
        "Instant list generation from 3,451+ filter options",
        "Disrupts Apollo, ZoomInfo, ListKit at fraction of cost",
      ],
      color: "#3B82F6",
      icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
    },
    ...nodeDefaults,
  },
  {
    id: "dsp",
    position: { x: 1000, y: 420 },
    data: {
      label: "DSP / Activation",
      description: "Omnichannel campaign execution across every touchpoint",
      metric: "5 Channels",
      metricLabel: "Reach",
      details: [
        "Programmatic display ads via DSP integration",
        "Email sequences triggered by visitor behavior",
        "SMS / text campaigns with compliance",
        "Voice outreach via AI-powered dialers",
        "Retargeting across social and web",
      ],
      color: "#8B5CF6",
      icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
    },
    ...nodeDefaults,
  },
];

export const engineEdges: Edge[] = [
  {
    id: "pixel-identity",
    source: "pixel",
    target: "identity",
    animated: true,
    style: { stroke: "#39B54A", strokeWidth: 2 },
  },
  {
    id: "identity-enrichment",
    source: "identity",
    target: "enrichment",
    animated: true,
    style: { stroke: "#F59E0B", strokeWidth: 2 },
  },
  {
    id: "enrichment-arkdata",
    source: "enrichment",
    target: "arkdata",
    animated: true,
    style: { stroke: "#39B54A", strokeWidth: 2 },
  },
  {
    id: "enrichment-listmagic",
    source: "enrichment",
    target: "listmagic",
    animated: true,
    style: { stroke: "#3B82F6", strokeWidth: 2 },
  },
  {
    id: "enrichment-dsp",
    source: "enrichment",
    target: "dsp",
    animated: true,
    style: { stroke: "#8B5CF6", strokeWidth: 2 },
  },
];
