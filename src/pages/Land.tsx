import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";

const Footer = lazy(() => import("@/components/Footer"));

const features = [
  {
    title: "Acreage & Ranch Land",
    description:
      "Hill Country estates, ranches, and large-lot parcels across Austin's most scenic corridors.",
  },
  {
    title: "Development Parcels",
    description:
      "Entitled and raw land suited for residential or mixed-use projects in high-growth areas.",
  },
  {
    title: "Investment Property",
    description:
      "Multi-family, short-term rental, and commercial investment opportunities with strong returns.",
  },
];

const LandPage = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Land & Investment Property Austin TX | Echelon Property Group"
        description="Explore land for sale and investment property in Austin TX. Acreage, ranch land, development parcels, and income-producing real estate."
      />
      <Navigation />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-28"
        style={{
          background:
            "linear-gradient(180deg, hsl(233 50% 9%) 0%, hsl(233 50% 14%) 100%)",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal>
            <p
              className="text-minimal mb-6"
              style={{ color: "hsl(42 37% 67%)" }}
            >
              AUSTIN LAND &amp; INVESTMENT
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-light text-architectural mb-6 text-warm-cream">
              Land &amp; Investment{" "}
              <span className="italic">Property</span>
            </h1>
            <p className="text-lg md:text-xl text-warm-cream/70 max-w-2xl mx-auto font-light">
              From Hill Country acreage to income-producing assets — strategic
              real estate opportunities across greater Austin.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 120}>
                <div className="p-8 rounded-lg border border-border bg-card">
                  <h2 className="text-xl font-display mb-3 text-foreground">
                    {f.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {f.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={200}>
            <div className="text-center mt-16">
              <Link
                to="/contact"
                className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-gold hover:text-primary-foreground px-10 py-4 transition-colors duration-300"
              >
                DISCUSS YOUR NEXT INVESTMENT
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[100px]" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default LandPage;
