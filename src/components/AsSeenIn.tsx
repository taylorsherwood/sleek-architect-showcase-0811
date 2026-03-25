import ScrollReveal from "@/components/ScrollReveal";
import mediaWsj from "@/assets/media-wsj.png";
import mediaTribeza from "@/assets/media-tribeza.png";
import mediaAbj from "@/assets/media-abj.png";
import mediaMansionGlobal from "@/assets/media-mansion-global.png";

const logos = [
  { src: mediaWsj, alt: "The Wall Street Journal", className: "h-36 md:h-44", opacity: 0.78 },
  { src: mediaMansionGlobal, alt: "Mansion Global", className: "h-24 md:h-32", opacity: 0.72 },
  { src: mediaTribeza, alt: "Tribeza", className: "h-20 md:h-24", opacity: 0.7 },
  { src: mediaAbj, alt: "Austin Business Journal", className: "h-24 md:h-32", opacity: 0.72 },
];

const AsSeenIn = () => {
  return (
    <section className="pt-5 pb-6 md:pt-7 md:pb-8 bg-muted">
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
        <div className="flex items-center justify-center gap-6 md:gap-10 flex-nowrap">
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
