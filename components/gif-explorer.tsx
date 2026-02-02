'use client';

import { useState } from 'react';
import { Gif } from '@/lib/types';
import { GifSearchBar } from '@/components/gif-search-bar';
import { GifGrid } from '@/components/gif-grid';
import { GifModal } from '@/components/gif-modal';
import { useGifSearch } from '@/components/use-gif-search';
import { AnimatePresence } from 'framer-motion';

interface GifExplorerProps {
  initialGifs?: Gif[];
}

export function GifExplorer({ initialGifs = [] }: GifExplorerProps) {
  const { gifs, isLoading, isLoadingMore, error, hasMore, search, loadTrending, loadMore, clearError } = useGifSearch(initialGifs);
  const [selectedGif, setSelectedGif] = useState<Gif | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      await search(query);
    } else {
      await loadTrending();
    }
  };

  const handleGifClick = (gif: Gif) => {
    setSelectedGif(gif);
  };

  const handleModalClose = () => {
    setSelectedGif(null);
  };

  const handleRetry = () => {
    clearError();
    if (searchQuery) {
      search(searchQuery);
    } else {
      loadTrending();
    }
  };

  const handleLoadMore = async () => {
    await loadMore();
  };

  return (
    <div className="min-h-screen bg-[#0F0F23] text-white overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/20 blur-[100px]" />
      </div>

      <header className="relative z-10 sticky top-0 w-full border-b border-white/5
        bg-[#0F0F23]/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-pulse shrink-0">
              GIF Explorer
            </h1>
            <div className="w-full max-w-xl">
              <GifSearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        {!error && gifs.length > 0 && searchQuery && (
          <div className="flex items-center gap-2 mb-6 text-zinc-400">
            <span className="text-sm">Results for</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium">
              &quot;{searchQuery}&quot;
            </span>
          </div>
        )}

        <GifGrid
          gifs={gifs}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          error={error}
          onGifClick={handleGifClick}
          onRetry={handleRetry}
          searchQuery={searchQuery}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        />
      </main>

      <footer className="relative z-10 container mx-auto px-4 py-8 text-center text-sm text-zinc-500">
        <p>Powered by Giphy API</p>
      </footer>

      <AnimatePresence>
        {selectedGif && (
          <GifModal gif={selectedGif} onClose={handleModalClose} />
        )}
      </AnimatePresence>
    </div>
  );
}
