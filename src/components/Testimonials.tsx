import { useEffect, useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Taylor made selling our Barton Creek home seamless. His market knowledge and marketing strategy brought us multiple offers above asking within the first week.",
    name: "James & Sarah Mitchell",
    type: "Seller Client",
    context: "Sold in Barton Creek",
  },
  {
    quote:
      "Taylor was fantastic to work with! He really understood what I was looking for and showed me great options that fit my specific criteria. When I was ready to make an offer, he helped things move quickly to meet a tight closing date. I've already recommended Taylor to my friends!",
    name: "Meredith Taylor",
    type: "Buyer Client",
    context: "Purchased in Austin",
  },
  {
    quote:
      "From staging to close, every step was handled with professionalism and care. We couldn't have asked for a better experience. We'd recommend anyone thinking about buying or selling in Austin to call Taylor first.",
    name: "Katherine & Robert Ellis",
    type: "Seller Client",
    context: "Sold in Westlake Hills",
  },
  {
    quote:
      "Taylor's deep understanding of Austin's investment landscape helped us identify a property that exceeded our return expectations. His analysis was institutional-grade and his negotiation saved us significantly on the acquisition.",
    name: "David Chen",
    type: "Investor Client",
    context: "Investment Property, Austin",
  },
  {
    quote:
      "Taylor was incredible to work with! He's knowledgable, responsive, and genuinely cares about getting the best results for his clients. The entire process was smooth and stress-free. You can tell he really loves what he does and we couldn't have asked for a better experience! Highly recommend him to anyone buying or selling in Austin.",
    name: "Yaniv Dotan",
    type: "BUYER & SELLER CLIENT",
    context: "Purchased and sold in Barton Creek",
  },
];

const Testimonials = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          } else {
            el.style.opacity = "0";
            el.style.transform = "translateY(40px)";
          }
        });
      },
      { threshold: 0.15 }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="pt-16 md:pt-20 pb-20 md:pb-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-minimal text-gold mb-3 font-extrabold">
              CLIENT EXPERIENCES
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-3">
              Trusted by Buyers, Sellers, and
              <br className="hidden md:block" />
              <span className="italic"> Investors</span> Across Austin
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto font-light leading-relaxed">
              Real experiences from clients represented across Austin's most
              competitive neighborhoods.
            </p>
          </div>

          {/* Testimonial Grid */}
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                className={`group relative bg-card rounded-lg p-5 md:p-6 flex flex-col justify-between overflow-hidden border border-border/30${i === testimonials.length - 1 ? " md:col-span-2 md:max-w-[calc(50%-0.75rem)] md:mx-auto" : ""}`}
                style={{
                  opacity: 0,
                  transform: "translateY(40px)",
                  transition: `opacity 500ms ease ${i * 120}ms, transform 500ms ease ${i * 120}ms, box-shadow 500ms ease`,
                  boxShadow:
                    "0 2px 16px hsl(40 10% 50% / 0.05), 0 4px 20px hsl(40 10% 50% / 0.03)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.015)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px hsl(40 10% 50% / 0.09), 0 3px 12px hsl(40 10% 50% / 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 16px hsl(40 10% 50% / 0.05), 0 4px 20px hsl(40 10% 50% / 0.03)";
                }}
              >
                {/* Quote icon */}
                <div className="mb-3.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--gold) / 0.12), hsl(var(--gold) / 0.06))",
                    }}
                  >
                    <Quote className="w-3.5 h-3.5 text-gold" />
                  </div>
                </div>

                {/* Quote text */}
                <p className="text-foreground text-sm md:text-[0.935rem] leading-[1.7] font-light italic mb-5 flex-1">
                  "{t.quote}"
                </p>

                {/* Attribution */}
                <div className="border-t border-border/60 pt-3">
                  <p className="font-display text-base text-foreground tracking-tight">
                    {t.name}
                  </p>
                  <p className="text-minimal text-gold mt-1.5">{t.type}</p>
                  {t.context && (
                    <p className="text-xs text-muted-foreground mt-1 font-light">
                      {t.context}
                    </p>
                  )}
                </div>

                {/* Secondary logo watermark */}
                <img
                  src="/static-assets/echelon-secondary-logo.png"
                  alt=""
                  className="absolute bottom-3 right-3 w-8 h-auto pointer-events-none"
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;