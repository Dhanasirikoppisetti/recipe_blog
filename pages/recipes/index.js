import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RecipesPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect /recipes to home page
    router.replace(`/`);
  }, [router]);

  return null;
}
