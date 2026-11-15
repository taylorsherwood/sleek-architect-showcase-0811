import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/components/Testimonials";

const SellerTestimonials = () => {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const move = (direction: number) => {
    setActive((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-secondary py-16 md:py-24" aria-labelledby="seller-experiences-heading">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-12 lg:items-center">
          <div className="flex flex-col items-start">
            <p className="text-xs uppercase text-gold mb-5">Client experiences</p>
            <h2 id="seller-experiences-heading" className="font-display font-normal text-architectural text-3xl md:text-4xl leading-relaxed max-w-sm">
              Clients first.<br />Proven results.
            </h2>
            <div className="mt-8 flex items-center lg:items-start lg:flex-col gap-5">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-none border border-gold text-foreground hover:bg-gold hover:text-primary-foreground" aria-label="Next client review" title="Next client review" onClick={() => move(1)}>
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-none border border-gold text-foreground hover:bg-gold hover:text-primary-foreground" aria-label="Previous client review" title="Previous client review" onClick={() => move(-1)}>
                <ArrowLeft aria-hidden="true" />
              </Button>
              <span className="text-sm text-muted-foreground tabular-nums" aria-live="polite" aria-atomic="true">
                {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
            <Button asChild variant="link" className="mt-7 h-auto rounded-none p-0 font-normal text-foreground hover:text-gold">
              <Link to="/reviews" className="border-b border-gold pb-1">Read more reviews <ArrowRight aria-hidden="true" /></Link>
            </Button>
          </div>

          <div
            className="seller-review-deck relative grid py-6 outline-none focus-visible:ring-1 focus-visible:ring-ring"
            role="region"
            aria-roledescription="carousel"
            aria-label="Client reviews"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                move(event.key === "ArrowLeft" ? -1 : 1);
              }
            }}
            onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
            onTouchEnd={(event) => {
              const end = event.changedTouches[0]?.clientX;
              if (touchStart.current !== null && end !== undefined && Math.abs(end - touchStart.current) > 60) {
                move(end < touchStart.current ? 1 : -1);
              }
              touchStart.current = null;
            }}
          >
              {testimonials.map((review, index) => {
                const position = (index - active + testimonials.length) % testimonials.length;
                const front = position === 0;
                return (
                <figure
                  key={review.name}
                  data-pos={position > 3 ? "hidden" : position}
                  className="seller-review-card col-start-1 row-start-1 m-0 relative w-[86%] sm:w-[76%] min-h-[580px] p-6 sm:p-8 md:p-10 bg-primary text-primary-foreground flex flex-col justify-between"
                  aria-hidden={!front}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${testimonials.length}`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-gold font-display text-7xl leading-none" aria-hidden="true">“</span>
                    <span className="text-gold font-display text-sm">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  {!front && position <= 3 && (
                    <Button variant="ghost" className="absolute inset-0 w-full h-full rounded-none p-0 hover:bg-transparent" tabIndex={-1} aria-label={`Show review by ${review.name}`} onClick={() => setActive(index)} />
                  )}
                  <blockquote className="seller-review-copy font-sans font-light text-primary-foreground text-base md:text-lg leading-[1.85] flex-1">
                    <p>{review.quote}</p>
                  </blockquote>
                  <figcaption className="seller-review-copy pt-10">
                    <span className="block w-10 h-px bg-gold mb-5" aria-hidden="true" />
                    <p className="font-display text-lg md:text-2xl text-primary-foreground">{review.name}</p>
                    <p className="mt-2 text-xs uppercase text-gold">{review.type}</p>
                    <p className="mt-2 text-sm text-primary-foreground font-light">{review.context}</p>
                  </figcaption>
                </figure>
              ); })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerTestimonials;