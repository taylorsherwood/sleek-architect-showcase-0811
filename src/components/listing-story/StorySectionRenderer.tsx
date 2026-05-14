import { useState } from "react";
import type { StorySection, ListingMedia } from "@/types/listing";
import Lightbox from "./Lightbox";
import LeadCaptureForm from "./LeadCaptureForm";
import { useReveal } from "@/hooks/useReveal";

interface Props {
  section: StorySection;
  media: ListingMedia[];
  listingId: string;
  listingTitle: string;
}

const bgClass = (style: string | null) => {
  switch (style) {
    case "navy":
      return "bg-[#0C0F24] text-background";
    case "gold":
      return "bg-gold text-foreground";
    case "warm":
      return "bg-[#FAFAF8]";
    case "ivory":
    default:
      return "bg-background";
  }
};

const SectionShell = ({
  children,
  background,
  full,
  pad = "py-24 md:py-40",
}: {
  children: React.ReactNode;
  background: string | null;
  full?: boolean;
  pad?: string;
}) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className={`${bgClass(background)} ${full ? "" : pad}`}>
      <div ref={ref} className="ls-reveal">
        {full ? children : <div className="container mx-auto px-6 md:px-10 max-w-6xl">{children}</div>}
      </div>
    </section>
  );
};

const Eyebrow = ({ text }: { text: string }) => (
  <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6 md:mb-8">{text}</p>
);

const Heading = ({ text, className = "" }: { text: string; className?: string }) => (
  <h2
    className={`font-display text-[1.75rem] sm:text-3xl md:text-[2.75rem] leading-[1.12] tracking-[-0.005em] ${className}`}
  >
    {text}
  </h2>
);

const Body = ({ text, className = "" }: { text: string; className?: string }) => (
  <p
    className={`font-body text-[15px] md:text-[17px] leading-[1.95] whitespace-pre-line ${className}`}
  >
    {text}
  </p>
);

