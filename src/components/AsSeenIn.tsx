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
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <p
            className="text-center text-muted-foreground mb-10 md:mb-14"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            As Seen In
          </p>
        </ScrollReveal>
        <div className="flex items-center justify-center gap-8 md:gap-12 lg:gap-16 flex-wrap max-w-5xl mx-auto">
          {logos.map((logo, i) => (
            <ScrollReveal key={logo.alt} delay={80 + i * 60}>
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                className="h-16 md:h-24 w-auto object-contain transition-opacity duration-400"
                style={{ opacity: 0.55 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.55";
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
