'use client';

interface LoadingSkeletonProps {
  count?: number;
}

export function LoadingSkeleton({ count = 6 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="aspect-square rounded-xl bg-white/5 skeleton-shimmer border border-white/5"
          aria-hidden="true"
        />
      ))}
    </>
  );
}
