import { useEffect } from "react";

interface SchemaMarkupProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

const SchemaMarkup = ({ schema }: SchemaMarkupProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.setAttribute("data-schema", "true");
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [schema]);

  return null;
};

export default SchemaMarkup;

export const realEstateAgentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Echelon Property Group",
  "founder": "Taylor Sherwood",
  "description": "Austin luxury real estate experts specializing in luxury homes, land development, commercial real estate, and investment property throughout Austin and the Texas Hill Country.",
  "url": "https://www.echelonpropertygroup.com",
  "telephone": "(512) 661-3843",
  "email": "taylor@echelonpropertygroup.com",
  "serviceType": [
    "Luxury Real Estate",
    "Land Brokerage",
    "Commercial Real Estate",
    "Investment Property",
    "Off-Market Homes",
    "Buyer Representation",
    "Seller Representation"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2105 East MLK Blvd Ste 227",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78702",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "City", "name": "Austin", "containedInPlace": { "@type": "State", "name": "Texas" } },
    { "@type": "Place", "name": "Westlake Hills, Texas" },
    { "@type": "Place", "name": "Barton Creek, Austin" },
    { "@type": "Place", "name": "Lake Austin" },
    { "@type": "Place", "name": "Tarrytown, Austin" },
    { "@type": "Place", "name": "Texas Hill Country" }
  ],
  "priceRange": "$$$",
  "openingHours": "Mo-Fr 09:00-18:00",
  "sameAs": []
};

export const taylorSherwoodSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Taylor Sherwood",
  "jobTitle": "Certified Luxury Home Marketing Specialist (CLHMS)",
  "description": "Austin luxury real estate advisor specializing in distinctive homes, luxury properties, and land opportunities across Westlake Hills, Barton Creek, Tarrytown, and Lake Austin.",
  "url": "https://www.echelonpropertygroup.com/about",
  "telephone": "(512) 661-3843",
  "email": "taylor@echelonpropertygroup.com",
  "worksFor": {
    "@type": "Organization",
    "name": "Echelon Property Group",
    "url": "https://www.echelonpropertygroup.com"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2105 East MLK Blvd Ste 227",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78702",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "City", "name": "Austin", "containedInPlace": { "@type": "State", "name": "Texas" } },
    { "@type": "Place", "name": "Westlake Hills, Texas" },
    { "@type": "Place", "name": "Barton Creek, Austin" },
    { "@type": "Place", "name": "Tarrytown, Austin" },
    { "@type": "Place", "name": "Lake Austin" }
  ],
  "knowsAbout": ["Luxury Real Estate", "Off-Market Homes", "Land Development", "Commercial Real Estate", "Investment Properties"]
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Echelon Property Group",
  "description": "Luxury real estate brokerage in Austin, Texas specializing in luxury homes, investment properties, and land opportunities.",
  "url": "https://www.echelonpropertygroup.com",
  "telephone": "(512) 661-3843",
  "email": "taylor@echelonpropertygroup.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2105 East MLK Blvd Ste 227",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78702",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.2672,
    "longitude": -97.7431
  },
  "priceRange": "$$$"
};

export function createArticleSchema(title: string, description: string, datePublished: string, author: string, image?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "datePublished": datePublished,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Echelon Property Group"
    },
    ...(image ? { "image": image } : {})
  };
}

export function createFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
