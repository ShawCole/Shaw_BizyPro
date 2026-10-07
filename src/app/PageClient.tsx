"use client";

import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SolutionsSection from "@/components/SolutionsSection";
import ResultsSection from "@/components/ResultsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

import ArchitectureSection from "@/components/ArchitectureSection";

const DataVizShowcase = dynamic(
  () => import("@/components/DataVizShowcase"),
  { ssr: false }
);

export default function PageClient() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <HeroSection />
        <ArchitectureSection />
        <SolutionsSection />
        <DataVizShowcase />
        <ResultsSection />
        <HowItWorksSection />
        <ContactSection />
      </main>
      <Footer />
    </MotionConfig>
  );
}
