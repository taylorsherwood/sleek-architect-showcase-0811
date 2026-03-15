import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  CheckCircle,
  ArrowRight,
  MapPin,
  MessageSquare,
  Search,
  FileText,
  Shield,
  Home } from
"lucide-react";

import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";
import heroImg from "@/assets/hero-luxury-austin.jpg";
import bartonCreekImg from "@/assets/community-barton-creek.jpg";
import westlakeImg from "@/assets/community-westlake-hills.avif";
import lakeAustinImg from "@/assets/community-lake-austin.jpg";
import downtownImg from "@/assets/community-downtown.jpg";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const buyingSteps = [
{
  icon: MessageSquare,
  number: "01",
  title: "Consultation & Strategy",
  description:
  "We start with a one-on-one consultation to understand your goals, timeline, budget, and lifestyle priorities. From there we build a tailored strategy — whether you're buying a luxury home in Austin, an investment property, or relocating from out of state."
},
{
  icon: Search,
  number: "02",
  title: "Property Search & Private Showings",
  description:
  "Leveraging MLS access, off-market networks, and our private database, we curate a shortlist of properties aligned with your criteria. You'll receive private showings — not generic listing alerts — in neighborhoods like Barton Creek, Westlake, and Lake Travis."
},
{
  icon: Shield,
  number: "03",
  title: "Offer & Negotiation",
  description:
  "When you find the right property, we craft a competitive offer backed by real-time market data and local pricing insight. Our negotiation experience ensures you secure the best possible terms, price, and contingencies."
},
{
  icon: FileText,
  number: "04",
  title: "Due Diligence & Inspections",
  description:
  "We coordinate inspections, appraisals, title review, and survey — managing every detail so nothing is missed. Our trusted network of inspectors and contractors provides thorough assessments to protect your investment."
},
{
  icon: Home,
  number: "05",
  title: "Closing & Ownership",
  description:
  "From final walk-through to settlement, we guide you through every step of closing. Once the keys are in your hands, we remain a resource for contractor referrals, property management, and future investment opportunities."
}];


const whyTaylor = [
{
  title: "Local Market Expertise",
  description:
  "Taylor Sherwood has deep roots in Austin's luxury real estate market. As a Certified Luxury Home Marketing Specialist (CLHMS), he brings institutional-level knowledge of pricing trends, neighborhood dynamics, and off-market opportunities that most Austin luxury real estate agents simply don't have."
},
{
  title: "Negotiation Experience",
  description:
  "With a background in investment strategy and hundreds of transactions closed, Taylor delivers disciplined, data-driven negotiation that protects your interests and maximizes value — whether you're buying Austin luxury homes for sale or competing in Barton Creek's most sought-after enclaves."
},
{
  title: "Off-Market Access",
  description:
  "Many of Austin's finest properties never hit the public market. Through our private network, brokerage relationships, and eXp Luxury division, we surface exclusive off-market opportunities in Westlake, Rollingwood, Barton Creek, Lake Austin, and beyond."
},
{
  title: "Concierge-Level Service",
  description:
  "From lender introductions and relocation support to contractor referrals and post-closing guidance, we deliver a white-glove experience that extends well beyond closing day."
}];


const featuredListings = [
{
  image: "/lovable-uploads/0fc79a0b-1fde-439f-bb08-6062e50770b7.jpg",
  address: "2300 Barton Creek Boulevard #15",
  location: "Barton Creek, Austin",
  price: "$3,750,000",
  beds: 4,
  baths: 4,
  sqft: "4,147",
  link: "https://www.villagovernorshill.com",
  badge: "Private Listing"
},
{
  image: listing2,
  address: "1203 Westlake Ridge",
  location: "Westlake Hills, Austin",
  price: "$7M+ Luxury Home",
  beds: 6,
  baths: 7,
  sqft: "8,400",
  link: "",
  badge: "Private Market Opportunity"
},
{
  image: listing3,
  address: "Ranch Estate on 42 Acres",
  location: "Texas Hill Country",
  price: "$5M+ Hill Country Estate",
  beds: 4,
  baths: 5,
  sqft: "5,800",
  link: "",
  badge: "Private Market Opportunity"
}];


