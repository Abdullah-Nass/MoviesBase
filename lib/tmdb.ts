import { genresResponse, movieResponse, movieType } from "@/types/tmdb";
import axios from "axios";
import { unstable_cache } from "next/cache";

export async function fetchTrending({
  locale,
  page = 1,
}: {
  locale: string;
  page?: number;
}): Promise<movieResponse | null> {
  try {
    const response = await axios.get<movieResponse>(
      `https://api.themoviedb.org/3/trending/movie/day`,
      {
        params: { language: locale, page },
        headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
      },
    );
    return response.data;
  } catch {
    return null;
  }
}

export async function fetchDiscover({
  locale,
  page = 1,
  genreId,
}: {
  locale: string;
  page?: number;
  genreId?: string;
}): Promise<movieResponse | null> {
  try {
    const response = await axios.get<movieResponse>(
      `https://api.themoviedb.org/3/discover/movie`,
      {
        params: {
          language: locale,
          page,
          include_adult: false,
          with_genres: genreId,
        },
        headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
      },
    );
    return response.data;
  } catch {
    return null;
  }
}
export async function fetchTopRated({
  locale,
  page = 1,
}: {
  locale: string;
  page?: number;
}): Promise<movieResponse | null> {
  try {
    const response = await axios.get<movieResponse>(
      `https://api.themoviedb.org/3/movie/top_rated`,
      {
        params: { language: locale, page },
        headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
      },
    );
    return response.data;
  } catch {
    return null;
  }
}
export async function fetchSearch({
  locale,
  q,
  page = 1,
}: {
  locale: string;
  q: string;
  page?: number;
}): Promise<movieResponse | null> {
  try {
    const response = await axios.get<movieResponse>(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: { language: locale, page, query: q },
        headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
      },
    );
    if (!response.data.total_results) {
      return null;
    }
    return response.data;
  } catch {
    return null;
  }
}

const getGenres = unstable_cache(
  async (locale: string) => {
    try {
      const response = await axios.get<genresResponse>(
        "https://api.themoviedb.org/3/genre/movie/list",
        {
          params: {
            language: locale,
          },
          headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
          },
        },
      );

      return response.data;
    } catch {
      return null;
    }
  },
  ["movie-genres"],
  {
    revalidate: 86400,
    tags: ["genres"],
  },
);

export async function fetchGenres({
  locale,
}: {
  locale: string;
}): Promise<genresResponse | null> {
  return getGenres(locale);
}

export async function fetchMovie(
  locale: string,
  movie_id: string,
): Promise<movieType | null> {
  try {
    const response = await axios.get<movieType>(
      `https://api.themoviedb.org/3/movie/${movie_id}`,
      {
        params: { language: locale },
        headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
      },
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return null;
    }
    throw err;
  }
}
