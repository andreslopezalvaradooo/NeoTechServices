import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: readonly FAQ[] = [
  {
    question: "How is tech consulting different from hiring a developer?",
    answer:
      "A developer executes tasks within a defined scope. A tech consultant helps you define what to build, how to build it, and whether you should build it at all. We focus on strategy, architecture, and decision-making — the upstream decisions that determine whether your tech investment succeeds.",
  },
  {
    question: "Do you only advise, or do you also help with implementation?",
    answer:
      "Both. Depending on your plan and needs, we can operate as pure advisors (strategy, reviews, guidance) or as embedded team members helping implement solutions hands-on. Our Growth and Enterprise plans include varying levels of implementation support.",
  },
  {
    question: "How long does a typical engagement last?",
    answer:
      "It depends on the scope. A focused audit or architecture review can be completed in 1–2 weeks. A digital transformation or ongoing advisory engagement typically runs 3–12 months. We don't lock you into long contracts — most clients stay because they see value, not because they're obligated.",
  },
  {
    question: "What industries do you have experience in?",
    answer:
      "We've worked across FinTech, Health Tech, E-commerce, SaaS, Logistics, EdTech, and Professional Services. While we adapt to any industry, the underlying technology challenges — scalability, security, team alignment, technical debt — are remarkably consistent.",
  },
  {
    question: "How does the free discovery call work?",
    answer:
      "It's a 30-minute video call with one of our senior consultants. We listen to your situation, ask clarifying questions, and give you an honest initial assessment — including whether consulting is even the right fit for your problem. No pitch, no pressure.",
  },
  {
    question: "Can you work with our existing development team?",
    answer:
      "Absolutely. Most of our engagements involve collaborating directly with in-house teams. We act as technical advisors, architecture guides, or senior peers who help your team level up — not replace them.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes, always. Confidentiality is a baseline expectation for us. We sign mutual NDAs before any sensitive information is shared, and our team follows strict information security practices throughout every engagement.",
  },
  {
    question: "What if I'm not sure what kind of consulting I need?",
    answer:
      "That's exactly what the discovery call is for. Many clients come to us with a feeling that something is wrong — slow teams, rising costs, scaling problems — but no clear diagnosis. We help identify the root cause and recommend the most effective path forward.",
  },
] as const;

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-muted/30 min-h-dvh pt-16"
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4">
        <div className="space-y-4">
          <Badge className="border-primary/30 bg-primary/5 text-primary">
            FAQ
          </Badge>

          <h2 id="faq-heading" className="text-4xl font-bold tracking-tight">
            Frequently asked <span className="text-primary">questions.</span>
          </h2>

          <p className="max-w-xl text-lg text-muted-foreground">
            Everything you need to know before getting started. Still have
            questions?{" "}
            <Link
              href="#request"
              className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Just ask.
            </Link>
          </p>
        </div>

        <Accordion
          collapsible
          type="single"
          className="space-y-1"
          aria-label="Frequently asked questions"
        >
          {FAQS.map((faq) => {
            return (
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
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
