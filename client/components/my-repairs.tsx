"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MY_REPAIRS } from "@/src/lib/queries/repair";
import type { MyRepairsQuery } from "@/src/types/__generated__/graphql";
import { useSuspenseQuery } from "@apollo/client/react";

type MyRepair = NonNullable<MyRepairsQuery["myRepairs"]>[number];

function RepairCard({ repair }: { repair: MyRepair }) {
  return (
    <Card>
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

export default function MyRepairs() {
  const { data } = useSuspenseQuery(MY_REPAIRS);
  const repairs = data?.myRepairs ?? [];

  return (
    <section
      className="p-4 md:p-8 space-y-4"
      aria-labelledby="my-repairs-heading"
    >
      <div className="flex flex-col gap-2">
        <h2
          id="my-repairs-heading"
          className="text-4xl font-bold tracking-tight"
        >
          My
          <br />
          <span className="text-muted-foreground">repairs.</span>
        </h2>

        <p className="max-w-md text-muted-foreground text-lg leading-relaxed">
          All your repair requests in one place.
        </p>
      </div>

      {repairs.length === 0 ? (
        <Card>
          <CardContent className="grid place-items-center min-h-40">
            <p className="text-sm text-muted-foreground">
              You have no repairs yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ul className="grid sm:grid-cols-2  lg:grid-cols-3 gap-4">
          {repairs.map((r) => (
            <li key={r.ticketCode}>
              <RepairCard repair={r} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
