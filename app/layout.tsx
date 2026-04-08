import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const SITE_URL = "https://combiencagagne.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Combien Ça Gagne — Le podcast qui parle d'argent sans tabou",
    template: "%s — Combien Ça Gagne",
  },
  description:
    "Chaque semaine, Clémence Lepic reçoit un professionnel qui révèle combien il gagne vraiment. Salaires, revenus, marges : tout est sur la table.",
  openGraph: {
    siteName: "Combien Ça Gagne",
    locale: "fr_FR",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "Combien Ça Gagne — Le podcast qui parle d'argent sans tabou",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@combiencagagne",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
