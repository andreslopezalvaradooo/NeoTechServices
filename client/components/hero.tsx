import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Progress } from "./ui/progress";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AppleIcon,
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
  GoogleIcon,
  InstagramIcon,
  NewTwitterIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";

const STATS = [
  { value: "500+", label: "Clients served" },
  { value: "98%", label: "Satisfaction rate" },
  { value: "8+", label: "Years of experience" },
  { value: "24h", label: "Response time" },
];

const TECH_LOGOS = [
  {
    name: "Apple",
    icon: AppleIcon,
  },
  {
    name: "Google",
    icon: GoogleIcon,
  },
  {
    name: "X",
    icon: NewTwitterIcon,
  },
  {
    name: "YouTube",
    icon: YoutubeIcon,
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
  },
];

export function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 lg:px-8 my-4">
      <div className="grid items-center gap-4 lg:grid-cols-2">
        {/* Info */}
        <div className="flex flex-col gap-4">
          <Badge>
            <span className="h-1.5 w-1.5 rounded-full bg-background animate-pulse" />
            Tech service in Bogotá · Est. 2016
          </Badge>

          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold tracking-tight leading-[1.08] lg:text-6xl xl:text-7xl">
              Your technology, <br />
              <span className="relative">
                in the best
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 300 8"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M0 6 Q75 0 150 5 Q225 10 300 4"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="opacity-20"
                  />
                </svg>
              </span>
              <br />
              hands.
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              We repair laptops and PCs, advise businesses, develop web apps,
              and sell electronics with warranty. All with transparency and
              dedication to service.
            </p>
          </div>

          <div className="flex gap-4">
            <Button asChild>
              <Link href="/store">
                View catalog
                <HugeiconsIcon icon={ArrowRight02Icon} />
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="#services">Our services</Link>
            </Button>
          </div>

          <div className="flex justify-center gap-4">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-bold tracking-tight">
                    {stat.value}
                  </p>

                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>

                {i < STATS.length - 1 && (
                  <Separator orientation="vertical" className="h-12" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="relative flex items-center justify-center lg:justify-end pb-10">
          <div className="relative w-full max-w-md">
            <Card className="shadow-2xl">
              <CardHeader className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-muted-foreground">
                  panel.neotechservices.com
                </span>
              </CardHeader>

              <Separator />

              <CardContent className="p-5 space-y-4">
                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Repairs", value: "124", trend: "+12%" },
                    { label: "In progress", value: "8", trend: "active" },
                    { label: "Satisfaction", value: "98%", trend: "+2%" },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className="rounded-xl border border-border bg-muted/20 p-3 space-y-1"
                    >
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {c.label}
                      </p>

                      <p className="text-lg font-bold">{c.value}</p>

                      <p className="text-[10px] text-emerald-500 font-medium">
                        {c.trend}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Recent orders */}
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Recent orders
                  </p>

                  {[
                    {
                      id: "#4821",
                      device: 'MacBook Pro 14"',
                      status: "Completed",
                      color: "bg-emerald-500",
                    },
                    {
                      id: "#4820",
                      device: "Samsung Galaxy S24",
                      status: "Under review",
                      color: "bg-amber-500",
                    },
                    {
                      id: "#4819",
                      device: "Dell XPS 15",
                      status: "Delivered",
                      color: "bg-blue-500",
                    },
                    {
                      id: "#4818",
                      device: "HP Pavilion 15",
                      status: "Diagnosis",
                      color: "bg-violet-500",
                    },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-muted/10 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${item.color}`}
                        />

                        <span className="text-xs text-muted-foreground">
                          {item.id}
                        </span>

                        <span className="text-xs font-medium">
                          {item.device}
                        </span>
                      </div>

                      <Badge
                        variant="outline"
                        className="text-[10px] font-normal text-muted-foreground"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex-col gap-1.5">
                {/* Capacity bar */}
                <div className="w-full flex justify-between text-[10px] text-muted-foreground">
                  <span>Workshop capacity</span>
                  <span>72%</span>
                </div>

                <Progress value={72} className="h-1.5" />
              </CardFooter>
            </Card>

            {/* Floating notification */}
            <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-background shadow-lg px-4 py-2.5 flex items-center gap-3">
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                className="text-green-500"
              />

              <div>
                <p className="text-xs font-semibold">Repair completed</p>

                <p className="text-[10px] text-muted-foreground">
                  iPhone 15 Pro · 2 min ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logos strip */}
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground text-center">
          Brands we work with
        </p>

        <div className="flex items-center justify-center gap-8 flex-wrap">
          {TECH_LOGOS.map((logo) => (
            <HugeiconsIcon key={logo.name} icon={logo.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
