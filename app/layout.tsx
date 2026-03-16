import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-headers",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-ui",
  subsets: ["latin"],
});

const SITE_URL = "https://sandrogegechkori.com";

const description =
  "Official website of Sandro Gegechkori — Georgian concert pianist, Juilliard graduate, and winner of the Maria Canals International Competition. Performances across Europe, the Americas, and Asia.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sandro Gegechkori — Georgian Concert Pianist",
    template: "%s | Sandro Gegechkori",
  },
  description,
  keywords: [
    "Sandro Gegechkori",
    "Georgian concert pianist",
    "classical pianist",
    "piano",
    "Juilliard",
    "Maria Canals",
    "classical music",
    "Georgian musician",
    "concert pianist",
    "Forbes 30 under 30",
  ],
  authors: [{ name: "Sandro Gegechkori", url: SITE_URL }],
  creator: "Luka Ramishvili",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Sandro Gegechkori",
    title: "Sandro Gegechkori — Georgian Concert Pianist",
    description,
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Sandro Gegechkori — Georgian Concert Pianist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandro Gegechkori — Georgian Concert Pianist",
    description,
    images: ["/hero.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sandro Gegechkori",
  jobTitle: "Concert Pianist",
  nationality: "Georgian",
  url: SITE_URL,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "The Juilliard School",
  },
  award: [
    "First Prize — Maria Canals International Music Competition (2021)",
    "Grand Prix — Feurich Vienna International Piano & Chamber Music Competition (2018)",
    "First Prize — Euregio International Piano Award Competition (2025)",
    "First Prize — Arno Babajanyan International Piano Competition (2015)",
    "Forbes 30 Under 30 — Culture & Style (2023)",
  ],
  sameAs: [
    "https://www.instagram.com/gegechkor/",
    "https://www.youtube.com/@sandrogegechkori531",
    "https://www.facebook.com/sandro.gegechkori.10/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${ebGaramond.variable} ${montserrat.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
