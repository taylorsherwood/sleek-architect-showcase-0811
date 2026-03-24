import ScrollReveal from "@/components/ScrollReveal";
import mediaWsj from "@/assets/media-wsj.png";
import mediaTribeza from "@/assets/media-tribeza.png";
import mediaAbj from "@/assets/media-abj.png";
import mediaHaven from "@/assets/media-haven.png";
import mediaMansionGlobal from "@/assets/media-mansion-global.png";

const logos = [
  { src: mediaWsj, alt: "The Wall Street Journal", className: "h-24 md:h-[8.5rem]", opacity: 0.62 },
  { src: mediaMansionGlobal, alt: "Mansion Global", className: "h-20 md:h-[7rem]", opacity: 0.55 },
  { src: mediaTribeza, alt: "Tribeza", className: "h-20 md:h-[7rem]", opacity: 0.65 },
  { src: mediaHaven, alt: "Haven Magazine", className: "h-20 md:h-[7rem]", opacity: 0.55 },
  { src: mediaAbj, alt: "Austin Business Journal", className: "h-20 md:h-[7rem]", opacity: 0.55 },
];

const AsSeenIn = () => {
  return (
    <section className="pt-8 pb-12 md:pt-11 md:pb-16" style={{ background: "#F8F6F2" }}>
      <div className="container mx-auto px-6 max-w-4xl">
        <ScrollReveal>
          {/* Anchor divider */}
          <div
            className="mx-auto mb-5 md:mb-6"
            style={{
              width: "56px",
              height: "1px",
              background: "hsl(var(--gold) / 0.45)",
            }}
          />
          <p
            className="text-center mb-5 md:mb-6"
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
        <div className="flex items-center justify-center gap-5 md:gap-8 flex-wrap">
          {logos.map((logo, i) => (
            <ScrollReveal key={logo.alt} delay={50 + i * 45}>
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                className={`${logo.className} w-auto object-contain transition-opacity duration-400`}
                style={{ opacity: logo.opacity }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.88";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = String(logo.opacity);
                }}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AsSeenIn;
