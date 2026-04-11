"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Mail,
  MessageSquare,
  Search,
  Search01Icon,
  Shield01Icon,
  Telephone,
  Tools,
  User,
} from "@hugeicons/core-free-icons";
import { cn } from "@/src/lib/utils";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
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
  accent: string;
  color: string;
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
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: Search01Icon,
    label: "Free diagnostic",
    value: "No cost, no obligation",
    accent: "from-primary/15 to-primary/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Shield01Icon,
    label: "3-month warranty",
    value: "On every completed repair",
    accent: "from-[oklch(0.8_0.13_212)]/15 to-[oklch(0.8_0.13_212)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
] satisfies Feature[];

function FeatureCard({ feature }: { feature: (typeof FEATURES)[number] }) {
  return (
    <li>
      <Card
        className={`h-full md:py-2 lg:py-4 md:gap-2 lg:gap-4 bg-linear-to-br ${feature.accent}`}
      >
        <CardHeader className="flex flex-col items-center text-center">
          <div
            aria-hidden
            className={`h-10 w-10 flex items-center justify-center rounded-xl ${feature.color}`}
          >
            <HugeiconsIcon icon={feature.icon} aria-hidden />
          </div>

          <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">
            {feature.label}
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center font-medium">
          {feature.value}
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
    <Card className="p-1 gap-2 md:gap-1 bg-linear-to-br from-[oklch(0.52_0.09_223)]/20 to-[oklch(0.52_0.09_223)]/5">
      <CardHeader className="px-2 [.border-b]:pb-0 border-b border-primary">
        <CardTitle className="flex items-center justify-between">
          <span className="text-primary uppercase tracking-wider">Ticket</span>
          <Badge>{repair.ticketCode}</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-2 space-y-1">
        <div>
          <div>
            <span className="text-xs text-primary font-medium uppercase tracking-wider">
              Contact
            </span>

            <div>
              <span className="flex gap-1 items-center leading-snug text-muted-foreground">
                <HugeiconsIcon icon={User} size={15} aria-hidden />
                Name
              </span>

              <p className="pl-5 font-medium capitalize">{repair.name}</p>
            </div>

            <div>
              <span className="flex gap-1 items-center leading-snug text-muted-foreground">
                <HugeiconsIcon icon={Telephone} size={15} aria-hidden />
                Phone
              </span>

              <p className="pl-5 font-medium">{repair.phone}</p>
            </div>

            <div>
              <span className="flex gap-1 items-center leading-snug text-muted-foreground">
                <HugeiconsIcon icon={Mail} size={15} aria-hidden />
                Email
              </span>

              <p className="pl-5 font-medium">{repair.email}</p>
            </div>
          </div>

          <Separator className="bg-primary" />

          <div>
            <span className="text-xs text-primary font-medium uppercase tracking-wider">
              Device
            </span>

            <div className="flex">
              <div className="w-full">
                <span className="pl-5 leading-snug text-muted-foreground">
                  Type
                </span>

                <p className="pl-5 font-medium">{repair.type}</p>
              </div>

              <div className="w-full">
                <span className="pl-5 leading-snug text-muted-foreground">
                  Brand
                </span>

                <p className="pl-5 font-medium capitalize">{repair.brand}</p>
              </div>
            </div>

            <div>
              <span className="pl-5 leading-snug text-muted-foreground">
                Model
              </span>

              <p className="pl-5 font-medium">{repair.model}</p>
            </div>
          </div>
        </div>

        <Separator className="bg-primary" />

        <div>
          <span className="text-xs text-primary font-medium uppercase tracking-wider">
            Problem
          </span>

          <div className="flex gap-2">
            <span className="pl-5 leading-snug text-muted-foreground">
              Issue
            </span>

            <p className="font-medium">{repair.issue}</p>
          </div>

          <span className="pl-5 leading-snug text-muted-foreground">
            Description
          </span>

          <p className="pl-5 font-medium">{repair.problem}</p>
        </div>

        <Separator className="bg-primary" />

        <p className="text-xs text-muted-foreground text-right">
          {new Date(repair.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </CardContent>

      <CardFooter className="bg-transparent md:py-1 border-primary justify-center">
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
    <>
      <span className="md:hidden text-xs text-muted-foreground font-medium uppercase tracking-wider">
        Contact
      </span>

      <div className="space-y-2 md:space-y-1">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <div className="space-y-1">
                <FieldLabel htmlFor="name">
                  <HugeiconsIcon
                    icon={User}
                    size={15}
                    className="text-muted-foreground"
                    aria-hidden
                  />
                  Name
                </FieldLabel>

                <div className="pl-5">
                  <Input
                    {...field}
                    id="name"
                    placeholder="John Doe"
                    aria-invalid={fieldState.invalid}
                    className="h-6 text-sm"
                  />
                </div>
              </div>

              <FieldError errors={[fieldState.error]} className="pl-6" />
            </Field>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <div className="space-y-1">
                <FieldLabel htmlFor="phone">
                  <HugeiconsIcon
                    icon={Telephone}
                    size={15}
                    className="text-muted-foreground"
                    aria-hidden
                  />
                  Phone
                </FieldLabel>

                <div className="pl-5">
                  <Input
                    {...field}
                    id="phone"
                    type="tel"
                    placeholder="3000000000"
                    aria-invalid={fieldState.invalid}
                    className="h-6 text-sm"
                  />
                </div>
              </div>

              <FieldError errors={[fieldState.error]} className="pl-6" />
            </Field>
          )}
        />
      </div>

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <div className="space-y-1">
              <FieldLabel htmlFor="email">
                <HugeiconsIcon
                  icon={Mail}
                  size={15}
                  className="text-muted-foreground"
                  aria-hidden
                />
                Email
              </FieldLabel>

              <div className="pl-5">
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  aria-invalid={fieldState.invalid}
                  className="h-6 text-sm"
                />
              </div>
            </div>

            <FieldError errors={[fieldState.error]} className="pl-6" />
          </Field>
        )}
      />

      <FieldSeparator className="md:hidden lg:block" />

      <span className="md:hidden text-xs text-muted-foreground font-medium uppercase tracking-wider">
        Device
      </span>

      <div className="space-y-2 md:space-y-1">
        <Controller
          name="type"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="type" className="pl-6">
                Device type
              </FieldLabel>

              <div className="pl-5">
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="type"
                    aria-invalid={fieldState.invalid}
                    className="w-full data-[size=default]:h-6"
                  >
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Laptop">Laptop</SelectItem>
                      <SelectItem value="Desktop PC">Desktop PC</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <FieldError errors={[fieldState.error]} className="pl-6" />
            </Field>
          )}
        />

        <Controller
          name="brand"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <div className="space-y-1">
                <FieldLabel htmlFor="brand" className="pl-6">
                  Brand
                </FieldLabel>

                <div className="pl-5">
                  <Input
                    {...field}
                    id="brand"
                    placeholder="e.g. Apple, Dell, HP"
                    aria-invalid={fieldState.invalid}
                    className="h-6 text-sm"
                  />
                </div>
              </div>

              <FieldError errors={[fieldState.error]} className="pl-6" />
            </Field>
          )}
        />
      </div>

      <Controller
        name="model"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <div className="space-y-1">
              <FieldLabel htmlFor="model" className="pl-6">
                Model
              </FieldLabel>

              <div className="pl-5">
                <Input
                  {...field}
                  id="model"
                  placeholder='e.g. MacBook Pro 14", XPS 15'
                  aria-invalid={fieldState.invalid}
                  className="h-6 text-sm"
                />
              </div>
            </div>

            <FieldError errors={[fieldState.error]} className="pl-6" />
          </Field>
        )}
      />

      <FieldSeparator className="md:hidden lg:block" />

      <span className="md:hidden text-xs text-muted-foreground font-medium uppercase tracking-wider">
        Problem
      </span>

      <Controller
        name="issue"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <FieldLabel htmlFor="issue" className="pl-6">
              Type of issue
            </FieldLabel>

            <div className="pl-5">
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="issue"
                  aria-invalid={fieldState.invalid}
                  className="w-full data-[size=default]:h-6"
                >
                  <SelectValue placeholder="Select an issue" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Screen / Display">
                      Screen / Display
                    </SelectItem>
                    <SelectItem value="Keyboard">Keyboard</SelectItem>
                    <SelectItem value="Battery">Battery</SelectItem>
                    <SelectItem value="Liquid damage">Liquid damage</SelectItem>
                    <SelectItem value="Charging port">Charging port</SelectItem>
                    <SelectItem value="Slow / Overheating">
                      Slow / Overheating
                    </SelectItem>
                    <SelectItem value="OS / Software">OS / Software</SelectItem>
                    <SelectItem value="Data recovery">Data recovery</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <FieldError errors={[fieldState.error]} className="pl-6" />
          </Field>
        )}
      />

      <Controller
        name="problem"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <FieldLabel htmlFor="problem">
              <HugeiconsIcon
                icon={MessageSquare}
                size={15}
                className="text-muted-foreground"
                aria-hidden
              />
              Describe the problem
            </FieldLabel>

            <div className="pl-5">
              <Textarea
                {...field}
                id="problem"
                className="text-sm min-h-12 resize-none"
                placeholder="Tell us what's happening with your device..."
                aria-invalid={fieldState.invalid}
              />
            </div>

            <FieldError errors={[fieldState.error]} className="pl-6" />
          </Field>
        )}
      />

      <Field className="items-center gap-1">
        {errors.root && (
          <p className="rounded-md bg-destructive/10 px-4 py-2 text-sm text-destructive text-center focus:outline-none">
            {errors.root.message}
          </p>
        )}

        <Button type="submit" className="max-w-fit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit repair request"}
          <HugeiconsIcon icon={ArrowRight02Icon} aria-hidden />
        </Button>

        <FieldDescription className="text-[10px] text-center">
          By submitting this form you agree to be contacted regarding your
          repair request. No spam, ever.
        </FieldDescription>
      </Field>
    </>
  );
}

