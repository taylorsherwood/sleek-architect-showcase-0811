import zebraImg from "@/assets/exotic-zebra.jpg.asset.json";
import lakeAustinImg from "@/assets/lake-austin-waterfront.jpg";
import axisImg from "@/assets/exotic-axis-deer.jpg.asset.json";
import legacyImg from "@/assets/land-ranch-editorial.jpg";
import investmentImg from "@/assets/land-ranch-home-intro.jpg";

const labelStyle: React.CSSProperties = {
  fontSize: "0.6rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  fontFamily: '"Jost", sans-serif',
  fontWeight: 700,
};

type Profile = {
  name: string;
  positioning: string;
  image: string;
  eyebrow: string;
};

const profiles: Profile[] = [
  {
    name: "Exotic Wildlife Ranches",
    eyebrow: "Specialty Category",
    image: zebraImg.url,
    positioning:
      "Axis, blackbuck, oryx, zebra and other managed species across Texas ranchland.",
  },
  {
    name: "Live Water Ranches",
    eyebrow: "Defining Feature",
    image: lakeAustinImg,
    positioning:
      "Properties anchored by rivers, creeks, springs and high-value water resources.",
  },
  {
    name: "Recreational Ranches",
    eyebrow: "Lifestyle Use",
    image: axisImg.url,
    positioning:
      "Hunting, fishing, trail systems and full-season outdoor recreation.",
  },
  {
    name: "Legacy Holdings",
    eyebrow: "Generational",
    image: legacyImg,
    positioning:
      "Multi-generational properties focused on preservation and stewardship.",
  },
  {
    name: "Investment Acreage",
    eyebrow: "Capital Strategy",
    image: investmentImg,
    positioning:
      "Land positioned for appreciation, development or long-term value creation.",
  },
];

const Card = ({ p }: { p: Profile }) => (
  <div
    className="
      group relative overflow-hidden cursor-pointer
      flex-shrink-0 md:flex-shrink
      w-[78%] sm:w-[56%] md:w-auto
      snap-start md:snap-align-none
      rounded-[2px]
    "
    style={{ height: "clamp(250px, 20vw, 300px)" }}
  >
    <img
      src={p.image}
      alt={`${p.name} on Texas ranchland`}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
    />
    <div
      className="absolute inset-0 pointer-events-none transition-colors duration-500 group-hover:bg-[rgba(12,15,36,0.24)]"
      style={{ backgroundColor: "rgba(12, 15, 36, 0.12)" }}
    />
    <div
      className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
      style={{
        background:
          "linear-gradient(to top, rgba(12,15,36,0.82) 0%, rgba(12,15,36,0.48) 45%, rgba(12,15,36,0) 100%)",
      }}
    />

    <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-5 text-white">
      <p
        className="mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ ...labelStyle, color: "#b9a06c" }}
      >
        {p.eyebrow}
      </p>
      <h3 className="font-display text-[1.1rem] md:text-[1.15rem] lg:text-[1.2rem] font-normal leading-[1.15] mb-2">
        {p.name}
      </h3>
      <span
        aria-hidden="true"
        className="block h-px w-8 mb-2.5 origin-left transition-transform duration-700 ease-out group-hover:scale-x-[2.2]"
        style={{ backgroundColor: "#b9a06c" }}
      />
      <p
        className="text-white/80 text-[0.78rem] md:text-[0.8rem] leading-[1.5] mb-3 max-w-[38ch]"
        style={{ fontFamily: '"Jost", sans-serif' }}
      >
        {p.positioning}
      </p>
      <span
        className="inline-flex items-center gap-2 text-white group-hover:text-[#b9a06c] transition-colors duration-300"
        style={{ ...labelStyle, fontSize: "0.6rem" }}
      >
        Learn More
        <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1.5">
          →
        </span>
      </span>
    </div>
  </div>
);

const ExoticWildlifeGallery = () => {
  const top = profiles.slice(0, 3);
  const bottom = profiles.slice(3);

  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Narrow editorial intro */}
        <div className="max-w-xl mb-10 md:mb-12">
          <p className="text-gold mb-4" style={labelStyle}>
            Ranch Ownership Profiles
          </p>
          <h2 className="font-display text-2xl md:text-[1.85rem] lg:text-[2rem] font-normal text-architectural leading-[1.2] mb-5">
            Types of Texas ranch properties
          </h2>
          <p className="text-muted-foreground leading-[1.7] text-[0.98rem]">
            Texas ranch ownership spans a range of profiles, from live water and
            recreational holdings to legacy acreage, investment tracts and
            specialty operations such as exotic wildlife ranches.
          </p>
        </div>

        {/* Mobile: horizontal swipe carousel */}
        <div
          className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-2 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {profiles.map((p) => (
            <Card key={p.name} p={p} />
          ))}
        </div>

        {/* Tablet (md): 3 on top, 2 centered beneath */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-3 gap-5">
            {top.map((p) => (
              <Card key={p.name} p={p} />
            ))}
          </div>
          <div className="grid grid-cols-12 gap-5 mt-5">
            <div className="col-span-2" />
            <div className="col-span-4">
              <Card p={bottom[0]} />
            </div>
            <div className="col-span-4">
              <Card p={bottom[1]} />
            </div>
            <div className="col-span-2" />
          </div>
        </div>

        {/* Desktop (lg+): single row of 5 */}
        <div className="hidden lg:grid grid-cols-5 gap-5">
          {profiles.map((p) => (
            <Card key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExoticWildlifeGallery;
