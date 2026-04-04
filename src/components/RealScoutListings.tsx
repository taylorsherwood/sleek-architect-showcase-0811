import { useEffect, useRef, useState } from "react";

interface RealScoutListingsProps {
  listingStatus?: string;
  heading?: string;
  subheading?: string;
  title?: string;
}

const RealScoutListings = ({
  listingStatus = "Sold",
  heading = "ECHELON RESULTS",
  subheading = "Recently Closed",
  title = "on the market",
}: RealScoutListingsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Only load the widget when the section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible || !containerRef.current) return;
    // Create the web component client-side only
    const el = document.createElement("realscout-your-listings");
    el.setAttribute("agent-encoded-id", "QWdlbnQtMjg5NDU2");
    el.setAttribute("sort-order", "PRICE_HIGH");
    el.setAttribute("listing-status", listingStatus);
    el.setAttribute("property-types", "SFR,MF,TC,LAL,MOBILE,OTHER");
    el.setAttribute("include-co-listings", "");
    el.style.setProperty("--rs-listing-divider-color", "#0c0f24");
    el.style.width = "100%";
    containerRef.current!.replaceChildren(el);

    return () => {
      if (containerRef.current && el.parentNode === containerRef.current) {
        containerRef.current.removeChild(el);
      }
    };
  }, [visible, listingStatus]);

  return (
    <section ref={sectionRef} className="pt-4 pb-4 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-minimal text-gold mb-4 font-extrabold whitespace-pre-line">{heading}</p>
          <h2 className="font-display font-normal text-architectural mb-8 text-5xl">
            {title}
          </h2>
          {visible ? (
            <div ref={containerRef} className="w-full overflow-hidden" />
          ) : (
            <div className="w-full min-h-[200px] flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-gold border-t-gold rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RealScoutListings;