const neighborhoods = [
{
  name: "Barton Creek",
  slug: "barton-creek",
  image: bartonCreekImg,
  description:
  "Gated luxury living with world-class golf, resort amenities, and homes ranging from $1M to $10M+. One of Austin's most prestigious addresses for families and executives."
},
{
  name: "Westlake Hills",
  slug: "westlake-hills",
  image: westlakeImg,
  description:
  "Renowned for Eanes ISD schools, Hill Country views, and refined estates. Westlake consistently ranks among the best luxury neighborhoods in Austin."
},
{
  name: "Lake Austin & Lake Travis",
  slug: "lake-austin-waterfront",
  image: lakeAustinImg,
  description:
  "Waterfront estates on Lake Austin and Lake Travis offer private docks, panoramic water views, and a resort lifestyle minutes from downtown."
},
{
  name: "Central Austin & Downtown",
  slug: "downtown-austin",
  image: downtownImg,
  description:
  "From luxury high-rises to historic bungalows, Central Austin delivers walkability, culture, and some of the city's most dynamic neighborhoods."
}];


/* ------------------------------------------------------------------ */
/*  FORM SCHEMA                                                        */
/* ------------------------------------------------------------------ */

const buyerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().max(2000).optional()
});

/* ------------------------------------------------------------------ */
/*  MORTGAGE CALCULATOR                                                */
/* ------------------------------------------------------------------ */

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(1500000);
  const [downPayment, setDownPayment] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const loanAmount = homePrice * (1 - downPayment / 100);
  const monthlyRate = rate / 100 / 12;
  const numPayments = term * 12;
  const monthly =
  monthlyRate > 0 ?
  loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (
  Math.pow(1 + monthlyRate, numPayments) - 1) :
  loanAmount / numPayments;

  const inputClass =
  "w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors duration-200";

  return (
    <div className="bg-card border border-border p-8 md:p-10">
      <h3 className="text-2xl font-display font-light text-architectural mb-2">
        Mortgage Estimator
      </h3>
      <p className="text-muted-foreground text-sm mb-8">
        Get a quick estimate of your monthly payment for Austin luxury homes for sale. Adjust values to match your situation.
      </p>
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="text-minimal text-muted-foreground mb-2 block">HOME PRICE</label>
          <input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className="text-minimal text-muted-foreground mb-2 block">DOWN PAYMENT (%)</label>
          <input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className="text-minimal text-muted-foreground mb-2 block">INTEREST RATE (%)</label>
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className="text-minimal text-muted-foreground mb-2 block">LOAN TERM (YEARS)</label>
          <input type="number" value={term} onChange={(e) => setTerm(Number(e.target.value))} className={inputClass} />
        </div>
      </div>
      <div className="border-t border-border pt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-minimal text-muted-foreground mb-1">ESTIMATED MONTHLY PAYMENT</p>
          <p className="text-4xl font-display font-light text-foreground">
            ${Math.round(monthly).toLocaleString()}
          </p>
        </div>
        <p className="text-xs text-muted-foreground max-w-xs">
          Estimate only. Does not include property taxes, insurance, or HOA fees. Contact us for a personalized analysis.
        </p>
      </div>
    </div>);

};

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */

