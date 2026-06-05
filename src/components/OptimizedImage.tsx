import { CSSProperties, ImgHTMLAttributes } from "react";

export interface OptimizedImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "loading" | "decoding"> {
  src: string;
  alt: string;
  /** Above-the-fold / LCP candidate: eager + high priority + sync decode. */
  priority?: boolean;
  /** Native loading. Defaults to "lazy" (or "eager" when priority). */
  loading?: "lazy" | "eager";
  /** Native decoding. Defaults to "async". */
  decoding?: "async" | "sync" | "auto";
  /** Native fetchpriority. Omitted unless explicitly set or priority is true. */
  fetchPriority?: "high" | "low" | "auto";
  /** Convenience: applied via inline style if provided. */
  objectFit?: CSSProperties["objectFit"];
  objectPosition?: CSSProperties["objectPosition"];
}

/**
 * Thin, explicit wrapper around <img> that enforces performance defaults.
 * - lazy + async by default
 * - eager + fetchpriority="high" when `priority` is set (for hero / LCP)
 * - width/height should always be supplied to reserve layout space (reduces CLS)
 */
const OptimizedImage = ({
  priority = false,
  loading,
  decoding,
  fetchPriority,
  sizes,
  srcSet,
  objectFit,
  objectPosition,
  style,
  ...rest
}: OptimizedImageProps) => {
  const resolvedLoading = loading ?? (priority ? "eager" : "lazy");
  const resolvedDecoding = decoding ?? "async";
  const resolvedFetchPriority = fetchPriority ?? (priority ? "high" : undefined);

  const mergedStyle: CSSProperties | undefined =
    objectFit || objectPosition
      ? { objectFit, objectPosition, ...(style || {}) }
      : style;

  return (
    <img
      loading={resolvedLoading}
      decoding={resolvedDecoding}
      fetchPriority={resolvedFetchPriority}
      sizes={sizes}
      srcSet={srcSet}
      style={mergedStyle}
      {...rest}
    />
  );
};

export default OptimizedImage;
