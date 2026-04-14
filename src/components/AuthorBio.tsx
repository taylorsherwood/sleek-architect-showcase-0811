import { Link } from "react-router-dom";
import taylorHeadshot from "@/assets/taylor-headshot.webp";

interface AuthorBioProps {
  compact?: boolean;
}

const AuthorBio = ({ compact = false }: AuthorBioProps) => {
  if (compact) {
    return (
      <div className="mt-16 pt-8 border-t border-border">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <img src={taylorHeadshot} alt="Taylor Sherwood - Austin Real Estate Advisor" title="Taylor Sherwood — Austin luxury real estate advisor" className="w-full h-full object-cover object-[50%_30%]"
                    loading="lazy" decoding="async"
                    />
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground">Taylor Sherwood</h3>
            <p className="text-sm text-muted-foreground">Austin Real Estate Advisor · Echelon Property Group</p>
            <p className="text-sm text-muted-foreground mt-1">CLHMS · Luxury Homes · Land Development · Commercial Real Estate · Investment Property</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
          <img src={taylorHeadshot} alt="Taylor Sherwood - Austin Real Estate Advisor" title="Taylor Sherwood — Austin luxury real estate advisor" className="w-full h-full object-cover object-[50%_30%]"
                    loading="lazy" decoding="async"
                    />
        </div>
        <div>
          <p className="text-minimal text-gold mb-2 font-extrabold">ABOUT THE AUTHOR</p>
          <h3 className="text-xl font-display font-medium text-foreground mb-2">Taylor Sherwood</h3>
          <p className="text-sm text-muted-foreground mb-1">Austin Real Estate Advisor · Echelon Property Group</p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Taylor Sherwood is a Certified Luxury Home Marketing Specialist (CLHMS) and top-performing Austin real estate advisor. 
            He specializes in luxury residential properties, land development, commercial real estate, and investment property 
            across Austin and the Texas Hill Country. With deep market expertise and a results-driven approach, Taylor helps 
            buyers, sellers, and investors navigate Austin's most competitive real estate segments.
          </p>
          <div className="mt-4">
            <Link to="/contact" className="text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300">
              CONTACT TAYLOR →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorBio;
