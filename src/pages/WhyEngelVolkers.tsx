import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema } from "@/components/SchemaMarkup";
import { Button } from "@/components/ui/button";
import wordmark from "@/assets/engel-volkers-wordmark.svg.asset.json";
import editorial from "@/assets/gg-magazine-editorial.webp.asset.json";
import soldSign from "@/assets/local-presence-sold-sign.webp.asset.json";

const approach = [
  { title: "Position before promotion", text: "We begin with the property, its likely buyer, and the current market. Pricing, preparation, photography, and the launch sequence work together, rather than as separate decisions." },
  { title: "Choose the right exposure", text: "A public launch and a private sale serve different priorities. We help you weigh visibility against discretion, then select the channels and timing that fit your objectives." },
  { title: "Advise through the close", text: "An offer is more than its headline price. We evaluate terms, financing, contingencies, and timing, then guide negotiation and the details that follow." },
];

export default function WhyEngelVolkers() {
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
          <img src={soldSign.url} alt="Engel & Völkers sold sign in front of a residential property" className="w-full aspect-[16/9] md:aspect-[21/9] object-cover" width={1366} height={768} fetchPriority="high" />
        </div>
        <div className="h-12 md:h-20" aria-hidden="true" />

        <section className="container mx-auto px-6 md:px-10 py-8 md:py-12">
          <div className="grid md:grid-cols-[.65fr_1.35fr] gap-10 md:gap-20">
            <div>
              <p className="text-sm text-gold mb-5">01 / BRAND IDENTITY</p>
              <h2 className="font-display font-normal text-3xl md:text-4xl leading-tight">A recognizable standard.</h2>
            </div>
            <div className="max-w-2xl space-y-6">
              <img src={wordmark.url} alt="Engel & Völkers" className="w-56 md:w-72 h-auto object-cover mb-10 -translate-x-3 md:-translate-x-4" width={543} height={119} loading="lazy" />
              <p className="text-lg font-light leading-relaxed">Engel & Völkers brings a consistent visual identity to real estate: the distinctive wordmark, the villa emblem, and a presentation that places the property first. The brand connects local real estate shops with an international network of advisors.</p>
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
              <p className="text-lg font-light leading-relaxed mb-6">A distinctive home needs more than distribution. It needs a clear story, careful presentation, and a considered path to the people most likely to value it.</p>
              <div className="space-y-6">
                <div><h3 className="font-display text-lg font-normal mb-2">Digital & international</h3><p className="text-muted-foreground leading-relaxed">The brokerage's property platform and advisor network complement local search exposure and referral relationships. Campaign choices depend on the property, audience, and listing agreement.</p></div>
                <div><h3 className="font-display text-lg font-normal mb-2">Print & editorial</h3><p className="text-muted-foreground leading-relaxed">GG Magazine connects the brand with architecture, design, and lifestyle. Editorial-quality photography and print materials carry that attention to presentation into a property's campaign.</p></div>
                <div><h3 className="font-display text-lg font-normal mb-2">Local presence</h3><p className="text-muted-foreground leading-relaxed">Austin relationships, property tours, advisor outreach, and on-the-ground marketing give the broader network a local point of connection.</p></div>
              </div>
              <Button variant="link" asChild className="px-0 mt-7 font-normal text-foreground hover:text-gold"><Link to="/sell">Explore our seller marketing<ArrowUpRight strokeWidth={1} /></Link></Button>
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

        <section className="bg-primary text-primary-foreground py-16 md:py-20">
          <div className="container mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 items-center">
            <div><p className="text-gold text-sm mb-5">ECHELON PROPERTY GROUP</p><h2 className="font-display text-3xl md:text-4xl font-normal leading-tight">Global perspective.<br />Austin, understood.</h2></div>
            <div className="max-w-lg"><p className="text-lg font-light leading-relaxed mb-8">Tell us about your property and your priorities. We will help you consider the right next move.</p><Button variant="outline" asChild className="rounded-none border-gold bg-transparent text-primary-foreground hover:bg-background hover:text-foreground"><Link to="/contact">Start a conversation<ArrowUpRight strokeWidth={1} /></Link></Button></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}