import { useState } from "react";
import type { StorySection, ListingMedia } from "@/types/listing";
import Lightbox from "./Lightbox";
import LeadCaptureForm from "./LeadCaptureForm";

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
}: {
  children: React.ReactNode;
  background: string | null;
  full?: boolean;
}) => (
  <section className={`${bgClass(background)} ${full ? "" : "py-16 md:py-28"}`}>
    {full ? children : <div className="container mx-auto px-6 md:px-10 max-w-6xl">{children}</div>}
  </section>
);

const Eyebrow = ({ text }: { text: string }) => (
  <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold mb-4 md:mb-6">{text}</p>
);

const Heading = ({ text, className = "" }: { text: string; className?: string }) => (
  <h2 className={`font-display text-3xl md:text-5xl leading-[1.1] text-architectural ${className}`}>
    {text}
  </h2>
);

const StorySectionRenderer = ({ section, media, listingId, listingTitle }: Props) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  switch (section.section_type) {
    case "editorial_text":
      return (
        <SectionShell background={section.background_style}>
          <div className="max-w-3xl">
            {section.eyebrow && <Eyebrow text={section.eyebrow} />}
            {section.title && <Heading text={section.title} className="mb-8" />}
            {section.body && (
              <div className="font-body text-base md:text-lg leading-[1.8] text-foreground/85 whitespace-pre-line">
                {section.body}
              </div>
            )}
          </div>
        </SectionShell>
      );

    case "full_bleed_image":
      return (
        <SectionShell background={section.background_style} full>
          {section.media_url && (
            <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden">
              <img
                src={section.media_url}
                alt={section.title || ""}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {(section.title || section.eyebrow) && (
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-20 text-center px-6 bg-gradient-to-t from-[#0C0F24]/60 via-transparent to-transparent">
                  {section.eyebrow && (
                    <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold mb-3">{section.eyebrow}</p>
                  )}
                  {section.title && (
                    <h2 className="font-display text-2xl md:text-5xl text-background leading-tight max-w-3xl">
                      {section.title}
                    </h2>
                  )}
                </div>
              )}
            </div>
          )}
        </SectionShell>
      );

    case "image_text_split":
      return (
        <SectionShell background={section.background_style}>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {section.media_url && (
              <div className="aspect-[4/5] md:aspect-[4/5] w-full overflow-hidden">
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
              {section.title && <Heading text={section.title} className="mb-6" />}
              {section.body && (
                <p className="font-body text-base md:text-lg leading-[1.8] text-foreground/85 whitespace-pre-line">
                  {section.body}
                </p>
              )}
              {section.button_label && section.button_url && (
                <a
                  href={section.button_url}
                  className="inline-block mt-8 text-xs tracking-[0.3em] uppercase border-b border-gold pb-1 text-architectural hover:text-gold transition-colors"
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
        <SectionShell background={section.background_style}>
          <figure className="max-w-3xl mx-auto text-center">
            <p className="font-display text-2xl md:text-4xl leading-[1.3] text-architectural italic">
              &ldquo;{section.body}&rdquo;
            </p>
            {section.title && (
              <figcaption className="mt-8 text-xs tracking-[0.3em] uppercase text-gold">
                — {section.title}
              </figcaption>
            )}
          </figure>
        </SectionShell>
      );

    case "gallery": {
      const items = media.filter((m) => m.media_type === "gallery" || m.media_type === "image");
      const grid = items.length ? items : media;
      return (
        <SectionShell background={section.background_style}>
          {section.eyebrow && <Eyebrow text={section.eyebrow} />}
          {section.title && <Heading text={section.title} className="mb-10" />}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {grid.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => setLightboxIdx(idx)}
                className={`relative overflow-hidden ${
                  idx % 5 === 0 ? "col-span-2 md:col-span-2 aspect-[4/3]" : "aspect-square"
                } group`}
              >
                <img
                  src={m.media_url}
                  alt={m.alt_text || ""}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </button>
            ))}
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
          {section.title && <Heading text={section.title} className="mb-8" />}
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
          {section.eyebrow && <Eyebrow text={section.eyebrow} />}
          {section.title && <Heading text={section.title} className="mb-8" />}
          {section.media_url && (
            <div className="bg-[#FAFAF8] p-4 md:p-10 border border-foreground/5">
              <img
                src={section.media_url}
                alt={section.title || "Floorplan"}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          )}
        </SectionShell>
      );

    case "matterport":
      return (
        <SectionShell background={section.background_style}>
          {section.eyebrow && <Eyebrow text={section.eyebrow} />}
          {section.title && <Heading text={section.title} className="mb-8" />}
          {section.video_url && (
            <div className="aspect-video w-full overflow-hidden">
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
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-2">
              {section.eyebrow && <Eyebrow text={section.eyebrow} />}
              {section.title && <Heading text={section.title} className="mb-6" />}
              {section.body && (
                <p className="font-body text-base md:text-lg leading-[1.8] text-foreground/85 whitespace-pre-line">
                  {section.body}
                </p>
              )}
            </div>
            <div className="md:col-span-3 aspect-[4/3] md:aspect-square overflow-hidden">
              {section.media_url ? (
                <img src={section.media_url} alt="Location" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#FAFAF8] flex items-center justify-center text-muted-foreground text-sm">
                  Map preview
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
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              {section.eyebrow && <Eyebrow text={section.eyebrow} />}
              {section.title && <Heading text={section.title} className="mb-6" />}
              {section.body && (
                <p className="font-body text-base md:text-lg leading-[1.8] text-foreground/85 whitespace-pre-line">
                  {section.body}
                </p>
              )}
            </div>
            {section.media_url && (
              <div className="aspect-[4/3] overflow-hidden order-first md:order-last">
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
          {section.title && <Heading text={section.title} className="mb-10" />}
          <div className="grid md:grid-cols-2 gap-2 md:gap-4">
            {section.media_url && (
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={section.media_url} alt="Before" className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute top-3 left-3 text-[10px] tracking-[0.3em] uppercase bg-foreground text-background px-3 py-1">
                  Before
                </span>
              </div>
            )}
            {section.secondary_media_url && (
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={section.secondary_media_url} alt="After" className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute top-3 left-3 text-[10px] tracking-[0.3em] uppercase bg-gold text-foreground px-3 py-1">
                  After
                </span>
              </div>
            )}
          </div>
          {section.body && (
            <p className="font-body text-base md:text-lg leading-[1.8] text-foreground/85 whitespace-pre-line mt-10 max-w-3xl">
              {section.body}
            </p>
          )}
        </SectionShell>
      );

    case "cta":
      return (
        <SectionShell background={section.background_style || "navy"}>
          <div className="text-center max-w-2xl mx-auto">
            {section.eyebrow && (
              <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold mb-4">{section.eyebrow}</p>
            )}
            {section.title && (
              <h2 className="font-display text-3xl md:text-5xl mb-6 leading-[1.1]">{section.title}</h2>
            )}
            {section.body && <p className="font-body text-base md:text-lg opacity-85 mb-10">{section.body}</p>}
            <LeadCaptureForm
              listingId={listingId}
              listingTitle={listingTitle}
              ctaClicked={section.button_label || "story_cta"}
            />
          </div>
        </SectionShell>
      );

    default:
      return null;
  }
};

export default StorySectionRenderer;
