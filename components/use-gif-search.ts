'use client';

import { useState, useCallback, useRef } from 'react';
import { Gif } from '@/lib/types';
import { searchGifs, getTrendingGifs } from '@/app/actions';

interface UseGifSearchResult {
  gifs: Gif[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  search: (query: string) => Promise<void>;
  loadTrending: () => Promise<void>;
  loadMore: () => Promise<void>;
  clearError: () => void;
}

const RESULTS_PER_PAGE = 24;

export function useGifSearch(initialGifs: Gif[] = []): UseGifSearchResult {
  const [gifs, setGifs] = useState<Gif[]>(initialGifs);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const offsetRef = useRef(initialGifs.length);
  const currentQueryRef = useRef<string | null>(null);

  const search = useCallback(async (query: string, resetOffset = true) => {
    // Prevent duplicate searches
    if (currentQueryRef.current === query && query !== '' && resetOffset) {
      return;
    }

    const currentOffset = resetOffset ? 0 : offsetRef.current;

    if (resetOffset) {
      currentQueryRef.current = query;
      setIsLoading(true);
      offsetRef.current = 0;
    } else {
      setIsLoadingMore(true);
    }
    setError(null);

    try {
      const result = await searchGifs(query, currentOffset, RESULTS_PER_PAGE);

      if (resetOffset) {
        setGifs(result.data);
      } else {
        setGifs(prev => [...prev, ...result.data]);
      }

      offsetRef.current = currentOffset + result.data.length;
      setHasMore(currentOffset + result.data.length < result.totalCount);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setError(message);
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  const loadTrending = useCallback(async (resetOffset = true) => {
    const currentOffset = resetOffset ? 0 : offsetRef.current;

    if (resetOffset) {
      setIsLoading(true);
      currentQueryRef.current = null;
      offsetRef.current = 0;
    } else {
      setIsLoadingMore(true);
    }
    setError(null);

    try {
      const result = await getTrendingGifs(currentOffset, RESULTS_PER_PAGE);

      if (resetOffset) {
        setGifs(result.data);
      } else {
        setGifs(prev => [...prev, ...result.data]);
      }

      offsetRef.current = currentOffset + result.data.length;
      setHasMore(currentOffset + result.data.length < result.totalCount);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setError(message);
      console.error('Trending error:', err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    if (currentQueryRef.current) {
      await search(currentQueryRef.current, false);
    } else {
      await loadTrending(false);
    }
  }, [isLoadingMore, hasMore, search, loadTrending]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    gifs,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    search,
    loadTrending,
    loadMore,
    clearError,
  };
}
