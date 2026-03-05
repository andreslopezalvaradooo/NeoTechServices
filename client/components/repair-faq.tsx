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

const REPAIR_FAQS = [
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
];

export function RepairFAQ() {
  return (
    <section id="faq" className="py-22 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Copy */}
          <div className="flex flex-col gap-4">
            <Badge>FAQ</Badge>

            <h2 className="text-4xl font-bold tracking-tight">
              Frequently asked
              <br />
              questions.
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Everything you need to know about our repair service. Still have
              questions? Reach out and we'll answer right away.
            </p>

            <Button asChild>
              <Link
                href="https://wa.me/573000000000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HugeiconsIcon icon={WhatsappIcon} strokeWidth={2} />
                Ask on WhatsApp
              </Link>
            </Button>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="space-y-1">
            {REPAIR_FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-xl px-5 bg-background"
              >
                <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline text-left">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
