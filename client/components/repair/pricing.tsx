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
  accent: string;
  color: string;
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
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
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
    accent: "from-primary/15 to-primary/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
] satisfies Category[];

function CategoryCard({ category }: { category: Category }) {
  return (
    <li>
      <Card
        className={`h-full md:py-2 lg:py-4 md:gap-1 bg-linear-to-br ${category.accent} transition-all duration-300`}
      >
        <CardHeader className="flex gap-2 items-center">
          <div
            aria-hidden
            className={`h-10 w-10 flex items-center justify-center rounded-xl ${category.color}`}
          >
            <HugeiconsIcon icon={category.icon} aria-hidden />
          </div>

          <CardTitle>{category.category}</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 px-2 sm:px-4 md:px-2 xl:px-4">
          <ul aria-label={`${category.category} repair services`}>
            {category.items.map((item) => (
              <li
                key={item.service}
                className="flex items-center justify-between py-2 md:py-1 lg:py-2 gap-2 sm:gap-4 md:gap-2 lg:gap-4"
              >
                <div className="flex items-center gap-1 sm:gap-2 md:gap-1 lg:gap-2">
                  <HugeiconsIcon
                    icon={Tick02Icon}
                    size={13}
                    strokeWidth={3}
                    className="text-emerald-500 shrink-0"
                    aria-hidden
                  />

                  <span className="text-xs sm:text-sm md:text-xs lg:text-sm">
                    {item.service}
                  </span>
                </div>

                <div className="flex items-center gap-1 sm:gap-3 md:gap-1 lg:gap-3 shrink-0">
                  <Badge
                    variant="outline"
                    className="text-[10px] text-muted-foreground"
                  >
                    <HugeiconsIcon icon={Clock} aria-hidden /> {item.duration}
                  </Badge>

                  <span className="text-xs sm:text-sm md:text-xs lg:text-sm font-semibold whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter
          className={`md:py-2 bg-linear-to-br ${category.accent} justify-center transition-all duration-300`}
        >
          <Button asChild>
            <Link
              href={WHATSAPP_URL}
              className="group"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Get a custom quote for ${category.category} on WhatsApp`}
            >
              Get a custom quote
              <HugeiconsIcon
                aria-hidden
                icon={ArrowRight02Icon}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
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
      className="bg-muted/30 min-h-dvh pt-16"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4">
        <div className="space-y-4">
          <Badge className="bg-primary/5 border-primary/30 text-primary">
            Pricing
          </Badge>

          <h2
            id="pricing-heading"
            className="text-4xl font-bold tracking-tight"
          >
            Transparent pricing,
            <br />
            <span className="text-primary">no hidden fees.</span>
          </h2>

          <p className="max-w-lg text-muted-foreground text-lg text-justify lg:text-left">
            All prices are in COP and include labor. Final cost is confirmed
            after the free diagnostic. No fix, no fee.
          </p>
        </div>

        <ul className="grid gap-4 md:grid-cols-2">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.category} category={category} />
          ))}
        </ul>

        <p className="text-center text-xs text-muted-foreground">
          * Prices may vary depending on brand, model, and parts availability.
          Final quote provided after free diagnostic.
        </p>
      </div>
    </section>
  );
}
