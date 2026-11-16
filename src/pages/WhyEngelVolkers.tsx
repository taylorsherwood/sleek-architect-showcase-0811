import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema } from "@/components/SchemaMarkup";
import EvWaveBand from "@/components/EvWaveBand";
import { Button } from "@/components/ui/button";
import brokerageLogo from "@/assets/brokerage-group-lockup-transparent.webp.asset.json";
import editorial from "@/assets/gg-magazine-editorial.webp.asset.json";
import heroVideo from "@/assets/brokerage-identity.mp4.asset.json";
import heroPoster from "@/assets/brokerage-identity-poster.webp.asset.json";
import advisorPortrait from "@/assets/taylor-engel-volkers-austin.webp.asset.json";

const label = "text-[0.7rem] md:text-xs tracking-[0.28em] uppercase text-gold";
const body = "text-base leading-[1.8] text-muted-foreground";
const textLink = "group inline-flex items-center gap-2 pt-4 text-xs tracking-[0.22em] uppercase text-foreground hover:text-gold transition-colors duration-300";

const reach = [
  { title: "Digital & International", text: "The brokerage's property platform presents homes by location and lifestyle, including waterfront, golf, ranch, and equestrian properties. Its advisor network adds cross-market referral opportunities. Exposure is selected for the property, not promised as a one-size-fits-all package." },
  { title: "Print & Editorial", text: "GG Magazine, the brand's Global Guide, brings architecture, design, and lifestyle into an editorial setting. For Echelon Property Group, that perspective informs photography, print materials, and a coherent property story; editorial placement is not guaranteed." },
  { title: "Local Presence", text: "Austin relationships, property tours, advisor outreach, and on-the-ground marketing give the broader network a local point of connection." },
  { title: "Development Expertise", text: "Established in 2019, Engel & Völkers Development Services serves builders, developers, and investors. The brokerage describes a division spanning five continents and representing more than 500 projects, from townhome communities to mixed-use high-rises." },
];

const approach = [
  { title: "Position before promotion", text: "We begin with the property, its likely buyer, and the current market. Pricing, preparation, photography, and the launch sequence work together, rather than as separate decisions." },
  { title: "Choose the right exposure", text: "A public launch and a private sale serve different priorities. We help you weigh visibility against discretion, then select the channels and timing that fit your objectives." },
  { title: "Advise through the close", text: "An offer is more than its headline price. We evaluate terms, financing, contingencies, and timing, then guide negotiation and the details that follow." },
];

