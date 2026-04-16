export function GlowBlobs() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-2/3 w-2/3 rounded-full bg-primary/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-1/3 w-1/3 rounded-full bg-blue-500/10 blur-[120px]"
      />
    </>
  );
}
