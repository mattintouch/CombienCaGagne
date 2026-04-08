#!/usr/bin/env node
/**
 * Import episodes from the Combien Ça Gagne RSS feed.
 *
 * Usage:
 *   node scripts/import-rss.mjs
 *
 * This script fetches the RSS feed, extracts episode data,
 * and writes it to data/episodes.json.
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const RSS_URL =
  "https://feeds.audiomeans.fr/feed/085c8635-d7bf-493b-87b9-76e75bf83e6b.xml";

const SPOTIFY_SHOW = "https://open.spotify.com/show/0t9N1Dd05siF9jPupuw8yc";
const APPLE_SHOW =
  "https://podcasts.apple.com/fr/podcast/combien-%C3%A7a-gagne/id1777097394";
const YOUTUBE_CHANNEL = "https://www.youtube.com/@Combiencagagne";

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseDuration(seconds) {
  const mins = Math.round(parseInt(seconds, 10) / 60);
  return `${mins} min`;
}

function extractText(xml, tag) {
  const regex = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`, "i");
  const match = xml.match(regex);
  return match ? match[1].trim() : "";
}

function extractAttr(xml, tag, attr) {
  const regex = new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`, "i");
  const match = xml.match(regex);
  return match ? match[1] : "";
}

function guessCategory(title, description) {
  const text = (title + " " + description).toLowerCase();
  if (/médecin|chirurgien|dentiste|infirm|santé|pharma|kiné|hôpital|sage-femme/.test(text)) return "Santé";
  if (/avocat|notaire|huissier|juriste|expert-comptable/.test(text)) return "Professions libérales";
  if (/immobilier|agent|mandataire|promoteur/.test(text)) return "Immobilier";
  if (/boulang|plombier|électricien|artisan|menuisier|pâtissier|couvreur/.test(text)) return "Artisanat";
  if (/influenc|youtuber|créat|streamer|tiktok|podcast|comédien|acteur/.test(text)) return "Divertissement";
  if (/développ|tech|startup|product|data|ingénieur|freelance/.test(text)) return "Tech";
  if (/restaurant|chef|cuisinier|food|traiteur|caviste/.test(text)) return "Food";
  if (/pilote|steward|marin|chauffeur|routier|transport/.test(text)) return "Transport";
  if (/prof|enseignant|chercheur|instituteur|directeur d'école/.test(text)) return "Éducation";
  if (/banquier|trader|financ|assur|comptable|audit/.test(text)) return "Finance";
  if (/agricult|viticul|éleveur|paysan|vigneron|maraîcher/.test(text)) return "Agriculture";
  return "Business";
}

function extractChiffres(description) {
  // Try to extract money amounts from the description
  const amounts = [];
  const regex = /(\d[\d\s]*(?:,\d+)?\s*(?:€|euros?|k€|K€)(?:\s*\/\s*(?:mois|an|jour|heure))?)/gi;
  const matches = description.matchAll(regex);
  for (const match of matches) {
    if (amounts.length < 3) {
      amounts.push({ label: `Chiffre mentionné`, valeur: match[1].trim() });
    }
  }
  return amounts.length > 0 ? amounts : [
    { label: "Données", valeur: "Voir l'épisode" },
  ];
}

async function main() {
  console.log("Fetching RSS feed...");
  const response = await fetch(RSS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch RSS: ${response.status} ${response.statusText}`);
  }
  const xml = await response.text();
  console.log(`Fetched ${xml.length} bytes`);

  // Split into items
  const items = xml.split("<item>").slice(1);
  console.log(`Found ${items.length} episodes`);

  const episodes = items.map((item, index) => {
    const title = extractText(item, "title");
    const description = extractText(item, "description") || extractText(item, "itunes:summary");
    const pubDate = extractText(item, "pubDate");
    const duration = extractText(item, "itunes:duration");
    const episodeNum = extractText(item, "itunes:episode");
    const imageUrl = extractAttr(item, "itunes:image", "href");

    const date = pubDate ? new Date(pubDate).toISOString().split("T")[0] : "";
    const numero = episodeNum ? parseInt(episodeNum, 10) : items.length - index;

    return {
      id: index + 1,
      slug: slugify(title),
      titre: title,
      metier: title
        .replace(/^combien (?:ça )?gagne (?:un |une |des |le |la |l')?/i, "")
        .replace(/\s*\??\s*$/, ""),
      invite: "",
      numero,
      duree: duration ? parseDuration(duration) : "45 min",
      date,
      categorie: guessCategory(title, description),
      resume: description.replace(/<[^>]+>/g, "").substring(0, 500),
      image: imageUrl || "",
      chiffres: extractChiffres(description),
      plateformes: {
        spotify: SPOTIFY_SHOW,
        apple: APPLE_SHOW,
        youtube: YOUTUBE_CHANNEL,
      },
    };
  });

  // Sort by date (newest first)
  episodes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Re-assign IDs after sorting
  episodes.forEach((ep, i) => { ep.id = i + 1; });

  const outputPath = join(__dirname, "..", "data", "episodes.json");
  writeFileSync(outputPath, JSON.stringify(episodes, null, 2), "utf8");
  console.log(`\nWrote ${episodes.length} episodes to ${outputPath}`);
  console.log("\nFirst 3 episodes:");
  episodes.slice(0, 3).forEach((ep) => {
    console.log(`  #${ep.numero} — ${ep.titre} (${ep.date}, ${ep.duree})`);
  });
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
