'use client';

import { EmptyStateType } from '@/lib/types';

interface EmptyStateProps {
  type: EmptyStateType;
  message?: string;
  onRetry?: () => void;
}

export function EmptyState({ type, message, onRetry }: EmptyStateProps) {
  if (type === 'no-results') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="animate-float mb-4">
          <svg
            className="w-16 h-16 text-white/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          No GIFs found
        </h3>
        <p className="text-zinc-400 max-w-sm">
          {message || 'Try searching for something else or browse trending GIFs.'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="animate-float mb-4">
        <svg
          className="w-16 h-16 text-red-400/80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-zinc-400 max-w-sm mb-4">
        {message || 'Failed to load GIFs. Please try again.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600
            hover:from-purple-700 hover:to-pink-700
            text-white font-medium rounded-full
            transition-all duration-200
            cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-purple-500
            focus:ring-offset-2 dark:focus:ring-offset-zinc-900
            hover:shadow-lg hover:shadow-purple-500/25"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
