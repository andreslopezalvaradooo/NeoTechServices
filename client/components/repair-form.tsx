"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/src/lib/utils";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "./ui/field";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const repairSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .min(2, "Name must be at least 2 characters."),
  phone: z
    .number()
    .min(1, "Phone is required.")
    .min(10, "Phone must be at least 10 digits."),
  email: z.email("Please enter a valid email."),
  type: z.string(),
  brand: z
    .string()
    .min(1, "Brand is required.")
    .min(2, "Brand must be at least 2 characters."),
  model: z
    .string()
    .min(1, "Model is required.")
    .min(3, "Model must be at least 3 characters."),
  issue: z.string(),
  problem: z
    .string()
    .min(1, "Problem is required.")
    .min(5, "Problem must be at least 5 characters."),
});

type RepairValues = z.infer<typeof repairSchema>;
interface RepairFormProps extends React.ComponentProps<"div"> {}

export function RepairForm({ className, ...props }: RepairFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<RepairValues>({
    resolver: zodResolver(repairSchema),
    defaultValues: {
      name: "",
      phone: 3000000000,
      email: "",
      type: "",
      brand: "",
      model: "",
      issue: "",
      problem: "",
    },
  });

  async function onSubmit(values: RepairValues): Promise<void> {
    // connect to my backend
    setSubmitted(true);
  }

  return (
    <section
      id="request"
      className={cn("py-22 bg-background", className)}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          <div className="flex flex-col gap-6">
            <Badge>Request a repair</Badge>

            <h2 className="text-4xl font-bold tracking-tight">
              Tell us about
              <br />
              your device.
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Fill out the form and we'll get back to you in less than 1 hour
              with a free diagnostic appointment. No commitment required.
            </p>

            {/* Info cards */}
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: "⚡",
                  label: "Response time",
                  value: "Under 1 hour on business days",
                },
                {
                  icon: "🔍",
                  label: "Free diagnostic",
                  value: "No cost, no obligation",
                },
                {
                  icon: "🛡️",
                  label: "3-month warranty",
                  value: "On every completed repair",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-xl border border-border bg-muted/20 px-4 py-3"
                >
                  <span className="text-xl" role="img" aria-label={item.label}>
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <Card>
            <CardContent className="p-6">
              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    size={48}
                    className="text-emerald-500"
                  />

                  <h3 className="text-xl font-semibold">Request received!</h3>

                  <p className="text-muted-foreground text-sm max-w-xs">
                    We'll reach out within 1 hour to confirm your diagnostic
                    appointment. Check your WhatsApp or email.
                  </p>

                  <Button onClick={() => setSubmitted(false)}>
                    Submit another request
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                >
                  <FieldGroup>
                    <p className="text-2xl font-bold text-center">
                      Request a repair
                    </p>

                    <FieldSet>
                      <FieldGroup>
                        <FieldLegend>Your info</FieldLegend>

                        <div className="flex gap-2">
                          <Controller
                            name="name"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="name">Name</FieldLabel>

                                <Input
                                  {...field}
                                  id="name"
                                  placeholder="John Doe"
                                  aria-invalid={fieldState.invalid}
                                />

                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />

                          <Controller
                            name="phone"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="phone">Phone</FieldLabel>

                                <Input
                                  {...field}
                                  id="phone"
                                  type="tel"
                                  placeholder="3000000000"
                                  aria-invalid={fieldState.invalid}
                                />

                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </div>

                        <Controller
                          name="email"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="email">Email</FieldLabel>

                              <Input
                                {...field}
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                aria-invalid={fieldState.invalid}
                              />

                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </FieldGroup>
                    </FieldSet>

                    <FieldSeparator />

                    <FieldSet>
                      <FieldGroup>
                        <FieldLegend>Device info</FieldLegend>

                        <div className="flex gap-2">
                          <Controller
                            name="type"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="type">
                                  Device type
                                </FieldLabel>

                                <Select>
                                  <SelectTrigger
                                    {...field}
                                    id="type"
                                    aria-invalid={fieldState.invalid}
                                  >
                                    <SelectValue placeholder="Select a type" />
                                  </SelectTrigger>

                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="laptop">
                                        Laptop
                                      </SelectItem>
                                      <SelectItem value="desktop">
                                        Desktop PC
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>

                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />

                          <Controller
                            name="brand"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="brand">Brand</FieldLabel>

                                <Input
                                  {...field}
                                  id="brand"
                                  placeholder="e.g. Apple, Dell, HP"
                                  aria-invalid={fieldState.invalid}
                                />

                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </div>

                        <Controller
                          name="model"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="model">Model</FieldLabel>

                              <Input
                                {...field}
                                id="model"
                                placeholder='e.g. MacBook Pro 14", XPS 15'
                                aria-invalid={fieldState.invalid}
                              />

                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </FieldGroup>
                    </FieldSet>

                    <FieldSeparator />

                    <FieldSet>
                      <FieldGroup>
                        <FieldLegend>Issue</FieldLegend>

                        <Controller
                          name="issue"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="issue">
                                Type of issue
                              </FieldLabel>

                              <Select>
                                <SelectTrigger
                                  {...field}
                                  id="issue"
                                  aria-invalid={fieldState.invalid}
                                >
                                  <SelectValue placeholder="Select an issue" />
                                </SelectTrigger>

                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="screen">
                                      Screen / display
                                    </SelectItem>
                                    <SelectItem value="keyboard">
                                      Keyboard
                                    </SelectItem>
                                    <SelectItem value="battery">
                                      Battery
                                    </SelectItem>
                                    <SelectItem value="liquid">
                                      Liquid damage
                                    </SelectItem>
                                    <SelectItem value="charging">
                                      Charging port
                                    </SelectItem>
                                    <SelectItem value="performance">
                                      Slow / overheating
                                    </SelectItem>
                                    <SelectItem value="os">
                                      OS / software
                                    </SelectItem>
                                    <SelectItem value="data">
                                      Data recovery
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>

                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />

                        <Controller
                          name="problem"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="problem">
                                Describe the problem
                              </FieldLabel>

                              <Textarea
                                {...field}
                                id="problem"
                                className="resize-none"
                                placeholder="Tell us what's happening with your device..."
                                aria-invalid={fieldState.invalid}
                              />

                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </FieldGroup>
                    </FieldSet>

                    <Field>
                      <Button type="submit">
                        Submit repair request
                        <HugeiconsIcon icon={ArrowRight02Icon} />
                      </Button>

                      <p className="text-[10px] text-center text-muted-foreground">
                        By submitting this form you agree to be contacted
                        regarding your repair request. No spam, ever.
                      </p>
                    </Field>
                  </FieldGroup>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
