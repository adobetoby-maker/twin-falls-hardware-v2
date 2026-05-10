import type { Metadata } from "next";
import { Roboto_Condensed, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import JsonLd from "@/components/JsonLd";
import PromoBar from "@/components/PromoBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteInfo } from "@/lib/siteInfo";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-roboto-condensed",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "Twin Falls Hardware & Supply — Open Since 1987",
  description: siteInfo.description,
  metadataBase: new URL(siteInfo.url),
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HardwareStore"],
  name: siteInfo.name,
  url: siteInfo.url,
  telephone: siteInfo.phoneTel,
  email: siteInfo.email,
  image: `${siteInfo.url}/og-image.jpg`,
  priceRange: "$–$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2180 Addison Ave W",
    addressLocality: siteInfo.city,
    addressRegion: siteInfo.state,
    postalCode: siteInfo.zip,
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteInfo.coordinates.lat,
    longitude: siteInfo.coordinates.lng,
  },
  openingHours: ["Mo-Sa 07:00-18:00", "Su 09:00-16:00"],
  foundingDate: siteInfo.founded.toString(),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${robotoCondensed.variable} ${sourceSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-(--color-warm-white)">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white px-4 py-2 rounded shadow"
        >
          Skip to main content
        </a>
        <JsonLd schema={localBusinessSchema} />
        <CartProvider>
          <PromoBar />
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
