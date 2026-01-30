// components/NewsletterForm.js
import { useState } from "react";
import { useTranslation } from "next-i18next";

export default function NewsletterForm() {
  const { t } = useTranslation("common");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError(t("newsletter_invalid_email"));
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <div 
        className="p-4 bg-green-500 bg-opacity-20 border-2 border-green-500 rounded-lg text-green-400 text-center"
        data-testid="newsletter-success"
      >
        ✓ {t("newsletter_success")}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      data-testid="newsletter-form"
      className="flex flex-col md:flex-row gap-3"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("newsletter_placeholder")}
        data-testid="newsletter-email"
        className="flex-1 bg-dark-tertiary border-2 border-dark-border rounded-lg px-4 py-3 text-foreground placeholder-muted focus:border-accent focus:outline-none transition-all"
      />
      <button
        type="submit"
        data-testid="newsletter-submit"
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
      >
        {t("newsletter_button")}
      </button>
      {error && (
        <p
          className="text-red-400 text-sm mt-2"
          data-testid="newsletter-error"
        >
          {error}
        </p>
      )}
    </form>
  );
}