const StorySectionRenderer = ({ section, media, listingId, listingTitle }: Props) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const isDark = section.background_style === "navy";
  const bodyTone = isDark ? "text-background/80" : "text-foreground/80";
  const headingTone = isDark ? "" : "text-architectural";

  switch (section.section_type) {
    case "editorial_text":
      return (
        <SectionShell background={section.background_style}>
          <div className="max-w-3xl">
            {section.eyebrow && <Eyebrow text={section.eyebrow} />}
            {section.title && <Heading text={section.title} className={`mb-10 ${headingTone}`} />}
            {section.body && <Body text={section.body} className={bodyTone} />}
          </div>
        </SectionShell>
      );

    case "full_bleed_image":
      return (
        <SectionShell background={section.background_style} full>
          {section.media_url && (
            <div className="relative w-full h-[70vh] md:h-[92vh] overflow-hidden bg-foreground">
              <img
                src={section.media_url}
                alt={section.title || ""}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {(section.title || section.eyebrow) && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F24]/65 via-[#0C0F24]/10 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 text-background">
                    <div className="max-w-3xl">
                      {section.eyebrow && (
                        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-5">
                          {section.eyebrow}
                        </p>
                      )}
                      {section.title && (
                        <h2 className="font-display text-3xl md:text-6xl leading-[1.05] tracking-[-0.005em] max-w-2xl">
                          {section.title}
                        </h2>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </SectionShell>
      );

    case "image_text_split":
      return (
        <SectionShell background={section.background_style}>
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            {section.media_url && (
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src={section.media_url}
                  alt={section.title || ""}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div>
              {section.eyebrow && <Eyebrow text={section.eyebrow} />}
              {section.title && <Heading text={section.title} className={`mb-8 ${headingTone}`} />}
              {section.body && <Body text={section.body} className={bodyTone} />}
              {section.button_label && section.button_url && (
                <a
                  href={section.button_url}
                  className={`inline-block mt-10 text-[10px] tracking-[0.4em] uppercase border-b border-gold pb-1 transition-colors ${
                    isDark ? "text-background hover:text-gold" : "text-architectural hover:text-gold"
                  }`}
                >
                  {section.button_label}
                </a>
              )}
            </div>
          </div>
        </SectionShell>
      );

    case "quote":
      return (
        <SectionShell background={section.background_style} pad="py-32 md:py-56">
          <figure className="max-w-4xl mx-auto text-center">
            <p
              className={`font-display text-2xl md:text-[2.75rem] leading-[1.35] tracking-[-0.01em] ${
                isDark ? "" : "text-architectural"
              }`}
            >
              {section.body}
            </p>
            {section.title && (
              <figcaption className="mt-12 text-[10px] tracking-[0.5em] uppercase text-gold">
                {section.title}
              </figcaption>
            )}
          </figure>
        </SectionShell>
      );

    case "gallery": {
      const items = media.filter((m) => m.media_type === "gallery" || m.media_type === "image");
      const grid = items.length ? items : media;
      return (
        <SectionShell background={section.background_style} full>
          <div className="container mx-auto px-6 md:px-10 max-w-6xl">
            {section.eyebrow && <Eyebrow text={section.eyebrow} />}
            {section.title && <Heading text={section.title} className={`mb-12 md:mb-16 ${headingTone}`} />}
          </div>

          {/* Mobile — edge-peek swipe rail */}
          <div className="md:hidden">
            <div className="ls-rail flex gap-3 overflow-x-auto px-6 pb-6">
              {grid.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setLightboxIdx(idx)}
                  className="ls-tile relative shrink-0 overflow-hidden bg-foreground"
                  style={{ width: "82vw", height: "62vw" }}
                >
                  <img
                    src={m.media_url}
                    alt={m.alt_text || ""}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-[10px] tracking-[0.4em] uppercase text-muted-foreground mt-2">
              Swipe — {grid.length} images
            </p>
          </div>

          {/* Desktop — refined editorial grid */}
          <div className="hidden md:block container mx-auto px-6 md:px-10 max-w-6xl">
            <div className="grid grid-cols-3 gap-3">
              {grid.map((m, idx) => {
                const wide = idx % 5 === 0;
                return (
                  <button
                    key={m.id}
                    onClick={() => setLightboxIdx(idx)}
                    className={`ls-tile relative overflow-hidden bg-foreground ${
                      wide ? "col-span-2 aspect-[4/3]" : "aspect-square"
                    }`}
                  >
                    <img
                      src={m.media_url}
                      alt={m.alt_text || ""}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {lightboxIdx !== null && (
            <Lightbox media={grid} startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />
          )}
        </SectionShell>
      );
    }

    case "video":
      return (
        <SectionShell background={section.background_style}>
          {section.eyebrow && <Eyebrow text={section.eyebrow} />}
          {section.title && <Heading text={section.title} className={`mb-12 ${headingTone}`} />}
          {section.video_url && (
            <div className="aspect-video w-full overflow-hidden bg-foreground">
              {section.video_url.includes("youtube") || section.video_url.includes("vimeo") ? (
                <iframe
                  src={section.video_url}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={section.title || "Video"}
                />
              ) : (
                <video
                  src={section.video_url}
                  controls
                  playsInline
                  poster={section.media_url || undefined}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}
        </SectionShell>
      );

    case "floorplan":
      return (
        <SectionShell background={section.background_style}>
          <div className="text-center max-w-4xl mx-auto">
            {section.eyebrow && <Eyebrow text={section.eyebrow} />}
            {section.title && <Heading text={section.title} className={`mb-12 ${headingTone}`} />}
            {section.media_url && (
              <img
                src={section.media_url}
                alt={section.title || "Floorplan"}
                className="w-full h-auto object-contain mx-auto"
                loading="lazy"
              />
            )}
            {section.body && (
              <Body text={section.body} className={`${bodyTone} mt-10 max-w-2xl mx-auto`} />
            )}
          </div>
        </SectionShell>
      );

    case "matterport":
      return (
        <SectionShell background={section.background_style}>
          {section.eyebrow && <Eyebrow text={section.eyebrow} />}
          {section.title && <Heading text={section.title} className={`mb-12 ${headingTone}`} />}
          {section.video_url && (
            <div className="aspect-video w-full overflow-hidden bg-foreground">
              <iframe
                src={section.video_url}
                className="w-full h-full"
                allow="xr-spatial-tracking; fullscreen"
                allowFullScreen
                title={section.title || "3D Tour"}
              />
            </div>
          )}
        </SectionShell>
      );

    case "map":
      return (
        <SectionShell background={section.background_style}>
          <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-center">
            <div className="md:col-span-2">
              {section.eyebrow && <Eyebrow text={section.eyebrow} />}
              {section.title && <Heading text={section.title} className={`mb-8 ${headingTone}`} />}
              {section.body && <Body text={section.body} className={bodyTone} />}
            </div>
            <div className="md:col-span-3 aspect-[4/3] md:aspect-square overflow-hidden">
              {section.media_url ? (
                <img src={section.media_url} alt="Location" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#FAFAF8] flex items-center justify-center text-muted-foreground text-[10px] tracking-[0.4em] uppercase">
                  Map
                </div>
              )}
            </div>
          </div>
        </SectionShell>
      );

    case "neighborhood":
    case "lifestyle":
      return (
        <SectionShell background={section.background_style}>
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div>
              {section.eyebrow && <Eyebrow text={section.eyebrow} />}
              {section.title && <Heading text={section.title} className={`mb-8 ${headingTone}`} />}
              {section.body && <Body text={section.body} className={bodyTone} />}
            </div>
            {section.media_url && (
              <div className="aspect-[4/5] overflow-hidden order-first md:order-last">
                <img
                  src={section.media_url}
                  alt={section.title || ""}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </SectionShell>
      );

    case "renovation_highlights":
      return (
        <SectionShell background={section.background_style}>
          {section.eyebrow && <Eyebrow text={section.eyebrow} />}
          {section.title && <Heading text={section.title} className={`mb-12 ${headingTone}`} />}
          <div className="grid md:grid-cols-2 gap-3">
            {section.media_url && (
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={section.media_url} alt="Before" className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute top-4 left-4 text-[9px] tracking-[0.4em] uppercase bg-foreground/90 text-background px-3 py-1.5">
                  Before
                </span>
              </div>
            )}
            {section.secondary_media_url && (
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={section.secondary_media_url} alt="After" className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute top-4 left-4 text-[9px] tracking-[0.4em] uppercase bg-gold text-foreground px-3 py-1.5">
                  After
                </span>
              </div>
            )}
          </div>
          {section.body && <Body text={section.body} className={`${bodyTone} mt-12 max-w-3xl`} />}
        </SectionShell>
      );

    case "cta":
      return (
        <SectionShell background={section.background_style || "navy"} pad="py-32 md:py-44">
          <div className="text-center max-w-2xl mx-auto">
            {section.eyebrow && (
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">
                {section.eyebrow}
              </p>
            )}
            {section.title && (
              <h2 className="font-display text-3xl md:text-5xl mb-8 leading-[1.1] tracking-[-0.005em]">
                {section.title}
              </h2>
            )}
            {section.body && (
              <p
                className={`font-body text-[15px] md:text-[17px] leading-relaxed mb-12 ${
                  isDark ? "opacity-80" : "text-foreground/75"
                }`}
              >
                {section.body}
              </p>
            )}
            <LeadCaptureForm
              listingId={listingId}
              listingTitle={listingTitle}
              ctaClicked={section.button_label || "story_cta"}
              variant={isDark ? "dark" : "light"}
            />
          </div>
        </SectionShell>
      );

    default:
      return null;
  }
};

export default StorySectionRenderer;
