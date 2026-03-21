"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/src/lib/utils";
import { useSession } from "@/src/lib/auth-client";
import { skipToken, useSuspenseQuery } from "@apollo/client/react";
import { GET_ACTIVITY_FEED } from "@/src/lib/queries/repair";
import { ActivityFeedItem } from "@/src/types/__generated__/graphql";

const dotColor: Record<ActivityFeedItem["type"], string> = {
  assigned: "bg-blue-500",
  completed: "bg-green-600",
  waiting: "bg-amber-500",
  approval: "bg-pink-500",
  created: "bg-purple-500",
};

export function ActivityFeed() {
  const { data: session, isPending } = useSession();

  const { data } = useSuspenseQuery(
    GET_ACTIVITY_FEED,
    isPending || !session?.user ? skipToken : {},
  );

  const activity = data?.getActivityFeed ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent activity</CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <ul className="flex flex-col divide-y divide-border">
          {activity.map((item) => (
            <li key={item.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
              <span
                className={cn(
                  "mt-1.5 size-2 shrink-0 rounded-full",
                  dotColor[item.type],
                )}
              />

              <div className="flex flex-col gap-0.5">
                <p
                  className="text-sm text-foreground leading-snug"
                  dangerouslySetInnerHTML={{ __html: item.message }}
                />
                
                <span className="text-xs text-muted-foreground">
                  {item.timestamp}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
