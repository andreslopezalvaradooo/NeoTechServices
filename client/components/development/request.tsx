"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
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
  Shield01Icon,
  SourceCodeCircleIcon,
  Telephone,
  User,
  Calendar01Icon,
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
import type { CreateDevelopmentMutation } from "@/src/types/__generated__/graphql";
import { Separator } from "../ui/separator";
import { CREATE_DEVELOPMENT } from "@/src/lib/mutations/development";

interface Feature {
  icon: IconSvgElement;
  label: string;
  value: string;
  accent: string;
  color: string;
}

type CreatedRequest = NonNullable<
  CreateDevelopmentMutation["createDevelopment"]
>;

const requestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(10, "Phone must be at least 10 digits."),
  email: z.email("Please enter a valid email."),
  type: z.string().min(1, "Project type is required."),
  budget: z.string().min(1, "Budget range is required."),
  timeline: z.string().min(1, "Timeline is required."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
});

type RequestValues = z.infer<typeof requestSchema>;

const REQUEST_DEFAULT_VALUES: RequestValues = {
  name: "",
  phone: "",
  email: "",
  type: "",
  budget: "",
  timeline: "",
  description: "",
};

const FEATURES = [
  {
    icon: FlashIcon,
    label: "Response time",
    value: "Under 2 hours on business days",
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: Calendar01Icon,
    label: "Free discovery call",
    value: "No commitment required",
    accent: "from-primary/15 to-primary/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Shield01Icon,
    label: "100% code ownership",
    value: "You own everything we build",
    accent: "from-[oklch(0.8_0.13_212)]/15 to-[oklch(0.8_0.13_212)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
] satisfies Feature[];

function FeatureCard({ feature }: { feature: (typeof FEATURES)[number] }) {
  return (
    <li>
      <Card className={`bg-linear-to-br ${feature.accent} h-full md:gap-2`}>
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

function CreatedRequest({
  request,
  onReset,
}: {
  request: CreatedRequest;
  onReset: () => void;
}) {
  return (
    <Card className="bg-linear-to-br from-[oklch(0.52_0.09_223)]/20 to-[oklch(0.52_0.09_223)]/5 p-1 gap-2 md:gap-1">
      <CardHeader className="px-2 [.border-b]:pb-0 border-b border-primary">
        <CardTitle className="flex items-center justify-between">
          <span className="text-primary uppercase tracking-wider">Ticket</span>
          <Badge>{request.ticketCode}</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-2 space-y-1">
        <div>
          <span className="text-xs text-primary font-medium uppercase tracking-wider">
            Contact
          </span>

          <div>
            <span className="flex gap-1 items-center leading-snug text-muted-foreground">
              <HugeiconsIcon icon={User} size={15} aria-hidden />
              Name
            </span>

            <p className="pl-5 font-medium capitalize">{request.name}</p>
          </div>

          <div>
            <span className="flex gap-1 items-center leading-snug text-muted-foreground">
              <HugeiconsIcon icon={Telephone} size={15} aria-hidden />
              Phone
            </span>

            <p className="pl-5 font-medium">{request.phone}</p>
          </div>

          <div>
            <span className="flex gap-1 items-center leading-snug text-muted-foreground">
              <HugeiconsIcon icon={Mail} size={15} aria-hidden />
              Email
            </span>

            <p className="pl-5 font-medium">{request.email}</p>
          </div>
        </div>

        <Separator className="bg-primary" />

        <div>
          <span className="text-xs text-primary font-medium uppercase tracking-wider">
            Project
          </span>

          <div>
            <span className="pl-5 leading-snug text-muted-foreground">
              Type
            </span>

            <p className="pl-5 font-medium">{request.type}</p>
          </div>

          <div>
            <span className="pl-5 leading-snug text-muted-foreground">
              Budget
            </span>

            <p className="pl-5 font-medium">{request.budget}</p>
          </div>

          <div>
            <span className="pl-5 leading-snug text-muted-foreground">
              Timeline
            </span>
            <p className="pl-5 font-medium">{request.timeline}</p>
          </div>
        </div>

        <Separator className="bg-primary" />

        <div>
          <span className="text-xs text-primary font-medium uppercase tracking-wider">
            Description
          </span>

          <p className="pl-5 font-medium">{request.description}</p>
        </div>

        <Separator className="bg-primary" />

        <p className="text-xs text-muted-foreground text-right">
          {new Date(request.createdAt).toLocaleDateString("en-US", {
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
  } = useFormContext<RequestValues>();

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
        Project
      </span>

      <Controller
        name="type"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <FieldLabel htmlFor="type" className="pl-6">
              Project type
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
                    <SelectItem value="Web Application">
                      Web Application
                    </SelectItem>
                    <SelectItem value="Mobile App">Mobile App</SelectItem>
                    <SelectItem value="API / Backend">API / Backend</SelectItem>
                    <SelectItem value="Landing Page">Landing Page</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="SaaS Platform">SaaS Platform</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <FieldError errors={[fieldState.error]} className="pl-6" />
          </Field>
        )}
      />

      <div className="space-y-2 md:space-y-1">
        <Controller
          name="budget"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="budget" className="pl-6">
                Budget range
              </FieldLabel>
              <div className="pl-5">
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="budget"
                    aria-invalid={fieldState.invalid}
                    className="w-full data-[size=default]:h-6"
                  >
                    <SelectValue placeholder="Select a range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Less than $2.000.000">
                        Less than $2.000.000
                      </SelectItem>
                      <SelectItem value="$2.000.000 – $5.000.000">
                        $2.000.000 – $5.000.000
                      </SelectItem>
                      <SelectItem value="$5.000.000 – $15.000.000">
                        $5.000.000 – $15.000.000
                      </SelectItem>
                      <SelectItem value="More than $15.000.000">
                        More than $15.000.000
                      </SelectItem>
                      <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <FieldError errors={[fieldState.error]} className="pl-6" />
            </Field>
          )}
        />

        <Controller
          name="timeline"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="timeline" className="pl-6">
                Timeline
              </FieldLabel>
              <div className="pl-5">
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="timeline"
                    aria-invalid={fieldState.invalid}
                    className="w-full data-[size=default]:h-6"
                  >
                    <SelectValue placeholder="Select a timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ASAP">ASAP</SelectItem>
                      <SelectItem value="1–2 weeks">1–2 weeks</SelectItem>
                      <SelectItem value="1 month">1 month</SelectItem>
                      <SelectItem value="2–3 months">2–3 months</SelectItem>
                      <SelectItem value="No rush">No rush</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <FieldError errors={[fieldState.error]} className="pl-6" />
            </Field>
          )}
        />
      </div>


      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <FieldLabel htmlFor="description">
              <HugeiconsIcon
                icon={MessageSquare}
                size={15}
                className="text-muted-foreground"
                aria-hidden
              />
              Project description
            </FieldLabel>
            <div className="pl-5">
              <Textarea
                {...field}
                id="description"
                className="text-sm min-h-12 resize-none"
                placeholder="Tell us about your project idea, goals, and any technical requirements..."
                aria-invalid={fieldState.invalid}
              />
            </div>
            <FieldError errors={[fieldState.error]} className="pl-6" />
          </Field>
        )}
      />

      <Field className="items-center gap-1">
        {errors.root && (
          <p className="rounded-md bg-destructive/10 px-4 py-2 text-sm text-destructive text-center">
            {errors.root.message}
          </p>
        )}

        <Button type="submit" className="max-w-fit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit project request"}
          <HugeiconsIcon icon={ArrowRight02Icon} aria-hidden />
        </Button>

        <FieldDescription className="text-[10px] text-center">
          By submitting this form you agree to be contacted about your project.
          No spam, ever.
        </FieldDescription>
      </Field>
    </>
  );
}

