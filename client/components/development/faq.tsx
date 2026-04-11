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
    question: "Do you work with clients outside Colombia?",
    answer:
      "Yes. We work with clients across Latin America and internationally. All communication can be in English or Spanish, and we adapt to your timezone for meetings.",
  },
  {
    question: "How do you handle project ownership and IP?",
    answer:
      "You own 100% of everything we build. Upon final payment, all code, assets, and infrastructure credentials are transferred to you. We sign an NDA before work begins if required.",
  },
  {
    question: "What's included in the free discovery call?",
    answer:
      "We review your project idea, define scope, recommend a tech stack, and give you a rough estimate — all at no cost and no obligation. It usually takes 30–60 minutes.",
  },
  {
    question: "Do you offer ongoing maintenance after launch?",
    answer:
      "Yes. We offer monthly retainer plans for maintenance, feature additions, bug fixes, and hosting management. We can discuss the right plan for you after launch.",
  },
  {
    question: "Can I see examples of previous work?",
    answer:
      "Absolutely. We share relevant case studies and live demos during the discovery call. Some projects are under NDA, but we'll show everything we can.",
  },
  {
    question: "What if I already have a design or partial codebase?",
    answer:
      "No problem. We can work from your Figma designs, continue an existing codebase, or start fresh. We'll audit what you have and recommend the best path forward.",
  },
  {
    question: "How do payments work?",
    answer:
      "We typically work with a 50% upfront payment and 50% on delivery for fixed-scope projects. For longer engagements, we use milestone-based billing agreed upon before work starts.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "Our main stack is Next.js, React, TypeScript, Node.js, PostgreSQL with Prisma, and React Native for mobile. We adapt based on your requirements — check the Tech Stack section for the full list.",
  },
] satisfies { question: string; answer: string }[];

export function Faq() {
  return (
    <section
      id="faq"
      className="bg-muted/30 min-h-dvh pt-16"
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

          <p className="max-w-lg text-muted-foreground text-lg leading-relaxed text-justify md:text-left">
            Everything you need to know about working with us. Still have
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

        <Accordion collapsible type="single" className="space-y-1 md:space-y-2">
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
