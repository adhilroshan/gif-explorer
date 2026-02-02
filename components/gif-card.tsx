'use client';

import { Gif } from '@/lib/types';
import Image from 'next/image';
import { DEFAULT_BLUR_DATA_URL } from '@/lib/image-utils';

import { motion } from 'framer-motion';

interface GifCardProps {
  gif: Gif;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function GifCard({ gif, onClick, className, style }: GifCardProps) {
  const gifImage = gif.images.fixed_height;
  const stillImage = gif.images.fixed_height_still;

  return (
    <motion.button
      layoutId={`card-${gif.id}`}
      onClick={onClick}
      style={style}
      className={`group relative aspect-square overflow-hidden rounded-xl
        bg-zinc-100 dark:bg-zinc-800
        cursor-pointer
        border border-zinc-200 dark:border-zinc-700
        hover:border-purple-500/50 dark:hover:border-purple-500/50
        focus:outline-none focus:ring-2 focus:ring-purple-500
        focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${className || ''}`}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label={`View ${gif.title || 'GIF'}`}
    >
      <div className="relative h-full w-full">
        <motion.div className="relative h-full w-full" layoutId={`image-${gif.id}`}>
          <Image
            src={stillImage.url}
            alt={gif.title || 'GIF'}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_DATA_URL}
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <Image
            src={gifImage.url}
            alt={gif.title || 'GIF'}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_DATA_URL}
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </motion.div>
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm font-medium text-white truncate drop-shadow-md">
            {gif.title || 'Untitled'}
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}
