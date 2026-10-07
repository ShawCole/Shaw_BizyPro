import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Shaw Cole — Go-To-Market Engineer",
  description:
    "One data engine that finds your buyers. Agent fleets that run the work. Zero wasted ad spend.",
  openGraph: {
    title: "Shaw Cole — Go-To-Market Engineer",
    description: "One data engine that finds your buyers. Agent fleets that run the work. Zero wasted ad spend.",
    type: "website",
  },
};

export default function Home() {
  return <PageClient />;
}
