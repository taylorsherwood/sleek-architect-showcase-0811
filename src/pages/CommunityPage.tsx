import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createFAQSchema } from "@/components/SchemaMarkup";
import { communityPages } from "@/data/communityData";

const CommunityPage = () => {
  const { slug } = useParams<{slug: string;}>();
  const community = communityPages.find((c) => c.slug === slug);

  if (!community) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-32 text-center">
          <h1 className="text-4xl font-light text-architectural mb-4">Community Not Found</h1>
          <Link to="/communities" className="text-minimal text-foreground hover:text-muted-foreground">← BACK TO COMMUNITIES</Link>
        </div>
      </div>);

  }

  const related = communityPages.filter((c) => community.relatedCommunities.includes(c.slug));

  const faqs = community.faqs;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={community.metaTitle} description={community.metaDescription} />
      <SchemaMarkup schema={createFAQSchema(faqs)} />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <Link to="/communities" className="inline-block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8">
              ← ALL COMMUNITIES
            </Link>
            <p className="text-minimal text-gold mb-4">{community.priceRange}</p>
            <h1 className="text-5xl md:text-7xl font-display font-light text-architectural mb-8">
              {community.heroTitle}
            </h1>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {community.image &&
      <section className="pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              




            
            </div>
          </div>
        </section>
      }

      {/* Content */}
      <article className="pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Overview */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-6">
                {community.name} Neighborhood Overview
              </h2>
              {community.overview.split('\n\n').map((p, i) =>
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
              )}
            </section>

            {/* Lifestyle */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-6">
                Lifestyle in {community.name}
              </h2>
              {community.lifestyle.split('\n\n').map((p, i) =>
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
              )}
            </section>

            {/* Market Insights */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-6">
                {community.name} Real Estate Market Insights
              </h2>
              {community.marketInsights.split('\n\n').map((p, i) =>
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
              )}
            </section>

            {/* Amenities & Schools */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-6">
                Schools and Amenities Near {community.name}
              </h2>
              {community.amenitiesAndSchools.split('\n\n').map((p, i) =>
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
              )}
            </section>

            {/* Investment */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-6">
                Investment Potential in {community.name}
              </h2>
              {community.investmentPotential.split('\n\n').map((p, i) =>
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
              )}
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-8">
                Frequently Asked Questions About {community.name}
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, i) =>
                <div key={i} className="border-b border-border pb-6">
                    <h3 className="text-lg font-medium text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Related Communities */}
            {related.length > 0 &&
            <section>
                <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-8">
                  Explore Nearby Austin Communities
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {related.map((rc) =>
                <Link
                  key={rc.slug}
                  to={`/communities/${rc.slug}`}
                  className="group border border-border p-6 hover:border-foreground transition-colors duration-300">
                  
                      <p className="text-minimal text-gold mb-2">{rc.priceRange}</p>
                      <h3 className="text-xl font-display font-light text-architectural group-hover:text-muted-foreground transition-colors mb-2">
                        {rc.name}
                      </h3>
                      <p className="text-minimal text-muted-foreground">VIEW COMMUNITY →</p>
                    </Link>
                )}
                </div>
              </section>
            }

            {/* CTA */}
            <section className="text-center py-12 bg-muted -mx-6 px-6">
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-4">
                Interested in {community.name}?
              </h2>
              <p className="text-muted-foreground mb-8">
                Contact Echelon Property Group for expert guidance on buying or selling in {community.name}.
              </p>
              <Link
                to="/contact"
                className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 transition-colors duration-300">
                
                CONTACT US
              </Link>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </div>);

};

export default CommunityPage;