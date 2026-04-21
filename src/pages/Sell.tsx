import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import FeaturedCommunities from "@/components/FeaturedCommunities";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import ScrollReveal from "@/components/ScrollReveal";
import { formatPhoneNumber, getTimestamp } from "@/lib/formUtils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
import sellHeroVideo from "@/assets/sell-hero-video.mp4";
import sellHeroVideoPoster from "@/assets/sell-hero-video-poster.webp";
import taylorProfileSell from "@/assets/echelon-for-sale-sign.jpg";
import echelonWatermark from "@/assets/echelon-watermark.webp";
import austinLuxuryNetwork from "@/assets/austin-luxury-network.jpg";
import topAgentNetwork from "@/assets/top-agent-network.webp";
import commissionClubhouse from "@/assets/clubhouse-commission.png";

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

function useCountUp(target: number, duration = 3500, from = 0) {
  const [count, setCount] = useState(from);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const animId = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setCount(from);
          const startTime = performance.now();
          const id = ++animId.current;
          const step = (now: number) => {
            if (id !== animId.current) return;
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(from + eased * (target - from)));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        } else {
          setCount(from);
          setInView(false);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, from]);

  return { count, ref, inView };
}

function AnimatedStat({ target, suffix = "", prefix = "", label, from = 0 }: {
  target: number; suffix?: string; prefix?: string; label: string; countDown?: boolean; from?: number;
}) {
  const { count, ref, inView } = useCountUp(target, 3500, from);
  return (
    <div ref={ref} className="text-center group/stat">
      <p style={{
        fontFamily: '"Cinzel", serif', fontWeight: 400,
        fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 1, color: "#F5F3EF",
      }}>
        {prefix}{count}
        <span style={{
          fontFamily: '"Cinzel", serif', fontWeight: 400,
          fontSize: "0.6em", color: "hsl(38 39% 61%)", verticalAlign: "super",
        }}>
          {suffix}
        </span>
      </p>
      <div className="relative inline-block mt-2 pb-3">
        <p style={{
          fontFamily: '"Jost", sans-serif', fontWeight: 300,
          fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "#9A9690",
        }}>
          {label}
        </p>
        <div
          className="absolute bottom-0 left-0 h-px"
          style={{
            background: "hsl(38 39% 61%)",
            width: inView ? "100%" : "0%",
            transition: "width 3.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
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
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [valuationOpen, setValuationOpen] = useState(false);

  // Lazy-load RealScout web component script when the valuation modal opens
  useEffect(() => {
    if (!valuationOpen) return;
    const SRC = "https://em.realscout.com/widgets/realscout-web-components.umd.js";
    if (document.querySelector(`script[src="${SRC}"]`)) return;
    const s = document.createElement("script");
    s.type = "module";
    s.src = SRC;
    document.body.appendChild(s);
  }, [valuationOpen]);

  // Replay hero video whenever the user scrolls back to the top
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    let wasAwayFromTop = false;
    const onScroll = () => {
      const atTop = window.scrollY < 80;
      if (!atTop) {
        wasAwayFromTop = true;
        return;
      }
      if (wasAwayFromTop) {
        wasAwayFromTop = false;
        try {
          video.currentTime = 0;
          void video.play();
        } catch {}
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


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
      <section className="relative min-h-[640px] md:min-h-[720px] lg:h-[820px] xl:h-[860px] 2xl:h-[880px] flex flex-col justify-end overflow-hidden bg-primary">
        <div className="absolute inset-0">
          {/* Mobile: keep existing image as LCP. Hidden on md+ */}
          <img src={heroImg} alt="Luxury property in Austin Texas" title="Sell your Austin luxury home — Echelon Property Group" className="md:hidden w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" sizes="100vw" width={1920} height={1080} />
          {/* Desktop: poster paints instantly (LCP), video plays once on load and again when user scrolls back to top */}
          <video
            ref={heroVideoRef}
            className="hidden md:block w-full h-full object-cover"
            src={sellHeroVideo}
            poster={sellHeroVideoPoster}
            autoPlay
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F24]/80 via-[#0C0F24]/55 to-[#0C0F24]/35" />
        </div>
        <div className="relative container mx-auto px-6 pb-16">
          <div className="max-w-xl mb-14">
            <p className="text-minimal text-gold mb-4 reveal">SELLER SERVICES</p>
            <h1 className="text-3xl sm:text-2xl sm:text-4xl md:text-6xl font-display font-normal text-primary-foreground leading-[1.1] mb-6 reveal">
              Sell Your Home
              <br />
              in Austin, TX
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-lg mb-8 reveal-delayed">
              Strategic marketing and expert representation designed to maximize your property's value in Austin's competitive luxury market.
            </p>
            <button
              type="button"
              onClick={() => setValuationOpen(true)}
              className="inline-block text-minimal px-8 py-3.5 transition-all duration-300 reveal-delayed-2 cursor-pointer"
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
              }}>REQUEST A PROPERTY VALUATION
            </button>
          </div>


          {/* ── Stats ── */}
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6 text-center mt-28">
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


      {/* ── Marketing Strategy (Editorial) ── */}
      <section className="relative py-24 md:py-36 bg-secondary overflow-hidden">
        {/* Single watermark — bottom-right ambient depth */}
        <div
          className="pointer-events-none absolute right-[-5%] bottom-[-18%] w-[60vw] max-w-[800px] aspect-square opacity-[0.03]"
          aria-hidden="true"
        >
          <img src={echelonWatermark} alt="" className="w-full h-full object-contain"
                    loading="lazy" decoding="async"
                    />
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] items-start">
          {/* Left column — Copy (stays in container) */}
          <div className="px-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-20">
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
                  Your Property Deserves More Than Just a Sign
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
          </div>

          {/* Right column — Image: full width to right edge */}
          <div className="relative lg:mt-12">
            <ScrollReveal delay={250} distance={32} duration={1200}>
              <div
                className="relative overflow-hidden rounded-l-[3px] group cursor-default"
                style={{
                  boxShadow: "0 20px 60px rgba(0,0,0,0.07)",
                }}
              >
                <img
                  src={taylorProfileSell}
                  alt="Echelon Property Group luxury listing sign in front of modern Austin home"
                  title="Echelon Property Group — luxury listing marketing"
                  className="relative z-10 w-full h-full object-cover object-[65%_65%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.015]"
                  style={{ minHeight: "420px", maxHeight: "600px" }}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  width={1200}
                  height={700}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Network Logos ── */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-6">
          <p className="text-center text-minimal text-muted-foreground mb-8 tracking-[0.2em]">MEMBER OF SELECT OFF-MARKET BROKER NETWORKS</p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
            <img src={austinLuxuryNetwork} alt="Austin Luxury Network" className="h-12 md:h-16 object-contain" loading="lazy" decoding="async" />
            <img src={topAgentNetwork} alt="Top Agent Network" className="h-12 md:h-16 object-contain" loading="lazy" decoding="async" />
            <img src={commissionClubhouse} alt="Commission Clubhouse" className="h-12 md:h-16 object-contain -translate-x-1 translate-y-[7px]" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <div className="h-12 md:h-20 bg-background" aria-hidden="true" />


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

      <div className="h-12 md:h-20 bg-background" aria-hidden="true" />

      {/* ── Discreet Path — Private Sale bridge ── */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-minimal text-gold mb-4 font-extrabold">A QUIETER PATH</p>
            <h2 className="text-2xl sm:text-3xl md:text-[2.25rem] font-display font-normal text-architectural mb-5 leading-[1.15]">
              Prefer a more discreet approach?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
              If you're not ready to fully go to market, there's a quieter way to explore your options — without open houses, public days on market, or unnecessary exposure.
            </p>
            <Link
              to="/sell-private"
              className="inline-block tracking-[0.22em] uppercase font-sans border-b border-gold/50 hover:border-gold pb-1 text-foreground hover:text-gold transition-colors"
              style={{ fontSize: "0.7rem" }}
            >
              Explore Private Sale Options →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Global Luxury Advertising ── */}
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <GlobalLuxuryAdvertising />
      </Suspense>

      <div className="h-12 md:h-20 bg-background" aria-hidden="true" />

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
                If your property may be better suited for a renovation buyer or investor sale, <Link to="/invest" className="text-foreground underline hover:text-muted-foreground">explore our investor advisory approach</Link>. To understand how the broader practice operates across buyers, sellers, and investors, see <Link to="/about-austin-real-estate-advisory" className="text-foreground underline hover:text-muted-foreground">how we work as Austin real estate advisors</Link>.
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
                Based on current Austin market data, sellers in premium neighborhoods are benefiting from limited inventory and sustained buyer demand. Homes in <Link to="/communities/westlake-hills" className="text-foreground underline hover:text-muted-foreground">Westlake Hills</Link>, <Link to="/communities/barton-creek" className="text-foreground underline hover:text-muted-foreground">Barton Creek</Link>, and <Link to="/communities/lake-austin" className="text-foreground underline hover:text-muted-foreground">Lake Austin</Link> that are properly staged and strategically priced continue to achieve strong results.
              </p>
              <p>
                From recent transactions in the area, we're seeing the strongest outcomes for sellers who invest in professional marketing — including cinematic video, HDR photography, and custom property websites. The difference between a standard listing and a premium-marketed listing is measurable in both days on market and final sale price. Review our <Link to="/austin-luxury-market-report" className="text-foreground underline hover:text-muted-foreground">Austin luxury market report</Link> for current data.
              </p>
              <p>
                Off-market selling has become an increasingly viable strategy for high-net-worth homeowners who value discretion. Echelon Property Group helps sellers evaluate whether a public or <Link to="/off-market-real-estate-austin" className="text-foreground underline hover:text-muted-foreground">private approach</Link> best serves their goals, based on the property's profile and the current competitive landscape. <Link to="/home-value-austin" className="text-foreground underline hover:text-muted-foreground">Get a free home valuation</Link> to understand where your property stands.
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
                  <a href="mailto:info@echelonpropertygroup.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
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

      <FeaturedCommunities />

      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>

      {/* ── Home Valuation Modal (RealScout) ── */}
      <Dialog open={valuationOpen} onOpenChange={setValuationOpen}>
        <DialogContent
          className="p-0 overflow-hidden bg-[#f5f3ef] border-0 shadow-none"
          style={{ width: "min(720px, calc(100vw - 2rem))", maxWidth: "min(720px, calc(100vw - 2rem))" }}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Get Your Home's Value</DialogTitle>
            <DialogDescription>Enter your address to receive a complimentary property valuation.</DialogDescription>
          </DialogHeader>
          <div className="p-5 overflow-x-auto flex justify-center">
            <style>{`
              realscout-home-value {
                --rs-hvw-background-color: #f5f3ef;
                --rs-hvw-title-color: #000000;
                --rs-hvw-subtitle-color: rgba(28, 30, 38, 0.5);
                --rs-hvw-primary-button-text-color: #ffffff;
                --rs-hvw-primary-button-color: #0c0f24;
                --rs-hvw-secondary-button-text-color: #0c0f24;
                --rs-hvw-secondary-button-color: #ffffff;
                --rs-hvw-widget-width: 100% !important;
                display: block;
                background: #f5f3ef;
                box-shadow: none !important;
                border: 0 !important;
              }
            `}</style>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  '<realscout-home-value agent-encoded-id="QWdlbnQtMjg5NDU2" include-name include-phone remove-title remove-subtitle></realscout-home-value>',
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>);

};

export default Sell;