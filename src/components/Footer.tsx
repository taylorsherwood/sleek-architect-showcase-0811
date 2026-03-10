import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-minimal text-primary-foreground/50 mb-4">QUICK LINKS</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">About</Link>
                <Link to="/listings" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Listings</Link>
                <Link to="/communities" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Communities</Link>
                <Link to="/contact" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contact</Link>
              </div>
            </div>

            <div className="md:text-right">
              <h4 className="text-minimal text-primary-foreground/50 mb-4">CONTACT</h4>
              <div className="space-y-2 text-primary-foreground/70">
                <p>2105 East MLK Blvd Ste 227<br />Austin, Texas</p>
                <a href="mailto:info@echelonpropertygroup.com" className="block hover:text-primary-foreground transition-colors">taylor@echelonpropertygroup.com</a>
                <a href="tel:+15125551234" className="block hover:text-primary-foreground transition-colors">(512) 661-3843</a>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-primary-foreground/40 text-sm">
              eXp Realty LLC DRE#508111
            </p>
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
