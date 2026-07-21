import type { Metadata } from "next";
import { Open_Sans, Oswald } from "next/font/google";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// Site-wide ISR default: Supabase-backed content re-fetches at most
// once per minute; everything else stays static.
export const revalidate = 60;

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://willohill.com";
const SITE_DESCRIPTION =
  "Willo-Hill Baptist Church — Following Christ Together. Located in Willoughby, OH. Join us Sundays at 10:45am.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Willo-Hill Baptist Church",
    template: "%s | Willo-Hill Baptist Church",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Willo-Hill Baptist Church",
    title: "Willo-Hill Baptist Church",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/images/hero-1.jpg", width: 1024, height: 683 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Willo-Hill Baptist Church",
    description: SITE_DESCRIPTION,
    images: ["/images/hero-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${oswald.variable} ${openSans.variable}`}>
      <body>
        <header className="sticky top-0 z-50">
          <AnnouncementBar />
          <Navbar />
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
