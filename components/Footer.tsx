import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
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
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} Combien Ça Gagne — Tous droits
          réservés.
        </p>
      </div>
    </footer>
  );
}
