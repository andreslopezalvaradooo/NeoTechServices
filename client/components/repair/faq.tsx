import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon } from "@hugeicons/core-free-icons";

const WHATSAPP_URL = "https://wa.me/573000000000";

const FAQS = [
  {
    question: "Do I need an appointment to bring in my device?",
    answer:
      "No appointment needed. Just walk in during business hours (Mon–Sat 8am–6pm) and we'll take care of you right away.",
  },
  {
    question: "How long does a typical repair take?",
    answer:
      "Most repairs are completed within 24 to 72 business hours. Simple jobs like OS installs or RAM upgrades can be done the same day. We'll give you a precise ETA after the diagnostic.",
  },
  {
    question: "Is the diagnostic really free?",
    answer:
      "Yes, 100% free. We assess your device at no cost and provide a full report. You only pay if you decide to proceed with the repair.",
  },
  {
    question: "What if my device can't be repaired?",
    answer:
      "If there's no viable fix, we let you know before charging anything. Only the diagnostic applies in that case — and we'll help you explore your best replacement options.",
  },
  {
    question: "Do you use original parts?",
    answer:
      "We work with original or OEM-certified parts. We always inform you of the part type and its origin before starting any work.",
  },
  {
    question: "What does the 3-month warranty cover?",
    answer:
      "The warranty covers both labor and the specific parts replaced during your repair. If the same issue reappears within 3 months, we fix it at no additional cost.",
  },
  {
    question: "Can you recover data from a damaged device?",
    answer:
      "In many cases, yes. We offer data recovery services for devices with liquid damage, failed drives, or accidental deletion. Success depends on the level of damage — we'll assess it during the diagnostic.",
  },
  {
    question: "Do you offer remote support?",
    answer:
      "Yes. For software issues, configurations, and performance problems, we can connect remotely (with your permission) and resolve them without you needing to visit us.",
  },
] satisfies { question: string; answer: string }[];

export function Faq() {
  return (
    <section
      id="faq"
      className="bg-muted/30 min-h-dvh py-16"
      aria-labelledby="faq-heading"
    >
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

          <p className="max-w-lg text-muted-foreground text-lg leading-relaxed text-justify lg:text-left">
            Everything you need to know about our repair service. Still have
            questions? Reach out and we'll answer right away.
          </p>

          <Button asChild>
            <Link
              href={WHATSAPP_URL}
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
