import mediaWsj from "@/assets/media-wsj.png";
import mediaMansionGlobal from "@/assets/media-mansion-global.png";
import mediaTribeza from "@/assets/media-tribeza.png";
import mediaAbj from "@/assets/media-abj.png";
import mediaHaven from "@/assets/media-haven.png";
import mediaRobbReport from "@/assets/media-robb-report.png";
import mediaAustinHome from "@/assets/media-austin-home.png";
import mediaAustinLuxuryHome from "@/assets/media-austin-luxury-home.png";

const logos = [
  { src: mediaWsj, alt: "The Wall Street Journal", h: "h-28 md:h-40" },
  { src: mediaMansionGlobal, alt: "Mansion Global", h: "h-28 md:h-40" },
  { src: mediaRobbReport, alt: "Robb Report", h: "h-28 md:h-40" },
  { src: mediaTribeza, alt: "Tribeza", h: "h-28 md:h-40" },
  { src: mediaAbj, alt: "Austin Business Journal", h: "h-28 md:h-40" },
  { src: mediaHaven, alt: "Haven", h: "h-28 md:h-40" },
  { src: mediaAustinHome, alt: "Austin Home", h: "h-28 md:h-40" },
  { src: mediaAustinLuxuryHome, alt: "Austin Luxury Home Magazine", h: "h-28 md:h-40" },
];

const ScrollingCredibilityStrip = () => {
  // Duplicate logos for seamless loop
  const track = [...logos, ...logos];

  return (
    <section className="bg-background pt-16 md:pt-20 pb-8 md:pb-10 overflow-hidden">
      <p
        className="text-center mb-6"
        style={{
          fontFamily: '"Jost", sans-serif',
          fontSize: "10px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontWeight: 400,
          color: "hsl(var(--muted-foreground) / 0.55)",
        }}
      >
        As Seen In
      </p>

      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />

        <div className="scrolling-strip-track flex items-center gap-16 md:gap-24 w-max">
          {track.map((logo, i) => (
            <img
              key={`${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              decoding="async"
              className={`${logo.h} w-auto object-contain shrink-0 max-md:[filter:brightness(0)_invert(1)_sepia(1)_saturate(0.5)_hue-rotate(3deg)_brightness(0.92)]`}
              style={{ opacity: 1, filter: "brightness(0) invert(1) sepia(1) saturate(0.35) hue-rotate(3deg) brightness(0.75)" }}
              width={160}
              height={160}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollingCredibilityStrip;
