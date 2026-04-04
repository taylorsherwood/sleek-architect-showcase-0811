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
        title="Contact | Echelon Property Group"
        description="Explore Contact with Echelon Property Group. View homes, market insights, and real estate opportunities in Austin, Texas."
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

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-minimal text-gold mb-4 font-extrabold">CONTACT US</p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-normal text-architectural mb-8">
              Connect with Echelon
              <br />
              Property Group
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Whether you are acquiring a significant property, preparing a luxury estate for market, or exploring investment opportunities across Austin, we welcome the opportunity to learn about your goals and provide strategic guidance tailored to your situation.
            </p>
          </div>
        </div>
      </section>

      {/* Inquiry Types */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
            <div>
              <h2 className="text-2xl font-display font-normal text-architectural mb-4">Buyer Inquiries</h2>
              <p className="text-muted-foreground leading-relaxed">
                Gain access to Austin's most compelling on-market and off-market opportunities. From waterfront estates on Lake Austin to curated Hill Country properties, our buyer advisory practice is built around discretion, market intelligence, and proactive deal sourcing. <Link to="/listings" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4">View current listings</Link> or reach out to discuss your criteria.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-display font-normal text-architectural mb-4">Seller Consultations</h2>
              <p className="text-muted-foreground leading-relaxed">
                Position your property for maximum exposure and return with our strategic advisory approach. We combine premium marketing, precise pricing analysis, and targeted outreach to attract qualified buyers — often before a listing goes public. Every engagement begins with a complimentary market evaluation.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-display font-normal text-architectural mb-4">General and Private Requests</h2>
              <p className="text-muted-foreground leading-relaxed">
                For investment inquiries, private transactions, or confidential matters that require discretion, we maintain the highest standards of privacy. <Link to="/about" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4">Learn more about our team</Link> and approach, or reach out directly to begin a private conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="pb-28">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20">
              <div>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-minimal text-muted-foreground mb-2">EMAIL</h2>
                    <a href="mailto:taylor@echelonpropertygroup.com" className="text-lg hover:text-gold transition-colors duration-300">Send an Email</a>
                  </div>
                  <div>
                    <h2 className="text-minimal text-muted-foreground mb-2">PHONE</h2>
                    <a href="tel:+15126613843" className="text-lg hover:text-gold transition-colors duration-300">(512) 661-3843</a>
                  </div>
                  <div>
                    <h2 className="text-minimal text-muted-foreground mb-2">OFFICE</h2>
                    <address className="text-lg not-italic">2105 East MLK Boulevard Ste 227<br />Austin, Texas 78702</address>
                  </div>
                </div>

                <div className="mt-12 border-t border-border/50 pt-8">
                  <p className="text-muted-foreground leading-relaxed italic">
                    Prefer a direct conversation? Reach out by phone or email to discuss your goals confidentially. We are available for in-person, phone, and video consultations at your convenience.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className={inputClass} maxLength={100} />
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className={inputClass} maxLength={255} />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className={inputClass} maxLength={20} />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <select name="interest" value={form.interest} onChange={handleChange} className={`${inputClass} bg-card`}>
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
                  <textarea name="message" placeholder="Tell us about your goals..." value={form.message} onChange={handleChange} rows={4} className={`${inputClass} resize-none`} maxLength={2000} />
                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                </div>
                <button type="submit" disabled={submitting} className="text-minimal bg-primary text-primary-foreground hover:bg-gold hover:text-white px-10 py-4 transition-colors duration-300 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-normal text-architectural mb-8">
              Work With Austin's Trusted Real Estate Advisor
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Whether you're buying your first luxury home in Austin, selling a family estate, exploring commercial investment opportunities, or relocating from out of state, Echelon Property Group provides the expert guidance and personalized service that complex real estate decisions demand. Founded by Taylor Sherwood, a Certified Luxury Home Marketing Specialist, our firm specializes in luxury residential, commercial, land, and investment real estate across Austin and the Texas Hill Country.
              </p>
              <p>
                For sellers, we deliver premium marketing campaigns featuring professional photography, cinematic video, drone footage, custom property websites, and targeted digital advertising. Our strategic pricing methodology and negotiation expertise consistently achieve above-market results for luxury listings across Barton Creek, Westlake Hills, Lake Austin, and beyond.
              </p>
              <p>
                Explore our <Link to="/blog" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4">latest market insights</Link> for data-driven analysis of Austin's luxury real estate landscape, or <Link to="/listings" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4">browse current listings</Link> to see properties represented by our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[100px]" />}><Testimonials /></Suspense>

      {/* ── Explore More ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-gold mb-6">Explore More</p>
            <p className="text-muted-foreground leading-[2] text-[15px]">
              <Link to="/about" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-border">Learn more about our approach</Link> to luxury real estate in Austin, <Link to="/listings" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-border">explore available homes and investment opportunities</Link>, or <Link to="/blog" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-border">read our latest market insights</Link> for expert analysis and neighborhood guides.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>);
};

export default Contact;
