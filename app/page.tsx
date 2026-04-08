import Link from "next/link";
import episodes from "@/data/episodes.json";
import { PLATFORMS } from "@/data/platforms";
import NewsletterForm from "@/components/NewsletterForm";
import EpisodeCard from "@/components/EpisodeCard";

const latestEpisode = episodes[0];

const testimonials = [
  {
    quote: "Le seul podcast où j'ai enfin compris combien gagne vraiment un médecin. Sans bullshit.",
    author: "Julien R.",
    detail: "Auditeur depuis le #12",
  },
  {
    quote: "J'écoute chaque mercredi matin dans le métro. C'est devenu un rituel.",
    author: "Camille D.",
    detail: "Abonnée newsletter",
  },
  {
    quote: "Grâce à cet épisode sur les avocats, j'ai négocié mon salaire. +8K annuel.",
    author: "Nassim T.",
    detail: "Auditeur fidèle",
  },
];

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

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Podcast par Orso Media
          </p>

          <h1 className="mt-4 font-serif text-5xl leading-[1.1] tracking-tight sm:text-7xl">
            Combien ils gagnent
            <br />
            <span className="italic text-accent">vraiment</span> ?
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Chaque semaine, Clémence Lepic reçoit un professionnel qui ouvre ses
            livres de comptes. Sans filtre, sans tabou.
          </p>

          {/* Dernier épisode mis en avant */}
          <div className="mt-10 rounded-2xl border border-border bg-surface p-6 sm:max-w-xl">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              Dernier épisode — #{latestEpisode.numero}
            </p>
            <h2 className="mt-2 font-serif text-xl leading-snug">
              {latestEpisode.titre}
            </h2>
            <p className="mt-1 text-sm text-muted">
              avec {latestEpisode.invite} · <span className="font-mono">{latestEpisode.duree}</span>
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={latestEpisode.plateformes.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1DB954] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                <SpotifyIcon className="h-4 w-4" />
                Écouter sur Spotify
              </a>
              <a
                href={latestEpisode.plateformes.apple}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#872EC4] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                <AppleIcon className="h-4 w-4" />
                Apple Podcasts
              </a>
              <a
                href={latestEpisode.plateformes.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#FF0000] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                <YouTubeIcon className="h-4 w-4" />
                YouTube
              </a>
            </div>
          </div>

          {/* Boutons abonnement globaux */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-muted">
              S&apos;abonner :
            </span>
            <a
              href={PLATFORMS.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:text-accent"
            >
              <SpotifyIcon className="h-4 w-4 text-[#1DB954]" />
              Spotify
            </a>
            <a
              href={PLATFORMS.apple}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:text-accent"
            >
              <AppleIcon className="h-4 w-4 text-[#872EC4]" />
              Apple Podcasts
            </a>
            <a
              href={PLATFORMS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:text-accent"
            >
              <YouTubeIcon className="h-4 w-4 text-[#FF0000]" />
              YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ── Preuve sociale ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          {/* Chiffres clés — monospace */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
            <div>
              <p className="font-mono text-3xl font-bold text-accent sm:text-4xl">
                42+
              </p>
              <p className="mt-1 text-sm text-muted">épisodes publiés</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-accent sm:text-4xl">
                Chaque mercredi
              </p>
              <p className="mt-1 text-sm text-muted">un nouveau métier décrypté</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono text-3xl font-bold text-accent sm:text-4xl">
                15 000+
              </p>
              <p className="mt-1 text-sm text-muted">auditeurs par épisode</p>
            </div>
          </div>

          {/* Témoignages */}
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.author}
                className="rounded-xl border border-border bg-background p-6"
              >
                <p className="font-serif text-base italic leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-4">
                  <p className="text-sm font-semibold">{t.author}</p>
                  <p className="text-xs text-muted">{t.detail}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── Derniers épisodes ── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
              Derniers épisodes
            </h2>
            <p className="mt-2 text-muted">
              Les coulisses financières de vrais métiers.
            </p>
          </div>
          <Link
            href="/episodes"
            className="hidden text-sm font-semibold text-accent hover:text-accent-hover sm:block"
          >
            Voir tous les épisodes &rarr;
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((ep) => (
            <EpisodeCard key={ep.id} episode={ep} variant="grid" />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/episodes"
            className="text-sm font-semibold text-accent"
          >
            Voir tous les épisodes &rarr;
          </Link>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="bg-foreground text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
              Les chiffres qui comptent,
              <br />
              <span className="italic text-accent">dans votre boîte mail</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              Chaque jeudi, recevez le résumé de l&apos;épisode, les chiffres
              clés à retenir et un bonus exclusif sur le métier de la semaine.
            </p>

            <NewsletterForm />

            <p className="mt-4 text-xs text-white/50">
              Gratuit · 1 email par semaine · Désabonnement en 1 clic
            </p>
          </div>
        </div>
      </section>

      {/* ── À propos rapide ── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-12">
          {/* Photo placeholder */}
          <div className="flex h-40 w-40 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent/5">
            <span className="font-serif text-4xl text-accent">CL</span>
          </div>

          <div>
            <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">
              Présenté par Clémence Lepic
            </h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
              Journaliste et productrice chez Orso Media, Clémence pose la
              question que tout le monde se pose mais que personne n&apos;ose
              demander : <strong className="text-foreground">&ldquo;Tu gagnes combien ?&rdquo;</strong>
            </p>
            <Link
              href="/a-propos"
              className="mt-4 inline-block text-sm font-semibold text-accent hover:text-accent-hover"
            >
              En savoir plus &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
