import { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import InvestHeroSection from "@/components/InvestHeroSection";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { formatPhoneNumber, getTimestamp } from "@/lib/formUtils";

const ScrollReveal = lazy(() => import("@/components/ScrollReveal"));
const BeforeAfterSlider = lazy(() => import("@/components/BeforeAfterSlider"));
const Footer = lazy(() => import("@/components/Footer"));
import kitchenBefore from "@/assets/kitchen-before.jpg";
import kitchenAfter from "@/assets/kitchen-after.jpeg";
import kitchen02Before from "@/assets/kitchen-02-before.jpg";
import kitchen02After from "@/assets/kitchen-02-after.jpg";
import kitchen03Before from "@/assets/kitchen-03-before.jpeg";
import kitchen03After from "@/assets/kitchen-03-after.jpg";
import officeBefore from "@/assets/office-before.jpg";
import officeAfter from "@/assets/office-after.jpg";
import bath04Before from "@/assets/bath-04-before.jpg";
import bath04After from "@/assets/bath-04-after.jpeg";
import bath05Before from "@/assets/bath-05-before.jpg";
import bath05After from "@/assets/bath-05-after.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Search,
  MapPin,
  Ruler,
  PaintBucket,
  Building2,
  Target,
  Hammer,
  TrendingUp,
  Users,
  Globe,
  CheckCircle,
} from "lucide-react";

import echelonWatermark from "@/assets/echelon-watermark.webp";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const whoWeWorkWith = [
  {
    icon: Hammer,
    title: "Fix-and-Flip Investors",
    description:
      "Find homes with genuine margin potential — undervalued properties in appreciating corridors where the right scope of work translates directly into strong resale positioning.",
  },
  {
    icon: Building2,
    title: "Builders & Redevelopment Buyers",
    description:
      "Identify teardown candidates, underutilized lots, and highest-and-best-use opportunities where land value and zoning support new construction or significant expansion.",
  },
  {
    icon: TrendingUp,
    title: "Buy-and-Hold Investors",
    description:
      "Build a location-driven portfolio anchored in tenant demand, long-term appreciation, and neighborhoods with structural tailwinds — not speculative hope.",
  },
  {
    icon: Globe,
    title: "Out-of-State Investors",
    description:
      "Gain a trusted local advisor for sourcing, evaluation, and execution — someone who walks properties, understands block-by-block dynamics, and protects your capital from a distance.",
  },
];

const howWeHelp = [
  {
    icon: Search,
    title: "Identify Opportunities",
    description: "Surface off-market and on-market properties aligned with your investment thesis and return expectations.",
  },
  {
    icon: MapPin,
    title: "Evaluate Resale Potential",
    description: "Analyze neighborhood comps, buyer demand, and absorption rates to underwrite realistic exit values.",
  },
  {
    icon: PaintBucket,
    title: "Spot Cosmetic vs. Structural Upside",
    description: "Distinguish between properties that need paint and those that need foundation work — before you commit capital.",
  },
  {
    icon: Ruler,
    title: "Analyze Renovation Positioning",
    description: "Assess which improvements move the needle on value and which lead to over-improvement in a given submarket.",
  },
  {
    icon: Building2,
    title: "Assess Redevelopment Potential",
    description: "Evaluate lot dimensions, zoning, setbacks, and entitlement pathways for teardown-rebuild or expansion projects.",
  },
  {
    icon: Target,
    title: "Build Around End Value",
    description: "Structure every acquisition decision around a clear exit — whether that's resale in 90 days or a 10-year hold.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Define Criteria",
    description: "Investment type, target neighborhoods, price point, and strategy.",
  },
  {
    number: "02",
    title: "Source Opportunities",
    description: "Find properties that align with value-add or redevelopment goals.",
  },
  {
    number: "03",
    title: "Evaluate Upside",
    description: "Assess location, condition, finish strategy, and resale potential.",
  },
  {
    number: "04",
    title: "Execute with Clarity",
    description: "Move forward with a smarter acquisition and a clearer exit path.",
  },
];

