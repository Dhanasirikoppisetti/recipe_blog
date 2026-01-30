import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  const locales = ["en", "es", "fr"];
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languageNames = {
    en: "🇬🇧 English",
    es: "🇪🇸 Español",
    fr: "🇫🇷 Français",
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      data-testid="language-switcher"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-slate-700 to-slate-800 border border-slate-600 rounded-xl hover:from-slate-600 hover:to-slate-700 text-foreground font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
      >
        <span className="text-base">{languageNames[locale]}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-600 rounded-xl shadow-2xl z-50 overflow-hidden animate-slideDown backdrop-blur-sm">
          {locales.map((lng) => {
            const isActive = lng === locale;
            return (
              <Link
                key={lng}
                href={{ pathname, query }}
                locale={lng}
                onClick={() => setIsOpen(false)}
                className={`block w-full px-5 py-3.5 text-left transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold shadow-inner"
                    : "text-slate-200 hover:bg-slate-700 hover:text-white font-medium"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{languageNames[lng]}</span>
                  {isActive && (
                    <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
