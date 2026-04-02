import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  SearchIcon,
  Invoice03Icon,
  RepairIcon,
  DeliveryBox01Icon,
  ArrowRight02Icon,
  Clock,
} from "@hugeicons/core-free-icons";

interface Step {
  step: string;
  icon: IconSvgElement;
  title: string;
  description: string;
  duration: string;
  accent: string;
  color: string;
}

const WHATSAPP_URL =
  "https://wa.me/573000000000?text=Hi,%20I%20need%20a%20repair";

const STEPS = [
  {
    step: "01",
    icon: SearchIcon,
    title: "Diagnosis",
    description:
      "Bring in your device and we'll run a full diagnostic at no cost. We identify the root cause and assess the damage.",
    duration: "Same day",
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    step: "02",
    icon: Invoice03Icon,
    title: "Quote",
    description:
      "We provide a detailed, transparent quote with no hidden fees. You decide whether to proceed — no pressure.",
    duration: "Within 1 hour",
    accent: "from-primary/15 to-primary/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    step: "03",
    icon: RepairIcon,
    title: "Repair",
    description:
      "Once approved, our certified technicians get to work using genuine or OEM-certified parts.",
    duration: "24–72 business hours",
    accent: "from-[oklch(0.8_0.13_212)]/15 to-[oklch(0.8_0.13_212)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    step: "04",
    icon: DeliveryBox01Icon,
    title: "Delivery",
    description:
      "We test everything before handing it back. Your device leaves our workshop fully functional and under warranty.",
    duration: "On time, every time",
    accent: "from-[oklch(0.52_0.09_223)]/20 to-[oklch(0.52_0.09_223)]/5",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
] satisfies Step[];

function StepCard({ step }: { step: Step }) {
  return (
    <li>
      <Card
        className={`h-full md:py-2 lg:py-4 md:gap-2 lg:gap-4 bg-linear-to-br ${step.accent}`}
      >
        <CardHeader className="flex justify-between items-center">
          <div
            aria-hidden
            className={`h-10 w-10 flex items-center justify-center rounded-xl ${step.color}`}
          >
            <HugeiconsIcon icon={step.icon} aria-hidden />
          </div>

          <CardTitle>{step.title}</CardTitle>

          <span
            className="text-4xl font-bold text-muted-foreground/20 select-none"
            aria-hidden
          >
            {step.step}
          </span>
        </CardHeader>

        <CardContent className="flex-1 text-muted-foreground text-justify leading-relaxed">
          {step.description}
        </CardContent>

        <CardFooter className={`md:py-2 lg:p-4 bg-linear-to-br ${step.accent}`}>
          <Badge
            variant="outline"
            className="text-[10px] text-muted-foreground"
          >
            <HugeiconsIcon icon={Clock} strokeWidth={2} aria-hidden />{" "}
            {step.duration}
          </Badge>
        </CardFooter>
      </Card>
    </li>
  );
}

export function Process() {
  return (
    <section
      id="process"
      className="min-h-dvh pt-16"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4">
        <div className="space-y-4">
          <Badge className="bg-primary/5 border-primary/30 text-primary">
            How it works
          </Badge>

          <h2
            id="process-heading"
            className="text-4xl font-bold tracking-tight"
          >
            <span className="text-primary">Simple</span> process,{" "}
            <br className="md:hidden lg:block" />
            reliable results.
          </h2>

          <p className="text-muted-foreground text-lg text-justify lg:text-left">
            From drop-off to pick-up, we keep you informed at every step. No
            surprises, no delays.
          </p>
        </div>

        <ul className="grid gap-4 md:gap-2 lg:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <StepCard key={step.title} step={step} />
          ))}
        </ul>

        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-muted-foreground text-sm">
            Ready to get started? Bring your device or reach out first.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Start my repair on WhatsApp"
                className="group"
              >
                Start my repair
                <HugeiconsIcon
                  aria-hidden
                  icon={ArrowRight02Icon}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="#prices">View pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
