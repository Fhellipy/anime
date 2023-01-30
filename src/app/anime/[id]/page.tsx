import { Description } from "@components/common/Description";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface AnimePageProps {
  params: { id: string };
}

export default async function AnimePage({ params }: AnimePageProps) {
  return <Description idAnime={params.id} />;
}

export { AnimePage };
