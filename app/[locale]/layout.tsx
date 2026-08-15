import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import "../[locale]/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cairo } from "next/font/google";
import { Metadata } from "next";
import TanstackProvider from "@/components/tanstack-provider";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
  display: "swap",
});
export const metadata: Metadata = {
  title: "MoviesBase",
};
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar" | "es")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${cairo.className} antialiased`}>
        <TanstackProvider>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
