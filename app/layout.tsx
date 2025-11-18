import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootLayoutContent from "./components/RootLayoutContent";
import Head from "next/head";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlignHR",
  description: "Built for growing teams.",
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
        <meta name="description" content="Built for growing teams." />

        {/* Open Graph */}
        <meta property="og:url" content="https://align-hr.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AlignHR" />
        <meta property="og:description" content="Built for growing teams." />
        <meta
          property="og:image"
          content="https://opengraph.b-cdn.net/production/images/25a1c410-957f-4d4f-8ad5-b638f2c9a12d.png?token=moEykyaLjx6dttL2dHAf7U4qLEuNul6OH5aVajVDse8&height=584&width=1200&expires=33299459070"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="align-hr.vercel.app" />
        <meta property="twitter:url" content="https://align-hr.vercel.app/" />
        <meta name="twitter:title" content="AlignHR" />
        <meta name="twitter:description" content="Built for growing teams." />
        <meta
          name="twitter:image"
          content="https://opengraph.b-cdn.net/production/images/25a1c410-957f-4d4f-8ad5-b638f2c9a12d.png?token=moEykyaLjx6dttL2dHAf7U4qLEuNul6OH5aVajVDse8&height=584&width=1200&expires=33299459070"
        />
      </Head>
      <body
        className={`${inter.variable} min-h-[100dvh] max-w-[2300px] mx-auto bg-pry/10`}
      >
        <RootLayoutContent>{children}</RootLayoutContent>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "white",
              border: "none",
              borderRadius: "50px",
              color: "black",
            },
          }}
        />
      </body>
    </html>
  );
}
