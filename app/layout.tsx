import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootLayoutContent from "./components/RootLayoutContent";
import Head from "next/head";
import { Toaster } from "@/components/ui/sonner";
import EquallyWidget from "./components/EquallyWidget";
import Script from "next/script";

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
        <Script id="equally-widget" strategy="afterInteractive">
          {`
        document.addEventListener('load', function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "https://widget.prod.equally.ai/equally-widget.min.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'equallyWidget'));

        if (!window.EQUALLY_AI_API_KEY) {
          window.EQUALLY_AI_API_KEY = "6feaa3x4esj5fc2w83fawzkf4d56qq1f";
          const intervalId = setInterval(function() {
            if (window.EquallyAi) {
              clearInterval(intervalId);
              window.EquallyAi = new EquallyAi();
            }
          }, 500);
        }
      `}
        </Script>
      </Head>
      <body
        className={`${inter.variable} min-h-[100dvh] max-w-[2300px] mx-auto bg-pry/10`}
      >
        <RootLayoutContent>{children}</RootLayoutContent>
        {/* <EquallyWidget /> */}
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
