"use client";

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    startTransition(() => {
      const newPath = pathname.replace(
        new RegExp(`^/${locale}(?=/|$)`),
        `/${nextLocale}`,
      );
      router.replace(newPath);
    });
  };

  return (
    <div className="relative">
      <select
        value={locale}
        disabled={isPending}
        onChange={onSelectChange}
        className="cursor-pointer appearance-none rounded-md bg-neutral-800 py-1.5 pl-3 pr-8 text-sm font-medium text-gray-200 transition-colors hover:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
        aria-label={t("metadata.select_language")}
      >
        <option value="en">English</option>
        <option value="ar">العربية</option>
        <option value="es">Español</option>
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-emerald-400">
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
    </div>
  );
}
