// pages/index.js
import Link from "next/link";
import Image from "next/image";
import { getFeaturedRecipes, getStrapiMedia } from "../lib/recipes";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home({ recipes = [] }) {
  const { t } = useTranslation("common");

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
        {t("featured_recipes")}
      </h1>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        data-testid="featured-recipes"
      >
        {recipes.map(({ id, title, slug, featuredImage }) => {
          if (!slug) return null;

          const mediumUrl =
            featuredImage?.formats?.medium?.url || featuredImage?.url;
          const imageUrl = getStrapiMedia(mediumUrl);

          return (
            <Link
              key={id}
              href={`/recipes/${slug}`}
              className="card-animated overflow-hidden h-full flex flex-col"
              data-testid="recipe-card"
            >
              <div className="recipe-image-container">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="recipe-image"
                  />
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between p-4">
                <h2 className="font-semibold text-lg text-foreground line-clamp-2">{title}</h2>
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
    const recipes = await getFeaturedRecipes(locale);

    return {
      props: {
        recipes,
        ...(await serverSideTranslations(locale, ["common"])),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.warn(
      `Failed to fetch featured recipes for locale ${locale}:`,
      error.message
    );
    return {
      props: {
        recipes: [],
        ...(await serverSideTranslations(locale, ["common"])),
      },
      revalidate: 10,
    };
  }
}
