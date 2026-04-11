import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  MessageMultiple01Icon,
  PencilEdit02Icon,
  SourceCodeCircleIcon,
  RocketIcon,
  ArrowRight02Icon,
  Clock,
} from "@hugeicons/core-free-icons";

interface Step {
  step: string;
  icon: IconSvgElement;
  title: string;
  description: string;
  duration: string;
  accent: string;
  color: string;
}

const WHATSAPP_URL =
  "https://wa.me/573000000000?text=Hi,%20I%20need%20a%20development%20quote";

const STEPS = [
  {
    step: "01",
    icon: MessageMultiple01Icon,
    title: "Discovery",
    description:
      "We start with a free call to understand your goals, audience, and constraints. We scope the project together before a single line of code is written.",
    duration: "1–2 days",
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    step: "02",
    icon: PencilEdit02Icon,
    title: "Design & Architecture",
    description:
      "Wireframes, system design, database schema, and tech stack decision. You approve everything before we build.",
    duration: "3–5 days",
    accent: "from-primary/15 to-primary/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    step: "03",
    icon: SourceCodeCircleIcon,
    title: "Development",
    description:
      "Iterative sprints with regular demos. You stay in the loop at every milestone. Clean, tested, documented code.",
    duration: "2–8 weeks",
    accent: "from-[oklch(0.8_0.13_212)]/15 to-[oklch(0.8_0.13_212)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    step: "04",
    icon: RocketIcon,
    title: "Launch & Support",
    description:
      "We deploy to production, configure CI/CD, and hand over the full codebase. Post-launch support included.",
    duration: "Ongoing",
    accent: "from-[oklch(0.52_0.09_223)]/20 to-[oklch(0.52_0.09_223)]/5",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
] satisfies Step[];

function StepCard({ step }: { step: Step }) {
  return (
    <li>
      <Card
        className={`bg-linear-to-br ${step.accent} h-full md:py-2 lg:py-4 md:gap-1 lg:gap-4`}
      >
        <CardHeader className="md:px-2 flex justify-between items-center">
          <div
            aria-hidden
            className={`h-10 w-10 flex items-center justify-center rounded-xl ${step.color}`}
          >
            <HugeiconsIcon icon={step.icon} aria-hidden />
          </div>

          <CardTitle>{step.title}</CardTitle>

          <span
            className="text-4xl font-bold text-muted-foreground/20 select-none"
            aria-hidden
          >
            {step.step}
          </span>
        </CardHeader>

        <CardContent className="md:px-2 flex-1 text-muted-foreground text-justify leading-relaxed md:leading-normal">
          {step.description}
        </CardContent>

        <CardFooter className={`bg-linear-to-br ${step.accent} md:p-2 lg:p-4 justify-end`}>
          <Badge
            variant="outline"
            className="text-[10px] text-muted-foreground"
          >
            <HugeiconsIcon icon={Clock} strokeWidth={2} aria-hidden />{" "}
            {step.duration}
          </Badge>
        </CardFooter>
      </Card>
    </li>
  );
}

export function Process() {
  return (
    <section
      id="process"
      className="min-h-dvh pt-16"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4 md:space-y-2 lg:space-y-4">
        <div className="space-y-4 md:space-y-2 lg:space-y-4">
          <Badge className="bg-primary/5 border-primary/30 text-primary">
            How it works
          </Badge>

          <h2
            id="process-heading"
            className="text-4xl font-bold tracking-tight"
          >
            <span className="text-primary">Structured</span> process,<br />
            predictable results.
          </h2>

          <p className="max-w-lg text-muted-foreground text-lg text-justify md:text-left">
            No surprises. We follow a clear, collaborative process so you always
            know what's being built and when it ships.
          </p>
        </div>

        <ul className="grid gap-4 md:gap-2 lg:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <StepCard key={step.title} step={step} />
          ))}
        </ul>

        <div className="flex flex-col items-center gap-4 md:gap-2 lg:gap-4 text-center">
          <p className="text-muted-foreground text-sm">
            Ready to kick things off? Book a free discovery call.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Start my project on WhatsApp"
                className="group"
              >
                Start my project
                <HugeiconsIcon
                  aria-hidden
                  icon={ArrowRight02Icon}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="#pricing">View pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
