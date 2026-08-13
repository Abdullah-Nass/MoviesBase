import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import Section from "@/components/Section";
import { fetchSearch } from "@/lib/tmdb";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

// For parsing page number incase it returns [2, 5] : page=2&page=5
function getPage(value: string | string[] | undefined) {
  const rawPage = Array.isArray(value) ? value[0] : value;
  const page = Number(rawPage);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string | string[] }>;
}) {
  const params = await searchParams;
  const currentPage = getPage(params.page);
  const q = params.q;
  const locale = await getLocale();
  const t = await getTranslations();
  if (!q || !q.trim()) {
    redirect("/");
  }
  const movies = await fetchSearch({ locale, q, page: currentPage });
  const totalPages = movies?.total_pages ?? 0;
  console.log(movies);
  return (
    <main className="relative isolate bg-neutral-950 min-h-screen">
      <div className="pointer-events-none -z-10 absolute inset-0 rounded-full bg-emerald-700/10 blur-3xl" />
      <header className="flex items-center gap-4 px-6 py-14 sm:px-8 lg:px-10 container mx-auto shadow">
        <span className="w-1.5 h-10 sm:h-15 bg-emerald-500 rounded-full" />
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold text-neutral-100">
            {t("search.title")}
          </h1>
          <div className="text-neutral-300 ">
            {t("search.results", { query: q })}
          </div>
        </div>
      </header>
      <section className="container flex-col mx-auto px-4 py-6 sm:px-8">
        {movies ? (
          <Section movies={movies.results} />
        ) : (
          <div className="text-center text-lg text-red-500">
            {t("search.not_found")}
          </div>
        )}
        {totalPages > 1 ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            path="search"
            query={q}
          />
        ) : (
          <Button content={t("common.go_home")} path="/" direction="back" />
        )}
      </section>
    </main>
  );
}
