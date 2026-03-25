import { TrackForm } from "@/components/dashboard/track-form";

export default function TrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="mx-auto max-w-6xl p-4 md:p-8 space-y-4"
      aria-labelledby="find-repair-heading"
    >
      <div className="w-full flex flex-col sm:flex-row gap-4">
        <div className="w-full flex flex-col gap-3">
          <h2
            id="find-repair-heading"
            className="text-4xl font-bold tracking-tight"
          >
            Track
            <br />
            <span className="text-muted-foreground">your repair.</span>
          </h2>
          
          <p className="max-w-md text-muted-foreground text-lg leading-relaxed">
            Enter your ticket code to find the status of your repair.
          </p>
        </div>

        <TrackForm />
      </div>

      {children}
    </section>
  );
}
