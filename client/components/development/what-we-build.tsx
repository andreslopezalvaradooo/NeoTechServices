import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  WebDesign02Icon,
  MobileNavigator01Icon,
  DatabaseIcon,
  ArrowRight02Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

interface Service {
  icon: IconSvgElement;
  title: string;
  description: string;
  deliverables: string[];
  accent: string;
  color: string;
}

const WHATSAPP_URL =
  "https://wa.me/573000000000?text=Hi,%20I%20need%20a%20development%20quote";

const SERVICES = [
  {
    icon: WebDesign02Icon,
    title: "Web Applications",
    description:
      "Full-stack web apps built with Next.js, React, and modern backend stacks. From MVPs to enterprise-grade platforms.",
    deliverables: [
      "Landing pages & marketing sites",
      "SaaS dashboards & admin panels",
      "E-commerce & marketplaces",
      "CMS-powered websites",
      "Internal tools & portals",
      "Progressive Web Apps (PWA)",
    ],
    accent: "from-blue-500/10 to-cyan-500/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: DatabaseIcon,
    title: "APIs & Backends",
    description:
      "Scalable REST and GraphQL APIs, database design, authentication, and cloud infrastructure.",
    deliverables: [
      "REST & GraphQL APIs",
      "Database design (SQL / NoSQL)",
      "Authentication & authorization",
      "Third-party integrations",
      "Serverless functions",
      "CI/CD pipelines",
    ],
    accent: "from-violet-500/10 to-purple-500/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: MobileNavigator01Icon,
    title: "Mobile Apps",
    description:
      "Cross-platform mobile applications for iOS and Android using React Native and Expo.",
    deliverables: [
      "iOS & Android apps",
      "React Native / Expo projects",
      "App Store & Play Store release",
      "Push notifications",
      "Offline-first architecture",
      "Backend integration",
    ],
    accent: "from-emerald-500/10 to-teal-500/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
] satisfies Service[];

function ServiceCard({ service }: { service: Service }) {
  return (
    <li>
      <Card className={`h-full bg-linear-to-br ${service.accent} md:pt-2 lg:pt-4`}>
        <CardHeader className="md:px-2 lg:px-4">
          <div className="flex gap-2 items-center">
            <div
              className={`h-10 w-10 flex items-center justify-center rounded-xl ${service.color}`}
              aria-hidden
            >
              <HugeiconsIcon icon={service.icon} />
            </div>

            <CardTitle>{service.title}</CardTitle>
          </div>

          <CardDescription className="md:text-xs lg:text-sm text-justify">
            {service.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 md:px-2 lg:px-4 md:text-xs lg:text-sm">
          <ul
            className="space-y-1"
            aria-label={`${service.title} deliverables`}
          >
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1 leading-relaxed md:leading-normal lg:leading-relaxed"
              >
                <HugeiconsIcon
                  icon={Tick02Icon}
                  size={15}
                  strokeWidth={3}
                  className="text-emerald-500 shrink-0"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter
          className={`bg-linear-to-br ${service.accent} md:p-2 lg:p-4 justify-center`}
        >
          <Button asChild>
            <Link
              href={WHATSAPP_URL}
              className="group"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Request a ${service.title} quote on WhatsApp`}
            >
              Request a quote
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

export function WhatWeBuild() {
  return (
    <section
      id="what-we-build"
      className="bg-muted/30 min-h-dvh pt-16"
      aria-labelledby="what-we-build-heading"
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4">
        <div className="space-y-4">
          <Badge className="border-primary/30 bg-primary/5 text-primary">
            What we build
          </Badge>

          <h2
            id="what-we-build-heading"
            className="text-4xl font-bold tracking-tight"
          >
            Every product,
            <br />
            <span className="text-primary">engineered right.</span>
          </h2>

          <p className="text-lg text-muted-foreground text-justify sm:text-left">
            From a landing page to a full SaaS platform — we architect, develop,
            and ship software that your users will love.
          </p>
        </div>

        <ul className="grid gap-4 md:gap-2 sm:grid-cols-2 md:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </ul>
      </div>
    </section>
  );
}
