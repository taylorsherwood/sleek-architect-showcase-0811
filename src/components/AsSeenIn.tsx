import ScrollReveal from "@/components/ScrollReveal";
import mediaWsj from "@/assets/media-wsj.png";
import mediaTribeza from "@/assets/media-tribeza.png";
import mediaAbj from "@/assets/media-abj.png";
import mediaMansionGlobal from "@/assets/media-mansion-global.png";

const logos = [
  { src: mediaWsj, alt: "The Wall Street Journal", h: "clamp(40px, 6vw, 72px)" },
  { src: mediaMansionGlobal, alt: "Mansion Global", h: "clamp(38px, 5.5vw, 68px)" },
  { src: mediaTribeza, alt: "Tribeza", h: "clamp(36px, 5vw, 64px)" },
  { src: mediaAbj, alt: "Austin Business Journal", h: "clamp(40px, 6vw, 72px)" },
];

const AsSeenIn = () => {
  return (
    <section className="pt-5 pb-6 md:pt-7 md:pb-8 bg-background">
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
        <div className="flex items-center justify-center gap-4 md:gap-10 flex-wrap md:flex-nowrap">
          {logos.map((logo, i) => (
            <ScrollReveal key={logo.alt} delay={50 + i * 45}>
              <div className="flex items-center justify-center h-14 md:h-20">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 96px, 160px"
                  className="w-auto object-contain credibility-logo"
                  width={200}
                  height={96}
                  style={{ height: logo.h }}
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