const faqItems = [
  {
    question: "What Austin neighborhoods are best for flipping?",
    answer:
      "It depends on your budget, risk tolerance, and target buyer profile. Areas like East Austin, South Austin, and pockets of North Central Austin often present strong flip opportunities — but success is highly block-by-block. We help investors identify corridors where renovation dollars return the most value based on current demand and comparable resale data.",
  },
  {
    question: "Do you help investors find off-market properties?",
    answer:
      "Yes. A significant portion of our investor work involves off-market sourcing — properties that aren't publicly listed but may be available through our brokerage network, pre-market relationships, and direct outreach. This gives our clients access to opportunities before they hit the open market.",
  },
  {
    question: "Can you help evaluate renovation potential before I buy?",
    answer:
      "Absolutely. We assess properties through an investor lens — evaluating cosmetic vs. structural needs, estimating improvement costs relative to comparable resale values, and identifying which updates move the needle. We also connect clients with trusted contractors for more detailed scope-of-work estimates.",
  },
  {
    question: "Do you work with builders and redevelopment buyers?",
    answer:
      "Yes. We regularly work with builders seeking teardown candidates, infill lots, and properties where highest-and-best-use analysis supports new construction. We evaluate lot value, zoning compatibility, setback requirements, and neighborhood price ceilings to help builders make informed acquisition decisions.",
  },
  {
    question: "Can out-of-state investors work with you?",
    answer:
      "Definitely. We serve as local boots-on-the-ground for out-of-state investors — walking properties, evaluating neighborhoods, coordinating inspections, and managing the acquisition process remotely. Our goal is to give distant investors the same level of confidence and insight they'd have if they were here in person.",
  },
  {
    question: "Do you help with both acquisition and resale positioning?",
    answer:
      "Yes. We approach every investment with the exit in mind. Whether you're buying to flip, hold, or redevelop, we help position the acquisition around a realistic end value — and when it's time to sell, our full marketing and listing platform is designed to maximize your return.",
  },
];

const credibilityCards = [
  { title: "Value-Add Opportunities", description: "Identify properties where strategic improvements unlock outsized returns." },
  { title: "Redevelopment Insight", description: "Evaluate teardown, expansion, and highest-and-best-use potential." },
  { title: "Resale Positioning", description: "Align every improvement decision with end-buyer expectations and market comps." },
  { title: "Local Market Guidance", description: "Navigate Austin's block-by-block dynamics with an advisor who lives the data." },
];

/* ------------------------------------------------------------------ */
/*  FORM SCHEMA                                                        */
/* ------------------------------------------------------------------ */

const investorSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  interest: z.string().trim().min(1, "Please select your interest"),
  investmentType: z.string().trim().optional(),
  targetAreas: z.string().trim().max(500).optional(),
  budget: z.string().trim().optional(),
  timeline: z.string().trim().optional(),
  notes: z.string().trim().max(2000).optional(),
});

const propertySchema = z.object({
  propName: z.string().trim().min(1, "Name is required").max(100),
  propPhone: z.string().trim().min(1, "Phone is required").max(20),
  propEmail: z.string().trim().email("Please enter a valid email").max(255),
  propAddress: z.string().trim().min(1, "Property address is required").max(500),
});

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */

