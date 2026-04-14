import mediaWsj from "@/assets/media-wsj.webp";
import mediaMansionGlobal from "@/assets/media-mansion-global.webp";
import mediaTribeza from "@/assets/media-tribeza.webp";
import mediaAbj from "@/assets/media-abj.webp";
import mediaHaven from "@/assets/media-haven.webp";
import mediaRobbReport from "@/assets/media-robb-report.webp";
import mediaAustinHome from "@/assets/media-austin-home.webp";
import mediaAustinLuxuryHome from "@/assets/media-austin-luxury-home.webp";
import mediaCnn from "@/assets/media-cnn.webp";
import mediaFoxNews from "@/assets/media-fox-news.webp";
import mediaYahoo from "@/assets/media-yahoo.webp";
import mediaHgtv from "@/assets/media-hgtv.webp";
import mediaNyt from "@/assets/media-nyt.webp";
import mediaCulturemap from "@/assets/media-culturemap.webp";

const logos = [
  { src: mediaWsj, alt: "The Wall Street Journal", h: "h-12 md:h-16" },
  { src: mediaCnn, alt: "CNN", h: "h-14 md:h-18" },
  { src: mediaMansionGlobal, alt: "Mansion Global", h: "h-28 md:h-36" },
  { src: mediaNyt, alt: "The New York Times", h: "h-9 md:h-12" },
  { src: mediaRobbReport, alt: "Robb Report" },
  { src: mediaFoxNews, alt: "Fox News", h: "h-10 md:h-14" },
  { src: mediaTribeza, alt: "Tribeza" },
  { src: mediaCulturemap, alt: "CultureMap Austin", h: "h-16 md:h-22" },
  { src: mediaYahoo, alt: "Yahoo!" },
  { src: mediaAbj, alt: "Austin Business Journal", h: "h-24 md:h-34" },
  { src: mediaHgtv, alt: "HGTV" },
  { src: mediaHaven, alt: "Haven" },
  { src: mediaAustinHome, alt: "Austin Home" },
  { src: mediaAustinLuxuryHome, alt: "Austin Luxury Home Magazine" },
];

const ScrollingCredibilityStrip = () => {
  // Duplicate logos for seamless loop
  const track = [...logos, ...logos];

  return (
    <section className="bg-background pt-10 md:pt-14 pb-12 md:pb-16 overflow-hidden">
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

        <div className="scrolling-strip-track flex items-center gap-16 md:gap-24 w-max">
          {track.map((logo, i) => (
            <img
              key={`${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              decoding="async"
              className={`${logo.h || "h-20 md:h-28"} w-auto object-contain shrink-0 credibility-logo`}
              width={200}
              height={112}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollingCredibilityStrip;
