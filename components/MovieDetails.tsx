import { movieType } from "@/types/tmdb";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function MovieDetails({ movie }: { movie: movieType }) {
  const t = useTranslations();
  const locale = useLocale();
  const runtime_h = Math.floor(movie.runtime / 60);
  const runtime_m = movie.runtime % 60;
  const runtime = movie.runtime
    ? t("movie.runtime", { hour: runtime_h, minutes: runtime_m })
    : t("n_a");
  const releaseDate = movie.release_date ? new Date(movie.release_date) : null;
  const formattedDate = releaseDate
    ? releaseDate.toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : t("movie.release_date_n_a");
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="relative min-h-[650px] overflow-hidden">
        {movie.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            priority
            className="object-cover opacity-40"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/30" />

        <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-end px-6 pb-16 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end">
            <div className="relative hidden w-64 shrink-0 overflow-hidden rounded-xl shadow-2xl md:block">
              {movie.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="h-auto w-full"
                />
              )}
            </div>

            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-white/10 px-3 py-1 text-sm text-zinc-200 backdrop-blur"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="mt-4 text-lg italic text-zinc-400">
                  {movie.tagline}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-zinc-300">
                <span>{formattedDate}</span>

                <span>•</span>

                <span>{runtime}</span>

                <span>•</span>

                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="h-3 w-3 text-yellow-300"
                  />
                  <strong className="text-white">
                    {movie.vote_average.toFixed(1)}
                  </strong>
                  <span className="text-zinc-400">/ 10</span>
                </span>
              </div>

              <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="text-2xl font-bold">{t("movie.details_title")}</h2>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-zinc-500">{t("movie.release_date")}</p>
            <p className="mt-2 font-medium">{formattedDate}</p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">{t("movie.runtime_title")}</p>
            <p className="mt-2 font-medium">{runtime}</p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">{t("movie.original_lang")}</p>
            <p className="mt-2 font-medium uppercase">
              {movie.original_language}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">{t("movie.popularity")}</p>
            <p className="mt-2 font-medium">{movie.popularity.toFixed(0)}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
