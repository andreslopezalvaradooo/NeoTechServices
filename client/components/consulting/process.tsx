import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  MessageSquare,
  Search,
  FileText,
  Rocket,
  Handshake,
} from "@hugeicons/core-free-icons";
import Link from "next/link";

interface Step {
  step: string;
  icon: IconSvgElement;
  title: string;
  description: string;
  duration: string;
  accent: string;
  color: string;
}

const STEPS: readonly Step[] = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Discovery Call",
    description:
      "A free 30-minute session to understand your business context, current challenges, and technology goals. No commitment required.",
    duration: "30 min",
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    step: "02",
    icon: Search,
    title: "Deep Assessment",
    description:
      "We conduct a thorough analysis of your existing systems, processes, team capabilities, and strategic objectives.",
    duration: "1–3 days",
    accent: "from-primary/15 to-primary/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    step: "03",
    icon: FileText,
    title: "Strategic Report",
    description:
      "You receive a detailed consulting report with findings, prioritized recommendations, and a concrete action plan tailored to your situation.",
    duration: "2–5 days",
    accent: "from-[oklch(0.8_0.13_212)]/15 to-[oklch(0.8_0.13_212)]/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Execution",
    description:
      "We work alongside your team to implement the roadmap — whether hands-on delivery, architecture guidance, or embedded advisory support.",
    duration: "Ongoing",
    accent: "from-[oklch(0.52_0.09_223)]/20 to-[oklch(0.52_0.09_223)]/5",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    step: "05",
    icon: Handshake,
    title: "Ongoing Support",
    description:
      "Regular check-ins, progress reviews, and strategic adjustments to ensure your technology keeps up with your business evolution.",
    duration: "Monthly",
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
] as const;

const LAST_INDEX = STEPS.length - 1;

interface StepProps {
  step: Step;
  index: number;
}

function Step({ step, index }: StepProps) {
  const isLast = index === LAST_INDEX;

  return (
    <li className="group relative flex gap-2 md:gap-4 md:flex-col">
      {!isLast && (
        <>
          <div
            aria-hidden
            className="absolute left-12 top-6 -right-2 h-0.5 bg-border hidden md:block"
          />

          <div
            aria-hidden
            className="absolute left-6 top-12 -bottom-4 w-0.5 bg-border md:hidden"
          />
        </>
      )}

      <div
        aria-hidden
        className={`bg-background ${step.color} h-12 w-12 shrink-0 flex items-center justify-center rounded-full border-2 border-border transition-colors duration-300 group-hover:border-primary`}
      >
        <HugeiconsIcon icon={step.icon} />
      </div>

      <Card
        className={`bg-linear-to-br ${step.accent} h-full max-w-3xs py-2 md:gap-2 lg:gap-4`}
      >
        <CardHeader className="md:px-2">
          <CardTitle className="md:text-sm lg:text-base">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-bold text-primary">{step.step}</span>

              <Badge variant="secondary" className="md:text-[10px] lg:text-xs font-normal">
                {step.duration}
              </Badge>
            </div>

            {step.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="md:px-2 md:text-xs lg:text-sm text-justify text-muted-foreground leading-relaxed md:leading-normal">
          {step.description}
        </CardContent>
      </Card>
    </li>
  );
}

function CTA() {
  return (
    <Card className="bg-primary/5 md:py-2 border-primary/20">
      <CardContent className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">Ready to get started?</h3>

          <p className="text-muted-foreground">
            Book your free discovery call today — no strings attached.
          </p>
        </div>

        <Button asChild>
          <Link href="#request">Book a free call</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-muted/30 min-h-dvh pt-16"
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-6 md:space-y-4">
        <div className="space-y-4">
          <Badge className="border-primary/30 bg-primary/5 text-primary">
            How It Works
          </Badge>

          <h2
            id="process-heading"
            className="text-4xl font-bold tracking-tight"
          >
            Simple, transparent <span className="text-primary">process.</span>
          </h2>

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground text-justify md:text-left">
            We follow a proven methodology designed to minimize friction and
            maximize the value we deliver at every stage.
          </p>
        </div>

        <ol
          aria-label="Consulting process steps"
          className="grid gap-4 md:gap-2 md:grid-cols-5 justify-center"
        >
          {STEPS.map((step, index) => (
            <Step key={step.step} step={step} index={index} />
          ))}
        </ol>

        <CTA />
      </div>
    </section>
  );
}
