"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/episodes", label: "Épisodes" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/a-propos", label: "À propos" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl tracking-tight text-foreground">
            Combien
            <span className="text-accent"> Ça Gagne</span>
          </span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Boutons plateformes desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://open.spotify.com/show/example-ccg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#1DB954] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            Spotify
          </a>
          <a
            href="https://podcasts.apple.com/podcast/example-ccg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#872EC4] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.104 1.156 1.768 2.46 2.032 3.14l.08.196-.757.319-.076-.191c-.244-.63-.86-1.838-1.886-2.912-1.473-1.543-3.402-2.36-5.449-2.36-2.047 0-3.976.817-5.449 2.36C5.39 6.833 4.774 8.041 4.53 8.67l-.076.191-.757-.319.08-.196c.264-.68.928-1.984 2.032-3.14 1.608-1.685 3.72-2.587 6.056-2.587zM12 7.269c1.597 0 3.041.59 4.183 1.703.894.87 1.394 1.862 1.595 2.35l.05.12-.712.331-.054-.128c-.182-.448-.643-1.357-1.452-2.145-1.006-.98-2.243-1.498-3.61-1.498s-2.604.518-3.61 1.498c-.809.788-1.27 1.697-1.452 2.145l-.054.128-.712-.331.05-.12c.201-.488.701-1.48 1.595-2.35C8.959 7.858 10.403 7.27 12 7.27zm-.024 3.382c.53 0 1.027.105 1.478.313a3.63 3.63 0 011.598 1.399c.347.585.52 1.228.52 1.903 0 .682-.188 1.37-.558 2.043l-.009.018-1.308 2.467-.017.034c-.272.524-.538.9-.818 1.15-.304.272-.62.398-.997.398-.375 0-.687-.123-.987-.389-.28-.248-.548-.627-.825-1.159l-.017-.034-1.308-2.467-.01-.018c-.37-.673-.557-1.361-.557-2.043 0-.675.174-1.318.52-1.903a3.63 3.63 0 011.599-1.399c.45-.208.948-.313 1.478-.313zm0 1.677c-.555 0-1.035.196-1.424.582-.389.387-.586.866-.586 1.422 0 .557.197 1.036.586 1.422.39.386.869.582 1.424.582.555 0 1.035-.196 1.424-.582.389-.386.586-.865.586-1.422 0-.556-.197-1.035-.586-1.422a1.942 1.942 0 00-1.424-.582z" />
            </svg>
            Apple Podcasts
          </a>
        </div>

        {/* Bouton menu mobile */}
        <button
          className="flex items-center md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-foreground/5 hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-3 px-3">
              <a
                href="https://open.spotify.com/show/example-ccg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1DB954] px-4 py-2 text-sm font-medium text-white"
              >
                Spotify
              </a>
              <a
                href="https://podcasts.apple.com/podcast/example-ccg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#872EC4] px-4 py-2 text-sm font-medium text-white"
              >
                Apple Podcasts
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
