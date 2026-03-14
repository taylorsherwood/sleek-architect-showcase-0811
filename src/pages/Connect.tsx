import SEOHead from "@/components/SEOHead";
import taylorHeadshot from "@/assets/taylor-headshot.jpg";
import echelonLogo from "@/assets/echelon-logo-gold.png";
import { ExternalLink } from "lucide-react";

const links = [
  { label: "Featured Austin Luxury Listing", href: "https://www.villagovernorshill.com" },
  { label: "Search Austin Homes", href: "https://taylorsherwood.realscout.com/homesearch/map" },
  { label: "Complimentary Home Valuation", href: "https://www.echelonpropertygroup.com/sell" },
  { label: "Work With Taylor", href: "https://www.echelonpropertygroup.com/contact" },
  { label: "Instagram", href: "https://www.instagram.com/TheInvestorBroker" },
];

const Connect = () => {
  return (
    <>
      <SEOHead
        title="Taylor Sherwood | Austin Luxury Real Estate"
        description="Connect with Austin luxury real estate advisor Taylor Sherwood. Browse listings, search homes, or request a private consultation."
      />
      <div className="min-h-screen flex flex-col items-center justify-start px-4 py-12 sm:py-16" style={{ backgroundColor: "hsl(233, 50%, 9%)" }}>
        <div className="w-full max-w-md mx-auto flex flex-col items-center gap-8">
          {/* Profile */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-2 ring-gold/40 shadow-[0_0_40px_rgba(186,162,106,0.15)]">
              <img
                src={taylorHeadshot}
                alt="Taylor Sherwood - Austin Luxury Real Estate Advisor"
                className="w-full h-full object-cover object-[50%_30%]"
                fetchPriority="high"
              />
            </div>
            <img
              src={echelonLogo}
              alt="Echelon Property Group"
              className="h-8 opacity-70"
              loading="eager"
            />
            <div className="text-center">
              <h1 className="text-2xl font-display font-medium text-white tracking-tight">
                Taylor Sherwood
              </h1>
              <p className="text-sm tracking-[0.15em] uppercase text-white/50 mt-1.5 font-sans">
                Austin Luxury Homes • Land • Investment Property
              </p>
            </div>
          </div>

          {/* Links */}
          <nav className="w-full flex flex-col gap-3.5" aria-label="Quick links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full rounded-xl px-6 py-4 text-center text-sm font-medium tracking-[0.12em] uppercase transition-all duration-300 ease-smooth border border-white/10 text-white/90 hover:border-gold/40 hover:text-white hover:shadow-[0_8px_32px_rgba(186,162,106,0.12)] backdrop-blur-sm bg-white/[0.03] hover:bg-white/[0.06]"
              >
                <span className="font-sans">{link.label}</span>
                <ExternalLink className="absolute right-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
              </a>
            ))}
          </nav>

          {/* Footer */}
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/20 mt-4 font-sans">
            Echelon Property Group
          </p>
        </div>
      </div>
    </>
  );
};

export default Connect;
