import { useEffect, useState } from "react";
import { isUnlocked } from "@/lib/communityUnlock";

interface MidPageCTABandProps {
  slug: string;
  communityName: string;
  formTargetId?: string;
}

/**
 * Slim mid-page conversion interrupt for community pages with a gated
 * Private Market Report. Quiet, on-brand, no aggressive marketing copy.
 * Hidden once unlocked.
 */
const MidPageCTABand = ({
  slug,
  communityName,
  formTargetId = "unlock-report",
}: MidPageCTABandProps) => {
  const [unlocked, setUnlockedLocal] = useState(false);

  useEffect(() => {
    setUnlockedLocal(isUnlocked(slug));
  }, [slug]);

  if (unlocked) return null;

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(formTargetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside
      aria-label={`Access the full ${communityName} Private Market Report`}
      className="py-10 md:py-14 border-y border-border bg-secondary"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
          <div>
            <p className="text-minimal text-gold mb-2 tracking-[0.2em]">
              PRIVATE MARKET REPORT
            </p>
            <p className="text-lg md:text-2xl font-display font-normal text-architectural leading-snug">
              Most of {communityName} doesn't trade publicly.
              <br className="hidden md:block" />
              <span className="text-muted-foreground">
                Access the data that actually drives pricing.
              </span>
            </p>
          </div>
          <a
            href={`#${formTargetId}`}
            onClick={handleScroll}
            className="inline-flex items-center justify-center px-8 py-4 border border-gold text-gold tracking-[0.2em] text-sm hover:bg-gold hover:text-background transition-colors duration-300 whitespace-nowrap shrink-0"
          >
            VIEW FULL PRIVATE REPORT
          </a>
        </div>
      </div>
    </aside>
  );
};

export default MidPageCTABand;
