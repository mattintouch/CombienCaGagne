"use client";

import { useState, useMemo } from "react";
import EpisodeCard from "./EpisodeCard";

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
            <EpisodeCard key={ep.id} episode={ep} variant="grid" />
          ))}
        </div>
      )}

      {/* ── List view ── */}
      {view === "list" && (
        <div className="space-y-3">
          {visible.map((ep) => (
            <EpisodeCard key={ep.id} episode={ep} variant="list" />
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
