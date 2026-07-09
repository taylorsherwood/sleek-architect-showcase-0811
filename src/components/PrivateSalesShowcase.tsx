import ScrollReveal from "@/components/ScrollReveal";
import fm620Image from "@/assets/13505-north-fm-620.jpg";
import cedarBayouImage from "@/assets/5931-cedar-bayou.jpg";
import southeastAustinImage from "@/assets/southeast-austin-commercial.webp";
import highRoadImage from "@/assets/the-high-road-westlake.webp";
import clearCreekImage from "@/assets/clear-creek-road.jpg";
import bartonCreekImage from "@/assets/barton-creek.jpg";
import multifamilySAImage from "@/assets/private-sale-multifamily-sa.webp";
import spanishOaksImage from "@/assets/spanish-oaks-private-sale.avif";
import eastAustinImage from "@/assets/east-austin-commercial.jpg";
import tarrytownAsset from "@/assets/tarrytown-private-sale.jpg.asset.json";
const tarrytownImage = tarrytownAsset.url;
import westlakeHillsPrivate from "@/assets/westlake-hills-private-sold.avif.asset.json";
const westlakeHillsPrivateImage = westlakeHillsPrivate.url;
import southeastDevAsset from "@/assets/southeast-austin-9-acres-land.png.asset.json";
const southeastDevImage = southeastDevAsset.url;

/* ------------------------------------------------------------------ */
/*  DATA, Edit this array to add / remove / update private sales      */
/* ------------------------------------------------------------------ */

export interface PrivateSaleItem {
  image: string;
  price: string;
  address: string;
  area: string;
  descriptor?: string;
  label?: string;
}

const parsePrice = (price: string): number =>
  Number(price.replace(/[^0-9.]/g, "")) || 0;

export const privateSales: PrivateSaleItem[] = [
  {
    image: multifamilySAImage,
    price: "$14,950,000",
    address: "Address Withheld",
    area: "SAN ANTONIO",
    descriptor: "Multi-Family",
    label: "REPRESENTED BUYER",
  },
  {
    image: spanishOaksImage,
    price: "$7,250,000",
    address: "Address Withheld",
    area: "SPANISH OAKS",
    descriptor: "",
    label: "REPRESENTED SELLER",
  },
  {
    image: southeastAustinImage,
    price: "$6,950,000",
    address: "Address Withheld",
    area: "SOUTHEAST AUSTIN",
    descriptor: "Commercial Property · 11 Acres",
    label: "REPRESENTED BUYER",
  },
  {
    image: westlakeHillsPrivateImage,
    price: "$5,950,000",
    address: "Address Withheld",
    area: "WEST LAKE HILLS",
    descriptor: "",
    label: "REPRESENTED SELLER",
  },
  {
    image: southeastDevImage,
    price: "$4,995,000",
    address: "Address Withheld",
    area: "SOUTHEAST AUSTIN",
    descriptor: "Development Land · 9 Acres",
    label: "REPRESENTED BUYER",
  },
  {
    image: tarrytownImage,
    price: "$4,750,000",
    address: "Address Withheld",
    area: "TARRYTOWN",
    descriptor: "",
    label: "REPRESENTED BUYER",
  },
  {
    image: eastAustinImage,
    price: "$4,500,000",
    address: "Address Withheld",
    area: "LAKE TRAVIS AREA",
    descriptor: "Land Development",
    label: "REPRESENTED BUYER",
  },
  {
    image: fm620Image,
    price: "$2,495,000",
    address: "13505 North FM 620",
    area: "NORTH AUSTIN",
    descriptor: "Commercial Property",
    label: "REPRESENTED BUYER",
  },
  {
    image: cedarBayouImage,
    price: "$2,250,000",
    address: "5931 W Cedar Bayou Lynchburg Road",
    area: "BAYTOWN, TEXAS",
    descriptor: "Commercial Property",
    label: "REPRESENTED BUYER",
  },
  {
    image: highRoadImage,
    price: "$1,495,000",
    address: "Address Withheld",
    area: "WEST LAKE HILLS",
    descriptor: "",
    label: "REPRESENTED BUYER",
  },
  {
    image: bartonCreekImage,
    price: "$1,495,000",
    address: "Address Withheld",
    area: "BARTON CREEK",
    descriptor: "",
    label: "REPRESENTED BUYER",
  },
  {
    image: clearCreekImage,
    price: "$499,000",
    address: "5001 Clear Creek Road",
    area: "COMMERCIAL PROPERTY",
    descriptor: "",
    label: "REPRESENTED BUYER",
  },
].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

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
            <span className="absolute top-4 left-4 text-[10px] tracking-[0.18em] uppercase font-medium text-white bg-gold px-3 py-1.5">
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
                ~95% of our sales never hit the MLS. Below is a selection of notable private transactions handled with discretion, strategy, and market expertise.
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
