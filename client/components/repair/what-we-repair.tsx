import Link from "next/link";
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
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  LaptopIcon,
  Computer,
  Tick02Icon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons";

interface Device {
  icon: IconSvgElement;
  title: string;
  description: string;
  issues: string[];
  accent: string;
  color: string;
}

const WHATSAPP_URL =
  "https://wa.me/573000000000?text=Hi,%20I%20need%20a%20repair";

const DEVICES = [
  {
    icon: LaptopIcon,
    title: "Laptops",
    description:
      "All brands and models: Apple, Dell, HP, Lenovo, Asus, Acer and more.",
    issues: [
      "Screen replacement",
      "Keyboard repair",
      "Battery replacement",
      "Liquid damage",
      "Charging port repair",
      "Overheating issues",
    ],
    accent: "from-blue-500/10 to-cyan-500/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: Computer,
    title: "Desktop PCs",
    description:
      "Custom builds, branded desktops and all-in-ones. Hardware and software.",
    issues: [
      "Component upgrades",
      "Power supply replacement",
      "GPU / RAM issues",
      "OS installation",
      "Virus removal",
      "Performance optimization",
    ],
    accent: "from-violet-500/10 to-purple-500/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
] satisfies Device[];

function DeviceCard({ device }: { device: Device }) {
  return (
    <li>
      <Card className={`h-full bg-linear-to-br ${device.accent}`}>
        <CardHeader>
          <div className="flex gap-2 items-center">
            <div
              className={`h-10 w-10 flex items-center justify-center rounded-xl ${device.color}`}
              aria-hidden
            >
              <HugeiconsIcon icon={device.icon} />
            </div>

            <CardTitle>{device.title}</CardTitle>
          </div>

          <CardDescription className="text-justify">
            {device.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <ul
            className="grid md:grid-cols-2 gap-1"
            aria-label={`${device.title} repair issues`}
          >
            {device.issues.map((issue) => (
              <li
                key={issue}
                className="flex items-center gap-1 leading-relaxed"
              >
                <HugeiconsIcon
                  icon={Tick02Icon}
                  size={15}
                  strokeWidth={3}
                  className="text-emerald-500 shrink-0"
                  aria-hidden
                />
                {issue}
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter
          className={`bg-linear-to-br ${device.accent} justify-center`}
        >
          <Button asChild>
            <Link
              href={WHATSAPP_URL}
              className="group"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Request a ${device.title} repair on WhatsApp`}
            >
              Request this repair
              <HugeiconsIcon
                aria-hidden
                icon={ArrowRight02Icon}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </li>
  );
}

export function WhatWeRepair() {
  return (
    <section
      id="what-we-repair"
      className="bg-muted/30 min-h-dvh pt-16"
      aria-labelledby="what-we-repair-heading"
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4">
        <div className="space-y-4">
          <Badge className="border-primary/30 bg-primary/5 text-primary">
            What we repair
          </Badge>

          <h2
            id="what-we-repair-heading"
            className="text-4xl font-bold tracking-tight"
          >
            Every device,
            <br />
            <span className="text-primary">every problem.</span>
          </h2>

          <p className="text-lg text-muted-foreground text-justify sm:text-left">
            From a cracked screen to a full motherboard replacement — we handle
            it all with precision and care.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2">
          {DEVICES.map((device) => (
            <DeviceCard key={device.title} device={device} />
          ))}
        </ul>
      </div>
    </section>
  );
}
