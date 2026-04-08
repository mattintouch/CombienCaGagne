import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Combien Ça Gagne — Le podcast qui parle d'argent sans tabou",
    template: "%s — Combien Ça Gagne",
  },
  description:
    "Chaque semaine, Clémence Lepic reçoit un professionnel qui révèle combien il gagne vraiment. Salaires, revenus, marges : tout est sur la table.",
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
      </body>
    </html>
  );
}
