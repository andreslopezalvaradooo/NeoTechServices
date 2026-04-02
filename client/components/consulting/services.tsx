import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  Layers,
  RefreshCw,
  ShieldCheck,
  Lightbulb,
  ArrowRight,
} from "@hugeicons/core-free-icons";
import Link from "next/link";

interface Service {
  icon: IconSvgElement;
  title: string;
  description: string;
  tags: readonly string[];
  accent: string;
  color: string;
}

const SERVICES: readonly Service[] = [
  {
    icon: Layers,
    title: "Software Architecture",
    description:
      "Design scalable, maintainable systems from the ground up. We review existing codebases, define architecture patterns, and provide detailed technical roadmaps.",
    tags: ["Microservices", "Cloud-native", "API Design", "DDD"],
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: RefreshCw,
    title: "Digital Transformation",
    description:
      "Modernize legacy systems, automate manual processes, and integrate cutting-edge technology to drive operational efficiency and business growth.",
    tags: ["Cloud Migration", "Process Automation", "AI Integration"],
    accent: "from-primary/15 to-primary/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: ShieldCheck,
    title: "Technology Audit",
    description:
      "Comprehensive assessment of your tech stack, security posture, performance bottlenecks, and technical debt — with an actionable remediation plan.",
    tags: ["Security", "Performance", "Code Review", "Compliance"],
    accent: "from-[oklch(0.8_0.13_212)]/15 to-[oklch(0.8_0.13_212)]/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Lightbulb,
    title: "IT & Product Strategy",
    description:
      "Align your technology investments with business goals. We help CTOs, founders, and product teams build strategic roadmaps that deliver measurable results.",
    tags: ["Roadmapping", "OKRs", "Vendor Selection", "Team Building"],
    accent: "from-[oklch(0.52_0.09_223)]/20 to-[oklch(0.52_0.09_223)]/5",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
] as const;

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  const { icon, title, description, tags, accent, color } = service;

  return (
    <li>
      <Card
        className={`group relative h-full md:pt-2 md:gap-2 lg:py-4 lg:gap-4 bg-linear-to-br ${accent} hover:-translate-y-1 hover:shadow-lg transition-all duration-300 overflow-hidden`}
      >
        <div
          aria-hidden
          className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary group-hover:scale-x-100 transition-transform duration-300`}
        />

        <CardHeader className="md:px-2 lg:px-4 flex gap-2 lg:flex-col items-center">
          <div
            aria-hidden
            className={`h-10 w-10 flex items-center justify-center rounded-xl ${color}`}
          >
            <HugeiconsIcon icon={icon} />
          </div>

          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>

        <CardContent className="md:px-2 lg:px-4 flex-1 text-muted-foreground text-justify leading-relaxed">
          {description}
        </CardContent>

        <CardFooter
          className={`md:p-2 lg:p-4 bg-linear-to-br ${service.accent}`}
        >
          <ul
            aria-label={`${title} technologies`}
            className="flex flex-wrap gap-1 overflow-hidden"
          >
            {tags.map((tag) => (
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
    </li>
  );
}

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-muted/30 min-h-[calc(100dvh-64px)] pt-16"
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4 lg:space-y-3">
        <div className="space-y-4 md:space-y-1 lg:space-y-3">
          <Badge className="border-primary/30 bg-primary/5 text-primary">
            Our Services
          </Badge>

          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            Everything you need to
            <br />
            <span className="text-primary">build &amp; scale.</span>
          </h2>

          <div className="space-y-4 md:flex md:gap-4 md:items-center md:justify-between">
            <p className="max-w-lg text-lg text-muted-foreground text-justify sm:text-left">
              End-to-end technology consulting from concept to production,
              tailored to your business context and goals.
            </p>

            <Button asChild>
              <Link href="#consulting-form" className="group w-fit">
                Talk to an expert
                <HugeiconsIcon
                  aria-hidden
                  icon={ArrowRight}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>
          </div>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-2 lg:gap-4">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </ul>
      </div>
    </section>
  );
}
