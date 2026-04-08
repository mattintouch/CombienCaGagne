"use client";

import Link from "next/link";

type Episode = {
  id: number;
  slug: string;
  titre: string;
  metier: string;
  invite: string;
  numero: number;
  duree: string;
  date: string;
  categorie: string;
};

type Props = {
  episode: Episode;
  variant?: "grid" | "list" | "compact";
};

/* ── Category → color mapping for generative card visuals ── */
const CATEGORY_COLORS: Record<string, { bg: string; accent: string }> = {
  "Santé":                 { bg: "from-[#1B4D3E] to-[#2D7A5F]", accent: "#2D7A5F" },
  "Artisanat":             { bg: "from-[#8B5E3C] to-[#C4956A]", accent: "#8B5E3C" },
  "Professions libérales": { bg: "from-[#2C3E6B] to-[#4A6FA5]", accent: "#2C3E6B" },
  "Immobilier":            { bg: "from-[#6B4C3B] to-[#A07D6A]", accent: "#6B4C3B" },
  "Divertissement":        { bg: "from-[#7B2D5F] to-[#B84E8D]", accent: "#7B2D5F" },
  "Tech":                  { bg: "from-[#1A3A4A] to-[#2D6B8A]", accent: "#1A3A4A" },
  "Food":                  { bg: "from-[#8B4513] to-[#CD853F]", accent: "#8B4513" },
};

const DEFAULT_COLORS = { bg: "from-foreground to-foreground/80", accent: "#0F0F0F" };

function getCategoryColors(category: string) {
  return CATEGORY_COLORS[category] || DEFAULT_COLORS;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function EpisodeCardSkeleton({ variant = "grid" }: { variant?: "grid" | "list" | "compact" }) {
  if (variant === "list") {
    return (
      <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 sm:gap-6 sm:p-5">
        <div className="h-14 w-14 flex-shrink-0 rounded-xl bg-border" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 rounded bg-border" />
          <div className="h-3 w-1/3 rounded bg-border" />
        </div>
        <div className="hidden space-y-2 sm:block">
          <div className="h-3 w-12 rounded bg-border" />
          <div className="h-3 w-16 rounded bg-border" />
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="h-3 w-10 rounded bg-border" />
        <div className="mt-2 h-5 w-3/4 rounded bg-border" />
        <div className="mt-2 h-3 w-1/2 rounded bg-border" />
        <div className="mt-4 flex justify-between">
          <div className="h-3 w-12 rounded bg-border" />
          <div className="h-3 w-16 rounded bg-border" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface">
      <div className="h-40 rounded-t-2xl bg-border" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-16 rounded bg-border" />
        <div className="h-5 w-3/4 rounded bg-border" />
        <div className="h-3 w-1/2 rounded bg-border" />
        <div className="flex justify-between pt-2">
          <div className="h-3 w-20 rounded bg-border" />
          <div className="h-3 w-16 rounded bg-border" />
        </div>
      </div>
    </div>
  );
}

export default function EpisodeCard({ episode, variant = "grid" }: Props) {
  const colors = getCategoryColors(episode.categorie);

  if (variant === "list") {
    return (
      <Link
        href={`/episodes/${episode.slug}`}
        className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 hover:shadow-md sm:gap-6 sm:p-5"
      >
        <div
          className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colors.bg}`}
        >
          <span className="font-mono text-lg font-bold text-white/60">
            {episode.numero}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate font-serif text-base text-foreground group-hover:text-accent">
              {episode.metier}
            </h2>
            <span className="hidden rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent sm:inline-block">
              {episode.categorie}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-muted">avec {episode.invite}</p>
        </div>

        <div className="hidden flex-shrink-0 text-right sm:block">
          <p className="font-mono text-sm text-foreground">{episode.duree}</p>
          <p className="text-xs text-muted">{formatDate(episode.date)}</p>
        </div>

        <svg
          className="h-5 w-5 flex-shrink-0 text-muted group-hover:text-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/episodes/${episode.slug}`}
        className="group rounded-2xl border border-border bg-surface p-5 hover:shadow-md"
      >
        <span className="font-mono text-xs font-bold text-accent">
          #{episode.numero}
        </span>
        <h3 className="mt-2 font-serif text-base leading-snug text-foreground group-hover:text-accent">
          {episode.metier}
        </h3>
        <p className="mt-1 text-sm text-muted">avec {episode.invite}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-xs text-muted">{episode.duree}</span>
          <span className="text-sm font-semibold text-accent opacity-0 group-hover:opacity-100">
            Écouter &rarr;
          </span>
        </div>
      </Link>
    );
  }

  // ── Grid variant (default) ──
  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className="group relative flex flex-col rounded-2xl border border-border bg-surface hover:shadow-md"
    >
      {/* Generative header — category-specific gradient + large number */}
      <div
        className={`relative flex h-40 items-end justify-between rounded-t-2xl bg-gradient-to-br p-5 ${colors.bg}`}
      >
        <span className="font-mono text-[5rem] font-bold leading-none text-white/15">
          {episode.numero}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
          {episode.duree}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          {episode.categorie}
        </span>
        <h2 className="mt-1.5 font-serif text-lg leading-snug text-foreground group-hover:text-accent">
          {episode.metier}
        </h2>
        <p className="mt-1 text-sm text-muted">avec {episode.invite}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xs text-muted">{formatDate(episode.date)}</span>
          <span className="text-sm font-semibold text-accent opacity-0 group-hover:opacity-100">
            Écouter &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}

export { EpisodeCardSkeleton };
