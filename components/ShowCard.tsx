import { movieType } from "@/types/tmdb";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function ShowCard({ movie }: { movie: movieType }) {
  const t = useTranslations();
  const locale = useLocale();
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280";
  const rating = movie.vote_average.toFixed(1);
  const releaseDate = movie.release_date ? new Date(movie.release_date) : null;
  const releaseYear = releaseDate ? releaseDate.getFullYear() : null;
  const formattedDate = releaseDate
    ? releaseDate.toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : t("movie.release_date_n_a");
  return (
    <article className="group overflow-hidden bg-neutral-950 rounded-lg border border-neutral-800 shadow-sm transition duration-300 hover:border-neutral-900 hover:shadow-xl">
      <Link href={`/movie/${movie.id}`}>
        <div className="relative aspect-video overflow-hidden bg-neutral-950">
          {movie.backdrop_path ? (
            <Image
              src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
              alt={movie.title}
              width={1280}
              height={720}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-900">
              <span className="text-sm font-medium text-neutral-500">
                {t("common.noImage")}
              </span>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="absolute start-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur">
            {releaseYear}
          </div>

          <div className="absolute end-3 top-3 flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-neutral-950 shadow-sm">
            <span>{rating}</span>
          </div>
        </div>

        <div className="flex min-h-40 flex-col gap-3 p-4">
          <div className="space-y-1">
            <h2 className="line-clamp-2 font-bold leading-snug text-neutral-100 transition group-hover:text-emerald-600">
              {movie.title}
            </h2>

            <div className="flex items-center justify-between gap-3 text-xs font-medium text-neutral-300">
              <span>{formattedDate}</span>
              <span>
                {movie.vote_count.toLocaleString()} {t("movie.votes")}
              </span>
            </div>
          </div>

          <p className="line-clamp-3 text-sm leading-6 text-neutral-400">
            {movie.overview || t("movie.no_overview")}
          </p>
        </div>
      </Link>
    </article>
  );
}
