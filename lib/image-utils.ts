/**
 * Image utilities for blur-up loading effect
 *
 * Generates base64-encoded SVG placeholders for Next.js Image component
 * to provide smooth blur-up transitions while images load.
 */

/**
 * Default blur data URL for Next.js Image placeholder="blur"
 *
 * A subtle gray SVG placeholder that provides visual feedback
 * during image loading. Used as the blurDataURL prop.
 */
export const DEFAULT_BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMzZjNmNDYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxODE4MWIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+';

/**
 * Generate a custom blur data URL with specified dimensions and color
 *
 * @param width - SVG width in pixels (default: 10)
 * @param height - SVG height in pixels (default: 10)
 * @param color - Fill color as hex string (default: "#e4e4e7" - zinc-300)
 * @returns Base64-encoded SVG data URL
 *
 * @example
 * ```ts
 * const customBlur = getBlurDataURL(20, 20, "#f0f0f0");
 * <Image src={src} placeholder="blur" blurDataURL={customBlur} />
 * ```
 */
export function getBlurDataURL(
  width: number = 10,
  height: number = 10,
  color: string = "#e4e4e7"
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}" />
    </svg>
  `.trim();

  // Convert to base64
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Generate a blurred gradient placeholder for a more premium feel
 *
 * @returns Base64-encoded SVG with gradient data URL
 */
export function getGradientBlurDataURL(): string {
  const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f4f4f5"/>
          <stop offset="100%" stop-color="#e4e4e7"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>
  `.trim();

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}
