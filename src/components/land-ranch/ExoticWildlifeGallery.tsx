import { useState } from "react";
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
  tagline: string;
  image: string;
  description: string;
  habitat: string;
  appeal: string;
};

const species: Species[] = [
  {
    name: "Axis Deer",
    tagline: "Texas Hill Country Icon",
    image: axisImg.url,
    description:
      "Free-ranging across much of Central Texas, axis deer have become a defining presence on Hill Country ranches — prized for their year-round visibility, striking coat, and exceptional table quality.",
    habitat: "Thrives in mixed oak-juniper savanna with reliable water and open browse.",
    appeal:
      "A cornerstone species for recreational ranches in Gillespie, Kerr, Llano, and Bandera counties; reliable herd presence enhances both lifestyle enjoyment and long-term land value.",
  },
  {
    name: "Blackbuck",
    tagline: "Fast, Elegant, Established",
    image: blackbuckImg.url,
    description:
      "An Indian antelope long established on Central Texas ranches, blackbuck are prized for their dramatic spiral horns and striking black-and-white coloration that intensifies with age.",
    habitat: "Open prairie and lightly wooded acreage with short native grasses.",
    appeal:
      "A signature species on managed exotic ranches — adds visual character, supports diversified wildlife programs, and complements low-fence and high-fence operations alike.",
  },
  {
    name: "Oryx",
    tagline: "Desert-Adapted Trophy Species",
    image: oryxImg.url,
    description:
      "A large, desert-adapted antelope suited to dry, open terrain, oryx command attention with their long rapier horns and stoic presence.",
    habitat: "Arid and semi-arid acreage with sparse cover and reliable supplemental forage.",
    appeal:
      "Highly desirable for collectors of free-ranging exotics; commands premium values and signals a well-managed, large-acreage operation.",
  },
  {
    name: "Zebra",
    tagline: "Rare Private Ranch Collection",
    image: zebraImg.url,
    description:
      "A rare presence on a small number of curated Texas ranches, zebras are kept as part of long-term wildlife collections that reflect generational stewardship.",
    habitat: "Improved pasture with strong fencing, water, and supplemental nutrition programs.",
    appeal:
      "A statement species — signals collector-grade ownership, often anchoring legacy ranches with multi-decade wildlife programs.",
  },
  {
    name: "Fallow Deer",
    tagline: "European Heritage Species",
    image: fallowImg.url,
    description:
      "An elegant, social herd species with European roots, fallow deer thrive on managed recreational ranches and present in a striking range of color phases.",
    habitat: "Wooded and semi-wooded acreage with established cover and water.",
    appeal:
      "Reliable herd behavior and high visibility make fallow deer a favorite for family ranches focused on recreation, observation, and conservation.",
  },
];

const ExoticWildlifeGallery = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-10 md:mb-14">
          <p className="text-gold mb-5" style={labelStyle}>
            Species of the Texas Hill Country
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.6rem] font-normal text-architectural leading-[1.15] mb-6">
            A private wildlife heritage, stewarded across generations
          </h2>
          <p className="text-muted-foreground leading-[1.8] text-[1.0625rem] max-w-[58ch]">
            Texas is one of the few places in the world where private landowners steward
            free-ranging exotic wildlife across thousands of acres. These species have become
            defining features of many Hill Country recreational and investment ranches.
          </p>
        </div>

        {/* Desktop: 5-up row | Mobile: horizontal snap gallery */}
        <div
          className="
            flex md:grid md:grid-cols-5
            gap-5 md:gap-6
            overflow-x-auto md:overflow-visible
            snap-x snap-mandatory md:snap-none
            -mx-6 md:mx-0 px-6 md:px-0
            pb-2 md:pb-0
            scrollbar-none
          "
          style={{ scrollbarWidth: "none" }}
        >
          {species.map((s, i) => {
            const isOpen = openIndex === i;
            return (
              <button
                key={s.name}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`exotic-detail-${i}`}
                className="
                  group relative
                  flex-shrink-0 md:flex-shrink
                  w-[78%] sm:w-[55%] md:w-auto
                  snap-start md:snap-align-none
                  text-left
                  bg-background
                  border border-[#b9a06c]/40 hover:border-[#b9a06c]
                  transition-colors duration-500
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b9a06c]
                "
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={s.image}
                    alt={`${s.name} on a Texas exotic wildlife ranch`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                  {/* gold accent line on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute left-5 right-5 bottom-[4.75rem] h-px bg-[#b9a06c] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="px-5 py-5 bg-background">
                  <p
                    className="text-architectural group-hover:text-[#b9a06c] transition-colors duration-300 mb-2"
                    style={{ ...labelStyle, fontSize: "0.7rem" }}
                  >
                    {s.name}
                  </p>
                  <p
                    className="text-muted-foreground text-[0.85rem] leading-snug"
                    style={{ fontFamily: '"Jost", sans-serif' }}
                  >
                    {s.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Expanded detail panel */}
        {openIndex !== null && (
          <div
            id={`exotic-detail-${openIndex}`}
            className="mt-10 md:mt-14 border-t border-[#b9a06c]/40"
          >
            <div className="grid md:grid-cols-12 gap-10 md:gap-14 pt-10 md:pt-14">
              <div className="md:col-span-6">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={species[openIndex].image}
                    alt={`${species[openIndex].name} feature image`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="md:col-span-6">
                <p className="text-gold mb-4" style={labelStyle}>
                  {species[openIndex].tagline}
                </p>
                <h3 className="font-display text-2xl md:text-[2rem] font-normal text-architectural leading-[1.15] mb-6">
                  {species[openIndex].name}
                </h3>
                <p className="text-muted-foreground leading-[1.8] text-[1.0625rem] mb-6">
                  {species[openIndex].description}
                </p>
                <div className="space-y-5">
                  <div>
                    <p
                      className="text-architectural mb-2"
                      style={{ ...labelStyle, fontSize: "0.6rem" }}
                    >
                      Habitat
                    </p>
                    <p className="text-muted-foreground leading-[1.7] text-[0.975rem]">
                      {species[openIndex].habitat}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-architectural mb-2"
                      style={{ ...labelStyle, fontSize: "0.6rem" }}
                    >
                      Ranch Ownership Appeal
                    </p>
                    <p className="text-muted-foreground leading-[1.7] text-[0.975rem]">
                      {species[openIndex].appeal}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenIndex(null)}
                  className="mt-8 inline-flex items-center gap-2 text-foreground gold-underline-hover pb-0.5 hover:text-gold transition-colors"
                  style={labelStyle}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExoticWildlifeGallery;
