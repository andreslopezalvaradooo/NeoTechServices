"use client";

import { useEffect } from "react";
import { useSuspenseQuery } from "@apollo/client/react";
import { SEARCH_PRODUCTS } from "@/src/lib/queries/product";
import type {
  Filters,
  SearchProductsQuery,
  SearchProductsQueryVariables,
} from "@/src/types/__generated__/graphql";
import { Products } from "./products";

interface ProductsViewProps {
  queryParams: SearchProductsQueryVariables["input"];
  onDataChange: (data: {
    total: number;
    pages: number;
    filters: Filters;
  }) => void;
}

export function ProductsView({ queryParams, onDataChange }: ProductsViewProps) {
  const { data } = useSuspenseQuery(SEARCH_PRODUCTS, {
    variables: { input: queryParams },
  });

  const products = data.searchProducts.products;
  const total = data.searchProducts.total;
  const pages = data.searchProducts.pages;
  const filters = data.searchProducts.filters;

  useEffect(() => {
    if (total != null && pages != null) {
      onDataChange({ total, pages, filters });
    }
  }, [total, pages, filters]);

  return <Products products={products} />;
}
