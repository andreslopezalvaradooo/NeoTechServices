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
import { Progress } from "@/components/ui/progress";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

interface Stat {
  value: string;
  label: string;
}

interface Row {
  label: string;
  value: string;
  color: string;
}

const CAPACITY = 65;
const WHATSAPP_URL =
  "https://wa.me/573000000000?text=Hi,%20I%20need%20a%20repair";

const STATS = [
  { value: "500+", label: "Devices repaired" },
  { value: "98%", label: "Satisfaction rate" },
  { value: "24h", label: "Avg. turnaround" },
] satisfies Stat[];

const ROWS = [
  {
    label: "Device",
    value: 'MacBook Pro 14"',
    color: "bg-blue-500",
  },
  {
    label: "Issue",
    value: "No power / liquid damage",
    color: "bg-amber-500",
  },
  {
    label: "Status",
    value: "Diagnosis complete",
    color: "bg-emerald-500",
  },
  {
    label: "ETA",
    value: "Ready in 24 hours",
    color: "bg-violet-500",
  },
] satisfies Row[];

function DashboardCard() {
  return (
    <Card className="w-full shadow-2xl">
      <CardHeader className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-red-400" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-yellow-400" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-green-400" aria-hidden />
        <span className="ml-3 text-xs text-muted-foreground">
          repair-diagnostics.exe
        </span>
      </CardHeader>

      <Separator aria-hidden />

      <CardContent className="p-5 space-y-4">
        {/* Diagnostic rows */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Active diagnosis
          </p>

          <ul className="space-y-2">
            {ROWS.map((row) => (
              <li
                key={row.label}
                className="bg-muted/10 px-3 py-2 flex gap-8 items-center justify-between rounded-lg border border-border"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${row.color}`}
                    aria-hidden
                  />

                  <span className="text-xs text-muted-foreground">
                    {row.label}
                  </span>
                </div>

                <Badge
                  variant="outline"
                  className="text-[10px] font-normal text-muted-foreground"
                >
                  {row.value}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-1.5">
        <div className="w-full flex justify-between text-[10px] text-muted-foreground">
          <span>Repair progress</span>
          <span>{CAPACITY}%</span>
        </div>

        <Progress value={CAPACITY} className="h-1.5" />
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
        <p className="text-xs font-semibold">Diagnosis free of charge</p>
        <p className="text-[10px] text-muted-foreground">No fix, no fee.</p>
      </div>
    </div>
  );
}

export function RepairHero() {
  return (
    <section
      className="mx-auto max-w-6xl p-4 lg:p-8 flex flex-col md:flex-row gap-4"
      aria-labelledby="repair-hero-heading"
    >
      <div className="w-full flex flex-col gap-4">
        <Badge>
          <span
            className="h-1.5 w-1.5 rounded-full bg-background animate-pulse"
            aria-hidden
          />
          Repair Service · Bogotá
        </Badge>

        <div className="w-full flex flex-col gap-4">
          <h1
            id="repair-hero-heading"
            className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08]"
          >
            Laptop & PC
            <br />
            <span className="text-muted-foreground">repair experts.</span>
          </h1>

          <p className="max-w-md text-lg text-muted-foreground text-justify md:text-left leading-relaxed">
            We diagnose and repair all laptop and desktop PC brands. Fast
            turnaround, genuine parts, and a 3-month warranty on every job.
          </p>
        </div>

        <div className="space-x-1">
          <Button asChild>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Request a repair on WhatsApp"
            >
              Request a repair
              <HugeiconsIcon icon={ArrowRight02Icon} aria-hidden />
            </Link>
          </Button>

          <Button variant="secondary" asChild>
            <Link href="#process">See how it works</Link>
          </Button>
        </div>

        <ul className="flex gap-1 lg:gap-2" aria-label="Key statistics">
          {STATS.map((stat, i) => (
            <li key={stat.label} className="flex gap-1 lg:gap-2 justify-center">
              <div className="flex flex-col items-center">
                <p className="text-2xl font-bold tracking-tight">
                  {stat.value}
                </p>

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
      </div>

      <div className="w-full pb-4 pl-4 flex justify-center items-center">
        <div className="relative w-full max-w-md">
          <DashboardCard />
          <FloatingNotification />
        </div>
      </div>
    </section>
  );
}
