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
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div className="flex flex-col items-start">
            <p className="text-xs uppercase text-gold mb-5">Client experiences</p>
            <h2 id="seller-experiences-heading" className="font-display font-normal text-architectural text-3xl md:text-4xl leading-relaxed max-w-sm">
              Clients first.<br />Proven results.
            </h2>
            <div className="mt-8 flex items-center gap-5">
              <Button variant="ghost" size="icon" className="rounded-full border border-border text-foreground hover:text-gold" aria-label="Previous client review" title="Previous client review" onClick={() => move(-1)}>
                <ArrowLeft aria-hidden="true" />
              </Button>
              <span className="text-sm text-muted-foreground tabular-nums" aria-live="polite" aria-atomic="true">
                {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
              <Button variant="ghost" size="icon" className="rounded-full border border-border text-foreground hover:text-gold" aria-label="Next client review" title="Next client review" onClick={() => move(1)}>
                <ArrowRight aria-hidden="true" />
              </Button>
            </div>
            <Button asChild variant="link" className="mt-7 h-auto rounded-none p-0 font-normal text-foreground hover:text-gold">
              <Link to="/reviews" className="border-b border-gold pb-1">Read more reviews <ArrowRight aria-hidden="true" /></Link>
            </Button>
          </div>

          <div
            className="relative border-t border-border pt-7 outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
            <span className="block text-gold font-display text-6xl h-12" aria-hidden="true">“</span>
            <div className="grid">
              {testimonials.map((review, index) => (
                <figure
                  key={review.name}
                  className={`col-start-1 row-start-1 m-0 flex flex-col justify-between gap-8 transition-opacity duration-500 motion-reduce:transition-none ${index === active ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"}`}
                  aria-hidden={index !== active}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${testimonials.length}`}
                >
                  <blockquote className="font-sans font-light text-foreground text-lg md:text-2xl leading-[1.85]">
                    <p>{review.quote}</p>
                  </blockquote>
                  <figcaption className="border-t border-border pt-6">
                    <p className="font-display text-base md:text-lg text-architectural">{review.name}</p>
                    <p className="mt-2 text-xs uppercase text-gold">{review.type}</p>
                    <p className="mt-2 text-sm text-muted-foreground font-light">{review.context}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerTestimonials;