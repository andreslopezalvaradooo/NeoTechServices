import React from "react";

export default function RepairsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="mx-auto max-w-6xl p-4 md:p-8 space-y-4"
      aria-labelledby="my-repairs-heading"
    >
      <div className="flex flex-col gap-2">
        <h2
          id="my-repairs-heading"
          className="text-4xl font-bold tracking-tight"
        >
          My
          <br />
          <span className="text-muted-foreground">repairs.</span>
        </h2>

        <p className="max-w-md text-muted-foreground text-lg leading-relaxed">
          All your repair requests in one place.
        </p>
      </div>

      {children}
    </section>
  );
}
