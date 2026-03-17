import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/src/lib/utils";

function Spinner({
  className,
  strokeWidth,
  ...props
}: Omit<React.ComponentProps<"svg">, "strokeWidth"> & {
  strokeWidth?: number;
}) {
  return (
    <HugeiconsIcon
      icon={Loading03Icon}
      strokeWidth={strokeWidth ?? 2}
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
