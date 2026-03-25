"use client";

import { GET_REPAIR_STATS } from "@/src/lib/queries/repair";
import { Card, CardContent } from "@/components/ui/card";
import { skipToken, useSuspenseQuery } from "@apollo/client/react";
import { useSession } from "@/src/lib/auth-client";

type CardVariant = "warn" | "ok" | "default";

interface StatCard {
  label: string;
  value: string | number;
  sub: string;
  variant?: CardVariant;
}

const variantClass: Record<CardVariant, string> = {
  warn: "text-amber-600",
  ok: "text-green-700",
  default: "",
};

export function KpiStats() {
  const { data: session, isPending } = useSession();

  const { data } = useSuspenseQuery(
    GET_REPAIR_STATS,
    isPending || !session?.user ? skipToken : {},
  );

  const stats = data?.getRepairStats;
  if (!stats) return null;

  const cards: StatCard[] = [
    {
      label: "Active repairs",
      value: stats.active,
      sub: `+${stats.activeDelta} from last week`,
    },
    {
      label: "Pending approval",
      value: stats.pending,
      sub: "Action required",
      variant: "warn",
    },
    {
      label: "Completed this month",
      value: stats.completed,
      sub: `↑ ${stats.completedDelta}% vs last month`,
      variant: "ok",
    },
    {
      label: "Avg. resolution",
      value: `${stats.avgDays}d`,
      sub: "Target: 4d",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map((c) => (
        <Card key={c.label} className="bg-muted/50 border-0 shadow-none">
          <CardContent className="flex flex-col gap-2 items-center">
            <p className="text-xs">{c.label}</p>

            <p
              className={`text-3xl font-medium leading-none ${variantClass[c.variant ?? "default"]}`}
            >
              {c.value}
            </p>

            <p className="text-xs text-muted-foreground">{c.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
