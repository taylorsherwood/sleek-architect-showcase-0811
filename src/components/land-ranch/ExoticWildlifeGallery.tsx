import axisImg from "@/assets/exotic-axis-deer.jpg.asset.json";
import blackbuckImg from "@/assets/exotic-blackbuck.jpg.asset.json";
import oryxImg from "@/assets/exotic-oryx.jpg.asset.json";
import zebraImg from "@/assets/exotic-zebra.jpg.asset.json";
import fallowImg from "@/assets/exotic-fallow-deer.webp.asset.json";

const labelStyle: React.CSSProperties = {
  fontSize: "0.6rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  fontFamily: '"Jost", sans-serif',
  fontWeight: 700,
};

type Species = {
  name: string;
  positioning: string;
  image: string;
};

const species: Species[] = [
  {
    name: "Axis Deer",
    image: axisImg.url,
    positioning:
      "The iconic exotic species of the Texas Hill Country, found on premier recreational and investment ranches throughout the region.",
  },
  {
    name: "Blackbuck",
    image: blackbuckImg.url,
    positioning:
      "An established Indian antelope prized for spiral horns and striking coloration — a signature presence on managed exotic ranches.",
  },
  {
    name: "Oryx",
    image: oryxImg.url,
    positioning:
      "Desert-adapted and commanding, oryx anchor large-acreage operations where collectors seek trophy-grade free-ranging exotics.",
  },
  {
    name: "Zebra",
    image: zebraImg.url,
    positioning:
      "A rare statement species kept on a select few Texas ranches — the hallmark of multi-generational wildlife stewardship.",
  },
  {
    name: "Fallow Deer",
    image: fallowImg.url,
    positioning:
      "An elegant European heritage species favored on family ranches focused on recreation, observation, and quiet conservation.",
  },
];

const Card = ({ s }: { s: Species }) => (
  <div
    className="
      group relative overflow-hidden cursor-pointer
      flex-shrink-0 md:flex-shrink
      w-[82%] sm:w-[60%] md:w-auto
      snap-start md:snap-align-none
      rounded-[2px]
    "
    style={{ height: "clamp(450px, 60vw, 560px)" }}
  >
    <img
      src={s.image}
      alt={`${s.name} on a Texas exotic wildlife ranch`}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
    />
    {/* base wash */}
    <div
      className="absolute inset-0 pointer-events-none transition-colors duration-500 group-hover:bg-[rgba(12,15,36,0.32)]"
      style={{ backgroundColor: "rgba(12, 15, 36, 0.18)" }}
    />
    {/* bottom gradient */}
    <div
      className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
      style={{
        background:
          "linear-gradient(to top, rgba(12,15,36,0.92) 0%, rgba(12,15,36,0.65) 40%, rgba(12,15,36,0) 100%)",
      }}
    />

    <div className="relative z-10 h-full flex flex-col justify-end p-7 md:p-8 lg:p-9 text-white">
      <p
        className="mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ ...labelStyle, color: "#b9a06c" }}
      >
        Texas Hill Country
      </p>
      <h3 className="font-display text-[1.65rem] md:text-[1.85rem] lg:text-[2rem] font-normal leading-[1.1] mb-3">
        {s.name}
      </h3>
      {/* gold divider */}
      <span
        aria-hidden="true"
        className="block h-px w-10 mb-4 origin-left transition-transform duration-700 ease-out group-hover:scale-x-[2.2]"
        style={{ backgroundColor: "#b9a06c" }}
      />
      <p
        className="text-white/85 text-[0.95rem] leading-[1.6] mb-5 max-w-[40ch]"
        style={{ fontFamily: '"Jost", sans-serif' }}
      >
        {s.positioning}
      </p>
      <span
        className="inline-flex items-center gap-2 text-white group-hover:text-[#b9a06c] transition-colors duration-300"
        style={{ ...labelStyle, fontSize: "0.65rem" }}
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
  const top = species.slice(0, 3);
  const bottom = species.slice(3);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Narrow editorial intro */}
        <div className="max-w-xl mb-12 md:mb-16">
          <p className="text-gold mb-5" style={labelStyle}>
            Species of the Texas Hill Country
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.6rem] font-normal text-architectural leading-[1.15] mb-6">
            A private wildlife heritage, stewarded across generations
          </h2>
          <p className="text-muted-foreground leading-[1.8] text-[1.0625rem]">
            Texas is one of the few places in the world where private landowners steward
            free-ranging exotic wildlife across thousands of acres — defining features of
            the region's most distinctive recreational and investment ranches.
          </p>
        </div>

        {/* Mobile: horizontal swipe carousel */}
        <div
          className="md:hidden flex gap-5 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-2 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {species.map((s) => (
            <Card key={s.name} s={s} />
          ))}
        </div>

        {/* Desktop: 3 on top, 2 centered beneath */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6 lg:gap-7">
            {top.map((s) => (
              <Card key={s.name} s={s} />
            ))}
          </div>
          <div className="grid grid-cols-12 gap-6 lg:gap-7 mt-6 lg:mt-7">
            <div className="col-span-2" />
            <div className="col-span-4">
              <Card s={bottom[0]} />
            </div>
            <div className="col-span-4">
              <Card s={bottom[1]} />
            </div>
            <div className="col-span-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExoticWildlifeGallery;
