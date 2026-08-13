import { getLocale } from "next-intl/server";
import { fetchGenres } from "@/lib/tmdb";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const locale = await getLocale();

  const genres = await fetchGenres({ locale });

  return <NavbarClient locale={locale} genres={genres?.genres ?? []} />;
}
