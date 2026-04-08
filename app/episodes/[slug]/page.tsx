import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import episodes from "@/data/episodes.json";
import NewsletterForm from "@/components/NewsletterForm";
import EpisodeCard from "@/components/EpisodeCard";

const SITE_URL = "https://combiencagagne.fr";

type Props = {
  params: Promise<{ slug: string }>;
};

// ── SSG ──
export async function generateStaticParams() {
  return episodes.map((ep) => ({ slug: ep.slug }));
}

// ── SEO Metadata ──
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const episode = episodes.find((ep) => ep.slug === slug);
  if (!episode) return {};

  const title = `Combien gagne un ${episode.metier.toLowerCase()} ? Les vrais chiffres`;
  const description = `${episode.invite} révèle ses revenus dans Combien Ça Gagne. ${episode.chiffres.map((c) => `${c.label} : ${c.valeur}`).join(". ")}. Écoutez l'épisode #${episode.numero}.`;
  const url = `${SITE_URL}/episodes/${episode.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Combien Ça Gagne",
      images: [
        {
          url: `${SITE_URL}/og/episode-${episode.numero}.png`,
          width: 1200,
          height: 630,
          alt: episode.titre,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ── Helpers ──
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getRelatedEpisodes(
  current: (typeof episodes)[0],
  all: typeof episodes,
  count = 3
) {
  // Same category first, then recent, excluding current
  const others = all.filter((ep) => ep.id !== current.id);
  const sameCategory = others.filter(
    (ep) => ep.categorie === current.categorie
  );
  const rest = others.filter((ep) => ep.categorie !== current.categorie);
  return [...sameCategory, ...rest].slice(0, count);
}

function SpotifyIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function AppleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.104 1.156 1.768 2.46 2.032 3.14l.08.196-.757.319-.076-.191c-.244-.63-.86-1.838-1.886-2.912-1.473-1.543-3.402-2.36-5.449-2.36-2.047 0-3.976.817-5.449 2.36C5.39 6.833 4.774 8.041 4.53 8.67l-.076.191-.757-.319.08-.196c.264-.68.928-1.984 2.032-3.14 1.608-1.685 3.72-2.587 6.056-2.587zM12 7.269c1.597 0 3.041.59 4.183 1.703.894.87 1.394 1.862 1.595 2.35l.05.12-.712.331-.054-.128c-.182-.448-.643-1.357-1.452-2.145-1.006-.98-2.243-1.498-3.61-1.498s-2.604.518-3.61 1.498c-.809.788-1.27 1.697-1.452 2.145l-.054.128-.712-.331.05-.12c.201-.488.701-1.48 1.595-2.35C8.959 7.858 10.403 7.27 12 7.27zm-.024 3.382c.53 0 1.027.105 1.478.313a3.63 3.63 0 011.598 1.399c.347.585.52 1.228.52 1.903 0 .682-.188 1.37-.558 2.043l-.009.018-1.308 2.467-.017.034c-.272.524-.538.9-.818 1.15-.304.272-.62.398-.997.398-.375 0-.687-.123-.987-.389-.28-.248-.548-.627-.825-1.159l-.017-.034-1.308-2.467-.01-.018c-.37-.673-.557-1.361-.557-2.043 0-.675.174-1.318.52-1.903a3.63 3.63 0 011.599-1.399c.45-.208.948-.313 1.478-.313zm0 1.677c-.555 0-1.035.196-1.424.582-.389.387-.586.866-.586 1.422 0 .557.197 1.036.586 1.422.39.386.869.582 1.424.582.555 0 1.035-.196 1.424-.582.389-.386.586-.865.586-1.422 0-.556-.197-1.035-.586-1.422a1.942 1.942 0 00-1.424-.582z" />
    </svg>
  );
}

function YouTubeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// ── Page ──
export default async function EpisodePage({ params }: Props) {
  const { slug } = await params;
  const episode = episodes.find((ep) => ep.slug === slug);
  if (!episode) notFound();

  const related = getRelatedEpisodes(episode, episodes);

  // Extract Spotify show ID for embed (fallback to full URL)
  const spotifyEmbedUrl = episode.plateformes.spotify.replace(
    "https://open.spotify.com/",
    "https://open.spotify.com/embed/"
  );

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.titre,
    url: `${SITE_URL}/episodes/${episode.slug}`,
    datePublished: episode.date,
    description: episode.resume,
    duration: `PT${parseInt(episode.duree)}M`,
    episodeNumber: episode.numero,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "Combien Ça Gagne",
      url: SITE_URL,
    },
    associatedMedia: {
      "@type": "MediaObject",
      contentUrl: episode.plateformes.spotify,
    },
    creator: {
      "@type": "Person",
      name: "Clémence Lepic",
    },
    contributor: {
      "@type": "Person",
      name: episode.invite,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-16">
        {/* ── Breadcrumb ── */}
        <nav className="mb-8 text-sm text-muted">
          <Link href="/" className="hover:text-foreground">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <Link href="/episodes" className="hover:text-foreground">
            Épisodes
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">#{episode.numero}</span>
        </nav>

        {/* ── Header ── */}
        <header>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              #{episode.numero}
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
              {episode.categorie}
            </span>
            <span className="text-sm text-muted">
              {formatDate(episode.date)}
            </span>
            <span className="text-sm text-muted">· {episode.duree}</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {episode.titre}
          </h1>

          <p className="mt-3 text-lg text-muted">
            avec{" "}
            <strong className="font-semibold text-foreground">
              {episode.invite}
            </strong>
          </p>
        </header>

        {/* ── Spotify Embed ── */}
        <section className="mt-10">
          <iframe
            src={spotifyEmbedUrl}
            width="100%"
            height="232"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
            title={`Écouter ${episode.titre}`}
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={episode.plateformes.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1DB954] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <SpotifyIcon className="h-4 w-4" />
              Spotify
            </a>
            <a
              href={episode.plateformes.apple}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#872EC4] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <AppleIcon className="h-4 w-4" />
              Apple Podcasts
            </a>
            <a
              href={episode.plateformes.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF0000] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <YouTubeIcon className="h-4 w-4" />
              YouTube
            </a>
          </div>
        </section>

        {/* ── Résumé ── */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Résumé de l&apos;épisode</h2>
          <p className="mt-4 leading-relaxed text-muted">{episode.resume}</p>
        </section>

        {/* ── Chiffres clés ── */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Les chiffres clés</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {episode.chiffres.map((chiffre) => (
              <div
                key={chiffre.label}
                className="rounded-2xl border border-border bg-white p-6 text-center"
              >
                <p className="text-3xl font-extrabold tracking-tight text-accent">
                  {chiffre.valeur}
                </p>
                <p className="mt-2 text-sm text-muted">{chiffre.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Show Notes ── */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">Notes de l&apos;épisode</h2>
          <div className="mt-4 rounded-2xl border border-border bg-white p-6">
            <ul className="space-y-3 text-sm leading-relaxed text-muted">
              <li className="flex gap-2">
                <span className="mt-0.5 text-accent">-</span>
                <span>
                  Invité :{" "}
                  <strong className="text-foreground">{episode.invite}</strong> —{" "}
                  {episode.metier}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-accent">-</span>
                <span>
                  Durée : {episode.duree} · Enregistré le{" "}
                  {formatDate(episode.date)}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-accent">-</span>
                <span>
                  Catégorie : {episode.categorie}
                </span>
              </li>
              {episode.chiffres.map((c) => (
                <li key={c.label} className="flex gap-2">
                  <span className="mt-0.5 text-accent">-</span>
                  <span>
                    {c.label} : <strong className="text-foreground">{c.valeur}</strong>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── CTA Newsletter ── */}
        <section className="mt-12 rounded-2xl bg-foreground p-8 text-white sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight">
            Les chiffres de la semaine,
            <span className="text-accent"> dans votre boîte mail</span>
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Recevez le résumé de chaque épisode + un bonus exclusif chaque jeudi.
          </p>
          <NewsletterForm />
          <p className="mt-3 text-xs text-white/50">
            Gratuit · 1 email par semaine · Désabonnement en 1 clic
          </p>
        </section>

        {/* ── Épisodes connexes ── */}
        <section className="mt-16">
          <h2 className="text-xl font-bold">Épisodes similaires</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} variant="compact" />
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
