import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema } from "@/components/SchemaMarkup";
import EvWaveBand from "@/components/EvWaveBand";
import { Button } from "@/components/ui/button";
import brokerageLogo from "@/assets/brokerage-group-lockup-revised.webp.asset.json";
import editorial from "@/assets/gg-magazine-editorial.webp.asset.json";
import heroVideo from "@/assets/brokerage-identity.mp4.asset.json";
import heroPoster from "@/assets/brokerage-identity-poster.webp.asset.json";
import villaWhite from "@/assets/ev-villa-white.png.asset.json";
import advisorPortrait from "@/assets/taylor-engel-volkers-austin.webp.asset.json";
import shopFront from "@/assets/ev-shop-front.webp.asset.json";
import vineyard from "@/assets/ev-vineyard-advisory.webp.asset.json";
import yachting from "@/assets/ev-yachting-shop.webp.asset.json";
import privateOfficePhoto from "@/assets/ev-private-office-historic-residence.webp.asset.json";
import privateResidencesPhoto from "@/assets/ev-private-residences-issue33.webp.asset.json";
import officeInterior from "@/assets/ev-office-interior.webp.asset.json";
import developmentServices from "@/assets/ev-development-cranes.webp.asset.json";
import commercialOffice from "@/assets/ev-commercial-office.webp.asset.json";
import hillCountryRanch from "@/assets/hill-country-ranch.webp.asset.json";
import brandFilm from "@/assets/ev-brand-film.mp4.asset.json";
import "./WhyEngelVolkers.css";

const label = "text-[0.68rem] md:text-xs tracking-[0.24em] uppercase text-muted-foreground";
const h2 = "font-sans font-light text-[2rem] md:text-[2.75rem] lg:text-5xl leading-[1.1] tracking-[-0.01em]";
const body = "text-base leading-[1.75] text-muted-foreground";
const textLink = "group inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-foreground border-b border-gold pb-1 hover:text-gold transition-colors duration-300";
const facts = [
  { value: "1977", text: "Founded in Hamburg" },
  { value: "16,000+", text: "Real estate professionals" },
  { value: "30+", text: "Countries" },
  { value: "500+", text: "Development projects represented" },
];

const reach = [
  { title: "Digital & International", text: "The brokerage's property platform presents homes by location and lifestyle, including waterfront, golf, ranch, and equestrian properties. Its advisor network adds cross-market referral opportunities. Exposure is selected for the property, not promised as a one-size-fits-all package." },
  { title: "Print & Editorial", text: "GG Magazine, the brand's Global Guide, brings architecture, design, and lifestyle into an editorial setting. For Echelon Property Group, that perspective informs photography, print materials, and a coherent property story; editorial placement is not guaranteed." },
  { title: "Local Presence", text: "Austin relationships, property tours, advisor outreach, and on-the-ground marketing give the broader network a local point of connection." },
  { title: "Development Expertise", text: "Established in 2019, Engel & Völkers Development Services serves builders, developers, and investors. The brokerage describes a division spanning five continents and representing more than 500 projects, from townhome communities to mixed-use high-rises." },
];

type Specialty = {
  title: string;
  image: string;
  alt: string;
  text: string;
  href: string;
  link: string;
};

