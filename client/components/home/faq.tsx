import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon } from "@hugeicons/core-free-icons";

const FAQS = [
  {
    question: "How long does a repair take?",
    answer:
      "Most repairs take between 24 and 72 business hours depending on the complexity and parts availability. We give you an exact estimate after the diagnostic.",
  },
  {
    question: "What happens if my device can't be repaired?",
    answer:
      "If there is no viable solution, we let you know before charging anything. Only the diagnostic fee applies in that case, and we advise you on the best replacement options.",
  },
  {
    question: "Do you use original parts?",
    answer:
      "Yes, we work with original or certified OEM-quality parts. We always inform you of the type of part to be used and its origin before we begin.",
  },
  {
    question: "Do you offer on-site service?",
    answer:
      "Yes, for consulting and preventive maintenance we can come to your location in Bogotá. Physical repairs are done at our workshop to guarantee the quality of our work.",
  },
  {
    question: "How does remote support work?",
    answer:
      "Through secure remote access tools (with your permission), we can diagnose and resolve software issues, configurations, and performance problems without you having to leave your location.",
  },
  {
    question: "Do you work with businesses?",
    answer:
      "Yes, we offer business plans with monthly maintenance, priority support, and special pricing for device fleets. Contact us for a personalized quote.",
  },
] satisfies { question: string; answer: string }[];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="min-h-dvh pt-16">
      <div className="mx-auto max-w-5xl p-4 sm:p-8 md:flex md:gap-4 space-y-4">
        <div className="w-full space-y-4 md:space-y-8">
          <Badge className="border-primary/30 bg-primary/5 text-primary">
            FAQ
          </Badge>

          <h2 id="faq-heading" className="text-4xl font-bold tracking-tight">
            Frequently asked
            <br />
            <span className="text-primary">questions.</span>
          </h2>

          <p className="text-lg text-muted-foreground text-justify sm:text-left">
            Have questions? Here we answer the most common ones. If you can't
            find your answer, reach out to us directly.
          </p>

          <Button asChild>
            <Link
              href="https://wa.me/573000000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ask a question on WhatsApp"
            >
              <HugeiconsIcon icon={WhatsappIcon} strokeWidth={2} aria-hidden />
              Ask on WhatsApp
            </Link>
          </Button>
        </div>

        <Accordion collapsible type="single" className="space-y-1 md:space-y-4">
          {FAQS.map((faq) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
              className="border rounded-xl px-5"
            >
              <AccordionTrigger className="hover:no-underline">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
