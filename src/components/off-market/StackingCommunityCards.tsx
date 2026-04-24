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

interface CardProps {
  i: number;
  name: string;
  image: string;
  stat: string;
  description: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card = ({
  i,
  name,
  image,
  stat,
  description,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 32}px)`,
          backgroundColor: "#0C0F24",
          transformOrigin: "top center",
          boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
        }}
        className="relative rounded-md overflow-hidden w-[min(86vw,1200px)] h-[min(70vh,620px)] flex"
      >
        {/* Left: copy panel */}
        <div className="relative z-10 hidden md:flex flex-col justify-center w-[42%] p-10 lg:p-14">
          <p
            className="mb-5 font-sans uppercase"
            style={{
              color: "#b9a06c",
              fontSize: "0.7rem",
              letterSpacing: "0.28em",
            }}
          >
            {stat}
          </p>
          <h3
            className="font-display font-light leading-[1] mb-5"
            style={{
              color: "#F5F1EA",
              fontSize: "clamp(2rem, 3.4vw, 3.4rem)",
              letterSpacing: "0.02em",
            }}
          >
            {name}
          </h3>
          <p
            className="font-sans font-light leading-relaxed"
            style={{
              color: "rgba(245,241,234,0.78)",
              fontSize: "0.95rem",
              maxWidth: "30ch",
            }}
          >
            {description}
          </p>
        </div>

        {/* Right: image */}
        <div className="relative w-full md:w-[58%] h-full overflow-hidden">
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{ scale: imageScale }}
          >
            <img
              src={image}
              alt={`${name} luxury Austin neighborhood`}
              className="w-full h-full object-cover"
              decoding="async"
            />
          </motion.div>
          {/* Mobile-only name overlay */}
          <div className="md:hidden absolute inset-x-0 bottom-0 p-8 text-center pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(12,15,36,0.88) 0%, rgba(12,15,36,0) 70%)",
            }}
          >
            <p
              className="mb-2 font-sans uppercase"
              style={{ color: "#b9a06c", fontSize: "0.65rem", letterSpacing: "0.24em" }}
            >
              {stat}
            </p>
            <h3
              className="font-display font-light"
              style={{ color: "#F5F1EA", fontSize: "2rem", letterSpacing: "0.02em" }}
            >
              {name}
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const StackingCommunityCards = () => {
  const container = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={container}
      className="relative w-full bg-[hsl(220,15%,6%)]"
    >
      {NEIGHBORHOODS.map((n, i) => {
        const targetScale = 1 - (NEIGHBORHOODS.length - i) * 0.04;
        return (
          <Card
            key={n.name}
            i={i}
            name={n.name}
            image={n.image}
            stat={n.stat}
            description={n.description}
            progress={scrollYProgress}
            range={[i * (1 / NEIGHBORHOODS.length), 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
};

export default StackingCommunityCards;
