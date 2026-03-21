import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ActivityFeedSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <Skeleton className="h-4 w-28" />
      </CardHeader>

      <CardContent className="pt-0">
        <ul className="flex flex-col divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="flex gap-3 py-3 first:pt-0 last:pb-0">
              <Skeleton className="mt-1.5 size-2 shrink-0 rounded-full" />

              <div className="flex flex-col gap-0.5">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-20" />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
