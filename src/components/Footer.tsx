import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0C0F24] text-primary-foreground py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <h4 className="text-minimal text-primary-foreground/50 mb-4">QUICK LINKS</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">About</Link>
                <Link to="/listings" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Listings</Link>
                <Link to="/communities" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Communities</Link>
                <Link to="/blog" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Blog</Link>
                <Link to="/contact" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contact</Link>
              </div>
            </div>

            <div>
              <h4 className="text-minimal text-primary-foreground/50 mb-4">COMMUNITIES</h4>
              <div className="space-y-2">
                <Link to="/communities/westlake-hills" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Westlake Hills</Link>
                <Link to="/communities/barton-creek" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Barton Creek</Link>
                <Link to="/communities/lake-austin-waterfront" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Lake Austin</Link>
                <Link to="/communities/tarrytown" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Tarrytown</Link>
                <Link to="/communities/rollingwood" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Rollingwood</Link>
                <Link to="/communities/dripping-springs" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Dripping Springs</Link>
              </div>
              <h4 className="text-minimal text-primary-foreground/50 mb-4 mt-6">GUIDES</h4>
              <div className="space-y-2">
                <Link to="/moving-to-austin" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Moving to Austin</Link>
                <Link to="/best-luxury-neighborhoods-austin" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Best Neighborhoods</Link>
                <Link to="/austin-luxury-market-report" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Market Report</Link>
                <Link to="/off-market-luxury-homes-austin" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Off-Market Homes</Link>
              </div>
            </div>

            <div className="md:text-right">
              <h4 className="text-minimal text-primary-foreground/50 mb-4">CONTACT</h4>
              <div className="space-y-2 text-primary-foreground/70">
                <p>2105 East MLK Blvd Ste 227<br />Austin, Texas 78702</p>
                <a href="mailto:taylor@echelonpropertygroup.com" className="block hover:text-primary-foreground transition-colors">taylor@echelonpropertygroup.com</a>
                <a href="tel:+15126613843" className="block hover:text-primary-foreground transition-colors">(512) 661-3843</a>
                <a href="https://instagram.com/TheInvestorBroker" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <Instagram className="w-4 h-4" />
                  @TheInvestorBroker
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
            <div>
              <p className="text-primary-foreground/40 text-sm">
                Brokered by eXp Realty | Austin Luxury Real Estate
              </p>
              <p className="text-primary-foreground/30 text-xs mt-1">
                Member of the eXp Luxury Division
              </p>
            </div>
            <p className="text-primary-foreground/40 text-sm">
              Copyright © {new Date().getFullYear()} Echelon Property Group | eXp Realty LLC
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
