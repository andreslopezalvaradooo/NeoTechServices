export function GridOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
      style={{
        backgroundImage:
          "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  );
}
