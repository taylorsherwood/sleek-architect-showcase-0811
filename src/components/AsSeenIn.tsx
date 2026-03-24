import ScrollReveal from "@/components/ScrollReveal";
import mediaWsj from "@/assets/media-wsj.png";
import mediaTribeza from "@/assets/media-tribeza.png";
import mediaAbj from "@/assets/media-abj.png";
import mediaHaven from "@/assets/media-haven.png";
import mediaMansionGlobal from "@/assets/media-mansion-global.png";

const logos = [
  { src: mediaWsj, alt: "The Wall Street Journal" },
  { src: mediaMansionGlobal, alt: "Mansion Global" },
  { src: mediaTribeza, alt: "Tribeza" },
  { src: mediaHaven, alt: "Haven Magazine" },
  { src: mediaAbj, alt: "Austin Business Journal" },
];

const AsSeenIn = () => {
  return (
    <section className="pt-10 pb-14 md:pt-14 md:pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <ScrollReveal>
          {/* Thin divider line */}
          <div
            className="mx-auto mb-8 md:mb-10"
            style={{
              width: "48px",
              height: "1px",
              background: "hsl(var(--gold) / 0.35)",
            }}
          />
          <p
            className="text-center mb-6 md:mb-8"
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
        <div className="flex items-center justify-center gap-6 md:gap-10 lg:gap-14 flex-wrap">
          {logos.map((logo, i) => (
            <ScrollReveal key={logo.alt} delay={60 + i * 50}>
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                className="h-20 md:h-[7.5rem] w-auto object-contain transition-opacity duration-400"
                style={{ opacity: 0.6 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.6";
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
