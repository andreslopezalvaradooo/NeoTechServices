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
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  LaptopIcon,
  Computer,
  Tick02Icon,
  ArrowRight02Icon,
  Clock,
} from "@hugeicons/core-free-icons";

// components/repair/RepairPricing.tsx

const REPAIR_PRICES = [
  {
    category: "Laptops",
    icon: LaptopIcon,
    items: [
      {
        service: "Screen replacement",
        price: "From $120.000",
        duration: "24h",
      },
      { service: "Keyboard repair", price: "From $80.000", duration: "24h" },
      {
        service: "Battery replacement",
        price: "From $90.000",
        duration: "24h",
      },
      {
        service: "Liquid damage recovery",
        price: "From $150.000",
        duration: "48–72h",
      },
      {
        service: "Charging port repair",
        price: "From $70.000",
        duration: "24h",
      },
      {
        service: "RAM / SSD upgrade",
        price: "From $50.000",
        duration: "Same day",
      },
    ],
  },
  {
    category: "Desktop PCs",
    icon: Computer,
    items: [
      {
        service: "Component upgrade",
        price: "From $50.000",
        duration: "Same day",
      },
      {
        service: "Power supply replacement",
        price: "From $80.000",
        duration: "24h",
      },
      {
        service: "OS installation",
        price: "From $60.000",
        duration: "Same day",
      },
      {
        service: "Virus & malware removal",
        price: "From $70.000",
        duration: "24h",
      },
      {
        service: "Performance optimization",
        price: "From $60.000",
        duration: "Same day",
      },
      {
        service: "Full hardware diagnostic",
        price: "Free",
        duration: "Same day",
      },
    ],
  },
];

export function RepairPricing() {
  return (
    <section id="prices" className="py-22 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-6">
        <div className="flex flex-col gap-4 max-w-2xl">
          <Badge>Pricing</Badge>

          <h2 className="text-4xl font-bold tracking-tight">
            Transparent pricing,
            <br />
            no hidden fees.
          </h2>

          <p className="text-muted-foreground text-lg">
            All prices are in COP and include labor. Final cost is confirmed
            after the free diagnostic. No fix, no fee.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {REPAIR_PRICES.map((category) => (
            <Card key={category.category} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl border border-border bg-background flex items-center justify-center">
                    <HugeiconsIcon icon={category.icon} size={18} />
                  </div>

                  {category.category}
                </CardTitle>
              </CardHeader>

              <Separator />

              <CardContent className="flex-1">
                <ul className="divide-y divide-border">
                  {category.items.map((item) => (
                    <li
                      key={item.service}
                      className="flex items-center justify-between py-2 gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon
                          icon={Tick02Icon}
                          size={15}
                          strokeWidth={3}
                          className="text-emerald-500 shrink-0"
                        />

                        <span className="text-sm">{item.service}</span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <Badge
                          variant="outline"
                          className="text-[10px] font-normal text-muted-foreground"
                        >
                          <HugeiconsIcon icon={Clock} /> {item.duration}
                        </Badge>

                        <span className="text-sm font-semibold whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="justify-center">
                <Button asChild>
                  <Link
                    href="https://wa.me/573000000000?text=Hi,%20I%20need%20a%20repair%20quote"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get a custom quote
                    <HugeiconsIcon icon={ArrowRight02Icon} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground">
          * Prices may vary depending on brand, model, and parts availability.
          Final quote provided after free diagnostic.
        </p>
      </div>
    </section>
  );
}
