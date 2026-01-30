// pages/recipes/[slug].js
import Image from "next/image";
import { useRouter } from "next/router";
import {
  getRecipeBySlug,
  getAllRecipes,
  getStrapiMedia,
} from "../../lib/recipes";
import SocialShare from "../../components/SocialShare";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function renderRichTextLines(nodes) {
  return (nodes || [])
    .map((n) =>
      (n?.children || [])
        .map((c) => (c?.text || "").trim())
        .join(" ")
    )
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function RecipePage({ recipe }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  if (!recipe) {
    return <p className="text-center mt-10">{t("recipe_not_found")}</p>;
  }

  const {
    title,
    ingredients,
    instructions,
    featuredImage,
    cusine,
    difficulty,
    cookingTime,
    description,
  } = recipe;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const currentUrl = `${baseUrl}${router.asPath}`;

  const largeUrl =
    featuredImage?.formats?.large?.url || featuredImage?.url;
  const imageUrl = getStrapiMedia(largeUrl);

  const descriptionLines = renderRichTextLines(description || []);
  const ingredientsList = renderRichTextLines(ingredients).map((item) =>
    item.replace(/^[-•]\s*/, "")
  );
  const instructionsList = renderRichTextLines(instructions).map((step) =>
    step.replace(/^\d+\.\s*/, "")
  );

  const comments = recipe.comments || [];

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1
        className="text-3xl font-bold mb-6"
        data-testid="recipe-title"
      >
        {title}
      </h1>

      <div className="mb-6 no-print">
        <SocialShare url={currentUrl} title={title} />
      </div>

      {imageUrl && (
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover rounded"
            priority
          />
        </div>
      )}

      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {cusine && (
          <div className="card-info bg-gradient-to-br from-slate-600 to-slate-700 p-4 rounded-lg shadow-lg">
            <div className="text-slate-100 text-sm font-semibold uppercase tracking-wide mb-1">{t("cuisine")}</div>
            <div className="text-white text-lg font-bold">{cusine}</div>
          </div>
        )}
        {difficulty && (
          <div className="card-info bg-gradient-to-br from-slate-600 to-slate-700 p-4 rounded-lg shadow-lg">
            <div className="text-slate-100 text-sm font-semibold uppercase tracking-wide mb-1">{t("difficulty")}</div>
            <div className="text-white text-lg font-bold">{difficulty}</div>
          </div>
        )}
        {typeof cookingTime === "number" && (
          <div className="card-info bg-gradient-to-br from-slate-600 to-slate-700 p-4 rounded-lg shadow-lg">
            <div className="text-slate-100 text-sm font-semibold uppercase tracking-wide mb-1">{t("cook_time")}</div>
            <div className="text-white text-lg font-bold">{cookingTime} {t("minutes")}</div>
          </div>
        )}
      </div>

      {descriptionLines.length > 0 && (
        <section className="mb-6">
          {descriptionLines.map((line, i) => (
            <p key={i} className="mb-1">
              {line}
            </p>
          ))}
        </section>
      )}

      <section className="mb-8">
        <h2
          className="text-xl font-semibold mb-3"
          data-testid="ingredients-heading"
        >
          {t("ingredients")}
        </h2>
        <ul
          className="list-disc pl-6 space-y-1"
          data-testid="recipe-ingredients"
        >
          {ingredientsList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 
          className="text-xl font-semibold mb-3"
          data-testid="instructions-heading"
        >
          {t("instructions")}
        </h2>
        <ol
          className="list-decimal pl-6 space-y-2"
          data-testid="recipe-instructions"
        >
          {instructionsList.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>


    </main>
  );
}

export async function getStaticProps({ params, locale }) {
  try {
    const recipe = await getRecipeBySlug(params.slug, locale);
    if (!recipe) {
      return { notFound: true };
    }
    return {
      props: {
        recipe,
        ...(await serverSideTranslations(locale, ["common"])),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.warn(`Failed to fetch recipe ${params.slug} for locale ${locale}:`, error.message);
    return {
      notFound: true,
      revalidate: 10,
    };
  }
}

export async function getStaticPaths({ locales }) {
  const paths = [];

  if (locales && locales.length > 0 && process.env.NEXT_PUBLIC_STRAPI_URL) {
    try {
      for (const locale of locales) {
        const recipes = await getAllRecipes(locale);
        recipes.forEach((recipe) => {
          paths.push({
            params: { slug: recipe.slug },
            locale,
          });
        });
      }
    } catch (error) {
      console.warn("Failed to generate static paths during build:", error.message);
    }
  }

  return {
    paths,
    fallback: "blocking",
  };
}
