import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/src/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  CheckCircle,
  RocketIcon,
  Building,
  Store,
  User,
} from "@hugeicons/core-free-icons";
import Link from "next/link";

interface Segment {
  icon: IconSvgElement;
  title: string;
  description: string;
  benefits: readonly string[];
  accent: string;
  color: string;
  featured?: boolean;
}

const SEGMENTS: readonly Segment[] = [
  {
    icon: RocketIcon,
    title: "Startups & Founders",
    description:
      "Move fast without breaking things. We help early-stage teams choose the right stack, build MVPs, and establish engineering practices that scale.",
    benefits: [
      "MVP architecture and stack selection",
      "Technical co-founder advisory",
      "Fundraising technical due diligence",
      "Team hiring and onboarding",
    ],
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: Store,
    title: "SMBs & Growing Companies",
    description:
      "Scale your operations and technology without enterprise-level budgets. We optimize what you have and build what you need.",
    benefits: [
      "Process automation and integrations",
      "Cloud migration and cost optimization",
      "Security and compliance readiness",
      "Vendor evaluation and negotiation",
    ],
    accent: "from-primary/15 to-primary/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    featured: true,
  },
  {
    icon: Building,
    title: "Enterprises & Corporates",
    description:
      "Navigate complex transformations, legacy modernization, and multi-team alignment with senior-level technology leadership.",
    benefits: [
      "Enterprise architecture review",
      "Legacy system modernization",
      "Organizational tech alignment",
      "Custom training and workshops",
    ],
    accent: "from-[oklch(0.8_0.13_212)]/15 to-[oklch(0.8_0.13_212)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: User,
    title: "Independent Professionals",
    description:
      "Elevate your freelance practice or solo business with the right tools, processes, and strategic clarity to grow sustainably.",
    benefits: [
      "Personal tech stack optimization",
      "Client-facing system design",
      "Productivity and tooling setup",
      "Positioning and service offerings",
    ],
    accent: "from-[oklch(0.52_0.09_223)]/20 to-[oklch(0.52_0.09_223)]/5",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
] as const;

interface SegmentCardProps {
  segment: Segment;
}

function SegmentCard({ segment }: SegmentCardProps) {
  const { icon, title, description, benefits, accent, color, featured } =
    segment;

  return (
    <li>
      <Link href="#request">
        <Card
          className={cn(
            "group relative h-full bg-linear-to-br md:py-2 lg:py-4 md:gap-2 lg:gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 overflow-visible",
            accent,
            featured && "ring-2 ring-primary/20",
          )}
        >
          <div
            aria-hidden
            className={`absolute inset-x-2 top-0 h-0.5 origin-left scale-x-0 bg-primary group-hover:scale-x-100 transition-transform duration-300`}
          />

          <CardHeader className="relative md:px-2 md:gap-2">
            {featured && (
              <div
                aria-label="Most popular plan"
                className="absolute -top-7 md:-top-5 lg:-top-7 left-1/2 -translate-x-1/2"
              >
                <Badge className="shadow-sm">Most Popular</Badge>
              </div>
            )}

            <div className="flex gap-2 lg:flex-col items-center">
              <div
                aria-hidden
                className={`h-10 w-10 flex items-center justify-center rounded-xl ${color}`}
              >
                <HugeiconsIcon icon={icon} />
              </div>

              <CardTitle>{title}</CardTitle>
            </div>

            <CardDescription className="leading-relaxed md:leading-normal lg:leading-relaxed text-justify">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1">
            <ul
              className="space-y-2 md:space-y-0"
              aria-label={`${title} benefits`}
            >
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-1 text-muted-foreground"
                >
                  <HugeiconsIcon
                    aria-hidden
                    icon={CheckCircle}
                    size={15}
                    className="text-emerald-500"
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
}

export function For() {
  return (
    <section id="for" aria-labelledby="for-heading" className="min-h-dvh pt-16">
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4 lg:space-y-6">
        <div className="space-y-4 md:space-y-1 lg:space-y-4">
          <Badge className="border-primary/30 bg-primary/5 text-primary">
            Who We Work With
          </Badge>

          <h2
            id="for-heading"
            className="text-4xl md:text-3xl lg:text-4xl font-bold tracking-tight"
          >
            <span className="text-primary">Built</span> for every stage
          </h2>

          <p className="max-w-xl text-lg md:text-base lg:text-lg leading-relaxed md:leading-normal lg:leading-relaxed text-muted-foreground text-justify md:text-left">
            Whether you&apos;re launching your first product or transforming a
            multinational, we adapt our approach to your specific context.
          </p>
        </div>

        <ul className="grid gap-6 md:gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map((segment) => (
            <SegmentCard key={segment.title} segment={segment} />
          ))}
        </ul>
      </div>
    </section>
  );
}
