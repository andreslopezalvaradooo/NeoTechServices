"use client";

import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button, buttonVariants } from "../ui/button";
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
import { usePathname } from "next/navigation";
import { useSession } from "@/src/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { DropdownMenuAvatar } from "./menu-avatar";

interface NavLink {
  label: string;
  href: string;
}

const LINKS_BY_PATH: Record<string, NavLink[]> = {
  "/": [
    { label: "Services", href: "#services" },
    { label: "Features", href: "#features" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  "/repair": [
    { label: "What we repair", href: "#what-we-repair" },
    { label: "Process", href: "#process" },
    { label: "Pricing", href: "#pricing" },
    { label: "Warranty", href: "#warranty" },
    { label: "FAQ", href: "#faq" },
    { label: "Request", href: "#request" },
  ],
  "/consulting": [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Request", href: "#request" },
  ],
};

const DEFAULT_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Repair", href: "/repair" },
  { label: "Store", href: "/store" },
];

function useNavLinks(): NavLink[] {
  const pathname = usePathname();
  return LINKS_BY_PATH[pathname] ?? DEFAULT_LINKS;
}

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
  const links = useNavLinks();

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
          {links.map((link) => (
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
  const links = useNavLinks();
  const { data: session, isPending, error } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="h-16 mx-auto max-w-5xl px-4 lg:px-8 flex items-center justify-between">
        <Logo />

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {links.map((link) => (
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

        <div className="hidden lg:flex items-center gap-2">
          {isPending ? (
            <div className={buttonVariants({ variant: "ghost" })}>
              <Spinner />
            </div>
          ) : !session?.user ? (
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "ghost" })}
            >
              Sign In
            </Link>
          ) : null}

          <Link
            href="/store"
            className={buttonVariants({ variant: "default" })}
          >
            View Catalog
          </Link>
        </div>

        {!isPending && session?.user && <DropdownMenuAvatar />}

        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export function Navbar() {
  return <DesktopNav />;
}
