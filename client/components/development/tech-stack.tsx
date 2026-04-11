import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  WebDesign02Icon,
  DatabaseIcon,
  MobileNavigator01Icon,
  CloudServerIcon,
} from "@hugeicons/core-free-icons";

interface Tech {
  name: string;
  role: string;
}

interface Layer {
  layer: string;
  icon: IconSvgElement;
  techs: Tech[];
  accent: string;
  color: string;
}

const LAYERS = [
  {
    layer: "Frontend",
    icon: WebDesign02Icon,
    techs: [
      { name: "Next.js 15", role: "React framework" },
      { name: "React 19", role: "UI library" },
      { name: "Tailwind CSS 4", role: "Styling" },
      { name: "shadcn/ui", role: "Component system" },
      { name: "TypeScript", role: "Type safety" },
      { name: "Framer Motion", role: "Animations" },
    ],
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    layer: "Backend",
    icon: DatabaseIcon,
    techs: [
      { name: "Node.js", role: "Runtime" },
      { name: "GraphQL / REST", role: "API layer" },
      { name: "Prisma ORM", role: "Database access" },
      { name: "PostgreSQL", role: "Relational DB" },
      { name: "Redis", role: "Caching & queues" },
      { name: "Zod", role: "Schema validation" },
    ],
    accent: "from-primary/15 to-primary/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    layer: "Mobile",
    icon: MobileNavigator01Icon,
    techs: [
      { name: "React Native", role: "Cross-platform" },
      { name: "Expo", role: "Build toolchain" },
      { name: "NativeWind", role: "Styling" },
      { name: "Zustand", role: "State management" },
      { name: "React Query", role: "Data fetching" },
      { name: "EAS Build", role: "App distribution" },
    ],
    accent: "from-emerald-500/10 to-teal-500/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    layer: "Infrastructure",
    icon: CloudServerIcon,
    techs: [
      { name: "Vercel", role: "Hosting & edge" },
      { name: "Railway / Render", role: "Backend hosting" },
      { name: "GitHub Actions", role: "CI/CD" },
      { name: "Docker", role: "Containerization" },
      { name: "Cloudflare", role: "CDN & DNS" },
      { name: "Sentry", role: "Error monitoring" },
    ],
    accent: "from-[oklch(0.52_0.09_223)]/20 to-[oklch(0.52_0.09_223)]/5",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
] satisfies Layer[];

function LayerCard({ layer }: { layer: Layer }) {
  return (
    <li>
      <Card className={`bg-linear-to-br ${layer.accent} h-full md:py-2 lg:py-4 md:gap-2 lg:gap-4`}>
        <CardHeader className="flex gap-2 flex-row items-center">
          <div
            aria-hidden
            className={`h-9 w-9 flex items-center justify-center rounded-xl ${layer.color}`}
          >
            <HugeiconsIcon icon={layer.icon} aria-hidden />
          </div>

          <CardTitle>{layer.layer}</CardTitle>
        </CardHeader>

        <CardContent className="lg:px-2">
          <ul className="space-y-1 lg:space-y-2" aria-label={`${layer.layer} technologies`}>
            {layer.techs.map((tech) => (
              <li
                key={tech.name}
                className="flex items-center justify-between gap-2"
              >
                <span className="font-medium">{tech.name}</span>
                
                <Badge
                  variant="outline"
                  className="text-[10px] text-muted-foreground shrink-0"
                >
                  {tech.role}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </li>
  );
}

export function TechStack() {
  return (
    <section
      id="tech-stack"
      className="min-h-dvh pt-16"
      aria-labelledby="tech-stack-heading"
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4 md:space-y-2">
        <div className="space-y-4 md:space-y-2">
          <Badge className="bg-primary/5 border-primary/30 text-primary">
            Tech stack
          </Badge>

          <h2
            id="tech-stack-heading"
            className="text-4xl font-bold tracking-tight"
          >
            Modern tools, <br className="md:hidden"/>
            <span className="text-primary">production-proven.</span>
          </h2>

          <p className="text-muted-foreground text-lg text-justify md:text-left">
            We choose technologies based on your project's needs — not trends.
            Every stack we use is actively maintained and battle-tested in
            production.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LAYERS.map((layer) => (
            <LayerCard key={layer.layer} layer={layer} />
          ))}
        </ul>
      </div>
    </section>
  );
}
