import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import card78746 from "@/assets/barton-creek-estate-new.webp";
import cardTarrytown from "@/assets/community-tarrytown.webp";
import cardOldEnfield from "@/assets/pemberton-heights.webp";
import cardWestlake from "@/assets/community-westlake-new.webp";
import cardDavenport from "@/assets/davenport-ranch-estate.webp";
import cardSpanishOaks from "@/assets/spanish-oaks-estate.webp";

const NEIGHBORHOODS = [
  {
    name: "Barton Creek",
    image: card78746,
    stat: "Median sale: $3.2M",
    description:
      "Guard-gated estates set among rolling Hill Country fairways, where most $5M+ homes change hands long before they're listed.",
  },
  {
    name: "Rollingwood",
    image: cardTarrytown,
    stat: "Avg DOM off-market: 14 days",
    description:
      "An Eanes ISD enclave minutes from downtown — tightly held lots and discreet trades among long-tenured owners.",
  },
  {
    name: "Old Enfield",
    image: cardOldEnfield,
    stat: "60% of trades are private",
    description:
      "Austin's most storied historic neighborhood. Pre-war architecture, walkable streets, and a buyer pool built on referrals.",
  },
  {
    name: "West Lake Hills",
    image: cardWestlake,
    stat: "Median sale: $4.1M",
    description:
      "Hilltop modernist estates with city skyline views. Among the most competitive luxury micro-markets in Texas.",
  },
  {
    name: "Tarrytown",
    image: cardDavenport,
    stat: "Central access to Austin",
    description:
      "Generational estates between Lake Austin and downtown. A market defined by relationships and quiet introductions.",
  },
  {
    name: "Spanish Oaks",
    image: cardSpanishOaks,
    stat: "Guard-gated golf estates",
    description:
      "A private golf community west of the city. Estate-sized lots, custom builds, and a roster largely closed to the public.",
  },
];

const ENTRY_Y = 180;
const STACK_Y = 28;
const STACK_SCALE = 0.045;
const MAX_VISIBLE_STACK = 3;

const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;

interface CardProps {
  index: number;
  total: number;
  name: string;
  image: string;
  stat: string;
  description: string;
  progress: MotionValue<number>;
}

const Card = ({ index, total, name, image, stat, description, progress }: CardProps) => {
  const y = useTransform(() => {
    const activeIndex = progress.get() * (total - 1);
    const depth = activeIndex - index;

    if (depth <= -1) return ENTRY_Y;
    if (depth < 0) return mix(ENTRY_Y, 0, depth + 1);

    return -Math.min(depth, MAX_VISIBLE_STACK) * STACK_Y;
  });

  const scale = useTransform(() => {
    const activeIndex = progress.get() * (total - 1);
    const depth = activeIndex - index;

    if (depth <= 0) return 1;
    return 1 - Math.min(depth, MAX_VISIBLE_STACK) * STACK_SCALE;
  });

  const opacity = useTransform(() => {
    const activeIndex = progress.get() * (total - 1);
    const depth = activeIndex - index;

    if (depth < -1.08) return 0;
    return 1;
  });

  const imageScale = useTransform(() => {
    const activeIndex = progress.get() * (total - 1);
    const depth = activeIndex - index;

    if (depth <= -1) return 1.22;
    if (depth < 0) return mix(1.22, 1, depth + 1);
    return 1;
  });

  return (
    <motion.article
      style={{ y, scale, opacity, zIndex: index + 1 }}
      className="absolute left-1/2 top-[8vh] flex h-[76vh] max-h-[760px] w-[min(90vw,1320px)] -translate-x-1/2 overflow-hidden rounded-md"
    >
      <div
        className="relative z-10 hidden w-[42%] flex-col justify-center md:flex"
        style={{ backgroundColor: "hsl(231 50% 12%)" }}
      >
        <div className="px-10 lg:px-14">
          <p
            className="mb-5 font-sans text-[0.7rem] uppercase leading-none"
            style={{ color: "hsl(41 34% 57%)", letterSpacing: "0.28em" }}
          >
            {stat}
          </p>
          <h3
            className="mb-5 font-display font-light leading-[0.96]"
            style={{ color: "hsl(40 30% 92%)", fontSize: "clamp(2.4rem, 3.8vw, 4.2rem)" }}
          >
            {name}
          </h3>
          <p
            className="max-w-[30ch] font-sans text-[0.98rem] font-light leading-relaxed"
            style={{ color: "hsl(40 20% 84% / 0.76)" }}
          >
            {description}
          </p>
        </div>
      </div>

      <div className="relative h-full w-full overflow-hidden md:w-[58%]">
        <motion.div className="absolute inset-0 will-change-transform" style={{ scale: imageScale }}>
          <img
            src={image}
            alt={`${name} luxury Austin neighborhood`}
            className="h-full w-full object-cover"
            decoding="async"
          />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 p-8 md:hidden"
          style={{ background: "linear-gradient(to top, hsl(231 50% 12% / 0.9) 0%, hsl(231 50% 12% / 0) 72%)" }}
        >
          <p
            className="mb-2 font-sans text-[0.65rem] uppercase leading-none"
            style={{ color: "hsl(41 34% 57%)", letterSpacing: "0.24em" }}
          >
            {stat}
          </p>
          <h3
            className="font-display font-light leading-none"
            style={{ color: "hsl(40 30% 92%)", fontSize: "2.2rem" }}
          >
            {name}
          </h3>
        </div>
      </div>
    </motion.article>
  );
};

const StackingCommunityCards = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[hsl(220,15%,6%)]"
      style={{ height: `${NEIGHBORHOODS.length * 82}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {NEIGHBORHOODS.map((neighborhood, index) => (
          <Card
            key={neighborhood.name}
            index={index}
            total={NEIGHBORHOODS.length}
            progress={scrollYProgress}
            name={neighborhood.name}
            image={neighborhood.image}
            stat={neighborhood.stat}
            description={neighborhood.description}
          />
        ))}
      </div>
    </section>
  );
};

export default StackingCommunityCards;
