import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  LaptopIcon,
  Computer,
  Tick02Icon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons";

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
];

export function WhatWeRepair() {
  return (
    <section id="what-we-repair" className="py-22 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-4 max-w-2xl mb-12">
          <Badge>What we repair</Badge>

          <h2 className="text-4xl font-bold tracking-tight">
            Every device,
            <br />
            every problem.
          </h2>

          <p className="text-muted-foreground text-lg">
            From a cracked screen to a full motherboard replacement — we handle
            it all with precision and care.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {DEVICES.map((device) => (
            <Card
              key={device.title}
              className={`bg-linear-to-br ${device.accent}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl border border-border bg-background flex items-center justify-center">
                    <HugeiconsIcon icon={device.icon} size={22} />
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-lg font-semibold">
                      {device.title}
                    </span>

                    <span className="text-sm font-normal text-muted-foreground">
                      {device.description}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>

              <Separator />

              <CardContent className="pt-5">
                <ul className="grid grid-cols-2 gap-2">
                  {device.issues.map((issue) => (
                    <li key={issue} className="flex items-center gap-2 text-sm">
                      <HugeiconsIcon
                        icon={Tick02Icon}
                        size={15}
                        strokeWidth={3}
                        className="text-emerald-500 shrink-0"
                      />
                      {issue}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="justify-center">
                <Button asChild>
                  <Link
                    href="https://wa.me/573000000000?text=Hi,%20I%20need%20a%20repair"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Request this repair
                    <HugeiconsIcon icon={ArrowRight02Icon} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
