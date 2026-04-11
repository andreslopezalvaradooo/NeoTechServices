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
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign,
} from "@hugeicons/core-free-icons";
import Link from "next/link";

interface Result {
  icon: IconSvgElement;
  value: string;
  label: string;
  color: string;
}

interface CaseStudy {
  client: string;
  industry: string;
  service: string;
  challenge: string;
  approach: string;
  results: readonly Result[];
  tags: readonly string[];
  accent: string;
  color: string;
}

const CASE_STUDIES: readonly CaseStudy[] = [
  {
    client: "FinTech Startup",
    industry: "Financial Services",
    service: "Software Architecture",
    challenge:
      "A seed-stage fintech needed to go from a monolithic MVP to a scalable microservices architecture before their Series A, without halting product development.",
    approach:
      "We designed a strangler fig migration strategy, enabling the team to incrementally modernize while keeping the product live and shipping features.",
    results: [
      {
        icon: TrendingUp,
        value: "4×",
        label: "Deployment frequency",
        color: "text-blue-600 dark:text-blue-400",
      },
      {
        icon: Clock,
        value: "-60%",
        label: "Incident response time",
        color: "text-violet-600 dark:text-violet-400",
      },
      {
        icon: DollarSign,
        value: "$200K",
        label: "Annual infra savings",
        color: "text-emerald-600 dark:text-emerald-400",
      },
    ],
    tags: ["Microservices", "AWS", "Kubernetes"],
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    client: "Retail Chain",
    industry: "E-commerce & Retail",
    service: "Digital Transformation",
    challenge:
      "A regional retailer with 40+ stores was losing market share due to disconnected inventory, POS, and e-commerce systems with zero real-time visibility.",
    approach:
      "We led a 6-month transformation: unified data platform, real-time inventory sync, and a headless e-commerce layer built on their existing infrastructure.",
    results: [
      {
        icon: TrendingUp,
        value: "+35%",
        label: "Online revenue",
        color: "text-blue-600 dark:text-blue-400",
      },
      {
        icon: Clock,
        value: "Real-time",
        label: "Inventory sync",
        color: "text-violet-600 dark:text-violet-400",
      },
      {
        icon: DollarSign,
        value: "-40%",
        label: "Ops overhead",
        color: "text-blue-600 dark:text-blue-400",
      },
    ],
    tags: ["Headless Commerce", "Event-driven", "GCP"],
    accent: "from-primary/15 to-primary/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    client: "Healthcare SaaS",
    industry: "Health Tech",
    service: "Technology Audit",
    challenge:
      "A Series B health-tech company was facing compliance risks and technical debt that was blocking enterprise customer onboarding.",
    approach:
      "We conducted a comprehensive audit across security, HIPAA compliance, code quality, and infrastructure — then prioritized a 90-day remediation roadmap.",
    results: [
      {
        icon: TrendingUp,
        value: "SOC 2",
        label: "Achieved in 90 days",
        color: "text-blue-600 dark:text-blue-400",
      },
      {
        icon: Clock,
        value: "3 months",
        label: "To enterprise-ready",
        color: "text-violet-600 dark:text-violet-400",
      },
      {
        icon: DollarSign,
        value: "2 deals",
        label: "Unblocked ($1.2M ARR)",
        color: "text-blue-600 dark:text-blue-400",
      },
    ],
    tags: ["HIPAA", "SOC 2", "Security", "Audit"],
    accent: "from-[oklch(0.8_0.13_212)]/15 to-[oklch(0.8_0.13_212)]/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
] as const;

interface ResultProps {
  result: Result;
}

function Result({ result }: ResultProps) {
  return (
    <li className="flex flex-col items-center gap-1 rounded-xl bg-background/60 p-2 md:p-1 text-center">
      <HugeiconsIcon
        aria-hidden
        icon={result.icon}
        size={15}
        className={`${result.color}`}
      />
      <span className="text-lg md:text-xs font-bold">{result.value}</span>
      <span className="text-xs md:text-[10px] leading-tight text-muted-foreground">
        {result.label}
      </span>
    </li>
  );
}

interface CaseStudyProps {
  study: CaseStudy;
}

function CaseStudy({ study }: CaseStudyProps) {
  const {
    client,
    industry,
    service,
    challenge,
    approach,
    results,
    tags,
    accent,
    color,
  } = study;

  return (
    <li>
      <Card
        className={`bg-linear-to-br ${accent} h-full md:py-2 md:gap-1 lg:gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
      >
        <CardHeader className="md:px-2">
          <div className="flex gap-2 items-center justify-between">
            <span className="text-xs md:text-[10px] text-left text-muted-foreground">
              {industry}
            </span>

            <Badge className={`${color} md:text-[10px]`}>{service}</Badge>
          </div>

          <CardTitle className="md:text-center">{client}</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 md:px-2 space-y-4 md:space-y-2">
          <div className="space-y-1 text-muted-foreground">
            <p className="text-xs md:text-[10px] font-semibold uppercase tracking-wider">
              Challenge
            </p>

            <p className="md:text-xs leading-relaxed md:leading-normal text-justify">
              {challenge}
            </p>
          </div>

          <div className="space-y-1 text-muted-foreground">
            <p className="text-xs md:text-[10px] font-semibold uppercase tracking-wider">
              Approach
            </p>

            <p className="md:text-xs leading-relaxed md:leading-normal text-justify">
              {approach}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs md:text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Results
            </p>

            <ul
              aria-label={`${client} results`}
              className="grid grid-cols-3 gap-3 md:gap-1"
            >
              {results.map((result) => (
                <Result key={result.label} result={result} />
              ))}
            </ul>
          </div>
        </CardContent>

        <CardFooter className={`bg-linear-to-br ${study.accent} md:p-1`}>
          <ul
            aria-label={`${client} technologies`}
            className="flex flex-wrap gap-2 md:gap-0.5"
          >
            {tags.map((tag) => (
              <li key={tag}>
                <Badge
                  variant="secondary"
                  className="md:px-1 md:text-[10px] font-normal"
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

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="min-h-dvh pt-16"
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4 md:space-y-2 lg:space-y-4">
        <div className="space-y-4 md:space-y-1 lg:space-y-3">
          <Badge className="border-primary/30 bg-primary/5 text-primary">
            Case Studies
          </Badge>

          <h2
            id="case-studies-heading"
            className="text-4xl md:text-3xl lg:text-4xl font-bold tracking-tight"
          >
            Real results,
            <br />
            <span className="text-primary">real businesses</span>
          </h2>

          <div className="flex flex-col md:flex-row gap-4 md:items-end md:justify-between">
            <p className="max-w-2xl text-lg md:text-base lg:text-lg leading-relaxed md:leading-normal lg:leading-relaxed text-muted-foreground text-justify md:text-left">
              A sample of the impact we&apos;ve delivered for clients across
              different industries and growth stages.
            </p>

            <Button asChild>
              <Link href="#request" className="group w-fit">
                Work with us
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

        <ul className="grid gap-4 md:gap-2 sm:grid-cols-2 md:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <CaseStudy key={study.client} study={study} />
          ))}
        </ul>
      </div>
    </section>
  );
}
