import { fetchTrending } from "@/lib/tmdb";
import { getLocale, getTranslations } from "next-intl/server";
import Section from "@/components/Section";
import Pagination from "@/components/Pagination";
import Button from "@/components/Button";
import getPage from "@/lib/getPage";

export default async function TrendingPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const locale = await getLocale();
  const t = await getTranslations();

  const currentPage = getPage((await searchParams).page);

  const movies = await fetchTrending({ locale, page: currentPage });

  const totalPages = movies?.total_pages ?? 0;

  return (
    <main className="relative isolate bg-neutral-950 min-h-screen">
      <div className="pointer-events-none -z-10 absolute inset-0 rounded-full bg-emerald-700/10 blur-3xl" />
      <header className="flex items-center gap-4 px-6 py-14 sm:px-8 lg:px-10 container mx-auto shadow">
        <span className="w-1.5 h-10 sm:h-15 bg-emerald-500 rounded-full" />
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold text-neutral-100">
            {t("trending.title")}
          </h1>
          <div className="text-neutral-300 ">{t("trending.subtitle")}</div>
        </div>
      </header>
      <section className="container flex-col mx-auto px-10 py-6 sm:px-8">
        {movies ? (
          <Section movies={movies.results} />
        ) : (
          <>
            <div className="text-center text-lg text-red-500">
              {t("trending.not_found")}
            </div>
            <Button content={t("common.go_home")} path="/" direction="back" />
          </>
        )}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            path="trending"
          />
        )}
      </section>
    </main>
  );
}
