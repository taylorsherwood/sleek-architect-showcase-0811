import { useEffect, useRef } from "react";

interface RealScoutListingsProps {
  listingStatus?: string;
  heading?: string;
  subheading?: string;
}

const RealScoutListings = ({
  listingStatus = "Sold",
  heading = "ECHELON RESULTS",
  subheading = "Recently Closed",
}: RealScoutListingsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Create the web component client-side only
    const el = document.createElement("realscout-your-listings");
    el.setAttribute("agent-encoded-id", "QWdlbnQtMjg5NDU2");
    el.setAttribute("sort-order", "PRICE_HIGH");
    el.setAttribute("listing-status", listingStatus);
    el.setAttribute("property-types", "SFR,MF,TC,LAL,MOBILE,OTHER");
    el.setAttribute("include-co-listings", "");
    el.setAttribute("include-seller-listings", "");
    containerRef.current.appendChild(el);

    return () => {
      if (containerRef.current && el.parentNode === containerRef.current) {
        containerRef.current.removeChild(el);
      }
    };
  }, []);

  return (
    <section className="pt-4 pb-14 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-minimal text-gold mb-4 font-extrabold whitespace-pre-line">{heading}</p>
          <p className="font-display font-light text-architectural mb-12 text-5xl">Recently Closed</p>
          <h2 className="text-4xl font-display font-light text-architectural mb-12 md:text-3xl">
            {subheading}
          </h2>
          <div ref={containerRef} className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default RealScoutListings;
