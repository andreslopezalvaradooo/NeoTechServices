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
  AlertCircle,
  CheckmarkCircle02Icon,
  Telephone,
  ArrowRight02Icon,
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
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../ui/field";
import Link from "next/link";
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
    <Card className="p-2 gap-2">
      <CardTitle className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          Ticket
        </span>

        <Badge>{consulting.ticketCode}</Badge>
      </CardTitle>

      <Separator />

      <CardContent className="flex flex-col gap-2 p-0">
        <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
          <div className="w-full min-w-0 flex flex-col gap-1">
            <span className="w-full flex gap-1 items-center leading-snug text-muted-foreground">
              <HugeiconsIcon icon={User} size={15} aria-hidden="true" />
              Name
            </span>

            <p className="w-full pl-5 font-medium wrap-break-word dark:bg-input/30">
              {consulting.name}
            </p>
          </div>

          <div className="w-full min-w-0 flex flex-col gap-1">
            <span className="w-full flex gap-1 items-center leading-snug text-muted-foreground">
              <HugeiconsIcon icon={Building} size={15} aria-hidden="true" />
              Company
            </span>

            <p className="w-full pl-5 font-medium wrap-break-word dark:bg-input/30">
              {consulting.company}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
          <div className="w-full min-w-0 flex flex-col gap-1">
            <span className="w-full flex gap-1 items-center leading-snug text-muted-foreground">
              <HugeiconsIcon icon={Telephone} size={15} aria-hidden="true" />
              Work phone
            </span>

            <p className="w-full pl-5 font-medium wrap-break-word dark:bg-input/30">
              {consulting.phone}
            </p>
          </div>

          <div className="w-full min-w-0 flex flex-col gap-1">
            <span className="w-full flex gap-1 items-center leading-snug text-muted-foreground">
              <HugeiconsIcon icon={Mail} size={15} aria-hidden="true" />
              Work email
            </span>

            <p className="w-full pl-5 font-medium wrap-break-word dark:bg-input/30">
              {consulting.email}
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
          <div className="w-full min-w-0 flex flex-col gap-1 ml-5">
            <span className="w-full items-center leading-snug text-muted-foreground">
              Company size
            </span>

            <p className="w-full font-medium wrap-break-word dark:bg-input/30">
              {consulting.size}
            </p>
          </div>

          <div className="w-full min-w-0 flex flex-col gap-1 ml-5">
            <span className="w-full items-center leading-snug text-muted-foreground">
              Service of interest
            </span>

            <p className="w-full font-medium wrap-break-word dark:bg-input/30">
              {consulting.service}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-1">
          <span className="w-full flex gap-1 items-center leading-snug text-muted-foreground">
            <HugeiconsIcon icon={MessageSquare} size={15} aria-hidden="true" />
            What&apos;s your main challenge?
          </span>

          <p className="w-full pl-5 font-medium wrap-break-word dark:bg-input/30">
            {consulting.challenge}
          </p>
        </div>

        <Separator />

        <p className="text-right text-xs text-muted-foreground">
          {new Date(consulting.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </CardContent>

      <CardFooter className="bg-transparent justify-center">
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
      <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex flex-col gap-1">
                <FieldLabel htmlFor="name">
                  <HugeiconsIcon
                    icon={User}
                    size={15}
                    className="text-muted-foreground"
                    aria-hidden="true"
                  />
                  Name
                </FieldLabel>

                <div className="pl-5">
                  <Input
                    {...field}
                    id="name"
                    placeholder="Jane Smith"
                    aria-invalid={fieldState.invalid}
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
            <Field data-invalid={fieldState.invalid}>
              <div className="flex flex-col gap-1">
                <FieldLabel htmlFor="company">
                  <HugeiconsIcon
                    icon={Building}
                    size={15}
                    className="text-muted-foreground"
                    aria-hidden="true"
                  />
                  Company
                </FieldLabel>

                <div className="pl-5">
                  <Input
                    {...field}
                    id="company"
                    placeholder="Acme Corp"
                    aria-invalid={fieldState.invalid}
                  />
                </div>
              </div>

              <FieldError errors={[fieldState.error]} className="pl-6" />
            </Field>
          )}
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex flex-col gap-1">
                <FieldLabel htmlFor="phone">
                  <HugeiconsIcon
                    icon={Telephone}
                    size={15}
                    className="text-muted-foreground"
                    aria-hidden="true"
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
            <Field data-invalid={fieldState.invalid}>
              <div className="flex flex-col gap-1">
                <FieldLabel htmlFor="email">
                  <HugeiconsIcon
                    icon={Mail}
                    size={15}
                    className="text-muted-foreground"
                    aria-hidden="true"
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
                  />
                </div>
              </div>

              <FieldError errors={[fieldState.error]} className="pl-6" />
            </Field>
          )}
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
        <Controller
          name="size"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="size" className="pl-6">
                Company size
              </FieldLabel>

              <div className="pl-5">
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="size"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
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
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="service" className="pl-6">
                Service of interest
              </FieldLabel>

              <div className="pl-5">
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="service"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
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
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="challenge">
              <HugeiconsIcon
                icon={MessageSquare}
                size={15}
                className="text-muted-foreground"
                aria-hidden="true"
              />
              What&apos;s your main challenge?
            </FieldLabel>

            <div className="pl-5">
              <Textarea
                {...field}
                rows={4}
                id="challenge"
                className="resize-none"
                placeholder="Briefly describe your situation, the problem you're trying to solve, or the outcome you're looking for..."
                aria-invalid={fieldState.invalid}
              />
            </div>

            <FieldError errors={[fieldState.error]} className="pl-6" />
          </Field>
        )}
      />

      <Field className="items-center">
        {errors.root && (
          <p className="rounded-md bg-destructive/10 px-4 py-2 text-sm text-destructive text-center focus:outline-none">
            {errors.root.message}
          </p>
        )}

        <Button type="submit" className="max-w-fit" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Book my free call"}
          <HugeiconsIcon icon={ArrowRight02Icon} aria-hidden />
        </Button>

        <FieldDescription className="text-center">
          By submitting you agree to our{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
          >
            Privacy Policy
          </Link>
          . We never share your data.
        </FieldDescription>
      </Field>
    </>
  );
}

