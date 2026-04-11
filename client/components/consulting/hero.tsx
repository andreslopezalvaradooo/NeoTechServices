import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight, Sparkles, Zap } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Separator } from "../ui/separator";

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
        className="pointer-events-none absolute right-0 top-0 h-2/3 w-2/3 rounded-full bg-primary/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-1/3 w-1/3 rounded-full bg-blue-500/10 blur-[120px]"
      />
    </>
  );
}

function Underline() {
  return (
    <svg
      className="absolute -bottom-1 left-0 w-full"
      viewBox="0 0 300 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
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
    <ul className="flex gap-1 lg:gap-2" aria-label="Key statistics">
      {STATS.map((stat, i) => (
        <li key={stat.label} className="flex gap-1 lg:gap-2 justify-center">
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold tracking-tight">{stat.value}</p>

            <p className="text-xs text-muted-foreground text-center">
              {stat.label}
            </p>
          </div>

          {i < STATS.length - 1 && (
            <Separator orientation="vertical" aria-hidden />
          )}
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
    <section
      className="relative min-h-[calc(100dvh-64px)] p-4 sm:p-8"
      aria-labelledby="hero-heading"
    >
      <GridOverlay />
      <GlowBlobs />

      <div className="relative mx-auto max-w-5xl grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <Badge className="bg-primary/5 border-primary/30 text-primary">
            <HugeiconsIcon icon={Sparkles} aria-hidden="true" />
            Tech Consulting Services
          </Badge>

          <h1
            id="hero-heading"
            className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            Transform your{" "}
            <span className="relative text-primary">
              technology
              <Underline />
            </span>
            <br />
            strategy
          </h1>

          <p className="text-lg text-muted-foreground text-justify sm:text-left leading-tight">
            We help startups, SMBs, and enterprises make the right technology
            decisions — from architecture and digital transformation to IT
            strategy and product development.
          </p>

          <div className="space-x-1">
            <Button asChild>
              <Link href="#request" className="group">
                Book a free consultation
                <HugeiconsIcon
                  aria-hidden
                  icon={ArrowRight}
                  strokeWidth={2}
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

        <div className="flex justify-center items-center">
          <div className="relative w-full h-96 max-w-md" aria-hidden>
            <DigitalTransformation />
            <CurrentSprint />
            <Availability />
          </div>
        </div>
      </div>
    </section>
  );
}
