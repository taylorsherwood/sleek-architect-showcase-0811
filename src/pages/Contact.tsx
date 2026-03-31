import { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
const Footer = lazy(() => import("@/components/Footer"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { formatPhoneNumber, getTimestamp } from "@/lib/formUtils";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  interest: z.string().min(1, "Please select your interest"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be under 2000 characters")
});

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
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
          interest: form.interest,
          message: form.message,
          source: "Contact Page",
          page_url: typeof window !== "undefined" ? window.location.href : "",
          submitted_at: getTimestamp(),
        }),
      });
      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Thank you for reaching out. We'll be in touch shortly."
        });
        setForm({ name: "", email: "", phone: "", interest: "", message: "" });
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
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "phone" ? formatPhoneNumber(value) : value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const inputClass = "w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-foreground placeholder:text-muted-foreground/50 transition-colors duration-300";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contact Austin Luxury Realtor | Echelon Property Group"
        description="Schedule a consultation with Taylor Sherwood and Echelon Property Group. Luxury homes, land, commercial, and investment real estate advisory in Austin, TX."
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "Contact", url: "https://www.echelonpropertygroup.com/contact" }
      ])} />
      <SchemaMarkup schema={createFAQSchema([
        { question: "How do I schedule a consultation with Echelon Property Group?", answer: "Use the contact form above, call us at (512) 661-3843, or email taylor@echelonpropertygroup.com. We typically respond within a few hours during business days and are happy to arrange in-person, phone, or video consultations based on your preference." },
        { question: "Do you work with out-of-state buyers?", answer: "Absolutely. A significant portion of our clients relocate to Austin from California, New York, Chicago, and other major metros. We provide virtual property tours, comprehensive neighborhood analysis, and full-service transaction management for remote buyers." },
        { question: "What areas of Austin do you cover?", answer: "We serve all of Austin's premier neighborhoods including Westlake Hills, Barton Creek, Lake Austin, Tarrytown, Rollingwood, Travis Heights, Downtown Austin, Dripping Springs, Spanish Oaks, and the greater Texas Hill Country." },
        { question: "Is there a cost for an initial consultation?", answer: "No. Our initial consultations are always complimentary and come with no obligation. We believe the best client relationships start with honest conversation about your goals and how we can help." },
      ])} />
      <Navigation />

      <div className="h-12 md:h-20" />

      <section className="pt-32 pb-28">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20">
              <div>
                <p className="text-minimal text-gold mb-4">CONTACT US</p>
                <h1 className="text-5xl md:text-6xl font-display font-normal text-architectural mb-8">
                  Let's Start a
                  <br />
                  Conversation
                </h1>
                <p className="text-muted-foreground leading-relaxed mb-12">Whether you're considering selling or searching for your next property in Austin, we'd love to hear from you.


                </p>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-minimal text-muted-foreground mb-2">EMAIL</h2>
                    <a href="mailto:taylor@echelonpropertygroup.com" className="text-lg hover:text-gold transition-colors duration-300">Send an Email</a>
                  </div>
                  <div>
                    <h2 className="text-minimal text-muted-foreground mb-2">PHONE</h2>
                    <a href="tel:+15125551234" className="text-lg hover:text-gold transition-colors duration-300">(512) 661-3843

                    </a>
                  </div>
                  <div>
                    <h2 className="text-minimal text-muted-foreground mb-2">OFFICE</h2>
                    <address className="text-lg not-italic">2105 East MLK Boulevard Ste 227
