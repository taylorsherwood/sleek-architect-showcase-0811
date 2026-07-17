import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, {
  createFAQSchema,
  createBreadcrumbSchema,
  organizationSchema,
} from "@/components/SchemaMarkup";
import OptimizedImage from "@/components/OptimizedImage";
import ScrollReveal from "@/components/ScrollReveal";
import taylorHeadshot from "@/assets/taylor-headshot.webp";
import { blogPosts } from "@/data/blogPosts";
import { communityPages } from "@/data/communityData";
import { taylorStats, taylorFeaturedMedia } from "@/config/taylorStats";

const Footer = lazy(() => import("@/components/Footer"));
const Testimonials = lazy(() => import("@/components/Testimonials"));

const SITE = "https://www.echelonpropertygroup.com";
const PAGE_URL = `${SITE}/taylor-sherwood`;
const HEADSHOT_URL = `${SITE}/lovable-uploads/taylor-headshot-widget.jpg`;

const meetTaylor = [
  "Some agents pick a lane. Taylor Sherwood built a practice on refusing to.",
  "For more than a decade, Taylor has worked the Austin market from every side of the table: luxury residences in Barton Creek and Westlake, multifamily and commercial assets, raw land and ranch acreage, and development deals most residential agents would not know how to underwrite. That range is not a marketing claim. It is the product of more than eleven years and over $150 million in closed transactions across nearly every property type Central Texas offers.",
  "The through line is an investor's discipline. Taylor built his reputation, and the Investor Broker identity that follows him across platforms, on the idea that every property is an asset first. A homestead in Tarrytown and a forty unit multifamily deal deserve the same rigor: real comparables, honest underwriting, and a clear-eyed read on where the market is going rather than where it has been. Clients hire him for advice that survives contact with a spreadsheet.",
  "That discipline shows up most in the work fewest people see. A meaningful share of Taylor's business happens off market: private sales for owners who value discretion, quiet acquisitions for buyers who cannot find what they want on the MLS, and land assemblages that only come together through relationships. Austin's most interesting real estate rarely gets a yard sign.",
  "Echelon Property Group grew out of that practice. Founded by Taylor Sherwood and brokered by EXP COMMERCIAL, the team was built to deliver institutional grade analysis with boutique level attention, whether the assignment is positioning a three million dollar residence, marketing a development tract, or advising an investor on a first acquisition. The philosophy is simple and unfashionable: tell clients the truth, put the numbers on the table, and protect their position like it is his own.",
];

const expertise: Array<{ title: string; body: string; to: string }> = [
  { title: "Luxury Homes", body: "Strategic pricing, positioning, and discreet marketing for Austin's finest residences.", to: "/austin-luxury-homes-for-sale" },
  { title: "Commercial Real Estate", body: "Multifamily, retail, and owner user assets, underwritten like an investor because your broker is one.", to: "/listings/commercial-investment-austin" },
  { title: "Land & Ranch", body: "Acreage, ranches, and rural holdings across Central Texas, from feasibility to closing.", to: "/land-ranch" },
  { title: "Development", body: "Site selection, entitlement strategy, and disposition for builders and developers.", to: "/austin-land-development-opportunities" },
  { title: "Investment Properties", body: "Acquisitions and dispositions built on real underwriting, not listing photos.", to: "/invest" },
  { title: "Off Market Representation", body: "Private sales and quiet acquisitions for clients who value discretion.", to: "/off-market-real-estate-austin" },
];

const philosophy = [
  "Most of the industry is optimized for transactions. Taylor Sherwood optimizes for outcomes, and the difference shows up in the first conversation. Clients get candor over comfort: a real pricing discussion backed by data, net proceeds math before a signature, and an honest read on timing even when the honest read is wait.",
  "Every engagement starts with strategy. A listing gets a preparation plan, a positioning thesis, and a negotiation posture before it gets a sign. An acquisition gets underwriting, not enthusiasm. The goal is never to win the listing or force the deal. The goal is to be right, because clients remember who was right.",
  "The relationships run on a long horizon. Taylor's clients work with him across market cycles, asset classes, and stages of life, from a first home to a portfolio. They get discretion when it matters, straight answers when it counts, and direct access to Taylor rather than a hand off to a team member they have never met.",
];

