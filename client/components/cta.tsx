import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Clock01Icon,
  FlashIcon,
  Location01Icon,
  Shield02Icon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

interface Item {
  icon: IconSvgElement;
  label: string;
  value: string;
  sub: string;
}

const ITEMS = [
  {
    icon: Location01Icon,
    label: "Location",
    value: "Bogotá, Colombia",
    sub: "In-person and remote service",
  },
  {
    icon: Clock01Icon,
    label: "Business hours",
    value: "Mon–Sat 8am–6pm",
    sub: "Sundays by appointment",
  },
  {
    icon: FlashIcon,
    label: "Response time",
    value: "Under 1 hour",
    sub: "Via WhatsApp on business days",
  },
  {
    icon: Shield02Icon,
    label: "Warranty",
    value: "3 months",
    sub: "On all repairs",
  },
] satisfies Item[];

function ItemCard({ item }: { item: Item }) {
  return (
    <li>
      <Card className="h-full border-background/10 bg-background/5 text-background">
        <CardContent className="p-5 space-y-2">
          <HugeiconsIcon icon={item.icon} aria-hidden />

          <p className="text-xs text-background/50 uppercase tracking-wider">
            {item.label}
          </p>

          <p className="font-semibold">{item.value}</p>
          <p className="text-xs text-background/60">{item.sub}</p>
        </CardContent>
      </Card>
    </li>
  );
}

export function CTA() {
  return (
    <section
      id="contact"
      className="bg-foreground text-background mx-auto max-w-6xl pt-20 lg:pt-24 pb-4 lg:pb-8 px-4 lg:px-8 flex flex-col md:flex-row gap-8 justify-between"
      aria-labelledby="contact-heading"
    >
      <div className="space-y-6">
        <Badge>Let's get started</Badge>

        <h2
          id="contact-heading"
          className="text-4xl font-bold tracking-tight lg:text-5xl"
        >
          Is your device
          <br />
          having a problem?
        </h2>

        <p className="max-w-lg text-background/70 text-lg leading-relaxed">
          Message us on WhatsApp and we'll get back to you in less than 1 hour.
          No diagnostic fee, no commitments.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <Link
              href="https://wa.me/573000000000?text=Hi,%20I%20need%20help%20with%20my%20device"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message us on WhatsApp"
            >
              <HugeiconsIcon icon={WhatsappIcon} strokeWidth={2} aria-hidden />
              Message on WhatsApp
            </Link>
          </Button>

          <Button variant="ghost" size="lg" asChild>
            <Link href="/catalog">View catalog</Link>
          </Button>
        </div>
      </div>

      <ul className="grid gap-4 grid-cols-2">
        {ITEMS.map((item) => (
          <ItemCard key={item.label} item={item} />
        ))}
      </ul>
    </section>
  );
}
