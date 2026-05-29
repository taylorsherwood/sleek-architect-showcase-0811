import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import FeaturedCommunities from "@/components/FeaturedCommunities";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema, createFAQSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import ScrollReveal from "@/components/ScrollReveal";
import { formatPhoneNumber, submitLeadToZapier } from "@/lib/formUtils";


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

// Slow, cinematic smooth-scroll helper for in-page anchors
const slowSmoothScrollTo = (
  elementId: string,
  options: { duration?: number; offset?: number } = {}
) => {
  const target = document.getElementById(elementId);
  if (!target) return;

  const { duration = 5600, offset = 12 } = options;
  const start = window.scrollY;
  let startTime: number | null = null;

  const easeInOutQuart = (t: number) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

  const getTargetTop = () =>
    Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);

  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const liveTargetTop = getTargetTop();

    window.scrollTo(0, start + (liveTargetTop - start) * easeInOutQuart(progress));

    if (progress < 1) {
      requestAnimationFrame(step);
      return;
    }

    window.scrollTo({ top: getTargetTop(), behavior: "auto" });
    requestAnimationFrame(() => {
      window.scrollTo({ top: getTargetTop(), behavior: "auto" });
    });
  };

  requestAnimationFrame(step);
};

import sellHeroVideoPoster from "@/assets/sell-hero-video-poster.webp";
import taylorProfileSell from "@/assets/echelon-for-sale-sign.jpg";
import echelonWatermark from "@/assets/echelon-watermark.webp";
import austinLuxuryNetwork from "@/assets/austin-luxury-network.jpg";
import topAgentNetwork from "@/assets/top-agent-network.webp";
import homesComLogo from "@/assets/homes-com-logo.webp";
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
  "Every listing receives professional HDR photography, cinematic video, drone footage, 3-D virtual tours, a custom property website, targeted digital advertising, and syndication to 500+ listing platforms worldwide. This isn't a template, it's a bespoke campaign."
},
{
  icon: Globe,
  number: "04",
  title: "Showings & Buyer Engagement",
  description:
  "We actively market to our network of qualified buyers, relocation clients, and high-net-worth investors. Private broker previews, luxury open houses, and targeted outreach ensure your home reaches the right audience, locally and globally."
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
  "We coordinate professional staging, photography, and property branding to position your home as a standout in the market, whether it's a Barton Creek estate, a Westlake hilltop, or a Lake Austin waterfront."
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

  // Lazy-load RealScout web component script when the valuation section is near the viewport
  useEffect(() => {
    const SRC = "https://em.realscout.com/widgets/realscout-web-components.umd.js";
    if (document.querySelector(`script[src="${SRC}"]`)) return;
    const target = document.getElementById("home-valuation");
    if (!target) return;
    const load = () => {
      if (document.querySelector(`script[src="${SRC}"]`)) return;
      const s = document.createElement("script");
      s.type = "module";
      s.src = SRC;
      document.body.appendChild(s);
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            load();
            io.disconnect();
          }
        },
        { rootMargin: "600px" }
      );
      io.observe(target);
      return () => io.disconnect();
    }
    load();
  }, []);

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
    data: { name: string; email: string; phone?: string; message?: string; source: string; extra?: Record<string, string> },
    setSubmitting: (v: boolean) => void,
    resetForm: () => void,
    successMsg: string
  ) => {
    setSubmitting(true);
    const res = await submitLeadToZapier(data);
    if (res.ok) {
      toast({ title: "Request Sent", description: successMsg });
      resetForm();
    } else {
      toast({
        title: "Submission Failed",
        description: res.error || "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
    }
    setSubmitting(false);
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
        phone: conForm.phone,
        message: conForm.message || "Listing consultation request from Sell page.",
        source: "Sell Page, Consultation Form",
        extra: { interest: "Selling My Home" },
      },
      setConSubmitting,
      () => setConForm({ name: "", email: "", phone: "", message: "" }),
      "Thank you, we'll be in touch shortly to schedule your listing consultation."
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
      { question: "How long does it take to sell a luxury home in Austin?", answer: "Well-priced luxury homes in Austin typically sell within 30–90 days depending on neighborhood, price point, and condition. Homes in West lake Hills, Barton Creek, and Tarrytown that are move-in ready and strategically priced often sell faster." },
      { question: "What does it cost to sell a home in Austin Texas?", answer: "Typical seller costs include agent commissions, title insurance, property taxes prorated to closing, and any repairs or staging. In Texas, sellers also provide a survey and pay for an owner's title policy." },
      { question: "Should I sell my Austin home off-market?", answer: "Off-market sales offer privacy and the ability to test pricing without public days-on-market accumulation. They're ideal for high-profile sellers or unique luxury properties. Echelon Property Group helps sellers evaluate which approach best serves their goals." },
      { question: "How should I prepare my Austin home for sale?", answer: "Key preparation steps include professional staging, decluttering, addressing deferred maintenance, fresh paint, and landscaping. For luxury homes, professional photography, cinematic video, drone footage, and a custom property website are essential." },
      { question: "What marketing does Echelon Property Group provide for listings?", answer: "Every listing receives professional HDR photography, cinematic video, drone footage, 3-D virtual tours, a custom property website, targeted digital advertising, and syndication to 500+ listing platforms. Luxury listings also receive private broker previews and global network exposure through eXp Luxury Division." },
      { question: "Is now a good time to sell a luxury home in Austin?", answer: "Austin's luxury inventory remains limited in top neighborhoods, creating favorable conditions for well-positioned sellers. Based on current market data, properly priced homes in West lake Hills, Barton Creek, and Lake Austin are achieving strong results with motivated buyers." },
      ])} />
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative min-h-[780px] md:min-h-[720px] lg:h-[820px] xl:h-[860px] 2xl:h-[880px] flex flex-col justify-end overflow-hidden bg-primary pt-28 md:pt-0">
        <div className="absolute inset-0">
          {/* Mobile: keep existing image as LCP. Hidden on md+ */}
          <img src={heroImg} alt="Luxury property in Austin Texas" title="Sell your Austin luxury home, Echelon Property Group" className="md:hidden w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" sizes="100vw" width={1920} height={1080} />
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
        <div className="relative container mx-auto px-6 pb-12 md:pb-16">
          <div className="max-w-xl mb-10 md:mb-14">
            <p className="text-minimal text-gold mb-4 reveal" style={{ textShadow: "0 1px 12px rgba(0,0,0,0.45)" }}>SELLER SERVICES</p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-display font-normal text-primary-foreground leading-[1.1] mb-6 reveal"
              style={{ textShadow: "0 2px 18px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.45)" }}
            >
              Sell Your Home
              <br />
              in Austin, TX
            </h1>
            <p
              className="text-primary-foreground/80 text-base sm:text-lg max-w-lg mb-8 reveal-delayed"
              style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
            >
              Strategic marketing and expert representation designed to maximize your property's value in Austin's competitive luxury market.
            </p>
            <a
              href="#home-valuation"
              onClick={(e) => {
                e.preventDefault();
                slowSmoothScrollTo("home-valuation", { duration: 5600, offset: 0 });
              }}
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
            </a>
          </div>


          {/* ── Stats ── */}
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-3 sm:gap-6 text-center mt-12 md:mt-28">
            {stats.map((s) => (
              <AnimatedStat key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Austin Seller Intelligence ── */}
      <section className="relative py-24 md:py-36 bg-secondary overflow-hidden">
        {/* Faint oversized watermark */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1100px] aspect-square opacity-[0.025]"
          aria-hidden="true"
        >
          <img
            src={echelonWatermark}
            alt=""
            className="w-full h-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
        {/* Ultra-light gradient wash */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--secondary)) 0%, hsl(var(--background) / 0.4) 50%, hsl(var(--secondary)) 100%)",
          }}
        />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 md:mb-20">
                <p className="text-[0.65rem] md:text-xs tracking-[0.32em] uppercase text-gold font-semibold mb-5">
                  Market Insight
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-architectural leading-[1.15]">
                  Austin Seller Intelligence
                </h2>
                <div
                  className="mx-auto mt-7 flex items-center justify-center gap-3"
                  aria-hidden="true"
                >
                  <span className="h-px w-16 md:w-24 bg-gold" />
                  <span className="relative flex items-center justify-center">
                    <span className="absolute h-1.5 w-1.5 rotate-45 bg-gold" />
                    <span className="h-3 w-3 rotate-45 border border-gold" />
                  </span>
                  <span className="h-px w-16 md:w-24 bg-gold" />
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[
                {
                  title: "Strategic Pricing Matters",
                  body:
                    "Well-positioned Austin luxury homes typically sell within 30–90 days, with disciplined pricing and presentation driving the strongest outcomes.",
                },
                {
                  title: "Discretion Is Increasingly Valuable",
                  body:
                    "Many high-net-worth sellers in Westlake Hills, Barton Creek, and Lake Austin are prioritizing off-market selling and private exposure over open marketing.",
                },
                {
                  title: "Off-Market Activity Is Significant",
                  body:
                    "A meaningful share of Austin's luxury real estate transactions occurs privately through trusted agent networks and direct buyer relationships.",
                },
                {
                  title: "Presentation Impacts Perceived Value",
                  body:
                    "Professional marketing, including cinematic video, drone media, editorial photography, and custom property websites, is now baseline for luxury listings in Austin.",
                },
                {
                  title: "Inventory Remains Limited",
                  body:
                    "Austin's most coveted neighborhoods continue to experience constrained luxury inventory, creating leverage for properly positioned sellers.",
                },
                {
                  title: "Global Exposure Matters",
                  body:
                    "Echelon Property Group listings receive enhanced distribution through the eXp Luxury Division network and syndication across 500+ platforms.",
                },
              ].map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 90}>
                  <article className="group relative h-full p-8 md:p-10 rounded-md bg-[#FAFAF8] dark:bg-[hsl(38_15%_12%/0.6)] border border-border/60 shadow-[0_1px_2px_rgba(12,15,36,0.04),0_8px_24px_-12px_rgba(12,15,36,0.08)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_2px_4px_rgba(12,15,36,0.06),0_18px_40px_-16px_rgba(185,160,108,0.25)]">
                    <span
                      className="absolute top-0 left-8 right-8 h-px"
                      style={{ background: "hsl(var(--gold) / 0.55)" }}
                      aria-hidden="true"
                    />
                    <p className="text-[0.7rem] tracking-[0.28em] text-gold font-semibold mb-5">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-lg md:text-xl font-display font-normal text-architectural mb-4 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-[1.75] max-w-[44ch]">
                      {card.body}
                    </p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
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
                Selling property in Austin requires more than a listing, it requires a strategy. Here's why top sellers trust Taylor as their Austin luxury listing agent.
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
        {/* Single watermark, bottom-right ambient depth */}
        <div
          className="pointer-events-none absolute right-[-5%] bottom-[-18%] w-[60vw] max-w-[800px] aspect-square overflow-hidden opacity-[0.03]"
          aria-hidden="true"
        >
          <img src={echelonWatermark} alt="" className="w-full object-contain"
                    loading="lazy" decoding="async"
                    style={{ width: "100%", height: "100%" }}
                    />
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] items-start">
          {/* Left column, Copy (stays in container) */}
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
                  Every Echelon listing receives a bespoke marketing campaign engineered to attract qualified, motivated buyers, locally and globally. Here's what's included when you sell your home in Austin with us.
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

          {/* Right column, Image: full width to right edge */}
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
                  title="Echelon Property Group, luxury listing marketing"
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

      {/* ── Premier Partnerships & Credentials (Editorial Strip) ── */}
      <section className="relative bg-background py-24 md:py-32 overflow-hidden">
        {/* Faint gold hairline divider at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-24 bg-gold/40" aria-hidden="true" />

        <div className="mx-auto px-6 max-w-[1180px]">
          {/* Editorial heading, centered */}
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-16 md:mb-20">
              <p className="text-gold font-extrabold tracking-[0.42em] text-[10.5px] uppercase">
                Premier Partnerships &amp; Credentials
              </p>
              <div className="mt-5 h-px w-8 bg-gold/50" aria-hidden="true" />
            </div>
          </ScrollReveal>

          {/* Two-column horizontal strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-12 lg:gap-x-16 max-w-[860px] mx-auto">
            {/* Homes.com */}
            <ScrollReveal delay={120}>
              <div className="flex flex-col items-center text-center">
                <div className="h-16 md:h-20 flex items-center justify-center">
                  <img
                    src={homesComLogo}
                    alt="Homes.com Premier Agent"
                    className="h-9 md:h-10 w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="mt-8 max-w-[360px] text-foreground/70 text-[13.5px] leading-[1.8] tracking-[0.01em]">
                  Premier placement and enhanced exposure across one of the nation's fastest-growing luxury home search platforms.
                </p>
              </div>
            </ScrollReveal>

            {/* CLHMS */}
            <ScrollReveal delay={220}>
              <div className="flex flex-col items-center text-center">
                <div className="h-16 md:h-20 flex items-center justify-center">
                  <a
                    href="https://www.luxuryhomemarketing.com/clhms/mini-verified.html?m=47b7631918fd737ab569ce1c45792b4b"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(
                        "https://www.luxuryhomemarketing.com/clhms/mini-verified.html?m=47b7631918fd737ab569ce1c45792b4b",
                        "_blank",
                        "width=700,height=470,left=100,top=100,scrollbars=1"
                      );
                    }}
                    className="inline-flex items-center justify-center transition-opacity duration-500 hover:opacity-80"
                    aria-label="Verify Certified Luxury Home Marketing Specialist credential"
                  >
                    <img
                      src="https://www.luxuryhomemarketing.com/en/logo.html?m=47b7631918fd737ab569ce1c45792b4b&v=12"
                      alt="Certified Luxury Home Marketing Specialist (CLHMS) — verified member"
                      className="h-[72px] md:h-[84px] w-auto object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </div>
                <p className="mt-8 max-w-[360px] text-foreground/70 text-[13.5px] leading-[1.8] tracking-[0.01em]">
                  Recognized expertise in the marketing and negotiation of luxury residential properties.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Faint gold hairline divider at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-24 bg-gold/40" aria-hidden="true" />
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

      {/* ── Discreet Path, Private Sale bridge ── */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-minimal text-gold mb-4 font-extrabold">A QUIETER PATH</p>
            <h2 className="text-2xl sm:text-3xl md:text-[2.25rem] font-display font-normal text-architectural mb-5 leading-[1.15]">
              Prefer a more discreet approach?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
              If you're not ready to fully go to market, there's a quieter way to explore your options, without open houses, public days on market, or unnecessary exposure.
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
                Echelon Property Group provides comprehensive real estate services across residential, commercial, land, and investment sectors. Unlike single-focus agents, our breadth of experience allows us to advise clients holistically, whether they're purchasing a primary residence, diversifying into <Link to="/austin-commercial-real-estate" className="text-foreground underline hover:text-muted-foreground">commercial property</Link>, or assembling land for development.
              </p>
              <p>
                Our residential practice covers <Link to="/austin-luxury-homes-for-sale" className="text-foreground underline hover:text-muted-foreground">luxury homes in Austin</Link>'s most coveted neighborhoods including <Link to="/communities/westlake-hills" className="text-foreground underline hover:text-muted-foreground">West lake Hills</Link>, <Link to="/communities/barton-creek" className="text-foreground underline hover:text-muted-foreground">Barton Creek</Link>, <Link to="/communities/lake-austin" className="text-foreground underline hover:text-muted-foreground">Lake Austin</Link>, <Link to="/communities/tarrytown" className="text-foreground underline hover:text-muted-foreground">Tarrytown</Link>, <Link to="/communities/rollingwood" className="text-foreground underline hover:text-muted-foreground">Rollingwood</Link>, and <Link to="/communities/spanish-oaks" className="text-foreground underline hover:text-muted-foreground">Spanish Oaks</Link>. We represent both buyers and sellers, bringing strategic pricing, premium marketing, and disciplined negotiation to every transaction.
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
                Based on current Austin market data, sellers in premium neighborhoods are benefiting from limited inventory and sustained buyer demand. Homes in <Link to="/communities/westlake-hills" className="text-foreground underline hover:text-muted-foreground">West lake Hills</Link>, <Link to="/communities/barton-creek" className="text-foreground underline hover:text-muted-foreground">Barton Creek</Link>, and <Link to="/communities/lake-austin" className="text-foreground underline hover:text-muted-foreground">Lake Austin</Link> that are properly staged and strategically priced continue to achieve strong results.
              </p>
              <p>
                From recent transactions in the area, we're seeing the strongest outcomes for sellers who invest in professional marketing, including cinematic video, HDR photography, and custom property websites. The difference between a standard listing and a premium-marketed listing is measurable in both days on market and final sale price. Review our <Link to="/austin-luxury-market-report" className="text-foreground underline hover:text-muted-foreground">Austin luxury market report</Link> for current data.
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
              { q: "How long does it take to sell a luxury home in Austin?", a: "Well-priced luxury homes in Austin typically sell within 30–90 days depending on neighborhood, price point, and condition. Homes in West lake Hills, Barton Creek, and Tarrytown that are move-in ready and strategically priced often sell faster." },
              { q: "What does it cost to sell a home in Austin Texas?", a: "Typical seller costs include agent commissions, title insurance, property taxes prorated to closing, and any repairs or staging. In Texas, sellers also provide a survey and pay for an owner's title policy." },
              { q: "Should I sell my Austin home off-market?", a: "Off-market sales offer privacy and the ability to test pricing without public days-on-market accumulation. They're ideal for high-profile sellers or unique luxury properties. Echelon Property Group helps sellers evaluate which approach best serves their goals." },
              { q: "How should I prepare my Austin home for sale?", a: "Key preparation steps include professional staging, decluttering, addressing deferred maintenance, fresh paint, and landscaping. For luxury homes, professional photography, cinematic video, drone footage, and a custom property website are essential." },
              { q: "What marketing does Echelon Property Group provide for listings?", a: "Every listing receives professional HDR photography, cinematic video, drone footage, 3-D virtual tours, a custom property website, targeted digital advertising, and syndication to 500+ listing platforms. Luxury listings also receive private broker previews and global network exposure through eXp Luxury Division." },
              { q: "Is now a good time to sell a luxury home in Austin?", a: "Austin's luxury inventory remains limited in top neighborhoods, creating favorable conditions for well-positioned sellers. Based on current market data, properly priced homes in West lake Hills, Barton Creek, and Lake Austin are achieving strong results with motivated buyers." },
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
              <Link to="/sell" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SELLER GUIDE</Link>
              <Link to="/private-opportunities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ PRIVATE OPPORTUNITIES</Link>
              <Link to="/blog" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ BLOG & MARKET INSIGHTS</Link>
              <Link to="/listings" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ CURRENT LISTINGS</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Inline Home Valuation (RealScout), bottom of page ── */}
      <section
        id="home-valuation"
        className="py-20 md:py-24"
        style={{ background: "#f6f4f0", scrollMarginTop: "6rem" }}
      >
        <div className="mx-auto px-6" style={{ maxWidth: "980px" }}>
          {/* Ornamental gold divider */}
          <div className="flex items-center justify-center gap-3 mb-9 md:mb-10" aria-hidden="true">
            <span className="block h-px w-16 md:w-20" style={{ background: "linear-gradient(to right, transparent, #b9a06c)" }} />
            <span className="block h-1.5 w-1.5 rotate-45" style={{ background: "#b9a06c" }} />
            <span className="block h-px w-6" style={{ background: "#b9a06c" }} />
            <span className="block h-2 w-2 rotate-45 border" style={{ borderColor: "#b9a06c" }} />
            <span className="block h-px w-6" style={{ background: "#b9a06c" }} />
            <span className="block h-1.5 w-1.5 rotate-45" style={{ background: "#b9a06c" }} />
            <span className="block h-px w-16 md:w-20" style={{ background: "linear-gradient(to left, transparent, #b9a06c)" }} />
          </div>

          <div className="max-w-[780px] mx-auto text-center mb-8 md:mb-10">
            <p className="text-minimal text-gold mb-4">COMPLIMENTARY VALUATION</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-normal text-primary leading-[1.1] mb-4 text-balance">
              What's Your Austin Home Worth?
            </h2>
            <p className="text-foreground/65 leading-relaxed max-w-2xl mx-auto text-base md:text-lg text-balance">
              A discreet, data-backed estimate informed by recent comparable sales and our private transaction insights.
            </p>
          </div>

          <style>{`
            #home-valuation realscout-home-value {
              --rs-hvw-background-color: hsl(var(--background));
              --rs-hvw-title-color: hsl(var(--foreground));
              --rs-hvw-subtitle-color: hsl(var(--muted-foreground));
              --rs-hvw-primary-button-text-color: hsl(var(--primary-foreground));
              --rs-hvw-primary-button-color: hsl(var(--primary));
              --rs-hvw-secondary-button-text-color: hsl(var(--primary));
              --rs-hvw-secondary-button-color: transparent;
              --rs-hvw-widget-width: min(100%, 940px);
              display: block;
              width: 100%;
              margin-left: auto !important;
              margin-right: auto !important;
              background: transparent;
            }
            #home-valuation .rs-widget-wrap {
              width: 100%;
              max-width: 940px;
              margin-left: auto;
              margin-right: auto;
            }
            #home-valuation realscout-home-value .wmhw-card {
              width: 100% !important;
              margin-inline: 0 !important;
              padding: 1.5rem !important;
              background: hsl(var(--background)) !important;
              border: 1px solid hsl(var(--border)) !important;
              border-radius: 6px !important;
              box-shadow: 0 10px 24px -24px hsl(var(--foreground) / 0.18) !important;
            }
            #home-valuation realscout-home-value .MuiInputBase-root,
            #home-valuation realscout-home-value .react-tel-input .form-control,
            #home-valuation realscout-home-value .react-select__control {
              min-height: 58px !important;
            }
            #home-valuation realscout-home-value .wmhw-primary-button {
              font-size: 14px !important;
            }
            @media (max-width: 768px) {
              #home-valuation .rs-widget-wrap {
                max-width: 100%;
              }
              #home-valuation realscout-home-value .wmhw-card {
                padding: 1.125rem !important;
              }
            }
          `}</style>
          <div
            id="home-valuation-widget"
            className="rs-widget-wrap"
            dangerouslySetInnerHTML={{
              __html:
                '<realscout-home-value disable-shadow-dom agent-encoded-id="QWdlbnQtMjg5NDU2" include-name include-phone remove-title remove-subtitle></realscout-home-value>',
            }}
          />

          <p className="text-center text-[11px] tracking-wide text-foreground/40 mt-4 max-w-md mx-auto">
            Your information is kept strictly confidential.
          </p>
        </div>
      </section>

      {/* ── Thin gold divider ── */}
      <div className="h-[2px] bg-gold" />

      <FeaturedCommunities />

      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>

    </div>);

};

export default Sell;