"use client";

import { useEffect, useMemo, useState } from "react";
import { useQueryStates } from "nuqs";
import { searchParsers } from "@/src/lib/search/search-params";
import { SEARCH_PRODUCTS } from "@/src/lib/queries/product";
import { useQuery } from "@apollo/client/react";
import { AppSidebar } from "./app-sidebar";
import { Products } from "../products";
import { Pagination } from "../pagination";
import { ProductSkeleton } from "../product-skeleton";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { NavBreadcrumb } from "./nav-breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/src/lib/utils";

const PER_PAGE = 20;

export function SearchProducts() {
  const [queryParams] = useQueryStates(searchParsers);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [page, setPage] = useState(1);

  const { data, previousData, loading } = useQuery(SEARCH_PRODUCTS, {
    variables: { input: queryParams },
  });

  useEffect(() => {
    if (!data) return;
    const { categories } = queryParams;
    const products = data.searchProducts.products;

    if (!products.length) {
      setPriceRange(null);
      setPage(1);
      return;
    }

    const inCategory = categories.length
      ? products.filter((p) => categories.includes(p.category?.slug ?? ""))
      : products;

    const base = inCategory.length ? inCategory : products;
    const newMin = Math.min(...base.map((p) => p.price));
    const newMax = Math.max(...base.map((p) => p.price));

    setPriceRange((prev) => {
      if (!prev) return null;
      const clampedMin = Math.max(prev[0], newMin);
      const clampedMax = Math.min(prev[1], newMax);
      if (clampedMin <= newMin && clampedMax >= newMax) return null;
      if (clampedMin > clampedMax) return null;
      return [clampedMin, clampedMax];
    });

    setPage(1);
  }, [data]);

  const serverData = data ?? previousData;
  const allProducts = serverData?.searchProducts.products ?? [];
  const serverFilters = data?.searchProducts.filters;

  const productsByCategory = useMemo(() => {
    const { categories } = queryParams;
    if (!categories.length) return allProducts;
    return allProducts.filter((p) =>
      categories.includes(p.category?.slug ?? ""),
    );
  }, [allProducts, queryParams.categories]);

  // Filtrado por precio en cliente
  const filteredProducts = useMemo(() => {
    return productsByCategory.filter(
      (p) =>
        !priceRange || (p.price >= priceRange[0] && p.price <= priceRange[1]),
    );
  }, [productsByCategory, priceRange]);

  const minPrice = productsByCategory.length
    ? Math.min(...productsByCategory.map((p) => p.price))
    : 0;
  const maxPrice = productsByCategory.length
    ? Math.max(...productsByCategory.map((p) => p.price))
    : 0;

  // Counts de categorías recalculados según precio seleccionado
  const filtersWithCounts = useMemo(() => {
    if (!serverFilters) return undefined;
    const categories = serverFilters.categories.map((cat) => ({
      ...cat,
      count: allProducts.filter(
        (p) =>
          p.category?.slug === cat.slug &&
          (!priceRange ||
            (p.price >= priceRange[0] && p.price <= priceRange[1])),
      ).length,
    }));
    return { ...serverFilters, categories };
  }, [serverFilters, allProducts, priceRange]);

  // Paginación sobre productos filtrados
  const total = filteredProducts.length;
  const pages = Math.ceil(total / PER_PAGE);
  const paginatedProducts = useMemo(
    () => filteredProducts.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [filteredProducts, page],
  );

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    setPage(1);
  };

  return (
    <SidebarProvider className="mx-auto max-w-5xl h-[calc(100dvh-64px)] px-4 sm:px-8">
      <AppSidebar
        filters={filtersWithCounts}
        onPriceChange={handlePriceChange}
        priceRange={priceRange}
        min={minPrice}
        max={maxPrice}
      />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-4 px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" />
            <NavBreadcrumb />
          </div>
        </header>

        <main className="relative h-[calc(100dvh-128px)]">
          <ScrollArea className="h-full">
            {loading && !previousData ? (
              <ProductsSkeleton />
            ) : (
              <div
                className={cn("transition-opacity", loading && "opacity-50")}
              >
                <Products products={paginatedProducts} />
              </div>
            )}
          </ScrollArea>

          <Pagination
            pagination={{ page, perPage: PER_PAGE, total, pages }}
            onPageChange={setPage}
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function ProductsSkeleton() {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:pl-1">
      {Array.from({ length: 6 }, (_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </ul>
  );
}
