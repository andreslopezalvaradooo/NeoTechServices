import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { Features } from "@/components/home/features";
import { Testimonials } from "@/components/home/testimonials";
import { FAQ } from "@/components/home/faq";
import { CTA } from "@/components/home/cta";

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
