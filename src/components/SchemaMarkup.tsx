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

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Echelon Property Group",
  "description": "Luxury real estate brokerage in Austin, Texas specializing in luxury homes, land, commercial real estate, and investment property.",
  "url": "https://www.echelonpropertygroup.com",
  "logo": "https://www.echelonpropertygroup.com/lovable-uploads/echelon-logo-gold.png",
  "image": "https://www.echelonpropertygroup.com/og-image.png",
  "telephone": "+1-512-661-3843",
  "email": "taylor@echelonpropertygroup.com",
  "founder": {
    "@type": "Person",
    "name": "Taylor Sherwood"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2105 East MLK Blvd Ste 227",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78702",
    "addressCountry": "US"
  },
  "sameAs": []
};

export const realEstateAgentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Taylor Sherwood",
  "description": "Austin luxury real estate advisor specializing in luxury homes, land development, commercial real estate, and investment property throughout Austin and the Texas Hill Country.",
  "url": "https://www.echelonpropertygroup.com",
  "telephone": "+1-512-661-3843",
  "email": "taylor@echelonpropertygroup.com",
  "image": "https://www.echelonpropertygroup.com/lovable-uploads/taylor-headshot-widget.jpg",
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
  "@type": "Person",
  "name": "Taylor Sherwood",
  "jobTitle": "Certified Luxury Home Marketing Specialist (CLHMS)",
  "description": "Austin luxury real estate advisor specializing in luxury homes, land development, commercial real estate, and investment property across Westlake Hills, Barton Creek, Tarrytown, Lake Austin, and the Texas Hill Country.",
  "url": "https://www.echelonpropertygroup.com/about",
  "telephone": "+1-512-661-3843",
  "email": "taylor@echelonpropertygroup.com",
  "image": "https://www.echelonpropertygroup.com/lovable-uploads/taylor-headshot-widget.jpg",
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
    { "@type": "Place", "name": "Lake Austin" },
    { "@type": "Place", "name": "Texas Hill Country" }
  ],
  "knowsAbout": ["Luxury Real Estate", "Off-Market Homes", "Land Development", "Commercial Real Estate", "Investment Properties", "Austin Texas Real Estate"]
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Echelon Property Group",
  "description": "Luxury real estate brokerage in Austin, Texas specializing in luxury homes, investment properties, and land opportunities.",
  "url": "https://www.echelonpropertygroup.com",
  "telephone": "+1-512-661-3843",
  "email": "taylor@echelonpropertygroup.com",
  "image": "https://www.echelonpropertygroup.com/og-image.png",
  "logo": "https://www.echelonpropertygroup.com/lovable-uploads/echelon-logo-gold.png",
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
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "$$$"
};

export function createArticleSchema(title: string, description: string, datePublished: string, author: string, image?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "datePublished": datePublished,
    "dateModified": datePublished,
    "author": {
      "@type": "Person",
      "name": author,
      "url": "https://www.echelonpropertygroup.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Echelon Property Group",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.echelonpropertygroup.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.echelonpropertygroup.com/blog"
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
