import { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
const Footer = lazy(() => import("@/components/Footer"));
import AboutBlock from "@/components/AboutBlock";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createFAQSchema, realEstateAgentSchema } from "@/components/SchemaMarkup";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { formatPhoneNumber, submitLeadToZapier } from "@/lib/formUtils";

const faqs = [
  {
    question: "How accurate is an online home valuation?",
    answer: "Automated online valuations provide a general estimate but often lack the nuance required for luxury properties. Echelon Property Group's valuation combines automated data with local market expertise, recent comparable sales, neighborhood-specific trends, and property condition assessment to deliver a significantly more accurate estimate than algorithm-only tools."
  },
  {
    question: "How long does a valuation take?",
    answer: "After submitting your request, our team typically delivers a confidential valuation within 24 to 48 business hours. For complex or high-value properties, we may schedule a brief consultation to gather additional details and ensure the most accurate assessment."
  },
  {
    question: "Is the home valuation really free?",
    answer: "Yes. Our home valuation service is completely free and comes with no obligation to list or sell your property. We provide this service as part of our commitment to helping Austin homeowners make informed real estate decisions."
  },
  {
    question: "Do I need to be ready to sell to request a valuation?",
    answer: "Not at all. Many homeowners request valuations simply to understand their property's current market position. Whether you're considering selling in the near future, planning for retirement, evaluating refinancing options, or simply curious about your home's value, our valuation provides valuable insight with no commitment required."
  },
];

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  address: z.string().trim().min(1, "Property address is required").max(300),
  propertyType: z.string().min(1, "Please select a property type"),
  priceRange: z.string().min(1, "Please select an estimated price range"),
  notes: z.string().max(1000).optional(),
});

type FormData = z.infer<typeof formSchema>;

