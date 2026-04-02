import { HugeiconsIcon } from "@hugeicons/react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { StarIcon } from "@hugeicons/core-free-icons";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  accent: string;
  color: string;
}

const TESTIMONIALS = [
  {
    name: "Laura Martínez",
    role: "Freelance designer",
    content:
      "They repaired my MacBook in under 24 hours. I thought I was going to lose all my work and they recovered it completely. Excellent service.",
    rating: 5,
    accent: "from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    name: "Carlos Rodríguez",
    role: "Small business owner",
    content:
      "We signed up for the business plan and it has been a worthwhile investment. Always available and very professional with all of the company's infrastructure.",
    rating: 5,
    accent: "from-primary/15 to-primary/5",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    name: "Valentina Torres",
    role: "University student",
    content:
      "My laptop fell in water and I had already given up on it. NeoTech rescued it completely. Fair price and great communication throughout the whole process.",
    rating: 5,
    accent: "from-[oklch(0.8_0.13_212)]/15 to-[oklch(0.8_0.13_212)]/5",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    name: "Andrés Ospina",
    role: "Entrepreneur",
    content:
      "They developed the web app for my business and I was very satisfied. They met deadlines and the result exceeded my expectations.",
    rating: 4,
    accent: "from-[oklch(0.52_0.09_223)]/20 to-[oklch(0.52_0.09_223)]/5",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
] satisfies Testimonial[];

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <HugeiconsIcon
          key={i}
          icon={StarIcon}
          size={15}
          fill={i < rating ? "#fbbf24" : "transparent"}
          color={i < rating ? "#fbbf24" : "currentColor"}
          aria-hidden
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const initials = t.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <li>
      <Card className={`h-full bg-linear-to-br ${t.accent}`}>
        <CardHeader>
          <StarRating rating={t.rating} />
        </CardHeader>

        <CardContent className="flex-1 text-muted-foreground text-justify leading-relaxed">
          <blockquote>&ldquo;{t.content}&rdquo;</blockquote>
        </CardContent>

        <CardFooter className={`gap-3 bg-linear-to-br ${t.accent}`}>
          <Avatar className="h-9 w-9 border border-border" aria-hidden>
            <AvatarFallback className="text-sm font-bold bg-muted">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-semibold">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.role}</p>
          </div>
        </CardFooter>
      </Card>
    </li>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-muted/30 min-h-dvh pt-16"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-8 md:space-y-4 lg:space-y-8">
        <div className="space-y-8 md:space-y-4 lg:space-y-8">
          <Badge className="bg-primary/5 border-primary/30 text-primary">
            Testimonials
          </Badge>

          <h2
            id="testimonials-heading"
            className="text-4xl font-bold tracking-tight"
          >
            What our <span className="text-primary">clients </span>
            <br className="md:hidden lg:block" />
            are saying.
          </h2>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </ul>
      </div>
    </section>
  );
}
