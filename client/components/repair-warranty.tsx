import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShieldEnergyIcon,
  ToolsIcon,
  CustomerService01Icon,
  Invoice03Icon,
  Tick02Icon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons";

const WARRANTY_FEATURES = [
  {
    icon: ShieldEnergyIcon,
    title: "3-month warranty",
    description:
      "Every repair comes with a 3-month warranty covering both labor and replaced parts. No exceptions.",
    accent: "from-emerald-500/10 to-teal-500/5",
  },
  {
    icon: ToolsIcon,
    title: "Genuine & OEM parts",
    description:
      "We only use original or OEM-certified parts. You'll always know exactly what goes into your device before we begin.",
    accent: "from-blue-500/10 to-cyan-500/5",
  },
  {
    icon: CustomerService01Icon,
    title: "Post-repair support",
    description:
      "Had an issue after your repair? Reach out and we'll take care of it. Your satisfaction doesn't end at pick-up.",
    accent: "from-violet-500/10 to-purple-500/5",
  },
  {
    icon: Invoice03Icon,
    title: "No fix, no fee",
    description:
      "If we can't repair your device, you only pay for the diagnostic. No hidden charges, no surprises.",
    accent: "from-amber-500/10 to-orange-500/5",
  },
];

export function RepairWarranty() {
  return (
    <section id="warranty" className="py-22 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="flex flex-col gap-6">
            <Badge>Warranty & trust</Badge>

            <h2 className="text-4xl font-bold tracking-tight">
              We stand behind
              <br />
              every repair.
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Our work doesn't end when you leave the workshop. Every repair is
              backed by a solid warranty and a team that's always available if
              something comes up.
            </p>

            <ul className="flex flex-col gap-3">
              {[
                "Free diagnostic on every device",
                "3-month warranty on labor and parts",
                "Certified technicians on every job",
                "Transparent quote before any work begins",
                "Genuine and OEM-certified parts only",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm">
                  <HugeiconsIcon
                    icon={Tick02Icon}
                    size={15}
                    strokeWidth={3}
                    className="text-emerald-500 shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link
                  href="https://wa.me/573000000000?text=Hi,%20I%20need%20a%20repair"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Request a repair
                  <HugeiconsIcon icon={ArrowRight02Icon} />
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="#faq">Read the FAQ</Link>
              </Button>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {WARRANTY_FEATURES.map((feature) => (
              <Card
                key={feature.title}
                className={`bg-linear-to-br ${feature.accent}`}
              >
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="h-11 w-11 rounded-xl border border-border bg-background flex items-center justify-center">
                    <HugeiconsIcon icon={feature.icon} size={22} />
                  </div>

                  <h3 className="font-semibold text-sm">{feature.title}</h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
