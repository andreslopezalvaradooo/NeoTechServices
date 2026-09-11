"use client";

import { useTransition, useState } from "react";
import { useQueryState } from "nuqs";
import { searchParsers } from "@/src/lib/search/search-params";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export function SearchInput() {
  const [isPending, startTransition] = useTransition();

  const [urlValue, setUrlValue] = useQueryState(
    "q",
    searchParsers.q.withOptions({
      shallow: false,
      startTransition,
      history: "push",
      clearOnDefault: true,
    }),
  );

  const [inputValue, setInputValue] = useState(urlValue ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setInputValue(next);
    clearTimeout((handleChange as any)._t);
    (handleChange as any)._t = setTimeout(() => setUrlValue(next || null), 300);
  };

  return (
    <div className="relative">
      <Input
        type="search"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search products..."
      />
      {isPending && (
        <Spinner className="absolute right-2 top-1/2 -translate-y-1/2" />
      )}
    </div>
  );
}
