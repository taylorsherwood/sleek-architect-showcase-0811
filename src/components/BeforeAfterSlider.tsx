import { useRef, useState, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Original",
  afterLabel = "Reimagined",
}: BeforeAfterSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const updatePosition = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(2, Math.min(98, (x / rect.width) * 100));
      setPosition(pct);
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded >= 2) setIsLoaded(true);
    };
    const img1 = new Image();
    const img2 = new Image();
    img1.onload = onLoad;
    img2.onload = onLoad;
    img1.src = beforeImage;
    img2.src = afterImage;
  }, [beforeImage, afterImage]);

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none overflow-hidden"
      style={{ cursor: isDragging ? "ew-resize" : "default" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* After image (full, underneath) */}
      <img
        src={afterImage}
        alt="After renovation"
        className="block w-full h-auto"
        draggable={false}
        style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.4s" }}
                    loading="lazy" decoding="async"
                    />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeImage}
          alt="Before renovation"
          className="block h-full object-cover"
          style={{
            width: containerRef.current
              ? `${containerRef.current.offsetWidth}px`
              : "100%",
            maxWidth: "none",
          }}
          draggable={false}
                    loading="lazy" decoding="async"
                    />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div
          className="h-full"
          style={{ width: "0.5px", backgroundColor: "hsl(var(--gold-light) / 0.3)" }}
        />
      </div>

      {/* Handle */}
      <div
        className="absolute top-1/2 pointer-events-none"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%) translateY(-50%)",
        }}
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 22,
            height: 22,
            backgroundColor: "rgba(255,255,255,0.82)",
            border: "0.5px solid hsl(var(--gold-light) / 0.4)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <svg width="8" height="8" viewBox="0 0 14 14" fill="none">
            <path
              d="M4.5 3L2 7L4.5 11"
              stroke="hsl(var(--gold) / 0.7)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 3L12 7L9.5 11"
              stroke="hsl(var(--gold) / 0.7)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span
        className="absolute pointer-events-none"
        style={{
          bottom: 12,
          left: 12,
          background: "hsl(40 20% 93% / 0.88)",
          color: "hsl(0 0% 30%)",
          borderRadius: 999,
          padding: "4px 12px",
          fontSize: "0.48rem",
          fontWeight: 400,
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
          lineHeight: 1,
          fontFamily: '"Jost", sans-serif',
        }}
      >
        {beforeLabel}
      </span>
      <span
        className="absolute pointer-events-none"
        style={{
          bottom: 12,
          right: 12,
          background: "hsl(40 20% 93% / 0.88)",
          color: "hsl(0 0% 30%)",
          borderRadius: 999,
          padding: "4px 12px",
          fontSize: "0.48rem",
          fontWeight: 400,
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
          lineHeight: 1,
          fontFamily: '"Jost", sans-serif',
        }}
      >
        {afterLabel}
      </span>

      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-secondary animate-pulse" />
      )}
    </div>
  );
};

export default BeforeAfterSlider;
