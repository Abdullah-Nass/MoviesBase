import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function Button({
  content,
  path,
  direction = "front",
}: {
  content: string;
  path: string;
  direction?: string;
}) {
  const locale = useLocale();
  return (
    <div className="mt-6 flex justify-center">
      <Link
        href={`/${locale}/${path}`}
        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700 whitespace-nowrap"
      >
        <span>{content}</span>

        <FontAwesomeIcon
          icon={direction === "back" ? faArrowLeft : faArrowRight}
          className={`${
            direction === "back"
              ? "order-first group-hover:-translate-x-1 rtl:group-hover:translate-x-1"
              : "group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          } 
        h-3.5 w-3.5 transition-transform duration-300 rtl:rotate-180
      `}
        />
      </Link>
    </div>
  );
}
