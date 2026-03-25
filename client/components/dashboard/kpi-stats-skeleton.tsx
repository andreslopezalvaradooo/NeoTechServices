import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function KpiStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="bg-muted/50 border-0 shadow-none">
          <CardContent className="p-4">
            <Skeleton className="h-3 w-24 mb-1" />
            <Skeleton className="h-8 w-16 my-1" />
            <Skeleton className="h-3 w-32 mt-1" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
