import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import austinLuxuryNetwork from "@/assets/austin-luxury-network.jpg";
import clubhouseCommission from "@/assets/clubhouse-commission.png";
import topAgentNetwork from "@/assets/top-agent-network.webp";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createFAQSchema } from "@/components/SchemaMarkup";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(20).optional(),
  priceRange: z.string().min(1, "Please select a price range"),
  neighborhoods: z.string().trim().max(500).optional(),
  message: z.string().trim().max(2000).optional(),
});

const faqs = [
  { question: "What is an off-market home in Austin?", answer: "An off-market home is a property that is available for sale but not listed on the MLS (Multiple Listing Service) or public real estate websites. These properties are marketed privately through agent networks, direct outreach, and exclusive buyer lists. In Austin's luxury market, off-market transactions are common, particularly for high-value estates in neighborhoods like Westlake Hills, Barton Creek, and Lake Austin." },
  { question: "Why do sellers choose to sell off-market in Austin?", answer: "Sellers choose off-market transactions for privacy, discretion, and control. High-profile homeowners—including executives, celebrities, and public figures—may prefer to avoid public attention. Others want to test pricing without the stigma of days-on-market accumulation, or prefer to limit showings to only pre-qualified, serious buyers. Off-market sales also avoid the disruption of public open houses and extensive photography of private spaces." },
  { question: "How do I find off-market luxury homes in Austin?", answer: "Access to off-market listings requires working with an agent who maintains deep relationships within Austin's luxury real estate community. Echelon Property Group specializes in off-market transactions and maintains a network of property owners, developers, and fellow agents who share exclusive opportunities before they reach the public market. Contact us for private access to off-market inventory." },
  { question: "Are off-market homes more expensive than listed homes?", answer: "Not necessarily. Off-market homes can sometimes be acquired at favorable prices because there is less competition from other buyers. Without public marketing generating multiple offers, negotiations may be more straightforward. However, pricing depends on the specific property, seller motivation, and market conditions. An experienced agent can help you evaluate fair value for off-market opportunities." },
  { question: "What neighborhoods have the most off-market activity in Austin?", answer: "The highest concentration of off-market transactions occurs in Austin's most exclusive neighborhoods: Lake Austin waterfront, Westlake Hills, Barton Creek, Tarrytown, and Rollingwood. These communities have high-net-worth homeowners who value privacy, and the limited inventory creates an environment where many transactions occur through private channels before public listing." },
  { question: "Can I sell my Austin luxury home off-market?", answer: "Yes. Echelon Property Group offers a discreet, off-market selling program for luxury homeowners who prefer privacy. We market your property exclusively to qualified buyers through our private network, ensuring confidentiality while achieving optimal pricing. Contact us for a confidential consultation about selling your home off-market." },
  { question: "What price range qualifies for off-market listings in Austin?", answer: "While off-market transactions occur at all price points, they are most common in Austin's luxury segment—generally properties priced above $2 million. The highest concentration of off-market activity is in the $3 million to $25 million range, where privacy concerns and the sophistication of buyers and sellers make private transactions the preferred approach." },
];

