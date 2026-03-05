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

const REPAIR_STATS = [
  { value: "500+", label: "Devices repaired" },
  { value: "98%", label: "Satisfaction rate" },
  { value: "24h", label: "Avg. turnaround" },
];

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
];

export function RepairHero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 lg:px-8 my-4">
      <div className="grid items-center gap-4 lg:grid-cols-2">
        {/* Info */}
        <div className="flex flex-col gap-4">
          <Badge>
            <span className="h-1.5 w-1.5 rounded-full bg-background animate-pulse" />
            Repair Service · Bogotá
          </Badge>

          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold tracking-tight leading-[1.08] lg:text-6xl xl:text-7xl">
              Laptop & PC
              <br />
              <span className="text-muted-foreground">repair experts.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              We diagnose and repair all laptop and desktop PC brands. Fast
              turnaround, genuine parts, and a 3-month warranty on every job.
            </p>
          </div>

          <div className="flex gap-4">
            <Button asChild>
              <Link
                href="https://wa.me/573000000000?text=Hi,%20I%20need%20a%20repair"
                target="_blank"
                rel="noopener noreferrer"
              >
                Request a repair
                <HugeiconsIcon icon={ArrowRight02Icon} />
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="#process">See how it works</Link>
            </Button>
          </div>

          <div className="flex justify-center gap-4">
            {REPAIR_STATS.map((stat, i) => (
              <div key={stat.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-bold tracking-tight">
                    {stat.value}
                  </p>

                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>

                {i < REPAIR_STATS.length - 1 && (
                  <Separator orientation="vertical" className="h-12" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic mockup */}
        <div className="relative flex items-center justify-center lg:justify-end pb-10">
          <div className="relative w-full max-w-md">
            <Card className="shadow-2xl">
              <CardHeader className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-muted-foreground">
                  repair-diagnostics.exe
                </span>
              </CardHeader>

              <Separator />

              <CardContent className="p-5 space-y-4">
                {/* Diagnostic rows */}
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Active diagnosis
                  </p>

                  {ROWS.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-lg border border-border bg-muted/10 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${row.color}`} />
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
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex-col gap-1.5">
                <div className="w-full flex justify-between text-[10px] text-muted-foreground">
                  <span>Repair progress</span>
                  <span>65%</span>
                </div>

                <Progress value={65} className="h-1.5" />
              </CardFooter>
            </Card>

            {/* Floating notification */}
            <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-background shadow-lg px-4 py-2.5 flex items-center gap-3">
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                className="text-green-500"
              />
              <div>
                <p className="text-xs font-semibold">
                  Diagnosis free of charge
                </p>
                
                <p className="text-[10px] text-muted-foreground">
                  No fix, no fee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
