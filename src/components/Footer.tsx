import { Link } from "react-router-dom";
import logoEchelon from "@/assets/logo-echelon-new.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <p className="text-primary-foreground/60 max-w-sm leading-relaxed">
                Austin's premier luxury real estate brokerage specializing in high-end residential homes, 
                estates, land, and unique properties.
              </p>
            </div>
            
            <div>
              <h4 className="text-minimal text-primary-foreground/50 mb-6">QUICK LINKS</h4>
              <div className="space-y-3">
                <Link to="/about" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">About</Link>
                <Link to="/listings" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Listings</Link>
                <Link to="/communities" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Communities</Link>
                <Link to="/contact" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contact</Link>
              </div>
            </div>

            <div>
              <h4 className="text-minimal text-primary-foreground/50 mb-6">CONTACT</h4>
              <div className="space-y-3 text-primary-foreground/70">
                <p>Austin, Texas</p>
                <a href="mailto:info@echelonpropertygroup.com" className="block hover:text-primary-foreground transition-colors">taylor@echelonpropertygroup.com
                </a>
                <a href="tel:+15125551234" className="block hover:text-primary-foreground transition-colors">(512) 661-3843
                </a>
              </div>
            </div>
            <div className="flex items-end justify-end">
              <img src={logoEchelon} alt="Echelon Property Group" className="h-60" />
            </div>
          </div>

          <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/40 text-sm">
              © {new Date().getFullYear()} Echelon Property Group. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;