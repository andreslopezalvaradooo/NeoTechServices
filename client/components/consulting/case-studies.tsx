import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
}

interface CaseStudy {
  client: string;
  industry: string;
  service: string;
  challenge: string;
  approach: string;
  results: readonly Result[];
  tags: readonly string[];
  borderColor: string;
  badgeColor: string;
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
      { icon: TrendingUp, value: "4×", label: "Deployment frequency" },
      { icon: Clock, value: "-60%", label: "Incident response time" },
      { icon: DollarSign, value: "$200K", label: "Annual infra savings" },
    ],
    tags: ["Microservices", "AWS", "Kubernetes"],
    borderColor: "border-violet-500/20",
    badgeColor:
      "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
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
      { icon: TrendingUp, value: "+35%", label: "Online revenue" },
      { icon: Clock, value: "Real-time", label: "Inventory sync" },
      { icon: DollarSign, value: "-40%", label: "Ops overhead" },
    ],
    tags: ["Headless Commerce", "Event-driven", "GCP"],
    borderColor: "border-primary/20",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
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
      { icon: TrendingUp, value: "SOC 2", label: "Achieved in 90 days" },
      { icon: Clock, value: "3 months", label: "To enterprise-ready" },
      { icon: DollarSign, value: "2 deals", label: "Unblocked ($1.2M ARR)" },
    ],
    tags: ["HIPAA", "SOC 2", "Security", "Audit"],
    borderColor: "border-emerald-500/20",
    badgeColor:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
] as const;

interface ResultProps {
  result: Result;
}

function Result({ result }: ResultProps) {
  return (
    <li className="flex flex-col items-center gap-1 rounded-xl bg-background/60 p-2 text-center">
      <HugeiconsIcon
        icon={result.icon}
        aria-hidden="true"
        className="text-muted-foreground"
      />
      <span className="text-lg font-bold">{result.value}</span>
      <span className="text-xs leading-tight text-muted-foreground">
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
    borderColor,
    badgeColor,
  } = study;

  return (
    <li>
      <Card
        className={`flex h-full flex-col overflow-hidden border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${borderColor}`}
      >
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <Badge variant="outline" className={badgeColor}>
              {service}
            </Badge>
            <span className="text-xs text-muted-foreground">{industry}</span>
          </div>

          <CardTitle className="text-xl">{client}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Challenge
            </p>
            <CardDescription className="leading-relaxed text-justify md:text-left">
              {challenge}
            </CardDescription>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Approach
            </p>
            <CardDescription className="leading-relaxed text-justify md:text-left">
              {approach}
            </CardDescription>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Results
            </p>
            <ul
              aria-label={`${client} results`}
              className="grid grid-cols-3 gap-3"
            >
              {results.map((result) => (
                <Result key={result.label} result={result} />
              ))}
            </ul>
          </div>

          <ul
            aria-label={`${client} technologies`}
            className="mt-auto flex flex-wrap gap-2"
          >
            {tags.map((tag) => (
              <li key={tag}>
                <Badge variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </li>
  );
}

function SectionHeader() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl space-y-4">
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/5 text-primary"
        >
          Case Studies
        </Badge>

        <h2
          id="case-studies-heading"
          className="text-4xl font-bold tracking-tight lg:text-5xl"
        >
          Real results,
          <br />
          <span className="text-primary">real businesses</span>
        </h2>

        <p className="text-lg text-muted-foreground">
          A sample of the impact we&apos;ve delivered for clients across
          different industries and growth stages.
        </p>
      </div>

      <Button variant="outline" className="w-fit gap-2" asChild>
        <Link href="#consulting-form">
          Work with us
          <HugeiconsIcon icon={ArrowRight} aria-hidden="true" strokeWidth={2} />
        </Link>
      </Button>
    </div>
  );
}

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="mx-auto max-w-6xl space-y-8 p-6 lg:p-8"
    >
      <SectionHeader />

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CASE_STUDIES.map((study) => (
          <CaseStudy key={study.client} study={study} />
        ))}
      </ul>
    </section>
  );
}
