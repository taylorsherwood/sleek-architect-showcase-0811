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
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-display font-light text-architectural">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link to="/" className="text-foreground underline hover:text-muted-foreground transition-colors duration-300">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