Austin, Texas 78702
                    </address>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    maxLength={100} />
                  
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    maxLength={255} />
                  
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                    maxLength={20} />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <select
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className={`${inputClass} bg-card`}>
                    
                    <option value="">I'm interested in...</option>
                    <option value="selling">Selling My Home</option>
                    <option value="buying">Buying a Home</option>
                    <option value="consultation">Free Consultation</option>
                    <option value="valuation">Home Valuation</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.interest && <p className="text-destructive text-sm mt-1">{errors.interest}</p>}
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Tell us about your goals..."
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    maxLength={2000} />
                  
                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 transition-colors duration-300 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                  
                  {submitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO Content: Contact & Services Overview ── */}
      <section className="py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-normal text-architectural mb-8">
              Work With Austin's Trusted Real Estate Advisor
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Whether you're buying your first luxury home in Austin, selling a family estate, exploring commercial investment opportunities, or relocating from out of state, Echelon Property Group provides the expert guidance and personalized service that complex real estate decisions demand. Founded by Taylor Sherwood, a Certified Luxury Home Marketing Specialist, our firm specializes in luxury residential, commercial, land, and investment real estate across Austin and the Texas Hill Country.
              </p>

              <h3 className="text-2xl font-display font-normal text-architectural pt-4">
                Our Services
              </h3>
              <p>
                Echelon Property Group offers comprehensive real estate advisory services tailored to high-net-worth individuals, investors, and families. Our core services include luxury buyer representation, strategic listing and seller advisory, off-market property sourcing, commercial tenant representation, investment property acquisitions, and land brokerage. Each engagement is customized to the client's specific goals, timeline, and financial objectives.
              </p>
              <p>
                For sellers, we deliver premium marketing campaigns featuring professional photography, cinematic video, drone footage, custom property websites, and targeted digital advertising. Our strategic pricing methodology and negotiation expertise consistently achieve above-market results for luxury listings across Barton Creek, Westlake Hills, Lake Austin, and beyond.
              </p>

              <h3 className="text-2xl font-display font-normal text-architectural pt-4">
                Why Clients Choose Echelon Property Group
              </h3>
              <p>
                Clients trust Echelon Property Group for our deep local expertise, disciplined negotiation approach, and commitment to discretion. Unlike high-volume brokerages, we maintain a focused client roster that allows for hands-on attention at every stage of the transaction. Our network includes Austin's top luxury agents, lenders, inspectors, attorneys, and contractors — ensuring you have access to the best professionals at every step.
              </p>
              <p>
                As a member of the eXp Luxury Division, we also connect clients to a global network of agents and affluent buyers, expanding the reach of every listing and every search beyond Austin's borders. Whether your next real estate move involves a $1.5 million Tarrytown bungalow or a $15 million Lake Austin estate, we bring the same level of strategic thinking and personal commitment.
              </p>

              <h3 className="text-2xl font-display font-normal text-architectural pt-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">How do I schedule a consultation?</h4>
                  <p>Use the contact form above, call us at (512) 661-3843, or <a href="mailto:taylor@echelonpropertygroup.com" className="underline hover:text-foreground transition-colors">send us an email</a>. We typically respond within a few hours during business days and are happy to arrange in-person, phone, or video consultations based on your preference.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Do you work with out-of-state buyers?</h4>
                  <p>Absolutely. A significant portion of our clients relocate to Austin from California, New York, Chicago, and other major metros. We provide virtual property tours, comprehensive neighborhood analysis, and full-service transaction management for remote buyers.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">What areas of Austin do you cover?</h4>
                  <p>We serve all of Austin's premier neighborhoods including Westlake Hills, Barton Creek, Lake Austin, Tarrytown, Rollingwood, Travis Heights, Downtown Austin, Dripping Springs, Spanish Oaks, and the greater Texas Hill Country.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Is there a cost for an initial consultation?</h4>
                  <p>No. Our initial consultations are always complimentary and come with no obligation. We believe the best client relationships start with honest conversation about your goals and how we can help.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[100px]" />}><Testimonials /></Suspense>

      {/* ── Internal Links ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-normal text-architectural mb-6">
              Explore Austin Real Estate
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/buy-homes-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BUY A HOME IN AUSTIN</Link>
              <Link to="/sell-home-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SELL YOUR AUSTIN HOME</Link>
              <Link to="/off-market-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ OFF-MARKET OPPORTUNITIES</Link>
              <Link to="/invest" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ INVESTMENT ADVISORY</Link>
              <Link to="/communities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ AUSTIN COMMUNITIES</Link>
              <Link to="/listings" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ CURRENT LISTINGS</Link>
              <Link to="/home-value-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ FREE HOME VALUATION</Link>
              <Link to="/search" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SEARCH ALL AUSTIN HOMES</Link>
              <Link to="/private-opportunities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ PRIVATE OPPORTUNITIES</Link>
              <Link to="/blog" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BLOG & MARKET INSIGHTS</Link>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>);

};

export default Contact;