const HomeValueAustin = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    propertyType: "",
    priceRange: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "phone" ? formatPhoneNumber(value) : value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    const message = [
      `Property: ${formData.address}`,
      `Type: ${formData.propertyType}`,
      `Estimated price range: ${formData.priceRange}`,
      formData.notes && `Notes: ${formData.notes}`,
    ].filter(Boolean).join(" | ");

    const res = await submitLeadToZapier({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message,
      source: "Home Value Austin Page",
      extra: {
        property_address: formData.address,
        property_type: formData.propertyType,
        price_range: formData.priceRange,
        notes: formData.notes || "",
      },
    });
    if (res.ok) {
      setSubmitted(true);
      toast({
        title: "Valuation Request Received",
        description: "We'll be in touch within 24–48 hours with your confidential home valuation.",
      });
    } else {
      toast({
        title: "Submission Failed",
        description: res.error || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const inputClass =
    "w-full bg-transparent border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-300";
  const selectClass =
    "w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-foreground transition-colors duration-300";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Free Austin Home Valuation | Echelon Property Group"
        description="Request a free, confidential home valuation from Echelon Property Group. Find out what your Austin luxury home is worth using local market data and expertise."
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createFAQSchema(faqs)} />
      <Navigation />
      <div className="h-12 md:h-20" aria-hidden="true" />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-minimal text-gold mb-4">FREE HOME VALUATION</p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-normal text-architectural mb-8">
              Free Austin Home Valuation
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Find out what your Austin home is worth. Request a confidential property valuation 
              backed by local market data, recent sales analysis, and neighborhood expertise from 
              Echelon Property Group.
            </p>
          </div>
        </div>
      </section>

      <div className="pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">

            {/* How We Determine Value */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                How We Determine Your Home's Value
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Unlike automated online tools that rely solely on algorithms, Echelon Property Group's 
                valuation process combines technology with deep local expertise. Our team analyzes recent 
                comparable sales in your specific neighborhood, current market conditions, property features 
                and improvements, lot characteristics, and micro-market trends that algorithms often miss.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For luxury properties in communities like{" "}
                <Link to="/communities/westlake-hills" className="text-foreground underline hover:text-muted-foreground">Westlake Hills</Link>,{" "}
                <Link to="/communities/barton-creek" className="text-foreground underline hover:text-muted-foreground">Barton Creek</Link>,{" "}
                <Link to="/communities/lake-austin" className="text-foreground underline hover:text-muted-foreground">Lake Austin</Link>, and{" "}
                <Link to="/communities/tarrytown" className="text-foreground underline hover:text-muted-foreground">Tarrytown</Link>, 
                where each property is unique and comparable sales are limited, this hands-on approach 
                produces significantly more accurate valuations than mass-market estimation tools.
              </p>
            </section>

            {/* Valuation Form */}
            <section id="valuation-form">
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
                Request Your Free Valuation
              </h2>

              {submitted ? (
                <div className="border border-border p-12 text-center">
                  <h3 className="text-2xl font-display font-normal text-architectural mb-4">
                    Thank You for Your Request
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    We've received your valuation request and will deliver a confidential assessment 
                    within 24–48 business hours. A member of our team may reach out to gather 
                    additional details about your property.
                  </p>
                  <Link
                    to="/"
                    className="inline-block text-minimal border border-foreground/30 text-foreground hover:bg-foreground/5 px-8 py-3 transition-colors duration-300"
                  >
                    RETURN HOME
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-minimal text-muted-foreground mb-2 block">NAME *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputClass}
                        maxLength={100}
                      />
                      {errors.name && <p className={errorClass}>{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-minimal text-muted-foreground mb-2 block">EMAIL *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className={inputClass}
                        maxLength={255}
                      />
                      {errors.email && <p className={errorClass}>{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-minimal text-muted-foreground mb-2 block">PHONE *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(512) 555-0000"
                        className={inputClass}
                        maxLength={20}
                      />
                      {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="text-minimal text-muted-foreground mb-2 block">PROPERTY TYPE *</label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className={selectClass}
                      >
                        <option value="">Select type</option>
                        <option value="single-family">Single-Family Home</option>
                        <option value="condo">Condo / Townhome</option>
                        <option value="waterfront">Waterfront Property</option>
                        <option value="ranch">Ranch / Acreage</option>
                        <option value="land">Land</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.propertyType && <p className={errorClass}>{errors.propertyType}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-minimal text-muted-foreground mb-2 block">PROPERTY ADDRESS *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Full property address"
                      className={inputClass}
                      maxLength={300}
                    />
                    {errors.address && <p className={errorClass}>{errors.address}</p>}
                  </div>

                  <div>
                    <label className="text-minimal text-muted-foreground mb-2 block">ESTIMATED PRICE RANGE *</label>
                    <select
                      name="priceRange"
                      value={formData.priceRange}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="">Select range</option>
                      <option value="under-1m">Under $1,000,000</option>
                      <option value="1m-2m">$1,000,000 – $2,000,000</option>
                      <option value="2m-5m">$2,000,000 – $5,000,000</option>
                      <option value="5m-10m">$5,000,000 – $10,000,000</option>
                      <option value="10m-plus">$10,000,000+</option>
                      <option value="unsure">Not Sure</option>
                    </select>
                    {errors.priceRange && <p className={errorClass}>{errors.priceRange}</p>}
                  </div>

                  <div>
                    <label className="text-minimal text-muted-foreground mb-2 block">ADDITIONAL NOTES</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any details about your property or timeline (optional)"
                      rows={4}
                      className={inputClass}
                      maxLength={1000}
                    />
                  </div>

                  <button
                    type="submit"
                    className="text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 transition-colors duration-300 w-full md:w-auto"
                  >
                    GET YOUR FREE PROPERTY VALUATION
                  </button>
                </form>
              )}
            </section>

            {/* Recent Sales */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
                Recent Austin Luxury Sales
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Austin's luxury market continues to see strong activity across the city's most 
                sought-after neighborhoods. Recent transactions highlight the depth and diversity 
                of the market.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-border p-6">
                  <p className="text-minimal text-gold mb-2">WESTLAKE HILLS</p>
                  <h3 className="text-lg font-display font-normal text-architectural mb-1">Hilltop Estate</h3>
                  <p className="text-2xl font-light text-foreground mb-2">$4,250,000</p>
                  <p className="text-sm text-muted-foreground">5 BD · 5 BA · 6,200 SF · Hill Country Views</p>
                </div>
                <div className="border border-border p-6">
                  <p className="text-minimal text-gold mb-2">LAKE AUSTIN</p>
                  <h3 className="text-lg font-display font-normal text-architectural mb-1">Waterfront Estate</h3>
                  <p className="text-2xl font-light text-foreground mb-2">$8,750,000</p>
                  <p className="text-sm text-muted-foreground">6 BD · 7 BA · 8,400 SF · Private Dock</p>
                </div>
                <div className="border border-border p-6">
                  <p className="text-minimal text-gold mb-2">BARTON CREEK</p>
                  <h3 className="text-lg font-display font-normal text-architectural mb-1">Golf Course Estate</h3>
                  <p className="text-2xl font-light text-foreground mb-2">$3,100,000</p>
                  <p className="text-sm text-muted-foreground">4 BD · 4 BA · 5,100 SF · Fazio Course Views</p>
                </div>
                <div className="border border-border p-6">
                  <p className="text-minimal text-gold mb-2">TARRYTOWN</p>
                  <h3 className="text-lg font-display font-normal text-architectural mb-1">New Construction</h3>
                  <p className="text-2xl font-light text-foreground mb-2">$2,850,000</p>
                  <p className="text-sm text-muted-foreground">4 BD · 3.5 BA · 4,200 SF · Walk to Lake Austin</p>
                </div>
              </div>
            </section>

            {/* Why Work With Us */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Why Work With a Local Austin Luxury Real Estate Advisor
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Selling a luxury property in Austin requires more than a listing on the MLS. The most 
                successful sales are guided by advisors who understand neighborhood-level pricing dynamics, 
                have access to qualified buyer networks, and can execute sophisticated marketing strategies 
                that match the caliber of the property.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Echelon Property Group specializes exclusively in{" "}
                <Link to="/austin-luxury-homes-for-sale" className="text-foreground underline hover:text-muted-foreground">Austin luxury real estate</Link>. 
                Our team provides sellers with data-driven pricing, professional staging and photography, 
                targeted buyer outreach, and access to{" "}
                <Link to="/off-market-real-estate-austin" className="text-foreground underline hover:text-muted-foreground">off-market and private sale channels</Link>{" "}
                that protect your privacy while maximizing exposure to the right audience.
              </p>
              <div className="space-y-4">
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-lg font-medium text-foreground mb-1">Hyper-Local Pricing Expertise</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    We track sales at the street level across every luxury neighborhood in Austin, ensuring 
                    your property is priced to attract serious buyers while achieving maximum value.
                  </p>
                </div>
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-lg font-medium text-foreground mb-1">Qualified Buyer Network</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Our active buyer database includes relocating executives, investors, and high-net-worth 
                    individuals actively searching for Austin luxury properties.
                  </p>
                </div>
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-lg font-medium text-foreground mb-1">Confidential Sales Capability</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    For sellers who require discretion, we facilitate private transactions through our 
                    off-market network without public listing exposure.
                  </p>
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="text-center py-16 bg-secondary -mx-6 px-6">
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-4">
                Ready to Find Out What Your Home Is Worth?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Submit your information above and receive a confidential valuation from Echelon Property Group 
                within 24–48 hours — no obligation, no pressure.
              </p>
              <a
                href="#valuation-form"
                className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 transition-colors duration-300"
              >
                REQUEST YOUR VALUATION
              </a>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
                Frequently Asked Questions
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

            {/* Internal Links */}
            <section>
              <h2 className="text-2xl font-display font-normal text-architectural mb-6">
                Explore Austin Real Estate
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link to="/sell" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SELLER SERVICES</Link>
                <Link to="/off-market-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ OFF-MARKET OPPORTUNITIES</Link>
                <Link to="/austin-luxury-homes-for-sale" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ AUSTIN LUXURY HOMES</Link>
                <Link to="/past-transactions" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ PAST TRANSACTIONS</Link>
                <Link to="/communities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ AUSTIN COMMUNITIES</Link>
                <Link to="/austin-luxury-market-report" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ MARKET REPORT</Link>
              </div>
            </section>

          </div>
        </div>
      </div>

      <AboutBlock />
      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>
  );
};

export default HomeValueAustin;