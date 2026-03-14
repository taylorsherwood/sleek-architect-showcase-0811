import { Link } from "react-router-dom";
import { Home, Search, Mountain } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const ctaCards = [
  {
    title: "Explore Austin Luxury Homes",
    href: "/buy",
    icon: Home,
  },
  {
    title: "Search All Listings",
    href: "/search",
    icon: Search,
  },
  {
    title: "Land & Investment Property",
    href: "/land",
    icon: Mountain,
  },
];

const HeroCTAStrip = () => {
  return (
    <section
      className="relative py-12 md:py-16"
      style={{
        background:
          "linear-gradient(180deg, hsl(233 50% 9%) 0%, hsl(233 50% 12%) 100%)",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {ctaCards.map((card, i) => (
            <ScrollReveal key={card.href} delay={i * 120}>
              <Link
                to={card.href}
                className="group flex flex-col items-center justify-center text-center px-6 py-8 md:py-10 rounded-2xl"
                style={{
                  background: "hsl(233 42% 14% / 0.3)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid hsl(42 37% 57% / 0.2)",
                  boxShadow:
                    "0 4px 20px hsl(0 0% 0% / 0.15), inset 0 1px 0 hsl(0 0% 100% / 0.04)",
                  transition:
                    "transform 250ms ease-in-out, box-shadow 250ms ease-in-out, border-color 250ms ease-in-out",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(-4px)";
                  el.style.borderColor = "hsl(42 37% 57% / 0.45)";
                  el.style.boxShadow =
                    "0 12px 36px hsl(42 37% 57% / 0.12), 0 0 48px hsl(42 37% 57% / 0.06), inset 0 1px 0 hsl(0 0% 100% / 0.06)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "hsl(42 37% 57% / 0.2)";
                  el.style.boxShadow =
                    "0 4px 20px hsl(0 0% 0% / 0.15), inset 0 1px 0 hsl(0 0% 100% / 0.04)";
                }}
              >
                <card.icon
                  className="w-6 h-6 mb-4 transition-colors duration-250"
                  style={{ color: "hsl(42 37% 57% / 0.7)" }}
                />
                <span
                  className="font-sans text-xs tracking-[0.14em] uppercase font-medium transition-colors duration-250"
                  style={{ color: "hsl(0 0% 100% / 0.85)" }}
                >
                  {card.title}
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCTAStrip;
