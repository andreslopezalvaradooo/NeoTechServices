import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

interface TechCategory {
  id: string;
  label: string;
  items: string[];
  accent: string;
  color: string;
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    id: "cloud-infrastructure",
    label: "Cloud & Infrastructure",
    items: [
      "AWS",
      "Google Cloud",
      "Azure",
      "Vercel",
      "Terraform",
      "Kubernetes",
      "Docker",
    ],
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vue.js",
      "Astro",
    ],
    accent: "from-primary/15 to-primary/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    id: "backend-apis",
    label: "Backend & APIs",
    items: ["Node.js", "Python", "Go", "GraphQL", "REST", "tRPC", "FastAPI"],
    accent: "from-[oklch(0.8_0.13_212)]/15 to-[oklch(0.8_0.13_212)]/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "data-ai",
    label: "Data & AI",
    items: [
      "PostgreSQL",
      "Redis",
      "MongoDB",
      "Kafka",
      "Airflow",
      "LangChain",
      "OpenAI",
    ],
    accent: "from-[oklch(0.52_0.09_223)]/20 to-[oklch(0.52_0.09_223)]/5",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    id: "devops-observability",
    label: "DevOps & Observability",
    items: [
      "GitHub Actions",
      "CI/CD",
      "Datadog",
      "Sentry",
      "Prometheus",
      "Grafana",
    ],
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    id: "security-compliance",
    label: "Security & Compliance",
    items: ["SOC 2", "HIPAA", "ISO 27001", "Auth0", "OWASP", "Vault"],
    accent: "from-primary/15 to-primary/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
] as const;

interface CategoryCardProps {
  category: TechCategory;
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card
      className={`h-full border border-border/50 bg-linear-to-br ${category.accent}`}
    >
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm text-center uppercase">
          {category.label}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex items-center">
        <ul
          role="list"
          className="flex gap-2 flex-wrap justify-center"
          aria-label={`${category.label} technologies`}
        >
          {category.items.map((item) => (
            <li key={item}>
              <Badge
                variant="outline"
                className={`${category.color} text-sm font-normal`}
              >
                {item}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function TechStack() {
  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="min-h-dvh pt-16"
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4">
        <div className="space-y-4 md:space-y-2">
          <Badge className="border-primary/30 bg-primary/5 text-primary">
            Tech Expertise
          </Badge>

          <h2
            id="tech-stack-heading"
            className="text-4xl font-bold tracking-tigh"
          >
            We speak your <span className="text-primary">stack.</span>
          </h2>

          <p className="max-w-xl text-lg text-muted-foreground">
            Our consultants have hands-on experience with the tools and
            platforms your team already uses — or the ones you should be
            adopting.
          </p>
        </div>

        <ul role="list" className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {TECH_CATEGORIES.map((category) => (
            <li key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t see your stack?{" "}
          <Link
            href="#request"
            className="font-medium text-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Contact us about your technology stack"
          >
            Ask us anyway — we probably have experience with it.
          </Link>
        </p>
      </div>
    </section>
  );
}
