import { CardAnime } from "@components/common/CardAnime";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface AnimePageProps {
  params: { id: string };
}

export default async function AnimePage({ params }: AnimePageProps) {
  return <CardAnime idAnime={params.id} />;
}