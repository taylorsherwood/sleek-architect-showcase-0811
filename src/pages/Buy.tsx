import { useState, lazy, Suspense } from "react";
import FeaturedCommunities from "@/components/FeaturedCommunities";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
const Footer = lazy(() => import("@/components/Footer"));
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { formatPhoneNumber, getTimestamp } from "@/lib/formUtils";
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
import listing3 from "@/assets/listing-3.webp";
import heroImg from "@/assets/hero-luxury-austin.jpg";
import bartonCreekImg from "@/assets/community-barton-creek.jpg";
import westlakeImg from "@/assets/community-westlake-hills.webp";
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
  "With a background in investment strategy and hundreds of transactions closed, Taylor delivers disciplined, data-driven negotiation that protects your interests and maximizes value, whether you're buying Austin luxury homes for sale or positioning an investment disposition."
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
  image: "/lovable-uploads/0fc79a0b-1fde-439f-bb08-6062e50770b7.webp",
  address: "2300 Barton Creek Boulevard #15",
  location: "Barton Creek, Austin",
  price: "$3,495,000",
  beds: 4,
  baths: 4,
  sqft: "4,147",
  link: "https://www.bartoncreekvilla.com",
  badge: "LUXURY LISTING"
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
  slug: "lake-austin",
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
  phone: z.string().trim().min(1, "Phone is required").max(20),
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
  "w-full bg-card border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors duration-200";

  return (
    <div className="bg-card border border-border p-8 md:p-10">
      <h3 className="text-2xl font-display font-normal text-architectural mb-2">
        Mortgage Estimator
      </h3>
      <p className="text-muted-foreground text-sm mb-8">
        Get a quick estimate of your monthly payment for Austin luxury homes for sale. Adjust values to match your situation.
      </p>
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="text-minimal text-muted-foreground mb-2 block">HOME PRICE</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <input type="text" inputMode="numeric" value={homePrice.toLocaleString()} onChange={(e) => setHomePrice(Number(e.target.value.replace(/[^0-9]/g, '')) || 0)} className={`${inputClass} pl-8`} />
          </div>
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
          <p className="text-4xl font-display font-normal text-foreground">
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
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "phone" ? formatPhoneNumber(value) : value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
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
      const response = await fetch("https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          message: form.message || "Buyer consultation request from Buy page.",
          interest: "Buying a Home",
          source: "Buy Page",
          page_url: typeof window !== "undefined" ? window.location.href : "",
          submitted_at: getTimestamp(),
        }),
      });
      if (response.ok) {
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
        title="Buy a Home in Austin TX | Echelon Property Group"
        description="Expert buyer representation for Austin luxury homes and investment properties. Off-market access, private showings, and strategic guidance."
        canonical="https://www.echelonpropertygroup.com/buy" />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "Buy", url: "https://www.echelonpropertygroup.com/buy" }
      ])} />
      <SchemaMarkup schema={createFAQSchema([
        { question: "What is it like buying a home in Austin Texas?", answer: "Austin offers a dynamic real estate market with diverse neighborhoods ranging from waterfront estates on Lake Austin to walkable urban homes in Tarrytown. Buyers benefit from no state income tax, a thriving tech economy, and exceptional lifestyle amenities." },
        { question: "What is the average home price in Austin?", answer: "Austin's median home price varies by neighborhood. Entry-level luxury begins around $1 million, with premium neighborhoods like Westlake Hills, Barton Creek, and Lake Austin ranging from $1.5M to $25M+." },
        { question: "Are there luxury homes available in Austin?", answer: "Yes. Austin features some of Texas's finest luxury properties including Hill Country estates, waterfront mansions, contemporary masterpieces, and gated community homes across Westlake Hills, Barton Creek, Lake Austin, and Spanish Oaks." },
        { question: "Is Austin a good place to invest in real estate?", answer: "Austin consistently ranks among the top U.S. metros for real estate investment, driven by tech-sector growth, population in-migration, no state income tax, and limited premium inventory in supply-constrained neighborhoods." },
        { question: "How do I find off-market homes for sale in Austin?", answer: "Working with an experienced luxury agent is essential. Echelon Property Group maintains access to private and whisper listings across Austin's most prestigious neighborhoods through our brokerage network and direct relationships." },
        { question: "What are the best neighborhoods to buy a luxury home in Austin?", answer: "Westlake Hills, Barton Creek, and Lake Austin are Austin's top luxury neighborhoods. Westlake offers top-rated Eanes ISD schools, Barton Creek provides gated country club living, and Lake Austin delivers waterfront estates with private docks." },
      ])} />
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative min-h-[640px] md:min-h-[720px] lg:h-[820px] xl:h-[860px] 2xl:h-[880px] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Luxury home in Austin Texas" title="Austin luxury real estate — buyer services" className="w-full h-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-[#0C0F24]/60" />
        </div>
        <div className="relative container mx-auto px-6 pt-24 md:pt-32 lg:pt-36">
          <div className="max-w-xl">
            <p className="text-minimal text-gold mb-4 reveal">BUYER SERVICES</p>
            <h1 className="text-3xl sm:text-2xl sm:text-4xl md:text-6xl font-display font-normal text-primary-foreground leading-[1.1] mb-6 reveal">
              Buying Real Estate in
              <br />
              Austin
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-lg mb-8 reveal-delayed">
              Expert representation for luxury homes, investment properties, and off-market opportunities across Austin's most coveted neighborhoods.
            </p>
            <a
              href="#buyer-consultation"
              className="inline-block text-minimal px-8 py-3.5 transition-all duration-300 reveal-delayed-2"
              style={{
                border: "1px solid hsl(var(--gold))",
                color: "hsl(var(--gold))",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "hsl(var(--gold))";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "hsl(var(--gold))";
              }}>SCHEDULE A BUYER CONSULTATION
            </a>
          </div>
        </div>
      </section>

      {/* ── What You Need to Know ── */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-6 sm:mb-8">
              What You Need to Know About Buying in Austin
            </h2>
            <ul className="space-y-4 text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-3"><span className="text-gold mt-1.5 shrink-0">•</span><span>Austin's luxury market starts at approximately $1 million, with premium neighborhoods like Westlake Hills, Barton Creek, and Lake Austin ranging from $1.5M to $25M+.</span></li>
              <li className="flex items-start gap-3"><span className="text-gold mt-1.5 shrink-0">•</span><span>Texas has no state income tax, which represents significant annual savings for buyers relocating from California, New York, or Illinois.</span></li>
              <li className="flex items-start gap-3"><span className="text-gold mt-1.5 shrink-0">•</span><span>Many of Austin's finest homes trade off-market through private broker networks. Working with an agent who has access to these channels is essential.</span></li>
              <li className="flex items-start gap-3"><span className="text-gold mt-1.5 shrink-0">•</span><span>Eanes ISD — serving Westlake Hills, Barton Creek, and Rollingwood — is consistently ranked among the top school districts in Texas.</span></li>
              <li className="flex items-start gap-3"><span className="text-gold mt-1.5 shrink-0">•</span><span>Austin's tech economy (Apple, Tesla, Google, Meta, Oracle) drives sustained luxury housing demand and long-term appreciation.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Why Work With Taylor ── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 max-w-2xl">
              <p className="text-minimal text-gold mb-4 font-extrabold">YOUR ADVANTAGE</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Why Work With echelon
              </h2>
              <p className="text-muted-foreground leading-relaxed">Choosing the right Austin real estate advisor is the single most important decision you'll make in your home search. Here's what sets us apart:

              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
              {whyTaylor.map((item, i) =>
              <div key={i} className="group">
                  <div className="flex items-start gap-4 mb-3">
                    <CheckCircle className="w-5 h-5 text-gold mt-1 shrink-0" />
                    <h3 className="text-xl font-display font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {item.title === "Off-Market Access" ? (
                        <Link to="/off-market-real-estate-austin" className="hover:underline">
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
      <section className="py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <p className="text-minimal text-gold mb-4 font-extrabold">PLAN AHEAD</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural">
                Estimate Your Monthly Payment
              </h2>
            </div>
            <MortgageCalculator />
          </div>
        </div>
      </section>

      {/* ── The Buying Process ── */}
      <section className="pt-20 pb-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <p className="text-minimal text-gold mb-4 font-extrabold">THE PROCESS</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural">
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
      <section className="pt-12 pb-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
              <div>
                <p className="text-minimal text-gold mb-4 font-extrabold">FEATURED LISTINGS</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural">
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
                        loading="lazy" decoding="async" />
                      
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
                to="/off-market-real-estate-austin"
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural">
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
                    loading="lazy" decoding="async" />
                  
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
      <section id="buyer-consultation" className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Austin luxury real estate consultation" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-[#0C0F24]/45" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-minimal text-gold mb-4 font-extrabold">READY TO BEGIN?</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-primary-foreground leading-[1.15] mb-6">
                Schedule a Buyer Consultation
              </h2>
              <p className="text-primary-foreground/70 leading-relaxed mb-10 max-w-lg">Whether you're searching for luxury homes, relocating to Austin, or exploring investment opportunities, a consultation with Taylor is the best first step. We'll discuss your goals, timeline, and build a customized search strategy.
              </p>
              <div className="space-y-6">
                <div>
                  <h4 className="text-minimal text-primary-foreground/50 mb-1">EMAIL</h4>
                  <a href="mailto:info@echelonpropertygroup.com" className="text-primary-foreground/80 hover:text-gold transition-colors duration-300">
                    Send an Email
                  </a>
                </div>
                <div>
                  <h4 className="text-minimal text-primary-foreground/50 mb-1">PHONE</h4>
                  <a href="tel:+15126613843" className="text-primary-foreground/80 hover:text-gold transition-colors duration-300">
                    (512) 661-3843
                  </a>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-8" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  maxLength={100}
                  className="w-full bg-transparent border-b border-primary-foreground/20 focus:border-primary-foreground/50 outline-none py-3 text-primary-foreground placeholder:text-primary-foreground/30 transition-colors duration-300" />
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
                  className="w-full bg-transparent border-b border-primary-foreground/20 focus:border-primary-foreground/50 outline-none py-3 text-primary-foreground placeholder:text-primary-foreground/30 transition-colors duration-300" />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={20}
                  className="w-full bg-transparent border-b border-primary-foreground/20 focus:border-primary-foreground/50 outline-none py-3 text-primary-foreground placeholder:text-primary-foreground/30 transition-colors duration-300" />
                {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Tell us about your home search goals..."
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  maxLength={2000}
                  className="w-full bg-transparent border-b border-primary-foreground/20 focus:border-primary-foreground/50 outline-none py-3 text-primary-foreground placeholder:text-primary-foreground/30 transition-colors duration-300 resize-none" />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="text-minimal px-10 py-4 transition-all duration-300 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  border: "1px solid hsl(var(--gold))",
                  color: "hsl(var(--gold))",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "hsl(var(--gold))";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "hsl(var(--gold))";
                }}>
                {submitting ? "SENDING..." : "REQUEST CONSULTATION"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Expert Insight ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-minimal text-gold mb-4 font-extrabold">EXPERT INSIGHT</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
              Is Now a Good Time to Buy in Austin?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Based on current Austin market data, buyers in supply-constrained neighborhoods like <Link to="/communities/westlake-hills" className="text-foreground underline hover:text-muted-foreground">Westlake Hills</Link>, <Link to="/communities/barton-creek" className="text-foreground underline hover:text-muted-foreground">Barton Creek</Link>, and <Link to="/communities/lake-austin" className="text-foreground underline hover:text-muted-foreground">Lake Austin</Link> are seeing a stabilized pricing environment after the post-2022 correction. Interest rate adjustments have improved purchasing power compared to 2023–2024, and inventory in premium locations remains limited.
              </p>
              <p>
                For buyers with a 5+ year horizon, the strongest opportunity exists in acquiring quality properties in premium locations before the next appreciation cycle. Austin's tech-driven economy, no state income tax, and sustained in-migration from coastal states provide a durable demand foundation that supports long-term value. Learn more in our <Link to="/blog/austin-luxury-market-trends" className="text-foreground underline hover:text-muted-foreground">Austin luxury market trends analysis</Link>.
              </p>
              <p>
                From recent transactions in the area, we're seeing particularly strong buyer activity in the $2M–$5M range across Westlake Hills and Barton Creek. <Link to="/off-market-real-estate-austin" className="text-foreground underline hover:text-muted-foreground">Off-market sourcing</Link> has become increasingly important — many of the best properties never reach the public MLS. For those <Link to="/moving-to-austin-texas" className="text-foreground underline hover:text-muted-foreground">relocating to Austin</Link>, understanding neighborhood dynamics is essential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
              Frequently Asked Questions About Buying in Austin
            </h2>
            <div className="space-y-6">
              {[
                { q: "What is it like buying a home in Austin Texas?", a: "Austin offers a dynamic real estate market with diverse neighborhoods ranging from waterfront estates on Lake Austin to walkable urban homes in Tarrytown. Buyers benefit from no state income tax, a thriving tech economy, and exceptional lifestyle amenities." },
                { q: "What is the average home price in Austin?", a: "Austin's median home price varies by neighborhood. Entry-level luxury begins around $1 million, with premium neighborhoods like Westlake Hills, Barton Creek, and Lake Austin ranging from $1.5M to $25M+." },
                { q: "Are there luxury homes available in Austin?", a: "Yes. Austin features some of Texas's finest luxury properties including Hill Country estates, waterfront mansions, contemporary masterpieces, and gated community homes across Westlake Hills, Barton Creek, Lake Austin, and Spanish Oaks." },
                { q: "Is Austin a good place to invest in real estate?", a: "Austin consistently ranks among the top U.S. metros for real estate investment, driven by tech-sector growth, population in-migration, no state income tax, and limited premium inventory in supply-constrained neighborhoods." },
                { q: "How do I find off-market homes for sale in Austin?", a: "Working with an experienced luxury agent is essential. Echelon Property Group maintains access to private and whisper listings across Austin's most prestigious neighborhoods through our brokerage network and direct relationships." },
                { q: "What are the best neighborhoods to buy a luxury home in Austin?", a: "Westlake Hills, Barton Creek, and Lake Austin are Austin's top luxury neighborhoods. Westlake offers top-rated Eanes ISD schools, Barton Creek provides gated country club living, and Lake Austin delivers waterfront estates with private docks." },
              ].map((faq, i) => (
                <div key={i} className="border-b border-border pb-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeaturedCommunities />

      {/* ── Internal Links ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-normal text-architectural mb-6">
              Explore More Austin Real Estate
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/sell" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SELLING YOUR AUSTIN HOME</Link>
              <Link to="/best-neighborhoods-in-austin-texas" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BEST NEIGHBORHOODS IN AUSTIN</Link>
              <Link to="/off-market-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ OFF-MARKET HOMES IN AUSTIN</Link>
              <Link to="/moving-to-austin-texas" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ MOVING TO AUSTIN GUIDE</Link>
              <Link to="/luxury-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ AUSTIN LUXURY REAL ESTATE</Link>
              <Link to="/communities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ EXPLORE ALL COMMUNITIES</Link>
              <Link to="/buy-homes-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BUYING GUIDE</Link>
              <Link to="/private-opportunities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ PRIVATE OPPORTUNITIES</Link>
              <Link to="/blog" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BLOG & MARKET INSIGHTS</Link>
              <Link to="/why-billionaires-are-moving-to-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ WHY BILLIONAIRES ARE MOVING TO AUSTIN</Link>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>);

};

export default Buy;