"use client";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations();
  return (
    <div className="flex min-h-[100vh] flex-col bg-neutral-950 items-center justify-center gap-3">
      <div className="h-20 w-20 animate-spin rounded-full border-4 border-neutral-700 border-t-emerald-500 mb-6" />
      <p className="text-sm font-medium text-emerald-500 animate-pulse">
        {t("common.loading")}
      </p>
    </div>
  );
}
