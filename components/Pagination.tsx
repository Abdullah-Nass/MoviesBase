import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
  path,
  query,
}: {
  currentPage: number;
  totalPages: number;
  path: string;
  query?: string;
}) {
  const t = useTranslations();
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = totalPages > 0 && currentPage < totalPages;
  const buildUrl = (targetPage: number) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    params.set("page", targetPage.toString());

    return `/${path}?${params.toString()}`;
  };
  return (
    <nav
      aria-label={t("metadata.pagination")}
      className="mt-8 flex items-center justify-center gap-3"
    >
      {hasPreviousPage ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="rounded-md px-5 py-2 font-semibold text-white transition hover:bg-gray-800 hover:text-emerald-400 active:scale-95"
        >
          {t("common.previous")}
        </Link>
      ) : (
        <span className="rounded-md cursor-not-allowed bg-gray-200 px-5 py-2 font-semibold text-gray-500">
          {t("common.previous")}
        </span>
      )}

      <span className="font-medium text-emerald-600">
        {t("common.page_count", {
          current: currentPage,
          total: totalPages,
        })}
      </span>

      {hasNextPage ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="rounded-md px-5 py-2 font-semibold text-white transition hover:bg-gray-800 hover:text-emerald-400 active:scale-95"
        >
          {t("common.next")}
        </Link>
      ) : (
        <span className="rounded-md cursor-not-allowed bg-gray-200 px-5 py-2 font-semibold text-gray-500">
          {t("common.next")}
        </span>
      )}
    </nav>
  );
}