export default function WhyEngelVolkers() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const update = () => setShowVideo(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title="Why Engel & Völkers" description="Explore the Engel & Völkers brand, international marketing network, and considered sales approach behind Echelon Property Group's Austin real estate advisory." canonical="/why-engel-volkers" />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "Meet the Team", url: "https://www.echelonpropertygroup.com/about" },
        { name: "Why Engel & Völkers", url: "https://www.echelonpropertygroup.com/why-engel-volkers" },
      ])} />
      <Navigation />
      <main className="pt-36 md:pt-44">
        <section className="container mx-auto px-6 md:px-10 pb-14 md:pb-20">
          <p className={label}>Our Brokerage</p>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-end mt-8">
            <h1 className="lg:col-span-7 font-display font-normal text-[2.5rem] md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.01em]">Why Engel&nbsp;&amp;&nbsp;Völkers</h1>
            <p className="lg:col-span-4 lg:col-start-9 text-base md:text-lg font-light leading-[1.75] text-muted-foreground">The perspective of a global brand. The judgment of a local advisor. Echelon Property Group is brokered by Engel &amp; Völkers Austin.</p>
          </div>
        </section>

        <div className="container mx-auto px-6 md:px-10">
          {showVideo ? (
            <video src={heroVideo.url} poster={heroPoster.url} autoPlay muted loop playsInline preload="metadata" aria-label="Engel & Völkers brand film" className="w-full aspect-[4/3] md:aspect-[21/9] object-cover" />
          ) : (
            <img src={heroPoster.url} alt="Engel & Völkers brand film" className="w-full aspect-[4/3] md:aspect-[21/9] object-cover" width={1600} height={900} fetchPriority="high" />
          )}
        </div>
        <div className="h-12 md:h-20" aria-hidden="true" />

        <section className="container mx-auto px-6 md:px-10 py-10 md:py-16">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-10">
            <div className="lg:col-span-4">
              <p className={label}><span className="text-foreground/50 mr-3">01</span>Brand Identity</p>
              <h2 className="font-display font-normal text-3xl md:text-[2.75rem] leading-[1.12] mt-6">A recognizable standard.</h2>
              <img src={brokerageLogo.url} alt="Engel & Völkers, Echelon Property Group" className="w-40 md:w-48 h-auto object-contain mt-10 md:mt-14" width={1320} height={580} loading="lazy" />
            </div>
            <div className="lg:col-span-6 lg:col-start-7 space-y-6 lg:pt-12">
              <p className="text-lg md:text-xl font-light leading-[1.7]">Founded in Hamburg in 1977, Engel &amp; Völkers grew from a European real estate business into an international network of local shops and advisors. Its first shop outside Germany opened in Mallorca in 1990, followed by U.S. franchising in 2013.</p>
              <p className={body}>The distinctive wordmark and villa emblem are part of a consistent identity, refined globally in 2023. Behind that presentation is a commitment to competency, personal service, and advisors who pair precise market knowledge with considered care.</p>
              <p className={body}>For Echelon Property Group, that affiliation supports an Austin-centered practice. Neighborhood knowledge, property-specific advice, and a direct relationship with your advisor remain at the heart of every engagement.</p>
              <Link to="/about" className={textLink}>Meet the team<ArrowUpRight className="h-4 w-4" strokeWidth={1} /></Link>
            </div>
          </div>
        </section>
        <div className="h-12 md:h-20" aria-hidden="true" />

        <section className="bg-secondary py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
              <div className="lg:col-span-6 lg:sticky lg:top-32">
                <img src={editorial.url} alt="GG Magazine covers and editorial presentation" className="w-full aspect-[4/5] object-cover" width={1200} height={1500} loading="lazy" />
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className={label}><span className="text-foreground/50 mr-3">02</span>Marketing Reach</p>
                <h2 className="font-display font-normal text-3xl md:text-[2.75rem] leading-[1.12] mt-6 mb-8">Beyond a listing.</h2>
                <p className="text-lg font-light leading-[1.7] mb-12">Engel &amp; Völkers reports a global network of more than 16,000 real estate professionals across over 30 countries. That network supports referral relationships beyond Austin, while local advice determines how each property is positioned.</p>
                <div>
                  {reach.map((item) => (
                    <div key={item.title} className="py-7 border-t border-foreground/10 first:border-t-0 first:pt-0">
                      <h3 className="font-display text-base md:text-lg font-normal tracking-[0.04em] mb-3">{item.title}</h3>
                      <p className="text-[0.95rem] text-muted-foreground leading-[1.8]">{item.text}</p>
                    </div>
                  ))}
                </div>
                <Link to="/sell" className={`${textLink} mt-6`}>Explore our seller marketing<ArrowUpRight className="h-4 w-4" strokeWidth={1} /></Link>
                <p className="text-xs leading-relaxed text-muted-foreground/80 mt-8">Network and development figures reported by Engel &amp; Völkers, reviewed November 16, 2026.</p>
              </div>
            </div>

            <div className="mt-20 md:mt-28 pt-12 md:pt-16 border-t border-foreground/10 grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <h3 className="lg:col-span-5 font-display text-2xl md:text-3xl leading-[1.3] font-normal">A service standard with substance.</h3>
              <div className="lg:col-span-5 lg:col-start-8 space-y-5">
                <p className={body}>Engel &amp; Völkers describes its professionals as trusted advisors, not simply agents. Its stated commitments include fair housing, inclusion, environmental responsibility, and support for Special Olympics.</p>
                <p className={body}>Echelon Property Group brings that advisory perspective to local pricing, negotiation, and the decisions that matter to your transaction.</p>
                <a href="https://www.evrealestate.com/en/company/about-us" target="_blank" rel="noopener noreferrer" className={textLink}>Explore the brokerage’s story<ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1} /></a>
              </div>
            </div>
          </div>
        </section>
        <div className="h-12 md:h-20" aria-hidden="true" />

        <section className="container mx-auto px-6 md:px-10 py-10 md:py-16">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-14 md:mb-20">
            <div className="lg:col-span-6">
              <p className={label}><span className="text-foreground/50 mr-3">03</span>Sales Approach</p>
              <h2 className="font-display font-normal text-3xl md:text-[2.75rem] leading-[1.12] mt-6">Strategy, not spectacle.</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-12 md:gap-10 lg:gap-16">
            {approach.map((item, index) => <div key={item.title} className="pt-8 border-t border-foreground/15">
              <p className="font-display text-gold text-sm tracking-[0.2em] mb-6">0{index + 1}</p>
              <h3 className="font-display text-xl md:text-[1.4rem] font-normal leading-snug mb-4">{item.title}</h3>
              <p className="text-[0.95rem] text-muted-foreground leading-[1.8]">{item.text}</p>
            </div>)}
          </div>
        </section>
        <div className="h-12 md:h-20" aria-hidden="true" />
        <EvWaveBand />

        <section className="container mx-auto px-6 md:px-10 py-10 md:py-16">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            <figure className="lg:col-span-6">
              <img src={advisorPortrait.url} alt="Taylor Sherwood outside an Engel & Völkers shop" className="w-full aspect-[4/3] object-cover" width={1152} height={864} loading="lazy" />
              <figcaption className="text-xs tracking-[0.18em] uppercase text-muted-foreground mt-5">Taylor Sherwood <span className="text-gold mx-2">/</span> Founder, Echelon Property Group</figcaption>
            </figure>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className={label}>Our Perspective</p>
              <h2 className="font-display font-normal text-3xl md:text-[2.75rem] leading-[1.12] mt-6 mb-8">The right home for our clients.</h2>
              <p className="text-lg font-light leading-[1.7] mb-6">With more than a decade in Austin real estate, over $155 million in career sales, and 200+ transactions closed, Taylor Sherwood brings experience across residential, commercial, land, and investment properties. That breadth informs how Echelon Property Group evaluates opportunities, positions properties, and negotiates for its clients.</p>
              <p className={`${body} mb-5`}>We chose Engel &amp; Völkers because its approach complements our own: thoughtful presentation, personal advisory, and relationships that extend beyond a single market. Its international referral network, property marketing resources, and editorial perspective give our team more ways to connect the right people with the right properties.</p>
              <p className={body}>For our clients, the purpose is straightforward. Keep the direct attention and Austin knowledge of our team, supported by the reach and resources of an established global brokerage. The affiliation strengthens our work without changing who is accountable to you.</p>
            </div>
          </div>
        </section>
        <div className="h-12 md:h-20" aria-hidden="true" />

        <section className="bg-primary text-primary-foreground py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-6"><p className={label}>Echelon Property Group</p><h2 className="font-display text-3xl md:text-5xl font-normal leading-[1.1] mt-6">Global perspective.<br />Austin local.</h2></div>
            <div className="lg:col-span-4 lg:col-start-9"><p className="text-base md:text-lg font-light leading-[1.75] text-primary-foreground/80 mb-8">Tell us about your property and your priorities. We will help you consider the right next move.</p><Button variant="outline" asChild className="rounded-none h-12 px-8 border-gold bg-transparent text-primary-foreground text-xs tracking-[0.2em] uppercase font-normal hover:bg-background hover:text-foreground"><Link to="/contact">Start a conversation<ArrowUpRight strokeWidth={1} /></Link></Button></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}