export function Form() {
  const [consulting, setConsulting] = useState<CreatedConsulting | null>(null);
  const client = useApolloClient();

  const methods = useForm<ConsultingValues>({
    resolver: zodResolver(consultingSchema),
    defaultValues: CONSULTING_DEFAULT_VALUES,
  });

  const [createConsulting] = useMutation(CREATE_CONSULTING, {
    onError(error) {
      methods.setError("root", { message: error.message });
    },
    onCompleted() {
      console.log({
        implementar:
          'client.cache.evict({ fieldName: "getRepairStats" }); client.cache.gc();',
      });
    },
  });

  async function onSubmit(values: ConsultingValues): Promise<void> {
    const { data } = await createConsulting({ variables: { input: values } });
    if (data?.createConsulting) setConsulting(data.createConsulting);
  }

  return (
    <section
      id="request"
      aria-labelledby="request-heading"
      className="mx-auto max-w-6xl p-6 lg:p-8 grid gap-8 md:grid-cols-2 lg:items-start"
    >
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/5 text-primary"
          >
            Get in Touch
          </Badge>

          <h2
            id="request-heading"
            className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl"
          >
            Start with a
            <br />
            <span className="text-primary">free consultation</span>
          </h2>

          <p className="text-lg text-muted-foreground text-justify sm:text-left">
            Tell us about your situation and goals. A senior consultant will
            review your submission and reach out to schedule a discovery call —
            no strings attached.
          </p>
        </div>

        <ul className="flex flex-col gap-3" aria-label="What you get">
          {BENEFITS.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3">
              <HugeiconsIcon
                icon={CheckCircle}
                className="text-primary"
                aria-hidden="true"
                size={20}
              />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <figure className="rounded-2xl border border-border/50 bg-background/60 p-6">
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary"
              aria-hidden="true"
            >
              S
            </div>

            <div>
              <blockquote>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;Within the first call they identified three critical
                  issues we had been struggling with for months. Worth every
                  penny.&rdquo;
                </p>
              </blockquote>

              <figcaption className="mt-2">
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

      <Card className="shadow-lg">
        <CardTitle className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Book your free discovery call</h1>

          <p className="text-sm text-balance text-muted-foreground">
            Fill in a few details and we&apos;ll be in touch within 1 business
            day.
          </p>
        </CardTitle>

        <CardContent>
          {consulting ? (
            <CreatedConsulting
              consulting={consulting}
              onReset={() => setConsulting(null)}
            />
          ) : (
            <FormProvider {...methods}>
              <Card className="p-2">
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                  <FieldGroup className="gap-2">
                    <FormFields />
                  </FieldGroup>
                </form>
              </Card>
            </FormProvider>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
