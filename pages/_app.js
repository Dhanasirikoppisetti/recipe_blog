
import "@/styles/globals.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NewsletterForm from "@/components/NewsletterForm";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config";
import { useTranslation } from "next-i18next";

function App({ Component, pageProps }) {
  const { t } = useTranslation("common");
  return (
    <>
      <header className="sticky top-0 z-50 bg-dark-secondary border-b border-dark-border p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
            {t("site_title")}
          </h1>
          <LanguageSwitcher />
        </div>
      </header>

      <Component {...pageProps} />

      <footer className="bg-dark-secondary border-t border-dark-border mt-16">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t("newsletter_title")}
            </h2>
            <p className="text-muted">
              {t("newsletter_subtitle")}
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <NewsletterForm />
          </div>
          <div className="mt-8 text-center text-muted text-sm">
            <p>&copy; 2026 {t("site_title")}. {t("footer_rights")}</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
