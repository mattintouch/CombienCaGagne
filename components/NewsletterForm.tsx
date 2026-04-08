"use client";

export default function NewsletterForm() {
  return (
    <form
      className="mt-8 flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        name="prenom"
        placeholder="Votre prénom"
        required
        className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
      />
      <input
        type="email"
        name="email"
        placeholder="Votre email"
        required
        className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-white/50 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
      />
      <button
        type="submit"
        className="rounded-full bg-accent px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-hover"
      >
        Je m&apos;inscris
      </button>
    </form>
  );
}
