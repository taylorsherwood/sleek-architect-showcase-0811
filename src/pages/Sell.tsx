import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import ScrollReveal from "@/components/ScrollReveal";
import { formatPhoneNumber, getTimestamp } from "@/lib/formUtils";

const Testimonials = lazy(() => import("@/components/Testimonials"));
const FeaturedListings = lazy(() => import("@/components/FeaturedListings"));
const GlobalLuxuryAdvertising = lazy(() => import("@/components/GlobalLuxuryAdvertising"));
const CinematicVideoSection = lazy(() => import("@/components/CinematicVideoSection"));
const Footer = lazy(() => import("@/components/Footer"));
import {
  CheckCircle,
  
  Camera,
  BarChart3,
  Globe,
  Handshake,
  ClipboardList,
  Sparkles } from
"lucide-react";

import heroImg from "@/assets/sell-hero-luxury-home.jpg";
import taylorProfileSell from "@/assets/echelon-for-sale-sign.jpg";
import echelonWatermark from "@/assets/echelon-watermark.png";

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
  { target: 98, suffix: "%", label: "List-to-Sale Price Ratio", countDown: false, from: 75 },
  { target: 21, suffix: "", label: "Avg. Days on Market", countDown: true, from: 10 },
  { target: 125, prefix: "$", suffix: "M+", label: "Career Sales Volume", countDown: false, from: 75 },
];

function useCountUp(target: number, duration = 2600, from = 0, countDown = false) {
  const [value, setValue] = useState(target);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const animate = useCallback(() => {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(from + (target - from) * eased);
      setValue(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, from]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!started.current) {
            started.current = true;
            animate();
          }
        } else {
          if (started.current) {
            started.current = false;
            setValue(from);
          }
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animate, from]);

  return { value, ref };
}

function AnimatedStat({ target, suffix = "", prefix = "", label, countDown = false, from = 0 }: {
  target: number; suffix?: string; prefix?: string; label: string; countDown?: boolean; from?: number;
}) {
  const { value, ref } = useCountUp(target, 4800, from, countDown);
  return (
    <div ref={ref}>
      <p className="text-3xl md:text-4xl font-display font-normal text-primary-foreground mb-1">
        {prefix}{value}{suffix}
      </p>
      <p className="text-minimal text-primary-foreground/50">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FORM SCHEMAS                                                       */
/* ------------------------------------------------------------------ */


const consultSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  message: z.string().trim().max(2000).optional()
});

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */

