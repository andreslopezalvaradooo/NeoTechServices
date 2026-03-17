import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { CTA } from "@/components/cta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
}
