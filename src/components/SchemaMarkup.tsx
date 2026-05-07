import { Helmet } from "react-helmet-async";

interface SchemaMarkupProps {
  schema: Record<string, unknown> | Record<string, unknown>[] | null;
}

/**
 * Renders a JSON-LD <script> tag via react-helmet-async so the schema is
 * included in the prerendered HTML and survives hydration without duplication.
 *
 * Previously this used a useEffect + document.head.appendChild pattern, which
 * caused duplicate FAQPage entries in Google Search Console when the component
 * re-rendered (new object reference for `schema`) and the dedupe logic raced
 * against itself across mount/unmount cycles.
 */
const SchemaMarkup = ({ schema }: SchemaMarkupProps) => {
  if (!schema) return null;
  const schemaType = (schema as Record<string, unknown>)["@type"];
  const typeAttr = typeof schemaType === "string" ? schemaType : undefined;
  return (
    <Helmet>
      <script type="application/ld+json" data-schema-type={typeAttr}>
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SchemaMarkup;

const SITE = "https://www.echelonpropertygroup.com";
const LOGO = `${SITE}/lovable-uploads/echelon-logo-gold.png`;
const OG = `${SITE}/og-image.png`;
const HEADSHOT = `${SITE}/lovable-uploads/taylor-headshot-widget.jpg`;

const address = {
  "@type": "PostalAddress" as const,
  "streetAddress": "2105 East MLK Blvd Ste 227",
  "addressLocality": "Austin",
  "addressRegion": "TX",
  "postalCode": "78702",
  "addressCountry": "US",
};

const areasServed = [
  { "@type": "City" as const, "name": "Austin", "containedInPlace": { "@type": "State" as const, "name": "Texas" } },
  { "@type": "Place" as const, "name": "West lake Hills, Texas" },
  { "@type": "Place" as const, "name": "Tarrytown, Austin" },
  { "@type": "Place" as const, "name": "Spanish Oaks, Austin" },
  { "@type": "Place" as const, "name": "Barton Creek, Austin" },
  { "@type": "Place" as const, "name": "Northwest Hills, Austin" },
  { "@type": "Place" as const, "name": "Rollingwood, Texas" },
  { "@type": "Place" as const, "name": "Lake Austin" },
  { "@type": "Place" as const, "name": "Lake Travis" },
  { "@type": "Place" as const, "name": "Dripping Springs, Texas" },
];

const openingHoursSpec = {
  "@type": "OpeningHoursSpecification" as const,
  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "opens": "09:00",
  "closes": "18:00",
};

const sameAs = [
  "https://www.instagram.com/theinvestorbroker",
  "https://www.linkedin.com/in/taylorsherwood/",
  "https://www.zillow.com/profile/TaylorSherwood512",
  "https://www.realtor.com/realestateagents/5e50ed9a4cb1520012995024",
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  "name": "Echelon Property Group",
  "description": "Luxury real estate brokerage in Austin, Texas specializing in luxury homes, land, commercial real estate, and investment property.",
  "url": SITE,
  "logo": {
    "@type": "ImageObject",
    "@id": `${SITE}/#logo`,
    "url": LOGO,
    "width": 600,
    "height": 600,
  },
  "image": OG,
  "telephone": "+1-512-661-3843",
  "email": "info@echelonpropertygroup.com",
  "founder": {
    "@type": "Person",
    "@id": `${SITE}/#taylor`,
    "name": "Taylor Sherwood",
  },
  "address": { ...address },
  "sameAs": sameAs,
};

export const realEstateAgentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${SITE}/#agent`,
  "name": "Echelon Property Group",
  "description": "Austin Texas real estate brokerage specializing in luxury homes, residential real estate, and land development opportunities across Austin's most desirable neighborhoods.",
  "url": SITE,
  "telephone": "+1-512-661-3843",
  "email": "info@echelonpropertygroup.com",
  "image": OG,
  "logo": {
    "@type": "ImageObject",
    "@id": `${SITE}/#logo`,
    "url": LOGO,
    "width": 600,
    "height": 600,
  },
  "address": { ...address },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.2672,
    "longitude": -97.7431,
  },
  "areaServed": areasServed,
  "openingHoursSpecification": [openingHoursSpec],
  "priceRange": "$$$$",
  "sameAs": sameAs,
  "parentOrganization": { "@id": `${SITE}/#organization` },
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Professional Certification",
    "name": "Certified Luxury Home Marketing Specialist (CLHMS)",
  },
  "employee": {
    "@type": "Person",
    "@id": `${SITE}/#taylor`,
    "name": "Taylor Sherwood",
    "image": HEADSHOT,
  },
};

