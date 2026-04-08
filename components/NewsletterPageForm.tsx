"use client";

import { useState } from "react";

export default function NewsletterPageForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      prenom: (form.elements.namedItem("prenom") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
    };

    const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.error("Newsletter submit error:", err);
      }
    } else {
      // V1: log to console
      console.log("Newsletter inscription:", data);
    }

    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
          <svg
            className="h-7 w-7 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-bold">Bienvenue dans le club !</h3>
        <p className="mt-2 text-sm text-white/70">
          Vérifiez votre boîte mail — votre premier email arrive mercredi
          prochain.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-3 sm:flex-row"
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
        disabled={loading}
        className="rounded-full bg-accent px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {loading ? "Inscription..." : "Je m'abonne"}
      </button>
    </form>
  );
}
