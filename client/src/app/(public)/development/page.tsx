import { Metadata } from "next";
import { Hero } from "@/components/development/hero";
import { WhatWeBuild } from "@/components/development/what-we-build";
import { Process } from "@/components/development/process";
import { Pricing } from "@/components/development/pricing";
import { TechStack } from "@/components/development/tech-stack";
import { Faq } from "@/components/development/faq";
import { Request } from "@/components/development/request";

export const metadata: Metadata = {
  title: "Software Development",
  description:
    "Custom web applications, APIs, and mobile apps built with modern stacks. From MVPs to enterprise platforms — clean code, on-time delivery.",
};

export default function Development() {
  return (
    <div>
      <Hero />
      <WhatWeBuild />
      <Process />
      <Pricing />
      <TechStack />
      <Faq />
      <Request />
    </div>
  );
}