const affiliations = ["EXP COMMERCIAL", "eXp Luxury", "CLHMS", "ALN", "TAN", "Commission Clubhouse"];

const faqs = [
  { question: "Who is Taylor Sherwood?", answer: "Taylor Sherwood is an Austin, Texas REALTOR and the founder of Echelon Property Group, a luxury and investment real estate practice brokered by EXP COMMERCIAL. He has more than a decade of experience and over $150 million in career sales across luxury residential, commercial, land, and investment transactions." },
  { question: "What areas does Taylor Sherwood serve?", answer: "Taylor serves the greater Austin area with a primary focus on Travis County, including Barton Creek, Westlake, Tarrytown, and central Austin, along with Williamson and Hays Counties, the Lake Travis corridor, Bee Cave, Lakeway, Dripping Springs, and Horseshoe Bay." },
  { question: "What types of real estate does Taylor Sherwood specialize in?", answer: "Taylor works across luxury homes, commercial real estate, land and ranch properties, development opportunities, and investment properties, along with private off market representation for both buyers and sellers." },
  { question: "Is Taylor Sherwood a licensed REALTOR in Texas?", answer: "Yes. Taylor holds an active Texas real estate license, TREC #734520, and practices under the EXP COMMERCIAL brokerage as founder of Echelon Property Group." },
  { question: "What is Echelon Property Group?", answer: "Echelon Property Group is an Austin based luxury and investment real estate practice founded by Taylor Sherwood. The firm represents buyers, sellers, investors, and developers across residential, commercial, and land transactions in Central Texas." },
  { question: "How does Taylor Sherwood price a luxury home in Austin?", answer: "Pricing starts with data: closed and competing comparables, absorption in the specific submarket, and a net proceeds analysis so sellers see the actual outcome of each pricing scenario. Positioning and preparation are set before the property ever reaches the market." },
  { question: "Does Taylor Sherwood handle commercial real estate?", answer: "Yes. Taylor represents buyers and sellers of multifamily, retail, flex, and owner user commercial assets, with full underwriting including rent rolls, operating statements, and stabilized return analysis." },
  { question: "Can Taylor help me buy or sell land or ranch property?", answer: "Yes. Taylor represents acreage, ranch, and rural land transactions across Central Texas, including feasibility, utilities, access, and entitlement considerations that determine what a tract is actually worth." },
  { question: "What is off market representation?", answer: "Off market representation is the private sale or acquisition of a property without public marketing. Taylor runs discreet processes for owners who value privacy and sources unlisted opportunities for qualified buyers through a network built over more than a decade in Austin." },
  { question: "Does Taylor Sherwood work with real estate investors?", answer: "Yes. Investment work is core to the practice, from single acquisitions to portfolio strategy, including value-add underwriting, 1031 exchange timelines, and fix and flip partnerships." },
  { question: "What should sellers expect when listing with Taylor Sherwood?", answer: "Sellers get a strategy before a signature: a pricing analysis, a preparation and marketing plan, and clear expectations for timeline and negotiation. Communication is direct and ongoing through closing." },
  { question: "What is it like to buy a home with Taylor Sherwood?", answer: "Buyers get honest evaluation of every property, including the ones to walk away from, along with negotiation grounded in comparables and condition rather than emotion. For luxury and off market searches, Taylor also sources properties that never reach the public market." },
  { question: "How do I schedule a consultation with Taylor Sherwood?", answer: "Call or text 512-661-3843, email taylor@echelonpropertygroup.com, or use the consultation form on this site. Consultations are confidential and carry no obligation." },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${PAGE_URL}#person`,
  name: "Taylor Sherwood",
  givenName: "Taylor",
  familyName: "Sherwood",
  jobTitle: "Founder and REALTOR",
  description: "Taylor Sherwood is an Austin, Texas REALTOR and the founder of Echelon Property Group, specializing in luxury homes, commercial real estate, land and ranch, development, investment properties, and off market representation.",
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  image: HEADSHOT_URL,
  telephone: "+1-512-661-3843",
  email: "mailto:taylor@echelonpropertygroup.com",
  worksFor: { "@id": `${SITE}/#organization` },
  founder: { "@id": `${SITE}/#organization` },
  address: {
    "@type": "PostalAddress",
    streetAddress: "2105 East MLK Jr Blvd Ste 227",
    addressLocality: "Austin",
    addressRegion: "TX",
    postalCode: "78702",
    addressCountry: "US",
  },
  identifier: { "@type": "PropertyValue", propertyID: "TREC License Number", value: "734520" },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "license",
    name: "Texas Real Estate License, TREC #734520",
    recognizedBy: { "@type": "Organization", name: "Texas Real Estate Commission" },
  },
  memberOf: [
    { "@type": "Organization", name: "EXP COMMERCIAL" },
    { "@type": "Organization", name: "eXp Luxury" },
    { "@type": "Organization", name: "Institute for Luxury Home Marketing, CLHMS" },
    { "@type": "Organization", name: "ALN" },
    { "@type": "Organization", name: "TAN" },
    { "@type": "Organization", name: "Commission Clubhouse" },
  ],
  knowsAbout: [
    "Austin luxury real estate",
    "Commercial real estate",
    "Multifamily investment properties",
    "Land and ranch properties",
    "Real estate development",
    "Off market real estate transactions",
    "Investment property underwriting",
    "Barton Creek real estate",
    "Westlake real estate",
    "Central Texas real estate",
  ],
  areaServed: [
    { "@type": "City", name: "Austin" },
    { "@type": "AdministrativeArea", name: "Travis County" },
    { "@type": "AdministrativeArea", name: "Williamson County" },
    { "@type": "AdministrativeArea", name: "Hays County" },
    { "@type": "City", name: "Bee Cave" },
    { "@type": "City", name: "Lakeway" },
    { "@type": "City", name: "Dripping Springs" },
    { "@type": "City", name: "West Lake Hills" },
    { "@type": "City", name: "Horseshoe Bay" },
  ],
  sameAs: [
    "https://www.instagram.com/theinvestorbroker/",
    "https://www.zillow.com/profile/TaylorSherwood512/",
    "https://www.search.unlockmls.com/realtor/agents/Taylor-Sherwood/734520",
    "https://www.linkedin.com/in/taylorsherwood/",
    "https://www.realtor.com/realestateagents/5e50ed9a4cb1520012995024",
  ],
};

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Home", url: `${SITE}/` },
  { name: "Taylor Sherwood", url: PAGE_URL },
]);

