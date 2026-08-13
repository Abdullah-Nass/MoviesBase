import { fetchMovie } from "@/lib/tmdb";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import MovieDetails from "@/components/MovieDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const locale = await getLocale();
  const { movieId } = await params;

  const movie = await fetchMovie(locale, movieId);

  if (!movie) {
    notFound();
  }

  return <MovieDetails movie={movie} />;
}
