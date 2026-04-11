import { Metadata } from "next";
import { Hero } from "@/components/consulting/hero";
import { Services } from "@/components/consulting/services";
import { For } from "@/components/consulting/for";
import { Process } from "@/components/consulting/process";
import { CaseStudies } from "@/components/consulting/case-studies";
import { Pricing } from "@/components/consulting/pricing";
import { TechStack } from "@/components/consulting/tech-stack";
import { Faq } from "@/components/consulting/faq";
import { Request } from "@/components/consulting/request";

export const metadata: Metadata = {
  title: "Tech Consulting",
  description:
    "Expert technology consulting for startups, SMBs, and enterprises. Software architecture, digital transformation, tech audits, and IT strategy.",
};

export default function Consulting() {
  return (
    <div>
      <Hero />
      <Services />
      <For />
      <Process />
      <CaseStudies />
      <Pricing />
      <TechStack />
      <Faq />
      <Request />
    </div>
  );
}
