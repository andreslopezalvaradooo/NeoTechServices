import { HugeiconsIcon } from "@hugeicons/react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { StarIcon } from "@hugeicons/core-free-icons";

const TESTIMONIALS = [
  {
    name: "Laura Martínez",
    role: "Freelance designer",
    content:
      "They repaired my MacBook in under 24 hours. I thought I was going to lose all my work and they recovered it completely. Excellent service.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Small business owner",
    content:
      "We signed up for the business plan and it has been a worthwhile investment. Always available and very professional with all of the company's infrastructure.",
    rating: 5,
  },
  {
    name: "Valentina Torres",
    role: "University student",
    content:
      "My laptop fell in water and I had already given up on it. NeoTech rescued it completely. Fair price and great communication throughout the whole process.",
    rating: 5,
  },
  {
    name: "Andrés Ospina",
    role: "Entrepreneur",
    content:
      "They developed the web app for my business and I was very satisfied. They met deadlines and the result exceeded my expectations.",
    rating: 4,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <HugeiconsIcon
          key={i}
          icon={StarIcon}
          size={15}
          fill={i < rating ? "#fbbf24" : "transparent"}
          color={i < rating ? "#fbbf24" : "currentColor"}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-22 bg-background">
      <div className="flex flex-col gap-6 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="space-y-4 max-w-xl">
          <Badge>Testimonials</Badge>

          <h2 className="text-4xl font-bold tracking-tight">
            What our clients
            <br />
            are saying.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <Card
              key={t.name}
              className="border-border bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <CardHeader>
                <StarRating rating={t.rating} />
              </CardHeader>

              <CardContent className="flex-1 flex items-center space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>
              </CardContent>

              <CardFooter>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarFallback className="text-sm font-bold bg-muted">
                      {t.name[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
