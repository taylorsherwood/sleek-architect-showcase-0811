import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import card78746 from "@/assets/barton-creek-estate-new.webp";
import cardTarrytown from "@/assets/community-tarrytown.webp";
import cardOldEnfield from "@/assets/pemberton-heights.webp";
import cardWestlake from "@/assets/community-westlake-new.webp";
import cardDavenport from "@/assets/davenport-ranch-estate.webp";
import cardSpanishOaks from "@/assets/spanish-oaks-estate.webp";

const NEIGHBORHOODS = [
  { name: "Barton Creek", image: card78746 },
  { name: "Rollingwood", image: cardTarrytown },
  { name: "Old Enfield", image: cardOldEnfield },
  { name: "West Lake Hills", image: cardWestlake },
  { name: "Tarrytown", image: cardDavenport },
  { name: "Spanish Oaks", image: cardSpanishOaks },
];

interface CardProps {
  i: number;
  name: string;
  image: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card = ({ i, name, image, progress, range, targetScale }: CardProps) => {
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
          top: `calc(-5vh + ${i * 28}px)`,
          backgroundColor: "#0C0F24",
          transformOrigin: "top center",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        }}
        className="relative rounded-md overflow-hidden w-[min(82vw,1200px)] h-[min(72vh,640px)]"
      >
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale }}
        >
          <img
            src={image}
            alt={`${name} luxury Austin neighborhood`}
            className="w-full h-full object-cover"
            decoding="async"
          />
        </motion.div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(12,15,36,0.88) 0%, rgba(12,15,36,0.25) 45%, rgba(12,15,36,0) 70%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-10 lg:p-14 text-center">
          <h3
            className="font-display font-light leading-[1]"
            style={{
              color: "#b9a06c",
              fontSize: "clamp(2.25rem, 4.5vw, 4.25rem)",
              letterSpacing: "0.02em",
            }}
          >
            {name}
          </h3>
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
