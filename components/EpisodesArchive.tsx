"use client";

import { useState, useMemo } from "react";
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
  resume: string;
  chiffres: { label: string; valeur: string }[];
  plateformes: { spotify: string; apple: string; youtube: string };
};

type Props = {
  episodes: Episode[];
  categories: string[];
};

const PAGE_SIZE = 12;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function GridIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

function ListIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export default function EpisodesArchive({ episodes, categories }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return episodes.filter((ep) => {
      const matchesSearch =
        !q ||
        ep.titre.toLowerCase().includes(q) ||
        ep.metier.toLowerCase().includes(q);
      const matchesCategory =
        !activeCategory || ep.categorie === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [episodes, search, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <>
      {/* ── Controls ── */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 sm:max-w-sm">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un métier, un épisode..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            className="w-full rounded-full border border-border bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 rounded-full border border-border bg-white p-1">
          <button
            onClick={() => setView("grid")}
            className={`rounded-full p-2 transition-colors ${
              view === "grid"
                ? "bg-foreground text-white"
                : "text-muted hover:text-foreground"
            }`}
            aria-label="Vue grille"
          >
            <GridIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`rounded-full p-2 transition-colors ${
              view === "list"
                ? "bg-foreground text-white"
                : "text-muted hover:text-foreground"
            }`}
            aria-label="Vue liste"
          >
            <ListIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Category filters ── */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setActiveCategory(null);
            setVisibleCount(PAGE_SIZE);
          }}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            !activeCategory
              ? "bg-foreground text-white"
              : "border border-border bg-white text-muted hover:text-foreground"
          }`}
        >
          Tous
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(activeCategory === cat ? null : cat);
              setVisibleCount(PAGE_SIZE);
            }}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-foreground text-white"
                : "border border-border bg-white text-muted hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Results count ── */}
      <p className="mb-6 text-sm text-muted">
        {filtered.length} épisode{filtered.length !== 1 ? "s" : ""}
        {activeCategory ? ` dans ${activeCategory}` : ""}
        {search ? ` pour "${search}"` : ""}
      </p>

      {/* ── Grid view ── */}
      {view === "grid" && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((ep) => (
            <Link
              key={ep.id}
              href={`/episodes/${ep.slug}`}
              className="group relative flex flex-col rounded-2xl border border-border bg-white transition-shadow hover:shadow-md"
            >
              {/* Number overlay card top */}
              <div className="relative flex h-36 items-center justify-center rounded-t-2xl bg-gradient-to-br from-foreground to-foreground/90">
                <span className="text-6xl font-black text-white/20">
                  #{ep.numero}
                </span>
                <span className="absolute bottom-3 right-3 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-white">
                  {ep.duree}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {ep.categorie}
                </span>
                <h2 className="mt-1.5 text-lg font-bold leading-snug group-hover:text-accent">
                  {ep.metier}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  avec {ep.invite}
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-xs text-muted">
                    {formatDate(ep.date)}
                  </span>
                  <span className="text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Écouter &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* ── List view ── */}
      {view === "list" && (
        <div className="space-y-3">
          {visible.map((ep) => (
            <Link
              key={ep.id}
              href={`/episodes/${ep.slug}`}
              className="group flex items-center gap-4 rounded-xl border border-border bg-white p-4 transition-shadow hover:shadow-md sm:gap-6 sm:p-5"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-foreground">
                <span className="text-lg font-black text-white/40">
                  {ep.numero}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate text-base font-bold group-hover:text-accent">
                    {ep.metier}
                  </h2>
                  <span className="hidden rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent sm:inline-block">
                    {ep.categorie}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-muted">
                  avec {ep.invite}
                </p>
              </div>

              <div className="hidden flex-shrink-0 text-right sm:block">
                <p className="text-sm font-medium">{ep.duree}</p>
                <p className="text-xs text-muted">{formatDate(ep.date)}</p>
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
          ))}
        </div>
      )}

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg font-semibold">Aucun épisode trouvé</p>
          <p className="mt-2 text-sm text-muted">
            Essayez un autre terme de recherche ou changez de catégorie.
          </p>
        </div>
      )}

      {/* ── Load more ── */}
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="rounded-full border border-border bg-white px-8 py-3 text-sm font-semibold transition-colors hover:border-foreground hover:bg-foreground hover:text-white"
          >
            Charger plus d&apos;épisodes
          </button>
        </div>
      )}
    </>
  );
}
