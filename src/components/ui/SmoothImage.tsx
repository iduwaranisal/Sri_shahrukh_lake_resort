"use client";

import { useState, useRef, useEffect } from "react";
import Image, { ImageProps } from "next/image";

export interface SmoothImageProps extends ImageProps {
  wrapperClassName?: string;
  showShimmer?: boolean;
}

/**
 * High-performance, GPU-accelerated Image wrapper with smooth loading transitions.
 * - Shows an elegant luxury gold/dark teal shimmer skeleton while bytes download.
 * - Transitions smoothly from blur(5px) + scale(1.02) to crisp blur(0) + scale(1).
 * - Instantly handles browser-cached images without ghosting or delay.
 */
export function SmoothImage({
  className = "",
  alt,
  onLoad,
  showShimmer = true,
  ...props
}: SmoothImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Check if the image was already cached and completed synchronously
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <>
      {showShimmer && !isLoaded && (
        <span
          className="absolute inset-0 z-0 pointer-events-none image-placeholder-shimmer"
          aria-hidden="true"
        />
      )}
      <Image
        ref={imgRef}
        {...props}
        alt={alt}
        onLoad={(e) => {
          setIsLoaded(true);
          onLoad?.(e);
        }}
        className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isLoaded
            ? "opacity-100 blur-0 scale-100"
            : "opacity-0 blur-[5px] scale-[1.02]"
        } ${className}`}
      />
    </>
  );
}

export default SmoothImage;
