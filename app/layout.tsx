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
    "Built for growing teams, it brings together HR operations, performance insights, and employee management.",
  openGraph: {
    url: "https://align-hr.vercel.app/",
    type: "website",
    title: "AlignHR",
    description:
      "Built for growing teams, it brings together HR operations, performance insights, and employee management.",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/25a1c410-957f-4d4f-8ad5-b638f2c9a12d.png?token=wA1CMwma51D3ArYbULFo-LB3OgsvKBsu-MZGH4PH51I&height=584&width=1200&expires=33298805119",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlignHR",
    description:
      "Built for growing teams, it brings together HR operations, performance insights, and employee management.",
    images: [
      "https://opengraph.b-cdn.net/production/images/25a1c410-957f-4d4f-8ad5-b638f2c9a12d.png?token=wA1CMwma51D3ArYbULFo-LB3OgsvKBsu-MZGH4PH51I&height=584&width=1200&expires=33298805119",
    ],
    site: "https://align-hr.vercel.app",
  },
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
