import { fetchSearch } from "@/lib/tmdb";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const locale = req.nextUrl.searchParams.get("locale") ?? "en";
  const movies = await fetchSearch({ locale, q, page: 1 });
  return Response.json(movies);
}
