'use client';

import { Gif } from '@/lib/types';
import { GifCard } from './gif-card';
import { LoadingSkeleton } from './loading-skeleton';
import { EmptyState } from './empty-state';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface GifGridProps {
  gifs: Gif[];
  isLoading: boolean;
  isLoadingMore?: boolean;
  error?: string | null;
  onGifClick: (gif: Gif) => void;
  onRetry?: () => void;
  searchQuery?: string;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export function GifGrid({
  gifs,
  isLoading,
  isLoadingMore = false,
  error,
  onGifClick,
  onRetry,
  searchQuery,
  hasMore = false,
  onLoadMore,
}: GifGridProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && hasMore && !isLoadingMore && onLoadMore) {
      onLoadMore();
    }
  }, [inView, hasMore, isLoadingMore, onLoadMore]);

  if (error) {
    return <EmptyState type="error" message={error} onRetry={onRetry} />;
  }

  if (!isLoading && gifs.length === 0) {
    const message = searchQuery
      ? `No GIFs found for "${searchQuery}"`
      : undefined;
    return <EmptyState type="no-results" message={message} />;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {gifs.map((gif, index) => (
          <GifCard
            key={gif.id}
            gif={gif}
            onClick={() => onGifClick(gif)}
            style={{
              animationDelay: `${Math.min(index * 50, 300)}ms`,
            }}
          />
        ))}
        {isLoading && <LoadingSkeleton count={8} />}
      </div>

      {hasMore && !isLoading && (
        <div ref={ref} className="mt-8 flex justify-center py-4 w-full">
          {(isLoadingMore || inView) && (
            <svg className="animate-spin h-8 w-8 text-purple-600" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          )}
        </div>
      )}
    </>
  );
}
