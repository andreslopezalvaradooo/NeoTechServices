import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui/spinner";

export function ProductSkeleton() {
  return (
    <li>
      <Card className="relative mx-auto w-full h-full max-w-sm pt-0">
        <Skeleton className="relative z-20 aspect-video w-full" />

        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5" />
          </CardTitle>

          <CardDescription>
            <Skeleton className="h-18 mt-2" />
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex items-end justify-end">
          <Skeleton className="h-6 w-24" />
        </CardContent>

        <CardFooter>
          <Button className="w-full">
            <Spinner />
          </Button>
        </CardFooter>
      </Card>
    </li>
  );
}
