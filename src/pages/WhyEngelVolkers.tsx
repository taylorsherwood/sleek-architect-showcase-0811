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
      <main className="pt-40 md:pt-44">
        <section className="container mx-auto px-6 md:px-10 pb-14 md:pb-20">
          <p className="text-sm text-gold mb-6">OUR BROKERAGE</p>
          <div className="grid lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-20 items-end">
            <div>
              <h1 className="font-display font-normal text-4xl md:text-6xl leading-tight">Why Engel & Völkers</h1>
              <div className="h-px w-16 bg-gold mt-8" />
            </div>
            <p className="text-lg font-light leading-relaxed max-w-lg">The perspective of a global brand. The judgment of a local advisor. Echelon Property Group is brokered by Engel & Völkers Austin.</p>
          </div>
        </section>

        <div className="container mx-auto px-6 md:px-10">
          {showVideo ? (
            <video src={heroVideo.url} poster={heroPoster.url} autoPlay muted loop playsInline preload="metadata" aria-label="Engel & Völkers brand film" className="w-full aspect-[16/9] md:aspect-[21/9] object-cover" />
          ) : (
            <img src={heroPoster.url} alt="Engel & Völkers brand film" className="w-full aspect-[16/9] md:aspect-[21/9] object-cover" width={1600} height={900} fetchPriority="high" />
          )}
        </div>
        <div className="h-12 md:h-20" aria-hidden="true" />

        <section className="container mx-auto px-6 md:px-10 py-8 md:py-12">
          <div className="grid md:grid-cols-[.65fr_1.35fr] gap-10 md:gap-20">
            <div>
              <p className="text-sm text-gold mb-5">01 / BRAND IDENTITY</p>
              <h2 className="font-display font-normal text-3xl md:text-4xl leading-tight">A recognizable standard.</h2>
            </div>
            <div className="max-w-2xl space-y-6">
              <img src={brokerageLogo.url} alt="Engel & Völkers, Echelon Property Group" className="w-72 md:w-80 max-w-full h-auto object-cover mx-auto mb-10" width={1320} height={580} loading="lazy" />
              <p className="text-lg font-light leading-relaxed">Founded in Hamburg in 1977, Engel & Völkers grew from a European real estate business into an international network of local shops and advisors. Its first shop outside Germany opened in Mallorca in 1990, followed by U.S. franchising in 2013.</p>
              <p className="text-base leading-relaxed text-muted-foreground">The distinctive wordmark and villa emblem are part of a consistent identity, refined globally in 2023. Behind that presentation is a commitment to competency, personal service, and advisors who pair precise market knowledge with considered care.</p>
              <p className="text-base leading-relaxed text-muted-foreground">For Echelon Property Group, that affiliation supports an Austin-centered practice. Neighborhood knowledge, property-specific advice, and a direct relationship with your advisor remain at the heart of every engagement.</p>
              <Button variant="link" asChild className="px-0 font-normal text-foreground hover:text-gold"><Link to="/about">Meet the team<ArrowUpRight strokeWidth={1} /></Link></Button>
            </div>
          </div>
        </section>
        <div className="h-12 md:h-20" aria-hidden="true" />

        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <img src={editorial.url} alt="GG Magazine covers and editorial presentation" className="w-full aspect-[4/3] object-cover" width={1200} height={900} loading="lazy" />
            <div>
              <p className="text-sm text-gold mb-5">02 / MARKETING REACH</p>
              <h2 className="font-display font-normal text-3xl md:text-4xl leading-tight mb-7">Beyond a listing.</h2>
              <p className="text-lg font-light leading-relaxed mb-6">Engel & Völkers reports a global network of more than 16,000 real estate professionals across over 30 countries. That network supports referral relationships beyond Austin, while local advice determines how each property is positioned.</p>
              <div className="space-y-6">
                <div><h3 className="font-display text-lg font-normal mb-2">Digital & international</h3><p className="text-muted-foreground leading-relaxed">The brokerage's property platform presents homes by location and lifestyle, including waterfront, golf, ranch, and equestrian properties. Its advisor network adds cross-market referral opportunities. Exposure is selected for the property, not promised as a one-size-fits-all package.</p></div>
                <div><h3 className="font-display text-lg font-normal mb-2">Print & editorial</h3><p className="text-muted-foreground leading-relaxed">GG Magazine, the brand's Global Guide, brings architecture, design, and lifestyle into an editorial setting. For Echelon Property Group, that perspective informs photography, print materials, and a coherent property story; editorial placement is not guaranteed.</p></div>
                <div><h3 className="font-display text-lg font-normal mb-2">Local presence</h3><p className="text-muted-foreground leading-relaxed">Austin relationships, property tours, advisor outreach, and on-the-ground marketing give the broader network a local point of connection.</p></div>
                <div><h3 className="font-display text-lg font-normal mb-2">Development expertise</h3><p className="text-muted-foreground leading-relaxed">Established in 2019, Engel & Völkers Development Services serves builders, developers, and investors. The brokerage describes a division spanning five continents and representing more than 500 projects, from townhome communities to mixed-use high-rises.</p></div>
              </div>
              <Button variant="link" asChild className="px-0 mt-7 font-normal text-foreground hover:text-gold"><Link to="/sell">Explore our seller marketing<ArrowUpRight strokeWidth={1} /></Link></Button>
              <p className="text-xs leading-relaxed text-muted-foreground mt-5">Network and development figures reported by Engel & Völkers, reviewed November 16, 2026.</p>
            </div>
          </div>
          <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-border grid md:grid-cols-2 gap-6 md:gap-14 lg:gap-20 items-start">
            <h3 className="font-display text-xl md:text-2xl leading-relaxed font-normal max-w-sm">A service standard<br className="hidden md:block" /> with substance.</h3>
            <div className="max-w-xl">
              <p className="text-base text-muted-foreground leading-relaxed">Engel & Völkers describes its professionals as trusted advisors, not simply agents. Its stated commitments include fair housing, inclusion, environmental responsibility, and support for Special Olympics.</p>
              <p className="text-base text-muted-foreground leading-relaxed mt-4">Echelon Property Group brings that advisory perspective to local pricing, negotiation, and the decisions that matter to your transaction.</p>
              <Button variant="link" asChild className="px-0 mt-6 h-auto py-2 font-normal text-foreground hover:text-gold whitespace-normal text-left justify-start"><a href="https://www.evrealestate.com/en/company/about-us" target="_blank" rel="noopener noreferrer">Explore the brokerage’s story<ArrowUpRight className="shrink-0" strokeWidth={1} /></a></Button>
            </div>
          </div>
        </section>
        <div className="h-12 md:h-20" aria-hidden="true" />

        <section className="container mx-auto px-6 md:px-10 py-8 md:py-12">
          <p className="text-sm text-gold mb-5">03 / SALES APPROACH</p>
          <h2 className="font-display font-normal text-3xl md:text-4xl leading-tight mb-12">Strategy, not spectacle.</h2>
          <div className="grid md:grid-cols-3 gap-10 md:gap-14">
            {approach.map((item, index) => <div key={item.title}>
              <p className="text-gold text-sm mb-5">0{index + 1}</p>
              <h3 className="font-display text-xl font-normal mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </div>)}
          </div>
        </section>
        <div className="h-12 md:h-20" aria-hidden="true" />
        <EvWaveBand />

        <section className="relative overflow-hidden bg-primary text-primary-foreground py-16 md:py-20">
          <div className="container mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 items-center relative z-10">
            <div><p className="text-gold text-sm mb-5">ECHELON PROPERTY GROUP</p><h2 className="font-display text-3xl md:text-4xl font-normal leading-tight">Global perspective.<br />Austin, understood.</h2></div>
            <div className="max-w-lg"><p className="text-lg font-light leading-relaxed mb-8">Tell us about your property and your priorities. We will help you consider the right next move.</p><Button variant="outline" asChild className="rounded-none border-gold bg-transparent text-primary-foreground hover:bg-background hover:text-foreground"><Link to="/contact">Start a conversation<ArrowUpRight strokeWidth={1} /></Link></Button></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}