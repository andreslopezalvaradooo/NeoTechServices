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
import type { IconSvgElement } from "@hugeicons/react";

interface DashboardStat {
  label: string;
  value: string;
  trend: string;
}

interface Order {
  id: string;
  device: string;
  status: string;
  color: string;
}

interface Stat {
  value: string;
  label: string;
}

interface TechLogo {
  name: string;
  icon: IconSvgElement;
}

const DASHBOARD_STATS = [
  { label: "Repairs", value: "124", trend: "+12%" },
  { label: "In progress", value: "8", trend: "active" },
  { label: "Satisfaction", value: "98%", trend: "+2%" },
] satisfies DashboardStat[];

const ORDERS = [
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
] satisfies Order[];

const CAPACITY = 72;

const STATS = [
  { value: "500+", label: "Clients served" },
  { value: "98%", label: "Satisfaction rate" },
  { value: "8+", label: "Years of experience" },
  { value: "24h", label: "Response time" },
] satisfies Stat[];

const TECH_LOGOS = [
  { name: "Apple", icon: AppleIcon },
  { name: "Google", icon: GoogleIcon },
  { name: "X", icon: NewTwitterIcon },
  { name: "YouTube", icon: YoutubeIcon },
  { name: "Instagram", icon: InstagramIcon },
] satisfies TechLogo[];

function DashboardCard() {
  return (
    <Card className="w-full shadow-2xl">
      <CardHeader className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-red-400" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-yellow-400" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-green-400" aria-hidden />
        <span className="ml-3 text-xs text-muted-foreground">
          panel.neotechservices.com
        </span>
      </CardHeader>

      <Separator aria-hidden />

      <CardContent className="p-3 md:p-5 space-y-4">
        {/* Stat cards */}
        <ul className="grid grid-cols-3 gap-1 md:gap-3">
          {DASHBOARD_STATS.map((stat) => (
            <li
              key={stat.label}
              className="rounded-lg border border-border bg-muted/20 p-2 space-y-1"
            >
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>

              <p className="text-lg font-bold">{stat.value}</p>

              <p className="text-[10px] text-emerald-500 font-medium">
                {stat.trend}
              </p>
            </li>
          ))}
        </ul>

        {/* Recent orders */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Recent orders
          </p>

          <ul className="space-y-2">
            {ORDERS.map((order) => (
              <li
                key={order.id}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/10 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${order.color}`}
                    aria-hidden
                  />

                  <span className="text-xs text-muted-foreground">
                    {order.id}
                  </span>

                  <span className="text-xs font-medium">{order.device}</span>
                </div>

                <Badge
                  variant="outline"
                  className="text-[10px] font-normal text-muted-foreground"
                >
                  {order.status}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-1.5">
        <div className="w-full flex justify-between text-[10px] text-muted-foreground">
          <span>Workshop capacity</span>
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
        <p className="text-xs font-semibold">Repair completed</p>
        <p className="text-[10px] text-muted-foreground">
          iPhone 15 Pro · 2 min ago
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      className="mx-auto max-w-6xl p-4 lg:p-8 space-y-4"
      aria-labelledby="hero-heading"
    >
      {/* Info + Dashboard */}
      <div className="w-full grid md:grid-cols-2 gap-4 justify-center">
        <div className="flex flex-col justify-between gap-4">
          <Badge>
            <span
              className="h-1.5 w-1.5 rounded-full bg-background animate-pulse"
              aria-hidden
            />
            Tech service in Bogotá · Est. 2016
          </Badge>

          <div className="w-full flex flex-col gap-4">
            <h1
              id="hero-heading"
              className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08]"
            >
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

            <p className="max-w-md text-lg text-muted-foreground text-justify md:text-left leading-relaxed">
              We repair laptops and PCs, advise businesses, develop web apps,
              and sell electronics with warranty. All with transparency and
              dedication to service.
            </p>
          </div>

          <div className="space-x-1">
            <Button asChild>
              <Link href="/store">
                View catalog
                <HugeiconsIcon icon={ArrowRight02Icon} aria-hidden />
              </Link>
            </Button>

            <Button variant="secondary" asChild>
              <Link href="#services">Our services</Link>
            </Button>
          </div>

          <ul className="flex gap-1 lg:gap-2" aria-label="Key statistics">
            {STATS.map((stat, i) => (
              <li
                key={stat.label}
                className="flex gap-1 lg:gap-2 justify-center"
              >
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

        {/* Dashboard */}
        <div className="w-full pb-4 pl-4 flex justify-center items-center">
          <div className="relative w-full max-w-md">
            <DashboardCard />
            <FloatingNotification />
          </div>
        </div>
      </div>

      {/* Brand logos */}
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground text-center">
          Brands we work with
        </p>

        <ul
          className="flex items-center justify-center gap-8"
          aria-label="Partner brands"
        >
          {TECH_LOGOS.map((logo) => (
            <li key={logo.name} aria-label={logo.name}>
              <HugeiconsIcon icon={logo.icon} aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
