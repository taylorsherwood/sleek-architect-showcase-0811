import type { CSSProperties } from "react";
import waves from "@/assets/ev-waves-navy.png.asset.json";

type Props = {
  className?: string;
};

/**
 * Decorative Engel & Völkers wave pattern, pre-tinted navy with its fade baked
 * in. For light sections only — it is never placed over dark backgrounds.
 */
export default function EvWaveBand({ className = "" }: Props) {
  const style: CSSProperties = { backgroundImage: `url("${waves.url}")` };

  return (
    <div
      aria-hidden="true"
      className={`ev-wave-band ${className}`}
      style={style}
    />
  );
}
