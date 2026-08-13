import { movieType } from "@/types/tmdb";
import ShowCard from "./ShowCard";

export default function Section({ movies }: { movies: movieType[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {movies.map((movie: movieType) => (
        <ShowCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
