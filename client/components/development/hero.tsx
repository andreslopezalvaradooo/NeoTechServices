import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { GridOverlay } from "../grid-overlay";
import { Progress } from "../ui/progress";

interface Stat {
  value: string;
  label: string;
}

interface FileLine {
  label: string;
  value: string;
  color: string;
}

const WHATSAPP_URL =
  "https://wa.me/573000000000?text=Hi,%20I%20need%20a%20development%20quote";

const STATS = [
  { value: "30+", label: "Projects delivered" },
  { value: "100%", label: "On-time delivery" },
  { value: "5★", label: "Client satisfaction" },
] satisfies Stat[];

const FILE_LINES = [
  {
    label: "Project",
    value: "E-commerce platform",
    color: "bg-blue-500",
  },
  {
    label: "Stack",
    value: "Next.js · Prisma · PostgreSQL",
    color: "bg-violet-500",
  },
  {
    label: "Status",
    value: "Sprint 2 in progress",
    color: "bg-emerald-500",
  },
  {
    label: "Deploy",
    value: "Vercel · CI/CD active",
    color: "bg-amber-500",
  },
] satisfies FileLine[];

function GlowBlobs() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-2/3 w-2/3 rounded-full bg-primary/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-1/3 w-1/3 rounded-full bg-violet-500/10 blur-[120px]"
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

function DashboardCard() {
  return (
    <Card className="w-full shadow-2xl">
      <CardHeader className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-red-400" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-yellow-400" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-green-400" aria-hidden />
        <span className="ml-3 text-xs text-muted-foreground">
          neotech-dev · main
        </span>
      </CardHeader>

      <Separator aria-hidden />

      <CardContent className="p-5 space-y-4">
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Active project
          </p>

          <ul className="space-y-2">
            {FILE_LINES.map((line) => (
              <li
                key={line.label}
                className="bg-muted/10 px-3 py-2 flex gap-8 items-center justify-between rounded-lg border border-border"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${line.color}`}
                    aria-hidden
                  />

                  <span className="text-xs text-muted-foreground">
                    {line.label}
                  </span>
                </div>

                <Badge
                  variant="outline"
                  className="text-[10px] font-normal text-muted-foreground"
                >
                  {line.value}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-1.5">
        <div className="w-full flex justify-between text-[10px] text-muted-foreground">
          <span>Build progress</span>
          <span>72%</span>
        </div>

        <Progress value={72} className="h-1.5" />
      </CardFooter>
    </Card>
  );
}

function FloatingNotification() {
  return (
    <div className="absolute -bottom-4 -left-4 rounded-lg border border-border bg-background shadow-lg px-3 py-2.5 flex items-center gap-3">
      <HugeiconsIcon
        icon={CheckmarkCircle02Icon}
        className="text-green-500"
        aria-hidden
      />
      <div>
        <p className="text-xs font-semibold">Free discovery call</p>
        <p className="text-[10px] text-muted-foreground">
          No commitment required.
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      className="relative min-h-[calc(100dvh-64px)]"
      aria-labelledby="hero-heading"
    >
      <GridOverlay />
      <GlowBlobs />

      <div className="relative mx-auto max-w-5xl p-4 sm:p-8 grid gap-4 md:grid-cols-2">
        <div className="space-y-4 md:space-y-3 lg:space-y-4">
          <Badge className="bg-primary/5 border-primary/30 text-primary">
            <span
              className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse"
              aria-hidden
            />
            Development
          </Badge>

          <h1
            id="hero-heading"
            className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            Software built
            <br />
            <span className="relative text-primary">
              that scales.
              <Underline />
            </span>
          </h1>

          <p className="text-lg text-muted-foreground text-justify sm:text-left leading-tight">
            We design and build web applications, APIs, and digital products
            from scratch. Clean code, modern stacks, and on-time delivery.
          </p>

          <div className="space-x-1">
            <Button asChild>
              <Link
                href={WHATSAPP_URL}
                className="group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Start your project on WhatsApp"
              >
                Start your project
                <HugeiconsIcon
                  aria-hidden
                  icon={ArrowRight02Icon}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="#process">See how it works</Link>
            </Button>
          </div>

          <Stats />
        </div>

        <div className="pb-4 pl-4 flex justify-center items-center">
          <div className="relative w-full max-w-md">
            <DashboardCard />
            <FloatingNotification />
          </div>
        </div>
      </div>
    </section>
  );
}
