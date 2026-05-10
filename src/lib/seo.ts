import type { Metadata } from "next";
import { siteInfo } from "./siteInfo";

export function buildMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  if (
    process.env.NODE_ENV === "development" &&
    (description.length < 120 || description.length > 160)
  ) {
    throw new Error(
      `SEO description must be 120–160 chars. Got ${description.length} for "${title}".`
    );
  }

  const url = `${siteInfo.url}${path}`;

  return {
    title: `${title} | Twin Falls Hardware & Supply`,
    description,
    metadataBase: new URL(siteInfo.url),
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Twin Falls Hardware & Supply`,
      description,
      url,
      siteName: siteInfo.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${siteInfo.url}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: siteInfo.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Twin Falls Hardware & Supply`,
      description,
      images: [`${siteInfo.url}/og-image.jpg`],
    },
  };
}
