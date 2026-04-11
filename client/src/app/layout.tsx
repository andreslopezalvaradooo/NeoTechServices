import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ApolloWrapper } from "../lib/apollo-wrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme/theme-provider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "NeoTech Services",
  description: "NeoTech Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ApolloWrapper>
            <TooltipProvider>{children}</TooltipProvider>
          </ApolloWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
