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
  href: string;
}

const SERVICES = [
  {
    icon: RepairIcon,
    title: "Laptop & PC Repair",
    description:
      "Precise diagnostics, component replacement, data recovery, and performance optimization for all brands.",
    tags: ["Hardware", "Software", "All brands"],
    accent: "from-sky-500/10 to-blue-500/5",
    href: "/repair",
  },
  {
    icon: MentoringIcon,
    title: "Tech Consulting",
    description:
      "Personalized consulting for businesses and individuals: infrastructure, digital security, upgrades, and technology decisions.",
    tags: ["Businesses", "Individuals", "Remote or on-site"],
    accent: "from-cyan-500/10 to-sky-500/5",
    href: "/consulting",
  },
  {
    icon: DeveloperIcon,
    title: "Web App Development",
    description:
      "Development of modern, fast, and scalable web applications. From landing pages to custom management systems.",
    tags: ["React / Next.js", "UI/UX Design", "Custom-built"],
    accent: "from-blue-600/10 to-indigo-500/5",
    href: "/development",
  },
  {
    icon: ShoppingBasket01Icon,
    title: "Electronics Sales",
    description:
      "Curated catalog of laptops, accessories, components, and gadgets. Genuine products with warranty and after-sales support.",
    tags: ["Warranty included", "Nationwide shipping", "Purchase advisory"],
    accent: "from-slate-400/10 to-blue-400/5",
    href: "/store",
  },
] satisfies Service[];

function ServiceCard({ service }: { service: Service }) {
  return (
    <li>
      <Link href={service.href} className="group block h-full">
        <Card
          className={`h-full bg-linear-to-br ${service.accent} transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1`}
        >
          <CardHeader>
            <CardTitle className="flex gap-2 items-center font-semibold leading-tight">
              <HugeiconsIcon icon={service.icon} />
              {service.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex items-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </CardContent>

          <CardFooter
            className="flex-wrap gap-1"
            aria-label={`${service.title} tags`}
          >
            {service.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] bg-background/60 text-muted-foreground font-normal"
              >
                {tag}
              </Badge>
            ))}
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
      className="bg-muted/30 mx-auto max-w-6xl pt-20 lg:pt-24 pb-4 lg:pb-8 px-4 lg:px-8 space-y-4"
      aria-labelledby="services-heading"
    >
      <div className="space-y-4">
        <Badge>Services</Badge>

        <h2 id="services-heading" className="text-4xl font-bold tracking-tight">
          Everything you need,
          <br />
          in one place.
        </h2>

        <p className="max-w-lg text-lg text-muted-foreground text-justify md:text-left">
          From an urgent repair to the complete development of your digital
          platform. We cover the entire technology cycle.
        </p>
      </div>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SERVICES.map((service) => (
          <ServiceCard key={service.href} service={service} />
        ))}
      </ul>
    </section>
  );
}
