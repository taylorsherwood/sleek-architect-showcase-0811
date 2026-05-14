import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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

const fmtPrice = (p: number | null) =>
  p ? `$${Math.round(p).toLocaleString()}` : null;

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
        .join("  ·  "),
      body: fmtPrice(listing.price) || undefined,
    },
    ...sections
      .filter((s) => s.is_visible && s.section_type !== "cta")
      .map<Slide>((s) => ({ kind: "section", section: s })),
    ...media.slice(0, 8).map<Slide>((m) => ({ kind: "gallery", image: m.media_url, subtitle: m.caption || undefined })),
  ];

  const [i, setI] = useState(0);
  const next = () => setI((v) => Math.min(v + 1, slides.length - 1));
  const prev = () => setI((v) => Math.max(v - 1, 0));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slide = slides[i];

  return (
    <div className="fixed inset-0 z-[110] bg-[#0C0F24] text-background flex flex-col">
      <div className="flex items-center justify-between p-4 md:p-6">
        <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-60">
          Echelon Presentation · {i + 1}/{slides.length}
        </span>
        <button onClick={onClose} className="p-2 opacity-70 hover:opacity-100" aria-label="Exit presentation">
          <X className="w-5 h-5" />
        </button>
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
      >
        {slide.kind === "hero" && (
          <div className="absolute inset-0">
            {slide.image && (
              <img src={slide.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0C0F24]/40 via-transparent to-[#0C0F24]/80" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 animate-fade-in-up">
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold mb-6">Echelon Property Group</p>
              <h2 className="font-display text-3xl md:text-6xl leading-tight max-w-4xl">{slide.title}</h2>
              {slide.subtitle && (
                <p className="mt-6 text-sm md:text-lg opacity-80 font-body tracking-wide">{slide.subtitle}</p>
              )}
              {fmtPrice(listing.price) && (
                <p className="mt-8 font-display text-xl md:text-2xl text-gold">{fmtPrice(listing.price)}</p>
              )}
            </div>
          </div>
        )}

        {slide.kind === "stats" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 animate-fade-in-up">
            <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold mb-6">{slide.title}</p>
            <p className="font-display text-2xl md:text-5xl mb-6">{slide.subtitle}</p>
            {slide.body && <p className="font-display text-xl md:text-3xl text-gold">{slide.body}</p>}
          </div>
        )}

        {slide.kind === "section" && slide.section && (
          <div className="absolute inset-0 flex">
            {slide.section.media_url && (
              <div className="hidden md:block w-1/2 relative">
                <img src={slide.section.media_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            )}
            <div className={`${slide.section.media_url ? "md:w-1/2" : "w-full"} flex flex-col justify-center px-6 md:px-16 py-10 animate-fade-in-up`}>
              {slide.section.eyebrow && (
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold mb-4">{slide.section.eyebrow}</p>
              )}
              {slide.section.title && (
                <h2 className="font-display text-2xl md:text-4xl mb-6 leading-tight">{slide.section.title}</h2>
              )}
              {slide.section.body && (
                <p className="font-body text-base md:text-lg leading-relaxed opacity-85 whitespace-pre-line max-w-xl">
                  {slide.section.body}
                </p>
              )}
              {slide.section.media_url && (
                <img
                  src={slide.section.media_url}
                  alt=""
                  className="mt-8 md:hidden w-full max-h-[40vh] object-cover"
                />
              )}
            </div>
          </div>
        )}

        {slide.kind === "gallery" && slide.image && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12">
            <img src={slide.image} alt="" className="max-h-full max-w-full object-contain" />
            {slide.subtitle && (
              <p className="mt-4 text-sm opacity-70 font-body italic text-center">{slide.subtitle}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between p-4 md:p-6 border-t border-background/10">
        <button
          onClick={prev}
          disabled={i === 0}
          className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase opacity-70 hover:opacity-100 disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <div className="hidden md:flex gap-1">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`h-px w-8 transition-colors ${idx === i ? "bg-gold" : "bg-background/20"}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={i === slides.length - 1}
          className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase opacity-70 hover:opacity-100 disabled:opacity-30"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PresentationMode;
