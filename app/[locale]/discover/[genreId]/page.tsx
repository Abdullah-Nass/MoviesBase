import { fetchDiscover, fetchGenres } from "@/lib/tmdb";
import { getLocale, getTranslations } from "next-intl/server";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import { notFound } from "next/navigation";

// For parsing page number incase it returns [2, 5] : page=2&page=5
function getPage(value: string | string[] | undefined) {
  const rawPage = Array.isArray(value) ? value[0] : value;
  const page = Number(rawPage);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

export default async function ByGenrePage({
  searchParams,
  params,
}: {
  searchParams: Promise<{
    page?: string | string[];
  }>;
  params: Promise<{ genreId: string }>;
}) {
  const locale = await getLocale();
  const t = await getTranslations();

  const currentPage = getPage((await searchParams).page);
  const { genreId } = await params;
  const getGenres = await fetchGenres({ locale });
  if (!getGenres?.genres) {
    notFound();
  }
  const currentGenre = getGenres.genres.find(
    (g) => g.id.toString() === genreId,
  );
  if (!currentGenre) {
    notFound();
  }
  const movies = await fetchDiscover({ locale, page: currentPage, genreId });

  const totalPages = movies?.total_pages ?? 0;

  return (
    <main className="relative isolate bg-neutral-950 min-h-screen">
      <div className="pointer-events-none -z-10 absolute inset-0 rounded-full bg-emerald-700/10 blur-3xl" />
      <header className="flex items-center gap-4 px-6 py-14 sm:px-8 lg:px-10 container mx-auto shadow">
        <span className="w-1.5 h-10 sm:h-15 bg-emerald-500 rounded-full" />
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold text-neutral-100">
            {t("genre.title", { genre: currentGenre.name })}
          </h1>
          <div className="text-neutral-300 ">
            {t("genre.subtitle", { genre: currentGenre.name })}
          </div>
        </div>
      </header>
      <div className="container flex-col mx-auto px-4 py-6 sm:px-8">
        {movies ? (
          <Section movies={movies.results} />
        ) : (
          <div className="text-center text-lg text-red-500">
            {t("discover.not_found")}
          </div>
        )}
        {totalPages ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            path={`discover/${genreId}`}
          />
        ) : (
          <Button content={t("common.go_home")} direction="back" path="/" />
        )}
      </div>
    </main>
  );
}
