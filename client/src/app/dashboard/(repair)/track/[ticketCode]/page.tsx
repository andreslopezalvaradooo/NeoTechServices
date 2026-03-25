"use client";

import { RepairCard } from "@/components/dashboard/repair-card";
import { Card, CardContent } from "@/components/ui/card";
import { TRACK_REPAIR } from "@/src/lib/queries/repair";
import { useSuspenseQuery } from "@apollo/client/react";
import { use } from "react";

export default function TrackResultPage({
  params,
}: {
  params: Promise<{ ticketCode: string }>;
}) {
  const { ticketCode } = use(params);
  
  const { data } = useSuspenseQuery(TRACK_REPAIR, {
    variables: { input: { ticketCode } },
  });

  if (!data?.trackRepair) {
    return (
      <Card>
        <CardContent className="grid place-items-center min-h-40">
          <p className="text-sm text-muted-foreground">Repair not found.</p>
        </CardContent>
      </Card>
    );
  }

  return <RepairCard repair={data.trackRepair} />;
}
