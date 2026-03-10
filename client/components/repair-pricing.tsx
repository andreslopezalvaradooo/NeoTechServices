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
import type { IconSvgElement } from "@hugeicons/react";
import {
  LaptopIcon,
  Computer,
  Tick02Icon,
  ArrowRight02Icon,
  Clock,
} from "@hugeicons/core-free-icons";

interface Item {
  service: string;
  price: string;
  duration: string;
}

interface Category {
  category: string;
  icon: IconSvgElement;
  items: Item[];
}

const WHATSAPP_URL =
  "https://wa.me/573000000000?text=Hi,%20I%20need%20a%20repair%20quote";

const CATEGORIES = [
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
] satisfies Category[];

function CategoryCard({ category }: { category: Category }) {
  return (
    <li>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div
              className="h-8 w-8 rounded-xl border border-border bg-background flex items-center justify-center"
              aria-hidden
            >
              <HugeiconsIcon icon={category.icon} size={18} aria-hidden />
            </div>

            {category.category}
          </CardTitle>
        </CardHeader>

        <Separator aria-hidden />

        <CardContent className="flex-1">
          <ul
            className="divide-y divide-border"
            aria-label={`${category.category} repair services`}
          >
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
                    aria-hidden
                  />

                  <span className="text-sm">{item.service}</span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Badge
                    variant="outline"
                    className="text-[10px] font-normal text-muted-foreground"
                  >
                    <HugeiconsIcon icon={Clock} aria-hidden /> {item.duration}
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
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Get a custom quote for ${category.category} on WhatsApp`}
            >
              Get a custom quote
              <HugeiconsIcon icon={ArrowRight02Icon} aria-hidden />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </li>
  );
}

export function RepairPricing() {
  return (
    <section
      id="pricing"
      className="bg-muted/30 mx-auto max-w-6xl pt-20 lg:pt-24 pb-4 lg:pb-8 px-4 lg:px-8 flex flex-col gap-6"
      aria-labelledby="pricing-heading"
    >
      <div className="flex flex-col gap-4">
        <Badge>Pricing</Badge>

        <h2 id="pricing-heading" className="text-4xl font-bold tracking-tight">
          Transparent pricing,
          <br />
          no hidden fees.
        </h2>

        <p className="max-w-lg text-muted-foreground text-lg text-justify lg:text-left">
          All prices are in COP and include labor. Final cost is confirmed after
          the free diagnostic. No fix, no fee.
        </p>
      </div>

      <ul className="grid gap-6 md:grid-cols-2">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.category} category={category} />
        ))}
      </ul>

      <p className="text-center text-xs text-muted-foreground">
        * Prices may vary depending on brand, model, and parts availability.
        Final quote provided after free diagnostic.
      </p>
    </section>
  );
}
