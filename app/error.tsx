// app/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-zinc-400 mb-6">{error.message}</p>
      <button onClick={reset} className="px-6 py-3 bg-purple-600 rounded-lg">
        Try again
      </button>
    </div>
  );
}
