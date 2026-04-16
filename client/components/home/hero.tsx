import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";
import {
  AppleIcon,
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
  GoogleIcon,
  InstagramIcon,
  NewTwitterIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { GridOverlay } from "../grid-overlay";
import { GlowBlobs } from "../glow-blobs";

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

function Underline() {
  return (
    <svg
      className="absolute -bottom-1 left-0 w-full"
      viewBox="0 0 300 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0 6 Q75 0 150 5 Q225 10 300 4"
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
          panel.neotechservices.com
        </span>
      </CardHeader>

      <Separator aria-hidden />

      <CardContent className="space-y-4">
        <ul className="grid grid-cols-3 gap-1 md:gap-2">
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

        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Recent orders
          </p>

          <ul className="space-y-1">
            {ORDERS.map((order) => (
              <li
                key={order.id}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/10 px-2 py-1"
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
      className="relative min-h-[calc(100dvh-64px)]"
      aria-labelledby="hero-heading"
    >
      <GridOverlay />
      <GlowBlobs />

      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4 md:space-y-3 lg:space-y-4">
            <Badge className="bg-primary/5 border-primary/30 text-primary">
              <span
                className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse"
                aria-hidden
              />
              Tech service in Bogotá · Est. 2016
            </Badge>

            <h1
              id="hero-heading"
              className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
            >
              Your technology, <br />
              <span className="relative text-primary">
                in the best
                <Underline />
              </span>
              <br />
              hands.
            </h1>

            <p className="text-lg text-muted-foreground text-justify sm:text-left leading-tight">
              We repair laptops and PCs, advise businesses, develop web apps,
              and sell electronics with warranty. All with transparency and
              dedication to service.
            </p>

            <div className="space-x-1">
              <Button asChild>
                <Link href="/store" className="group">
                  View catalog
                  <HugeiconsIcon
                    aria-hidden
                    icon={ArrowRight02Icon}
                    strokeWidth={2}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="#services">Our services</Link>
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

        <div className="space-y-4">
          <h3 className="text-xs text-muted-foreground text-center uppercase tracking-widest">
            Brands we work with
          </h3>

          <ul
            className="flex items-center justify-center gap-4 md:gap-8"
            aria-label="Partner brands"
          >
            {TECH_LOGOS.map((logo) => (
              <li key={logo.name} aria-label={logo.name}>
                <HugeiconsIcon icon={logo.icon} strokeWidth={2} aria-hidden />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
