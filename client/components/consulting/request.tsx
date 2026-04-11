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
import {
  CheckCircle,
  Mail,
  Building,
  User,
  MessageSquare,
  CheckmarkCircle02Icon,
  Telephone,
  ArrowRight02Icon,
  MentoringIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { CREATE_CONSULTING } from "@/src/lib/mutations/consulting";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { CreateConsultingMutation } from "@/src/types/__generated__/graphql";
import { Separator } from "../ui/separator";

type CreatedConsulting = NonNullable<
  CreateConsultingMutation["createConsulting"]
>;

const consultingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().min(2, "Company must be at least 2 characters."),
  phone: z.string().min(10, "Phone must be at least 10 digits."),
  email: z.email("Please enter a valid email."),
  service: z.string().min(1, "Service of interest is required."),
  size: z.string().min(1, "Company size is required."),
  challenge: z.string().min(5, "Main challenge must be at least 5 characters."),
});

type ConsultingValues = z.infer<typeof consultingSchema>;

const CONSULTING_DEFAULT_VALUES: ConsultingValues = {
  name: "",
  company: "",
  phone: "",
  email: "",
  service: "",
  size: "",
  challenge: "",
};

const BENEFITS = [
  "Free 30-min discovery call",
  "No commitment required",
  "Senior consultant assigned",
  "Response within 1 business day",
] as const;

const SERVICES = [
  "Software Architecture",
  "Digital Transformation",
  "Technology Audit",
  "IT & Product Strategy",
  "Not sure yet",
] as const;

const SIZES = [
  "Solo / Freelancer",
  "2–10 employees",
  "11–50 employees",
  "51–200 employees",
  "200+ employees",
] as const;

