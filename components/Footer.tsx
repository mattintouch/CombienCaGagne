import Link from "next/link";
import { PLATFORMS } from "@/data/platforms";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <div>
            <Link href="/" className="font-serif text-lg tracking-tight">
              Combien<span className="text-accent"> Ça Gagne</span>
            </Link>
            <p className="mt-1 text-sm text-muted">
              Un podcast Orso Media
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted">
            <Link href="/episodes" className="hover:text-foreground">
              Épisodes
            </Link>
            <Link href="/newsletter" className="hover:text-foreground">
              Newsletter
            </Link>
            <Link href="/a-propos" className="hover:text-foreground">
              À propos
            </Link>
          </nav>

          {/* Plateformes */}
          <div className="flex items-center gap-4">
            <a href={PLATFORMS.spotify} target="_blank" rel="noopener noreferrer" aria-label="Spotify" className="text-muted hover:text-[#1DB954]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </a>
            <a href={PLATFORMS.apple} target="_blank" rel="noopener noreferrer" aria-label="Apple Podcasts" className="text-muted hover:text-[#872EC4]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.104 1.156 1.768 2.46 2.032 3.14l.08.196-.757.319-.076-.191c-.244-.63-.86-1.838-1.886-2.912-1.473-1.543-3.402-2.36-5.449-2.36-2.047 0-3.976.817-5.449 2.36C5.39 6.833 4.774 8.041 4.53 8.67l-.076.191-.757-.319.08-.196c.264-.68.928-1.984 2.032-3.14 1.608-1.685 3.72-2.587 6.056-2.587z" />
              </svg>
            </a>
            <a href={PLATFORMS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted hover:text-[#FF0000]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a href={PLATFORMS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted hover:text-[#E4405F]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href={PLATFORMS.deezer} target="_blank" rel="noopener noreferrer" aria-label="Deezer" className="text-muted hover:text-foreground">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.81 4.16v3.03H24V4.16h-5.19zM6.27 8.38v3.027h5.19V8.38H6.27zm12.54 0v3.027H24V8.38h-5.19zM6.27 12.595v3.027h5.19v-3.027H6.27zm6.27 0v3.027h5.19v-3.027h-5.19zm6.27 0v3.027H24v-3.027h-5.19zM0 16.81v3.027h5.19V16.81H0zm6.27 0v3.027h5.19V16.81H6.27zm6.27 0v3.027h5.19V16.81h-5.19zm6.27 0v3.027H24V16.81h-5.19z" />
              </svg>
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} Combien Ça Gagne — Tous droits
          réservés.
        </p>
      </div>
    </footer>
  );
}
