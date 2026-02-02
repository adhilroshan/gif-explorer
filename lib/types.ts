// Giphy API Response Types

export interface GifImage {
  url: string;
  width: string;
  height: string;
  size: string;
  mp4?: string;
  mp4_size?: string;
  webp?: string;
  webp_size?: string;
}

export interface GifUser {
  avatar_url: string;
  banner_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
}

export interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: GifImage;
    fixed_height_still: GifImage;
    fixed_width: GifImage;
    fixed_width_still: GifImage;
    original: GifImage;
    original_still: GifImage;
    preview_gif: GifImage;
    preview_webp: GifImage;
  };
  user?: GifUser;
  username?: string;
  rating: string;
  source: string;
  source_tld: string;
  slug: string;
  type: string;
  url: string;
  bitly_url: string;
  bitly_gif_url: string;
  embed_url: string;
  import_datetime: string;
  trending_datetime: string;
}

export interface GifSearchResponse {
  data: Gif[];
  pagination: {
    offset: number;
    total_count: number;
    count: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}

export type EmptyStateType = 'no-results' | 'error';
