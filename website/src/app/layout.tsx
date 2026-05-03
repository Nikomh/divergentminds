import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Divergent Minds Berlin",
  description: "Gemeinsam ADHS meistern – vernetzt, gestärkt, informiert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={cn(geistSans.variable, geistMono.variable)}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