interface RequestProps extends React.ComponentProps<"section"> {}

export function Request({ className, ...props }: RequestProps) {
  const [request, setRequest] = useState<CreatedRequest | null>(null);
  //   const client = useApolloClient();

  const methods = useForm<RequestValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: REQUEST_DEFAULT_VALUES,
  });

  const [createRequest] = useMutation(CREATE_DEVELOPMENT, {
    onError: (error) => methods.setError("root", { message: error.message }),
    // onCompleted: () => {
    //   client.cache.evict({ fieldName: "getDevelopmentStats" });
    //   client.cache.gc();
    // },
  });

  async function onSubmit(values: RequestValues): Promise<void> {
    const { data } = await createRequest({ variables: { input: values } });
    if (data?.createDevelopment) setRequest(data.createDevelopment);
  }

  return (
    <section
      id="request"
      className={cn("min-h-dvh pt-16", className)}
      aria-labelledby="request-heading"
      {...props}
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 md:flex md:gap-4 space-y-6">
        <div className="w-full space-y-4">
          <Badge className="border-primary/30 bg-primary/5 text-primary">
            Start a project
          </Badge>

          <h2
            id="request-heading"
            className="text-4xl font-bold tracking-tight"
          >
            Tell us about
            <br />
            your <span className="text-primary">idea.</span>
          </h2>

          <p className="max-w-lg text-muted-foreground text-lg leading-relaxed text-justify md:text-left">
            Fill out the form and we'll get back to you within 2 hours to
            schedule a free discovery call. No commitment required.
          </p>

          <ul className="grid gap-4 md:gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-2">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.label} feature={feature} />
            ))}
          </ul>
        </div>

        <div className="w-full grid place-items-center">
          <Card className="w-full max-w-sm md:max-w-md pt-2 pb-2 has-data-[slot=card-footer]:pb-2 gap-2 md:gap-1 shadow-lg">
            <CardHeader className="px-2">
              <CardTitle className="flex md:gap-2 flex-col md:flex-row items-center md:justify-center text-xl font-semibold">
                {request ? (
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
                      icon={SourceCodeCircleIcon}
                      size={35}
                      className="text-primary"
                      aria-hidden
                    />
                    Start a project
                  </>
                )}
              </CardTitle>

              {request && (
                <CardDescription className="text-balance text-center">
                  We'll reach out within 2 hours to schedule your free discovery
                  call. Check your WhatsApp or email.
                </CardDescription>
              )}
            </CardHeader>

            <CardContent className="px-2 py-1">
              {request ? (
                <CreatedRequest
                  request={request}
                  onReset={() => setRequest(null)}
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
