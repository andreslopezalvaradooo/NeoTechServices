import { Faq } from "@/components/repair/faq";
import { Form } from "@/components/repair/form";
import { Hero } from "@/components/repair/hero";
import { Pricing } from "@/components/repair/pricing";
import { Process } from "@/components/repair/process";
import { Warranty } from "@/components/repair/warranty";
import { WhatWeRepair } from "@/components/repair/what-we-repair";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laptop & PC Repair",
  description: "",
};

export default function Repair() {
  return (
    <div>
      <Hero />
      <WhatWeRepair />
      <Process />
      <Pricing />
      <Warranty />
      <Faq />
      <Form />
    </div>
  );
}
