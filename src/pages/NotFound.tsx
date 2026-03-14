import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SEOHead
        title="Page Not Found | Echelon Property Group Austin"
        description="The page you are looking for does not exist. Return to Echelon Property Group for Austin luxury real estate, homes, and investment properties."
      />
      <div className="text-center max-w-lg px-6">
        <h1 className="mb-4 text-6xl font-display font-light text-architectural">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <p className="mb-8 text-muted-foreground leading-relaxed">
          You may have followed an outdated link or mistyped the address. Explore our site to find
          Austin luxury homes, investment properties, and expert real estate guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3.5 transition-colors duration-300"
          >
            RETURN HOME
          </Link>
          <Link
            to="/contact"
            className="inline-block text-minimal border border-border text-foreground hover:bg-muted px-8 py-3.5 transition-colors duration-300"
          >
            CONTACT US
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <Link to="/listings" className="hover:text-foreground transition-colors">Listings</Link>
          <Link to="/buy" className="hover:text-foreground transition-colors">Buy</Link>
          <Link to="/sell" className="hover:text-foreground transition-colors">Sell</Link>
          <Link to="/communities" className="hover:text-foreground transition-colors">Communities</Link>
          <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
