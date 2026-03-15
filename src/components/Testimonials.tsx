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
      "From staging to close, every step was handled with professionalism and care. We couldn't have asked for a better experience.",
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
];

const Testimonials = () => {
  return (
    <section className="py-28 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="text-minimal text-gold mb-4 font-extrabold">
              CLIENT EXPERIENCES
            </p>
            <h2 className="text-4xl md:text-6xl font-display font-light text-architectural mb-6">
              Trusted by Buyers, Sellers, and
              <br className="hidden md:block" />
              <span className="italic"> Investors</span> Across Austin
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Real experiences from clients represented across Austin's most
              competitive luxury neighborhoods.
            </p>
          </div>

          {/* Testimonial Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="group relative bg-background rounded-xl p-10 md:p-12 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1"
                style={{
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
                <div className="mb-8">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(42 37% 57% / 0.12), hsl(42 37% 57% / 0.06))",
                    }}
                  >
                    <Quote className="w-5 h-5 text-gold" />
                  </div>
                </div>

                {/* Quote text */}
                <p className="text-foreground text-lg md:text-xl leading-[1.8] font-light italic mb-10 flex-1">
                  "{t.quote}"
                </p>

                {/* Attribution */}
                <div className="border-t border-border/60 pt-6">
                  <p className="font-display text-xl text-foreground tracking-tight">
                    {t.name}
                  </p>
                  <p className="text-minimal text-gold mt-2">{t.type}</p>
                  {t.context && (
                    <p className="text-sm text-muted-foreground mt-1.5 font-light">
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
