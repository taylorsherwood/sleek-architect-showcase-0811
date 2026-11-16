import type { CSSProperties } from "react";
import navyWaves from "@/assets/ev-waves-navy.png.asset.json";
import ivoryWaves from "@/assets/ev-waves-ivory.png.asset.json";

type Props = {
  /** "ivory" for light pages (navy contour lines); "navy" for dark sections (ivory lines). */
  variant?: "ivory" | "navy";
  className?: string;
};

const SOURCES: Record<NonNullable<Props["variant"]>, string> = {
  ivory: navyWaves.url,
  navy: ivoryWaves.url,
};

/**
 * Decorative Engel & Völkers wave pattern, pre-tinted to the site palette and
 * faded toward its lower edge so it can sit behind or between sections.
 */
export default function EvWaveBand({ variant = "ivory", className = "" }: Props) {
  const style: CSSProperties = { backgroundImage: `url("${SOURCES[variant]}")` };

  return (
    <div
      aria-hidden="true"
      className={`ev-wave-band ${className}`}
      style={style}
    />
  );
}
