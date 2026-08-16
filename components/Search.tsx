"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { searchMovies } from "@/lib/tmdb-client";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 400);
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();

  const containerRef = useRef<HTMLDivElement>(null);
  const { data, isFetching } = useQuery({
    queryKey: ["search", debouncedQuery, locale],
    queryFn: () => searchMovies(debouncedQuery, locale),
    enabled: debouncedQuery.trim().length > 1,
    staleTime: 1000 * 60 * 5,
  });
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setQuery("");
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    const params = new URLSearchParams();
    params.set("q", query);
    params.set("page", "1");
    router.push(`/${locale}/search?${params.toString()}`);
    setQuery("");
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const results = data?.results?.slice(0, 5) || [];

    if (!results.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (selectedIndex > -1) {
        e.preventDefault();
        const selectedMovie = results[selectedIndex];
        router.push(`/${locale}/movie/${selectedMovie.id}`);
        setQuery("");
        setSelectedIndex(-1);
      }
    } else if (e.key === "Escape") {
      setQuery("");
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="relative flex-1 min-w-0" ref={containerRef}>
      <form
        onSubmit={handleSearch}
        role="search"
        className="flex w-full flex-1 items-center overflow-hidden rounded-md border border-neutral-800 bg-neutral-900 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/30"
      >
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
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

      {debouncedQuery.trim().length > 1 && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border border-neutral-800 bg-neutral-900 shadow-lg">
          {isFetching ? (
            <div className="flex items-center justify-center p-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-emerald-500" />
            </div>
          ) : data?.results?.length ? (
            data.results.slice(0, 5).map((movie, index) => (
              <Link
                key={movie.id}
                href={`/${locale}/movie/${movie.id}`}
                onClick={() => {
                  setQuery("");
                  setSelectedIndex(-1);
                }}
                className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-neutral-200 transition-colors hover:bg-neutral-800  active:bg-neutral-800 ${
                  selectedIndex === index
                    ? "bg-neutral-800 ring-1 ring-inset ring-emerald-500/50"
                    : ""
                }`}
              >
                {movie.title}
              </Link>
            ))
          ) : (
            <div className="p-4 text-red-400 text-xs text-center">
              {t("search.not_found")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
