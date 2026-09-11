import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ProductFragmentFragment } from "@/src/types/__generated__/graphql";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/src/lib/utils";
import Link from "next/link";

export function Products({
  products,
}: {
  products: ProductFragmentFragment[];
}) {
  const { open } = useSidebar();

  function CardProduct({ product }: { product: ProductFragmentFragment }) {
    return (
      <li>
        <Link href={`/store/${product.slug}`}>
          <Card className="relative mx-auto w-full h-full max-w-sm pt-0 hover:-translate-0.5 transition-all">
            <img
              src={product.images[0]}
              alt={product.name}
              className="relative z-20 aspect-video w-full object-cover"
            />

            <CardHeader>
              <CardTitle>{product.name}</CardTitle>

              <CardDescription>{product.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 text-lg font-bold flex items-end justify-end">
              $ {product.price}
            </CardContent>

            <CardFooter>
              <Button className="w-full">Add to cart</Button>
            </CardFooter>
          </Card>
        </Link>
      </li>
    );
  }

  return (
    <section>
      <ul
        className={cn(
          "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 pb-20 md:pl-1",
          open && "md:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {products?.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}
