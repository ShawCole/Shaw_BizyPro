import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Shaw Cole — Data Engine Architect",
  description:
    "Three companies. One data engine. Zero wasted ad spend. Visitor identification, audience building, and omnichannel activation.",
  openGraph: {
    title: "Shaw Cole — Data Engine Architect",
    description: "Three companies. One data engine. Zero wasted ad spend.",
    type: "website",
  },
};

export default function Home() {
  return <PageClient />;
}
