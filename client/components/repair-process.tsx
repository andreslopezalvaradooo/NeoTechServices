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
    color: "from-blue-500/10 to-cyan-500/5",
  },
  {
    step: "02",
    icon: Invoice03Icon,
    title: "Quote",
    description:
      "We provide a detailed, transparent quote with no hidden fees. You decide whether to proceed — no pressure.",
    duration: "Within 1 hour",
    color: "from-violet-500/10 to-purple-500/5",
  },
  {
    step: "03",
    icon: RepairIcon,
    title: "Repair",
    description:
      "Once approved, our certified technicians get to work using genuine or OEM-certified parts.",
    duration: "24–72 business hours",
    color: "from-amber-500/10 to-orange-500/5",
  },
  {
    step: "04",
    icon: DeliveryBox01Icon,
    title: "Delivery",
    description:
      "We test everything before handing it back. Your device leaves our workshop fully functional and under warranty.",
    duration: "On time, every time",
    color: "from-emerald-500/10 to-teal-500/5",
  },
] satisfies Step[];

function StepCard({ step }: { step: Step }) {
  return (
    <li>
      <Card className={`h-full flex flex-col bg-linear-to-br ${step.color}`}>
        <CardHeader className="flex justify-between items-center">
          <div
            className="h-11 w-11 rounded-xl border border-border bg-background flex items-center justify-center"
            aria-hidden
          >
            <HugeiconsIcon icon={step.icon} size={22} aria-hidden />
          </div>

          <CardTitle className="text-base">{step.title}</CardTitle>

          <span
            className="text-4xl font-bold text-muted-foreground/20 select-none"
            aria-hidden
          >
            {step.step}
          </span>
        </CardHeader>

        <CardContent className="flex-1 text-sm text-muted-foreground leading-relaxed">
          {step.description}
        </CardContent>

        <CardFooter>
          <Badge
            variant="outline"
            className="text-[10px] font-normal text-muted-foreground"
          >
            <HugeiconsIcon icon={Clock} strokeWidth={2} aria-hidden />{" "}
            {step.duration}
          </Badge>
        </CardFooter>
      </Card>
    </li>
  );
}

export function RepairProcess() {
  return (
    <section
      id="process"
      className="bg-background mx-auto max-w-6xl pt-20 lg:pt-24 pb-4 lg:pb-8 px-4 lg:px-8 flex flex-col gap-6"
      aria-labelledby="process-heading"
    >
      <div className="flex flex-col gap-4">
        <Badge>How it works</Badge>

        <h2 id="process-heading" className="text-4xl font-bold tracking-tight">
          Simple process,
          <br />
          reliable results.
        </h2>

        <p className="max-w-lg text-muted-foreground text-lg text-justify lg:text-left">
          From drop-off to pick-up, we keep you informed at every step. No
          surprises, no delays.
        </p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <StepCard key={step.title} step={step} />
        ))}
      </ul>

      {/* Bottom CTA */}
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-muted-foreground text-sm">
          Ready to get started? Bring your device or reach out first.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Start my repair on WhatsApp"
            >
              Start my repair
              <HugeiconsIcon icon={ArrowRight02Icon} aria-hidden />
            </Link>
          </Button>

          <Button variant="secondary" asChild>
            <Link href="#prices">View pricing</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
