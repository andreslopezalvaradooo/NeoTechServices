import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button, buttonVariants } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu03Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/src/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] satisfies NavLink[];

function Logo() {
  return (
    <Link
      href="/"
      aria-label="NeoTech Services — Home"
      className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight"
    >
      <Image width={30} height={30} src="/NTS-logo.svg" alt="" aria-hidden />
      NeoTech
      <span className="text-muted-foreground font-normal">Services</span>
    </Link>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" aria-label="Open navigation menu">
          <HugeiconsIcon icon={Menu03Icon} strokeWidth={3} aria-hidden />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <SheetClose asChild>
              <Logo />
            </SheetClose>
          </SheetTitle>

          <SheetDescription className="sr-only">
            Navigation menu
          </SheetDescription>
        </SheetHeader>

        <nav
          className="h-full flex flex-col gap-4 justify-center items-center"
          aria-label="Mobile navigation"
        >
          {LINKS.map((link) => (
            <SheetClose key={link.label} asChild>
              <Link href={link.href} className={navigationMenuTriggerStyle()}>
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <SheetFooter>
          <SheetClose asChild>
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "ghost" })}
            >
              Sign In
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href="/store" className={buttonVariants()}>
              View Catalog
            </Link>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function DesktopNav() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="h-16 mx-auto max-w-6xl px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Links */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {LINKS.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-transparent",
                  )}
                >
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/sign-in"
            className={buttonVariants({ variant: "ghost" })}
          >
            Sign In
          </Link>

          <Link
            href="/store"
            className={buttonVariants({ variant: "default" })}
          >
            View Catalog
          </Link>
        </div>

        {/* Mobile trigger */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export function Navbar() {
  return <DesktopNav />;
}
