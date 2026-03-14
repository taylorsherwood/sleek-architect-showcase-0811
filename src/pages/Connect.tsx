import SEOHead from "@/components/SEOHead";
import taylorHeadshot from "@/assets/taylor-headshot.jpg";
import echelonLogo from "@/assets/echelon-logo-gold.png";
import { ExternalLink } from "lucide-react";

const links = [
  { label: "Complimentary Property Valuation", href: "https://www.echelonpropertygroup.com/sell" },
  { label: "Featured Austin Luxury Listing", href: "https://www.villagovernorshill.com" },
  { label: "Search Austin Homes", href: "https://taylorsherwood.realscout.com/homesearch/map" },
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
      <div className="min-h-screen flex flex-col items-center justify-start px-5 py-14 sm:py-20" style={{ backgroundColor: "hsl(233, 50%, 9%)" }}>
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          {/* Profile */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-gold/30 shadow-[0_0_50px_rgba(186,162,106,0.12)]">
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
              className="mt-8 opacity-60"
              style={{ height: "140px" }}
              loading="eager"
            />

            <div className="text-center mt-8">
              <h1 className="text-[1.65rem] font-display font-medium text-white tracking-[-0.01em] leading-tight">
                Taylor Sherwood
              </h1>
              <p className="text-[11px] tracking-[0.18em] uppercase text-white/45 mt-3 font-display leading-relaxed">
                Austin Luxury Real Estate
                <br />
                Land&ensp;•&ensp;Investment Property
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-12 mx-auto mt-10 mb-10">
            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </div>

          {/* Links */}
          <nav className="w-full flex flex-col gap-4" aria-label="Quick links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full rounded-2xl px-7 py-5 text-center text-[11px] font-medium tracking-[0.14em] uppercase transition-all duration-500 ease-smooth border border-white/[0.08] text-white/85 hover:border-gold/30 hover:text-white hover:shadow-[0_12px_40px_rgba(186,162,106,0.1)] backdrop-blur-sm bg-white/[0.025] hover:bg-white/[0.05] shadow-[0_2px_16px_rgba(0,0,0,0.25)]"
              >
                <span className="font-sans">{link.label}</span>
                <ExternalLink className="absolute right-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              </a>
            ))}
          </nav>

          {/* Footer */}
          <p className="text-[9px] tracking-[0.3em] uppercase text-white/15 mt-14 font-sans">
            Echelon Property Group
          </p>
        </div>
      </div>
    </>
  );
};

export default Connect;
