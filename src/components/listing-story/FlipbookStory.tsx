import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, X } from "lucide-react";
import type { Listing, StorySection, ListingMedia } from "@/types/listing";
import LeadCaptureForm from "./LeadCaptureForm";

interface Props {
  listing: Listing;
  sections: StorySection[];
  media: ListingMedia[];
}

type Slide =
  | { kind: "cover" }
  | { kind: "stats" }
  | { kind: "section"; section: StorySection; index: number }
  | { kind: "gallery"; mosaic: ListingMedia[]; index: number }
  | { kind: "inquiry" };

const fmtPrice = (p: number | null) =>
  p ? `$${Math.round(p).toLocaleString()}` : null;

const FlipbookStory = ({ listing, sections, media }: Props) => {
  const visibleSections = useMemo(
    () => sections.filter((s) => s.is_visible && s.section_type !== "cta"),
    [sections]
  );

  const slides: Slide[] = useMemo(() => {
    const out: Slide[] = [{ kind: "cover" }];
    if (
      listing.beds || listing.baths || listing.sqft ||
      listing.acres || listing.year_built
    ) out.push({ kind: "stats" });
    visibleSections.forEach((s, idx) =>
      out.push({ kind: "section", section: s, index: idx + 1 })
    );
    // Gallery mosaics (3 images per page)
    for (let i = 0; i < Math.min(media.length, 9); i += 3) {
      const mosaic = media.slice(i, i + 3);
      if (mosaic.length) out.push({ kind: "gallery", mosaic, index: i / 3 + 1 });
    }
    out.push({ kind: "inquiry" });
    return out;
  }, [listing, visibleSections, media]);

  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const total = slides.length;
  const progress = ((i + 1) / total) * 100;

  const go = (n: number) => {
    const clamped = Math.max(0, Math.min(total - 1, n));
    if (clamped === i) return;
    setDir(clamped > i ? 1 : -1);
    setI(clamped);
  };
  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault(); next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault(); prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  useEffect(() => {
    if (heroVideoRef.current) heroVideoRef.current.play().catch(() => {});
  }, [i]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next(); else prev();
    }
    touchStart.current = null;
  };

  const slide = slides[i];

  return (
    <div className="fixed inset-0 z-[100] bg-[#EFEDE7] overflow-hidden flex flex-col">
      {/* Top chrome */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 md:px-10 pt-4 md:pt-6 pb-2 md:pb-3">
        <Link
          to="/"
          className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-foreground/65 hover:text-gold transition-colors"
        >
          Echelon · Private Presentation
        </Link>
        <div className="hidden md:block text-[9px] tracking-[0.5em] uppercase text-foreground/55">
          {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <Link
          to="/listings"
          className="md:hidden p-2 text-foreground/65 hover:text-gold transition-colors"
          aria-label="Exit"
        >
          <X className="w-4 h-4" />
        </Link>
      </div>

      {/* Hairline progress under top chrome */}
      <div className="flex-shrink-0 h-px bg-foreground/10 mx-5 md:mx-10 relative">
        <div
          className="absolute left-0 top-0 h-full bg-gold transition-[width] duration-700"
          style={{ width: `${progress}%`, transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      </div>

      {/* Page stage */}
      <div
        className="flex-1 relative flex items-center justify-center px-0 md:px-20 lg:px-28 py-3 md:py-6 min-h-0"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Side arrows (desktop) */}
        <button
          onClick={prev}
          disabled={i === 0}
          aria-label="Previous page"
          className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 items-center justify-center rounded-full bg-[#0C0F24] text-background hover:bg-gold hover:text-foreground transition-colors disabled:opacity-25 disabled:hover:bg-[#0C0F24] disabled:hover:text-background"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          disabled={i === total - 1}
          aria-label="Next page"
          className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 items-center justify-center rounded-full bg-[#0C0F24] text-background hover:bg-gold hover:text-foreground transition-colors disabled:opacity-25 disabled:hover:bg-[#0C0F24] disabled:hover:text-background"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Page card */}
        <div className="relative w-full h-full md:max-w-[1280px] md:aspect-[16/10] md:h-auto md:max-h-full overflow-hidden bg-[#0C0F24] shadow-[0_30px_80px_-20px_rgba(12,15,36,0.35)]">
          <div
            key={i}
            className={`absolute inset-0 ${dir === 1 ? "fb-page-right" : "fb-page-left"}`}
          >
            <PageBody
              slide={slide}
              listing={listing}
              media={media}
              videoRef={heroVideoRef}
              onBegin={next}
              onInquire={() => go(total - 1)}
            />
          </div>
        </div>
      </div>

      {/* Bottom chrome — chevron + mobile nav */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 md:px-10 pb-4 md:pb-5 pt-2">
        {/* Mobile prev */}
        <button
          onClick={prev}
          disabled={i === 0}
          className="md:hidden w-10 h-10 inline-flex items-center justify-center rounded-full bg-[#0C0F24] text-background disabled:opacity-25"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Center chevron up — opens slide index (desktop) / chapter label (mobile) */}
        <div className="flex-1 flex justify-center">
          <ChapterIndicator slide={slide} listing={listing} index={i} total={total} onChevron={next} />
        </div>

        {/* Mobile next */}
        <button
          onClick={next}
          disabled={i === total - 1}
          className="md:hidden w-10 h-10 inline-flex items-center justify-center rounded-full bg-[#0C0F24] text-background disabled:opacity-25"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* ---------- Chapter indicator ---------- */

const ChapterIndicator = ({
  slide, listing, index, total, onChevron,
}: {
  slide: Slide; listing: Listing; index: number; total: number; onChevron: () => void;
}) => {
  let label = "";
  if (slide.kind === "cover") label = "Cover";
  else if (slide.kind === "stats") label = "At a Glance";
  else if (slide.kind === "section") label = slide.section.eyebrow || slide.section.title || `Chapter ${slide.index}`;
  else if (slide.kind === "gallery") label = `Gallery · ${slide.index}`;
  else if (slide.kind === "inquiry") label = "Private Showing";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        onClick={onChevron}
        disabled={index === total - 1}
        aria-label="Next page"
        className="w-9 h-9 md:w-10 md:h-10 inline-flex items-center justify-center text-foreground/55 hover:text-gold transition-colors disabled:opacity-25"
      >
        <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
      </button>
      <span className="text-[9px] tracking-[0.45em] uppercase text-foreground/50 truncate max-w-[60vw]">
        {label}
      </span>
    </div>
  );
};

/* ---------- Page body router ---------- */

const PageBody = ({
  slide, listing, media, videoRef, onBegin, onInquire,
}: {
  slide: Slide;
  listing: Listing;
  media: ListingMedia[];
  videoRef: React.RefObject<HTMLVideoElement>;
  onBegin: () => void;
  onInquire: () => void;
}) => {
  if (slide.kind === "cover") return <CoverPage listing={listing} videoRef={videoRef} onBegin={onBegin} />;
  if (slide.kind === "stats") return <StatsPage listing={listing} />;
  if (slide.kind === "inquiry") return <InquiryPage listing={listing} />;
  if (slide.kind === "gallery") return <GalleryMosaicPage mosaic={slide.mosaic} index={slide.index} listing={listing} />;
  // section
  return <SectionPage section={slide.section} index={slide.index} media={media} onInquire={onInquire} />;
};

/* ---------- Pages ---------- */

const CoverPage = ({
  listing, videoRef, onBegin,
}: {
  listing: Listing; videoRef: React.RefObject<HTMLVideoElement>; onBegin: () => void;
}) => (
  <div className="absolute inset-0 grid grid-rows-[1fr_auto] md:grid-rows-[1.6fr_1fr]">
    <div className="relative overflow-hidden bg-[#0C0F24]">
      {listing.hero_video_url ? (
        <video
          ref={videoRef}
          src={listing.hero_video_url}
          poster={listing.hero_image_url || undefined}
          autoPlay muted loop playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover fb-kenburns"
        />
      ) : listing.hero_image_url ? (
        <img
          src={listing.hero_image_url}
          alt={listing.title}
          className="absolute inset-0 w-full h-full object-cover fb-kenburns"
          fetchPriority="high"
        />
      ) : null}
    </div>
    <div className="bg-[#0C0F24] text-background grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-6 md:gap-12 px-6 md:px-14 py-8 md:py-0">
      <div className="flex flex-col items-start md:items-start">
        <p className="text-[10px] tracking-[0.5em] uppercase text-gold mb-2">Echelon</p>
        <p className="text-[9px] tracking-[0.45em] uppercase text-background/55">Private Presentation</p>
      </div>
      <div className="md:border-l md:border-background/15 md:pl-12">
        {listing.neighborhood && (
          <p className="fb-rise text-[10px] tracking-[0.5em] uppercase text-gold mb-3">
            {listing.neighborhood}
          </p>
        )}
        <h1 className="fb-rise-1 font-display text-[2rem] md:text-[3.25rem] lg:text-[3.75rem] leading-[1.02] tracking-[-0.01em] mb-4">
          {listing.title}
        </h1>
        {listing.short_intro && (
          <p className="fb-rise-2 font-body text-sm md:text-base opacity-80 leading-snug max-w-xl mb-5 line-clamp-2 md:line-clamp-none">
            {listing.short_intro}
          </p>
        )}
        <div className="fb-rise-3 flex items-center gap-6 flex-wrap">
          <button
            onClick={onBegin}
            className="group inline-flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.45em] uppercase hover:text-gold transition-colors"
          >
            <span className="border-b border-gold pb-1">Begin Presentation</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
          {fmtPrice(listing.price) && (
            <span className="font-display text-base md:text-lg tracking-wide opacity-90">
              {fmtPrice(listing.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

const StatsPage = ({ listing }: { listing: Listing }) => {
  const stats = [
    listing.beds && { label: "Beds", value: listing.beds },
    listing.baths && { label: "Baths", value: listing.baths },
    listing.sqft && { label: "Sqft", value: listing.sqft.toLocaleString() },
    listing.acres && { label: "Acres", value: listing.acres },
    listing.year_built && { label: "Built", value: listing.year_built },
  ].filter(Boolean) as { label: string; value: string | number }[];
  return (
    <div className="absolute inset-0 bg-[#0C0F24] text-background flex flex-col items-center justify-center px-6 md:px-12 text-center">
      <p className="fb-rise text-[10px] tracking-[0.5em] uppercase text-gold mb-10">At a Glance</p>
      <div className="fb-rise-1 grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-12 md:gap-x-20 max-w-4xl">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-3xl md:text-5xl leading-none">{s.value}</p>
            <p className="text-[10px] tracking-[0.35em] uppercase text-background/55 mt-3">{s.label}</p>
          </div>
        ))}
      </div>
      {fmtPrice(listing.price) && (
        <p className="fb-rise-2 mt-12 font-display text-xl md:text-2xl tracking-wide text-background/85">
          {fmtPrice(listing.price)}
        </p>
      )}
    </div>
  );
};

const SectionPage = ({
  section, index, media, onInquire,
}: {
  section: StorySection; index: number; media: ListingMedia[]; onInquire: () => void;
}) => {
  const t = section.section_type;

  if (t === "quote") {
    return (
      <div className="absolute inset-0 bg-[#0C0F24] text-background flex items-center justify-center px-8 md:px-16 text-center">
        <div className="max-w-3xl">
          {section.eyebrow && (
            <p className="fb-rise text-[10px] tracking-[0.5em] uppercase text-gold mb-8">{section.eyebrow}</p>
          )}
          <p className="fb-rise-1 font-display text-2xl md:text-4xl leading-[1.35] tracking-[-0.005em] italic">
            “{section.body || section.title}”
          </p>
          {section.title && section.body && (
            <p className="fb-rise-2 mt-8 text-[10px] tracking-[0.4em] uppercase text-background/60">
              {section.title}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (t === "full_bleed_image" && section.media_url) {
    return (
      <div className="absolute inset-0">
        <img src={section.media_url} alt={section.title || ""} className="absolute inset-0 w-full h-full object-cover fb-kenburns" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F24]/85 via-[#0C0F24]/15 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-14 pb-10 md:pb-14 text-background max-w-4xl">
          {section.eyebrow && (
            <p className="fb-rise text-[10px] tracking-[0.5em] uppercase text-gold mb-4">{section.eyebrow}</p>
          )}
          {section.title && (
            <h2 className="fb-rise-1 font-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.005em] mb-4">
              {section.title}
            </h2>
          )}
          {section.body && (
            <p className="fb-rise-2 font-body text-sm md:text-base leading-[1.7] opacity-85 whitespace-pre-line max-w-xl line-clamp-4">
              {section.body}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default: split (image + dark text panel) — alternate orientation by index
  const flip = index % 2 === 0;
  const hasImage = !!section.media_url;
  const secondary = section.secondary_media_url;

  return (
    <div className={`absolute inset-0 grid ${hasImage ? "grid-rows-[40%_60%] md:grid-rows-1 md:grid-cols-[1.15fr_1fr]" : "grid-cols-1"}`}>
      {hasImage && (
        <div className={`relative bg-[#0C0F24] overflow-hidden ${flip ? "md:order-2" : ""} ${secondary ? "grid grid-rows-2 gap-1" : ""}`}>
          <img src={section.media_url!} alt="" className={`${secondary ? "" : "absolute inset-0"} w-full h-full object-cover`} />
          {secondary && (
            <img src={secondary} alt="" className="w-full h-full object-cover" />
          )}
        </div>
      )}
      <div className={`relative bg-[#0C0F24] text-background flex flex-col justify-center px-6 md:px-12 lg:px-16 py-8 md:py-10 ${flip && hasImage ? "md:order-1" : ""}`}>
        <div className="absolute top-4 right-5 md:top-5 md:right-6 text-[9px] tracking-[0.4em] uppercase text-background/35">
          {String(index).padStart(2, "0")}
        </div>
        {section.eyebrow && (
          <p className="fb-rise text-[10px] tracking-[0.5em] uppercase text-gold mb-5">{section.eyebrow}</p>
        )}
        {section.title && (
          <h2 className="fb-rise-1 font-display text-2xl md:text-[2.25rem] lg:text-[2.5rem] leading-[1.12] tracking-[-0.005em] mb-5 max-w-xl">
            {section.title}
          </h2>
        )}
        {section.body && (
          <p className="fb-rise-2 font-body text-[14px] md:text-[15px] leading-[1.75] opacity-80 whitespace-pre-line max-w-xl">
            {section.body}
          </p>
        )}
        {section.button_label && section.button_url && (
          <a
            href={section.button_url}
            onClick={(e) => {
              if (section.button_url === "#inquire") { e.preventDefault(); onInquire(); }
            }}
            className="fb-rise-3 mt-6 inline-flex items-center gap-2 self-start text-[10px] tracking-[0.4em] uppercase border-b border-gold pb-1 hover:text-gold transition-colors w-fit"
          >
            {section.button_label} <ChevronRight className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};

const GalleryMosaicPage = ({
  mosaic, index, listing,
}: {
  mosaic: ListingMedia[]; index: number; listing: Listing;
}) => {
  const [a, b, c] = [mosaic[0], mosaic[1], mosaic[2]];
  return (
    <div className="absolute inset-0 grid grid-rows-[1fr_auto] md:grid-rows-1 md:grid-cols-[2fr_1fr]">
      <div className="grid grid-cols-2 grid-rows-2 gap-1 bg-[#0C0F24] overflow-hidden">
        {a && <img src={a.media_url} alt={a.alt_text || ""} className="row-span-2 w-full h-full object-cover" />}
        {b && <img src={b.media_url} alt={b.alt_text || ""} className="w-full h-full object-cover" />}
        {c && <img src={c.media_url} alt={c.alt_text || ""} className="w-full h-full object-cover" />}
      </div>
      <div className="bg-[#0C0F24] text-background flex flex-col justify-center px-6 md:px-10 py-8 md:py-0">
        <p className="fb-rise text-[10px] tracking-[0.5em] uppercase text-gold mb-4">Gallery · {String(index).padStart(2, "0")}</p>
        <h2 className="fb-rise-1 font-display text-xl md:text-3xl leading-[1.15] tracking-[-0.005em] mb-4">
          {listing.title}
        </h2>
        {listing.neighborhood && (
          <p className="fb-rise-2 text-[11px] md:text-xs tracking-[0.25em] uppercase text-background/65">
            {listing.neighborhood}
          </p>
        )}
      </div>
    </div>
  );
};

const InquiryPage = ({ listing }: { listing: Listing }) => (
  <div className="absolute inset-0 grid grid-rows-[35%_65%] md:grid-rows-1 md:grid-cols-[1fr_1.1fr]">
    <div className="relative bg-[#0C0F24] overflow-hidden">
      {listing.hero_image_url && (
        <img src={listing.hero_image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C0F24]/40 via-transparent to-[#0C0F24]/60" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-background">
        <p className="text-[10px] tracking-[0.5em] uppercase text-gold mb-2">Echelon</p>
        <p className="font-display text-lg md:text-2xl leading-tight">{listing.title}</p>
      </div>
    </div>
    <div className="bg-[#0C0F24] text-background overflow-y-auto">
      <div className="px-6 md:px-12 lg:px-16 py-8 md:py-10">
        <p className="fb-rise text-[10px] tracking-[0.5em] uppercase text-gold mb-4">Private Showing</p>
        <h2 className="fb-rise-1 font-display text-2xl md:text-3xl leading-[1.15] mb-4 tracking-[-0.005em]">
          Request a Confidential Viewing
        </h2>
        <p className="fb-rise-2 font-body text-[14px] md:text-[15px] opacity-80 mb-6 leading-relaxed">
          Speak directly with the Echelon team to arrange a private tour of {listing.title}.
        </p>
        <div className="fb-rise-2">
          <LeadCaptureForm listingId={listing.id} listingTitle={listing.title} variant="dark" />
        </div>
        {listing.agent_name && (
          <div className="mt-8 pt-6 border-t border-background/15 text-sm tracking-wide opacity-80 space-y-1">
            <p className="font-display text-base">{listing.agent_name}</p>
            {listing.agent_phone && (
              <a href={`tel:${listing.agent_phone.replace(/[^\d+]/g, "")}`} className="block hover:text-gold transition-colors">{listing.agent_phone}</a>
            )}
            {listing.agent_email && (
              <a href={`mailto:${listing.agent_email}`} className="block hover:text-gold transition-colors">{listing.agent_email}</a>
            )}
          </div>
        )}
        <p className="mt-8 text-[9px] tracking-[0.45em] uppercase text-background/40">
          Echelon Property Group · Texas Real Estate Commission
        </p>
      </div>
    </div>
  </div>
);

export default FlipbookStory;
