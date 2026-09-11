"use client";

import { ComponentProps, useState, useTransition } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Filters } from "@/src/types/__generated__/graphql";
import { useQueryStates } from "nuqs";
import { SearchInput } from "./search-input";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/src/lib/utils";
import { searchParsers } from "@/src/lib/search/search-params";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight } from "@hugeicons/core-free-icons";

interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  filters: Filters | undefined;
  onPriceChange: (min: number, max: number) => void;
  priceRange: [number, number] | null;
  min: number;
  max: number;
}

export function AppSidebar({
  filters,
  onPriceChange,
  priceRange,
  min,
  max,
  ...props
}: AppSidebarProps) {
  const { open, setOpen } = useSidebar();
  const [isPending, startTransition] = useTransition();

  const [values, setValues] = useQueryStates(searchParsers, {
    shallow: false,
    startTransition,
    history: "push",
  });

  const serverMin = min;
  const serverMax = max;
  const [dragging, setDragging] = useState<[number, number] | null>(null);
  const displayMin = dragging?.[0] ?? priceRange?.[0] ?? serverMin;
  const displayMax = dragging?.[1] ?? priceRange?.[1] ?? serverMax;

  const toggleCategory = (slug: string) => {
    const next = values.categories.includes(slug)
      ? values.categories.filter((c) => c !== slug)
      : [...values.categories, slug];

    setValues({ categories: next });
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent
        className={cn(
          "p-2 transition-opacity duration-150",
          isPending && "opacity-50 pointer-events-none",
        )}
      >
        {open ? (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Search</SidebarGroupLabel>
              <SidebarGroupContent>
                <SearchInput />
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Order by</SidebarGroupLabel>
              <SidebarGroupContent>
                <Select
                  value={values.order}
                  onValueChange={(value) => setValues({ order: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="asc">
                      Price: lowest to highest
                    </SelectItem>
                    <SelectItem value="desc">
                      Price: highest to lowest
                    </SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Price range</SidebarGroupLabel>
              <SidebarGroupContent className="space-y-2 px-1">
                {!filters ? (
                  <Skeleton className="h-4 w-full mt-2" />
                ) : (
                  <>
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>${serverMin?.toLocaleString("es-CO")}</span>
                      <span>${serverMax?.toLocaleString("es-CO")}</span>
                    </div>

                    <Slider
                      min={serverMin}
                      max={serverMax}
                      step={1}
                      value={[displayMin, displayMax]}
                      onValueChange={([min, max]) => setDragging([min, max])}
                      onValueCommit={([min, max]) => {
                        setDragging(null);
                        onPriceChange(min, max);
                      }}
                    />

                    <div className="flex justify-between text-sm text-muted-foreground font-semibold">
                      <span>${displayMin?.toLocaleString("es-CO")}</span>
                      <span>${displayMax?.toLocaleString("es-CO")}</span>
                    </div>
                  </>
                )}
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Categories</SidebarGroupLabel>
              <SidebarGroupContent>
                <FieldSet>
                  <FieldGroup className="gap-3">
                    {!filters ? (
                      Array.from({ length: 6 }, (_, i) => (
                        <Field key={i} orientation="horizontal">
                          <Checkbox id={`sk-${i}`} name="skeleton" disabled />
                          <FieldLabel htmlFor={`sk-${i}`}>
                            <Skeleton className="h-5 w-48" />
                          </FieldLabel>
                        </Field>
                      ))
                    ) : filters.categories.length === 0 ? (
                      <p className="text-sm text-muted-foreground px-2 py-4 text-center">
                        No categories found
                      </p>
                    ) : (
                      filters.categories.map((c) => (
                        <Field key={c.slug} orientation="horizontal">
                          <Checkbox
                            id={c.slug}
                            name={c.slug}
                            checked={values.categories.includes(c.slug)}
                            onCheckedChange={() => toggleCategory(c.slug)}
                          />
                          <FieldLabel
                            htmlFor={c.slug}
                            className="flex justify-between w-full"
                          >
                            <span>{c.name}</span>
                            <span className="text-muted-foreground text-xs">
                              ({c.count})
                            </span>
                          </FieldLabel>
                        </Field>
                      ))
                    )}
                  </FieldGroup>
                </FieldSet>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        ) : (
          <SidebarGroup>
            <SidebarGroupContent className="flex items-center justify-center">
              <Button
                variant={"outline"}
                size={"icon-xs"}
                onClick={() => setOpen(true)}
              >
                <HugeiconsIcon icon={ArrowRight} />
              </Button>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
