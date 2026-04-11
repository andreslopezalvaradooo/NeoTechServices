import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { Features } from "@/components/home/features";
import { Testimonials } from "@/components/home/testimonials";
import { Faq } from "@/components/home/faq";
import { Cta } from "@/components/home/cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Features />
      <Testimonials />
      <Faq />
      <Cta />
    </main>
  );
}
