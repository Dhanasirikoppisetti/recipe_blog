// pages/index.js
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllRecipes, getStrapiMedia } from "../lib/recipes";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home({ recipes = [], categories = [] }) {
  const { t } = useTranslation("common");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

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
      <h1 className="text-3xl font-bold mb-6">
        {t("featured_recipes")}
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
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
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        data-testid="featured-recipes"
      >
        {filtered.map(({ id, title, slug, featuredImage, cusine }) => {
          if (!slug) return null;

          const mediumUrl =
            featuredImage?.formats?.medium?.url || featuredImage?.url;
          const imageUrl = getStrapiMedia(mediumUrl);

          return (
            <Link
              key={id}
              href={`/recipes/${slug}`}
              className="card-animated overflow-hidden rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col h-full bg-white"
              data-testid="recipe-card"
            >
              <div className="relative w-full h-48 overflow-hidden">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition duration-300"
                  />
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h2 className="font-bold text-lg text-blue-600 hover:text-blue-800 line-clamp-2">
                  {title}
                </h2>
                {cusine && (
                  <p className="text-sm text-gray-500 mt-2">{cusine}</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

export async function getServerSideProps({ locale }) {
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
    };
  } catch (error) {
    return {
      props: {
        recipes: [],
        categories: [],
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }
}
