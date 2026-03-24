import ScrollReveal from "@/components/ScrollReveal";
import mediaWsj from "@/assets/media-wsj.png";
import mediaTribeza from "@/assets/media-tribeza.png";
import mediaAbj from "@/assets/media-abj.png";
import mediaHaven from "@/assets/media-haven.png";
import mediaMansionGlobal from "@/assets/media-mansion-global.png";

const logos = [
  { src: mediaWsj, alt: "The Wall Street Journal", height: "h-24 md:h-[9rem]", opacity: 0.66, offset: 0 },
  { src: mediaMansionGlobal, alt: "Mansion Global", height: "h-20 md:h-[7rem]", opacity: 0.55, offset: 3 },
  { src: mediaTribeza, alt: "Tribeza", height: "h-18 md:h-[6.5rem]", opacity: 0.58, offset: 0 },
  { src: mediaHaven, alt: "Haven Magazine", height: "h-20 md:h-[7rem]", opacity: 0.55, offset: 4 },
  { src: mediaAbj, alt: "Austin Business Journal", height: "h-20 md:h-[7rem]", opacity: 0.55, offset: -2 },
];

const AsSeenIn = () => {
  return (
    <section className="pt-6 pb-10 md:pt-9 md:pb-14" style={{ background: "#F8F6F2" }}>
      <div className="container mx-auto px-6 max-w-4xl">
        <ScrollReveal>
          {/* Anchor divider */}
          <div
            className="mx-auto mb-4 md:mb-5"
            style={{
              width: "56px",
              height: "1px",
              background: "hsl(var(--gold) / 0.45)",
            }}
          />
          <p
            className="text-center mb-4 md:mb-5"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              fontWeight: 500,
              color: "hsl(var(--muted-foreground))",
            }}
          >
            As Seen In
          </p>
        </ScrollReveal>
        <div className="flex items-end justify-center gap-4 md:gap-6 flex-wrap">
          {logos.map((logo, i) => (
            <ScrollReveal key={logo.alt} delay={50 + i * 45}>
              <div
                className="h-16 md:h-28 flex items-end"
                style={{ transform: logo.offset ? `translateY(${logo.offset}px)` : undefined }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  className={`${logo.height} w-auto object-contain transition-opacity duration-400`}
                  style={{ opacity: logo.opacity }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = "0.88";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = String(logo.opacity);
                  }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AsSeenIn;
