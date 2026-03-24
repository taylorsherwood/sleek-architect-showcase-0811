import { useEffect, useId } from "react";

interface SchemaMarkupProps {
  schema: Record<string, unknown> | Record<string, unknown>[] | null;
}

const SchemaMarkup = ({ schema }: SchemaMarkupProps) => {
  const id = useId();

  useEffect(() => {
    if (!schema) return;

    const schemaType = (schema as Record<string, unknown>)["@type"] as string | undefined;

    // Before adding a FAQPage schema, remove any existing FAQPage scripts
    // (prevents duplicates from Strict Mode, re-renders, or route transitions)
    if (schemaType === "FAQPage") {
      const existing = document.querySelectorAll('script[data-schema-type="FAQPage"]');
      existing.forEach((el) => {
        if (el.getAttribute("data-schema-id") !== id) {
          el.remove();
        }
      });
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.setAttribute("data-schema", "true");
    script.setAttribute("data-schema-id", id);
    if (schemaType) script.setAttribute("data-schema-type", schemaType);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [schema, id]);

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
  "description": "Echelon Property Group is an Austin Texas real estate brokerage specializing in luxury homes, residential real estate, and land development opportunities across Austin's most desirable neighborhoods.",
  "url": "https://www.echelonpropertygroup.com",
  "telephone": "+1-512-661-3843",
  "email": "taylor@echelonpropertygroup.com",
  "image": "https://www.echelonpropertygroup.com/lovable-uploads/taylor-headshot-widget.jpg",
  "serviceType": [
    "Luxury Real Estate",
    "Residential Real Estate",
    "Land Development",
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
    { "@type": "Place", "name": "Tarrytown, Austin" },
    { "@type": "Place", "name": "Spanish Oaks, Austin" },
    { "@type": "Place", "name": "Barton Creek, Austin" },
    { "@type": "Place", "name": "Northwest Hills, Austin" },
    { "@type": "Place", "name": "Rollingwood, Texas" },
    { "@type": "Place", "name": "Lake Austin" },
    { "@type": "Place", "name": "Lake Travis" }
  ],
  "priceRange": "$$$",
  "openingHours": "Mo-Fr 09:00-18:00",
  "sameAs": []
};

export const taylorSherwoodSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Taylor Sherwood",
  "jobTitle": "Real Estate Agent",
  "description": "Austin real estate professional specializing in luxury homes, residential real estate, and land development opportunities across Austin's most desirable neighborhoods.",
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
    { "@type": "Place", "name": "Tarrytown, Austin" },
    { "@type": "Place", "name": "Spanish Oaks, Austin" },
    { "@type": "Place", "name": "Barton Creek, Austin" },
    { "@type": "Place", "name": "Northwest Hills, Austin" },
    { "@type": "Place", "name": "Rollingwood, Texas" },
    { "@type": "Place", "name": "Lake Austin" },
    { "@type": "Place", "name": "Lake Travis" }
  ],
  "knowsAbout": ["Luxury Real Estate", "Residential Real Estate", "Land Development", "Austin Texas Real Estate"]
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Echelon Property Group",
  "description": "Echelon Property Group is an Austin Texas real estate brokerage specializing in luxury homes, residential real estate, and land development opportunities across Austin's most desirable neighborhoods.",
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
  "areaServed": [
    { "@type": "City", "name": "Austin", "containedInPlace": { "@type": "State", "name": "Texas" } },
    { "@type": "Place", "name": "Westlake Hills, Texas" },
    { "@type": "Place", "name": "Tarrytown, Austin" },
    { "@type": "Place", "name": "Spanish Oaks, Austin" },
    { "@type": "Place", "name": "Barton Creek, Austin" },
    { "@type": "Place", "name": "Northwest Hills, Austin" },
    { "@type": "Place", "name": "Rollingwood, Texas" },
    { "@type": "Place", "name": "Lake Austin" },
    { "@type": "Place", "name": "Lake Travis" }
  ],
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "$$$"
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Echelon Property Group",
  "url": "https://www.echelonpropertygroup.com",
  "description": "Austin Texas luxury real estate brokerage specializing in luxury homes, residential real estate, land, and investment properties.",
  "publisher": {
    "@type": "Organization",
    "name": "Echelon Property Group",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.echelonpropertygroup.com/lovable-uploads/echelon-logo-gold.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.echelonpropertygroup.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export function createArticleSchema(title: string, description: string, datePublished: string, author: string, image?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "name": title,
    "url": "https://www.echelonpropertygroup.com/blog",
    "image": image || "https://www.echelonpropertygroup.com/og-image.png",
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
        "url": "https://www.echelonpropertygroup.com/lovable-uploads/echelon-logo-gold.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.echelonpropertygroup.com/blog"
    }
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
      "businessFunction": "http://purl.org/goodrelations/v1#Sell"
    },
    "broker": {
      "@type": "RealEstateAgent",
      "name": "Taylor Sherwood",
      "worksFor": {
        "@type": "Organization",
        "name": "Echelon Property Group"
      }
    }
  };
}

export function createFAQSchema(faqs: { question: string; answer: string }[]) {
  // Filter out invalid FAQ items: empty, too short, or duplicate
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
        "text": faq.answer.trim()
      }
    }))
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
      "item": item.url
    }))
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
    "image": post.image || "https://www.echelonpropertygroup.com/og-image.png",
    "datePublished": post.datePublished,
    "dateModified": post.datePublished,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://www.echelonpropertygroup.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Echelon Property Group",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.echelonpropertygroup.com/lovable-uploads/echelon-logo-gold.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.url
    }
  };
}
