import { useState } from "react";

interface CommunityBoundaryMapProps {
  imageSrc: string;
  communityName: string;
}

const CommunityBoundaryMap = ({ imageSrc, communityName }: CommunityBoundaryMapProps) => {
  const [imageExists, setImageExists] = useState(true);

  if (!imageExists) return null;

  return (
    <section className="bg-secondary/40 pt-6 pb-20 md:pt-8 md:pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-full h-px bg-border mb-10" />
          <p className="text-minimal text-muted-foreground tracking-widest mb-3 self-start">
            EXPLORE THE GEOGRAPHIC FOOTPRINT OF {communityName.toUpperCase()}
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural tracking-tight mb-8 self-start w-full">
            Neighborhood Boundaries
          </h2>
          <img
            src={imageSrc}
            alt={`${communityName} neighborhood boundary map showing the community borders in Austin, Texas`}
            className="w-full rounded-[10px] shadow-md"
            width={1000}
            height={700}
            style={{ maxWidth: 1000 }}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onError={() => setImageExists(false)}
          />
          <p className="text-sm text-muted-foreground mt-4">
            Approximate {communityName} neighborhood boundary.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CommunityBoundaryMap;
