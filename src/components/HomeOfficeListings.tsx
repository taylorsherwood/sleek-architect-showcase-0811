import { useEffect, useRef } from "react";

type HomeOfficeListingsProps = {
  /** Spacing above the section heading, so each page can match its own rhythm. */
  topSpacing?: string;
};

const HomeOfficeListings = ({ topSpacing = "pt-4 md:pt-8" }: HomeOfficeListingsProps) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    const widget = document.createElement("realscout-office-listings");
    widget.setAttribute("agent-encoded-id", "QWdlbnQtMjg5NDU2");
    widget.setAttribute("sort-order", "PRICE_HIGH");
    widget.setAttribute("listing-status", "For Sale,In Contract");
    widget.setAttribute("property-types", "SFR,MF,TC,LAL,MOBILE,OTHER");
    widget.setAttribute("include-seller-listings", "true");
    widget.style.setProperty("--rs-listing-divider-color", "#b9a06c");
    widget.style.width = "100%";
    widgetRef.current.replaceChildren(widget);

    return () => {
      if (widget.parentNode === widgetRef.current) {
        widgetRef.current.removeChild(widget);
      }
    };
  }, []);

  return (
    <section aria-label="Current Austin property listings" className={`bg-secondary ${topSpacing} pb-20 md:pb-28`}>
      <div className="container mx-auto px-6 mb-12">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-minimal text-gold mb-4 font-extrabold">FROM THE SHOP</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural">
            Featured Austin Luxury Properties
          </h2>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <div className="max-w-[1200px] mx-auto">
          <div ref={widgetRef} className="w-full min-h-[320px]" />
          <noscript>
            <p className="text-center text-muted-foreground">
              View current listings in{" "}
              <a href="https://taylorsherwood.realscout.com/" className="underline">
                our property search portal
              </a>
              .
            </p>
          </noscript>
        </div>
      </div>
    </section>
  );
};

export default HomeOfficeListings;
