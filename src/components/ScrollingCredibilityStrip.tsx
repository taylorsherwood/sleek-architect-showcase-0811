import mediaWsj from "@/assets/media-wsj.png";
import mediaMansionGlobal from "@/assets/media-mansion-global.png";
import mediaTribeza from "@/assets/media-tribeza.png";
import mediaAbj from "@/assets/media-abj.png";
import mediaHaven from "@/assets/media-haven.png";
import mediaRobbReport from "@/assets/media-robb-report.png";
import mediaAustinHome from "@/assets/media-austin-home.png";
import mediaAustinLuxuryHome from "@/assets/media-austin-luxury-home.png";
import mediaCnn from "@/assets/media-cnn.png";
import mediaFoxNews from "@/assets/media-fox-news.png";
import mediaYahoo from "@/assets/media-yahoo.png";
import mediaHgtv from "@/assets/media-hgtv.png";
import mediaNyt from "@/assets/media-nyt.png";

const logos = [
  { src: mediaWsj, alt: "The Wall Street Journal" },
  { src: mediaCnn, alt: "CNN" },
  { src: mediaMansionGlobal, alt: "Mansion Global" },
  { src: mediaNyt, alt: "The New York Times" },
  { src: mediaRobbReport, alt: "Robb Report" },
  { src: mediaFoxNews, alt: "Fox News" },
  { src: mediaTribeza, alt: "Tribeza" },
  { src: mediaYahoo, alt: "Yahoo!" },
  { src: mediaAbj, alt: "Austin Business Journal" },
  { src: mediaHgtv, alt: "HGTV" },
  { src: mediaHaven, alt: "Haven" },
  { src: mediaAustinHome, alt: "Austin Home" },
  { src: mediaAustinLuxuryHome, alt: "Austin Luxury Home Magazine" },
];

const ScrollingCredibilityStrip = () => {
  // Duplicate logos for seamless loop
  const track = [...logos, ...logos];

  return (
    <section className="bg-background pt-16 md:pt-20 pb-12 md:pb-16 overflow-hidden">
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
              className="h-20 md:h-28 w-auto object-contain shrink-0 credibility-logo"
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
