import Link from "next/link";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DeveloperIcon,
  ShoppingBasket01Icon,
  RepairIcon,
  MentoringIcon,
} from "@hugeicons/core-free-icons";

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
];

export function Services() {
  return (
    <section id="services" className="py-22 bg-muted/30">
      <div className="flex flex-col gap-4 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-4 max-w-2xl">
          <Badge>Service</Badge>

          <h2 className="text-4xl font-bold tracking-tight">
            Everything you need,
            <br />
            in one place.
          </h2>

          <p className="text-muted-foreground text-lg">
            From an urgent repair to the complete development of your digital
            platform. We cover the entire technology cycle.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <Link key={service.href} href={service.href}>
              <Card
                className={`h-full bg-linear-to-br ${service.accent} hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
              >
                <CardHeader>
                  <CardTitle className="flex gap-2 items-center">
                    <HugeiconsIcon icon={service.icon} />

                    <h3 className="font-semibold leading-tight">
                      {service.title}
                    </h3>
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 flex items-center">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>

                <CardFooter className="flex-wrap gap-1">
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
          ))}
        </div>
      </div>
    </section>
  );
}
