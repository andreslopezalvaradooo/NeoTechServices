"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "@/src/lib/auth-client";
import { skipToken, useSuspenseQuery } from "@apollo/client/react";
import { GET_RECENT_REPAIRS } from "@/src/lib/queries/repair";
import { RepairStatus } from "@/src/types/__generated__/graphql";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface StatusConfig {
  label: string;
  variant: BadgeVariant;
}

const statusConfig: Record<RepairStatus, StatusConfig> = {
  in_progress: { label: "In progress", variant: "default" },
  pending: { label: "Pending", variant: "secondary" },
  waiting_parts: { label: "Waiting parts", variant: "destructive" },
  completed: { label: "Completed", variant: "outline" },
};

export function RecentRepairs() {
  const { data: session, isPending } = useSession();

  const { data } = useSuspenseQuery(
    GET_RECENT_REPAIRS,
    isPending || !session?.user ? skipToken : {},
  );

  const repairs = data?.myRepairs ?? [];

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium">Recent repairs</CardTitle>

        <Button asChild size="sm">
          <Link href="/dashboard/repairs">
            View all
            <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {repairs.map((repair) => {
              const status = statusConfig[repair.status];

              return (
                <TableRow
                  key={repair.id}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="text-xs text-muted-foreground">
                    {repair.ticketCode}
                  </TableCell>

                  <TableCell className="font-medium text-sm">
                    <Link
                      href={`/dashboard/repairs/${repair.id}`}
                      className="hover:underline underline-offset-4"
                    >
                      {repair.brand} {repair.model}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>

                  <TableCell className="text-right text-xs text-muted-foreground">
                    {formatRelativeTime(new Date(repair.updatedAt))}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffH = Math.floor((now.getTime() - date.getTime()) / 3_600_000);
  const diffD = Math.floor(diffH / 24);

  if (diffH < 1) return "Just now";
  if (diffH < 24) return `${diffH}h ago`;
  if (diffD === 1) return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