interface RepairFormProps extends React.ComponentProps<"section"> {}

export function Request({ className, ...props }: RepairFormProps) {
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
      className={cn("min-h-dvh pt-16", className)}
      aria-labelledby="request-heading"
      {...props}
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 md:flex md:gap-4 space-y-4">
        <div className="w-full space-y-4">
          <Badge className="border-primary/30 bg-primary/5 text-primary">
            Request a repair
          </Badge>

          <h2
            id="request-heading"
            className="text-4xl font-bold tracking-tight"
          >
            Tell us about
            <br />
            your <span className="text-primary">device.</span>
          </h2>

          <p className="max-w-lg text-muted-foreground text-lg leading-relaxed text-justify lg:text-left">
            Fill out the form and we'll get back to you in less than 1 hour with
            a free diagnostic appointment. No commitment required.
          </p>

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-3 md:gap-2">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.label} feature={feature} />
            ))}
          </ul>

          <Button asChild>
            <Link href="/repair/find">
              Track repair <HugeiconsIcon icon={Search} strokeWidth={2} />
            </Link>
          </Button>
        </div>

        <div className="w-full grid place-items-center">
          <Card className="w-full max-w-sm md:max-w-md pt-2 pb-2 has-data-[slot=card-footer]:pb-2 gap-2 md:gap-1 shadow-lg">
            <CardHeader className="px-2">
              <CardTitle className="flex md:gap-2 flex-col md:flex-row items-center md:justify-center text-xl font-semibold">
                {repair ? (
                  <>
                    <HugeiconsIcon
                      icon={CheckmarkCircle02Icon}
                      size={35}
                      className="text-emerald-500"
                      aria-hidden
                    />
                    Request received!
                  </>
                ) : (
                  <>
                    <HugeiconsIcon
                      icon={Tools}
                      size={35}
                      className="text-primary"
                      aria-hidden
                    />
                    Request a repair
                  </>
                )}
              </CardTitle>

              {repair && (
                <CardDescription className="text-balance text-center">
                  We'll reach out within 1 hour to confirm your diagnostic
                  appointment. Check your WhatsApp or email.
                </CardDescription>
              )}
            </CardHeader>

            <CardContent className="px-2 py-1">
              {repair ? (
                <CreatedRepair
                  repair={repair}
                  onReset={() => setRepair(null)}
                />
              ) : (
                <FormProvider {...methods}>
                  <Card className="p-1">
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                      <FieldGroup className="gap-2 md:gap-1">
                        <FormFields />
                      </FieldGroup>
                    </form>
                  </Card>
                </FormProvider>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
