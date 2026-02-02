'use server';

import { Gif, GifSearchResponse } from '@/lib/types';

const GIPHY_API_BASE = 'https://api.giphy.com/v1/gifs';
const API_KEY = process.env.GIPHY_API_KEY;

async function fetchFromGiphy(endpoint: string): Promise<GifSearchResponse> {
  if (!API_KEY) {
    throw new Error('Giphy API key is not configured server-side (GIPHY_API_KEY).');
  }

  const url = `${GIPHY_API_BASE}${endpoint}&api_key=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Giphy API error: ${response.statusText}`);
    }

    const data: GifSearchResponse = await response.json();

    if (data.meta.status !== 200) {
      throw new Error(data.meta.msg);
    }

    return data;
  } catch (error) {
    console.error('Giphy API Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch from Giphy API');
  }
}

export async function searchGifs(query: string, offset = 0, limit = 24): Promise<{ data: Gif[]; totalCount: number }> {
  if (!query.trim()) {
    throw new Error('Search query cannot be empty');
  }

  const endpoint = `/search?q=${encodeURIComponent(query)}&offset=${offset}&limit=${limit}&rating=g`;
  const response = await fetchFromGiphy(endpoint);
  return {
    data: response.data,
    totalCount: response.pagination.total_count,
  };
}

export async function getTrendingGifs(offset = 0, limit = 24): Promise<{ data: Gif[]; totalCount: number }> {
  const endpoint = `/trending?offset=${offset}&limit=${limit}&rating=g`;
  const response = await fetchFromGiphy(endpoint);
  return {
    data: response.data,
    totalCount: response.pagination.total_count,
  };
}
