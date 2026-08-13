"use client";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    const params = new URLSearchParams();
    params.set("q", query);
    params.set("page", "1");
    router.push(`/${locale}/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={(e) => {
        handleSearch(e);
        setQuery("");
      }}
      role="search"
      className="flex min-w-0 flex-1 items-center overflow-hidden rounded-md border border-neutral-800 bg-neutral-900 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/30"
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("search.placeholder")}
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-neutral-100 outline-none placeholder:text-neutral-500"
        aria-label={t("search.title")}
      />
      <button
        type="submit"
        className="cursor-pointer shrink-0 bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 active:scale-96"
      >
        {t("search.title")}
      </button>
    </form>
  );
}
