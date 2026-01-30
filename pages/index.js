// pages/index.js
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllRecipes, getStrapiMedia } from "../lib/recipes";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

export default function Home({ recipes = [], categories = [] }) {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setSearch("");
    setCategory("");
  }, [locale]);

  // Get featured recipes
  const featuredRecipes = useMemo(() => {
    return recipes.filter((r) => r.isFeatured);
  }, [recipes]);

  // Filter all recipes for search/category
  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const matchText = r.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory =
        !category || r.cusine.toLowerCase() === category.toLowerCase();
      return matchText && matchCategory;
    });
  }, [recipes, search, category]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Featured Recipes Section */}
      {featuredRecipes.length > 0 && (
        <section className="mb-14">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
            {t("featured_recipes") || "Featured Recipes"}
          </h2>
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            data-testid="featured-recipes"
          >
            {featuredRecipes.map((r) => {
              const mediumUrl =
                r.featuredImage?.formats?.medium?.url ||
                r.featuredImage?.url;
              const imageUrl = getStrapiMedia(mediumUrl);

              return (
                <Link
                  key={r.id}
                  href={`/recipes/${r.slug}`}
                  className="card-animated overflow-hidden h-full flex flex-col"
                  data-testid="recipe-card"
                >
                  <div className="recipe-image-container">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={r.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="recipe-image"
                      />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between p-4">
                    <h3 className="font-semibold text-lg text-foreground line-clamp-2 mb-2">
                      {r.title}
                    </h3>
                    {r.cusine && (
                      <p className="text-sm text-muted">
                        {r.cusine}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* All Recipes Section with Search and Filter */}
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
        {t("all_recipes")}
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 no-print">
        <input
          data-testid="search-input"
          className="border rounded px-3 py-2 flex-1"
          placeholder={t("search_placeholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          data-testid="category-filter"
          className="border rounded px-3 py-2 md:w-56"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">{t("all_categories")}</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((r) => {
          const mediumUrl =
            r.featuredImage?.formats?.medium?.url ||
            r.featuredImage?.url;
          const imageUrl = getStrapiMedia(mediumUrl);

          return (
            <Link
              key={r.id}
              href={`/recipes/${r.slug}`}
              className="card-animated overflow-hidden h-full flex flex-col"
              data-testid="recipe-card"
            >
              <div className="recipe-image-container">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={r.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="recipe-image"
                  />
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between p-4">
                <h2 className="font-semibold text-lg text-foreground line-clamp-2 mb-2">
                  {r.title}
                </h2>
                {r.cusine && (
                  <p className="text-sm text-muted">
                    {r.cusine}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

export async function getStaticProps({ locale }) {
  try {
    const recipes = await getAllRecipes(locale);
    const categories = Array.from(
      new Set(
        recipes
          .map((r) => r.cusine)
          .filter((c) => c && c.trim().length > 0)
      )
    ).sort((a, b) => a.localeCompare(b));

    return {
      props: {
        recipes,
        categories,
        ...(await serverSideTranslations(locale, ["common"])),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.warn(`Failed to fetch recipes for locale ${locale}:`, error.message);
    return {
      props: {
        recipes: [],
        categories: [],
        ...(await serverSideTranslations(locale, ["common"])),
      },
      revalidate: 10,
    };
  }
}