export const taylorSherwoodSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE}/#taylor`,
  "name": "Taylor Sherwood",
  "jobTitle": "Luxury Real Estate Advisor & Broker",
  "description": "Austin real estate professional specializing in luxury homes, residential real estate, and land development opportunities across Austin's most desirable neighborhoods.",
  "url": `${SITE}/about`,
  "telephone": "+1-512-661-3843",
  "email": "info@echelonpropertygroup.com",
  "image": HEADSHOT,
  "worksFor": {
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    "name": "Echelon Property Group",
    "url": SITE,
  },
  "address": { ...address },
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Professional Certification",
    "name": "Certified Luxury Home Marketing Specialist (CLHMS)",
  },
  "knowsAbout": [
    "Luxury Real Estate",
    "Residential Real Estate",
    "Land Development",
    "Austin Texas Real Estate",
    "Commercial Real Estate",
    "Investment Property",
    "Off-Market Real Estate",
  ],
  "sameAs": sameAs,
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE}/#localbusiness`,
  "name": "Echelon Property Group",
  "description": "Austin Texas real estate brokerage specializing in luxury homes, residential real estate, and land development opportunities across Austin's most desirable neighborhoods.",
  "url": SITE,
  "telephone": "+1-512-661-3843",
  "email": "info@echelonpropertygroup.com",
  "image": OG,
  "logo": {
    "@type": "ImageObject",
    "@id": `${SITE}/#logo`,
    "url": LOGO,
    "width": 600,
    "height": 600,
  },
  "address": { ...address },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.2672,
    "longitude": -97.7431,
  },
  "areaServed": areasServed,
  "openingHoursSpecification": [openingHoursSpec],
  "priceRange": "$$$$",
  "sameAs": sameAs,
  "parentOrganization": { "@id": `${SITE}/#organization` },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  "name": "Echelon Property Group",
  "url": SITE,
  "description": "Austin Texas luxury real estate brokerage specializing in luxury homes, residential real estate, land, and investment properties.",
  "publisher": {
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    "name": "Echelon Property Group",
    "logo": {
      "@type": "ImageObject",
      "@id": `${SITE}/#logo`,
      "url": LOGO,
      "width": 600,
      "height": 600,
    },
  },
};

export function createArticleSchema(title: string, description: string, datePublished: string, author: string, image?: string, url?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "name": title,
    "url": url || `${SITE}/blog`,
    "image": image || OG,
    "datePublished": datePublished,
    "dateModified": datePublished,
    "author": {
      "@type": "Person",
      "@id": `${SITE}/#taylor`,
      "name": author,
      "url": `${SITE}/about`,
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      "name": "Echelon Property Group",
      "logo": {
        "@type": "ImageObject",
        "@id": `${SITE}/#logo`,
        "url": LOGO,
        "width": 600,
        "height": 600,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url || `${SITE}/blog`,
    },
  };
}

export function createRealEstateListingSchema(listing: { name: string; description: string; image: string; price: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": listing.name,
    "description": listing.description,
    "image": listing.image,
    "url": listing.url,
    "offers": {
      "@type": "Offer",
      "price": listing.price.replace(/[^0-9]/g, ''),
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
    },
    "broker": {
      "@type": "RealEstateAgent",
      "@id": `${SITE}/#agent`,
      "name": "Echelon Property Group",
    },
  };
}

export function createFAQSchema(faqs: { question: string; answer: string }[]) {
  const seen = new Set<string>();
  const validFaqs = faqs.filter(faq => {
    const q = (faq.question || "").trim();
    const a = (faq.answer || "").trim();
    if (!q || !a || a.length < 20 || seen.has(q.toLowerCase())) return false;
    seen.add(q.toLowerCase());
    return true;
  });

  if (validFaqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": validFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question.trim(),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.trim(),
      },
    })),
  };
}

export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

export function createBlogPostingSchema(post: { title: string; description: string; datePublished: string; author: string; image?: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "name": post.title,
    "url": post.url,
    "image": post.image || OG,
    "datePublished": post.datePublished,
    "dateModified": "2026-03-27",
    "author": {
      "@type": "Person",
      "@id": `${SITE}/#taylor`,
      "name": post.author,
      "url": `${SITE}/about`,
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      "name": "Echelon Property Group",
      "logo": {
        "@type": "ImageObject",
        "@id": `${SITE}/#logo`,
        "url": LOGO,
        "width": 600,
        "height": 600,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.url,
    },
  };
}

export function createPlaceSchema(community: { name: string; slug: string; description: string }) {
  const url = `${SITE}/communities/${community.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": `${community.name}, Austin Texas`,
    "description": community.description,
    "url": url,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "addressCountry": "US",
    },
    "containedInPlace": {
      "@type": "City",
      "name": "Austin",
      "containedInPlace": {
        "@type": "State",
        "name": "Texas",
      },
    },
    "provider": { "@id": `${SITE}/#organization` },
  };
}
