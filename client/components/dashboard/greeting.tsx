"use client";

import { useSession } from "@/src/lib/auth-client";
import { WavingHand02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Skeleton } from "../ui/skeleton";

const getGreeting = (hour: number): string => {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const date = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function Greeting() {
  const { data: session, isPending } = useSession();

  if (isPending)
    return (
      <div>
        <Skeleton className="h-6 w-80 mb-2" />
        <Skeleton className="h-4 w-60" />
      </div>
    );

  const name = session?.user?.name?.split(" ")[0];
  const greeting = getGreeting(new Date().getHours());

  return (
    <div>
      <h1 className="flex items-center gap-2 text-xl font-medium text-foreground">
        {greeting}
        {name ? `, ${name}` : ""}
        <HugeiconsIcon icon={WavingHand02Icon} />
      </h1>

      <p className="mt-0.5 text-sm text-muted-foreground">{date}</p>
    </div>
  );
}