const Buy = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = buyerSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "81cc426e-b1a8-4e5e-b2a0-0d25738dfe12",
          subject: "Buyer Consultation Request",
          from_name: "Echelon Property Group Website",
          to: "taylor@echelonpropertygroup.com,echelonpropertygroup@followupboss.me",
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          "Interest": "Buying a Home",
          "Message": form.message || "Buyer consultation request from Buy page."
        })
      });
      const data = await response.json();
      if (data.success) {
        toast({ title: "Request Sent", description: "Thank you — we'll be in touch shortly to schedule your consultation." });
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        toast({ title: "Submission Failed", description: "Something went wrong. Please try again or call us directly.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Submission Failed", description: "Something went wrong. Please try again or call us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
  "w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-foreground placeholder:text-muted-foreground/50 transition-colors duration-300";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Buy Real Estate in Austin | Echelon Property Group"
        description="Expert buyer representation for Austin luxury homes. Off-market access, concierge service, and strategic guidance from Taylor Sherwood — top Austin luxury real estate agent."
        canonical="https://www.echelonpropertygroup.com/buy" />
      
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative h-[70vh] min-h-[540px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Luxury home in Austin Texas" title="Austin luxury real estate — buyer services" className="w-full h-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-[#0C0F24]/60" />
        </div>
        <div className="relative container mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-minimal text-primary-foreground/60 mb-4 reveal">BUYER SERVICES</p>
            <h1 className="text-4xl md:text-6xl font-display font-light text-primary-foreground leading-[1.1] mb-6 reveal">
              Buying Real Estate in
              <br />
              Austin
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-lg mb-8 reveal-delayed">
              Expert representation for luxury homes, investment properties, and off-market opportunities across Austin's most coveted neighborhoods.
            </p>
            <a
              href="#buyer-consultation"
              className="inline-block text-minimal bg-primary-foreground text-[#0C0F24] px-8 py-3.5 hover:bg-primary-foreground/90 transition-colors duration-300 reveal-delayed-2">
              
              SCHEDULE A BUYER CONSULTATION
            </a>
          </div>
        </div>
      </section>

      {/* ── Why Work With Taylor ── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 max-w-2xl">
              <p className="text-minimal text-gold mb-4 font-extrabold">YOUR ADVANTAGE</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-6">
                Why Work With Taylor Sherwood
              </h2>
              <p className="text-muted-foreground leading-relaxed">Choosing the right Austin real estate advisor is the single most important decision you'll make in your home search. Here's what sets Taylor apart:

              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
              {whyTaylor.map((item, i) =>
              <div key={i} className="group">
                  <div className="flex items-start gap-4 mb-3">
                    <CheckCircle className="w-5 h-5 text-gold mt-1 shrink-0" />
                    <h3 className="text-xl font-display font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {item.title === "Off-Market Access" ? (
                        <Link to="/off-market-luxury-homes-austin" className="hover:underline">
                          {item.title}
                        </Link>
                      ) : (
                        item.title
                      )}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm pl-9">
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mortgage Calculator ── */}
      <section className="py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <p className="text-minimal text-gold mb-4 font-extrabold">PLAN AHEAD</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural">
                Estimate Your Monthly Payment
              </h2>
            </div>
            <MortgageCalculator />
          </div>
        </div>
      </section>

      {/* ── The Buying Process ── */}
      <section className="py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <p className="text-minimal text-gold mb-4 font-extrabold">THE PROCESS</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural">
                How Buying a Home in Austin Works
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {buyingSteps.map((step) =>
              <div key={step.number} className="group">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-minimal text-muted-foreground">{step.number}</span>
                    <step.icon className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  </div>
                  <h3 className="text-xl font-display font-medium mb-3 group-hover:text-muted-foreground transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Listings ── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
              <div>
                <p className="text-minimal text-gold mb-4 font-extrabold">FEATURED LISTINGS</p>
                <h2 className="text-4xl md:text-5xl font-display font-light text-architectural">
                  Austin Luxury Homes for Sale
                </h2>
                <p className="text-muted-foreground mt-4 max-w-xl">
                  Explore a curated selection of luxury properties and private market opportunities across Austin and the Hill Country.
                </p>
              </div>
              <Link
                to="/listings"
                className="mt-6 md:mt-0 text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 shrink-0">
                
                VIEW ALL LISTINGS <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredListings.map((listing, i) => {
                const isExternal = listing.link.startsWith("http");
                const Wrapper = isExternal ? "a" : "div";
                const wrapperProps = isExternal ?
                { href: listing.link, target: "_blank" as const, rel: "noopener noreferrer" } :
                {};
                return (
                  <Wrapper key={i} {...wrapperProps} className="group block">
                    <div className="relative overflow-hidden mb-6">
                      <img
                        src={listing.image}
                        alt={listing.address}
                        title={`${listing.address} — ${listing.price}`}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy" />
                      
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-2">
                        <span className="text-minimal text-foreground font-semibold">{listing.price}</span>
                      </div>
                      {listing.badge &&
                      <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1.5">
                          <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-medium">{listing.badge}</span>
                        </div>
                      }
                    </div>
                    <h3 className="text-lg font-display font-medium mb-1 group-hover:text-muted-foreground transition-colors duration-300">
                      {listing.address}
                    </h3>
                    <p className="text-minimal text-muted-foreground mb-4">{listing.location}</p>
                    <div className="flex gap-6 text-sm text-muted-foreground border-t border-border pt-4">
                      <span>{listing.beds} Beds</span>
                      <span>{listing.baths} Baths</span>
                      <span>{listing.sqft} Sq Ft</span>
                    </div>
                  </Wrapper>);

              })}
            </div>
            <div className="mt-12 text-center">
              <Link
                to="/off-market-luxury-homes-austin"
                className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                
                Looking for private market opportunities?{" "}
                <span className="underline">Ask about off-market homes</span> →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Neighborhood Highlights ── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
              <div>
                <p className="text-minimal text-gold mb-4 font-extrabold">NEIGHBORHOODS</p>
                <h2 className="text-4xl md:text-5xl font-display font-light text-architectural">
                  Austin Neighborhood Highlights
                </h2>
                <p className="text-muted-foreground mt-4 max-w-xl">
                  Austin offers an extraordinary range of luxury lifestyles — from gated golf communities and waterfront estates to walkable urban enclaves. Here are some of the most sought-after areas for buyers.
                </p>
              </div>
              <Link
                to="/communities"
                className="mt-6 md:mt-0 text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 shrink-0">
                
                EXPLORE ALL COMMUNITIES <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {neighborhoods.map((n) =>
              <Link key={n.slug} to={`/communities/${n.slug}`} className="group block">
                  <div className="relative overflow-hidden mb-5">
                    <img
                    src={n.image}
                    alt={`${n.name} homes for sale in Austin`}
                    title={`${n.name} — luxury homes for sale in Austin TX`}
                    className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy" />
                  
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-4 py-2">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      <span className="text-minimal text-foreground font-semibold">{n.name}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {n.description}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA / Contact Form ── */}
      <section id="buyer-consultation" className="py-28 bg-[#0C0F24]">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-minimal text-primary-foreground/50 mb-4">READY TO BEGIN?</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-primary-foreground leading-[1.15] mb-6">
                Schedule a Buyer Consultation
              </h2>
              <p className="text-primary-foreground/60 leading-relaxed mb-10 max-w-lg">Whether you're searching for luxury homes, relocating to Austin, or exploring investment opportunities, a consultation with Taylor is the best first step. We'll discuss your goals, timeline, and build a customized search strategy.

              </p>
              <div className="space-y-6">
                <div>
                  <h4 className="text-minimal text-primary-foreground/40 mb-1">EMAIL</h4>
                  <a href="mailto:taylor@echelonpropertygroup.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    taylor@echelonpropertygroup.com
                  </a>
                </div>
                <div>
                  <h4 className="text-minimal text-primary-foreground/40 mb-1">PHONE</h4>
                  <a href="tel:+15126613843" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    (512) 661-3843
                  </a>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  maxLength={100}
                  className={`${inputClass} border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/50`} />
                
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  maxLength={255}
                  className={`${inputClass} border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/50`} />
                
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (Optional)"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={20}
                  className={`${inputClass} border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/50`} />
                
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Tell us about your home search goals..."
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  maxLength={2000}
                  className={`${inputClass} resize-none border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-primary-foreground/50`} />
                
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="text-minimal bg-primary-foreground text-[#0C0F24] hover:bg-primary-foreground/90 px-10 py-4 transition-colors duration-300 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                
                {submitting ? "SENDING..." : "REQUEST CONSULTATION"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

};

export default Buy;