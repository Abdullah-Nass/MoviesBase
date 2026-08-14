"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import Search from "./Search";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Genre } from "@/types/tmdb";

export default function Navbar({
  locale,
  genres,
}: {
  locale: string;
  genres: Genre[];
}) {
  const t = useTranslations();
  const [menu, setMenu] = useState<boolean>(false);
  const handleCloseMenu = () => {
    setMenu(false);
  };
  return (
    <nav
      aria-label={t("metadata.main_nav")}
      className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950"
    >
      <div className="container mx-auto flex flex-col gap-4 px-6 py-4 sm:px-8 lg:flex-row lg:items-center lg:px-10">
        <div className="flex items-center justify-between gap-3 md:gap-6 lg:justify-start">
          <button
            type="button"
            onClick={() => {
              setMenu((prev) => !prev);
            }}
            className="cursor-pointer -ml-2 rounded-md bg-transparent text-xl text-neutral-300 transition-colors active:scale-95 hover:text-white focus:outline-none"
            aria-label={t("metadata.toggle_sidebar")}
            aria-expanded={menu}
            aria-controls="navbar-menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <Link
            href={`/${locale}`}
            className="text-xl font-bold tracking-wide text-emerald-600"
          >
            MOVIESBASE
          </Link>
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-7">
          <LanguageSwitcher />
          <Search />
        </div>
      </div>

      <div
        id="navbar-menu"
        className={`grid overflow-hidden bg-neutral-900/30 transition-[grid-template-rows] duration-300 ${menu ? "grid-rows-[1fr] border-t border-neutral-800" : "grid-rows-[0fr]"}`}
      >
        <div className="container mx-auto px-6 sm:px-8 lg:px-10 grid grid-cols-1 lg:grid-cols-3 min-h-0">
          <ul className="col-span-1 flex flex-wrap items-center justify-center lg:justify-start gap-6 py-5">
            <li className="shrink-0">
              <Link
                href={`/${locale}/trending`}
                onClick={handleCloseMenu}
                className="block text-sm font-medium text-gray-300 transition-colors hover:text-emerald-400"
              >
                {t("trending.title")}
              </Link>
            </li>
            <li className="shrink-0">
              <Link
                href={`/${locale}/top_rated`}
                onClick={handleCloseMenu}
                className="block text-sm font-medium text-gray-300 transition-colors hover:text-emerald-400"
              >
                {t("top_rated.title")}
              </Link>
            </li>
            <li className="shrink-0">
              <Link
                href={`/${locale}/discover`}
                onClick={handleCloseMenu}
                className="block text-sm font-medium text-gray-300 transition-colors hover:text-emerald-400"
              >
                {t("discover.title")}
              </Link>
            </li>
          </ul>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:col-span-2 lg:flex lg:flex-wrap gap-4 py-5">
            {genres.map((g) => (
              <li key={g.id}>
                <Link
                  href={`/${locale}/discover/${g.id}`}
                  onClick={handleCloseMenu}
                  className="block truncate text-center rounded-full border border-white/5 bg-white/10 px-4 py-1.5 text-sm font-medium text-gray-200 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-emerald-500/20 hover:text-emerald-400"
                >
                  {g.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
