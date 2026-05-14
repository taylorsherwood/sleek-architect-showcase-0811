import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Listing, StorySection, ListingMedia } from "@/types/listing";

interface Props {
  listing: Listing;
  sections: StorySection[];
  media: ListingMedia[];
  onClose: () => void;
}

interface Slide {
  kind: "hero" | "stats" | "section" | "gallery";
  section?: StorySection;
  image?: string;
  title?: string;
  subtitle?: string;
  body?: string;
}

const fmtPrice = (p: number | null) => (p ? `$${Math.round(p).toLocaleString()}` : null);

const PresentationMode = ({ listing, sections, media, onClose }: Props) => {
  const slides: Slide[] = [
    {
      kind: "hero",
      image: listing.hero_image_url || media[0]?.media_url || undefined,
      title: listing.title,
      subtitle: listing.address || listing.neighborhood || "",
    },
    {
      kind: "stats",
      title: "At a Glance",
      subtitle: [
        listing.beds && `${listing.beds} Bed`,
        listing.baths && `${listing.baths} Bath`,
        listing.sqft && `${listing.sqft.toLocaleString()} sqft`,
        listing.acres && `${listing.acres} ac`,
      ]
        .filter(Boolean)
        .join("   ·   "),
      body: fmtPrice(listing.price) || undefined,
    },
    ...sections
      .filter((s) => s.is_visible && s.section_type !== "cta")
      .map<Slide>((s) => ({ kind: "section", section: s })),
    ...media.slice(0, 10).map<Slide>((m) => ({
      kind: "gallery",
      image: m.media_url,
      subtitle: m.caption || undefined,
    })),
  ];

  const [i, setI] = useState(0);
  const next = () => setI((v) => Math.min(v + 1, slides.length - 1));
  const prev = () => setI((v) => Math.max(v - 1, 0));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === " " || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slide = slides[i];
  const progress = ((i + 1) / slides.length) * 100;

  return (
    <div className="fixed inset-0 z-[110] bg-[#0C0F24] text-background flex flex-col">
      {/* Top hairline chrome */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 md:px-10 py-5 md:py-6">
        <span className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase opacity-55">
          Echelon · {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <button
          onClick={onClose}
          className="p-2 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Exit presentation"
        >
          <X className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>

      {/* Hairline progress at very top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-background/10 z-40">
        <div
          className="h-full bg-gold transition-all duration-700"
          style={{ width: `${progress}%`, transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      </div>

      <div
        className="flex-1 relative overflow-hidden"
        onTouchStart={(e) => ((window as any).__pTouch = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const start = (window as any).__pTouch as number | undefined;
          if (start == null) return;
          const dx = e.changedTouches[0].clientX - start;
          if (dx < -50) next();
          else if (dx > 50) prev();
        }}
        onClick={(e) => {
          // Click left third = prev, right two-thirds = next (presentation feel)
          const w = (e.currentTarget as HTMLElement).clientWidth;
          const x = e.clientX - (e.currentTarget as HTMLElement).getBoundingClientRect().left;
          if (x < w / 3) prev();
          else next();
        }}
      >
        <div key={i} className="absolute inset-0 ls-slide-in">
          {slide.kind === "hero" && (
            <div className="absolute inset-0">
              {slide.image && (
                <>
                  <img
                    src={slide.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover ls-kenburns"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0C0F24]/30 via-transparent to-[#0C0F24]/85" />
                </>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <p className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-gold mb-8">
                  Echelon Property Group
                </p>
                <h2 className="font-display text-4xl md:text-7xl leading-[1.0] tracking-[-0.01em] max-w-5xl">
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p className="mt-8 text-sm md:text-lg opacity-80 font-body tracking-wide max-w-xl">
                    {slide.subtitle}
                  </p>
                )}
                {fmtPrice(listing.price) && (
                  <p className="mt-10 font-display text-xl md:text-2xl tracking-wide">
                    {fmtPrice(listing.price)}
                  </p>
                )}
              </div>
            </div>
          )}

          {slide.kind === "stats" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <p className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-gold mb-10">
                {slide.title}
              </p>
              <p className="font-display text-2xl md:text-5xl leading-tight max-w-4xl">
                {slide.subtitle}
              </p>
              {slide.body && (
                <p className="mt-12 font-display text-2xl md:text-3xl tracking-wide">
                  {slide.body}
                </p>
              )}
            </div>
          )}

          {slide.kind === "section" && slide.section && (
            <div className="absolute inset-0 flex flex-col md:flex-row">
              {slide.section.media_url && (
                <div className="hidden md:block w-1/2 relative bg-foreground">
                  <img
                    src={slide.section.media_url}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              <div
                className={`${
                  slide.section.media_url ? "md:w-1/2" : "w-full"
                } flex flex-col justify-center px-6 md:px-20 py-16 md:py-12`}
              >
                {slide.section.eyebrow && (
                  <p className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-gold mb-6">
                    {slide.section.eyebrow}
                  </p>
                )}
                {slide.section.title && (
                  <h2 className="font-display text-2xl md:text-[2.5rem] mb-8 leading-[1.15] tracking-[-0.005em] max-w-2xl">
                    {slide.section.title}
                  </h2>
                )}
                {slide.section.body && (
                  <p className="font-body text-[15px] md:text-[17px] leading-[1.85] opacity-80 whitespace-pre-line max-w-xl">
                    {slide.section.body}
                  </p>
                )}
                {slide.section.media_url && (
                  <img
                    src={slide.section.media_url}
                    alt=""
                    className="mt-10 md:hidden w-full max-h-[44vh] object-cover"
                  />
                )}
              </div>
            </div>
          )}

          {slide.kind === "gallery" && slide.image && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12">
              <img
                src={slide.image}
                alt=""
                className="max-h-full max-w-full object-contain"
              />
              {slide.subtitle && (
                <p className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase text-background/65">
                  {slide.subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom hint */}
      <div className="hidden md:flex justify-center items-center gap-6 pb-6 text-[9px] tracking-[0.5em] uppercase opacity-40">
        <span>← Prev</span>
        <span>·</span>
        <span>Next →</span>
        <span>·</span>
        <span>Esc to Exit</span>
      </div>
    </div>
  );
};

export default PresentationMode;