const Invest = () => {
  const { toast } = useToast();


  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    investmentType: "",
    targetAreas: "",
    budget: "",
    timeline: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Property acquisition form state
  const [propForm, setPropForm] = useState({ propName: "", propPhone: "", propEmail: "", propAddress: "" });
  const [propErrors, setPropErrors] = useState<Record<string, string>>({});
  const [propSubmitting, setPropSubmitting] = useState(false);

  const handlePropChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPropForm({ ...propForm, [name]: name === "propPhone" ? formatPhoneNumber(value) : value });
    if (propErrors[name]) setPropErrors({ ...propErrors, [name]: "" });
  };

  const handlePropSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = propertySchema.safeParse(propForm);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setPropErrors(fieldErrors);
      return;
    }
    setPropSubmitting(true);
    try {
      const response = await fetch("https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: propForm.propName,
          email: propForm.propEmail,
          phone: propForm.propPhone || "Not provided",
          property_address: propForm.propAddress,
          source: "Invest Page — Property CTA",
          page_url: typeof window !== "undefined" ? window.location.href : "",
          submitted_at: getTimestamp(),
        }),
      });
      if (response.ok) {
        toast({ title: "Property Submitted", description: "We'll review your property and be in touch shortly." });
        setPropForm({ propName: "", propPhone: "", propEmail: "", propAddress: "" });
        setPropErrors({});
      } else {
        toast({ title: "Submission Failed", description: "Please try again or call us directly.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Submission Failed", description: "Please try again or call us directly.", variant: "destructive" });
    } finally {
      setPropSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "phone" ? formatPhoneNumber(value) : value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = investorSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          interest: form.interest || "Not specified",
          investment_type: form.investmentType || "Not specified",
          target_areas: form.targetAreas || "Not specified",
          budget_range: form.budget || "Not specified",
          timeline: form.timeline || "Not specified",
          notes: form.notes || "None",
          source: "Private Access — Invest Page",
          page_url: typeof window !== "undefined" ? window.location.href : "",
          submitted_at: getTimestamp(),
        }),
      });
      if (response.ok) {
        toast({
          title: "Request Received",
          description: "We'll be in touch shortly to discuss your investment goals.",
        });
        setForm({ name: "", email: "", phone: "", interest: "", investmentType: "", targetAreas: "", budget: "", timeline: "", notes: "" });
        setErrors({});
      } else {
        toast({ title: "Submission Failed", description: "Please try again or call us directly.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Submission Failed", description: "Please try again or call us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-card border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors duration-200 text-sm";
  const selectClass =
    "w-full bg-card border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors duration-200 text-sm appearance-none";

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://www.echelonpropertygroup.com" },
    { name: "Invest", url: "https://www.echelonpropertygroup.com/invest" },
  ]);

  const faqSchema = createFAQSchema(
    faqItems.map((item) => ({ question: item.question, answer: item.answer }))
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Austin Investment Real Estate & Off-Market Deals | Echelon Property Group"
        description="Off-market investment properties, fix-and-flip deals, and development opportunities in Austin. Data-driven sourcing from Echelon."
        canonical="/invest"
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={faqSchema} />
      <Navigation />

      {/* ──────────────────────── PRIVATE ACCESS HERO ──────────────────────── */}
      {/* ──────────────────────── PRIVATE ACCESS HERO ──────────────────────── */}
      <InvestHeroSection>
        {/* overlay */}
        <div className="absolute inset-0 md:hidden" style={{ zIndex: 1, background: 'rgba(12,15,36,0.25)' }} />
        <div className="absolute inset-0 hidden md:block" style={{ zIndex: 1, background: 'linear-gradient(to right, rgba(12,15,36,0.55) 0%, rgba(12,15,36,0.25) 40%, transparent 65%)' }} />
        <div className="relative container mx-auto px-6 pb-16" style={{ zIndex: 2 }}>
          <div className="max-w-xl mb-14">
            <p className="text-minimal text-gold mb-4 ml-1" style={{ textShadow: "0 0 20px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4)" }}>INVESTOR ACCESS</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-normal text-primary-foreground leading-[1.1] mb-6" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5), 0 0 30px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.3)" }}>
              Access Investment &amp;
              <br />
              Off-Market Opportunities
            </h1>
            <p className="text-primary-foreground text-lg max-w-lg mb-8" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)" }}>
              Select deals, private listings, and value-add opportunities across Austin.
            </p>
            <Link
              to="#lead-form"
              className="inline-block text-minimal px-8 py-3.5 transition-all duration-300"
              style={{
                border: "1px solid hsl(var(--gold))",
                color: "#fff",
                background: "hsl(var(--gold))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "hsl(var(--gold))";
                e.currentTarget.style.borderColor = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "hsl(var(--gold))";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "hsl(var(--gold))";
              }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              REQUEST PRIVATE ACCESS
            </Link>
          </div>
        </div>
      </InvestHeroSection>

      <div className="h-16 md:h-24 bg-background" aria-hidden="true" />

      <section className="pt-10 md:pt-12 pb-16 md:pb-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-minimal text-gold mb-4">Client Focus</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-16 max-w-2xl">
              Austin Investment Clients
              <br />
              We Serve
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whoWeWorkWith.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 100}>
                <div className="group border-2 border-border p-10 h-full hover:border-gold transition-colors duration-500">
                  <card.icon className="w-8 h-8 text-gold mb-4" />
                  <h3 className="text-2xl font-display font-normal text-architectural mb-3 group-hover:text-muted-foreground transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── PROCESS ──────────────────────── */}
      <section className="pt-10 md:pt-12 pb-24 md:pb-32 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-minimal text-gold mb-4">Methodology</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-16 max-w-2xl">
              Our Austin Investor Process
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 100}>
                <div className="relative group">
                  <span className="text-5xl font-display font-normal text-gold mb-4 block transition-colors duration-500 group-hover:text-gold">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-display font-normal text-foreground mb-2 transition-colors duration-300 group-hover:text-muted-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-10 md:pt-14 pb-12 md:pb-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-minimal text-gold mb-4 tracking-[0.25em]">Portfolio</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-4 max-w-3xl">
              Real Transformations.
              <br />
              Measurable Upside.
            </h2>
            <p className="text-muted-foreground max-w-3xl leading-relaxed mb-2">
              Selected transformations illustrating positioning, finish strategy, and value creation.
            </p>
            <p className="text-[0.8rem] text-muted-foreground/60 italic mb-10 max-w-2xl">
              See how the right improvements translate directly into perceived value and profitable exits.
            </p>
          </ScrollReveal>

          <div className="space-y-10 md:space-y-12">
            {/* Slider 1 */}
            <ScrollReveal>
              <BeforeAfterSlider
                beforeImage={kitchen02Before}
                afterImage={kitchen02After}
              />
              <div className="mt-5">
                <h3 className="text-base font-display font-normal text-foreground tracking-wide">KITCHEN Transformation — BARTON CREEK</h3>
                <div className="w-8 h-px bg-gold mt-2 mb-2" />
                <p className="text-[0.82rem] text-muted-foreground/75 leading-relaxed">
                  Repositioned through lighting, layout clarity, and material updates to create a more open and marketable environment.
                  <br />
                   Designed and implemented by <a href="https://www.newedgeren.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">New Edge Renovations</a>
                </p>
              </div>
            </ScrollReveal>

            {/* Slider 2 — Office */}
            <ScrollReveal>
              <BeforeAfterSlider
                beforeImage={officeBefore}
                afterImage={officeAfter}
              />
              <div className="mt-5">
                <h3 className="text-base font-display font-normal text-foreground tracking-wide">Office Transformation — Barton Creek</h3>
                <div className="w-8 h-px bg-gold mt-2 mb-2" />
                <p className="text-[0.82rem] text-muted-foreground/75 leading-relaxed">
                  Repositioned through bold color, upgraded materials, and curated furnishings to create a sophisticated executive workspace.
                  <br />
                  Designed and implemented by <a href="https://www.newedgeren.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">New Edge Renovations</a>
                </p>
              </div>
            </ScrollReveal>

            {/* Slider 3 — Bathroom Upgrade Westlake Hills */}
            <ScrollReveal>
              <BeforeAfterSlider
                beforeImage={bath05Before}
                afterImage={bath05After}
              />
              <div className="mt-5">
                <h3 className="text-base font-display font-normal text-foreground tracking-wide">Bathroom Upgrade — Westlake Hills</h3>
                <div className="w-8 h-px bg-gold mt-2 mb-2" />
                <p className="text-[0.82rem] text-muted-foreground/75 leading-relaxed">Elevated through material selection, improved lighting, and clean-lined finishes to match the home's luxury positioning.</p>
              </div>
            </ScrollReveal>

            {/* Slider 4 */}
            <ScrollReveal>
              <BeforeAfterSlider
                beforeImage={kitchen03Before}
                afterImage={kitchen03After}
              />
              <div className="mt-5">
                <h3 className="text-base font-display font-normal text-foreground tracking-wide">Kitchen Refresh — westlake hills</h3>
                <div className="w-8 h-px bg-gold mt-2 mb-2" />
                <p className="text-[0.82rem] text-muted-foreground/75 leading-relaxed">Updated surfaces, hardware, and lighting to modernize the space without over-improving for the neighborhood. This property generated over 150 showings and multiple offers.</p>
              </div>
            </ScrollReveal>

            {/* Slider 5 */}
            <ScrollReveal>
              <BeforeAfterSlider
                beforeImage={kitchenBefore}
                afterImage={kitchenAfter}
              />
              <div className="mt-5">
                <h3 className="text-base font-display font-normal text-foreground tracking-wide">Kitchen Transformation — south austin</h3>
                <div className="w-8 h-px bg-gold mt-2 mb-2" />
                <p className="text-[0.82rem] text-muted-foreground/75 leading-relaxed">
                  Repositioned through layout updates, finish upgrades, and improved flow to maximize buyer appeal.
                  <br />
                  Designed and implemented by <a href="https://www.newedgeren.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">New Edge Renovations</a>
                </p>
              </div>
            </ScrollReveal>

            {/* Slider 6 — Bathroom South Austin (moved to bottom) */}
            <ScrollReveal>
              <BeforeAfterSlider
                beforeImage={bath04Before}
                afterImage={bath04After}
              />
              <div className="mt-5">
                <h3 className="text-base font-display font-normal text-foreground tracking-wide">Bathroom Transformation — South Austin</h3>
                <div className="w-8 h-px bg-gold mt-2 mb-2" />
                <p className="text-[0.82rem] text-muted-foreground/75 leading-relaxed">Clean-lined materials, upgraded fixtures, and improved lighting to align with today's buyer standards.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ──────────────────────── PRIVATE NETWORK GATEWAY ──────────────────────── */}
      <section className="py-14 md:py-20 bg-secondary">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="text-minimal text-gold mb-5 tracking-[0.3em]">Private Network</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-6 leading-[1.15]">
              Have a Property That Needs Work?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed mb-4 text-[0.95rem]">
              We selectively connect properties with a vetted network of investors seeking
              renovation and value-add opportunities across Austin.
            </p>
            <p className="text-sm text-muted-foreground/50 italic mb-10">
              Discreet, straightforward, and no obligation.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <form onSubmit={handlePropSubmit} className="max-w-md mx-auto text-left">
              <div className="space-y-2.5">
                <div>
                  <input type="text" name="propName" placeholder="Full Name" value={propForm.propName} onChange={handlePropChange} className="w-full bg-transparent border-b border-border/60 px-1 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold transition-colors duration-300 text-sm" required />
                  {propErrors.propName && <p className="text-xs text-destructive mt-1">{propErrors.propName}</p>}
                </div>
                <div>
                  <input type="tel" name="propPhone" placeholder="Phone" value={propForm.propPhone} onChange={handlePropChange} className="w-full bg-transparent border-b border-border/60 px-1 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold transition-colors duration-300 text-sm" required />
                  {propErrors.propPhone && <p className="text-xs text-destructive mt-1">{propErrors.propPhone}</p>}
                </div>
                <div>
                  <input type="email" name="propEmail" placeholder="Email" value={propForm.propEmail} onChange={handlePropChange} className="w-full bg-transparent border-b border-border/60 px-1 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold transition-colors duration-300 text-sm" required />
                  {propErrors.propEmail && <p className="text-xs text-destructive mt-1">{propErrors.propEmail}</p>}
                </div>
                <div>
                  <input type="text" name="propAddress" placeholder="Property Address" value={propForm.propAddress} onChange={handlePropChange} className="w-full bg-transparent border-b border-border/60 px-1 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold transition-colors duration-300 text-sm" required />
                  {propErrors.propAddress && <p className="text-xs text-destructive mt-1">{propErrors.propAddress}</p>}
                </div>
              </div>
              <div className="pt-8">
                <button type="submit" disabled={propSubmitting} className="w-full py-3.5 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase font-medium hover:bg-gold hover:text-white hover:-translate-y-px hover:shadow-md transition-all duration-300 disabled:opacity-50">
                  {propSubmitting ? "Submitting…" : "REQUEST CASH OFFER"}
                </button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </section>

      <section className="pt-16 md:pt-20 pb-12 md:pb-16 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-minimal text-gold mb-4">Strategic Approach</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-6 max-w-3xl">
              Investment Representation Built Around Opportunity, Not Emotion
            </h2>
            <p className="text-foreground max-w-3xl leading-relaxed mb-6">
              This is not a generic home search experience. We help investors identify the right
              opportunities, understand neighborhood-specific demand, assess improvement potential,
              and make smarter acquisition decisions with resale or hold strategy in mind. Every
              recommendation is grounded in data, local insight, and a clear understanding of
              where value is created — from <Link to="/off-market-real-estate-austin" className="text-foreground underline hover:text-muted-foreground">off-market deals</Link> to on-market value plays.
            </p>
            <p className="text-foreground max-w-3xl leading-relaxed mb-16">
              Source smarter opportunities, evaluate upside with more precision, and move faster in Austin with an advisor who understands renovation potential, redevelopment value, and resale positioning. Explore our <Link to="/austin-multifamily-report-2026" className="text-foreground underline hover:text-muted-foreground">Austin multifamily market outlook</Link> for current data.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {credibilityCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 100}>
                <div className="group border-2 border-border p-8 h-full hover:border-gold transition-colors duration-500">
                  <CheckCircle className="w-8 h-8 text-gold mb-4" />
                  <h3 className="text-2xl font-display font-normal text-architectural mb-3 group-hover:text-muted-foreground transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── HOW WE HELP ──────────────────────── */}
      <section className="pt-12 md:pt-16 pb-24 md:pb-32 bg-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-minimal text-gold mb-4">Value Proposition</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-16 max-w-3xl">
              How We Help Austin Investors
              <br />
              Move <em className="italic not-prose">Smarter</em>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {howWeHelp.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 80}>
                <div className="group border-2 border-border bg-card p-8 h-full hover:border-gold transition-colors duration-500">
                  <card.icon className="w-5 h-5 text-gold mb-4" />
                  <h3 className="text-lg font-display font-normal text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-secondary overflow-hidden">
        {/* Watermark */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] max-w-[600px] aspect-square opacity-[0.06]"
          aria-hidden="true"
        >
          <img src={echelonWatermark} alt="" className="w-full h-full object-contain"
            loading="lazy" decoding="async"
            width={800} height={800}
          />
        </div>
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-minimal text-gold mb-4">Market Intelligence</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-8 max-w-3xl">
              Why Local Market Insight Matters
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Austin is a highly localized market. Two properties on the same street can carry
                dramatically different value profiles depending on lot size, orientation, flood
                plain status, school zone, and proximity to commercial corridors. Whether you're targeting <Link to="/land-for-sale-austin" className="text-foreground underline hover:text-muted-foreground">land for development</Link> or a residential flip, investing here
                without granular, block-by-block knowledge is a risk most investors can't afford.
              </p>
              <p>
                Not every renovation dollar returns equally. A $150,000 kitchen remodel in a
                neighborhood with a $600,000 price ceiling is a fundamentally different proposition
                than the same scope in a market that absorbs $1.2 million resales. Understanding
                where improvement capital generates real returns — and where it leads to
                over-improvement — is the difference between a profitable flip and a lesson learned.
              </p>
              <p>
                Finish level should always match end-buyer expectations. In some Austin submarkets,
                buyers expect designer fixtures and custom millwork. In others, clean, functional
                updates outperform premium finishes. We help investors calibrate their renovation
                strategy to the specific demand profile of each neighborhood — ensuring every dollar
                spent is a dollar that comes back at resale.
              </p>
              <p>
                Local demand and micro-location are the variables that matter most when underwriting
                upside. Days on market, absorption rate, buyer demographics, and competing
                inventory all shape the exit. We bring that data to every conversation so our
                investors can make decisions with confidence, not conjecture.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── What You Need to Know ── */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
            What You Need to Know About Austin Investment Real Estate
          </h2>
          <ul className="space-y-4 text-muted-foreground leading-relaxed">
            <li className="flex items-start gap-3"><span className="text-gold mt-1.5 shrink-0">•</span><span>Austin consistently ranks among the top U.S. metros for <Link to="/austin-real-estate-investment" className="text-foreground underline hover:text-muted-foreground">real estate investment</Link>, driven by population growth, tech-sector expansion, and no state income tax.</span></li>
            <li className="flex items-start gap-3"><span className="text-gold mt-1.5 shrink-0">•</span><span><Link to="/off-market-real-estate-austin" className="text-foreground underline hover:text-muted-foreground">Off-market properties</Link> represent a significant share of Austin's best investment opportunities — access requires local broker relationships and direct sourcing.</span></li>
            <li className="flex items-start gap-3"><span className="text-gold mt-1.5 shrink-0">•</span><span>Fix-and-flip margins are strongest in transitioning corridors like East Austin and South Austin, where renovation dollars translate directly into resale value.</span></li>
            <li className="flex items-start gap-3"><span className="text-gold mt-1.5 shrink-0">•</span><span>Development <Link to="/land-for-sale-austin" className="text-foreground underline hover:text-muted-foreground">land in the Austin MSA</Link> ranges from entitled infill lots to large-scale tracts, with zoning and entitlement analysis essential before acquisition.</span></li>
            <li className="flex items-start gap-3"><span className="text-gold mt-1.5 shrink-0">•</span><span>Echelon Property Group serves both local and out-of-state investors with data-driven sourcing, property evaluation, and full transaction management. Explore our <Link to="/austin-multifamily-report-2026" className="text-foreground underline hover:text-muted-foreground">multifamily market outlook</Link> for current data.</span></li>
          </ul>
        </div>
      </section>

      {/* ──────────────────────── LEAD FORM ──────────────────────── */}
      <div className="h-10 md:h-16 bg-background" aria-hidden="true" />
      <section id="lead-form" className="py-24 md:py-32 bg-primary">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-minimal text-gold mb-4" style={{ color: '#d4a94b' }}>Get Started</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-primary-foreground mb-4">
              Tell Us What You're Looking For
            </h2>
            <p className="text-primary-foreground/60 mb-12 max-w-2xl">
              Share your investment criteria and we'll follow up with relevant opportunities,
              market insight, and a strategy conversation.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-primary-foreground/70 text-sm mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`${inputClass} bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 focus:ring-primary-foreground/30`}
                    required
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                {/* Email */}
                <div>
                  <label className="block text-primary-foreground/70 text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className={`${inputClass} bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 focus:ring-primary-foreground/30`}
                    required
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
                {/* Phone */}
                <div>
                  <label className="block text-primary-foreground/70 text-sm mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(512) 555-1234"
                    className={`${inputClass} bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 focus:ring-primary-foreground/30`}
                    required
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>
                {/* Investment Type */}
                <div>
                  <label className="block text-primary-foreground/70 text-sm mb-2">Investment Type</label>
                  <select
                    name="investmentType"
                    value={form.investmentType}
                    onChange={handleChange}
                    className={`${selectClass} bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground focus:ring-primary-foreground/30`}
                  >
                    <option value="">Select type</option>
                    <option value="Fix and Flip">Fix and Flip</option>
                    <option value="Buy and Hold">Buy and Hold</option>
                    <option value="Tear-Down / Rebuild">Tear-Down / Rebuild</option>
                    <option value="Value-Add Opportunity">Value-Add Opportunity</option>
                    <option value="Off-Market Search">Off-Market Search</option>
                  </select>
                </div>
                {/* Target Areas */}
                <div>
                  <label className="block text-primary-foreground/70 text-sm mb-2">Target Areas</label>
                  <input
                    type="text"
                    name="targetAreas"
                    value={form.targetAreas}
                    onChange={handleChange}
                    placeholder="e.g. East Austin, Westlake, South Lamar"
                    className={`${inputClass} bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 focus:ring-primary-foreground/30`}
                  />
                </div>
                {/* Budget Range */}
                <div>
                  <label className="block text-primary-foreground/70 text-sm mb-2">Budget Range</label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className={`${selectClass} bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground focus:ring-primary-foreground/30`}
                  >
                    <option value="">Select range</option>
                    <option value="Under $500K">Under $500K</option>
                    <option value="$500K – $1M">$500K – $1M</option>
                    <option value="$1M – $2M">$1M – $2M</option>
                    <option value="$2M – $5M">$2M – $5M</option>
                    <option value="$5M+">$5M+</option>
                  </select>
                </div>
              </div>
              {/* Timeline */}
              <div>
                <label className="block text-primary-foreground/70 text-sm mb-2">Timeline</label>
                <select
                  name="timeline"
                  value={form.timeline}
                  onChange={handleChange}
                  className={`${selectClass} bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground focus:ring-primary-foreground/30`}
                >
                  <option value="">Select timeline</option>
                  <option value="Immediately">Immediately</option>
                  <option value="1-3 Months">1-3 Months</option>
                  <option value="3-6 Months">3-6 Months</option>
                  <option value="6-12 Months">6-12 Months</option>
                  <option value="Just Exploring">Just Exploring</option>
                </select>
              </div>
              {/* Notes */}
              <div>
                <label className="block text-primary-foreground/70 text-sm mb-2">Additional Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your investment goals, experience level, or specific criteria..."
                  className={`${inputClass} bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 focus:ring-primary-foreground/30 resize-none`}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-10 py-4 bg-primary-foreground text-foreground font-medium text-sm tracking-wide hover:bg-gold hover:text-white transition-colors duration-300 disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                {submitting ? "Submitting..." : "Submit Your Criteria"}
                {!submitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* ──────────────────────── FAQ ──────────────────────── */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-minimal text-gold mb-4">Frequently Asked Questions</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-12">
              Austin Investment Real Estate FAQ
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                  <AccordionTrigger className="text-left text-foreground font-light hover:no-underline py-6">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* ──────────────────────── FINAL CTA ──────────────────────── */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
              Looking for Your Next Investment Opportunity in Austin?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Whether you're flipping, building, holding, or sourcing value-add opportunities, we
              can help you approach the Austin market with more clarity and better positioning.
            </p>
            <a
              href="#lead-form"
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-gold hover:text-white transition-colors duration-300"
            >
              Start the Conversation
              <ArrowRight className="w-4 h-4" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Internal Links ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-normal text-architectural mb-6">
              Explore Austin Real Estate
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/austin-land-development-opportunities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ LAND DEVELOPMENT OPPORTUNITIES</Link>
              <Link to="/austin-multifamily-report-2026" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ MULTIFAMILY MARKET REPORT</Link>
              <Link to="/off-market-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ OFF-MARKET OPPORTUNITIES</Link>
              <Link to="/land" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ LAND & INVESTMENT</Link>
              <Link to="/past-transactions" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ PAST TRANSACTIONS</Link>
              <Link to="/about" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ ABOUT TAYLOR SHERWOOD</Link>
              <Link to="/austin-commercial-real-estate" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ COMMERCIAL REAL ESTATE</Link>
              <Link to="/search" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SEARCH ALL LISTINGS</Link>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>
  );
};

export default Invest;
