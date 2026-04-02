import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DeveloperIcon,
  ShoppingBasket01Icon,
  RepairIcon,
  MentoringIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

interface Service {
  icon: IconSvgElement;
  title: string;
  description: string;
  tags: string[];
  accent: string;
  color: string;
  href: string;
}

const SERVICES = [
  {
    icon: RepairIcon,
    title: "Laptop & PC Repair",
    description:
      "Precise diagnostics, component replacement, data recovery, and performance optimization for all brands.",
    tags: ["Hardware", "Software", "All brands"],
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    href: "/repair",
  },
  {
    icon: MentoringIcon,
    title: "Tech Consulting",
    description:
      "Personalized consulting for businesses and individuals: infrastructure, digital security, upgrades, and technology decisions.",
    tags: ["Businesses", "Individuals", "Remote or on-site"],
    accent: "from-primary/15 to-primary/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    href: "/consulting",
  },
  {
    icon: DeveloperIcon,
    title: "Web App Development",
    description:
      "Development of modern, fast, and scalable web applications. From landing pages to custom management systems.",
    tags: ["React / Next.js", "UI/UX Design", "Custom-built"],
    accent: "from-[oklch(0.8_0.13_212)]/15 to-[oklch(0.8_0.13_212)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    href: "/development",
  },
  {
    icon: ShoppingBasket01Icon,
    title: "Electronics Sales",
    description:
      "Curated catalog of laptops, accessories, components, and gadgets. Genuine products with warranty and after-sales support.",
    tags: ["Warranty included", "Nationwide shipping", "Purchase advisory"],
    accent: "from-[oklch(0.52_0.09_223)]/20 to-[oklch(0.52_0.09_223)]/5",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    href: "/store",
  },
] satisfies Service[];

function ServiceCard({ service }: { service: Service }) {
  return (
    <li>
      <Link href={service.href}>
        <Card
          className={`group relative h-full md:pt-2 md:gap-2 lg:py-4 lg:gap-4 bg-linear-to-br ${service.accent} hover:-translate-y-1 hover:shadow-lg transition-all duration-300 overflow-hidden`}
        >
          <div
            aria-hidden
            className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary group-hover:scale-x-100 transition-transform duration-300`}
          />

          <CardHeader className="md:px-2 lg:px-4 flex gap-2 lg:flex-col items-center">
            <div
              aria-hidden
              className={`h-10 w-10 flex items-center justify-center rounded-xl ${service.color}`}
            >
              <HugeiconsIcon icon={service.icon} />
            </div>

            <CardTitle>{service.title}</CardTitle>
          </CardHeader>

          <CardContent className="md:px-2 lg:px-4 flex-1 text-muted-foreground text-justify leading-relaxed">
            {service.description}
          </CardContent>

          <CardFooter
            className={`md:p-2 lg:p-4 bg-linear-to-br ${service.accent}`}
          >
            <ul
              aria-label={`${service.title} tags`}
              className="flex flex-wrap gap-1 overflow-hidden"
            >
              {service.tags.map((tag) => (
                <li key={tag} className="shrink-0">
                  <Badge
                    variant="outline"
                    className="text-xs bg-background/60 text-muted-foreground font-normal"
                  >
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardFooter>
        </Card>
      </Link>
    </li>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="bg-muted/30 min-h-dvh pt-16"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4">
        <div className="space-y-4 md:space-y-3 lg:space-y-4">
          <Badge className="border-primary/30 bg-primary/5 text-primary">
            Services
          </Badge>

          <h2
            id="services-heading"
            className="text-4xl font-bold tracking-tight"
          >
            Everything you need,
            <br />
            <span className="text-primary">in one place.</span>
          </h2>

          <p className="text-lg text-muted-foreground text-justify sm:text-left">
            From an urgent repair to the complete development of your digital
            platform. We cover the entire technology cycle.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-2 lg:gap-4">
          {SERVICES.map((service) => (
            <ServiceCard key={service.href} service={service} />
          ))}
        </ul>
      </div>
    </section>
  );
}
