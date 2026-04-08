import type { Metadata } from "next";
import episodes from "@/data/episodes.json";
import EpisodesArchive from "@/components/EpisodesArchive";

export const metadata: Metadata = {
  title: "Tous les épisodes du podcast Combien Ça Gagne",
  description:
    "Retrouvez tous les épisodes du podcast Combien Ça Gagne : salaires, revenus et chiffres réels de dizaines de métiers décryptés par Clémence Lepic.",
  alternates: { canonical: "https://combiencagagne.fr/episodes" },
};

// Sort episodes newest first
const sortedEpisodes = [...episodes].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

// Extract unique categories
const categories = Array.from(
  new Set(episodes.map((ep) => ep.categorie))
).sort();

export default function EpisodesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <header className="mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Tous les épisodes
        </h1>
        <p className="mt-3 max-w-xl text-lg text-muted">
          Salaires, revenus, marges : chaque semaine, un nouveau métier décrypté
          sans filtre.
        </p>
      </header>

      <EpisodesArchive episodes={sortedEpisodes} categories={categories} />
    </div>
  );
}
