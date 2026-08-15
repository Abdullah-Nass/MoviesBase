import { movieResponse } from "@/types/tmdb";
import axios from "axios";

export async function searchMovies(
  q: string,
  locale: string,
): Promise<movieResponse> {
  try {
    const response = await axios.get(`/api/search`, { params: { q, locale } });
    return response.data;
  } catch {
    throw new Error("Search failed");
  }
}
