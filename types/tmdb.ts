export interface movieType {
  backdrop_path: string | null;
  genres: { id: number; name: string }[];
  runtime: number;
  id: number;
  tagline: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}
export interface movieResponse {
  page: number;
  results: movieType[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}
export interface genresResponse {
  genres: Genre[];
}
