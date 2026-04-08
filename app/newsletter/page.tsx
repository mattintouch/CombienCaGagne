import type { Metadata } from "next";
import Link from "next/link";
import NewsletterPageForm from "@/components/NewsletterPageForm";

export const metadata: Metadata = {
  title: "Newsletter — Les vrais chiffres, chaque mercredi",
  description:
    "Inscrivez-vous à la newsletter Combien Ça Gagne : chaque semaine, les chiffres clés d'un métier décrypté par Clémence Lepic. Gratuit, sans spam.",
  alternates: { canonical: "https://combiencagagne.fr/newsletter" },
};

const benefits = [
  "Le résumé de chaque épisode avec les chiffres clés à retenir",
  "Un bonus exclusif : coulisses, données complémentaires, sources",
  "Des conseils pour mieux comprendre les réalités financières des métiers",
  "Zéro spam — 1 email par semaine, désinscription en 1 clic",
];

const pastIssues = [
  {
    title: "#42 — Chirurgien esthétique : 850K€ de CA mais combien en poche ?",
    date: "20 mars 2025",
  },
  {
    title: "#41 — Boulanger artisan : la vérité sur la marge d'une baguette",
    date: "13 mars 2025",
  },
  {
    title: "#40 — Avocate d'affaires : de 4 500€ à 35 000€/mois, le grand écart",
    date: "6 mars 2025",
  },
];

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      {/* ── Hero ── */}
      <section className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Newsletter gratuite
        </p>
        <h1 className="mt-4 font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
          Les vrais chiffres,
          <br />
          <span className="italic text-accent">chaque mercredi.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted">
          Chaque semaine, Clémence décrypte un métier : CA, charges, bénéfice
          net. Sans langue de bois.
        </p>
      </section>

      {/* ── Bénéfices ── */}
      <section className="mt-12">
        <ul className="space-y-4">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                <svg
                  className="h-3 w-3 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span className="text-base text-foreground">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Formulaire ── */}
      <section className="mt-12 rounded-2xl bg-foreground p-8 text-white sm:p-10">
        <h2 className="text-center font-serif text-2xl tracking-tight">
          Rejoignez <span className="font-mono text-accent">5 000+</span> auditeurs déjà
          abonnés
        </h2>

        <NewsletterPageForm />

        <p className="mt-4 text-center text-xs text-white/50">
          Gratuit · 1 email par semaine · Désabonnement en 1 clic
        </p>
      </section>

      {/* ── Derniers numéros ── */}
      <section className="mt-16">
        <h2 className="font-serif text-xl">Derniers numéros</h2>
        <div className="mt-6 space-y-4">
          {pastIssues.map((issue) => (
            <div
              key={issue.title}
              className="rounded-xl border border-border bg-white p-5"
            >
              <p className="font-semibold leading-snug">{issue.title}</p>
              <p className="mt-1 text-sm text-muted">{issue.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer RGPD ── */}
      <footer className="mt-16 border-t border-border pt-8 text-center text-xs leading-relaxed text-muted">
        <p>
          En vous inscrivant, vous acceptez de recevoir la newsletter Combien Ça
          Gagne par email. Vos données personnelles (prénom, adresse email) sont
          traitées par Orso Media pour l&apos;envoi de la newsletter.
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
          rectification et de suppression de vos données.
        </p>
        <p className="mt-3">
          <Link href="/" className="underline underline-offset-2 hover:text-foreground">
            Se désinscrire
          </Link>{" "}
          ·{" "}
          <Link href="/" className="underline underline-offset-2 hover:text-foreground">
            Politique de confidentialité
          </Link>
        </p>
      </footer>
    </div>
  );
}
