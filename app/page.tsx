import { getTrendingGifs } from '@/app/actions';
import { GifExplorer } from '@/components/gif-explorer';

export default async function Home() {
  const { data: initialGifs } = await getTrendingGifs();

  return <GifExplorer initialGifs={initialGifs} />;
}
