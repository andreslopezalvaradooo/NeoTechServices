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
  color: string;
}

const SERVICES: readonly Service[] = [
  {
    icon: Layers,
    title: "Software Architecture",
    description:
      "Design scalable, maintainable systems from the ground up. We review existing codebases, define architecture patterns, and provide detailed technical roadmaps.",
    tags: ["Microservices", "Cloud-native", "API Design", "DDD"],
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: RefreshCw,
    title: "Digital Transformation",
    description:
      "Modernize legacy systems, automate manual processes, and integrate cutting-edge technology to drive operational efficiency and business growth.",
    tags: ["Cloud Migration", "Process Automation", "AI Integration"],
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: ShieldCheck,
    title: "Technology Audit",
    description:
      "Comprehensive assessment of your tech stack, security posture, performance bottlenecks, and technical debt — with an actionable remediation plan.",
    tags: ["Security", "Performance", "Code Review", "Compliance"],
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Lightbulb,
    title: "IT & Product Strategy",
    description:
      "Align your technology investments with business goals. We help CTOs, founders, and product teams build strategic roadmaps that deliver measurable results.",
    tags: ["Roadmapping", "OKRs", "Vendor Selection", "Team Building"],
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
] as const;

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  const { icon, title, description, tags, color } = service;

  return (
    <Card className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
      />

      <CardHeader className="gap-3">
        <div
          aria-hidden="true"
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}
        >
          <HugeiconsIcon icon={icon} />
        </div>

        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent className="text-justify leading-relaxed text-muted-foreground sm:text-left">
        {description}
      </CardContent>

      <CardFooter>
        <ul
          aria-label={`${title} technologies`}
          className="flex flex-wrap gap-2"
        >
          {tags.map((tag) => (
            <li key={tag}>
              <Badge variant="secondary" className="font-normal">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
}

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="min-h-[calc(100dvh-64px)]"
    >
      <div className="mx-auto max-w-6xl space-y-8 p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-4">
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/5 text-primary"
            >
              Our Services
            </Badge>

            <h2
              id="services-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Everything you need to
              <br />
              <span className="text-primary">build &amp; scale</span>
            </h2>

            <p className="text-lg text-muted-foreground">
              End-to-end technology consulting from concept to production,
              tailored to your business context and goals.
            </p>
          </div>

          <Button variant="outline" className="w-fit" asChild>
            <Link href="#consulting-form">
              Talk to an expert
              <HugeiconsIcon
                icon={ArrowRight}
                aria-hidden="true"
                strokeWidth={2}
              />
            </Link>
          </Button>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </ul>
      </div>
    </section>
  );
}