function CreatedConsulting({
  consulting,
  onReset,
}: {
  consulting: CreatedConsulting;
  onReset: () => void;
}) {
  return (
    <Card className="p-1 gap-2 md:gap-1 bg-linear-to-br from-[oklch(0.52_0.09_223)]/20 to-[oklch(0.52_0.09_223)]/5">
      <CardHeader className="px-2 [.border-b]:pb-0 border-b border-primary">
        <CardTitle className="flex items-center justify-between">
          <span className="text-primary uppercase tracking-wider">Ticket</span>
          <Badge>{consulting.ticketCode}</Badge>
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

            <p className="pl-5 font-medium capitalize">{consulting.name}</p>
          </div>

          <div>
            <span className="flex gap-1 items-center leading-snug text-muted-foreground">
              <HugeiconsIcon icon={Building} size={15} aria-hidden />
              Company
            </span>

            <p className="pl-5 font-medium capitalize">{consulting.company}</p>
          </div>

          <div>
            <span className="flex gap-1 items-center leading-snug text-muted-foreground">
              <HugeiconsIcon icon={Telephone} size={15} aria-hidden />
              Work phone
            </span>

            <p className="pl-5 font-medium">{consulting.phone}</p>
          </div>

          <div>
            <span className="flex gap-1 items-center leading-snug text-muted-foreground">
              <HugeiconsIcon icon={Mail} size={15} aria-hidden />
              Work email
            </span>

            <p className="pl-5 font-medium">{consulting.email}</p>
          </div>
        </div>

        <Separator className="bg-primary" />

        <div>
          <span className="text-xs text-primary font-medium uppercase tracking-wider">
            Consult
          </span>

          <div>
            <span className="pl-5 leading-snug text-muted-foreground">
              Company size
            </span>

            <p className="pl-5 font-medium">{consulting.size}</p>
          </div>

          <div>
            <span className="pl-5 leading-snug text-muted-foreground">
              Service of interest
            </span>

            <p className="pl-5 font-medium">{consulting.service}</p>
          </div>
        </div>

        <span className="flex gap-1 items-center leading-snug text-muted-foreground">
          <HugeiconsIcon icon={MessageSquare} size={15} aria-hidden />
          What&apos;s your main challenge?
        </span>

        <p className="pl-5 font-medium">{consulting.challenge}</p>

        <Separator className="bg-primary" />

        <p className="text-xs text-muted-foreground text-right">
          {new Date(consulting.createdAt).toLocaleDateString("en-US", {
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
  } = useFormContext<ConsultingValues>();

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
                    placeholder="Jane Smith"
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
          name="company"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <div className="space-y-1">
                <FieldLabel htmlFor="company">
                  <HugeiconsIcon
                    icon={Building}
                    size={15}
                    className="text-muted-foreground"
                    aria-hidden
                  />
                  Company
                </FieldLabel>

                <div className="pl-5">
                  <Input
                    {...field}
                    id="company"
                    placeholder="Acme Corp"
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

      <div className="space-y-2 md:space-y-1">
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
                  Work phone
                </FieldLabel>

                <div className="pl-5">
                  <Input
                    {...field}
                    id="phone"
                    type="tel"
                    placeholder="3500000000"
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
                  Work email
                </FieldLabel>

                <div className="pl-5">
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="jane@company.com"
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

      <FieldSeparator className="md:hidden lg:block" />

      <span className="md:hidden text-xs text-muted-foreground font-medium uppercase tracking-wider">
        Consult
      </span>

      <div className="space-y-2 md:space-y-1">
        <Controller
          name="size"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="size" className="pl-6">
                Company size
              </FieldLabel>

              <div className="pl-5">
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="size"
                    aria-invalid={fieldState.invalid}
                    className="w-full data-[size=default]:h-6"
                  >
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {SIZES.map((label) => (
                        <SelectItem key={label} value={label}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <FieldError errors={[fieldState.error]} className="pl-6" />
            </Field>
          )}
        />

        <Controller
          name="service"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="service" className="pl-6">
                Service of interest
              </FieldLabel>

              <div className="pl-5">
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="service"
                    aria-invalid={fieldState.invalid}
                    className="w-full data-[size=default]:h-6"
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {SERVICES.map((label) => (
                        <SelectItem key={label} value={label}>
                          {label}
                        </SelectItem>
                      ))}
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
        name="challenge"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <FieldLabel htmlFor="challenge">
              <HugeiconsIcon
                icon={MessageSquare}
                size={15}
                className="text-muted-foreground"
                aria-hidden
              />
              What&apos;s your main challenge?
            </FieldLabel>

            <div className="pl-5">
              <Textarea
                {...field}
                id="challenge"
                className="text-sm min-h-12 resize-none"
                placeholder="Describe your situation or goal..."
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

        <Button
          type="submit"
          className="group max-w-fit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Book my free call"}
          <HugeiconsIcon
            aria-hidden
            icon={ArrowRight02Icon}
            strokeWidth={2}
            className="transition-transform group-hover:translate-x-1"
          />
        </Button>

        <FieldDescription className="text-[10px] text-center">
          By submitting this form you agree to be contacted regarding your
          repair request. No spam, ever.
        </FieldDescription>
      </Field>
    </>
  );
}

export function Request() {
  const [consulting, setConsulting] = useState<CreatedConsulting | null>(null);
  // const client = useApolloClient();

  const methods = useForm<ConsultingValues>({
    resolver: zodResolver(consultingSchema),
    defaultValues: CONSULTING_DEFAULT_VALUES,
  });

  const [createConsulting] = useMutation(CREATE_CONSULTING, {
    onError(error) {
      methods.setError("root", { message: error.message });
    },
    // solo implementar si tienes alguna query en caché que deba refrescarse al crear un consulting, por ejemplo una getConsultingStats o un listado
    // onCompleted() {
    //   client.cache.evict({ fieldName: "getRepairStats" });
    //   client.cache.gc();
    // },
  });

  async function onSubmit(values: ConsultingValues): Promise<void> {
    const { data } = await createConsulting({ variables: { input: values } });
    if (data?.createConsulting) setConsulting(data.createConsulting);
  }

  return (
    <section
      id="request"
      aria-labelledby="request-heading"
      className="min-h-dvh pt-16"
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 md:flex md:gap-4 space-y-4">
        <div className="w-full space-y-4">
          <div className="space-y-4">
            <Badge className="border-primary/30 bg-primary/5 text-primary">
              Get in Touch
            </Badge>

            <h2
              id="request-heading"
              className="text-4xl font-bold tracking-tight"
            >
              Start with a
              <br />
              <span className="text-primary">free consultation</span>
            </h2>

            <p className="text-lg text-muted-foreground text-justify sm:text-left">
              Tell us about your situation and goals. A senior consultant will
              review your submission and reach out to schedule a discovery call
              — no strings attached.
            </p>
          </div>

          <ul className="space-y-2" aria-label="What you get">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={CheckCircle}
                  className="text-emerald-500"
                  aria-hidden
                  size={18}
                />
                {benefit}
              </li>
            ))}
          </ul>

          <figure className="rounded-2xl border border-border/50 bg-background/60 p-5">
            <div className="flex gap-2">
              <div
                className="h-12 w-12 shrink-0 flex items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary"
                aria-hidden
              >
                S
              </div>

              <div className="space-y-2">
                <blockquote>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    &ldquo;Within the first call they identified three critical
                    issues we had been struggling with for months. Worth every
                    penny.&rdquo;
                  </p>
                </blockquote>

                <figcaption>
                  <span className="text-sm font-semibold text-foreground">
                    Sarah K.
                  </span>

                  <span className="block text-xs text-muted-foreground">
                    CTO, Series A Startup
                  </span>
                </figcaption>
              </div>
            </div>
          </figure>
        </div>

        <div className="w-full grid place-items-center">
          <Card className="w-full max-w-sm md:max-w-md pt-2 pb-2 has-data-[slot=card-footer]:pb-2 gap-2 md:gap-1 shadow-lg">
            <CardHeader className="px-2">
              {consulting ? (
                <>
                  <CardTitle className="flex md:gap-2 flex-col md:flex-row items-center md:justify-center text-xl font-semibold">
                    <HugeiconsIcon
                      icon={CheckmarkCircle02Icon}
                      size={35}
                      className="text-emerald-500"
                      aria-hidden
                    />
                    Request received!
                  </CardTitle>
                </>
              ) : (
                <>
                  <CardTitle className="flex md:gap-2 flex-col md:flex-row items-center md:justify-center text-xl font-semibold">
                    <HugeiconsIcon
                      icon={MentoringIcon}
                      size={35}
                      className="text-primary"
                      aria-hidden
                    />
                    Book your free discovery call
                  </CardTitle>

                  <CardDescription className="text-balance text-center">
                    Fill in a few details and we&apos;ll be in touch within 1
                    business day.
                  </CardDescription>
                </>
              )}
            </CardHeader>

            <CardContent className="px-2 py-1">
              {consulting ? (
                <CreatedConsulting
                  consulting={consulting}
                  onReset={() => setConsulting(null)}
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
