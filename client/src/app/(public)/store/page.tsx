import { SearchProducts } from "@/components/store/sidebar/search-products";
import { Suspense } from "react";

function StoreFallback() {
  return (
    <div className="mx-auto max-w-5xl h-[calc(100dvh-64px)] px-4 sm:px-8 flex items-center justify-center">
      <p className="text-sm text-muted-foreground">Cargando tienda...</p>
    </div>
  );
}

export default function Store() {
  return (
    // <Suspense fallback={<StoreFallback />}>
      <SearchProducts />
    // </Suspense>
  );
}
