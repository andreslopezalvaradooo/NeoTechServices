import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ApolloWrapper } from "../lib/apollo-wrapper";

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
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body>
        <ApolloWrapper>
          <Navbar />
          {children}
          <Footer />
        </ApolloWrapper>
      </body>
    </html>
  );
}
