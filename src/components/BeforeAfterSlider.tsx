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
  beforeLabel = "Before",
  afterLabel = "After",
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

  // Preload images
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
      className="relative w-full select-none overflow-hidden rounded-sm"
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
              : "100vw",
            maxWidth: "none",
          }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-px h-full" style={{ backgroundColor: "#A88F5A", opacity: 0.7 }} />
      </div>

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left: `${position}%`, transform: `translateX(-50%) translateY(-50%)` }}
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 36,
            height: 36,
            backgroundColor: "rgba(255,255,255,0.92)",
            border: "1px solid #A88F5A",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4.5 2L1 7L4.5 12" stroke="#A88F5A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.5 2L13 7L9.5 12" stroke="#A88F5A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span
        className="absolute font-sans pointer-events-none"
        style={{
          bottom: 14,
          left: 14,
          background: "#ECE9E2",
          color: "#3A3A3A",
          borderRadius: 4,
          padding: "5px 10px",
          fontSize: "0.7rem",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          lineHeight: 1,
        }}
      >
        {beforeLabel}
      </span>
      <span
        className="absolute font-sans pointer-events-none"
        style={{
          bottom: 14,
          right: 14,
          background: "#ECE9E2",
          color: "#3A3A3A",
          borderRadius: 4,
          padding: "5px 10px",
          fontSize: "0.7rem",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          lineHeight: 1,
        }}
      >
        {afterLabel}
      </span>

      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
    </div>
  );
};

export default BeforeAfterSlider;
