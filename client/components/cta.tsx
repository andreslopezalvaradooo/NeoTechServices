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

export function CTA() {
  return (
    <section id="contact" className="py-22 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <Badge>Let's get started</Badge>

            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Is your device
              <br />
              having a problem?
            </h2>

            <p className="text-background/70 text-lg leading-relaxed">
              Message us on WhatsApp and we'll get back to you in less than 1
              hour. No diagnostic fee, no commitments.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link
                  href="https://wa.me/573000000000?text=Hi,%20I%20need%20help%20with%20my%20device"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HugeiconsIcon icon={WhatsappIcon} strokeWidth={2} />
                  Message on WhatsApp
                </Link>
              </Button>

              <Button variant="ghost" size="lg" asChild>
                <Link href="/catalog">View catalog</Link>
              </Button>
            </div>
          </div>

          {/* Contact info cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[
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
            ].map((item) => (
              <Card
                key={item.label}
                className="border-background/10 bg-background/5 text-background"
              >
                <CardContent className="p-5 space-y-2">
                  <HugeiconsIcon icon={item.icon} />

                  <p className="text-xs text-background/50 uppercase tracking-wider">
                    {item.label}
                  </p>

                  <p className="font-semibold">{item.value}</p>
                  <p className="text-xs text-background/60">{item.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
