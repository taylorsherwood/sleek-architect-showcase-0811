import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-primary overflow-hidden">
      <SEOHead
        title="Page Not Found | Echelon Property Group"
        description="The page you are looking for does not exist. Return to Echelon Property Group for Austin luxury real estate, homes, and investment properties."
      />

      {/* Large decorative 404 */}
      <span
        aria-hidden="true"
        className="absolute select-none pointer-events-none font-display font-normal text-[28vw] leading-none text-primary-foreground/[0.03] tracking-tight"
      >
        404
      </span>

      <div className="relative z-10 text-center max-w-xl px-6">
        <div
          className="mx-auto mb-8"
          style={{ width: "48px", height: "1px", background: "hsl(var(--gold) / 0.5)" }}
        />
        <p
          className="text-gold mb-6 font-bold"
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: '"Jost", sans-serif',
          }}
        >
          PAGE NOT FOUND
        </p>
        <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-light text-primary-foreground mb-5 tracking-tight">
          This Page Isn't Available
        </h1>
        <p className="text-primary-foreground/50 text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto">
          The page you're looking for may have been moved or no longer exists. Let us help you find what you need.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-block bg-primary-foreground text-primary px-10 py-4 hover:bg-gold hover:text-white transition-colors duration-300 tracking-[0.2em] uppercase font-medium"
            style={{ fontSize: "0.65rem", fontFamily: '"Jost", sans-serif' }}
          >
            Return Home
          </Link>
          <Link
            to="/austin-luxury-homes-for-sale"
            className="inline-block border-2 border-primary-foreground/20 text-primary-foreground/70 px-10 py-4 hover:border-gold hover:text-gold transition-colors duration-500 tracking-[0.2em] uppercase font-medium"
            style={{ fontSize: "0.65rem", fontFamily: '"Jost", sans-serif' }}
          >
            Explore Austin Homes
          </Link>
        </div>

        <div
          className="mx-auto mt-12 mb-6"
          style={{ width: "48px", height: "1px", background: "hsl(var(--gold) / 0.25)" }}
        />
        <div className="flex flex-wrap justify-center gap-6 text-xs tracking-[0.1em] uppercase text-primary-foreground/30">
          <Link to="/communities" className="hover:text-gold transition-colors duration-300">Communities</Link>
          <Link to="/invest" className="hover:text-gold transition-colors duration-300">Invest</Link>
          <Link to="/sell" className="hover:text-gold transition-colors duration-300">Sell</Link>
          <Link to="/blog" className="hover:text-gold transition-colors duration-300">Blog</Link>
          <Link to="/contact" className="hover:text-gold transition-colors duration-300">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
