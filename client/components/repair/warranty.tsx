import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  ShieldEnergyIcon,
  ToolsIcon,
  CustomerService01Icon,
  Invoice03Icon,
  Tick02Icon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons";

interface Feature {
  icon: IconSvgElement;
  title: string;
  description: string;
  accent: string;
  color: string;
}

const ITEMS = [
  "Free diagnostic on every device",
  "3-month warranty on labor and parts",
  "Certified technicians on every job",
  "Transparent quote before any work begins",
  "Genuine and OEM-certified parts only",
];

const WHATSAPP_URL =
  "https://wa.me/573000000000?text=Hi,%20I%20need%20a%20repair";

const WARRANTY_FEATURES = [
  {
    icon: ShieldEnergyIcon,
    title: "3-month warranty",
    description:
      "Every repair comes with a 3-month warranty covering both labor and replaced parts. No exceptions.",
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: ToolsIcon,
    title: "Genuine & OEM parts",
    description:
      "We only use original or OEM-certified parts. You'll always know exactly what goes into your device before we begin.",
    accent: "from-primary/15 to-primary/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: CustomerService01Icon,
    title: "Post-repair support",
    description:
      "Had an issue after your repair? Reach out and we'll take care of it. Your satisfaction doesn't end at pick-up.",
    accent: "from-[oklch(0.8_0.13_212)]/15 to-[oklch(0.8_0.13_212)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Invoice03Icon,
    title: "No fix, no fee",
    description:
      "If we can't repair your device, you only pay for the diagnostic. No hidden charges, no surprises.",
    accent: "from-[oklch(0.52_0.09_223)]/20 to-[oklch(0.52_0.09_223)]/5",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
] satisfies Feature[];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <li>
      <Card className={`h-full bg-linear-to-br ${feature.accent}`}>
        <CardHeader className="flex flex-col items-center text-center">
          <div
            aria-hidden
            className={`h-10 w-10 flex items-center justify-center rounded-xl ${feature.color}`}
          >
            <HugeiconsIcon icon={feature.icon} aria-hidden />
          </div>

          <CardTitle>{feature.title}</CardTitle>
        </CardHeader>

        <CardContent className="text-muted-foreground text-justify leading-relaxed">
          {feature.description}
        </CardContent>
      </Card>
    </li>
  );
}

export function Warranty() {
  return (
    <section
      id="warranty"
      className="min-h-dvh pt-16"
      aria-labelledby="warranty-heading"
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4 md:space-y-8">
        <div className="flex flex-col md:flex-row items-end gap-4">
          <div className="w-full space-y-4">
            <Badge className="bg-primary/5 border-primary/30 text-primary">
              Warranty & trust
            </Badge>

            <h2
              id="warranty-heading"
              className="text-4xl font-bold tracking-tight"
            >
              <span className="text-primary">We stand</span> behind
              <br />
              every repair.
            </h2>

            <p className="max-w-lg text-muted-foreground text-lg leading-relaxed text-justify lg:text-left">
              Our work doesn't end when you leave the workshop. Every repair is
              backed by a solid warranty and a team that's always available if
              something comes up.
            </p>
          </div>

          <div className="w-full space-y-4">
            <ul className="space-y-2">
              {ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <HugeiconsIcon
                    icon={Tick02Icon}
                    size={13}
                    strokeWidth={3}
                    className="text-emerald-500 shrink-0"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="space-x-2">
              <Button asChild>
                <Link
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Request a repair on WhatsApp"
                  className="group"
                >
                  Request a repair
                  <HugeiconsIcon
                    aria-hidden
                    icon={ArrowRight02Icon}
                    strokeWidth={2}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="#faq">Read the FAQ</Link>
              </Button>
            </div>
          </div>
        </div>

        <ul className="grid gap-4 md:gap-2 lg:gap-4 sm:grid-cols-2 md:grid-cols-4">
          {WARRANTY_FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </ul>
      </div>
    </section>
  );
}