const Sell = () => {
  const { toast } = useToast();


  /* Consult form */
  const [conForm, setConForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [conErrors, setConErrors] = useState<Record<string, string>>({});
  const [conSubmitting, setConSubmitting] = useState(false);


  const handleConChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConForm({ ...conForm, [name]: name === "phone" ? formatPhoneNumber(value) : value });
    if (conErrors[name]) setConErrors({ ...conErrors, [name]: "" });
  };

  const submitForm = async (
  payload: Record<string, string>,
  setSubmitting: (v: boolean) => void,
  resetForm: () => void,
  successMsg: string) =>
  {
    setSubmitting(true);
    try {
      const response = await fetch("https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload),
      });
      if (response.ok) {
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
        name: conForm.name,
        email: conForm.email,
        phone: conForm.phone || "Not provided",
        message: conForm.message || "Listing consultation request from Sell page.",
        interest: "Selling My Home",
        source: "Sell Page — Consultation Form",
        page_url: typeof window !== "undefined" ? window.location.href : "",
        submitted_at: getTimestamp(),
      },
      setConSubmitting,
      () => setConForm({ name: "", email: "", phone: "", message: "" }),
      "Thank you — we'll be in touch shortly to schedule your listing consultation."
    );
  };

  const inputDark =
  "w-full bg-transparent border-b border-primary-foreground/20 focus:border-primary-foreground/50 outline-none py-3 text-primary-foreground placeholder:text-primary-foreground/30 transition-colors duration-300";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sell Your Home in Austin TX | Echelon Property Group"
        description="Sell your Austin home for top dollar. Strategic marketing, expert negotiation, and luxury listing presentation from Taylor Sherwood and Echelon Property Group."
        canonical="https://www.echelonpropertygroup.com/sell" />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createBreadcrumbSchema([
      { name: "Home", url: "https://www.echelonpropertygroup.com/" },
      { name: "Sell Your Home", url: "https://www.echelonpropertygroup.com/sell" }]
      )} />
      <SchemaMarkup schema={createFAQSchema([
      { question: "How long does it take to sell a luxury home in Austin?", answer: "Well-priced luxury homes in Austin typically sell within 30–90 days depending on neighborhood, price point, and condition. Homes in Westlake Hills, Barton Creek, and Tarrytown that are move-in ready and strategically priced often sell faster." },
      { question: "What does it cost to sell a home in Austin Texas?", answer: "Typical seller costs include agent commissions, title insurance, property taxes prorated to closing, and any repairs or staging. In Texas, sellers also provide a survey and pay for an owner's title policy." },
      { question: "Should I sell my Austin home off-market?", answer: "Off-market sales offer privacy and the ability to test pricing without public days-on-market accumulation. They're ideal for high-profile sellers or unique luxury properties. Echelon Property Group helps sellers evaluate which approach best serves their goals." },
      { question: "How should I prepare my Austin home for sale?", answer: "Key preparation steps include professional staging, decluttering, addressing deferred maintenance, fresh paint, and landscaping. For luxury homes, professional photography, cinematic video, drone footage, and a custom property website are essential." },
      { question: "What marketing does Echelon Property Group provide for listings?", answer: "Every listing receives professional HDR photography, cinematic video, drone footage, 3-D virtual tours, a custom property website, targeted digital advertising, and syndication to 500+ listing platforms. Luxury listings also receive private broker previews and global network exposure through eXp Luxury Division." },
      { question: "Is now a good time to sell a luxury home in Austin?", answer: "Austin's luxury inventory remains limited in top neighborhoods, creating favorable conditions for well-positioned sellers. Based on current market data, properly priced homes in Westlake Hills, Barton Creek, and Lake Austin are achieving strong results with motivated buyers." },
      ])} />
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative h-screen flex flex-col justify-end overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Luxury property in Austin Texas" title="Sell your Austin luxury home — Echelon Property Group" className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" sizes="100vw" width={1920} height={1080} />
          <div className="absolute inset-0 bg-[#0C0F24]/60" />
        </div>
        <div className="relative container mx-auto px-6 pb-16">
          <div className="max-w-xl mb-14">
            <p className="text-minimal text-primary-foreground/60 mb-4 reveal">SELLER SERVICES</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-normal text-primary-foreground leading-[1.1] mb-6 reveal">
              Sell Your Home
              <br />
              in Austin, TX
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-lg mb-8 reveal-delayed">
              Strategic marketing and expert representation designed to maximize your property's value in Austin's competitive luxury market.
            </p>
            <a
              href="#home-valuation"
              className="inline-block text-minimal px-8 py-3.5 transition-all duration-300 reveal-delayed-2"
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
              }}>REQUEST A PROPERTY VALUATION
            </a>
          </div>

          {/* ── Gold divider ── */}
          <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-10" />

          {/* ── Stats ── */}
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6 text-center">
            {stats.map((s) => (
              <AnimatedStat key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── What You Need to Know ── */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
              What You Need to Know About Selling in Austin
            </h2>
            <ul className="space-y-4 text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-3"><span className="text-gold mt-1.5 shrink-0">•</span><span>Well-priced luxury homes in Austin typically sell within 30–90 days. Strategic pricing and premium marketing are the most critical success factors.</span></li>
              <li className="flex items-start gap-3"><span className="text-gold mt-1.5 shrink-0">•</span><span>Off-market selling is increasingly popular among high-net-worth homeowners in Westlake Hills, Barton Creek, and Lake Austin who prioritize privacy.</span></li>
              <li className="flex items-start gap-3"><span className="text-gold mt-1.5 shrink-0">•</span><span>In Austin's luxury segment, a significant portion of high-end properties transact off-market or through private networks — meaning many of the best opportunities are never publicly listed.</span></li>
              <li className="flex items-start gap-3"><span className="text-gold mt-1.5 shrink-0">•</span><span>Professional photography, cinematic video, drone footage, and custom property websites are standard expectations for luxury listings in Austin.</span></li>
              <li className="flex items-start gap-3"><span className="text-gold mt-1.5 shrink-0">•</span><span>Austin's luxury inventory remains limited in top neighborhoods, creating strong seller leverage when properties are properly positioned.</span></li>
              <li className="flex items-start gap-3"><span className="text-gold mt-1.5 shrink-0">•</span><span>Echelon Property Group's listings receive global exposure through the eXp Luxury Division network and syndication to 500+ platforms.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Why List With Taylor ── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 max-w-2xl">
              <p className="text-minimal text-gold mb-4 font-extrabold">YOUR ADVANTAGE</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Why List With Echelon
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

      {/* ── Cinematic Video ── */}
      <div className="pt-16 md:pt-24">
        <Suspense fallback={<div className="min-h-[300px]" />}><CinematicVideoSection /></Suspense>
      </div>

      {/* ── White spacer ── */}
      <div className="bg-background py-8" />

      {/* ── Thin gold divider above Marketing Strategy ── */}
      <div className="bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>
      </div>

      {/* ── Marketing Strategy (Editorial) ── */}
      <section className="relative py-20 md:py-28 pb-14 md:pb-18 bg-secondary overflow-visible">
        {/* Single watermark — bottom-right ambient depth */}
        <div
          className="pointer-events-none absolute right-[-5%] bottom-[-18%] w-[60vw] max-w-[800px] aspect-square opacity-[0.03]"
          aria-hidden="true"
        >
          <img src={echelonWatermark} alt="" className="w-full h-full object-contain"
                    loading="lazy" decoding="async"
                    />
        </div>

        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[4fr_5fr] gap-10 lg:gap-12 items-start">
            {/* Left column — Copy */}
            <div className="max-w-[620px]">
              <ScrollReveal>
              <p
                  className="text-minimal text-gold mb-6 font-extrabold"
                >
                  MARKETING STRATEGY
                </p>
              </ScrollReveal>

              <ScrollReveal delay={80}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-8 leading-[1.08]">
                  Your Property Deserves More<br className="hidden md:block" /> Than Just a Sign
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={160}>
                <p className="text-muted-foreground/80 leading-relaxed mb-14 max-w-[580px] text-[15px]">
                  Every Echelon listing receives a bespoke marketing campaign engineered to attract qualified, motivated buyers — locally and globally. Here's what's included when you sell your home in Austin with us.
                </p>
              </ScrollReveal>

              {/* Refined feature list */}
              <ul className="space-y-5">
                {marketingFeatures.map((item, i) => (
                  <ScrollReveal key={item} delay={220 + i * 70}>
                    <li className="flex items-start gap-4 group">
                      <span
                        className="mt-[7px] w-2 h-2 rounded-full bg-gold group-hover:bg-gold shrink-0 transition-colors duration-300"
                        aria-hidden="true"
                      />
                      <span className="text-foreground/85 text-[14.5px] leading-relaxed tracking-wide">
                        {item}
                      </span>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </div>

            {/* Right column — Image (editorial, dominant, overlaps into next section) */}
            <div className="relative lg:mt-8 lg:-mr-6 xl:-mr-12 lg:-mb-[5%]">
              <ScrollReveal delay={200}>
                <div className="relative">
                  <img
                    src={taylorProfileSell}
                    alt="Taylor Sherwood — Austin luxury real estate advisor"
                    title="Taylor Sherwood — Echelon Property Group listing specialist"
                    className="relative z-10 w-full lg:scale-[1.10] origin-top object-contain"
                    style={{
                      filter: "drop-shadow(0 24px 60px hsl(220 20% 10% / 0.12)) drop-shadow(0 8px 20px hsl(220 20% 10% / 0.06))",
                    }}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    width={800}
                    height={1000}
                  />
                  {/* Subtle bottom fade to soften transition */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-24 z-20 pointer-events-none"
                    style={{
                      background: "linear-gradient(to bottom, transparent, hsl(var(--background) / 0.03))",
                    }}
                    aria-hidden="true"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Selling Process ── */}
      <section className="pt-16 md:pt-20 pb-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <p className="text-minimal text-gold mb-4 font-extrabold">THE PROCESS</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural">
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

      {/* ── Global Luxury Advertising ── */}
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <GlobalLuxuryAdvertising />
      </Suspense>

      <Suspense fallback={<div className="min-h-[200px]" />}>
        <Testimonials />
      </Suspense>

      {/* ── Full-Spectrum Real Estate Advisory ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
               <p className="text-minimal text-gold mb-4 font-extrabold">OUR EXPERTISE</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Full-Spectrum Austin Real Estate Advisory
              </h2>
            </div>
            <div className="space-y-6 text-muted-foreground leading-relaxed max-w-4xl">
              <p>
                Echelon Property Group provides comprehensive real estate services across residential, commercial, land, and investment sectors. Unlike single-focus agents, our breadth of experience allows us to advise clients holistically — whether they're purchasing a primary residence, diversifying into <Link to="/austin-commercial-real-estate" className="text-foreground underline hover:text-muted-foreground">commercial property</Link>, or assembling land for development.
              </p>
              <p>
                Our residential practice covers <Link to="/austin-luxury-homes-for-sale" className="text-foreground underline hover:text-muted-foreground">luxury homes in Austin</Link>'s most coveted neighborhoods including <Link to="/communities/westlake-hills" className="text-foreground underline hover:text-muted-foreground">Westlake Hills</Link>, <Link to="/communities/barton-creek" className="text-foreground underline hover:text-muted-foreground">Barton Creek</Link>, <Link to="/communities/lake-austin" className="text-foreground underline hover:text-muted-foreground">Lake Austin</Link>, <Link to="/communities/tarrytown" className="text-foreground underline hover:text-muted-foreground">Tarrytown</Link>, <Link to="/communities/rollingwood" className="text-foreground underline hover:text-muted-foreground">Rollingwood</Link>, and <Link to="/communities/spanish-oaks" className="text-foreground underline hover:text-muted-foreground">Spanish Oaks</Link>. We represent both buyers and sellers, bringing strategic pricing, premium marketing, and disciplined negotiation to every transaction.
              </p>
              <p>
                On the commercial and investment side, we advise on <Link to="/austin-multifamily-report-2026" className="text-foreground underline hover:text-muted-foreground">multifamily acquisitions</Link>, retail and office tenant representation, development land sourcing, and portfolio strategy. Our background in economics and investment analysis gives clients an institutional-grade perspective that most residential-only agents cannot provide.
              </p>
              <p>
                <Link to="/land-for-sale-austin" className="text-foreground underline hover:text-muted-foreground">Land brokerage</Link> is a core competency, encompassing residential lots, ranch properties, Hill Country acreage, and entitled development parcels throughout the Austin MSA. We guide clients through zoning analysis, highest-and-best-use evaluation, and acquisition negotiation for properties ranging from single homesites to large-scale development tracts.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If your property may be better suited for a renovation buyer or investor sale, <Link to="/invest" className="text-foreground underline hover:text-muted-foreground">explore our investor advisory approach</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[200px]" />}><FeaturedListings hideRealScout /></Suspense>

      {/* ── Expert Insight ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-minimal text-gold mb-4 font-extrabold">EXPERT INSIGHT</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
              Austin Seller Market Conditions in 2026
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Based on current Austin market data, sellers in premium neighborhoods are benefiting from limited inventory and sustained buyer demand. Homes in Westlake Hills, Barton Creek, and Lake Austin that are properly staged and strategically priced continue to achieve strong results.
              </p>
              <p>
                From recent transactions in the area, we're seeing the strongest outcomes for sellers who invest in professional marketing — including cinematic video, HDR photography, and custom property websites. The difference between a standard listing and a premium-marketed listing is measurable in both days on market and final sale price.
              </p>
              <p>
                Off-market selling has become an increasingly viable strategy for high-net-worth homeowners who value discretion. Echelon Property Group helps sellers evaluate whether a public or private approach best serves their goals, based on the property's profile and the current competitive landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
              Frequently Asked Questions About Selling in Austin
            </h2>
            <div className="space-y-6">
              {[
              { q: "How long does it take to sell a luxury home in Austin?", a: "Well-priced luxury homes in Austin typically sell within 30–90 days depending on neighborhood, price point, and condition. Homes in Westlake Hills, Barton Creek, and Tarrytown that are move-in ready and strategically priced often sell faster." },
              { q: "What does it cost to sell a home in Austin Texas?", a: "Typical seller costs include agent commissions, title insurance, property taxes prorated to closing, and any repairs or staging. In Texas, sellers also provide a survey and pay for an owner's title policy." },
              { q: "Should I sell my Austin home off-market?", a: "Off-market sales offer privacy and the ability to test pricing without public days-on-market accumulation. They're ideal for high-profile sellers or unique luxury properties. Echelon Property Group helps sellers evaluate which approach best serves their goals." },
              { q: "How should I prepare my Austin home for sale?", a: "Key preparation steps include professional staging, decluttering, addressing deferred maintenance, fresh paint, and landscaping. For luxury homes, professional photography, cinematic video, drone footage, and a custom property website are essential." },
              { q: "What marketing does Echelon Property Group provide for listings?", a: "Every listing receives professional HDR photography, cinematic video, drone footage, 3-D virtual tours, a custom property website, targeted digital advertising, and syndication to 500+ listing platforms. Luxury listings also receive private broker previews and global network exposure through eXp Luxury Division." },
              { q: "Is now a good time to sell a luxury home in Austin?", a: "Austin's luxury inventory remains limited in top neighborhoods, creating favorable conditions for well-positioned sellers. Based on current market data, properly priced homes in Westlake Hills, Barton Creek, and Lake Austin are achieving strong results with motivated buyers." },
              ].
              map((faq, i) =>
              <div key={i} className="border-b border-border pb-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Internal Links ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-normal text-architectural mb-6">
              Explore More Austin Real Estate
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/buy" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BUYING A HOME IN AUSTIN</Link>
              <Link to="/best-neighborhoods-in-austin-texas" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BEST NEIGHBORHOODS IN AUSTIN</Link>
              <Link to="/home-value-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ FREE HOME VALUATION</Link>
              <Link to="/past-transactions" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ PAST TRANSACTIONS</Link>
              <Link to="/about" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ ABOUT TAYLOR SHERWOOD</Link>
              <Link to="/communities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ EXPLORE ALL COMMUNITIES</Link>
              <Link to="/sell-home-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SELLER GUIDE</Link>
              <Link to="/private-opportunities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ PRIVATE OPPORTUNITIES</Link>
              <Link to="/blog" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BLOG & MARKET INSIGHTS</Link>
              <Link to="/listings" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ CURRENT LISTINGS</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA / Listing Consultation ── */}
      <section id="listing-consultation" className="py-28 bg-[#0C0F24]">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-minimal text-primary-foreground/50 mb-4">READY TO SELL?</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-primary-foreground leading-[1.15] mb-6">
                Schedule a Listing Consultation
              </h2>
              <p className="text-primary-foreground/60 leading-relaxed mb-10 max-w-lg">Considering selling your Austin property? Schedule a complimentary consultation to discuss pricing strategy, marketing, timeline, and how we can position your property for maximum exposure and value.

              </p>
              <div className="space-y-6">
                <div>
                  <h4 className="text-minimal text-primary-foreground/40 mb-1">EMAIL</h4>
                  <a href="mailto:taylor@echelonpropertygroup.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Send an Email
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
                <input type="tel" name="phone" placeholder="Phone Number" value={conForm.phone} onChange={handleConChange} maxLength={20} className={inputDark} />
                {conErrors.phone && <p className="text-destructive text-sm mt-1">{conErrors.phone}</p>}
              </div>
              <div>
                <textarea name="message" placeholder="Tell us about your property and goals..." value={conForm.message} onChange={handleConChange} rows={4} maxLength={2000} className={`${inputDark} resize-none`} />
              </div>
              <button type="submit" disabled={conSubmitting} className="text-minimal border border-primary-foreground/30 text-primary-foreground/80 hover:bg-gold hover:text-white hover:border-gold px-10 py-4 transition-colors duration-300 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                {conSubmitting ? "SENDING..." : "REQUEST CONSULTATION"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Thin gold divider ── */}
      <div className="h-[2px] bg-gold" />

      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>);

};

export default Sell;