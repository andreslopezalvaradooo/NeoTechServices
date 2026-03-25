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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/src/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckCircle, Minus } from "@hugeicons/core-free-icons";
import Link from "next/link";

interface PlanFeature {
  label: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: readonly PlanFeature[];
  cta: string;
  featured?: boolean;
  badge?: string;
}

const PLANS: readonly Plan[] = [
  {
    name: "Starter",
    description:
      "Perfect for founders and independents exploring their options.",
    price: "$490",
    period: "one-time",
    features: [
      { label: "1 discovery call (60 min)", included: true },
      { label: "Written findings report", included: true },
      { label: "Tech stack recommendations", included: true },
      { label: "30-day email Q&A", included: true },
      { label: "Architecture review", included: false },
      { label: "Hands-on implementation", included: false },
      { label: "Dedicated Slack channel", included: false },
    ],
    cta: "Get started",
  },
  {
    name: "Growth",
    description:
      "For SMBs and startups that need strategic guidance and execution.",
    price: "$2,900",
    period: "per month",
    featured: true,
    badge: "Most Popular",
    features: [
      { label: "Everything in Starter", included: true },
      { label: "4 strategy sessions/month", included: true },
      { label: "Architecture review & design", included: true },
      { label: "Technical roadmap (90 days)", included: true },
      { label: "Dedicated Slack channel", included: true },
      { label: "Hands-on implementation", included: false },
      { label: "Fractional CTO support", included: false },
    ],
    cta: "Start free trial",
  },
  {
    name: "Enterprise",
    description:
      "Full-scale engagement for complex transformations and large teams.",
    price: "Custom",
    period: "tailored",
    features: [
      { label: "Everything in Growth", included: true },
      { label: "Hands-on implementation", included: true },
      { label: "Fractional CTO support", included: true },
      { label: "Unlimited consulting sessions", included: true },
      { label: "On-site workshops", included: true },
      { label: "Team training & hiring support", included: true },
      { label: "SLA & priority response", included: true },
    ],
    cta: "Contact us",
  },
] as const;

interface FeatureItemProps {
  feature: PlanFeature;
}

function FeatureItem({ feature }: FeatureItemProps) {
  return (
    <li className="flex items-center gap-3">
      <HugeiconsIcon
        aria-hidden="true"
        icon={feature.included ? CheckCircle : Minus}
        className={cn(
          "size-4 shrink-0",
          feature.included ? "text-primary" : "text-muted-foreground/40",
        )}
      />
      <span
        className={cn(
          "text-sm",
          feature.included ? "text-foreground" : "text-muted-foreground/50",
        )}
      >
        {feature.label}
      </span>
    </li>
  );
}

interface PlanCardProps {
  plan: Plan;
}

function PlanCard({ plan }: PlanCardProps) {
  const { name, description, price, period, features, cta, featured, badge } =
    plan;

  return (
    <li className="w-full">
      <Card
        className={cn(
          "relative flex flex-col overflow-visible",
          featured
            ? "border-primary shadow-xl shadow-primary/10"
            : "border-border/60",
        )}
      >
        {badge && (
          <div
            aria-label="Most popular plan"
            className="absolute -top-3 left-1/2 -translate-x-1/2"
          >
            <Badge className="shadow-sm">{badge}</Badge>
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>

          <div className="flex items-end gap-2 pt-2">
            <span className="text-5xl font-bold tracking-tight">{price}</span>
            <span className="text-sm text-muted-foreground">/ {period}</span>
          </div>
        </CardHeader>

        <CardContent className="flex-1">
          <ul aria-label={`${name} plan features`} className="space-y-3">
            {features.map((feature) => (
              <FeatureItem key={feature.label} feature={feature} />
            ))}
          </ul>
        </CardContent>

        <CardFooter className="justify-center">
          <Button variant={featured ? "default" : "outline"} size="lg" asChild>
            <Link href="#form">{cta}</Link>
          </Button>
        </CardFooter>
      </Card>
    </li>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="mx-auto max-w-6xl flex flex-col gap-8 p-6 lg:p-8"
    >
      <div className="flex flex-col gap-4">
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/5 text-primary"
        >
          Pricing
        </Badge>

        <h2
          id="pricing-heading"
          className="text-4xl font-bold tracking-tight lg:text-5xl"
        >
          Transparent pricing
        </h2>

        <p className="max-w-2xl text-lg text-muted-foreground text-justify">
          No hidden fees. No surprises. Choose the engagement model that fits
          your stage and scale up as you grow.
        </p>
      </div>

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </ul>

      <p className="text-center text-sm text-muted-foreground">
        All plans include a free 30-minute discovery call. Not sure which plan
        fits?{" "}
        <Link
          href="#form"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Let&apos;s talk.
        </Link>
      </p>
    </section>
  );
}
