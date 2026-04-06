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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import type {
  TrackRepairQuery,
  FindRepairsByEmailQuery,
} from "@/src/types/__generated__/graphql";
import { FIND_REPAIRS_BY_EMAIL, TRACK_REPAIR } from "@/src/lib/queries/repair";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail, Telephone, User } from "@hugeicons/core-free-icons";
import { ScrollArea } from "@/components/ui/scroll-area";

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
                    className="bg-linear-to-br from-primary/15 to-primary/5"
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
                    className="bg-linear-to-br from-primary/15 to-primary/5"
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
    <Card className="h-full mx-auto max-w-xs md:max-w-2xl p-3 sm:p-2 gap-2 md:gap-1 bg-linear-to-br from-[oklch(0.52_0.09_223)]/20 to-[oklch(0.52_0.09_223)]/5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-primary uppercase tracking-wider">Ticket</span>

          <Badge>{repair.ticketCode}</Badge>
        </CardTitle>
      </CardHeader>

      <Separator className="bg-primary" />

      <CardContent className="flex-1 p-0 space-y-2 md:space-y-1">
        <div className="space-y-2 md:space-y-1 md:flex">
          <div className="w-full space-y-2 md:space-y-1">
            <p className="text-xs text-primary font-medium uppercase tracking-wider">
              Contact
            </p>

            <div className="w-full min-w-0 flex flex-col gap-1 md:text-xs">
              <span className="w-full flex gap-1 items-center leading-snug text-muted-foreground">
                <HugeiconsIcon icon={User} size={15} aria-hidden />
                Name
              </span>

              <p className="w-full pl-5 font-medium wrap-break-word capitalize dark:bg-input/30">
                {repair.name}
              </p>
            </div>

            <div className="w-full min-w-0 flex flex-col gap-1 md:text-xs">
              <span className="w-full flex gap-1 items-center leading-snug text-muted-foreground">
                <HugeiconsIcon icon={Telephone} size={15} aria-hidden="true" />
                Phone
              </span>

              <p className="w-full pl-5 font-medium wrap-break-word dark:bg-input/30">
                {repair.phone}
              </p>
            </div>

            <div className="w-full min-w-0 flex flex-col gap-1 md:text-xs">
              <span className="w-full flex gap-1 items-center leading-snug text-muted-foreground">
                <HugeiconsIcon icon={Mail} size={15} aria-hidden="true" />
                Email
              </span>

              <p className="w-full pl-5 font-medium wrap-break-word dark:bg-input/30">
                {repair.email}
              </p>
            </div>
          </div>

          <Separator className="bg-primary md:hidden" />

          <div className="w-full space-y-2 md:space-y-1">
            <p className="text-xs text-primary font-medium uppercase tracking-wider">
              Device
            </p>

            <div className="flex gap-2 md:flex-col md:gap-1">
              <div className="w-full min-w-0 flex flex-col gap-1 md:text-xs">
                <span className="w-full pl-5 leading-snug text-muted-foreground">
                  Type
                </span>

                <p className="w-full pl-5 font-medium wrap-break-word dark:bg-input/30">
                  {repair.type}
                </p>
              </div>

              <div className="w-full min-w-0 flex flex-col gap-1 md:text-xs">
                <span className="w-full pl-5 leading-snug text-muted-foreground">
                  Brand
                </span>

                <p className="w-full pl-5 font-medium wrap-break-word capitalize dark:bg-input/30">
                  {repair.brand}
                </p>
              </div>
            </div>

            <div className="w-full min-w-0 flex flex-col gap-1 md:text-xs">
              <span className="w-full pl-5 leading-snug text-muted-foreground">
                Model
              </span>

              <p className="w-full pl-5 font-medium wrap-break-word dark:bg-input/30">
                {repair.model}
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-primary" />

        <div className="space-y-2 md:space-y-1 md:text-xs">
          <p className="text-xs text-primary font-medium uppercase tracking-wider">
            Problem
          </p>

          <div className="flex gap-2">
            <span className="pl-5 leading-snug text-muted-foreground">
              Issue
            </span>

            <p className="font-medium wrap-break-word dark:bg-input/30">
              {repair.issue}
            </p>
          </div>

          <span className="w-full pl-5 leading-snug text-muted-foreground">
            Description
          </span>

          <p className="pl-5 font-medium leading-relaxed">{repair.problem}</p>
        </div>
      </CardContent>

      <CardFooter className="bg-transparent md:p-2 border-primary text-xs text-muted-foreground justify-end">
        {new Date(repair.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </CardFooter>
    </Card>
  );
}

function FoundRepairsResult({ repairs }: { repairs: FoundRepairs }) {
  if (repairs.length === 1) return <RepairCard repair={repairs[0]} />;

  return (
    <div className="flex justify-center">
      <ScrollArea className="md:h-90 md:p-1 md:pr-2.5 md:border rounded-xl">
        <ul className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {repairs.map((repair) => (
            <li key={repair.ticketCode}>
              <RepairCard repair={repair} />
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
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
    <section
      className="min-h-[calc(100dvh-64px)]"
      aria-labelledby="find-heading"
    >
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

          <Card className="w-full md:py-2 bg-linear-to-br from-primary/15 to-primary/5">
            <CardContent className="md:px-2 flex flex-col sm:flex-row md:flex-col gap-4 sm:gap-6 md:gap-2">
              <div className="w-full flex flex-col gap-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  By ticket code
                </p>

                <TrackForm onResult={handleTrack} />
              </div>

              <Separator className="bg-primary sm:hidden md:block" />

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
          <FoundRepairsResult repairs={foundRepairs} />
        )}
      </div>
    </section>
  );
}
