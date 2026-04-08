"use client";

import { useState } from "react";
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
      <div className="flex animate-pulse items-center gap-4 rounded-xl border border-border bg-white p-4 sm:gap-6 sm:p-5">
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
      <div className="animate-pulse rounded-2xl border border-border bg-white p-5">
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

  // Grid skeleton
  return (
    <div className="animate-pulse rounded-2xl border border-border bg-white">
      <div className="h-36 rounded-t-2xl bg-border" />
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
  const [loaded, setLoaded] = useState(false);

  // Show skeleton until component is mounted (simulates lazy load)
  // In a real app with images, this would track image.onLoad
  if (!loaded && typeof window === "undefined") {
    return <EpisodeCardSkeleton variant={variant} />;
  }

  if (variant === "list") {
    return (
      <Link
        href={`/episodes/${episode.slug}`}
        className="group flex items-center gap-4 rounded-xl border border-border bg-white p-4 transition-shadow hover:shadow-md sm:gap-6 sm:p-5"
        onMouseEnter={() => setLoaded(true)}
      >
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-foreground">
          <span className="text-lg font-black text-white/40">
            {episode.numero}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-base font-bold group-hover:text-accent">
              {episode.metier}
            </h2>
            <span className="hidden rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent sm:inline-block">
              {episode.categorie}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-muted">avec {episode.invite}</p>
        </div>

        <div className="hidden flex-shrink-0 text-right sm:block">
          <p className="text-sm font-medium">{episode.duree}</p>
          <p className="text-xs text-muted">{formatDate(episode.date)}</p>
        </div>

        <svg
          className="h-5 w-5 flex-shrink-0 text-muted transition-colors group-hover:text-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/episodes/${episode.slug}`}
        className="group rounded-2xl border border-border bg-white p-5 transition-shadow hover:shadow-md"
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          #{episode.numero}
        </span>
        <h3 className="mt-2 text-base font-bold leading-snug group-hover:text-accent">
          {episode.metier}
        </h3>
        <p className="mt-1 text-sm text-muted">avec {episode.invite}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted">{episode.duree}</span>
          <span className="text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
            Écouter &rarr;
          </span>
        </div>
      </Link>
    );
  }

  // Grid variant (default)
  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className="group relative flex flex-col rounded-2xl border border-border bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative flex h-36 items-center justify-center rounded-t-2xl bg-gradient-to-br from-foreground to-foreground/90">
        <span className="text-6xl font-black text-white/20">
          #{episode.numero}
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-white">
          {episode.duree}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          {episode.categorie}
        </span>
        <h2 className="mt-1.5 text-lg font-bold leading-snug group-hover:text-accent">
          {episode.metier}
        </h2>
        <p className="mt-1 text-sm text-muted">avec {episode.invite}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xs text-muted">{formatDate(episode.date)}</span>
          <span className="text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
            Écouter &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}

export { EpisodeCardSkeleton };
