import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
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
}

const FEATURES = [
  {
    icon: TwentyFourHoursClockIcon,
    title: "24-hour diagnostics",
    description:
      "We evaluate your device and provide a full report within the same business day.",
  },
  {
    icon: RepairIcon,
    title: "Warranty on all repairs",
    description:
      "All our work includes a 3-month warranty on both labor and parts.",
  },
  {
    icon: PinLocation03Icon,
    title: "In-person & remote service",
    description:
      "Visit our workshop in Bogotá or get remote support for consulting and software issues.",
  },
  {
    icon: LaborIcon,
    title: "Certified technicians",
    description:
      "Our team holds certifications across the leading brands and technologies on the market.",
  },
  {
    icon: BubbleChatIcon,
    title: "Transparent communication",
    description:
      "We keep you informed at every step of the process, with no surprises on your invoice.",
  },
  {
    icon: MentoringIcon,
    title: "Post-service support",
    description:
      "Active follow-up after every service to ensure your full satisfaction.",
  },
] satisfies Feature[];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <li>
      <Card className="h-full bg-muted/20 hover:bg-muted/40 transition-colors">
        <CardHeader>
          <HugeiconsIcon icon={feature.icon} aria-hidden />

          <CardTitle className="font-semibold text-sm">
            {feature.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </CardContent>
      </Card>
    </li>
  );
}

export function Features() {
  return (
    <section
      id="features"
      className="bg-background mx-auto max-w-6xl pt-20 lg:pt-24 pb-4 lg:pb-8 px-4 lg:px-8 space-y-4"
      aria-labelledby="features-heading"
    >
      <div className="space-y-4">
        <Badge>Why us?</Badge>

        <h2 id="features-heading" className="text-4xl font-bold tracking-tight">
          More than a repair.
          <br />A relationship built on trust.
        </h2>

        <p className="max-w-lg text-muted-foreground text-lg leading-relaxed text-justify md:text-left">
          We have been solving technology problems in Bogotá for over 8 years.
          We are not just technicians — we are your long-term technology
          partner.
        </p>

        <Button asChild>
          <Link href="#contact">
            Talk to a technician
            <HugeiconsIcon icon={ArrowRight02Icon} aria-hidden />
          </Link>
        </Button>
      </div>

      <ul className="grid gap-4 grid-cols-2 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </ul>
    </section>
  );
}
