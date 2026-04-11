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
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  WebDesign02Icon,
  DatabaseIcon,
  MobileNavigator01Icon,
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
  "https://wa.me/573000000000?text=Hi,%20I%20need%20a%20development%20quote";

const CATEGORIES = [
  {
    category: "Web Applications",
    icon: WebDesign02Icon,
    items: [
      {
        service: "Landing page",
        price: "From $1.500.000",
        duration: "1 week",
      },
      {
        service: "Corporate website (CMS)",
        price: "From $3.000.000",
        duration: "2 weeks",
      },
      {
        service: "MVP SaaS platform",
        price: "From $8.000.000",
        duration: "4–6 weeks",
      },
      {
        service: "E-commerce store",
        price: "From $5.000.000",
        duration: "3–4 weeks",
      },
      {
        service: "Admin dashboard",
        price: "From $4.000.000",
        duration: "2–3 weeks",
      },
      {
        service: "Custom internal tool",
        price: "From $3.500.000",
        duration: "2–3 weeks",
      },
    ],
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    category: "APIs & Backends",
    icon: DatabaseIcon,
    items: [
      {
        service: "REST API design & build",
        price: "From $2.500.000",
        duration: "1–2 weeks",
      },
      {
        service: "GraphQL API",
        price: "From $3.000.000",
        duration: "2 weeks",
      },
      {
        service: "Database design & setup",
        price: "From $1.200.000",
        duration: "3–5 days",
      },
      {
        service: "Auth system (OAuth / JWT)",
        price: "From $1.500.000",
        duration: "1 week",
      },
      {
        service: "Third-party integration",
        price: "From $800.000",
        duration: "2–5 days",
      },
      {
        service: "CI/CD pipeline setup",
        price: "From $600.000",
        duration: "1–2 days",
      },
    ],
    accent: "from-primary/15 to-primary/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    category: "Mobile Apps",
    icon: MobileNavigator01Icon,
    items: [
      {
        service: "React Native MVP",
        price: "From $10.000.000",
        duration: "5–8 weeks",
      },
      {
        service: "App Store / Play Store release",
        price: "From $800.000",
        duration: "2–3 days",
      },
      {
        service: "Push notifications setup",
        price: "From $600.000",
        duration: "1–2 days",
      },
      {
        service: "Offline-first architecture",
        price: "From $2.000.000",
        duration: "1–2 weeks",
      },
      {
        service: "API integration",
        price: "From $1.200.000",
        duration: "3–5 days",
      },
      {
        service: "UI/UX redesign (existing app)",
        price: "From $2.500.000",
        duration: "2 weeks",
      },
    ],
    accent: "from-emerald-500/10 to-teal-500/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
] satisfies Category[];

function CategoryCard({ category }: { category: Category }) {
  return (
    <li>
      <Card
        className={`bg-linear-to-br ${category.accent} h-full md:pt-2 md:gap-1`}
      >
        <CardHeader className="md:px-2 flex gap-2 items-center">
          <div
            aria-hidden
            className={`h-10 w-10 flex items-center justify-center rounded-xl ${category.color}`}
          >
            <HugeiconsIcon icon={category.icon} aria-hidden />
          </div>

          <CardTitle>{category.category}</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 sm:px-2">
          <ul
            aria-label={`${category.category} services`}
            className="space-y-2"
          >
            {category.items.map((item) => (
              <li key={item.service} className="space-y-1">
                <div className="flex gap-1 items-center">
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

                <div className="flex gap-1 items-center justify-end">
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
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4 md:space-y-2">
        <div className="space-y-4 md:space-y-2">
          <Badge className="bg-primary/5 border-primary/30 text-primary">
            Pricing
          </Badge>

          <h2
            id="pricing-heading"
            className="text-4xl font-bold tracking-tight"
          >
            Honest pricing, <br className="md:hidden" />
            <span className="text-primary">fixed-scope projects.</span>
          </h2>

          <p className="max-w-lg text-muted-foreground text-lg text-justify md:text-left">
            All prices are in COP and are starting points. Final scope and cost
            are agreed upon after the free discovery call.
          </p>
        </div>

        <ul className="grid gap-4 md:gap-2 sm:grid-cols-2 md:grid-cols-3">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.category} category={category} />
          ))}
        </ul>

        <p className="text-center text-xs text-muted-foreground">
          * Prices vary based on complexity, integrations, and timeline. A
          detailed proposal is provided after the discovery session.
        </p>
      </div>
    </section>
  );
}
