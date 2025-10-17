import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/useQueryProvider";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRM __ ZAP",
  description: "Sistema de gestao de conversas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.className} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
