import { Link } from "react-router-dom";
import logoEchelon from "@/assets/logo-echelon-new.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <img src={logoEchelon} alt="Echelon Property Group" className="h-28" />
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
                <p>2105 East MLK Blvd Ste 227<br />Austin, Texas</p>
                <a href="mailto:info@echelonpropertygroup.com" className="block hover:text-primary-foreground transition-colors">taylor@echelonpropertygroup.com</a>
                <a href="tel:+15125551234" className="block hover:text-primary-foreground transition-colors">(512) 661-3843</a>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/40 text-sm max-w-2xl leading-relaxed">
              eXp Realty LLC DRE#508111
              <br />
              We are committed to providing an accessible website. If you have difficulty accessing content, have difficulty viewing a file on the website, or notice any accessibility problems, please contact us at 512.661.3843 to specify the nature of the accessibility issue and any assistive technology you use. We strive to provide the content you need in the format you require.
              <br /><br />
              Copyright © {new Date().getFullYear()} Echelon Property Group | eXp Realty LLC
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