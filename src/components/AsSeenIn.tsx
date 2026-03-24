import ScrollReveal from "@/components/ScrollReveal";
import mediaWsj from "@/assets/media-wsj.png";
import mediaTribeza from "@/assets/media-tribeza.png";
import mediaAbj from "@/assets/media-abj.png";
import mediaMansionGlobal from "@/assets/media-mansion-global.png";

const logos = [
  { src: mediaWsj, alt: "The Wall Street Journal", className: "h-12 md:h-16", opacity: 0.72 },
  { src: mediaMansionGlobal, alt: "Mansion Global", className: "h-9 md:h-14", opacity: 0.68 },
  { src: mediaTribeza, alt: "Tribeza", className: "h-9 md:h-14", opacity: 0.68 },
  { src: mediaAbj, alt: "Austin Business Journal", className: "h-9 md:h-14", opacity: 0.68 },
];

const AsSeenIn = () => {
  return (
    <section className="pt-6 pb-10 md:pt-9 md:pb-14" style={{ background: "#F8F6F2" }}>
      <div className="container mx-auto px-6 max-w-4xl">
        <ScrollReveal>
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
        <div className="flex items-center justify-center gap-5 md:gap-7 flex-wrap">
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
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.9";
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
