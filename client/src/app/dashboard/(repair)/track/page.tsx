import { Card, CardContent } from "@/components/ui/card";

export default function Track() {
  return (
    <Card>
      <CardContent className="grid place-items-center min-h-40">
        <p className="text-sm text-muted-foreground">
          Results will appear here
        </p>
      </CardContent>
    </Card>
  );
}
