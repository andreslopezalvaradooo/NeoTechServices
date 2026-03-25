"use client";

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
import { TRACK_REPAIR } from "@/src/lib/queries/repair";
import { useLazyQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const trackSchema = z.object({
  ticketCode: z
    .string()
    .min(1, "Ticket code is required")
    .regex(/^REP-\d{6}$/, "Format must be REP-XXXXXX"),
});

type TrackValues = z.infer<typeof trackSchema>;

export function TrackForm() {
  const router = useRouter();
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

    if (data?.trackRepair)
      router.push(`/dashboard/track/${data.trackRepair.ticketCode}`);
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
