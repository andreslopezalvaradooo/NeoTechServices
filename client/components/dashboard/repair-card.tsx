import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { TrackRepairQuery } from "@/src/types/__generated__/graphql";

type TrackedRepair = NonNullable<TrackRepairQuery["trackRepair"]>;

export function RepairCard({ repair }: { repair: TrackedRepair }) {
  return (
    <Card className="max-w-sm mx-auto">
      <CardContent className="flex flex-col gap-4 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Ticket
          </span>

          <Badge variant="secondary" className="font-mono">
            {repair.ticketCode}
          </Badge>
        </div>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Contact
            </p>

            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="font-medium">{repair.name}</dd>
              <dt className="text-muted-foreground">Phone</dt>
              <dd className="font-medium">{repair.phone}</dd>
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-medium truncate">{repair.email}</dd>
            </dl>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Device
            </p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
              <dt className="text-muted-foreground">Type</dt>
              <dd className="font-medium capitalize">{repair.type}</dd>
              <dt className="text-muted-foreground">Brand</dt>
              <dd className="font-medium">{repair.brand}</dd>
              <dt className="text-muted-foreground">Model</dt>
              <dd className="font-medium">{repair.model}</dd>
            </dl>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Problem
          </p>
          
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
            <dt className="text-muted-foreground">Issue</dt>
            <dd className="font-medium capitalize">{repair.issue}</dd>
            <dt className="text-muted-foreground">Description</dt>
            <dd className="font-medium leading-relaxed">{repair.problem}</dd>
          </dl>
        </div>

        <Separator />

        <p className="text-xs text-muted-foreground text-right">
          {new Date(repair.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </CardContent>
    </Card>
  );
}
