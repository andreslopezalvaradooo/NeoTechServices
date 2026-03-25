import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  iconColor: string;
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
    accent: "border-violet-500/30 bg-violet-500/5",
    iconColor: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
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
    accent: "border-primary/30 bg-primary/5",
    iconColor: "bg-primary/10 text-primary",
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
    accent: "border-blue-500/30 bg-blue-500/5",
    iconColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
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
    accent: "border-emerald-500/30 bg-emerald-500/5",
    iconColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
] as const;

interface SegmentCardProps {
  segment: Segment;
}

function SegmentCard({ segment }: SegmentCardProps) {
  const { icon, title, description, benefits, accent, iconColor, featured } =
    segment;

  return (
    <li>
      <Card
        className={cn(
          "relative flex h-full flex-col overflow-visible transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
          accent,
          featured && "ring-2 ring-primary/20",
        )}
      >
        <CardHeader className="relative gap-3">
          {featured && (
            <div
              aria-label="Most popular plan"
              className="absolute -top-7 left-1/2 -translate-x-1/2"
            >
              <Badge className="shadow-sm">Most Popular</Badge>
            </div>
          )}

          <div
            aria-hidden="true"
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
              iconColor,
            )}
          >
            <HugeiconsIcon icon={icon} />
          </div>

          <CardTitle className="text-lg font-semibold">{title}</CardTitle>

          <CardDescription className="leading-relaxed text-justify sm:text-left">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <ul className="flex flex-col gap-2" aria-label={`${title} benefits`}>
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={CheckCircle}
                  aria-hidden="true"
                  className="shrink-0 text-muted-foreground"
                />

                <span className="text-sm text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="justify-center">
          <Button variant={featured ? "default" : "outline"} size="sm" asChild>
            <Link href="#consulting-form">Get started</Link>
          </Button>
        </CardFooter>
      </Card>
    </li>
  );
}

export function For() {
  return (
    <section
      id="for"
      aria-labelledby="for-heading"
      className="relative min-h-[calc(100dvh-64px)]"
    >
      <div className="relative mx-auto max-w-6xl space-y-8 p-6 sm:p-8">
        <div className="flex flex-col gap-4">
          <Badge className="border-primary/30 bg-primary/5 text-sm text-primary">
            Who We Work With
          </Badge>

          <h2
            id="for-heading"
            className="text-4xl font-bold tracking-tight lg:text-5xl"
          >
            Built for every stage
          </h2>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-justify md:text-left">
            Whether you&apos;re launching your first product or transforming a
            multinational, we adapt our approach to your specific context.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map((segment) => (
            <SegmentCard key={segment.title} segment={segment} />
          ))}
        </ul>
      </div>
    </section>
  );
}
