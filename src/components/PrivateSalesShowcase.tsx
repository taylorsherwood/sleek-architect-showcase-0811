import ScrollReveal from "@/components/ScrollReveal";
import fm620Image from "@/assets/13505-north-fm-620.jpg";
import cedarBayouImage from "@/assets/5931-cedar-bayou.jpg";
import southeastAustinImage from "@/assets/southeast-austin-commercial.webp";
import highRoadImage from "@/assets/the-high-road-westlake.webp";
import clearCreekImage from "@/assets/clear-creek-road.jpg";
import bartonCreekImage from "@/assets/barton-creek.jpg";

/* ------------------------------------------------------------------ */
/*  DATA — Edit this array to add / remove / update private sales      */
/* ------------------------------------------------------------------ */

export interface PrivateSaleItem {
  image: string;
  price: string;
  address: string;
  area: string;
  descriptor?: string;
  label?: string;
}

export const privateSales: PrivateSaleItem[] = [
  {
    image: southeastAustinImage,
    price: "$6,950,000",
    address: "Address Witheld",
    area: "SOUTHEAST AUSTIN",
    descriptor: "Commercial Property",
    label: "Private Sale",
  },
  {
    image: fm620Image,
    price: "$2,495,000",
    address: "13505 North FM 620",
    area: "NORTH AUSTIN",
    descriptor: "Commercial Property",
    label: "Off Market",
  },
  {
    image: cedarBayouImage,
    price: "$2,250,000",
    address: "5931 W Cedar Bayou Lynchburg Rd",
    area: "BAYTOWN, TEXAS",
    descriptor: "Commercial Property",
    label: "Represented Buyer",
  },
  {
    image: highRoadImage,
    price: "$1,495,000",
    address: "The High Road",
    area: "WESTLAKE HILLS",
    descriptor: "",
    label: "Private Sale",
  },
  {
    image: bartonCreekImage,
    price: "$1,495,000",
    address: "Address Witheld",
    area: "BARTON CREEK",
    descriptor: "",
    label: "Off Market",
  },
  {
    image: clearCreekImage,
    price: "$499,000",
    address: "5001 Clear Creek Road",
    area: "COMMERCIAL PROPERTY",
    descriptor: "",
    label: "Represented Seller",
  },
];

/* ------------------------------------------------------------------ */
/*  CARD                                                               */
/* ------------------------------------------------------------------ */

function PrivateSaleCard({ sale, index }: { sale: PrivateSaleItem; index: number }) {
  return (
    <ScrollReveal delay={index * 100}>
      <div className="group cursor-default">
        {/* Image */}
        <div className="relative overflow-hidden mb-5 aspect-[4/3]">
          <img
            src={sale.image}
            alt={sale.address}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
          {/* Label */}
          {sale.label && (
            <span className="absolute top-4 left-4 text-[10px] tracking-[0.18em] uppercase font-medium text-foreground/70 bg-background/80 backdrop-blur-sm px-3 py-1.5">
              {sale.label}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="space-y-1.5">
          <p className="text-xl md:text-2xl font-display font-normal text-foreground tracking-tight">
            {sale.price}
          </p>
          <p className="text-sm text-foreground/80 tracking-wide">
            {sale.address}
          </p>
          <p className="text-minimal text-muted-foreground">
            {sale.area}
          </p>
          {sale.descriptor && (
            <p className="text-xs text-muted-foreground/70 leading-relaxed pt-1">
              {sale.descriptor}
            </p>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION                                                            */
/* ------------------------------------------------------------------ */

const PrivateSalesShowcase = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="mb-16 max-w-2xl">
            <ScrollReveal>
              <p className="text-minimal text-gold mb-4 font-extrabold">
                PRIVATE TRANSACTIONS
              </p>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <h2 className="text-4xl md:text-5xl font-display font-normal text-architectural mb-5">
                Notable Private Sales
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                A selection of notable private transactions handled with discretion, strategy, and market expertise.
              </p>
            </ScrollReveal>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {privateSales.map((sale, i) => (
              <PrivateSaleCard key={i} sale={sale} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivateSalesShowcase;