const faqSchema = createFAQSchema(faqs);

const orgWithFounder = {
  ...organizationSchema,
  founder: { "@id": `${PAGE_URL}#person` },
};

const formatStat = (s: (typeof taylorStats)[number]) =>
  `${s.prefix ?? ""}${s.value}${s.suffix ?? ""}`;

const CountUpStat = ({ stat }: { stat: (typeof taylorStats)[number] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState<number>(1);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = stat.value;
    const duration = 1600;

    const animate = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const start = performance.now();
      const from = 1;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.round(from + (target - from) * eased);
        setDisplay(value);
        if (t < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDisplay(1);
            animate();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [stat.value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-display font-normal text-architectural mb-2">
      {stat.prefix ?? ""}{display}{stat.suffix ?? ""}
    </div>
  );
};

const latestPosts = [...blogPosts]
  .filter((p) => p.date)
  .sort((a, b) => (b.date > a.date ? 1 : -1))
  .slice(0, 3);

const featuredCommunities = communityPages.slice(0, 6);

const TaylorSherwood = () => {
  const visibleStats = taylorStats.filter((s) => s.value > 0);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        fullTitle="Taylor Sherwood | Austin Luxury Realtor | Echelon Property Group"
        description="Meet Taylor Sherwood, Austin luxury REALTOR and founder of Echelon Property Group. Luxury homes, commercial real estate, land, and off market representation."
        author="Taylor Sherwood"
        canonical="/taylor-sherwood"
        ogType="profile"
        ogImage={HEADSHOT_URL}
      />
      <SchemaMarkup schema={personSchema} />
      <SchemaMarkup schema={orgWithFounder} />
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={faqSchema} />

      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <p className="text-minimal text-gold mb-6 tracking-[0.25em]">FOUNDER, ECHELON PROPERTY GROUP</p>
              <h1 className="text-4xl md:text-6xl font-display font-normal text-architectural leading-[1.05] tracking-[0.02em] mb-6">
                Taylor Sherwood
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Founder of Echelon Property Group, specializing in Austin luxury homes, commercial real estate, land and ranch properties, development opportunities, and private off market representation.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center px-7 py-3 bg-foreground text-background text-[0.65rem] tracking-[0.25em] uppercase font-medium hover:bg-gold transition-colors duration-300"
                >
                  Schedule a Consultation
                </Link>
                <Link
                  to="/communities"
                  className="group inline-flex items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase font-medium text-foreground hover:text-gold transition-colors duration-300"
                >
                  Explore Austin Communities
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-[4/5] overflow-hidden">
                <OptimizedImage
                  src={taylorHeadshot}
                  alt="Taylor Sherwood, founder of Echelon Property Group and Austin luxury REALTOR"
                  title="Taylor Sherwood, Austin luxury REALTOR"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover object-[50%_25%]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Taylor */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <p className="text-minimal text-gold mb-4 tracking-[0.25em]">BIOGRAPHY</p>
              <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural leading-[1.1] mb-10">
                Meet Taylor
              </h2>
            </ScrollReveal>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              {meetTaylor.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-14">
                <p className="text-minimal text-gold mb-4 tracking-[0.25em]">PRACTICE</p>
                <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural leading-[1.1]">
                  Areas of Expertise
                </h2>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {expertise.map((e) => (
                <Link
                  key={e.title}
                  to={e.to}
                  className="group border border-border/40 p-8 hover:border-gold transition-colors duration-300 bg-background"
                >
                  <h3 className="text-xl font-display font-medium text-foreground mb-3 group-hover:text-gold transition-colors duration-300">
                    {e.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{e.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* By The Numbers */}
      {visibleStats.length > 0 && (
        <section className="py-20 md:py-28 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-14">
                  <p className="text-minimal text-gold mb-4 tracking-[0.25em]">TRACK RECORD</p>
                  <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural leading-[1.1]">
                    By The Numbers
                  </h2>
                </div>
              </ScrollReveal>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
                {visibleStats.map((s) => (
                  <div key={s.label} className="text-center border-t border-border/40 pt-6">
                    <CountUpStat stat={s} />
                    <p className="text-minimal text-muted-foreground tracking-[0.2em]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Professional Affiliations */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-minimal text-gold mb-4 tracking-[0.25em]">AFFILIATIONS</p>
            <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural mb-10">
              Professional Affiliations
            </h2>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
              {affiliations.map((a) => (
                <span key={a} className="text-minimal text-foreground/70 tracking-[0.2em]">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Media */}
      {taylorFeaturedMedia.length > 0 && (
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <p className="text-minimal text-gold mb-4 tracking-[0.25em]">IN THE PRESS</p>
                <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural leading-[1.1]">Featured Media</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {taylorFeaturedMedia.map((m) => (
                  <a key={m.url} href={m.url} target="_blank" rel="noopener noreferrer" className="group border border-border/40 p-6 hover:border-gold transition-colors duration-300">
                    <p className="text-minimal text-gold tracking-[0.2em] mb-3 uppercase">{m.type}</p>
                    <h3 className="text-lg font-display text-foreground group-hover:text-gold transition-colors duration-300 mb-2">{m.title}</h3>
                    <p className="text-sm text-muted-foreground">{m.source}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Client Philosophy */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <p className="text-minimal text-gold mb-4 tracking-[0.25em]">APPROACH</p>
              <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural leading-[1.1] mb-10">
                Client Philosophy
              </h2>
            </ScrollReveal>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              {philosophy.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>




      {/* Latest Market Intelligence */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
                <div>
                  <p className="text-minimal text-gold mb-4 tracking-[0.25em]">JOURNAL</p>
                  <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural leading-[1.1]">
                    Latest Market Intelligence
                  </h2>
                </div>
                <Link to="/blog" className="text-minimal text-foreground hover:text-gold transition-colors duration-300">
                  VIEW ALL ARTICLES →
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="group block bg-background border border-border/40 hover:border-gold transition-colors duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <OptimizedImage
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      width={600}
                      height={450}
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-minimal text-gold tracking-[0.2em] mb-3">{post.category}</p>
                    <h3 className="text-lg font-display text-foreground group-hover:text-gold transition-colors duration-300 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-3">By Taylor Sherwood · {post.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Communities */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
                <div>
                  <p className="text-minimal text-gold mb-4 tracking-[0.25em]">NEIGHBORHOODS</p>
                  <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural leading-[1.1]">
                    Featured Communities
                  </h2>
                </div>
                <Link to="/communities" className="text-minimal text-foreground hover:text-gold transition-colors duration-300">
                  VIEW ALL COMMUNITIES →
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {featuredCommunities.map((c) => (
                <Link
                  key={c.slug}
                  to={`/communities/${c.slug}`}
                  className="group text-center border border-border/40 py-6 px-4 hover:border-gold transition-colors duration-300"
                >
                  <h3 className="font-display text-base md:text-lg text-foreground group-hover:text-gold transition-colors duration-300 mb-1">
                    {c.name}
                  </h3>
                  <p className="text-xs text-muted-foreground/70 tracking-widest">{c.priceRange}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* FAQ */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-14">
                <p className="text-minimal text-gold mb-4 tracking-[0.25em]">FAQ</p>
                <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural leading-[1.1]">
                  Frequently Asked Questions
                </h2>
              </div>
            </ScrollReveal>
            <div className="divide-y divide-border/40 border-t border-b border-border/40">
              {faqs.map((f, i) => (
                <details key={i} className="group py-6">
                  <summary className="flex justify-between items-start cursor-pointer list-none">
                    <h3 className="text-lg font-display text-foreground pr-6 group-hover:text-gold transition-colors duration-300">
                      {f.question}
                    </h3>
                    <span className="text-gold text-2xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-minimal text-gold mb-4 tracking-[0.25em]">CONTACT</p>
            <h2 className="text-3xl md:text-5xl font-display font-normal text-architectural leading-[1.1] mb-6">
              Work With Taylor
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
              Whether you are selling a luxury home, sourcing an investment, or exploring an off market opportunity, the first conversation is simple and confidential.
            </p>
            <div className="flex flex-col items-center justify-center gap-y-4 mb-10">
              <a href="tel:+15126613843" className="text-foreground hover:text-gold transition-colors duration-300 font-display text-lg">
                &nbsp; &nbsp; &nbsp;512-661-3843&nbsp;
              </a>
              <a href="mailto:taylor@echelonpropertygroup.com" className="text-foreground hover:text-gold transition-colors duration-300 font-display text-lg">
                taylor@echelonpropertygroup.com
              </a>
              <a 
                href="https://www.instagram.com/theinvestorbroker/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-foreground hover:text-gold transition-colors duration-300 font-display text-lg"
              >
                ·@TheInvestorbroker
              </a>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background text-minimal tracking-[0.2em] hover:bg-gold transition-colors duration-300"
            >
              SCHEDULE A CONSULTATION
            </Link>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[200px]" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default TaylorSherwood;
