import Button from "@/components/Button";
import Section from "@/components/Section";
import { fetchDiscover, fetchTopRated, fetchTrending } from "@/lib/tmdb";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations();
  const [trendingMovies, discoverMovies, topRatedMovies] = await Promise.all([
    await fetchTrending({ locale }),
    await fetchDiscover({ locale }),
    await fetchTopRated({ locale }),
  ]);

  return (
    <>
      <main className="min-h-screen bg-neutral-950 text-white">
        {trendingMovies ? (
          <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute -start-40 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative container mx-auto px-6 py-14 sm:px-8 lg:px-10">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-1 w-8 rounded-full bg-emerald-500 " />

                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
                      {t("trending.sidetitle")}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {t("trending.title")}
                  </h1>

                  <p className="mt-2 text-sm text-neutral-500">
                    {t("trending.subtitle")}
                  </p>
                </div>

                <Button content={t("common.show_all")} path="/trending" />
              </div>

              <Section movies={trendingMovies.results.slice(0, 4) ?? null} />
            </div>
          </section>
        ) : (
          <div className="flex min-h-64 items-center justify-center text-lg text-red-500">
            {t("trending.not_found")}
          </div>
        )}
        {topRatedMovies ? (
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 to-neutral-900/90" />
            <div className="pointer-events-none absolute -end-40 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative container mx-auto px-6 py-14 sm:px-8 lg:px-10">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-1 w-8 rounded-full bg-emerald-500" />

                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
                      {t("top_rated.sidetitle")}
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {t("top_rated.title")}
                  </h1>

                  <p className="mt-2 text-sm text-neutral-500">
                    {t("top_rated.subtitle")}
                  </p>
                </div>

                <Button content={t("common.show_all")} path="/top_rated" />
              </div>

              <Section movies={topRatedMovies.results.slice(0, 8)} />
            </div>
          </section>
        ) : (
          <div className="flex min-h-64 items-center justify-center text-lg text-red-500">
            {t("top_rated.not_found")}
          </div>
        )}
        {discoverMovies ? (
          <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute -start-40 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative container mx-auto px-6 py-14 sm:px-8 lg:px-10">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-1 w-8 rounded-full bg-emerald-500" />

                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
                      {t("discover.sidetitle")}
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {t("discover.title")}
                  </h1>

                  <p className="mt-2 text-sm text-neutral-500">
                    {t("discover.subtitle")}
                  </p>
                </div>

                <Button content={t("common.show_all")} path="/discover" />
              </div>

              <Section movies={discoverMovies.results.slice(0, 8)} />
            </div>
          </section>
        ) : (
          <div className="flex min-h-64 items-center justify-center text-lg text-red-500">
            {t("discover.not_found")}
          </div>
        )}
      </main>
    </>
  );
}
