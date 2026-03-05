import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
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
];

export function Features() {
  return (
    <section id="features" className="py-22 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid gap-8 lg:grid-cols-2 items-center">
        <div className="space-y-6">
          <Badge>Why us?</Badge>

          <h2 className="text-4xl font-bold tracking-tight">
            More than a repair.
            <br />A relationship built on trust.
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            We have been solving technology problems in Bogotá for over 8 years.
            We are not just technicians — we are your long-term technology
            partner.
          </p>

          <Button asChild>
            <Link href="#contact">
              Talk to a technician
              <HugeiconsIcon icon={ArrowRight02Icon} />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <CardHeader>
                <HugeiconsIcon icon={feature.icon} />

                <h3 className="font-semibold text-sm">{feature.title}</h3>
              </CardHeader>

              <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
