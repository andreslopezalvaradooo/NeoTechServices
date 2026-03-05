import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Features } from "@/components/features";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { CTA } from "@/components/cta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
}
