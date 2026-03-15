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

export const metadata: Metadata = {
  title: "Sandro Gegechkori",
  description:
    "Personal website of renowned georgian pianist Sandro Gegechkori",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${ebGaramond.variable} ${montserrat.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
