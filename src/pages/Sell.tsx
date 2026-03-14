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
  Camera,
  BarChart3,
  Globe,
  Handshake,
  ClipboardList,
  Sparkles } from
"lucide-react";

import heroImg from "@/assets/sell-hero-luxury-home.jpg";
import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";
import taylorProfileSell from "@/assets/taylor-profile-sell.png";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const sellingSteps = [
{
  icon: ClipboardList,
  number: "01",
  title: "Listing Preparation",
  description:
  "We begin with a thorough assessment of your property's condition, market position, and competitive landscape. From staging recommendations to pre-listing repairs, we ensure your home makes a powerful first impression."
},
{
  icon: BarChart3,
  number: "02",
  title: "Strategic Pricing",
  description:
  "Our comprehensive comparative market analysis uses MLS data, off-market comps, and neighborhood-specific trends to establish a pricing strategy that attracts buyers and maximizes your return. Whether you're in Barton Creek real estate or Central Austin, precision pricing is key."
},
{
  icon: Camera,
  number: "03",
  title: "Luxury Marketing & Exposure",
  description:
  "Every listing receives professional HDR photography, cinematic video, drone footage, 3-D virtual tours, a custom property website, targeted digital advertising, and syndication to 500+ listing platforms worldwide. This isn't a template — it's a bespoke campaign."
},
{
  icon: Globe,
  number: "04",
  title: "Showings & Buyer Engagement",
  description:
  "We actively market to our network of qualified buyers, relocation clients, and high-net-worth investors. Private broker previews, luxury open houses, and targeted outreach ensure your home reaches the right audience — locally and globally."
},
{
  icon: Handshake,
  number: "05",
  title: "Negotiation & Closing",
  description:
  "When offers arrive, our disciplined, data-driven negotiation protects your interests and secures the best possible terms. We manage every detail through contract execution, inspections, appraisal, and final settlement."
}];


const whySell = [
{
  title: "Results-Driven Marketing",
  description:
  "Our multi-channel marketing strategy is designed for Austin's luxury market. From cinematic video tours to precision-targeted digital campaigns, every listing is presented at the highest level to attract qualified, motivated buyers."
},
{
  title: "Expert Negotiation",
  description:
  "With hundreds of transactions closed and deep experience in Austin luxury real estate, Taylor Sherwood delivers disciplined negotiation that consistently achieves above-market results for sellers."
},
{
  title: "Luxury Property Presentation",
  description:
  "We coordinate professional staging, photography, and property branding to position your home as a standout in the market — whether it's a Barton Creek estate, a Westlake hilltop, or a Lake Austin waterfront."
},
{
  title: "Global Reach, Local Expertise",
  description:
  "As a member of the eXp Luxury Division, we connect your property to a worldwide network of agents and affluent buyers, while our Austin roots ensure hyper-local market knowledge and pricing accuracy."
}];


const marketingFeatures = [
"Professional HDR photography & cinematic video production",
"Drone & aerial footage for estates, acreage, and waterfront",
"3-D Matterport virtual tours",
"Custom property website & branded marketing materials",
"Targeted social media & Google ad campaigns",
"Private broker previews & luxury open houses",
"Syndication to 500+ listing platforms worldwide",
"eXp Luxury Division & global referral network",
"Email campaigns to curated buyer database",
"Print features in luxury real estate publications"];


const stats = [
{ value: "98%", label: "List-to-Sale Price Ratio" },
{ value: "21", label: "Avg. Days on Market" },
{ value: "$100M+", label: "Career Sales Volume" }];


const recentListings = [
{
  image: "/lovable-uploads/0fc79a0b-1fde-439f-bb08-6062e50770b7.jpg",
  address: "2300 Barton Creek Boulevard #15",
  location: "Barton Creek, Austin",
  price: "$3,750,000",
  beds: 4,
  baths: 4,
  sqft: "4,147",
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
  badge: "Private Market Opportunity"
}];


