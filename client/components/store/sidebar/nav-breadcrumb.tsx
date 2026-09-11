"use client";

import { usePathname } from "next/navigation";
import { useQueryStates } from "nuqs";
import { searchParsers } from "@/src/lib/search/search-params";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import Link from "next/link";

function getLabel(segment: string): string {
  const isId = /^[0-9a-f-]{8,}$/i.test(segment) || /^\d+$/.test(segment);
  return isId ? "Detail" : segment.charAt(0).toUpperCase() + segment.slice(1);
}

export function NavBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((segment, index) => ({
    label: getLabel(segment),
    href: "/" + segments.slice(0, index + 1).join("/"),
    isLast: index === segments.length - 1,
  }));

  const [{ q, categories }] = useQueryStates(searchParsers);
  const activeFilters: string[] = [...(q ? [`"${q}"`] : []), ...categories];

  return (
    <Breadcrumb className="ml-1">
      <BreadcrumbList>
        {crumbs.map((crumb) => (
          <Fragment key={crumb.href}>
            <BreadcrumbItem>
              {crumb.isLast && activeFilters.length === 0 ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {(!crumb.isLast || activeFilters.length > 0) && (
              <BreadcrumbSeparator />
            )}
          </Fragment>
        ))}

        {activeFilters.length > 0 && (
          <BreadcrumbItem>
            <BreadcrumbPage>{activeFilters.join(" · ")}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
