import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

const PLANS = [
  {
    name: "Basic",
    price: "From $50.000",
    period: "per service",
    description: "Ideal for one-time repairs and technical consultations.",
    features: [
      "Diagnostic included",
      "1 repair or consultation",
      "1-month warranty",
      "WhatsApp support",
    ],
    cta: "Request",
    highlighted: false,
  },
  {
    name: "Standard",
    price: "From $150.000",
    period: "per service",
    description: "For businesses and users who need comprehensive support.",
    features: [
      "Priority diagnostic",
      "Full repair",
      "3-month warranty",
      "Technical consulting included",
      "Unlimited remote support",
    ],
    cta: "Request",
    highlighted: true,
  },
  {
    name: "Business",
    price: "Custom pricing",
    period: "monthly",
    description: "Ongoing maintenance and support plan for businesses.",
    features: [
      "Preventive maintenance",
      "Monthly technical support",
      "Priority attention",
      "Repair discounts",
      "Technical reports",
      "Direct technician contact",
    ],
    cta: "Get a quote",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-22 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-6">
        <div className="space-y-4">
          <Badge>Pricing</Badge>

          <h2 className="text-4xl font-bold tracking-tight">
            Transparent plans,
            <br />
            no surprises.
          </h2>

          <p className="text-muted-foreground text-lg">
            Prices in COP. Exact amounts are confirmed after the free diagnostic
            of your device.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-visible border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                plan.highlighted
                  ? "border-foreground bg-foreground text-background"
                  : "bg-background"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>Most popular</Badge>
                </div>
              )}

              <CardHeader>
                <CardTitle>
                  <p
                    className={`text-sm font-medium ${plan.highlighted ? "text-background/70" : "text-muted-foreground"}`}
                  >
                    {plan.name}
                  </p>

                  <p className="text-3xl font-bold tracking-tight">
                    {plan.price}
                  </p>
                </CardTitle>

                <CardDescription>
                  <p
                    className={`text-xs ${plan.highlighted ? "text-background/60" : "text-muted-foreground"}`}
                  >
                    {plan.period}
                  </p>

                  <p
                    className={`text-sm pt-1 ${plan.highlighted ? "text-background/80" : "text-muted-foreground"}`}
                  >
                    {plan.description}
                  </p>
                </CardDescription>
              </CardHeader>

              <Separator
                className={plan.highlighted ? "bg-background/20" : ""}
              />

              <CardContent className="flex-1 flex items-center space-y-6">
                <ul className="space-y-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm"
                    >
                      <HugeiconsIcon
                        icon={Tick02Icon}
                        size={15}
                        strokeWidth={3}
                        className={`${plan.highlighted ? "text-background/80" : "text-emerald-500"}`}
                      />

                      <span
                        className={plan.highlighted ? "text-background/90" : ""}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="bg-transparent justify-center">
                <Button
                  variant={plan.highlighted ? "outline" : "default"}
                  className={plan.highlighted ? "text-foreground" : ""}
                  asChild
                >
                  <Link href="#contact">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
