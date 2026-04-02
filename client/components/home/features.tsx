import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  BubbleChatIcon,
  LaborIcon,
  MentoringIcon,
  PinLocation03Icon,
  ArrowRight02Icon,
  RepairIcon,
  TwentyFourHoursClockIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";

interface Feature {
  icon: IconSvgElement;
  title: string;
  description: string;
  accent: string;
  color: string;
}

const FEATURES = [
  {
    icon: TwentyFourHoursClockIcon,
    title: "24-hour diagnostics",
    description:
      "We evaluate your device and provide a full report within the same business day.",
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: RepairIcon,
    title: "Warranty on all repairs",
    description:
      "All our work includes a 3-month warranty on both labor and parts.",
    accent: "from-primary/15 to-primary/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: PinLocation03Icon,
    title: "In-person & remote service",
    description:
      "Visit our workshop in Bogotá or get remote support for consulting and software issues.",
    accent: "from-[oklch(0.8_0.13_212)]/15 to-[oklch(0.8_0.13_212)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: LaborIcon,
    title: "Certified technicians",
    description:
      "Our team holds certifications across the leading brands and technologies on the market.",
    accent: "from-[oklch(0.52_0.09_223)]/20 to-[oklch(0.52_0.09_223)]/5",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    icon: BubbleChatIcon,
    title: "Transparent communication",
    description:
      "We keep you informed at every step of the process, with no surprises on your invoice.",
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: MentoringIcon,
    title: "Post-service support",
    description:
      "Active follow-up after every service to ensure your full satisfaction.",
    accent: "from-primary/15 to-primary/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
] satisfies Feature[];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <li>
      <Card
        className={`h-full md:px-1 md:py-2 lg:py-4 md:gap-2 lg:gap-4 bg-linear-to-br ${feature.accent}`}
      >
        <CardHeader className="md:px-1 flex flex-col items-center">
          <div
            aria-hidden
            className={`h-10 w-10 flex items-center justify-center rounded-xl ${feature.color}`}
          >
            <HugeiconsIcon icon={feature.icon} />
          </div>

          <CardTitle>{feature.title}</CardTitle>
        </CardHeader>

        <CardContent className="md:px-2 lg:px-4 text-muted-foreground text-justify leading-relaxed">
          {feature.description}
        </CardContent>
      </Card>
    </li>
  );
}

export function Features() {
  return (
    <section
      id="features"
      className="min-h-dvh pt-16"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4 lg:space-y-3">
        <div className="space-y-4 md:space-y-2">
          <Badge className="bg-primary/5 border-primary/30 text-primary">
            Why us?
          </Badge>

          <h2
            id="features-heading"
            className="text-4xl font-bold tracking-tight"
          >
            More than a repair.
            <br />A relationship built on{" "}
            <span className="text-primary">trust.</span>
          </h2>

          <p className="max-w-xl text-lg text-muted-foreground text-justify sm:text-left">
            We have been solving technology problems in Bogotá for over 8 years.
            We are not just technicians — we are your long-term technology
            partner.
          </p>

          <Button asChild>
            <Link href="#contact" className="group">
              Talk to a technician
              <HugeiconsIcon
                aria-hidden
                icon={ArrowRight02Icon}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Button>
        </div>

        <ul className="grid gap-4 sm:grid-cols-3 lg:gap-2">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </ul>
      </div>
    </section>
  );
}
