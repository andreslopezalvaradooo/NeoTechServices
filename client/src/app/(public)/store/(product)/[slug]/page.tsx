"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GET_PRODUCT, CREATE_REVIEW } from "@/src/lib/queries/product";
import { useMutation, useQuery } from "@apollo/client/react";
import Image from "next/image";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { DiscountType } from "@/src/types/__generated__/graphql";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/src/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

// ---------- Review form schema ----------
const reviewSchema = z.object({
  author: z.string().min(2, "Name must be at least 2 characters").max(80),
  rating: z.number().min(1, "Select a rating").max(5),
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  body: z.string().min(10, "Review must be at least 10 characters").max(1000),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

// ---------- Star Rating component ----------
function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: "sm" | "md";
}) {
  const [hovered, setHovered] = useState(0);
  const dim = size === "sm" ? 14 : 20;

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <HugeiconsIcon
          key={star}
          icon={Star}
          size={dim}
          className={cn(
            "transition-colors",
            !readonly && "cursor-pointer",
            (hovered || value) >= star
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted-foreground",
          )}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          onClick={() => !readonly && onChange?.(star)}
        />
      ))}
    </div>
  );
}

// ---------- Single Review ----------
function ReviewCard({
  review,
}: {
  review: {
    id: string;
    author: string;
    rating: number;
    title: string;
    body: string;
    createdAt: string;
  };
}) {
  return (
    <div className="py-4 border-b last:border-b-0 space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
            {review.author[0].toUpperCase()}
          </div>
          <span className="text-sm font-medium">{review.author}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(review.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      <StarRating value={review.rating} readonly size="sm" />

      <p className="text-sm font-semibold">{review.title}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {review.body}
      </p>
    </div>
  );
}

// ---------- Reviews Tab ----------
function ReviewsTab({
  reviews,
  productId,
}: {
  reviews: {
    id: string;
    author: string;
    rating: number;
    title: string;
    body: string;
    createdAt: string;
  }[];
  productId: string;
}) {
  const [createReview, { loading }] = useMutation(CREATE_REVIEW, {
    refetchQueries: [GET_PRODUCT],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { author: "", rating: 0, title: "", body: "" },
  });

  const rating = watch("rating");

  const onSubmit = async (values: ReviewFormValues) => {
    await createReview({
      variables: { input: { ...values, productId } },
    });
    reset();
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
      {/* Left — existing reviews */}
      <div>
        {reviews.length > 0 ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl font-bold">{avgRating.toFixed(1)}</span>
              <div>
                <StarRating value={Math.round(avgRating)} readonly />
                <span className="text-xs text-muted-foreground">
                  {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <div className="max-h-72 overflow-y-auto pr-1">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground gap-2">
            <HugeiconsIcon icon={Star} size={32} className="opacity-30" />
            <p className="text-sm">No reviews yet. Be the first!</p>
          </div>
        )}
      </div>

      {/* Right — form */}
      <div className="border rounded-lg p-4 space-y-3 h-fit">
        <p className="text-sm font-semibold">Write a review</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Author */}
          <div className="space-y-1.5">
            <Label htmlFor="author" className="text-sm font-medium">
              Your name
            </Label>
            <Input
              id="author"
              placeholder="Jane Doe"
              className={errors.author ? "border-destructive" : ""}
              {...register("author")}
            />
            {errors.author && (
              <p className="text-sm text-destructive">
                {errors.author.message}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Rating</Label>
            <StarRating
              value={rating}
              onChange={(v) => setValue("rating", v)}
            />
            {errors.rating && (
              <p className="text-sm text-destructive">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Great product!"
              className={errors.title ? "border-destructive" : ""}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Body */}
          <div className="space-y-1.5">
            <Label htmlFor="body" className="text-sm font-medium">
              Review
            </Label>
            <Textarea
              id="body"
              placeholder="Tell others what you think..."
              className={cn("resize-none", errors.body && "border-destructive")}
              rows={4}
              {...register("body")}
            />
            {errors.body && (
              <p className="text-sm text-destructive">{errors.body.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit review"}
          </Button>
        </form>
      </div>
    </div>
  );
}

// ---------- Features Tab ----------
function FeaturesTab({ features }: { features: Record<string, string> }) {
  const entries = Object.entries(features);

  if (entries.length === 0)
    return (
      <p className="text-sm text-muted-foreground py-4">
        No specifications available.
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0 pt-2">
      {entries.map(([key, value], i) => (
        <div
          key={key}
          className={cn(
            "flex justify-between py-2.5 text-sm border-b",
            i === entries.length - 1 &&
              entries.length % 2 !== 0 &&
              "sm:col-span-2",
          )}
        >
          <span className="text-muted-foreground font-medium">{key}</span>
          <span className="font-semibold text-right">{value}</span>
        </div>
      ))}
    </div>
  );
}

// ---------- Description Tab ----------
function DescriptionTab({
  description,
  images,
}: {
  description: string;
  images: string[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
      <p className="text-sm text-muted-foreground leading-relaxed self-center">
        {description}
      </p>

      {images[0] && (
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src={images[0]}
            alt="Product"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
    </div>
  );
}

// ---------- Page ----------
export default function Slug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data } = useQuery(GET_PRODUCT, { variables: { slug } });
  const product = data?.getProduct;
  const images = product?.images ?? [];
  const discounts = product?.discounts;
  const reviews = (product?.reviews ?? []) as {
    id: string;
    author: string;
    rating: number;
    title: string;
    body: string;
    createdAt: string;
  }[];

  // --- State for collapsible ---
  const [isOpen, setIsOpen] = useState(false);

  // --- Carousel sync ---
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi],
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbApi.scrollTo(index);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi || !thumbApi) return;
    onSelect();
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
    };
  }, [mainApi, thumbApi, onSelect]);

  // --- Discount logic ---
  const { activeDiscount, finalPrice, hasDiscount } = useMemo(() => {
    const basePrice = product?.price;
    const fallback = {
      activeDiscount: null,
      finalPrice: basePrice != null ? Number(basePrice).toFixed(2) : null,
      hasDiscount: false,
    };

    if (!discounts?.length || basePrice == null) return fallback;

    const now = new Date();
    const numericPrice = Number(basePrice);

    const activeDiscounts = discounts
      .map((pd) => pd.discount)
      .filter((d): d is NonNullable<typeof d> => d !== null && d.isActive)
      .filter((d) => {
        if (!d.startsAt && !d.endsAt) return true;
        if (!d.startsAt || !d.endsAt) return false;
        return new Date(d.startsAt) <= now && new Date(d.endsAt) >= now;
      });

    if (!activeDiscounts.length) return fallback;

    const bestDiscount = activeDiscounts.reduce((best, current) => {
      const saving = (d: typeof current) =>
        d.type === DiscountType.Percentage
          ? numericPrice * (Number(d.value) / 100)
          : Number(d.value);
      return saving(current) > saving(best) ? current : best;
    });

    let computed: number;
    if (bestDiscount.type === DiscountType.Percentage)
      computed = numericPrice * (1 - Number(bestDiscount.value) / 100);
    else if (bestDiscount.type === DiscountType.FixedAmount)
      computed = numericPrice - Number(bestDiscount.value);
    else computed = numericPrice;

    const finalPrice = Math.max(0, computed).toFixed(2);

    return {
      activeDiscount: {
        value: Number(bestDiscount.value),
        type: bestDiscount.type,
        name: bestDiscount.name,
      },
      finalPrice,
      hasDiscount: Math.abs(computed - numericPrice) > 0.001,
    };
  }, [discounts, product?.price]);

  const features = (product?.features ?? {}) as Record<string, string>;

  return (
    <section className="mx-auto max-w-5xl h-[calc(100dvh-64px)] p-4 sm:p-8">
      <ScrollArea className="h-[calc(100dvh-128px)] pr-2.5">
        <div className="flex mb-4">
          {/* Images */}
          <div className="w-2/3 flex gap-6 justify-center">
            <div className="flex items-center">
              <Carousel
                setApi={setThumbApi}
                orientation="vertical"
                opts={{
                  align: "start",
                  containScroll: "keepSnaps",
                  dragFree: true,
                }}
              >
                <CarouselContent>
                  {images.map((i, index) => (
                    <CarouselItem key={i}>
                      <button
                        type="button"
                        onClick={() => onThumbClick(index)}
                        className={cn(
                          "relative size-20 rounded-lg overflow-hidden ring-offset-2 transition-all",
                          index === selectedIndex && "ring-2 ring-primary",
                        )}
                      >
                        <Image
                          src={i}
                          alt={i}
                          fill
                          loading="eager"
                          sizes="80px"
                        />
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            <div className="px-16 flex justify-center items-center">
              <Carousel
                setApi={setMainApi}
                opts={{ align: "start" }}
                className="h-fit w-full max-w-xs"
              >
                <CarouselContent className="bg-indigo-500">
                  {images.map((i) => (
                    <CarouselItem key={i} className="flex justify-center">
                      <div className="relative size-70 rounded-lg overflow-hidden">
                        <Image
                          src={i}
                          alt={i}
                          fill
                          loading="eager"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          {/* Product card */}
          <div className="w-1/3 pt-3 flex items-center justify-center">
            <div className="relative">
              <Badge className="absolute -top-3 right-0">{product?.id}</Badge>

              <Card>
                <CardHeader>
                  <CardTitle>{product?.name}</CardTitle>
                  <CardDescription>{product?.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-1">
                  {hasDiscount && activeDiscount ? (
                    <div className="w-full px-4 pt-4 pb-6 flex-1 flex flex-col gap-1 items-start justify-center">
                      <div className="flex gap-3 items-center">
                        <span className="text-green-800 text-3xl font-bold">
                          $ {finalPrice}
                        </span>
                        <Badge variant="destructive" className="text-sm">
                          {activeDiscount.type === DiscountType.Percentage
                            ? `-${activeDiscount.value}%`
                            : `-$${activeDiscount.value}`}
                        </Badge>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-muted-foreground line-through">
                          $ {Number(product?.price).toFixed(2)}
                        </span>
                        <Badge variant="outline">{activeDiscount.name}</Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5">
                      <span className="text-3xl font-bold">
                        $ {Number(product?.price).toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-1 items-center justify-end">
                    <div
                      className={cn(
                        "size-2 rounded-full",
                        (product?.stock ?? 0) > 10
                          ? "bg-green-500"
                          : "bg-yellow-500",
                      )}
                    />
                    <span className="text-muted-foreground text-xs">
                      {(product?.stock ?? 0) > 10
                        ? `${product?.stock} units available`
                        : `Only ${product?.stock} left in stock`}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="gap-2 justify-center">
                  <Button>Add to Cart</Button>
                  <Button>Buy Now</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="bg-muted/30 rounded-lg border overflow-hidden"
        >
          <Tabs defaultValue="description" className="w-full px-4 py-2">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews
                  {reviews.length > 0 && (
                    <Badge variant="secondary" className="ml-1.5 text-xs">
                      {reviews.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isOpen ? "Hide details" : "Show details"}
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <TabsContent value="description">
                <DescriptionTab
                  description={product?.description ?? ""}
                  images={images}
                />
              </TabsContent>

              <TabsContent value="features">
                <FeaturesTab features={features} />
              </TabsContent>

              <TabsContent value="reviews">
                <ReviewsTab reviews={reviews} productId={product?.id ?? ""} />
              </TabsContent>
            </CollapsibleContent>
          </Tabs>
        </Collapsible>
      </ScrollArea>
    </section>
  );
}

// "use client";

// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselApi,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { GET_PRODUCT } from "@/src/lib/queries/product";
// import { useQuery } from "@apollo/client/react";
// import Image from "next/image";
// import { use, useCallback, useEffect, useMemo, useState } from "react";
// import { DiscountType } from "@/src/types/__generated__/graphql";
// import { Button } from "@/components/ui/button";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { cn } from "@/src/lib/utils";

// const items = [
//   {
//     value: "overview",
//     trigger: "How does billing work?",
//     content:
//       "We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support, and unlimited team members.",
//   },
//   {
//     value: "analytics",
//     trigger: "Is my data secure?",
//     content:
//       "Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits. All data is encrypted at rest and in transit using industry-standard protocols.",
//   },
//   {
//     value: "reports",
//     trigger: "What integrations do you support?",
//     content:
//       "We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more. You can also build custom integrations using our REST API and webhooks.",
//   },
// ];

// export default function Slug({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = use(params);
//   const { data } = useQuery(GET_PRODUCT, { variables: { slug } });
//   const product = data?.getProduct;
//   const images = product?.images;
//   const discounts = product?.discounts;

//   // --- Sincronización de carousels ---
//   const [mainApi, setMainApi] = useState<CarouselApi>();
//   const [thumbApi, setThumbApi] = useState<CarouselApi>();
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   // Click en una miniatura -> mueve el carousel principal
//   const onThumbClick = useCallback(
//     (index: number) => {
//       if (!mainApi || !thumbApi) return;
//       mainApi.scrollTo(index);
//     },
//     [mainApi, thumbApi],
//   );

//   // El carousel principal informa el índice activo al de miniaturas
//   const onSelect = useCallback(() => {
//     if (!mainApi || !thumbApi) return;
//     const index = mainApi.selectedScrollSnap();
//     setSelectedIndex(index);
//     thumbApi.scrollTo(index);
//   }, [mainApi, thumbApi]);

//   useEffect(() => {
//     if (!mainApi || !thumbApi) return;

//     onSelect();
//     mainApi.on("select", onSelect);
//     mainApi.on("reInit", onSelect);

//     return () => {
//       mainApi.off("select", onSelect);
//       mainApi.off("reInit", onSelect);
//     };
//   }, [mainApi, thumbApi, onSelect]);
//   // --- Fin sincronización ---

//   const { activeDiscount, finalPrice, hasDiscount } = useMemo(() => {
//     const basePrice = product?.price;

//     const fallback = {
//       activeDiscount: null,
//       finalPrice: basePrice != null ? Number(basePrice).toFixed(2) : null,
//       hasDiscount: false,
//     };

//     if (!discounts?.length || basePrice == null) return fallback;

//     const now = new Date();
//     const numericPrice = Number(basePrice); // Decimal de Prisma → number

//     const activeDiscounts = discounts
//       .map((pd) => pd.discount)
//       .filter((d): d is NonNullable<typeof d> => d !== null && d.isActive)
//       .filter((d) => {
//         // Sin fechas = descuento permanente → siempre activo ✅
//         if (!d.startsAt && !d.endsAt) return true;
//         // Con fechas = verificar rango
//         if (!d.startsAt || !d.endsAt) return false; // Incompleto → inválido
//         return new Date(d.startsAt) <= now && new Date(d.endsAt) >= now;
//       });

//     if (!activeDiscounts.length) return fallback;

//     // "Highest discount wins" — espejo de resolveEffectivePrice del backend
//     const bestDiscount = activeDiscounts.reduce((best, current) => {
//       const saving = (d: typeof current) =>
//         d.type === DiscountType.Percentage
//           ? numericPrice * (Number(d.value) / 100)
//           : Number(d.value);

//       return saving(current) > saving(best) ? current : best;
//     });

//     let computed: number;

//     if (bestDiscount.type === DiscountType.Percentage) {
//       computed = numericPrice * (1 - Number(bestDiscount.value) / 100);
//     } else if (bestDiscount.type === DiscountType.FixedAmount) {
//       computed = numericPrice - Number(bestDiscount.value);
//     } else {
//       computed = numericPrice;
//     }

//     const finalPrice = Math.max(0, computed).toFixed(2);

//     return {
//       activeDiscount: {
//         value: Number(bestDiscount.value),
//         type: bestDiscount.type,
//         name: bestDiscount.name,
//       },
//       finalPrice,
//       // Comparación numérica para evitar errores de floating point
//       hasDiscount: Math.abs(computed - numericPrice) > 0.001,
//     };
//   }, [discounts, product?.price]);

//   return (
//     <section className="mx-auto max-w-5xl h-[calc(100dvh-64px)] p-4 sm:p-8 space-y-4">
//       <div className="flex gap-4">
//         <div className="w-2/3 py-20 flex justify-center">
//           <div className="flex items-center">
//             <Carousel
//               setApi={setThumbApi}
//               orientation="vertical"
//               opts={{
//                 align: "start",
//                 containScroll: "keepSnaps",
//                 dragFree: true,
//               }}
//             >
//               <CarouselContent>
//                 {images?.map((i, index) => (
//                   <CarouselItem key={i}>
//                     <button
//                       type="button"
//                       onClick={() => onThumbClick(index)}
//                       className={cn(
//                         "relative size-20 rounded-lg overflow-hidden ring-offset-2 transition-all",
//                         index === selectedIndex && "ring-2 ring-primary",
//                       )}
//                     >
//                       <Image
//                         src={i}
//                         alt={i}
//                         fill={true}
//                         loading="eager"
//                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                       />
//                     </button>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>

//               <CarouselPrevious />
//               <CarouselNext />
//             </Carousel>
//           </div>

//           <div className="px-16 flex justify-center">
//             <Carousel
//               setApi={setMainApi}
//               opts={{ align: "start" }}
//               className="w-full max-w-xs"
//             >
//               <CarouselContent>
//                 {images?.map((i) => (
//                   <CarouselItem key={i} className="flex justify-center">
//                     <div className="relative size-70 rounded-lg overflow-hidden">
//                       <Image
//                         src={i}
//                         alt={i}
//                         fill={true}
//                         loading="eager"
//                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                       />
//                     </div>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>

//               <CarouselPrevious />
//               <CarouselNext />
//             </Carousel>
//           </div>
//         </div>

//         <div className="w-1/3 flex items-center justify-center">
//           <div className="relative">
//             <Badge className="absolute -top-3 right-0">{product?.id}</Badge>

//             <Card>
//               <CardHeader>
//                 <CardTitle>{product?.name}</CardTitle>
//                 <CardDescription>{product?.description}</CardDescription>
//               </CardHeader>

//               <CardContent className="flex-1 space-y-1">
//                 {hasDiscount && activeDiscount ? (
//                   <div className="w-full px-4 pt-4 pb-6 flex-1 flex flex-col gap-1 items-start justify-center">
//                     <div className="flex gap-3 items-center">
//                       <span className="text-green-800 text-3xl font-bold">
//                         $ {finalPrice}
//                       </span>

//                       <Badge variant="destructive" className="text-sm">
//                         {activeDiscount.type === DiscountType.Percentage
//                           ? `-${activeDiscount.value}%`
//                           : `-$${activeDiscount.value}`}
//                       </Badge>
//                     </div>

//                     <div className="flex gap-2 items-center">
//                       <span className="text-muted-foreground line-through">
//                         $ {product?.price?.toFixed(2)}
//                       </span>

//                       <Badge variant="outline">{activeDiscount.name}</Badge>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="p-5">
//                     <span className="text-3xl font-bold">
//                       $ {product?.price?.toFixed(2)}
//                     </span>
//                   </div>
//                 )}

//                 <div className="flex gap-1 items-center justify-end">
//                   <div
//                     className={`size-2 rounded-full ${
//                       (product?.stock ?? 0) > 10
//                         ? "bg-green-500"
//                         : "bg-yellow-500"
//                     }`}
//                   />

//                   <span className="text-muted-foreground text-xs">
//                     {(product?.stock ?? 0) > 10
//                       ? `${product?.stock} units available`
//                       : `Only ${product?.stock} left in stock`}
//                   </span>
//                 </div>
//               </CardContent>

//               <CardFooter className="gap-2 justify-center">
//                 <Button>Add to Cart</Button>
//                 <Button>Buy Now</Button>
//               </CardFooter>
//             </Card>
//           </div>
//         </div>
//       </div>

//       <Accordion type="single" collapsible className="rounded-lg border">
//         <AccordionItem value="info" className="border-b px-4 last:border-b-0">
//           <Tabs defaultValue="description">
//             <div className="py-1 flex items-center justify-between">
//               <TabsList>
//                 <TabsTrigger value="description">Description</TabsTrigger>
//                 <TabsTrigger value="features">Features</TabsTrigger>
//                 <TabsTrigger value="reviews">Reviews</TabsTrigger>
//               </TabsList>

//               <AccordionTrigger />
//             </div>

//             <AccordionContent>
//               {items.map((item) => (
//                 <TabsContent key={item.value} value={String(item.value)}>
//                   {item.content}
//                 </TabsContent>
//               ))}
//             </AccordionContent>
//           </Tabs>
//         </AccordionItem>
//       </Accordion>
//     </section>
//   );
// }
