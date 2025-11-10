import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootLayoutContent from "./components/RootLayoutContent";
import Head from "next/head";

const inter = Inter({
  variable: "--inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlignHR",
  description:
    "Built for growing teams, it brings together HR operations, performance insights, and employee management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>AlignHR</title>
        <meta
          name="description"
          content="Built for growing teams, it brings together HR operations, performance insights, and employee management."
        />

        {/* Open Graph */}
        <meta property="og:url" content="https://align-hr.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AlignHR" />
        <meta
          property="og:description"
          content="Built for growing teams, it brings together HR operations, performance insights, and employee management."
        />
        <meta
          property="og:image"
          content="https://opengraph.b-cdn.net/production/images/25a1c410-957f-4d4f-8ad5-b638f2c9a12d.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="align-hr.vercel.app" />
        <meta property="twitter:url" content="https://align-hr.vercel.app/" />
        <meta name="twitter:title" content="AlignHR" />
        <meta
          name="twitter:description"
          content="Built for growing teams, it brings together HR operations, performance insights, and employee management."
        />
        <meta
          name="twitter:image"
          content="https://opengraph.b-cdn.net/production/images/25a1c410-957f-4d4f-8ad5-b638f2c9a12d.png"
        />
      </Head>
      <body className={`${inter.variable} min-h-screen bg-pry/10`}>
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}