const OffMarketHomes = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    priceRange: "",
    neighborhoods: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = leadSchema.safeParse(form);
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
          subject: "New Off-Market Access Request",
          from_name: "Echelon Property Group Website",
          to: "taylor@echelonpropertygroup.com,echelonpropertygroup@followupboss.me",
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          "Preferred Price Range": form.priceRange,
          "Preferred Neighborhoods": form.neighborhoods || "Not specified",
          "Additional Notes": form.message || "None",
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast({
          title: "Request Received",
          description: "Thank you. We'll send you off-market listings that match your criteria shortly.",
        });
        setForm({ name: "", email: "", phone: "", priceRange: "", neighborhoods: "", message: "" });
      } else {
        toast({
          title: "Submission Failed",
          description: "Something went wrong. Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const inputClass = "w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-foreground placeholder:text-muted-foreground/50 transition-colors duration-300";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Austin Off-Market Luxury Homes | Private Listings | Echelon Property Group"
        description="Access exclusive off-market luxury homes in Austin, TX. Private listings in Westlake Hills, Barton Creek, Lake Austin, and Tarrytown. Get insider access to properties not on the MLS."
      />
      <SchemaMarkup schema={createFAQSchema(faqs)} />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-minimal text-gold mb-4">PRIVATE ACCESS</p>
            <h1 className="text-5xl md:text-7xl font-display font-light text-architectural mb-8">
              Austin Off-Market Luxury Homes
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Many of Austin's finest luxury properties never appear on the public market. 
              Echelon Property Group provides qualified buyers with exclusive access to private 
              and off-market listings across Austin's most prestigious neighborhoods.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">

            {/* Lead Capture Form */}
            <section id="off-market-access" className="bg-muted -mx-6 px-6 py-16">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-4 text-center">
                  Get Private Access to Off-Market Listings
                </h2>
                <p className="text-muted-foreground text-center mb-10">
                  Complete the form below to receive exclusive off-market luxury listings 
                  matched to your criteria. All inquiries are confidential.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className={inputClass} maxLength={100} />
                    {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className={inputClass} maxLength={255} />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <input type="tel" name="phone" placeholder="Phone (Optional)" value={form.phone} onChange={handleChange} className={inputClass} maxLength={20} />
                  </div>
                  <div>
                    <select name="priceRange" value={form.priceRange} onChange={handleChange} className={`${inputClass} bg-muted`}>
                      <option value="">Preferred Price Range</option>
                      <option value="1m-2m">$1M – $2M</option>
                      <option value="2m-5m">$2M – $5M</option>
                      <option value="5m-10m">$5M – $10M</option>
                      <option value="10m-plus">$10M+</option>
                    </select>
                    {errors.priceRange && <p className="text-destructive text-sm mt-1">{errors.priceRange}</p>}
                  </div>
                  <div>
                    <input type="text" name="neighborhoods" placeholder="Preferred Neighborhoods (e.g., Westlake Hills, Lake Austin)" value={form.neighborhoods} onChange={handleChange} className={inputClass} maxLength={500} />
                  </div>
                  <div>
                    <textarea name="message" placeholder="Additional details about what you're looking for (Optional)" value={form.message} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} maxLength={2000} />
                  </div>
                  <button type="submit" disabled={submitting} className="w-full md:w-auto text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                    {submitting ? "SENDING..." : "REQUEST OFF-MARKET ACCESS"}
                  </button>
                </form>
              </div>
            </section>

            {/* What Are Off-Market Listings */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-6">
                What Are Off-Market Luxury Listings?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Off-market listings—also known as pocket listings, private exclusives, or whisper listings—are properties available for sale that are not publicly advertised on the MLS, Zillow, Realtor.com, or other consumer-facing real estate platforms. Instead, these homes are marketed quietly through agent-to-agent networks, private buyer lists, and direct outreach to qualified purchasers.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In Austin's luxury real estate market, off-market transactions represent a significant and growing share of high-end sales. Industry estimates suggest that 15% to 30% of luxury transactions in Austin's top neighborhoods occur off-market, with the percentage even higher in the most exclusive segments such as <Link to="/communities/lake-austin-waterfront" className="text-foreground underline hover:text-muted-foreground">Lake Austin waterfront</Link> properties and ultra-luxury estates in <Link to="/communities/westlake-hills" className="text-foreground underline hover:text-muted-foreground">Westlake Hills</Link>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The prevalence of off-market activity in Austin reflects the city's maturing luxury market, where high-net-worth sellers and buyers increasingly prioritize privacy, discretion, and strategic positioning over maximum public exposure. For buyers, this means that limiting your search to publicly listed properties means missing a substantial portion of available inventory.
              </p>
            </section>

            {/* Why Sellers Go Off-Market */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-6">
                Why Austin Luxury Sellers Choose Off-Market Transactions
              </h2>
              <div className="space-y-6">
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-xl font-display font-medium mb-2">Privacy and Discretion</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    High-profile homeowners—including technology executives, entrepreneurs, physicians, and public figures—often prefer to keep their real estate transactions private. An off-market approach prevents the property from appearing in public databases, protects the seller's personal information, and limits physical access to the home to only pre-vetted, qualified buyers.
                  </p>
                </div>
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-xl font-display font-medium mb-2">Testing the Market</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Some sellers want to gauge buyer interest and validate pricing before committing to a public listing. An off-market approach allows sellers to explore the market without accumulating days on market—a metric that can negatively impact perception if a property lingers publicly. If the desired price is not achieved off-market, the seller retains the option to list publicly with a fresh appearance.
                  </p>
                </div>
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-xl font-display font-medium mb-2">Controlled Access</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Luxury homes often contain valuable art, sensitive security systems, and personal spaces that homeowners prefer not to expose to the general public. Off-market transactions limit showings to serious, financially qualified buyers, reducing the disruption and security concerns associated with public marketing and open houses.
                  </p>
                </div>
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-xl font-display font-medium mb-2">Exclusivity as a Marketing Strategy</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    For certain ultra-luxury properties, scarcity and exclusivity enhance perceived value. Presenting a property as a private opportunity—available only to a select group of qualified buyers—can generate stronger interest and urgency than a public listing that is accessible to everyone.
                  </p>
                </div>
              </div>
            </section>

            {/* Benefits for Buyers */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-6">
                Benefits of Off-Market Access for Luxury Buyers
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                For buyers seeking luxury properties in Austin's most competitive neighborhoods, access to off-market inventory provides significant advantages:
              </p>
              <div className="space-y-6">
                <div className="border-l-2 border-border pl-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">Reduced Competition</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Off-market properties are seen by fewer buyers, reducing the likelihood of competitive bidding situations. In neighborhoods like <Link to="/communities/barton-creek" className="text-foreground underline hover:text-muted-foreground">Barton Creek</Link> and <Link to="/communities/rollingwood" className="text-foreground underline hover:text-muted-foreground">Rollingwood</Link>, where publicly listed luxury homes frequently attract multiple offers, this advantage can be worth hundreds of thousands of dollars.
                  </p>
                </div>
                <div className="border-l-2 border-border pl-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">First Access to Inventory</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Many luxury properties are marketed off-market first, with the option to go public if a private sale doesn't materialize. Buyers with off-market access see these properties before the broader market, providing a critical timing advantage. On <Link to="/communities/lake-austin-waterfront" className="text-foreground underline hover:text-muted-foreground">Lake Austin</Link>, where waterfront homes rarely come to market, early access can mean the difference between acquiring a property and watching it sell to someone else.
                  </p>
                </div>
                <div className="border-l-2 border-border pl-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">Better Negotiating Position</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Without the pressure of competing offers and public market dynamics, off-market negotiations tend to be more measured and strategic. Buyers often have more time for due diligence, can negotiate contingencies more effectively, and may achieve more favorable pricing.
                  </p>
                </div>
                <div className="border-l-2 border-border pl-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">Access to Unique Properties</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Some of Austin's most extraordinary properties—historic estates in <Link to="/communities/tarrytown" className="text-foreground underline hover:text-muted-foreground">Tarrytown</Link>, architecturally significant homes in <Link to="/communities/westlake-hills" className="text-foreground underline hover:text-muted-foreground">Westlake Hills</Link>, and trophy waterfront compounds on Lake Austin—may only be available off-market. These properties are owned by individuals who would consider selling for the right price and the right buyer, but have no interest in public marketing.
                  </p>
                </div>
              </div>
            </section>

            {/* Where Off-Market Activity Is Highest */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-6">
                Austin Neighborhoods with the Most Off-Market Activity
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Off-market transactions are concentrated in Austin's most exclusive and supply-constrained neighborhoods, where privacy is valued and inventory is perpetually limited:
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { name: "Lake Austin Waterfront", slug: "lake-austin-waterfront", note: "Highest off-market activity. Limited shoreline creates extreme scarcity." },
                  { name: "Westlake Hills", slug: "westlake-hills", note: "High-profile residents value privacy. Many estates trade privately." },
                  { name: "Barton Creek", slug: "barton-creek", note: "Approaching build-out. Remaining opportunities often surface off-market." },
                  { name: "Tarrytown", slug: "tarrytown", note: "Active teardown-rebuild market with off-market lot acquisitions." },
                  { name: "Rollingwood", slug: "rollingwood", note: "Small community. Neighbors often sell directly to known buyers." },
                  { name: "Texas Hill Country", slug: "texas-hill-country-estates", note: "Large ranches and estates frequently marketed through private networks." },
                ].map((n) => (
                  <Link
                    key={n.slug}
                    to={`/communities/${n.slug}`}
                    className="group border border-border p-6 hover:border-foreground/30 transition-colors duration-300"
                  >
                    <h3 className="text-lg font-display font-light text-architectural group-hover:text-muted-foreground transition-colors mb-2">
                      {n.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{n.note}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* How to Access */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-6">
                How to Access Off-Market Luxury Homes in Austin
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Accessing off-market inventory requires working with an agent who has established relationships within Austin's luxury real estate community. Unlike public listings that any agent can show, off-market opportunities flow through trusted networks built over years of transactions, referrals, and professional relationships.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Echelon Property Group maintains an extensive network of luxury homeowners, developers, relocation specialists, estate attorneys, and fellow agents who share exclusive opportunities with our team before they reach the public market. Our position within Austin's luxury community allows us to identify off-market possibilities that align with each buyer's specific criteria—neighborhood preferences, architectural style, lot requirements, view orientation, and budget parameters.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                To begin receiving off-market luxury listings tailored to your criteria, complete the form below or <Link to="/contact" className="text-foreground underline hover:text-muted-foreground">contact us directly</Link> for a confidential consultation.
              </p>
            </section>

            {/* How to Access */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-6">
                How to Access Off-Market Luxury Homes in Austin
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Accessing off-market inventory requires working with an agent who has established relationships within Austin's luxury real estate community. Unlike public listings that any agent can show, off-market opportunities flow through trusted networks built over years of transactions, referrals, and professional relationships.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Echelon Property Group maintains an extensive network of luxury homeowners, developers, relocation specialists, estate attorneys, and fellow agents who share exclusive opportunities with our team before they reach the public market. Our position within Austin's luxury community allows us to identify off-market possibilities that align with each buyer's specific criteria—neighborhood preferences, architectural style, lot requirements, view orientation, and budget parameters.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                To begin receiving off-market luxury listings tailored to your criteria, complete the form above or <Link to="/contact" className="text-foreground underline hover:text-muted-foreground">contact us directly</Link> for a confidential consultation.
              </p>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-8">
                Frequently Asked Questions About Off-Market Homes in Austin
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-border pb-6">
                    <h3 className="text-lg font-medium text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <section className="text-center py-12">
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-4">
                Ready to Explore Off-Market Opportunities?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Contact Echelon Property Group for a confidential conversation about your luxury home search 
                and access to Austin's private real estate market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#off-market-access" className="inline-block text-minimal border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-4 transition-colors duration-300">
                  REQUEST ACCESS
                </a>
                <Link to="/contact" className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 transition-colors duration-300">
                  CONTACT US
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default OffMarketHomes;
