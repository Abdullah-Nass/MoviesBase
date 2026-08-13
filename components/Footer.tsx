import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-neutral-800 bg-neutral-950 py-10">
      <div className="container mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          <div className="flex flex-col gap-4 md:col-span-1">
            <Link
              href={`/${locale}`}
              className="text-2xl font-bold tracking-wide text-emerald-600"
            >
              MOVIESBASE
            </Link>
            <p className="text-sm text-neutral-400">
              {t("metadata.description")}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-neutral-200">
              {t("footer.explore")}
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href={`/${locale}/trending`}
                  className="text-sm text-neutral-400 transition-colors hover:text-emerald-400"
                >
                  {t("trending.title")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/top_rated`}
                  className="text-sm text-neutral-400 transition-colors hover:text-emerald-400"
                >
                  {t("top_rated.title")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/discover`}
                  className="text-sm text-neutral-400 transition-colors hover:text-emerald-400"
                >
                  {t("discover.title")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-neutral-200">
              {t("footer.tech_stack")}
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-neutral-400">
              <li>Next.js App Router</li>
              <li>Tailwind CSS</li>
              <li>TMDB API</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center border-t border-neutral-800 pt-6 text-sm text-neutral-500 ">
          © {currentYear} Abdullah Naser. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
