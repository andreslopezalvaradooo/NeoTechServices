import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight, Sparkles, Zap } from "@hugeicons/core-free-icons";
import Link from "next/link";

interface Stat {
  value: string;
  label: string;
}

interface SprintItem {
  label: string;
  progress: number;
}

const STATS: Stat[] = [
  { value: "200+", label: "Projects delivered" },
  { value: "50+", label: "Expert consultants" },
  { value: "98%", label: "Client satisfaction" },
];

const DIGITAL_ITEMS = [
  "Cloud Migration",
  "Process Automation",
  "API Integration",
] as const;

const SPRINT_ITEMS: SprintItem[] = [
  { label: "Architecture Review", progress: 85 },
  { label: "Tech Audit", progress: 60 },
  { label: "IT Strategy", progress: 40 },
];

function GridOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
      style={{
        backgroundImage:
          "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  );
}

function GlowBlobs() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]"
      />
    </>
  );
}

function Underline() {
  return (
    <svg
      aria-hidden="true"
      className="absolute -bottom-2 left-0 w-full text-primary"
      viewBox="0 0 300 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 9C50 3 100 1 150 3C200 5 250 7 298 3"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Stats() {
  return (
    <ul className="flex sm:flex-wrap md:flex-nowrap gap-8 border-t border-border/50">
      {STATS.map(({ value, label }) => (
        <li key={label} className="flex flex-col gap-1">
          <span className="text-3xl font-bold">{value}</span>
          <span className="text-sm text-muted-foreground">{label}</span>
        </li>
      ))}
    </ul>
  );
}

function DigitalTransformation() {
  return (
    <Card className="absolute left-8 top-4 w-72 shadow-xl">
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <HugeiconsIcon icon={Zap} className="text-primary" />
          </div>

          <div>
            <p className="font-semibold">Digital Transformation</p>
            <p className="text-xs text-muted-foreground">Enterprise grade</p>
          </div>
        </div>

        <ul className="space-y-2">
          {DIGITAL_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2"
            >
              <div
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              />

              <span className="text-sm text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function CurrentSprint() {
  return (
    <Card className="absolute right-4 top-44 w-64 shadow-xl">
      <CardContent className="space-y-3">
        <p className="text-sm font-semibold">Current Sprint</p>
        <ul className="space-y-3">
          {SPRINT_ITEMS.map(({ label, progress }) => (
            <li key={label} className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{label}</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function Availability() {
  return (
    <Card className="absolute bottom-4 left-4 shadow-xl">
      <CardContent className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10"
        >
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div>
          <p className="text-sm font-semibold">Available now</p>
          <p className="text-xs text-muted-foreground">Free 30-min session</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[calc(100dvh-64px)] overflow-hidden">
      <GlowBlobs />
      <GridOverlay />

      <div className="relative mx-auto max-w-6xl p-6 sm:p-8 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="flex flex-col gap-8 md:gap-6 lg:gap-8">
            <Badge className="gap-2 border-primary/30 bg-primary/5 text-sm text-primary">
              <HugeiconsIcon icon={Sparkles} aria-hidden="true" />
              Tech Consulting Services
            </Badge>

            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                Transform your
                <span className="relative ml-3 text-primary">
                  technology
                  <Underline />
                </span>
                <br />
                strategy
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-left text-justify">
                We help startups, SMBs, and enterprises make the right
                technology decisions — from architecture and digital
                transformation to IT strategy and product development.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="group" asChild>
                <Link href="#consulting-form">
                  Book a free consultation
                  <HugeiconsIcon
                    icon={ArrowRight}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="#consulting-services">Explore services</Link>
              </Button>
            </div>

            <Stats />
          </div>

          <div
            aria-hidden="true"
            className="relative h-96 max-w-md hidden md:block"
          >
            <DigitalTransformation />
            <CurrentSprint />
            <Availability />
          </div>
      </div>
    </section>
  );
}
