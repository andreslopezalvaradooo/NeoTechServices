import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function MyRepairsSkeleton() {
  return (
    <ScrollArea className="h-100 w-full rounded-md border">
      <div className="p-4 grid sm:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardContent className="flex flex-col gap-4 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Ticket
                </span>

                <Skeleton className="h-5 w-22 rounded-xl" />
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Contact
                  </p>

                  <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                    <dt className="text-muted-foreground">Name</dt>
                    <Skeleton className="h-5 w-22 rounded-xl" />
                    <dt className="text-muted-foreground">Phone</dt>
                    <Skeleton className="h-5 w-22 rounded-xl" />
                    <dt className="text-muted-foreground">Email</dt>
                    <Skeleton className="h-5 w-22 rounded-xl" />
                  </dl>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Device
                  </p>

                  <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                    <dt className="text-muted-foreground">Type</dt>
                    <Skeleton className="h-5 w-22 rounded-xl" />
                    <dt className="text-muted-foreground">Brand</dt>
                    <Skeleton className="h-5 w-22 rounded-xl" />
                    <dt className="text-muted-foreground">Model</dt>
                    <Skeleton className="h-5 w-22 rounded-xl" />
                  </dl>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Problem
                </p>

                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                  <dt className="text-muted-foreground">Issue</dt>
                  <Skeleton className="h-5 w-22 rounded-xl" />
                  <dt className="text-muted-foreground">Description</dt>
                  <Skeleton className="h-5 w-22 rounded-xl" />
                </dl>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Skeleton className="h-5 w-22 rounded-xl items-end" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
