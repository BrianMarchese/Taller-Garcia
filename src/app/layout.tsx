import type { Metadata } from "next";
import {  Open_Sans } from "next/font/google";
import "./globals.css";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taller Garcia Hermanos",
  description: "Taller Mecánico Automotriz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
