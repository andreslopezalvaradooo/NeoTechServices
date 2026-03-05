import { RepairFAQ } from "@/components/repair-faq";
import { RepairForm } from "@/components/repair-form";
import { RepairHero } from "@/components/repair-hero";
import { RepairPricing } from "@/components/repair-pricing";
import { RepairProcess } from "@/components/repair-process";
import { RepairWarranty } from "@/components/repair-warranty";
import { WhatWeRepair } from "@/components/what-we-repair";

export default function RepairPage() {
  return (
    <div>
      <RepairHero />
      <WhatWeRepair />
      <RepairProcess />
      <RepairPricing />
      <RepairWarranty />
      <RepairFAQ />
      <RepairForm />
    </div>
  );
}
