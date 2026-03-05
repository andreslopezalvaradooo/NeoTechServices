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
import {
  SearchIcon,
  Invoice03Icon,
  RepairIcon,
  DeliveryBox01Icon,
  ArrowRight02Icon,
  Clock,
} from "@hugeicons/core-free-icons";

// components/repair/RepairProcess.tsx

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
];

export function RepairProcess() {
  return (
    <section id="process" className="py-22 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-6">
        <div className="flex flex-col gap-4 max-w-2xl">
          <Badge>How it works</Badge>

          <h2 className="text-4xl font-bold tracking-tight">
            Simple process,
            <br />
            reliable results.
          </h2>

          <p className="text-muted-foreground text-lg">
            From drop-off to pick-up, we keep you informed at every step. No
            surprises, no delays.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.step} className="relative flex flex-col gap-4">
              <Card
                className={`h-full flex flex-col bg-linear-to-br ${step.color}`}
              >
                <CardHeader className="flex justify-between items-center">
                  <div className="h-11 w-11 rounded-xl border border-border bg-background flex items-center justify-center">
                    <HugeiconsIcon icon={step.icon} size={22} />
                  </div>

                  <CardTitle className="text-base">{step.title}</CardTitle>

                  <span className="text-4xl font-bold text-muted-foreground/20 select-none">
                    {step.step}
                  </span>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>

                <CardFooter>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-normal text-muted-foreground"
                  >
                    <HugeiconsIcon icon={Clock} strokeWidth={2} />{" "}
                    {step.duration}
                  </Badge>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-muted-foreground text-sm">
            Ready to get started? Bring your device or reach out first.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link
                href="https://wa.me/573000000000?text=Hi,%20I%20need%20a%20repair"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start my repair
                <HugeiconsIcon icon={ArrowRight02Icon} />
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