/* ------------------------------------------------------------------ */
/*  FORM SCHEMAS                                                       */
/* ------------------------------------------------------------------ */

const valuationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(20).optional(),
  address: z.string().trim().min(1, "Property address is required").max(300),
  message: z.string().trim().max(2000).optional()
});

const consultSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().max(2000).optional()
});

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */

const Sell = () => {
  const { toast } = useToast();

  /* Valuation form */
  const [valForm, setValForm] = useState({ name: "", email: "", phone: "", address: "", message: "" });
  const [valErrors, setValErrors] = useState<Record<string, string>>({});
  const [valSubmitting, setValSubmitting] = useState(false);

  /* Consult form */
  const [conForm, setConForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [conErrors, setConErrors] = useState<Record<string, string>>({});
  const [conSubmitting, setConSubmitting] = useState(false);

  const handleValChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValForm({ ...valForm, [e.target.name]: e.target.value });
    if (valErrors[e.target.name]) setValErrors({ ...valErrors, [e.target.name]: "" });
  };

  const handleConChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setConForm({ ...conForm, [e.target.name]: e.target.value });
    if (conErrors[e.target.name]) setConErrors({ ...conErrors, [e.target.name]: "" });
  };

  const submitForm = async (
  payload: Record<string, string>,
  setSubmitting: (v: boolean) => void,
  resetForm: () => void,
  successMsg: string) =>
  {
    setSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "81cc426e-b1a8-4e5e-b2a0-0d25738dfe12",
          from_name: "Echelon Property Group Website",
          to: "taylor@echelonpropertygroup.com,echelonpropertygroup@followupboss.me",
          ...payload
        })
      });
      const data = await response.json();
      if (data.success) {
        toast({ title: "Request Sent", description: successMsg });
        resetForm();
      } else {
        toast({ title: "Submission Failed", description: "Something went wrong. Please try again or call us directly.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Submission Failed", description: "Something went wrong. Please try again or call us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleValSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = valuationSchema.safeParse(valForm);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;});
      setValErrors(fieldErrors);
      return;
    }
    setValErrors({});
    await submitForm(
      {
        subject: "Home Valuation Request",
        name: valForm.name,
        email: valForm.email,
        phone: valForm.phone || "Not provided",
        "Property Address": valForm.address,
        "Interest": "Home Valuation",
        "Message": valForm.message || "Home valuation request from Sell page."
      },
      setValSubmitting,
      () => setValForm({ name: "", email: "", phone: "", address: "", message: "" }),
      "Thank you — we'll prepare your complimentary home valuation and be in touch shortly."
    );
  };

  const handleConSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = consultSchema.safeParse(conForm);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;});
      setConErrors(fieldErrors);
      return;
    }
    setConErrors({});
    await submitForm(
      {
        subject: "Listing Consultation Request",
        name: conForm.name,
        email: conForm.email,
        phone: conForm.phone || "Not provided",
        "Interest": "Selling My Home",
        "Message": conForm.message || "Listing consultation request from Sell page."
      },
      setConSubmitting,
      () => setConForm({ name: "", email: "", phone: "", message: "" }),
      "Thank you — we'll be in touch shortly to schedule your listing consultation."
    );
  };

  const inputLight =
  "w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-foreground placeholder:text-muted-foreground/50 transition-colors duration-300";
  const inputDark =
  "w-full bg-transparent border-b border-primary-foreground/20 focus:border-primary-foreground/50 outline-none py-3 text-primary-foreground placeholder:text-primary-foreground/30 transition-colors duration-300";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sell Your Home in Austin | Echelon Property Group"
        description="Sell your Austin home for top dollar. Strategic marketing, expert negotiation, and luxury property presentation from Taylor Sherwood — a leading Austin luxury listing agent. Barton Creek real estate, Austin home value insights, and more."
        canonical="https://www.echelonpropertygroup.com/sell" />
      
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative h-[70vh] min-h-[540px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Luxury property in Austin Texas" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0C0F24]/60" />
        </div>
        <div className="relative container mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-minimal text-primary-foreground/60 mb-4 reveal">SELLER SERVICES</p>
            <h1 className="text-4xl md:text-6xl font-display font-light text-primary-foreground leading-[1.1] mb-6 reveal">
              Sell Your Property
              <br />
              in Austin
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-lg mb-8 reveal-delayed">
              Strategic marketing and expert representation designed to maximize your property's value in Austin's competitive luxury market.
            </p>
            <a
              href="#home-valuation"
              className="inline-block text-minimal bg-primary-foreground text-[#0C0F24] px-8 py-3.5 hover:bg-gold hover:text-primary-foreground transition-colors duration-300 reveal-delayed-2">REQUEST A PROPERTY VALUATION


            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-[#0C0F24] py-14">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6 text-center">
            {stats.map((s) =>
            <div key={s.label}>
                <p className="text-3xl md:text-4xl font-display font-light text-primary-foreground mb-1">{s.value}</p>
                <p className="text-minimal text-primary-foreground/50">{s.label}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Why List With Taylor ── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 max-w-2xl">
              <p className="text-minimal text-gold mb-4 font-extrabold">YOUR ADVANTAGE</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-6">
                Why List With Taylor Sherwood
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Selling property in Austin requires more than a listing — it requires a strategy. Here's why top sellers trust Taylor as their Austin luxury listing agent.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
              {whySell.map((item, i) =>
              <div key={i} className="group">
                  <div className="flex items-start gap-4 mb-3">
                    <CheckCircle className="w-5 h-5 text-gold mt-1 shrink-0" />
                    <h3 className="text-xl font-display font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm pl-9">{item.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Marketing Strategy ── */}
      <section className="py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-minimal text-gold mb-4 font-extrabold">MARKETING STRATEGY</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-6">
                Your Home Deserves
                <br />
                More Than a Sign
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Every Echelon listing receives a bespoke marketing campaign engineered to attract qualified, motivated buyers — locally and globally. Here's what's included when you sell your home in Austin with us.
              </p>
              <ul className="space-y-3">
                {marketingFeatures.map((item) =>
                <li key={item} className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-gold mt-1 shrink-0" />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                )}
              </ul>
            </div>
            <div className="relative flex items-center justify-center">
              <img
                src={taylorProfileSell}
                alt="Taylor Sherwood — Austin luxury real estate advisor"
                className="w-4/5 aspect-[3/4] object-cover object-top"
                loading="lazy" />
              
            </div>
          </div>
        </div>
      </section>

      {/* ── Selling Process ── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <p className="text-minimal text-gold mb-4 font-extrabold">THE PROCESS</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural">
                The Selling Process, Step by Step
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {sellingSteps.map((step) =>
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

      {/* ── Recent / Featured Listings ── */}
      <section className="py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
              <div>
                <p className="text-minimal text-gold mb-4 font-extrabold">PROPERTIES REPRESENTED</p>
                <h2 className="text-4xl md:text-5xl font-display font-light text-architectural">
                  Featured Listings
                </h2>
                <p className="text-muted-foreground mt-4 max-w-xl">
                  A sample of the luxury properties we've marketed and represented across Austin and the Hill Country.
                </p>
              </div>
              <Link
                to="/listings"
                className="mt-6 md:mt-0 text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 shrink-0">
                
                VIEW ALL LISTINGS <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {recentListings.map((listing, i) =>
              <div key={i} className="group">
                  <div className="relative overflow-hidden mb-6">
                    <img
                    src={listing.image}
                    alt={listing.address}
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
                  <h3 className="text-lg font-display font-medium mb-1">{listing.address}</h3>
                  <p className="text-minimal text-muted-foreground mb-4">{listing.location}</p>
                  <div className="flex gap-6 text-sm text-muted-foreground border-t border-border pt-4">
                    <span>{listing.beds} Beds</span>
                    <span>{listing.baths} Baths</span>
                    <span>{listing.sqft} Sq Ft</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Home Valuation ── */}
      <section id="home-valuation" className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-minimal text-gold mb-4 font-extrabold">HOME VALUATION</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-6">
                What Is Your Property Worth?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Understanding your Austin property value is the first step toward a successful sale. Our complimentary valuation combines real-time market data, recent comparable sales, and neighborhood-level insights to provide an accurate picture of your property's worth.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you own in Barton Creek, Westlake, Tarrytown, or anywhere across the Austin metro, request your personalized valuation today.
              </p>
              <Link
                to="/home-value-austin"
                className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2">
                
                LEARN MORE ABOUT AUSTIN HOME VALUES <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <form onSubmit={handleValSubmit} className="space-y-6 bg-card border border-border p-8 md:p-10">
              <h3 className="text-xl font-display font-light text-architectural mb-2">Request Your Free Valuation</h3>
              <div>
                <input type="text" name="name" placeholder="Full Name" value={valForm.name} onChange={handleValChange} maxLength={100} className={inputLight} />
                {valErrors.name && <p className="text-destructive text-sm mt-1">{valErrors.name}</p>}
              </div>
              <div>
                <input type="email" name="email" placeholder="Email Address" value={valForm.email} onChange={handleValChange} maxLength={255} className={inputLight} />
                {valErrors.email && <p className="text-destructive text-sm mt-1">{valErrors.email}</p>}
              </div>
              <div>
                <input type="tel" name="phone" placeholder="Phone (Optional)" value={valForm.phone} onChange={handleValChange} maxLength={20} className={inputLight} />
              </div>
              <div>
                <input type="text" name="address" placeholder="Property Address" value={valForm.address} onChange={handleValChange} maxLength={300} className={inputLight} />
                {valErrors.address && <p className="text-destructive text-sm mt-1">{valErrors.address}</p>}
              </div>
              <div>
                <textarea name="message" placeholder="Additional details (Optional)" value={valForm.message} onChange={handleValChange} rows={3} maxLength={2000} className={`${inputLight} resize-none`} />
              </div>
              <button type="submit" disabled={valSubmitting} className="text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 transition-colors duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed">
                {valSubmitting ? "SENDING..." : "REQUEST VALUATION"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── CTA / Listing Consultation ── */}
      <section id="listing-consultation" className="py-28 bg-[#0C0F24]">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-minimal text-primary-foreground/50 mb-4">READY TO SELL?</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-primary-foreground leading-[1.15] mb-6">
                Schedule a Listing Consultation
              </h2>
              <p className="text-primary-foreground/60 leading-relaxed mb-10 max-w-lg">
                Considering selling your Austin home? Schedule a complimentary consultation to discuss pricing strategy, marketing, timeline, and how we can position your property for maximum exposure and value.
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

            <form onSubmit={handleConSubmit} className="space-y-6">
              <div>
                <input type="text" name="name" placeholder="Full Name" value={conForm.name} onChange={handleConChange} maxLength={100} className={inputDark} />
                {conErrors.name && <p className="text-destructive text-sm mt-1">{conErrors.name}</p>}
              </div>
              <div>
                <input type="email" name="email" placeholder="Email Address" value={conForm.email} onChange={handleConChange} maxLength={255} className={inputDark} />
                {conErrors.email && <p className="text-destructive text-sm mt-1">{conErrors.email}</p>}
              </div>
              <div>
                <input type="tel" name="phone" placeholder="Phone (Optional)" value={conForm.phone} onChange={handleConChange} maxLength={20} className={inputDark} />
              </div>
              <div>
                <textarea name="message" placeholder="Tell us about your property and goals..." value={conForm.message} onChange={handleConChange} rows={4} maxLength={2000} className={`${inputDark} resize-none`} />
              </div>
              <button type="submit" disabled={conSubmitting} className="text-minimal bg-primary-foreground text-[#0C0F24] hover:bg-primary-foreground/90 px-10 py-4 transition-colors duration-300 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                {conSubmitting ? "SENDING..." : "REQUEST CONSULTATION"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

};

export default Sell;