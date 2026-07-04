import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { content } from "@/config/content";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${content.couple.groom} & ${content.couple.bride} | Wedding Invitation`,
  description:
    "You are cordially invited to celebrate the wedding of Ravi & Rudrakshi in the mountains of Uttarakhand.",
  openGraph: {
    title: `${content.couple.groom} & ${content.couple.bride}`,
    description:
      "You are cordially invited to celebrate the wedding of Ravi & Rudrakshi in the mountains of Uttarakhand.",
    url: "https://wedding-invitation-example.com",
    siteName: `${content.couple.groom} & ${content.couple.bride}`,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${content.couple.groom} & ${content.couple.bride} Wedding`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full bg-ivory text-charcoal paper-texture">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
