"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLazyQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import type {
  TrackRepairQuery,
  FindRepairsByEmailQuery,
} from "@/src/types/__generated__/graphql";
import { FIND_REPAIRS_BY_EMAIL, TRACK_REPAIR } from "@/src/lib/queries/repair";

const trackSchema = z.object({
  ticketCode: z
    .string()
    .min(1, "Ticket code is required")
    .regex(/^REP-\d{6}$/, "Format must be REP-XXXXXX"),
});

const findSchema = z.object({
  email: z.email("Please enter a valid email"),
});

type TrackValues = z.infer<typeof trackSchema>;
type FindValues = z.infer<typeof findSchema>;

type TrackedRepair = NonNullable<TrackRepairQuery["trackRepair"]>;
type FoundRepairs = NonNullable<FindRepairsByEmailQuery["findRepairsByEmail"]>;

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
                  <Button type="submit" variant="outline" disabled={loading}>
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
            <p className="text-sm text-destructive">{errors.root.message}</p>
          )}
        </FieldGroup>
      </FieldSet>
    </form>
  );
}

function FindForm({ onResult }: { onResult: (r: FoundRepairs) => void }) {
  const [findRepairsByEmail, { loading, error }] = useLazyQuery(
    FIND_REPAIRS_BY_EMAIL,
  );

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FindValues>({
    resolver: zodResolver(findSchema),
    defaultValues: { email: "" },
  });

  useEffect(() => {
    if (error) setError("root", { message: error.message });
    else clearErrors("root");
  }, [error, setError, clearErrors]);

  async function onSubmit(values: FindValues) {
    const { data } = await findRepairsByEmail({ variables: { input: values } });
    if (data?.findRepairsByEmail) onResult(data.findRepairsByEmail);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldSet>
        <FieldGroup>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Find by email</FieldLabel>
                <ButtonGroup>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    aria-invalid={fieldState.invalid}
                  />
                  <Button type="submit" variant="outline" disabled={loading}>
                    {loading ? "Finding..." : "Find"}
                  </Button>
                </ButtonGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {errors.root && (
            <p className="text-sm text-destructive">{errors.root.message}</p>
          )}
        </FieldGroup>
      </FieldSet>
    </form>
  );
}

function RepairCard({ repair }: { repair: TrackedRepair }) {
  return (
    <Card className="max-w-sm mx-auto">
      <CardContent className="flex flex-col gap-4">
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
  const [foundRepairs, setFoundRepairs] = useState<FoundRepairs | null>(null);

  function handleTrack(repair: TrackedRepair) {
    setFoundRepairs(null);
    setTrackedRepair(repair);
  }

  function handleFind(repairs: FoundRepairs) {
    setTrackedRepair(null);
    setFoundRepairs(repairs);
  }

  const hasResults = trackedRepair || (foundRepairs && foundRepairs.length > 0);

  return (
    <section className="min-h-dvh" aria-labelledby="find-heading">
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full space-y-4">
            <h1 id="find-heading" className="text-4xl font-bold tracking-tight">
              Track
              <br />
              <span className="text-primary">your repair.</span>
            </h1>

            <p className="max-w-md text-muted-foreground text-lg leading-relaxed">
              Enter your ticket code or email address to find the status of your
              repair.
            </p>
          </div>

          <Card className="w-full">
            <CardContent className="flex flex-col sm:flex-row md:flex-col gap-4 sm:gap-6 md:gap-4">
              <div className="w-full flex flex-col gap-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  By ticket code
                </p>

                <TrackForm onResult={handleTrack} />
              </div>

              <Separator className="sm:hidden md:block" />

              <div className="w-full flex flex-col gap-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  By email
                </p>

                <FindForm onResult={handleFind} />
              </div>
            </CardContent>
          </Card>
        </div>

        {!hasResults && (
          <Card>
            <CardContent className="h-36 sm:h-60 md:h-72 flex items-center justify-center text-muted-foreground">
              There are not results
            </CardContent>
          </Card>
        )}

        {trackedRepair && <RepairCard repair={trackedRepair} />}

        {foundRepairs && foundRepairs.length > 0 && (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {foundRepairs.map((r) => (
              <li key={r.ticketCode}>
                <RepairCard repair={r} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
