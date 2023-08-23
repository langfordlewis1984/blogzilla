import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Handjet } from "next/font/google";

const handjet = Handjet({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogzilla",
  description:
    "A massive and overwhelming blog that takes over the internet like a monster.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={handjet.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
