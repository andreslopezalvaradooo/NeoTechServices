import Link from "next/link";
import { Separator } from "./ui/separator";
import { buttonVariants } from "./ui/button";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight cursor-default"
            >
              <Image width={30} height={30} src="/NTS-logo.svg" alt="logo" />
              NeoTech
              <span className="text-muted-foreground font-normal">
                Services
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your technology ally in Bogotá. Repair, consulting, development,
              and electronics with warranty since 2016.
            </p>

            <Link
              href="https://wa.me/573000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                className="h-4 w-4 text-emerald-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              +57 300 000 0000
            </Link>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <p className="text-sm font-semibold">Services</p>

            <ul className="space-y-2.5">
              {[
                "Laptop Repair",
                "PC Repair",
                "Technical Consulting",
                "Web App Development",
                "Electronics Sales",
              ].map((s) => (
                <li key={s}>
                  <Link
                    href="#services"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <p className="text-sm font-semibold">Company</p>

            <ul className="space-y-2.5">
              {[
                { label: "About", href: "#" },
                { label: "Catalog", href: "/catalog" },
                { label: "Pricing", href: "#pricing" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Tech Blog", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <p className="text-sm font-semibold">Legal</p>

            <ul className="space-y-2.5">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Warranty",
                "Cookies",
              ].map((s) => (
                <li key={s}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NeoTechServices. All rights reserved. ·
            Bogotá, Colombia.
          </p>

          <p className="text-xs text-muted-foreground">
            Made with ❤️ in Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
