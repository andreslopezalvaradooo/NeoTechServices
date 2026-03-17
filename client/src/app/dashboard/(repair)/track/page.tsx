"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TRACK_REPAIR } from "@/src/lib/queries/repair";
import type { TrackRepairQuery } from "@/src/types/__generated__/graphql";
import { useLazyQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

type TrackedRepair = NonNullable<TrackRepairQuery["repairByTicketCode"]>;

const trackSchema = z.object({
  ticketCode: z
    .string()
    .min(1, "Ticket code is required")
    .regex(/^REP-\d{6}$/, "Format must be REP-XXXXXX"),
});

type TrackValues = z.infer<typeof trackSchema>;

function TrackForm({ onResult }: { onResult: (r: TrackedRepair) => void }) {
  const [trackRepair, { loading, error }] = useLazyQuery(TRACK_REPAIR);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TrackValues>({
    resolver: zodResolver(trackSchema),
    defaultValues: { ticketCode: "" },
  });

  useEffect(() => {
    if (error) setError("root", { message: error.message });
    else clearErrors("root");
  }, [error, setError, clearErrors]);

  async function onSubmit(values: TrackValues) {
    const { data } = await trackRepair({ variables: { input: values } });
    if (data?.trackRepair) onResult(data.trackRepair);
  }

  return (
    <Card className="w-full flex justify-center">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldSet>
            <FieldGroup>
              <Controller
                name="ticketCode"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="ticketCode">
                      Track by ticket code
                    </FieldLabel>

                    <ButtonGroup>
                      <Input
                        {...field}
                        id="ticketCode"
                        placeholder="REP-000001"
                        aria-invalid={fieldState.invalid}
                      />

                      <Button
                        type="submit"
                        variant="outline"
                        disabled={loading}
                      >
                        {loading ? "Tracking..." : "Track"}
                      </Button>
                    </ButtonGroup>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {errors.root && (
                <p className="text-sm text-destructive">
                  {errors.root.message}
                </p>
              )}
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}

function RepairCard({ repair }: { repair: TrackedRepair }) {
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

export default function FindRepair() {
  const [trackedRepair, setTrackedRepair] = useState<TrackedRepair | null>(
    null,
  );

  return (
    <section
      className="p-4 md:p-8 space-y-4"
      aria-labelledby="find-repair-heading"
    >
      <div className="w-full flex flex-col sm:flex-row gap-4">
        <div className="w-full flex flex-col gap-3">
          <h2
            id="find-repair-heading"
            className="text-4xl font-bold tracking-tight"
          >
            Track
            <br />
            <span className="text-muted-foreground">your repair.</span>
          </h2>

          <p className="max-w-md text-muted-foreground text-lg leading-relaxed">
            Enter your ticket code or email address to find the status of your
            repair.
          </p>
        </div>

        <TrackForm onResult={setTrackedRepair} />
      </div>

      {!trackedRepair ? (
        <Card>
          <CardContent className="grid place-items-center min-h-40">
            <p className="text-sm text-muted-foreground">
              Results will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <RepairCard repair={trackedRepair} />
      )}
    </section>
  );
}
