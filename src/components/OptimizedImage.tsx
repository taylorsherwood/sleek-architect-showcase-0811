import { ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Whether this image is above the fold / LCP candidate */
  priority?: boolean;
}

/**
 * Thin wrapper that enforces performance defaults on every <img>.
 * - lazy loading unless `priority` is set
 * - async decoding unless priority
 * - responsive `sizes` hint when none provided
 */
const OptimizedImage = ({
  priority = false,
  loading,
  decoding,
  sizes,
  ...rest
}: OptimizedImageProps) => (
  <img
    loading={loading ?? (priority ? "eager" : "lazy")}
    decoding={decoding ?? (priority ? "sync" : "async")}
    sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
    {...rest}
  />
);

export default OptimizedImage;
