import { useEffect, useRef, useState } from 'react';

interface UseLazyImageProps {
  src: string;
  placeholder?: string;
}

/**
 * Hook for lazy loading images with blur-up effect
 * Improves performance on slow networks
 */
export const useLazyImage = ({ src, placeholder }: UseLazyImageProps) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              setImageSrc(src);
              setIsLoading(false);
            };
            img.onerror = () => {
              console.error(`Failed to load image: ${src}`);
              setIsLoading(false);
            };
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '50px' } // Start loading 50px before entering viewport
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return { imageSrc, isLoading, ref: imgRef };
};

export default useLazyImage;
