import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
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
import { Menu } from "@hugeicons/core-free-icons";
import { cn } from "@/src/lib/utils";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm transition-all duration-300">
      <nav className="h-16 mx-auto max-w-7xl px-6 lg:px-8 flex justify-between">
        {/* Logo */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  "hover:bg-transparent",
                )}
              >
                <Link
                  href="/"
                  className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight cursor-default"
                >
                  <Image
                    width={30}
                    height={30}
                    src="/NTS-logo.svg"
                    alt="logo"
                  />
                  NeoTech
                  <span className="text-muted-foreground font-normal">
                    Services
                  </span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Links */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-4">
            {NAV_LINKS.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
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
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  href="/sign-in"
                  className={buttonVariants({ variant: "ghost" })}
                >
                  Sign In
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  href="/store"
                  className={buttonVariants({ variant: "default" })}
                >
                  View Catalog
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon">
                <HugeiconsIcon icon={Menu} strokeWidth={3} />
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-default"
                    >
                      <span className={buttonVariants()}>N</span>
                      NeoTech
                      <span className="text-muted-foreground font-normal">
                        Services
                      </span>
                    </Link>
                  </SheetClose>

                  <SheetDescription className="sr-only"></SheetDescription>
                </SheetTitle>
              </SheetHeader>

              <nav className="h-full flex flex-col gap-4 justify-center items-center">
                {NAV_LINKS.map((link) => (
                  <SheetClose key={link.label} asChild>
                    <Link
                      href={link.href}
                      className={navigationMenuTriggerStyle()}
                    >
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
        </div>
      </nav>
    </header>
  );
}
