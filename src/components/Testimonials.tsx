import { useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import echelonWatermark from "@/assets/echelon-watermark.png";

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
    <section className="relative pt-16 md:pt-20 pb-20 md:pb-24 bg-background overflow-hidden">
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <img
          src={echelonWatermark}
          alt=""
          className="w-[420px] md:w-[520px] opacity-[0.04]"
          style={{ filter: "grayscale(20%)" }}
        />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[60rem] mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-minimal text-gold mb-3 font-extrabold">
              CLIENT EXPERIENCES
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-3">
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
                className={`group relative rounded-lg px-6 pt-5 pb-6 md:px-8 md:pt-7 md:pb-8 flex flex-col justify-between overflow-hidden${i === testimonials.length - 1 ? " md:col-span-2 md:max-w-[calc(50%-0.75rem)] md:mx-auto" : ""}`}
                style={{
                  opacity: 0,
                  transform: "translateY(40px)",
                  transition: `opacity 500ms ease ${i * 120}ms, transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 120}ms, box-shadow 500ms ease`,
                  background: "#FFFFFF",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 36px rgba(0,0,0,0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.05)";
                }}
              >
                {/* Quote text with quotation marks */}
                <p className="text-foreground/[0.88] text-[0.9rem] md:text-[0.95rem] leading-[1.8] font-light italic mb-4 flex-1 relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Attribution */}
                <div>
                  <p className="font-display text-[0.925rem] text-foreground tracking-tight">
                    {t.name}
                  </p>
                  <p className="text-minimal text-gold mt-1">{t.type}</p>
                  {t.context && (
                    <p className="text-xs text-muted-foreground/80 mt-0.5 font-light">
                      {t.context}
                    </p>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Testimonials;