import { Suspense } from "react";
import { KpiStats } from "@/components/kpi-stats";
import { RecentRepairs } from "@/components/recent-repairs";
import { QuickActions } from "@/components/quick-actions";
import { ActivityFeed } from "@/components/activity-feed";
import { Greeting } from "@/components/dashboard-header";
import { RecentRepairsSkeleton } from "@/components/recent-repairs-skeleton";
import { KpiStatsSkeleton } from "@/components/kpi-stats-skeleton";
import { ActivityFeedSkeleton } from "@/components/activity-feed-skeleton";

export default function DashboardPage() {
  return (
    <section className="p-4 md:p-8 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Greeting />
        <QuickActions />
      </div>

      <Suspense fallback={<KpiStatsSkeleton />}>
        <KpiStats />
      </Suspense>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Suspense fallback={<RecentRepairsSkeleton />}>
          <RecentRepairs />
        </Suspense>

        <Suspense fallback={<ActivityFeedSkeleton />}>
          <ActivityFeed />
        </Suspense>
      </div>
    </section>
  );
}
