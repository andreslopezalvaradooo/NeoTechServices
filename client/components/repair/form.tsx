"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
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
import type { IconSvgElement } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
  FlashIcon,
  Search,
  Search01Icon,
  Shield01Icon,
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
} from "../ui/field";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { CREATE_REPAIR } from "@/src/lib/mutations/repair";
import type { CreateRepairMutation } from "@/src/types/__generated__/graphql";
import { Separator } from "../ui/separator";
import Link from "next/link";

interface Feature {
  icon: IconSvgElement;
  label: string;
  value: string;
}

type CreatedRepair = NonNullable<CreateRepairMutation["createRepair"]>;

const repairSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(10, "Phone must be at least 10 digits."),
  email: z.email("Please enter a valid email."),
  type: z.string().min(1, "Device type is required."),
  brand: z.string().min(2, "Brand must be at least 2 characters."),
  model: z.string().min(3, "Model must be at least 3 characters."),
  issue: z.string().min(1, "Issue type is required."),
  problem: z.string().min(5, "Problem must be at least 5 characters."),
});

type RepairValues = z.infer<typeof repairSchema>;

const REPAIR_DEFAULT_VALUES: RepairValues = {
  name: "",
  phone: "",
  email: "",
  type: "",
  brand: "",
  model: "",
  issue: "",
  problem: "",
};

const FEATURES = [
  {
    icon: FlashIcon,
    label: "Response time",
    value: "Under 1 hour on business days",
  },
  {
    icon: Search01Icon,
    label: "Free diagnostic",
    value: "No cost, no obligation",
  },
  {
    icon: Shield01Icon,
    label: "3-month warranty",
    value: "On every completed repair",
  },
] satisfies Feature[];

function FeatureCard({ feature }: { feature: (typeof FEATURES)[number] }) {
  return (
    <li>
      <Card className="h-full bg-muted/20 border border-border">
        <CardContent className="flex flex-col gap-4">
          <span className="text-xl" role="img" aria-label={feature.label}>
            <HugeiconsIcon icon={feature.icon} strokeWidth={2} aria-hidden />
          </span>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {feature.label}
          </p>
          <p className="text-sm font-medium">{feature.value}</p>
        </CardContent>
      </Card>
    </li>
  );
}

function CreatedRepair({
  repair,
  onReset,
}: {
  repair: CreatedRepair;
  onReset: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col items-center text-xl font-semibold">
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            size={48}
            className="text-emerald-500"
            aria-hidden
          />
          Request received!
        </CardTitle>

        <CardDescription className="text-center">
          We'll reach out within 1 hour to confirm your diagnostic appointment.
          Check your WhatsApp or email.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Ticket
          </span>

          <Badge>{repair.ticketCode}</Badge>
        </div>

        <Separator />

        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 sm:justify-between">
          <div className="w-full flex flex-col gap-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Contact
            </p>

            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{repair.name}</span>
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{repair.phone}</span>
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{repair.email}</span>
            </div>
          </div>

          <Separator className="sm:hidden md:block lg:hidden" />

          <div className="w-full flex flex-col gap-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Device
            </p>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium capitalize">{repair.type}</span>
              <span className="text-muted-foreground">Brand</span>
              <span className="font-medium">{repair.brand}</span>
              <span className="text-muted-foreground">Model</span>
              <span className="font-medium">{repair.model}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Problem
          </p>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
            <span className="text-muted-foreground">Issue</span>
            <span className="font-medium capitalize">{repair.issue}</span>
            <span className="text-muted-foreground">Problem</span>
            <p className="font-medium leading-relaxed">{repair.problem}</p>
          </div>
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

      <CardFooter className="justify-center">
        <Button onClick={onReset}>Submit another request</Button>
      </CardFooter>
    </Card>
  );
}

function FormFields() {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<RepairValues>();

  return (
    <FieldGroup>
      <h3 className="text-2xl font-bold text-center">Request a repair</h3>

      <FieldSet>
        <FieldGroup>
          <FieldLegend>Your info</FieldLegend>

          <div className="flex md:flex-col gap-5 lg:flex-row">
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

          <div className="flex md:flex-col gap-5 lg:flex-row">
            <Controller
              name="type"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="type">Device type</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="type" aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="laptop">Laptop</SelectItem>
                        <SelectItem value="desktop">Desktop PC</SelectItem>
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
                <FieldLabel htmlFor="issue">Type of issue</FieldLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="issue" aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Select an issue" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="screen">Screen / display</SelectItem>
                      <SelectItem value="keyboard">Keyboard</SelectItem>
                      <SelectItem value="battery">Battery</SelectItem>
                      <SelectItem value="liquid">Liquid damage</SelectItem>
                      <SelectItem value="charging">Charging port</SelectItem>
                      <SelectItem value="performance">
                        Slow / overheating
                      </SelectItem>
                      <SelectItem value="os">OS / software</SelectItem>
                      <SelectItem value="data">Data recovery</SelectItem>
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
                <FieldLabel htmlFor="problem">Describe the problem</FieldLabel>

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

      <Field className="items-center">
        {errors.root && (
          <p className="text-sm text-destructive text-center">
            {errors.root.message}
          </p>
        )}

        <Button type="submit" className="max-w-fit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit repair request"}
          <HugeiconsIcon icon={ArrowRight02Icon} aria-hidden />
        </Button>

        <p className="text-[10px] text-center text-muted-foreground">
          By submitting this form you agree to be contacted regarding your
          repair request. No spam, ever.
        </p>
      </Field>
    </FieldGroup>
  );
}

interface RepairFormProps extends React.ComponentProps<"section"> {}

export function RepairForm({ className, ...props }: RepairFormProps) {
  const [repair, setRepair] = useState<CreatedRepair | null>(null);
  const client = useApolloClient();

  const methods = useForm<RepairValues>({
    resolver: zodResolver(repairSchema),
    defaultValues: REPAIR_DEFAULT_VALUES,
  });

  const [createRepair] = useMutation(CREATE_REPAIR, {
    onError: (error) => methods.setError("root", { message: error.message }),
    onCompleted: () => {
      client.cache.evict({ fieldName: "getRepairStats" });
      client.cache.gc();
    },
  });

  async function onSubmit(values: RepairValues): Promise<void> {
    const { data } = await createRepair({ variables: { input: values } });
    if (data?.createRepair) setRepair(data.createRepair);
  }

  return (
    <section
      id="request"
      className={cn(
        "bg-background mx-auto max-w-6xl pt-20 lg:pt-24 pb-4 lg:pb-8 px-4 lg:px-8 grid gap-16 md:grid-cols-2",
        className,
      )}
      aria-labelledby="request-heading"
      {...props}
    >
      <div className="flex flex-col gap-6">
        <Badge>Request a repair</Badge>

        <h2 id="request-heading" className="text-4xl font-bold tracking-tight">
          Tell us about
          <br />
          your device.
        </h2>

        <p className="max-w-lg text-muted-foreground text-lg leading-relaxed text-justify lg:text-left">
          Fill out the form and we'll get back to you in less than 1 hour with a
          free diagnostic appointment. No commitment required.
        </p>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.label} feature={feature} />
          ))}
        </ul>

        <Link href="/repair/find" className={cn(buttonVariants(), "w-fit")}>
          Track repair <HugeiconsIcon icon={Search} strokeWidth={2} />
        </Link>
      </div>

      <Card>
        <CardContent>
          {repair ? (
            <CreatedRepair repair={repair} onReset={() => setRepair(null)} />
          ) : (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                <FormFields />
              </form>
            </FormProvider>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
