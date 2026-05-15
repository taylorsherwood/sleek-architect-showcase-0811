import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, Phone } from "lucide-react";
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
  | { kind: "section"; section: StorySection }
  | { kind: "gallery"; media: ListingMedia }
  | { kind: "inquiry" };

const fmtPrice = (p: number | null) =>
  p ? `$${Math.round(p).toLocaleString()}` : null;

const chapterLabel = (s: StorySection, i: number) =>
  s.eyebrow || s.title || `Chapter ${String(i).padStart(2, "0")}`;

const FlipbookStory = ({ listing, sections, media }: Props) => {
  const visibleSections = useMemo(
    () => sections.filter((s) => s.is_visible && s.section_type !== "cta"),
    [sections]
  );

  const slides: Slide[] = useMemo(() => {
    const out: Slide[] = [{ kind: "cover" }];
    if (
      listing.beds ||
      listing.baths ||
      listing.sqft ||
      listing.acres ||
      listing.year_built
    ) {
      out.push({ kind: "stats" });
    }
    visibleSections.forEach((s) => out.push({ kind: "section", section: s }));
    media.slice(0, 6).forEach((m) => out.push({ kind: "gallery", media: m }));
    out.push({ kind: "inquiry" });
    return out;
  }, [listing, visibleSections, media]);

  const [i, setI] = useState(0);
  const [started, setStarted] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const total = slides.length;
  const progress = ((i + 1) / total) * 100;

  const go = (n: number) => {
    setDir(n > i ? 1 : -1);
    setI(Math.max(0, Math.min(total - 1, n)));
  };
  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!started) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, started]);

  useEffect(() => {
    if (started && heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }
  }, [started]);

  const slide = slides[i];

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
    touchStart.current = null;
  };

  // Map a section to a layout variant.
  const renderSection = (s: StorySection) => {
    const t = s.section_type;
    if (
      t === "full_bleed_image" ||
      (t === "lifestyle" && s.media_url)
    ) {
      return <FullBleedSlide section={s} />;
    }
    if (t === "quote") return <QuoteSlide section={s} />;
    if (t === "gallery") return <GallerySectionSlide section={s} media={media} />;
    if (t === "video" && (s.video_url || s.media_url)) {
      return <VideoSlide section={s} />;
    }
    if (t === "editorial_text" && !s.media_url) {
      return <TextOnlySlide section={s} />;
    }
    return <SplitSlide section={s} flip={false} />;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0C0F24] text-background overflow-hidden">
      {/* Top chrome */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 md:px-10 py-5 md:py-6 pointer-events-none">
        <Link
          to="/"
          className="pointer-events-auto text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-background/75 hover:text-gold transition-colors"
        >
          Echelon · Private Presentation
        </Link>
        <div className="hidden md:flex items-center gap-6 pointer-events-auto">
          {started && slide.kind === "section" && slide.section && (
            <span className="text-[9px] tracking-[0.45em] uppercase text-background/55 truncate max-w-[40vw]">
              {chapterLabel(slide.section, i)}
            </span>
          )}
          <span className="text-[9px] tracking-[0.5em] uppercase text-background/55">
            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <Link
          to="/listings"
          className="md:hidden pointer-events-auto p-2 text-background/75 hover:text-gold transition-colors"
          aria-label="Exit presentation"
        >
          <X className="w-4 h-4" />
        </Link>
      </div>

      {/* Hairline progress */}
      <div className="absolute top-0 left-0 right-0 h-px bg-background/10 z-40">
        <div
          className="h-full bg-gold transition-[width] duration-700"
          style={{
            width: `${progress}%`,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      {/* Slide stage */}
      <div
        className="absolute inset-0"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          key={i}
          className={`absolute inset-0 ${
            dir === 1 ? "fb-enter-right" : "fb-enter-left"
          }`}
        >
          {slide.kind === "cover" && (
            <CoverSlide
              listing={listing}
              videoRef={heroVideoRef}
              started={started}
              onBegin={() => {
                setStarted(true);
                next();
              }}
            />
          )}
          {slide.kind === "stats" && <StatsSlide listing={listing} />}
          {slide.kind === "section" && renderSection(slide.section)}
          {slide.kind === "gallery" && <GalleryImageSlide media={slide.media} />}
          {slide.kind === "inquiry" && <InquirySlide listing={listing} />}
        </div>
      </div>

      {/* Side nav arrows — desktop */}
      {started && i > 0 && (
        <button
          onClick={prev}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full border border-background/20 bg-background/5 backdrop-blur-sm text-background/80 hover:text-gold hover:border-gold/60 transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {started && i < total - 1 && (
        <button
          onClick={next}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full border border-background/20 bg-background/5 backdrop-blur-sm text-background/80 hover:text-gold hover:border-gold/60 transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Bottom chrome */}
      {started && (
        <div className="absolute bottom-0 left-0 right-0 z-30 px-5 md:px-10 pb-5 md:pb-7 flex items-center justify-between gap-4">
          {/* Chapter dots — desktop */}
          <div className="hidden md:flex items-center gap-1.5 flex-1 max-w-md">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => go(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-px transition-all duration-500 ${
                  idx === i
                    ? "w-8 bg-gold"
                    : idx < i
                    ? "w-4 bg-background/45"
                    : "w-4 bg-background/15 hover:bg-background/35"
                }`}
              />
            ))}
          </div>

          {/* Mobile prev/next */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={prev}
              disabled={i === 0}
              className="w-10 h-10 inline-flex items-center justify-center border border-background/20 text-background/80 disabled:opacity-30"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[9px] tracking-[0.4em] uppercase text-background/60">
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              disabled={i === total - 1}
              className="w-10 h-10 inline-flex items-center justify-center border border-background/20 text-background/80 disabled:opacity-30"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Inquire CTA */}
          <button
            onClick={() => go(total - 1)}
            className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase border-b border-gold pb-1 text-background hover:text-gold transition-colors"
          >
            Request Showing
          </button>
        </div>
      )}
    </div>
  );
};

/* ---------- Slide variants ---------- */

const CoverSlide = ({
  listing,
  videoRef,
  started,
  onBegin,
}: {
  listing: Listing;
  videoRef: React.RefObject<HTMLVideoElement>;
  started: boolean;
  onBegin: () => void;
}) => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 fb-kenburns">
      {listing.hero_video_url ? (
        <video
          ref={videoRef}
          src={listing.hero_video_url}
          poster={listing.hero_image_url || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : listing.hero_image_url ? (
        <img
          src={listing.hero_image_url}
          alt={listing.title}
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
      ) : null}
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-[#0C0F24]/35 via-[#0C0F24]/15 to-[#0C0F24]/85" />

    <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-28 px-6 md:px-12 text-background">
      <div className="max-w-5xl">
        {listing.neighborhood && (
          <p className="fb-rise text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-gold mb-6">
            {listing.neighborhood}
          </p>
        )}
        <h1 className="fb-rise-1 font-display text-[2.5rem] sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem] leading-[0.98] tracking-[-0.01em] mb-6 md:mb-8 max-w-4xl">
          {listing.title}
        </h1>
        {listing.short_intro && (
          <p className="fb-rise-2 font-body text-base md:text-xl opacity-85 max-w-2xl leading-snug mb-10">
            {listing.short_intro}
          </p>
        )}
        <div className="fb-rise-3 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
          <button
            onClick={onBegin}
            className="group inline-flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.45em] uppercase text-background hover:text-gold transition-colors"
          >
            <span className="border-b border-gold pb-1">Begin Presentation</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
          {fmtPrice(listing.price) && (
            <span className="font-display text-lg md:text-xl tracking-wide opacity-90">
              {fmtPrice(listing.price)}
            </span>
          )}
        </div>
      </div>
    </div>

    {!started && (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.5em] uppercase text-background/55">
          Swipe or tap to begin
        </span>
      </div>
    )}
  </div>
);

const StatsSlide = ({ listing }: { listing: Listing }) => {
  const stats = [
    listing.beds && { label: "Beds", value: listing.beds },
    listing.baths && { label: "Baths", value: listing.baths },
    listing.sqft && { label: "Sqft", value: listing.sqft.toLocaleString() },
    listing.acres && { label: "Acres", value: listing.acres },
    listing.year_built && { label: "Built", value: listing.year_built },
  ].filter(Boolean) as { label: string; value: string | number }[];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
      <p className="fb-rise text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-gold mb-12">
        At a Glance
      </p>
      <div className="fb-rise-1 grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-12 md:gap-x-20 max-w-5xl">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-4xl md:text-6xl leading-none">
              {s.value}
            </p>
            <p className="text-[10px] tracking-[0.35em] uppercase text-background/55 mt-4">
              {s.label}
            </p>
          </div>
        ))}
      </div>
      {fmtPrice(listing.price) && (
        <p className="fb-rise-2 mt-16 font-display text-2xl md:text-3xl tracking-wide text-background/85">
          {fmtPrice(listing.price)}
        </p>
      )}
    </div>
  );
};

const FullBleedSlide = ({ section }: { section: StorySection }) => (
  <div className="absolute inset-0">
    {section.media_url && (
      <>
        <img
          src={section.media_url}
          alt={section.title || ""}
          className="absolute inset-0 w-full h-full object-cover fb-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F24]/85 via-[#0C0F24]/20 to-transparent" />
      </>
    )}
    <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-28 px-6 md:px-12 max-w-4xl">
      {section.eyebrow && (
        <p className="fb-rise text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-gold mb-5">
          {section.eyebrow}
        </p>
      )}
      {section.title && (
        <h2 className="fb-rise-1 font-display text-3xl md:text-6xl leading-[1.05] tracking-[-0.005em] mb-6">
          {section.title}
        </h2>
      )}
      {section.body && (
        <p className="fb-rise-2 font-body text-[15px] md:text-lg leading-[1.8] opacity-85 whitespace-pre-line max-w-2xl">
          {section.body}
        </p>
      )}
    </div>
  </div>
);

const SplitSlide = ({
  section,
  flip,
}: {
  section: StorySection;
  flip: boolean;
}) => (
  <div
    className={`absolute inset-0 flex flex-col ${
      flip ? "md:flex-row-reverse" : "md:flex-row"
    } overflow-y-auto md:overflow-hidden`}
  >
    {section.media_url && (
      <div className="relative md:w-1/2 h-[42vh] md:h-full bg-foreground flex-shrink-0">
        <img
          src={section.media_url}
          alt={section.title || ""}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    )}
    <div
      className={`${
        section.media_url ? "md:w-1/2" : "w-full"
      } flex flex-col justify-center px-6 md:px-16 lg:px-24 py-14 md:py-12`}
    >
      {section.eyebrow && (
        <p className="fb-rise text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-gold mb-6">
          {section.eyebrow}
        </p>
      )}
      {section.title && (
        <h2 className="fb-rise-1 font-display text-2xl md:text-[2.5rem] leading-[1.15] tracking-[-0.005em] mb-7 max-w-xl">
          {section.title}
        </h2>
      )}
      {section.body && (
        <p className="fb-rise-2 font-body text-[15px] md:text-[17px] leading-[1.85] opacity-80 whitespace-pre-line max-w-xl">
          {section.body}
        </p>
      )}
    </div>
  </div>
);

const TextOnlySlide = ({ section }: { section: StorySection }) => (
  <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12 overflow-y-auto py-24">
    <div className="max-w-3xl">
      {section.eyebrow && (
        <p className="fb-rise text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-gold mb-7">
          {section.eyebrow}
        </p>
      )}
      {section.title && (
        <h2 className="fb-rise-1 font-display text-3xl md:text-5xl leading-[1.1] tracking-[-0.005em] mb-10">
          {section.title}
        </h2>
      )}
      {section.body && (
        <p className="fb-rise-2 font-body text-[15px] md:text-lg leading-[1.95] opacity-85 whitespace-pre-line">
          {section.body}
        </p>
      )}
    </div>
  </div>
);

const QuoteSlide = ({ section }: { section: StorySection }) => (
  <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12 text-center">
    <div className="max-w-3xl">
      {section.eyebrow && (
        <p className="fb-rise text-[10px] tracking-[0.5em] uppercase text-gold mb-10">
          {section.eyebrow}
        </p>
      )}
      <p className="fb-rise-1 font-display text-2xl md:text-4xl leading-[1.35] tracking-[-0.005em] italic">
        “{section.body || section.title}”
      </p>
      {section.title && section.body && (
        <p className="fb-rise-2 mt-10 text-[10px] tracking-[0.4em] uppercase text-background/60">
          {section.title}
        </p>
      )}
    </div>
  </div>
);

const VideoSlide = ({ section }: { section: StorySection }) => (
  <div className="absolute inset-0 bg-black">
    <video
      src={section.video_url || section.media_url || ""}
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F24]/70 via-transparent to-[#0C0F24]/30" />
    <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 md:px-12 max-w-3xl">
      {section.eyebrow && (
        <p className="text-[10px] tracking-[0.5em] uppercase text-gold mb-5">
          {section.eyebrow}
        </p>
      )}
      {section.title && (
        <h2 className="font-display text-3xl md:text-5xl leading-[1.1] mb-4">
          {section.title}
        </h2>
      )}
    </div>
  </div>
);

const GallerySectionSlide = ({
  section,
  media,
}: {
  section: StorySection;
  media: ListingMedia[];
}) => {
  const items = media.length ? media : [];
  return (
    <div className="absolute inset-0 flex flex-col px-6 md:px-12 pt-20 pb-24 overflow-y-auto">
      {section.eyebrow && (
        <p className="text-[10px] tracking-[0.5em] uppercase text-gold mb-4">
          {section.eyebrow}
        </p>
      )}
      {section.title && (
        <h2 className="font-display text-2xl md:text-4xl mb-8">{section.title}</h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {items.slice(0, 9).map((m) => (
          <div key={m.id} className="aspect-[4/5] overflow-hidden bg-background/5">
            <img
              src={m.media_url}
              alt={m.alt_text || ""}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const GalleryImageSlide = ({ media }: { media: ListingMedia }) => (
  <div className="absolute inset-0">
    <img
      src={media.media_url}
      alt={media.alt_text || media.caption || ""}
      className="absolute inset-0 w-full h-full object-cover fb-kenburns"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F24]/55 via-transparent to-transparent" />
    {media.caption && (
      <p className="absolute bottom-24 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.45em] uppercase text-background/75">
        {media.caption}
      </p>
    )}
  </div>
);

const InquirySlide = ({ listing }: { listing: Listing }) => (
  <div className="absolute inset-0 overflow-y-auto">
    <div className="min-h-full flex items-center justify-center px-6 md:px-12 py-24">
      <div className="w-full max-w-xl text-center">
        <p className="fb-rise text-[10px] tracking-[0.5em] uppercase text-gold mb-6">
          Private Showing
        </p>
        <h2 className="fb-rise-1 font-display text-3xl md:text-5xl leading-[1.1] mb-6 tracking-[-0.005em]">
          Experience {listing.title}
        </h2>
        <p className="fb-rise-2 font-body text-[15px] md:text-[17px] opacity-80 mb-10 leading-relaxed">
          Speak directly with the Echelon team to arrange a confidential viewing.
        </p>
        <div className="fb-rise-2">
          <LeadCaptureForm
            listingId={listing.id}
            listingTitle={listing.title}
            variant="dark"
          />
        </div>
        {listing.agent_name && (
          <div className="mt-12 pt-8 border-t border-background/15 text-sm tracking-wide opacity-80">
            <p className="font-display text-base">{listing.agent_name}</p>
            {listing.agent_phone && (
              <a
                href={`tel:${listing.agent_phone.replace(/[^\d+]/g, "")}`}
                className="mt-1 inline-flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Phone className="w-3 h-3" /> {listing.agent_phone}
              </a>
            )}
            {listing.agent_email && (
              <p className="mt-1">
                <a
                  href={`mailto:${listing.agent_email}`}
                  className="hover:text-gold transition-colors"
                >
                  {listing.agent_email}
                </a>
              </p>
            )}
          </div>
        )}
        <p className="mt-10 text-[9px] tracking-[0.45em] uppercase text-background/40">
          Echelon Property Group · Texas Real Estate Commission
        </p>
      </div>
    </div>
  </div>
);

export default FlipbookStory;
