"use client";

import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { Settings05Icon, RepairIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Repairs",
      url: "#",
      icon: <HugeiconsIcon icon={RepairIcon} strokeWidth={2} />,
      isActive: true,
      items: [
        {
          title: "My repairs",
          url: "/dashboard/repairs",
        },
        {
          title: "Track repair",
          url: "/dashboard/track",
        },
        {
          title: "New repair",
          url: "/dashboard/new",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />,
      items: [
        {
          title: "Profile",
          url: "/dashboard/profile",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link
          href="/dashboard"
          aria-label="NeoTech Services — Dashboard"
          className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight"
        >
          <Image
            width={30}
            height={30}
            src="/NTS-logo.svg"
            alt={open ? "" : "NTS logo"}
            aria-hidden
          />
          {open && (
            <>
              NeoTech
              <span className="text-muted-foreground font-normal">
                Services
              </span>
            </>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
