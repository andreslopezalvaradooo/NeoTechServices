import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/src/lib/utils";
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
}

const STEPS: readonly Step[] = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Discovery Call",
    description:
      "A free 30-minute session to understand your business context, current challenges, and technology goals. No commitment required.",
    duration: "30 min",
  },
  {
    step: "02",
    icon: Search,
    title: "Deep Assessment",
    description:
      "We conduct a thorough analysis of your existing systems, processes, team capabilities, and strategic objectives.",
    duration: "1–3 days",
  },
  {
    step: "03",
    icon: FileText,
    title: "Strategic Report",
    description:
      "You receive a detailed consulting report with findings, prioritized recommendations, and a concrete action plan tailored to your situation.",
    duration: "2–5 days",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Execution",
    description:
      "We work alongside your team to implement the roadmap — whether hands-on delivery, architecture guidance, or embedded advisory support.",
    duration: "Ongoing",
  },
  {
    step: "05",
    icon: Handshake,
    title: "Ongoing Support",
    description:
      "Regular check-ins, progress reviews, and strategic adjustments to ensure your technology keeps up with your business evolution.",
    duration: "Monthly",
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
    <li
      className={cn(
        "group relative flex gap-4 lg:flex-col lg:gap-0 mb-6 lg:mt-15 lg:mr-3",
        isLast && "lg:mr-0 lg:mb-0",
      )}
    >
      {!isLast && (
        <>
          <div
            aria-hidden="true"
            className="absolute left-12 right-0 lg:left-0 lg:-top-10 lg:-right-3 hidden h-0.5 bg-border lg:block"
          />

          <div
            aria-hidden="true"
            className="absolute left-6 top-12 h-full w-0.5 bg-border lg:hidden"
          />
        </>
      )}

      <div
        aria-hidden="true"
        className="relative lg:absolute z-10 lg:-top-16 lg:left-0 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-border bg-background transition-colors duration-300 group-hover:border-primary"
      >
        <HugeiconsIcon
          icon={step.icon}
          className="text-muted-foreground transition-colors duration-300 group-hover:text-primary"
        />
      </div>

      <Card className="h-full max-w-3xs lg:pt-4">
        <CardHeader>
          <CardTitle>
            <div>
              <span className="text-xs font-bold text-primary">
                {step.step}
              </span>

              <Badge variant="secondary" className="font-normal">
                {step.duration}
              </Badge>
            </div>

            <span className="font-semibold">{step.title}</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="leading-relaxed text-muted-foreground">
          {step.description}
        </CardContent>
      </Card>
    </li>
  );
}

function CTA() {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">Ready to get started?</h3>

          <p className="text-muted-foreground">
            Book your free discovery call today — no strings attached.
          </p>
        </div>

        <Button asChild className="shrink-0">
          <Link href="#consulting-form">Book a free call</Link>
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
      className="min-h-[calc(100dvh-64px)]"
    >
      <div className="mx-auto max-w-6xl space-y-8 p-6 sm:p-8">
        <div className="space-y-4">
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/5 text-primary"
          >
            How It Works
          </Badge>

          <h2
            id="process-heading"
            className="text-4xl font-bold tracking-tight lg:text-5xl"
          >
            Simple, transparent process
          </h2>

          <p className="max-w-2xl text-lg text-muted-foreground">
            We follow a proven methodology designed to minimize friction and
            maximize the value we deliver at every stage.
          </p>
        </div>

        <ol
          aria-label="Consulting process steps"
          className="grid lg:grid-cols-5 justify-center"
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
