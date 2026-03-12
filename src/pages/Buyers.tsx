import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Home, Search, FileText, DollarSign, Shield, CheckCircle, ArrowRight } from "lucide-react";

import listing1 from "@/assets/listing-1.jpg";
import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";
import heroImg from "@/assets/hero-luxury-austin.jpg";

const buyingSteps = [
  {
    icon: Search,
    number: "01",
    title: "Define Your Vision",
    description:
      "We begin with a detailed consultation to understand your lifestyle, priorities, and ideal neighborhoods across Austin.",
  },
  {
    icon: Shield,
    number: "02",
    title: "Pre-Approval & Strategy",
    description:
      "Get connected with top lenders and develop a competitive offer strategy tailored to Austin's luxury market.",
  },
  {
    icon: Home,
    number: "03",
    title: "Curated Property Search",
    description:
      "Receive hand-selected on- and off-market properties aligned with your criteria — not generic listing alerts.",
  },
  {
    icon: FileText,
    number: "04",
    title: "Negotiate & Close",
    description:
      "Leverage expert negotiation, thorough inspections, and seamless coordination through closing day.",
  },
];

const whyTaylor = [
  "CLHMS & Luxury Home Marketing Specialist",
  "Deep expertise in Austin's premier neighborhoods",
  "Exclusive access to off-market & private listings",
  "Investment-minded guidance for long-term value",
  "Concierge-level service from first tour to closing",
  "Relocation support for out-of-state buyers",
];

const featuredListings = [
  {
    image: "/lovable-uploads/0fc79a0b-1fde-439f-bb08-6062e50770b7.jpg",
    address: "2300 Barton Creek Boulevard #15",
    location: "Barton Creek, Austin",
    price: "$3,750,000",
    beds: 4,
    baths: 4,
    sqft: "4,147",
  },
  {
    image: listing2,
    address: "1203 Westlake Ridge",
    location: "Westlake Hills, Austin",
    price: "$7M+ Luxury Home",
    beds: 6,
    baths: 7,
    sqft: "8,400",
  },
  {
    image: listing3,
    address: "Ranch Estate on 42 Acres",
    location: "Texas Hill Country",
    price: "$5M+ Hill Country Estate",
    beds: 4,
    baths: 5,
    sqft: "5,800",
  },
];

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(1500000);
  const [downPayment, setDownPayment] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const loanAmount = homePrice * (1 - downPayment / 100);
  const monthlyRate = rate / 100 / 12;
  const numPayments = term * 12;
  const monthly =
    monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;

  return (
    <div className="bg-card border border-border p-8 md:p-10">
      <h3 className="text-2xl font-display font-light text-architectural mb-8">
        Mortgage Estimator
      </h3>
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="text-minimal text-muted-foreground mb-2 block">
            HOME PRICE
          </label>
          <input
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
          />
        </div>
        <div>
          <label className="text-minimal text-muted-foreground mb-2 block">
            DOWN PAYMENT (%)
          </label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
          />
        </div>
        <div>
          <label className="text-minimal text-muted-foreground mb-2 block">
            INTEREST RATE (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
          />
        </div>
        <div>
          <label className="text-minimal text-muted-foreground mb-2 block">
            LOAN TERM (YEARS)
          </label>
          <input
            type="number"
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
          />
        </div>
      </div>
      <div className="border-t border-border pt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-minimal text-muted-foreground mb-1">
            ESTIMATED MONTHLY PAYMENT
          </p>
          <p className="text-4xl font-display font-light text-foreground">
            ${Math.round(monthly).toLocaleString()}
          </p>
        </div>
        <p className="text-xs text-muted-foreground max-w-xs">
          Estimate only. Does not include taxes, insurance, or HOA. Contact us for a
          personalized analysis.
        </p>
      </div>
    </div>
  );
};

const Buyers = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Buy a Home in Austin | Echelon Property Group"
        description="Expert buyer representation for Austin luxury real estate. Access exclusive listings, investment guidance, and concierge-level service with Taylor Sherwood."
        canonical="https://www.echelonpropertygroup.com/buyers"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Austin luxury home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0C0F24]/60" />
        </div>
        <div className="relative container mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-minimal text-primary-foreground/60 mb-4 reveal">
              BUYER SERVICES
            </p>
            <h1 className="text-4xl md:text-6xl font-display font-light text-primary-foreground leading-[1.1] mb-6 reveal">
              Find Your Austin
              <br />
              Dream Home
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-lg mb-8 reveal-delayed">
              From first-time buyers to seasoned investors, we deliver an
              elevated, results-driven experience across Austin's most coveted
              neighborhoods.
            </p>
            <Link
              to="/contact"
              className="inline-block text-minimal bg-primary-foreground text-[#0C0F24] px-8 py-3.5 hover:bg-primary-foreground/90 transition-colors duration-300 reveal-delayed-2"
            >
              SCHEDULE A BUYER CONSULTATION
            </Link>
          </div>
        </div>
      </section>

      {/* Buying Process */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <p className="text-minimal text-gold mb-4 font-extrabold">
                THE PROCESS
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural">
                How Buying Works
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {buyingSteps.map((step) => (
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

      {/* Why Taylor */}
      <section className="py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-minimal text-gold mb-4 font-extrabold">
                YOUR ADVANTAGE
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-6">
                Why Buyers Choose Taylor Sherwood
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                With deep roots in Austin's luxury market and a background in
                investment strategy, Taylor delivers insights and access that
                typical agents simply can't match.
              </p>
              <ul className="space-y-4">
                {whyTaylor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-gold mt-1 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="/lovable-uploads/taylor-headshot-widget.jpg"
                alt="Taylor Sherwood — Austin luxury Realtor"
                className="w-full aspect-[3/4] object-cover object-top"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
              <div>
                <p className="text-minimal text-gold mb-4 font-extrabold">
                  FEATURED LISTINGS
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-light text-architectural">
                  Explore Austin Properties
                </h2>
              </div>
              <Link
                to="/listings"
                className="mt-6 md:mt-0 text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2"
              >
                VIEW ALL LISTINGS <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredListings.map((listing, i) => (
                <div key={i} className="group">
                  <div className="relative overflow-hidden mb-6">
                    <img
                      src={listing.image}
                      alt={listing.address}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-2">
                      <span className="text-minimal text-foreground font-semibold">
                        {listing.price}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-display font-medium mb-1">
                    {listing.address}
                  </h3>
                  <p className="text-minimal text-muted-foreground mb-4">
                    {listing.location}
                  </p>
                  <div className="flex gap-6 text-sm text-muted-foreground border-t border-border pt-4">
                    <span>{listing.beds} Beds</span>
                    <span>{listing.baths} Baths</span>
                    <span>{listing.sqft} Sq Ft</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mortgage Calculator */}
      <section className="py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <p className="text-minimal text-gold mb-4 font-extrabold">
                PLAN AHEAD
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural">
                Estimate Your Payment
              </h2>
            </div>
            <MortgageCalculator />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[#0C0F24] text-primary-foreground text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <p className="text-minimal text-primary-foreground/50 mb-4">
            READY TO BEGIN?
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-light leading-[1.15] mb-6">
            Let's Find Your Next Home
          </h2>
          <p className="text-primary-foreground/60 mb-10 max-w-lg mx-auto">
            Schedule a private consultation to discuss your goals, explore
            neighborhoods, and develop a customized search strategy.
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

export default Buyers;
