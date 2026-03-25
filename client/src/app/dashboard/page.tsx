import { Suspense } from "react";
import { KpiStats } from "@/components/dashboard/kpi-stats";
import { RecentRepairs } from "@/components/dashboard/recent-repairs";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { Greeting } from "@/components/dashboard/greeting";
import { RecentRepairsSkeleton } from "@/components/dashboard/recent-repairs-skeleton";
import { KpiStatsSkeleton } from "@/components/dashboard/kpi-stats-skeleton";
import { ActivityFeedSkeleton } from "@/components/dashboard/activity-feed-skeleton";

export default function DashboardPage() {
  return (
    <section className="h-full mx-auto max-w-6xl p-4 md:p-8 flex flex-col gap-4">
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
