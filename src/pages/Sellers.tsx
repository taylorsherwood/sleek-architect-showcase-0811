import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Camera, BarChart3, Globe, Handshake, CheckCircle, ArrowRight } from "lucide-react";

import heroImg from "@/assets/hero-architecture.jpg";

const sellingSteps = [
  {
    icon: BarChart3,
    number: "01",
    title: "Strategic Pricing",
    description:
      "We perform a comprehensive market analysis using comparable sales, off-market data, and neighborhood trends to position your home for maximum return.",
  },
  {
    icon: Camera,
    number: "02",
    title: "Luxury Marketing",
    description:
      "Professional photography, cinematic video, drone aerials, 3-D tours, and custom property branding — all designed to captivate qualified buyers.",
  },
  {
    icon: Globe,
    number: "03",
    title: "Global Exposure",
    description:
      "Your property is syndicated to 500+ platforms, luxury portals, and our private network of high-net-worth buyers and relocation clients.",
  },
  {
    icon: Handshake,
    number: "04",
    title: "Negotiate & Close",
    description:
      "Expert negotiation, meticulous transaction management, and white-glove service from listing day through the closing table.",
  },
];

const marketingFeatures = [
  "Professional HDR photography & cinematic video",
  "Drone & aerial footage for estates and acreage",
  "3-D Matterport virtual tours",
  "Custom property website & branding",
  "Targeted social media & digital ad campaigns",
  "Private broker previews & luxury open houses",
  "Syndication to 500+ listing platforms worldwide",
  "Access to eXp Luxury & global referral network",
];

const stats = [
  { value: "98%", label: "List-to-Sale Price Ratio" },
  { value: "21", label: "Avg. Days on Market" },
  { value: "$200M+", label: "Career Sales Volume" },
];

const Sellers = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sell Your Austin Home | Echelon Property Group"
        description="Sell your Austin home for top dollar. Luxury marketing, strategic pricing, and expert negotiation from Taylor Sherwood and Echelon Property Group."
        canonical="https://www.echelonpropertygroup.com/sellers"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Luxury Austin property interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0C0F24]/60" />
        </div>
        <div className="relative container mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-minimal text-primary-foreground/60 mb-4 reveal">
              SELLER SERVICES
            </p>
            <h1 className="text-4xl md:text-6xl font-display font-light text-primary-foreground leading-[1.1] mb-6 reveal">
              Sell Your Austin
              <br />
              Home for More
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-lg mb-8 reveal-delayed">
              A proven luxury marketing strategy, expert pricing, and
              white-glove service designed to maximize your home's value.
            </p>
            <Link
              to="/contact"
              className="inline-block text-minimal bg-primary-foreground text-[#0C0F24] px-8 py-3.5 hover:bg-primary-foreground/90 transition-colors duration-300 reveal-delayed-2"
            >
              REQUEST A HOME VALUATION
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#0C0F24] py-14">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-display font-light text-primary-foreground mb-1">
                  {s.value}
                </p>
                <p className="text-minimal text-primary-foreground/50">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selling Process */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <p className="text-minimal text-gold mb-4 font-extrabold">
                THE PROCESS
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural">
                How Selling Works
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {sellingSteps.map((step) => (
                <div key={step.number} className="group">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-minimal text-muted-foreground">
                      {step.number}
                    </span>
                    <step.icon className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  </div>
                  <h3 className="text-xl font-display font-medium mb-3 group-hover:text-muted-foreground transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Strategy */}
      <section className="py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-minimal text-gold mb-4 font-extrabold">
                MARKETING STRATEGY
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-6">
                Your Home Deserves
                <br />
                More Than a Sign
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Every listing receives a bespoke marketing campaign built to
                attract qualified, motivated buyers — locally and globally.
              </p>
              <ul className="space-y-3">
                {marketingFeatures.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-gold mt-1 shrink-0" />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="/lovable-uploads/537facb0-1fbc-450c-8c4a-c1d06c4aa924.jpg"
                alt="Luxury Austin home exterior"
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Echelon */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-minimal text-gold mb-4 font-extrabold">
              THE ECHELON DIFFERENCE
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-6">
              Luxury Expertise, Measurable Results
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
              Our sellers consistently achieve above-market results because we
              combine institutional-level market knowledge with hands-on,
              client-first service. From staging to settlement, every detail is
              managed with precision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="text-minimal bg-[#0C0F24] text-primary-foreground px-8 py-3.5 hover:bg-[#0C0F24]/90 transition-colors duration-300"
              >
                REQUEST A VALUATION
              </Link>
              <Link
                to="/home-value-austin"
                className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2"
              >
                LEARN ABOUT HOME VALUES <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[#0C0F24] text-primary-foreground text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <p className="text-minimal text-primary-foreground/50 mb-4">
            READY TO SELL?
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-light leading-[1.15] mb-6">
            Let's Get Your Home Sold
          </h2>
          <p className="text-primary-foreground/60 mb-10 max-w-lg mx-auto">
            Schedule a complimentary listing consultation to discuss pricing
            strategy, marketing, and timeline for your Austin home.
          </p>
          <Link
            to="/contact"
            className="inline-block text-minimal border border-primary-foreground/30 text-primary-foreground px-10 py-3.5 hover:bg-primary-foreground hover:text-[#0C0F24] transition-colors duration-300"
          >
            SCHEDULE A CONSULTATION
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sellers;
