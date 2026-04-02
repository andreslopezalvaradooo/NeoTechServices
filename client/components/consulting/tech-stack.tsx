import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

interface TechCategory {
  id: string;
  label: string;
  items: string[];
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
  },
  {
    id: "backend-apis",
    label: "Backend & APIs",
    items: ["Node.js", "Python", "Go", "GraphQL", "REST", "tRPC", "FastAPI"],
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
  },
  {
    id: "security-compliance",
    label: "Security & Compliance",
    items: ["SOC 2", "HIPAA", "ISO 27001", "Auth0", "OWASP", "Vault"],
  },
] as const;

interface CategoryCardProps {
  category: TechCategory;
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="h-full border border-border/50 bg-background/60">
      <CardHeader>
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {category.label}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul
          role="list"
          className="flex flex-wrap gap-x-2 gap-y-1.5"
          aria-label={`${category.label} technologies`}
        >
          {category.items.map((item) => (
            <li key={item}>
              <Badge variant="secondary" className="text-sm font-normal">
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
      className="mx-auto max-w-6xl p-6 lg:p-8 space-y-10"
      aria-labelledby="tech-stack-heading"
    >
      <div className="space-y-4">
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/5 text-primary"
          aria-label="Technology expertise section"
        >
          Tech Expertise
        </Badge>

        <h2
          id="tech-stack-heading"
          className="text-4xl font-bold tracking-tight lg:text-5xl"
        >
          We speak your stack
        </h2>

        <p className="max-w-2xl text-lg text-muted-foreground">
          Our consultants have hands-on experience with the tools and platforms
          your team already uses — or the ones you should be adopting.
        </p>
      </div>

      <ul role="list" className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {TECH_CATEGORIES.map((category) => (
          <li key={category.id}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t see your stack?{" "}
        <Link
          href="#form"
          className="font-medium text-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Contact us about your technology stack"
        >
          Ask us anyway — we probably have experience with it.
        </Link>
      </p>
    </section>
  );
}
