export default function RecipesPage() {
  return null;
}

export async function getServerSideProps({ locale }) {
  return {
    redirect: {
      destination: `/`,
      permanent: true,
    },
  };
}
