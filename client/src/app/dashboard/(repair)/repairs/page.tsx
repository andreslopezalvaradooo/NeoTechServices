import MyRepairs from "@/components/dashboard/my-repairs";
import { MyRepairsSkeleton } from "@/components/dashboard/my-repairs-skeleton";
import { PreloadQuery } from "@/src/lib/apollo-client";
import { MY_REPAIRS } from "@/src/lib/queries/repair";
import { Suspense } from "react";

export default function RepairsPage() {
  return (
    <PreloadQuery query={MY_REPAIRS}>
      <Suspense fallback={<MyRepairsSkeleton />}>
        <MyRepairs />
      </Suspense>
    </PreloadQuery>
  );
}
