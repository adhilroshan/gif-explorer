'use client';

import { Gif } from '@/lib/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { DEFAULT_BLUR_DATA_URL } from '@/lib/image-utils';
import { motion } from 'framer-motion';

interface GifModalProps {
  gif: Gif | null;
  onClose: () => void;
}

export function GifModal({ gif, onClose }: GifModalProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!gif) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [gif, onClose]);

  if (!gif) {
    return null;
  }

  const gifImage = gif.images.original;
  const title = gif.title || 'Untitled GIF';
  const user = gif.user;
  const width = parseInt(gifImage.width);
  const height = parseInt(gifImage.height);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        layoutId={`card-${gif.id}`}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl
          bg-[#0F0F23] border border-white/10 shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full
            bg-black/50 text-white/80 hover:bg-white hover:text-black
            transition-all duration-200 backdrop-blur-sm
            focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Section */}
        <div className="flex-1 relative bg-black/50 flex items-center justify-center min-h-[300px] md:min-h-[500px] p-4">
           <motion.div
             className="relative w-full h-full flex items-center justify-center"
             layoutId={`image-${gif.id}`}
           >
            <Image
              src={gifImage.url}
              alt={title}
              width={width}
              height={height}
              className={`max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-lg
                transition-all duration-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              placeholder="blur"
              blurDataURL={DEFAULT_BLUR_DATA_URL}
              onLoad={() => setIsLoaded(true)}
              priority
            />
          </motion.div>
        </div>

        {/* Sidebar / Info Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full md:w-96 bg-zinc-900/90 backdrop-blur-xl border-l border-white/5 p-6 md:p-8 flex flex-col overflow-y-auto max-h-[40vh] md:max-h-[90vh]"
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 font-display leading-tight">
                {title}
              </h2>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                {user?.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt={user.display_name || user.username}
                    width={48}
                    height={48}
                    className="rounded-full ring-2 ring-purple-500/30 group-hover:ring-purple-500 transition-all"
                  />
                ) : (
                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                    {user?.username?.[0]?.toUpperCase() || 'A'}
                   </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">
                    {user?.display_name || user?.username || 'Anonymous'}
                  </p>
                  {user?.username && (
                    <p className="text-sm text-zinc-400 truncate">@{user.username}</p>
                  )}
                </div>
                {user?.is_verified && (
                   <div className="bg-blue-500/20 p-1.5 rounded-full">
                    <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
               <div className="flex flex-wrap gap-2">
                 <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">
                   Rating: <span className="text-white">{gif.rating.toUpperCase()}</span>
                 </div>
                 <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">
                   Type: <span className="text-white capitalize">{gif.type}</span>
                 </div>
                 {gif.import_datetime && (
                    <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">
                      Uploaded: <span className="text-white">{new Date(gif.import_datetime).toLocaleDateString()}</span>
                    </div>
                 )}
               </div>

               {/* Action Buttons */}
               <div className="flex gap-3 pt-4 border-t border-white/10">
                  <a
                    href={gifImage.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Original
                  </a>
                  {gif.source && (
                    <a
                      href={gif.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Source
                    </a>
                  )}
               </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
