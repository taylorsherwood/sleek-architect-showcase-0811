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
    <section className="pt-12 pb-16 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-minimal text-gold mb-3 font-extrabold">
              CLIENT EXPERIENCES
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-light text-architectural mb-4">
              Trusted by Buyers, Sellers, and
              <br className="hidden md:block" />
              <span className="italic"> Investors</span> Across Austin
            </h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto font-light leading-relaxed">
              Real experiences from clients represented across Austin's most
              competitive neighborhoods.
            </p>
          </div>

          {/* Testimonial Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                className={`group relative bg-background rounded-xl p-7 md:p-8 flex flex-col justify-between hover:-translate-y-1 overflow-hidden${i === testimonials.length - 1 ? " md:col-span-2 md:max-w-[calc(50%-1rem)] md:mx-auto" : ""}`}
                style={{
                  opacity: 0,
                  transform: "translateY(40px)",
                  transition: `opacity 500ms ease ${i * 120}ms, transform 500ms ease ${i * 120}ms, box-shadow 500ms ease`,
                  boxShadow:
                    "0 4px 24px hsl(220 20% 10% / 0.06), 0 1px 4px hsl(220 20% 10% / 0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 16px 48px hsl(220 20% 10% / 0.1), 0 4px 12px hsl(220 20% 10% / 0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 24px hsl(220 20% 10% / 0.06), 0 1px 4px hsl(220 20% 10% / 0.04)";
                }}
              >
                {/* Quote icon */}
                <div className="mb-5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(42 37% 57% / 0.12), hsl(42 37% 57% / 0.06))",
                    }}
                  >
                    <Quote className="w-4 h-4 text-gold" />
                  </div>
                </div>

                {/* Quote text */}
                <p className="text-foreground text-base md:text-lg leading-[1.75] font-light italic mb-7 flex-1">
                  "{t.quote}"
                </p>

                {/* Attribution */}
                <div className="border-t border-border/60 pt-4">
                  <p className="font-display text-lg text-foreground tracking-tight">
                    {t.name}
                  </p>
                  <p className="text-minimal text-gold mt-2">{t.type}</p>
                  {t.context && (
                    <p className="text-sm text-muted-foreground mt-1.5 font-light">
                      {t.context}
                    </p>
                  )}
                </div>

                {/* Secondary logo watermark — static path, lazy loaded */}
                <img
                  src="/static-assets/echelon-secondary-logo.png"
                  alt=""
                  className="absolute bottom-4 right-4 w-10 h-auto pointer-events-none"
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