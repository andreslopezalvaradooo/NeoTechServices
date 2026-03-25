"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { RepairIcon, Location01Icon, Home } from "@hugeicons/core-free-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/src/lib/utils";
import { useSidebar } from "../ui/sidebar";

const actions = [
  {
    label: "Go home",
    href: "/",
    icon: Home,
  },
  {
    label: "New repair",
    href: "/dashboard/new",
    icon: RepairIcon,
  },
  {
    label: "Track repair",
    href: "/dashboard/track",
    icon: Location01Icon,
  },
] as const;

export function QuickActions() {
  const { open } = useSidebar();

  return (
    <Card>
      <CardContent className="flex gap-2 justify-center">
        {actions.map((action) => (
          <Button key={action.href} size="sm" asChild>
            <Link href={action.href}>
              <HugeiconsIcon icon={action.icon} strokeWidth={2} />
              <span
                className={cn("hidden sm:block lg:block", open && "md:hidden")}
              >
                {action.label}
              </span>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