const specialties: Specialty[] = [
  { title: "Engel & Völkers Yachting", image: yachting.url, alt: "Engel & Völkers Yachting shop overlooking a marina", text: "The brand’s world extends past the shoreline. Engel & Völkers Yachting connects buyers and sellers with dedicated advisors for ownership, berthing, and life on the water.", href: "https://www.evrealestate.com/en/explore/yachting", link: "Explore Yachting" },
  { title: "Private Office", image: privateOfficePhoto.url, alt: "Historic stone residence with ornate gables along a tree-lined street", text: "A specialist network for exceptional homes. Private Office brings bespoke advisory, a privacy-first approach, and off-market opportunities, with advisors for each client’s priorities.", href: "https://www.engelvoelkers.com/private-office/en", link: "Discover Private Office" },
  { title: "Private Residences", image: privateResidencesPhoto.url, alt: "Engel & Völkers Private Residences Issue 33 magazine cover and open property spread", text: "Private Residences is Engel & Völkers’ publication, curating remarkable homes across the Americas. Architecture, setting, and lifestyle all shape each considered selection.", href: "https://www.evrealestate.com/en/private-residences", link: "Explore the publication" },
  { title: "Engel & Völkers Commercial", image: commercialOffice.url, alt: "Modern commercial building with metal cladding and a glass corner, behind a tree-lined drive", text: "Engel & Völkers Commercial combines investment expertise with local competence and global connections. Advisors work from community shops in the markets they know well.", href: "https://www.evrealestate.com/en/commercial", link: "Explore Commercial" },
  { title: "Development Services", image: developmentServices.url, alt: "Tower cranes rising above high-rises under construction against a pale sky", text: "Established in 2019, Engel & Völkers Development Services works with builders, developers, and investors on positioning, marketing, and sales across five continents and their markets.", href: "https://www.evrealestate.com/en/explore/development-services", link: "Explore Development Services" },
  { title: "Land & Ranch", image: hillCountryRanch.url, alt: "Horses grazing in a Hill Country pasture at sunset", text: "Ranch and land decisions turn on acreage, water, fences, and access. The division works with owners and buyers of working ranches and Hill Country homesites across Texas.", href: "https://www.evrealestate.com/en/lifestyle-properties/ranch", link: "Explore Land and Ranch" },
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
    <div className="min-h-screen bg-white text-foreground">
      <SEOHead title="Why Engel & Völkers" description="Explore the Engel & Völkers brand, international marketing network, and considered sales approach behind Echelon Property Group's Austin real estate advisory." canonical="/why-engel-volkers" />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "Meet the Team", url: "https://www.echelonpropertygroup.com/about" },
        { name: "Why Engel & Völkers", url: "https://www.echelonpropertygroup.com/why-engel-volkers" },
      ])} />
      <Navigation />
      <main className="ev-brokerage-content">
        <section className="relative h-[92svh] min-h-[700px] w-full overflow-hidden bg-primary">
          {showVideo ? (
            <video src={heroVideo.url} poster={heroPoster.url} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <img src={heroPoster.url} alt="" className="absolute inset-0 h-full w-full object-cover" width={1600} height={900} fetchPriority="high" />
          )}
          <div className="absolute inset-0 bg-primary/35" aria-hidden="true" />
          <div className="relative container mx-auto px-6 md:px-10 flex h-full items-center justify-center pt-10 md:pt-14 text-center text-primary-foreground">
            <div className="max-w-3xl">
              <p className="text-[0.68rem] md:text-xs tracking-[0.3em] uppercase text-primary-foreground/80">Our Brokerage</p>
              <h1 className="font-sans font-light text-[2.6rem] md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.015em] mt-6">Why Engel&nbsp;&amp;&nbsp;Völkers</h1>
              <p className="text-base md:text-lg font-light leading-[1.7] text-primary-foreground/85 mt-6 max-w-xl mx-auto">The perspective of a global brand. The judgment of a local advisor. Echelon Property Group is brokered by Engel &amp; Völkers Austin.</p>
              <img src={villaWhite.url} alt="Engel & Völkers villa emblem" className="w-32 md:w-44 h-auto object-contain mx-auto mt-20 md:mt-28" width={1600} height={664} loading="eager" />
            </div>
          </div>
        </section>

        <section className="border-b border-foreground/10">
          <div className="container mx-auto px-6 md:px-10 grid grid-cols-2 lg:grid-cols-4">
            {facts.map((f, i) => (
              <div key={f.value} className={`py-10 md:py-14 px-2 md:px-6 text-center ${i % 2 ? "border-l" : ""} ${i === 2 ? "lg:border-l" : ""} border-foreground/10 ${i > 1 ? "border-t lg:border-t-0" : ""}`}>
                <p className="font-sans font-light text-3xl md:text-[2.6rem] leading-none">{f.value}</p>
                <p className="text-[0.68rem] md:text-xs tracking-[0.18em] uppercase text-muted-foreground mt-4">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 md:px-10 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <img src={brokerageLogo.url} alt="Engel & Völkers, Echelon Property Group" className="w-44 md:w-52 h-auto object-contain mx-auto" width={1320} height={679} loading="lazy" />
            <p className={`${label} mt-14`}>Brand Identity</p>
            <h2 className={`${h2} mt-5`}>A recognizable standard.</h2>
            <p className="text-lg md:text-xl font-light leading-[1.7] mt-8">Founded in Hamburg in 1977, Engel &amp; Völkers grew from a European real estate business into an international network of local shops and advisors. Its first shop outside Germany opened in Mallorca in 1990, followed by U.S. franchising in 2013.</p>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-left mt-12">
              <p className={body}>The distinctive wordmark and villa emblem are part of a consistent identity, refined globally in 2023. Behind that presentation is a commitment to competency, personal service, and advisors who pair precise market knowledge with considered care.</p>
              <p className={body}>For Echelon Property Group, that affiliation supports an Austin-centered practice. Neighborhood knowledge, property-specific advice, and a direct relationship with your advisor remain at the heart of every engagement.</p>
            </div>
            <div className="mt-12"><Link to="/about" className={textLink}>Meet the team<ArrowUpRight className="h-4 w-4" strokeWidth={1} /></Link></div>
          </div>
        </section>

        <section className="bg-secondary">
          <div className="grid lg:grid-cols-2">
            <img src={editorial.url} alt="GG Magazine covers and editorial presentation" className="w-full h-full min-h-[420px] aspect-[4/3] lg:aspect-auto object-cover" width={1200} height={1500} loading="lazy" />
            <div className="px-6 md:px-14 lg:px-20 py-16 md:py-24 flex flex-col justify-center">
              <p className={label}>Marketing Reach</p>
              <h2 className={`${h2} mt-5 mb-8`}>Beyond a listing.</h2>
              <p className="text-lg font-light leading-[1.7]">Engel &amp; Völkers reports a global network of more than 16,000 real estate professionals across over 30 countries. That network supports referral relationships beyond Austin, while local advice determines how each property is positioned.</p>
              <div className="mt-10"><Link to="/sell" className={textLink}>Explore our seller marketing<ArrowUpRight className="h-4 w-4" strokeWidth={1} /></Link></div>
            </div>
          </div>
          <div className="container mx-auto px-6 md:px-10 py-16 md:py-24"><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10">
            {reach.map((item) => (
              <div key={item.title} className="bg-secondary py-8 sm:p-8">
                <h3 className="font-sans text-lg font-normal mb-4">{item.title}</h3>
                <p className="text-[0.92rem] text-muted-foreground leading-[1.75]">{item.text}</p>
              </div>
            ))}
          </div></div>
          <p className="container mx-auto px-6 md:px-10 pb-12 text-xs text-muted-foreground/80">Network and development figures reported by Engel &amp; Völkers, reviewed November 16, 2026.</p>
        </section>

        <div className="container mx-auto px-6 md:px-10 pb-20 md:pb-32">
          <video src={brandFilm.url} poster={shopFront.url} autoPlay muted loop controls playsInline preload="metadata" onCanPlay={(event) => { void event.currentTarget.play().catch(() => {}); }} aria-label="Engel & Völkers brand film" className="block w-full max-w-4xl mx-auto aspect-video object-cover bg-background" />
        </div>

        <EvWaveBand />

        <section className="bg-secondary">
          <div className="container mx-auto px-6 md:px-14 lg:px-20 py-16 md:py-24">
            <div className="grid lg:grid-cols-12 gap-x-8 gap-y-12 lg:gap-y-16 items-start">
              <div className="order-2 lg:order-1 lg:col-span-7 lg:pr-6">
                <p className={label}>Our Perspective</p>
                <h2 className={`${h2} mt-5 mb-8 max-w-xl`}>The right home for our clients.</h2>
                <p className="text-lg font-light leading-[1.7] max-w-2xl">With more than a decade in Austin real estate, over $155 million in career sales, and 200+ transactions closed, Taylor Sherwood brings experience across residential, commercial, land, and investment properties. That breadth informs how Echelon Property Group evaluates opportunities, positions properties, and negotiates for its clients.</p>
              </div>
              <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
                <img src={advisorPortrait.url} alt="Taylor Sherwood outside an Engel & Völkers shop" className="w-full aspect-[4/3] object-cover" width={1152} height={864} loading="lazy" />
              </div>
              <div className="order-3 lg:col-span-12 grid md:grid-cols-2 gap-8 md:gap-12">
                <p className={body}>We chose Engel &amp; Völkers because its approach complements our own: thoughtful presentation, personal advisory, and relationships that extend beyond a single market. Its international referral network, property marketing resources, and editorial perspective give our team more ways to connect the right people with the right properties.</p>
                <div>
                  <p className={body}>For our clients, the purpose is straightforward. Keep the direct attention and Austin knowledge of our team, supported by the reach and resources of an established global brokerage. The affiliation strengthens our work without changing who is accountable to you.</p>
                  <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mt-8">Taylor Sherwood <span className="text-gold mx-2">/</span> Founder, Echelon Property Group</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-6 md:px-10 pt-20 md:pt-32 pb-10 md:pb-14">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <p className={label}>The World of Engel &amp; Völkers</p>
            <h2 className={`${h2} mt-5`}>Beyond the address.</h2>
          </div>
          <div className="grid md:grid-cols-6 gap-12 md:gap-10 lg:gap-16">
            {specialties.map((item) => <div key={item.title} className="md:col-span-2 flex flex-col">
              <img src={item.image} alt={item.alt} className="w-full aspect-[4/3] object-cover mb-8" width={1200} height={900} loading="lazy" decoding="async" />
              <h3 className="font-sans text-xl md:text-[1.15rem] lg:text-[1.4rem] font-normal leading-snug mb-3">{item.title}</h3>
              <p className="text-[0.95rem] text-muted-foreground leading-[1.75] md:min-h-[11.6rem] lg:min-h-0">{item.text}</p>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={`${textLink} mt-auto pt-7 tracking-normal`}>{item.link}<ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1} /></a>
            </div>)}
          </div>
          <p className="mt-12 text-xs leading-relaxed text-muted-foreground">Specialist services are provided by the respective Engel &amp; Völkers divisions. Private Office is a distinct designation, not a representation of Echelon Property Group’s advisor status. Publication placement is not guaranteed.</p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">For a local perspective on the research, read our <Link to="/blog/wealth-preservation-luxury-real-estate-austin" className="underline underline-offset-4 hover:text-foreground transition-colors">Private Office Report 2026/27 analysis for Austin buyers and sellers</Link>.</p>
        </section>

        <section className="container mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-10 md:pb-14">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <p className={label}>Sales Approach</p>
            <h2 className={`${h2} mt-5`}>Standards. Raised.</h2>
          </div>
          <img src={vineyard.url} alt="Engel & Völkers advisor greeting clients beside a sold sign at a vineyard home" className="w-full max-w-3xl mx-auto aspect-video object-cover mb-14 md:mb-20" width={1800} height={1013} loading="lazy" decoding="async" />
          <div className="grid md:grid-cols-3 gap-12 md:gap-10 lg:gap-16">
            {approach.map((item, index) => <div key={item.title} className="pt-8 border-t border-ev-red">
              <p className="text-xs font-semibold tracking-[0.2em] text-ev-red mb-6">0{index + 1}</p>
              <h3 className="font-sans text-xl md:text-[1.4rem] font-normal leading-snug mb-4">{item.title}</h3>
              <p className="text-[0.95rem] text-muted-foreground leading-[1.75]">{item.text}</p>
            </div>)}
          </div>
          <div className="mt-20 md:mt-28 grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <h3 className="lg:col-span-5 font-sans font-light text-2xl md:text-3xl leading-[1.3]">A service standard with substance.</h3>
            <div className="lg:col-span-6 lg:col-start-7 space-y-5">
              <p className={body}>Engel &amp; Völkers describes its professionals as trusted advisors, not simply agents. Its stated commitments include fair housing, inclusion, environmental responsibility, and support for Special Olympics.</p>
              <p className={body}>Echelon Property Group brings that advisory perspective to local pricing, negotiation, and the decisions that matter to your transaction.</p>
              <div className="pt-4"><a href="https://www.evrealestate.com/en/company/about-us" target="_blank" rel="noopener noreferrer" className={textLink}>Explore the brokerage’s story<ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1} /></a></div>
            </div>
          </div>
          <img src={officeInterior.url} alt="Engel & Völkers office with GG Magazine covers and advisor workspaces" className="w-full aspect-video object-cover mt-14 md:mt-20" width={1800} height={1013} loading="lazy" decoding="async" />
        </section>

        <section className="container mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-20 md:pb-32 text-center">
          <p className={label}>Echelon Property Group</p>
          <h2 className={`${h2} mt-5`}>Global perspective.<br />Austin local.</h2>
          <p className="text-base md:text-lg font-light leading-[1.75] text-muted-foreground mt-6 max-w-xl mx-auto">Tell us about your property and your priorities. We will help you consider the right next move.</p>
          <Button asChild className="mt-10 rounded-none h-12 px-10 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase font-normal hover:bg-gold hover:text-primary"><Link to="/contact">Start a conversation<ArrowUpRight strokeWidth={1} /></Link></Button>
        </section>
      </main>
      <Footer showNewsletter={false} />
    </div>
  );
}