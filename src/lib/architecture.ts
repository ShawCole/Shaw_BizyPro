// The architecture section: two engines at the foundation, everything else
// built on top. Each block opens the detail panel.

export interface BlockData {
  id: string;
  label: string;
  description: string;
  metric?: string;
  metricLabel?: string;
  details: string[];
  color: string;
  icon: string;
  cta?: { label: string; href: string };
}

const ICON = {
  database:
    "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
  chip:
    "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  eye: "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  mic: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
  map: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  list: "M4 6h16M4 10h16M4 14h16M4 18h16",
  megaphone:
    "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
  calendar:
    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
};

export const ENGINES: BlockData[] = [
  {
    id: "data-engine",
    label: "The Data Engine",
    description:
      "A first-party pixel, identity resolution and 74-column enrichment. Every product on this page reads from it.",
    metric: "~60%",
    metricLabel: "of visitors resolved",
    details: [
      "First-party JavaScript pixel, no third-party cookie dependency",
      "Deterministic + probabilistic identity matching: ~60% of visitors resolved",
      "74 enrichment columns per identity: demographics, firmographics, intent",
      "3,451+ filter options across 39 dimensions",
    ],
    color: "#39B54A",
    icon: ICON.database,
  },
  {
    id: "orchestraos",
    label: "OrchestraOS",
    description:
      "My multi-agent operating system: fleets of AI agents that build, ship and run everything on this page.",
    metric: "24/7",
    metricLabel: "agent fleets",
    details: [
      "Runs on Claude, GPT and Gemini: swap models without rebuilding",
      "Agents hand work to a fresh agent mid-task without losing context",
      "Every decision that needs a human lands as a card on my phone and watch",
      "Runs around the clock on my own servers",
    ],
    color: "#F59E0B",
    icon: ICON.chip,
  },
];

export const PRODUCTS: BlockData[] = [
  {
    id: "intentmagic",
    label: "IntentMagic",
    description: "See who's on your site before they fill out a form.",
    metric: "Real-time",
    metricLabel: "visitor intelligence",
    details: [
      "Real-time visitor identification dashboard",
      "74-column enrichment on every resolved visitor",
      "CRM sync via Reverse ETL integrations",
      "Multi-tenant with role-based access",
    ],
    color: "#39B54A",
    icon: ICON.eye,
  },
  {
    id: "listmagic",
    label: "ListMagic",
    description: "Build targeted audiences in seconds by speaking your criteria.",
    metric: "Voice-first",
    metricLabel: "audience builder",
    details: [
      "Embeddable widget for any SaaS platform",
      "Voice-first UX: speak your audience criteria",
      "3,451+ filter options across 39 dimensions",
      "Fraction of the cost of Apollo or ZoomInfo",
    ],
    color: "#3B82F6",
    icon: ICON.mic,
  },
  {
    id: "map-builder",
    label: "Map Builder",
    description: "Interactive maps of any audience by state, county and ZIP code.",
    metric: "ZIP-level",
    metricLabel: "audience maps",
    details: [
      "Shade any audience by state, county or ZIP code",
      "Switch between company HQ and home address",
      "Aggregate counts only: no individual records exposed",
      "Embeds on any website with one line of code (live demo below)",
    ],
    color: "#14B8A6",
    icon: ICON.map,
  },
  {
    id: "data-products",
    label: "Data Products",
    description: "Audience lists built to your exact buyer profile.",
    metric: "Custom",
    metricLabel: "audience lists",
    details: [
      "Lists built to your ideal customer profile",
      "Every record enriched with the same 74 columns",
      "Delivered as a file or synced to your CRM",
    ],
    color: "#60A5FA",
    icon: ICON.list,
  },
];

export const CHANNELS = ["Display", "Email", "SMS", "AI Voice", "Retargeting"];

export const ACTIVATION: BlockData = {
  id: "activation",
  label: "Activation",
  description: "Reach the audience on every channel, triggered by what they actually do.",
  metric: "5",
  metricLabel: "channels",
  details: [
    "Programmatic display ads via DSP integration",
    "Email sequences triggered by visitor behavior",
    "SMS campaigns with compliance built in",
    "AI-powered voice outreach",
    "Retargeting across social and web",
  ],
  color: "#8B5CF6",
  icon: ICON.megaphone,
};

export const CONSULTING: BlockData = {
  id: "consulting",
  label: "Work With Me",
  description: "Most clients start with a 30-minute call, then a build or a retainer.",
  metric: "30 min",
  metricLabel: "strategy call",
  details: [
    "Strategy call: a traffic audit and a resolution-rate estimate",
    "Done-for-you builds: pixels, audiences, maps, campaigns and agent fleets",
    "Ongoing retainers for teams that want it run for them",
  ],
  color: "#F8FAFC",
  icon: ICON.calendar,
  cta: { label: "Book a strategy call", href: "#contact" },
};
