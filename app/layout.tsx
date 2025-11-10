import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootLayoutContent from "./components/RootLayoutContent";

const inter = Inter({
  variable: "--inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlignHR",
  description:
    "AlignHR is built for growing teams, it brings together HR operations, performance insights, and employee management tools helping your organisation stay aligned.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen bg-pry/10`}>
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}
