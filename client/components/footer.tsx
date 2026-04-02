import Link from "next/link";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon } from "@hugeicons/core-free-icons";

interface NavItem {
  label: string;
  href: string;
}

const SERVICES = [
  { label: "Laptop Repair", href: "#services" },
  { label: "PC Repair", href: "#services" },
  { label: "Technical Consulting", href: "#services" },
  { label: "Web App Development", href: "#services" },
  { label: "Electronics Sales", href: "#services" },
] satisfies NavItem[];

const COMPANY = [
  { label: "About", href: "#" },
  { label: "Catalog", href: "/catalog" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Tech Blog", href: "#" },
] satisfies NavItem[];

const LEGAL = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Warranty", href: "#" },
  { label: "Cookies", href: "#" },
] satisfies NavItem[];

const WHATSAPP_URL = "https://wa.me/573000000000";

function Nav({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <nav aria-label={title}>
      <p className="text-sm font-semibold mb-4">{title}</p>

      <ul className="space-y-1">
        {items.map((item) => (
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
    </nav>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-br from-[oklch(0.87_0.12_207)]/15 to-[oklch(0.87_0.12_207)]/5 border-t border-border">
      <div className="mx-auto max-w-5xl p-4 sm:p-8 space-y-4">
        <div className="grid gap-4 sm:gap-8 grid-cols-2 md:grid-cols-4">
          <div className="space-y-2 sm:space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-md text-primary tracking-tight"
              aria-label="NeoTech Services — Home"
            >
              <Image
                width={25}
                height={25}
                src="/NTS-logo.svg"
                alt=""
                aria-hidden
              />
              NeoTech
              <span className="text-muted-foreground font-normal">
                Services
              </span>
            </Link>

            <p className="max-w-3xs text-sm text-muted-foreground leading-relaxed">
              Your technology ally in Bogotá. Repair, consulting, development,
              and electronics with warranty since 2016.
            </p>

            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <HugeiconsIcon
                icon={WhatsappIcon}
                strokeWidth={2}
                size={18}
                className="text-emerald-500"
                aria-hidden
              />
              +57 300 000 0000
            </Link>
          </div>

          <Nav title="Services" items={SERVICES} />
          <Nav title="Company" items={COMPANY} />
          <Nav title="Legal" items={LEGAL} />
        </div>

        <Separator aria-hidden />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center">
            © {currentYear} NeoTechServices. All rights reserved. · Bogotá,
            Colombia.
          </p>

          <p className="text-xs text-muted-foreground">
            Made with ❤️ in Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
