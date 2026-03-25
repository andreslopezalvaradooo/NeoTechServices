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
  },
] satisfies Device[];

function DeviceCard({ device }: { device: Device }) {
  return (
    <li>
      <Card className={`h-full bg-linear-to-br ${device.accent}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div
              className="h-11 w-11 rounded-xl border border-border bg-background flex items-center justify-center"
              aria-hidden
            >
              <HugeiconsIcon icon={device.icon} size={22} />
            </div>

            <p className="text-lg font-semibold">{device.title}</p>
          </CardTitle>

          <CardDescription>
            <p className="text-sm font-normal text-muted-foreground">
              {device.description}
            </p>
          </CardDescription>
        </CardHeader>

        <Separator aria-hidden />

        <CardContent className="flex-1">
          <ul
            className="grid md:grid-cols-2 gap-2"
            aria-label={`${device.title} repair issues`}
          >
            {device.issues.map((issue) => (
              <li key={issue} className="flex items-center gap-2 text-sm">
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

        <CardFooter className="justify-center">
          <Button asChild>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Request a ${device.title} repair on WhatsApp`}
            >
              Request this repair
              <HugeiconsIcon icon={ArrowRight02Icon} aria-hidden />
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
      className="bg-muted/30 mx-auto max-w-6xl pt-20 lg:pt-24 pb-4 lg:pb-8 px-4 lg:px-8 space-y-4"
      aria-labelledby="what-we-repair-heading"
    >
      <div className="flex flex-col gap-4">
        <Badge>What we repair</Badge>

        <h2
          id="what-we-repair-heading"
          className="text-4xl font-bold tracking-tight"
        >
          Every device,
          <br />
          every problem.
        </h2>

        <p className="max-w-lg text-muted-foreground text-lg text-justify lg:text-left">
          From a cracked screen to a full motherboard replacement — we handle it
          all with precision and care.
        </p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2">
        {DEVICES.map((device) => (
          <DeviceCard key={device.title} device={device} />
        ))}
      </ul>
    </section>
  );
}
