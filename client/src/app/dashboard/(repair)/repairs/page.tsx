import MyRepairs from "@/components/my-repairs";
import { Skeleton } from "@/components/ui/skeleton";
import { PreloadQuery } from "@/src/lib/apollo-server-client";
import { MY_REPAIRS } from "@/src/lib/queries/repair";
import { Suspense } from "react";

export default function RepairsPage() {
  return (
    <PreloadQuery query={MY_REPAIRS}>
      <Suspense
        fallback={
          <div className="p-4 md:p-8 space-y-4">
            <Skeleton className="h-12 w-48" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Skeleton className="h-64 rounded-xl" />
              <Skeleton className="h-64 rounded-xl" />
              <Skeleton className="h-64 rounded-xl" />
            </div>
          </div>
        }
      >
        <MyRepairs />
      </Suspense>
    </PreloadQuery>
  );
}
