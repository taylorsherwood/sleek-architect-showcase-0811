import marketFredericksburgAsset from "@/assets/market-fredericksburg.jpg.asset.json";
import marketKerrvilleAsset from "@/assets/market-kerrville.jpg.asset.json";
import marketDrippingSpringsAsset from "@/assets/market-dripping-springs.jpg.asset.json";
import marketJohnsonCityAsset from "@/assets/market-johnson-city.jpg.asset.json";
import marketMarbleFallsAsset from "@/assets/market-marble-falls.jpg.asset.json";
import marketBurnetAsset from "@/assets/market-burnet.webp.asset.json";
import marketLlanoAsset from "@/assets/market-llano.jpg.asset.json";
import marketLampasasAsset from "@/assets/market-lampasas.jpg.asset.json";
import hillCountryHeroAsset from "@/assets/hill-country-ranches-hero.jpg.asset.json";
import exoticWildlifeHeroAsset from "@/assets/exotic-wildlife-ranches-hero.jpg.asset.json";
import exoticWildlifeRecreationAsset from "@/assets/exotic-wildlife-recreation-v2.jpg.asset.json";

export type PropertyType =
  | "Ranches"
  | "Recreational Land"
  | "Hunting Properties"
  | "Agricultural Land"
  | "Development Opportunities"
  | "Vineyards & Wine Country Estates"
  | "Waterfront & River Tracts"
  | "Equestrian Estates";

export interface LandRanchMarket {
  slug: string;
  name: string;
  county: string;
  kind?: "market" | "theme";
  heroEyebrow?: string;
  heroHeadline?: string;
  heroImage: string;
  positioning: string;
  metaTitle: string;
  metaDescription: string;
  overview: string[];
  buyerDraw: string[];
  agentIntel: {
    medianPricePerAcre: string;
    typicalRanchSize: string;
    buyerProfile: string;
    recreationalDemand: string;
    developmentActivity: string;
    longTermOutlook: string;
  };
  propertyTypes: PropertyType[];
  whyBuyers: { title: string; body: string }[];
  lifestyle: { eyebrow: string; headline: string; body: string; image?: string };
}

export const landRanchMarkets: LandRanchMarket[] = [
  {
    slug: "fredericksburg",
    name: "Fredericksburg",
    county: "Gillespie County",
    heroImage: marketFredericksburgAsset.url,
    positioning:
      "Wine country ranches, legacy Hill Country estates, and recreational acreage anchored by one of Texas' most established luxury destinations.",
    metaTitle: "Fredericksburg Ranches & Land for Sale | Echelon Property Group",
    metaDescription:
      "Explore Fredericksburg ranches, vineyard estates, and Hill Country acreage. Echelon Property Group advises buyers and sellers across Gillespie County land markets.",
    overview: [
      "Fredericksburg has matured into one of the most desirable rural luxury markets in Texas. The combination of established wine country, hospitality demand, and protected Hill Country topography has compressed inventory and lifted per-acre values well above surrounding counties.",
      "Buyers in this market are typically acquiring more than land. They are acquiring proximity to a destination economy, brand-equipped vineyards, and a peer set that has already validated the area as a long-hold asset.",
    ],
    buyerDraw: [
      "Established wine country and tourism economy",
      "Strong short-term rental and hospitality yields on legacy ranches",
      "Limited inventory of large contiguous tracts within 90 minutes of Austin and San Antonio",
      "Cultural anchor with restaurants, lodging, and brand-name vineyards",
    ],
    agentIntel: {
      medianPricePerAcre: "$22,500 – $38,000",
      typicalRanchSize: "20 – 250 acres",
      buyerProfile:
        "Second-home buyers, vineyard operators, hospitality investors, and Austin- and Houston-based principals seeking weekend ranches with income potential.",
      recreationalDemand: "High — hunting, equestrian, agritourism, and event use.",
      developmentActivity:
        "Steady. Boutique resorts, wedding venues, and small-lot vineyard subdivisions continue to absorb mid-sized tracts.",
      longTermOutlook:
        "Constrained supply and a maturing destination brand support continued appreciation, particularly for tracts with frontage, water, and ag valuation in place.",
    },
    propertyTypes: [
      "Ranches",
      "Vineyards & Wine Country Estates",
      "Recreational Land",
      "Hunting Properties",
      "Development Opportunities",
    ],
    whyBuyers: [
      {
        title: "A destination, not just a region",
        body: "Fredericksburg's wine, hospitality, and culinary economy gives ownership here a layer most rural markets cannot offer: an existing demand engine that supports both lifestyle and income use.",
      },
      {
        title: "Scarcity at the core",
        body: "True legacy tracts inside the Fredericksburg wine corridor rarely reach open marketing. Relationship-driven access matters more here than in almost any other Hill Country market.",
      },
      {
        title: "Dual-purpose value",
        body: "Many of the most desirable parcels combine residential, agricultural, and commercial-use potential — from working vineyards to hospitality entitlements.",
      },
    ],
    lifestyle: {
      eyebrow: "LIFESTYLE",
      headline: "Wine country with a working ranch heritage",
      body: "Fredericksburg pairs serious agricultural roots with one of the most refined rural hospitality scenes in the country. Owners here move between vineyards, working ranches, and a Main Street that anchors weekends for guests flying in from across the South.",
    },
  },
  {
    slug: "kerrville",
    name: "Kerrville",
    county: "Kerr County",
    heroImage: marketKerrvilleAsset.url,
    positioning:
      "Guadalupe River frontage, private ranches, and recreational land at the heart of the Texas Hill Country.",
    metaTitle: "Kerrville Ranches & Riverfront Land for Sale | Echelon Property Group",
    metaDescription:
      "Kerrville and Kerr County ranches, Guadalupe River acreage, and Hill Country estates. Echelon Property Group advises on legacy land, recreation, and investment tracts.",
    overview: [
      "Kerrville sits at the convergence of established Hill Country wealth, riverfront recreation, and large legacy ranches. The Guadalupe River corridor remains one of the most defensible long-hold land assets in Central Texas.",
      "The market rewards diligence on water rights, river frontage classification, and floodplain — variables that materially shape value and use.",
    ],
    buyerDraw: [
      "Guadalupe River frontage and spring-fed recreational use",
      "Established ranching culture and infrastructure",
      "Mature private aviation and access via Kerrville Municipal Airport",
      "A multi-generational buyer base anchoring long-term values",
    ],
    agentIntel: {
      medianPricePerAcre: "$14,000 – $28,000",
      typicalRanchSize: "50 – 1,000+ acres",
      buyerProfile:
        "Legacy ranch families, river recreation buyers, and Texas- and Louisiana-based principals acquiring multi-generational holdings.",
      recreationalDemand: "Very high — river recreation, hunting, equestrian, and conservation.",
      developmentActivity:
        "Selective. Most activity is residential infill and small ranchette subdivisions; large tracts trade privately and tend to stay intact.",
      longTermOutlook:
        "Riverfront and well-watered tracts remain the most defensible asset class in the Hill Country, with consistent appreciation across cycles.",
    },
    propertyTypes: [
      "Ranches",
      "Waterfront & River Tracts",
      "Recreational Land",
      "Hunting Properties",
      "Agricultural Land",
    ],
    whyBuyers: [
      {
        title: "Water defines value",
        body: "Live water and Guadalupe frontage continue to anchor the top of the market. Properties with verified water rights and managed river access trade at meaningful premiums.",
      },
      {
        title: "Legacy buyer base",
        body: "Kerr County's ownership pool is unusually patient. Many tracts are held for decades, which keeps supply tight and supports values across down cycles.",
      },
      {
        title: "Recreational infrastructure",
        body: "Established hunting programs, equestrian facilities, and conservation easements give buyers turnkey operating frameworks rather than raw acreage.",
      },
    ],
    lifestyle: {
      eyebrow: "LIFESTYLE",
      headline: "The Guadalupe River and a recreational way of life",
      body: "Kerrville's identity is inseparable from the Guadalupe. Owners here build their lives around river access, working ranches, and a slower, more deliberate Hill Country rhythm than the Austin metro can offer.",
    },
  },
  {
    slug: "dripping-springs",
    name: "Dripping Springs",
    county: "Hays County",
    heroImage: marketDrippingSpringsAsset.url,
    positioning:
      "Luxury acreage, equestrian estates, and development-grade tracts within the Austin commute shed.",
    metaTitle: "Dripping Springs Ranches & Luxury Acreage for Sale | Echelon Property Group",
    metaDescription:
      "Dripping Springs ranches, equestrian estates, and acreage with Austin proximity. Echelon Property Group advises on luxury Hill Country land in Hays County.",
    overview: [
      "Dripping Springs is the most price-pressured land market in the Hill Country, driven by proximity to Austin, an established luxury residential base, and ongoing development absorption of mid-sized tracts.",
      "Buyers acquiring here are typically weighing two outcomes simultaneously: a private acreage residence today and a defensible long-hold value as the western Austin growth wave continues.",
    ],
    buyerDraw: [
      "Within roughly 30 minutes of West Austin and the Domain corridor",
      "Established luxury residential brand and school proximity",
      "Strong appreciation history on acreage estates and equestrian properties",
      "Steady developer demand for assemblage and entitlement-ready tracts",
    ],
    agentIntel: {
      medianPricePerAcre: "$45,000 – $95,000",
      typicalRanchSize: "5 – 100 acres",
      buyerProfile:
        "Austin-based principals, tech executives, equestrian buyers, and developers pursuing entitlement-ready or assemblage-grade parcels.",
      recreationalDemand: "Moderate — primarily equestrian, lifestyle, and family-recreational use.",
      developmentActivity:
        "High. Continued absorption of 50–300 acre tracts for custom estate subdivisions, boutique hospitality, and mixed-use concepts along the 290 corridor.",
      longTermOutlook:
        "Among the strongest appreciation profiles in Central Texas land. Inventory is structurally tight; replacement cost rises every cycle.",
    },
    propertyTypes: [
      "Equestrian Estates",
      "Ranches",
      "Development Opportunities",
      "Recreational Land",
    ],
    whyBuyers: [
      {
        title: "Austin proximity at acreage scale",
        body: "Few markets in the country offer 10–100 acre estates within a 30-minute drive of a top-tier tech metro. That structural scarcity is the single most important value driver here.",
      },
      {
        title: "Dual-use value",
        body: "Many Dripping Springs tracts perform as both a private residence and a development optionality play, with entitlement paths that can be activated later.",
      },
      {
        title: "Established luxury comp set",
        body: "The market already has a deep set of high-end residential comps and equestrian facilities, which supports lending, appraisal, and exit liquidity.",
      },
    ],
    lifestyle: {
      eyebrow: "LIFESTYLE",
      headline: "Luxury acreage with city access",
      body: "Dripping Springs has become the default address for Austin principals who want acreage, gates, and a barn without giving up dinner reservations or a 30-minute commute to the office.",
    },
  },
  {
    slug: "johnson-city",
    name: "Johnson City",
    county: "Blanco County",
    heroImage: marketJohnsonCityAsset.url,
    positioning:
      "Recreational land, emerging vineyard tracts, and investment-grade acreage along the 290 wine corridor.",
    metaTitle: "Johnson City Ranches & Hill Country Land for Sale | Echelon Property Group",
    metaDescription:
      "Johnson City and Blanco County ranches, recreational land, and 290 wine corridor acreage. Echelon Property Group advises on investment-grade Hill Country tracts.",
    overview: [
      "Johnson City has quietly become one of the most strategically positioned land markets in Central Texas. Sitting between Austin, Fredericksburg, and the 290 wine corridor, it offers acreage at a meaningful discount to its more developed neighbors with a clear path to convergence.",
      "Patient buyers are using Johnson City to acquire scale early — securing tracts that fit a longer holding period or a multi-stage development arc.",
    ],
    buyerDraw: [
      "Direct access to the 290 wine corridor and Fredericksburg",
      "Lower price-per-acre basis than adjacent Gillespie and Hays counties",
      "Limited but growing inventory of vineyards and tasting-room sites",
      "Strong recreational and hunting profile across larger tracts",
    ],
    agentIntel: {
      medianPricePerAcre: "$12,000 – $24,000",
      typicalRanchSize: "25 – 500 acres",
      buyerProfile:
        "Long-hold investors, vineyard and hospitality entrepreneurs, and lifestyle buyers seeking Hill Country acreage at a more accessible basis.",
      recreationalDemand: "High — hunting, ATV, and equestrian use across larger tracts.",
      developmentActivity:
        "Emerging. Vineyard expansion, boutique lodging, and ranchette subdivisions are early but accelerating along the 290 corridor.",
      longTermOutlook:
        "Constructive. Convergence with Fredericksburg pricing is a multi-year thesis but well supported by infrastructure, tourism, and entitlement activity.",
    },
    propertyTypes: [
      "Ranches",
      "Recreational Land",
      "Hunting Properties",
      "Vineyards & Wine Country Estates",
      "Agricultural Land",
      "Development Opportunities",
    ],
    whyBuyers: [
      {
        title: "Basis advantage",
        body: "Buyers acquiring along the 290 corridor in Blanco County are typically buying at a meaningful discount to comparable Gillespie County tracts, with similar geography, water, and access profiles.",
      },
      {
        title: "Optionality",
        body: "The land here supports multiple end uses — private ranch, vineyard, hospitality, or future subdivision — which gives owners flexibility as the corridor matures.",
      },
      {
        title: "A market still being shaped",
        body: "Inventory turnover is low and many of the best tracts move privately. Early relationships with the right operators and owners materially change what is available.",
      },
    ],
    lifestyle: {
      eyebrow: "LIFESTYLE",
      headline: "The quiet middle of the Hill Country",
      body: "Johnson City remains genuinely rural while sitting at the center of the region's most-trafficked weekend corridor. For owners, that combination is rare: privacy on the property, a serious destination economy ten minutes away.",
    },
  },
  {
    slug: "marble-falls",
    name: "Marble Falls",
    county: "Burnet County",
    heroImage: marketMarbleFallsAsset.url,
    positioning:
      "Highland Lakes waterfront, ranch acreage, and expanding development corridors along the 281 growth path.",
    metaTitle: "Marble Falls Land, Waterfront & Ranches for Sale | Echelon Property Group",
    metaDescription:
      "Marble Falls waterfront, ranches, and Highland Lakes acreage. Echelon Property Group advises on lake, ranch, and development tracts in Burnet County.",
    overview: [
      "Marble Falls sits at the intersection of the Highland Lakes and the 281 growth corridor, giving it a profile no other Hill Country market offers: legitimate waterfront, working ranches, and an active development pipeline within a single submarket.",
      "Pricing varies sharply with frontage, view, and entitlement, which makes underwriting and comparable selection unusually important here.",
    ],
    buyerDraw: [
      "Lake LBJ, Lake Marble Falls, and Lake Travis access",
      "Active commercial and residential development along 281",
      "Defensible waterfront comps with consistent appreciation",
      "Reasonable Austin and Hill Country dual-market access",
    ],
    agentIntel: {
      medianPricePerAcre: "$18,000 – $60,000 (excludes premium waterfront)",
      typicalRanchSize: "10 – 300 acres",
      buyerProfile:
        "Waterfront principals, lake-house families, developers along the 281 corridor, and investors blending lake and ranch portfolios.",
      recreationalDemand: "Very high — boating, water sports, hunting, and equestrian.",
      developmentActivity:
        "Strong. Continued residential, retail, and hospitality absorption along the 281 corridor and around the lakes.",
      longTermOutlook:
        "Waterfront remains a long-term store of value. The broader market benefits from growth corridor dynamics typically seen further east toward Austin.",
    },
    propertyTypes: [
      "Waterfront & River Tracts",
      "Ranches",
      "Development Opportunities",
      "Recreational Land",
      "Equestrian Estates",
    ],
    whyBuyers: [
      {
        title: "Two markets in one",
        body: "Marble Falls is one of the few Texas markets where buyers can pursue both true waterfront and serious ranch acreage within the same submarket — often within the same tour.",
      },
      {
        title: "Growth corridor exposure",
        body: "The 281 corridor continues to absorb residential and commercial development. Strategically located acreage benefits from that demand without losing rural character.",
      },
      {
        title: "Defensible waterfront",
        body: "Highland Lakes waterfront has demonstrated durable pricing through multiple cycles, which makes it one of the more financeable rural assets in the region.",
      },
    ],
    lifestyle: {
      eyebrow: "LIFESTYLE",
      headline: "Water, ranch, and a real downtown",
      body: "Marble Falls combines the Highland Lakes lifestyle with a working downtown and a serious ranch culture in the surrounding country. For many owners, that mix is the entire reason to be here.",
    },
  },
  {
    slug: "burnet",
    name: "Burnet",
    county: "Burnet County",
    heroImage: marketBurnetAsset.url,
    positioning:
      "Large tracts, hunting properties, and premier recreational land within the Highland Lakes region.",
    metaTitle: "Burnet County Ranches & Hunting Land for Sale | Echelon Property Group",
    metaDescription:
      "Burnet ranches, large tracts, and Highland Lakes hunting properties. Echelon Property Group advises on recreational and legacy land throughout Burnet County.",
    overview: [
      "Burnet remains one of the most productive markets in Central Texas for buyers seeking scale. Large contiguous tracts, strong hunting profiles, and proximity to the Highland Lakes give it a buyer pool unlike any other county in the region.",
      "The market favors buyers who understand wildlife management, exemption planning, and the structural difference between true working ranches and recreational tracts dressed as one.",
    ],
    buyerDraw: [
      "Availability of large contiguous tracts inside the Austin commute shed",
      "Mature wildlife populations and managed hunting infrastructure",
      "Highland Lakes access without lakefront pricing",
      "Strong ag and wildlife exemption history across the county",
    ],
    agentIntel: {
      medianPricePerAcre: "$10,000 – $20,000",
      typicalRanchSize: "100 – 1,500+ acres",
      buyerProfile:
        "Hunting and conservation buyers, multi-generational ranch families, and Austin principals seeking true scale within 90 minutes of the city.",
      recreationalDemand: "Very high — whitetail, exotics, dove, and managed water recreation.",
      developmentActivity:
        "Selective. Most large tracts trade for continued recreational or ranching use; development pressure is concentrated nearer to Marble Falls and 281.",
      longTermOutlook:
        "Stable. The supply of large contiguous tracts inside the Austin commute shed continues to shrink, which structurally supports long-term values.",
    },
    propertyTypes: [
      "Ranches",
      "Hunting Properties",
      "Recreational Land",
      "Agricultural Land",
    ],
    whyBuyers: [
      {
        title: "Scale is still available",
        body: "Burnet County remains one of the few markets within reasonable Austin proximity where 500+ acre contiguous tracts trade with any frequency. That alone defines its buyer pool.",
      },
      {
        title: "Wildlife and exemption depth",
        body: "Many properties carry long-standing ag and wildlife valuations and managed hunting programs, which reduce holding costs and accelerate the timeline to a productive ownership experience.",
      },
      {
        title: "A genuine ranching culture",
        body: "Burnet is still a working ranch market. That changes the diligence, the comp set, and the operating norms in ways buyers should understand before committing capital.",
      },
    ],
    lifestyle: {
      eyebrow: "LIFESTYLE",
      headline: "Scale, wildlife, and the Highland Lakes",
      body: "Burnet offers something the rest of the Austin commute shed has largely lost: room. Large ranches, real hunting programs, and the Highland Lakes a short drive away give owners a way of life that is becoming structurally scarce.",
    },
  },
  {
    slug: "llano",
    name: "Llano",
    county: "Llano County",
    heroImage: marketLlanoAsset.url,
    positioning:
      "Classic Texas ranch country with abundant wildlife, granite landscapes, and legacy holdings.",
    metaTitle: "Llano County Ranches & Hunting Land for Sale | Echelon Property Group",
    metaDescription:
      "Llano County ranches, hunting properties, and legacy Hill Country acreage. Echelon Property Group advises on recreational and ranching land throughout Llano.",
    overview: [
      "Llano is one of the most authentic ranch markets in Texas — large tracts, established hunting culture, and a topography defined by granite outcrops, live oaks, and the Llano River corridor.",
      "Buyers here are typically not chasing development; they are acquiring a long-hold piece of the Hill Country with serious recreational utility.",
    ],
    buyerDraw: [
      "Among the strongest whitetail and exotic hunting markets in Texas",
      "Llano River and Highland Lakes water access",
      "Large legacy ranches that trade infrequently",
      "Significantly lower per-acre basis than markets one county east",
    ],
    agentIntel: {
      medianPricePerAcre: "$8,000 – $16,000",
      typicalRanchSize: "100 – 2,000+ acres",
      buyerProfile:
        "Serious hunting buyers, multi-generational ranch families, and capital seeking legacy holdings rather than near-term development plays.",
      recreationalDemand: "Among the highest in Texas — whitetail, exotics, turkey, and river recreation.",
      developmentActivity:
        "Minimal. The market remains predominantly recreational and ranching, which preserves character and supports long-term value.",
      longTermOutlook:
        "Strong as a long-hold asset. Llano benefits from the broader regional growth without losing its rural identity, which protects the value of large tracts.",
    },
    propertyTypes: [
      "Ranches",
      "Hunting Properties",
      "Recreational Land",
      "Waterfront & River Tracts",
      "Agricultural Land",
    ],
    whyBuyers: [
      {
        title: "A real hunting market",
        body: "Llano consistently ranks among the most productive hunting counties in Texas. For buyers underwriting recreation as a core return, that matters more than headline price-per-acre.",
      },
      {
        title: "Legacy tracts, rarely marketed",
        body: "Many of the best ranches in Llano trade once a generation, often privately. Access is relational and timing-driven rather than transactional.",
      },
      {
        title: "Defensible long-hold basis",
        body: "Lower entry pricing, strong ag and wildlife exemption support, and limited development pressure make Llano one of the more durable long-hold positions in Central Texas.",
      },
    ],
    lifestyle: {
      eyebrow: "LIFESTYLE",
      headline: "Granite, water, and legacy ranching",
      body: "Llano County is what the rest of the Hill Country used to be: granite domes, river crossings, and ranches that have been in the same family for generations. Owners here are buying into that continuity, not around it.",
    },
  },
  {
    slug: "lampasas",
    name: "Lampasas",
    county: "Lampasas County",
    heroImage: marketLampasasAsset.url,
    positioning:
      "Agricultural and recreational land at the northern edge of the Hill Country with strong long-term appreciation potential.",
    metaTitle: "Lampasas County Ranches & Agricultural Land for Sale | Echelon Property Group",
    metaDescription:
      "Lampasas ranches, agricultural land, and recreational acreage. Echelon Property Group advises on ranching and investment-grade land throughout Lampasas County.",
    overview: [
      "Lampasas sits at the northern edge of the Hill Country, where ranching tradition is still the defining culture and where buyers can acquire serious acreage at a basis that is increasingly difficult to find further south.",
      "The market rewards buyers who understand cattle, hay, and exemption mechanics — and who can recognize the long-term value of tracts that are structurally well-positioned relative to the Austin growth corridor.",
    ],
    buyerDraw: [
      "Working agricultural and ranching country with established exemption history",
      "Lower per-acre basis than counties further south",
      "Sulphur Creek, Lampasas River, and abundant surface water on better tracts",
      "Improving accessibility to the Austin and Killeen-Temple corridors",
    ],
    agentIntel: {
      medianPricePerAcre: "$7,500 – $14,000",
      typicalRanchSize: "100 – 1,200 acres",
      buyerProfile:
        "Cattle and hay operators, long-hold investors, and lifestyle buyers seeking working ranches at a meaningful basis advantage.",
      recreationalDemand: "Moderate to high — whitetail, dove, and managed water recreation.",
      developmentActivity:
        "Limited, with selective interest closer to the major corridors and the city of Lampasas itself.",
      longTermOutlook:
        "Constructive. Lampasas benefits from being one of the last accessible Central Texas markets where working ranch economics still drive land values.",
    },
    propertyTypes: [
      "Ranches",
      "Agricultural Land",
      "Recreational Land",
      "Hunting Properties",
    ],
    whyBuyers: [
      {
        title: "Working land, not staged land",
        body: "Lampasas remains a true agricultural market. That keeps comps grounded in productive use rather than aspirational pricing and makes diligence more predictable.",
      },
      {
        title: "Basis matters",
        body: "Acquiring acreage at Lampasas pricing meaningfully changes the long-term return profile, particularly for buyers willing to operate the land or hold it through the next regional growth cycle.",
      },
      {
        title: "Genuine privacy",
        body: "Lower density and large neighboring tracts mean buyers here get a level of privacy and quiet that markets further south can no longer credibly offer.",
      },
    ],
    lifestyle: {
      eyebrow: "LIFESTYLE",
      headline: "Working ranches at the edge of the Hill Country",
      body: "Lampasas is for owners who want their land to feel like land — cattle, hay, fence work, and a way of life that hasn't been redrawn around tourism. The reward is privacy, scale, and a basis that quietly compounds over time.",
    },
  },
  {
    slug: "hill-country-ranches",
    name: "Hill Country Ranches",
    county: "Central Texas Hill Country",
    kind: "theme",
    heroEyebrow: "REGIONAL ADVISORY",
    heroHeadline: "Texas Hill Country Ranches & Legacy Acreage",
    heroImage: hillCountryHeroAsset.url,
    positioning:
      "Legacy ranches, live-water tracts, recreational acreage, and private retreats across the heart of Central Texas.",
    metaTitle: "Texas Hill Country Ranches for Sale | Echelon Property Group",
    metaDescription:
      "Hill Country ranches, live water tracts, hunting properties, and legacy acreage across Central Texas. Echelon Property Group advises buyers on Hill Country land.",
    overview: [
      "The Texas Hill Country remains one of the most defensible long-hold land markets in the country. From Gillespie and Blanco to Kerr, Llano, Burnet, and Hays counties, the region offers a rare combination of scarcity, natural character, and proximity to two top-tier metros.",
      "Buyers acquiring Hill Country ranches today are typically weighing more than acreage. They are evaluating water, exemption history, frontage, view corridors, and where each tract sits relative to the next decade of regional growth.",
    ],
    buyerDraw: [
      "Live water, river frontage, and spring-fed creeks",
      "Mature wildlife populations and managed hunting programs",
      "Within reach of Austin, San Antonio, and Hill Country destination economies",
      "Legacy tracts that rarely surface on the open market",
    ],
    agentIntel: {
      medianPricePerAcre: "$10,000 – $60,000 (varies sharply by county and water)",
      typicalRanchSize: "25 – 2,000+ acres",
      buyerProfile:
        "Multi-generational ranch families, Austin and Houston principals, conservation buyers, and investors acquiring long-hold legacy positions.",
      recreationalDemand: "Very high across the region — hunting, river recreation, equestrian, and conservation.",
      developmentActivity:
        "Concentrated near major corridors (290, 281, US 71) and the Austin commute shed. Most legacy ranches stay intact.",
      longTermOutlook:
        "Structurally constrained supply, durable demand from in-state and out-of-state capital, and limited replacement inventory support continued appreciation, particularly for live-water tracts.",
    },
    propertyTypes: [
      "Ranches",
      "Recreational Land",
      "Hunting Properties",
      "Waterfront & River Tracts",
      "Agricultural Land",
      "Equestrian Estates",
      "Vineyards & Wine Country Estates",
      "Development Opportunities",
    ],
    whyBuyers: [
      {
        title: "Scarcity is the thesis",
        body: "Large contiguous tracts inside the Hill Country are not being created. As the Austin and San Antonio commute sheds expand, legacy ranches inside that radius become structurally more valuable — independent of any one cycle.",
      },
      {
        title: "Water defines the top of the market",
        body: "Live water, spring-fed creeks, and verified river frontage continue to anchor the highest values. Diligence on water rights, groundwater districts, and floodplain is non-negotiable.",
      },
      {
        title: "Multiple buyer pools",
        body: "Hill Country ranches attract operators, recreational owners, conservation capital, and developers — often for the same tract. Understanding which buyer pool a property serves is what determines a credible exit.",
      },
    ],
    lifestyle: {
      eyebrow: "LIFESTYLE",
      headline: "Live water, legacy, and a region that still feels rural",
      body: "The Hill Country still rewards the things that make a ranch worth owning — water, wildlife, view corridors, and quiet. Owners here build their lives around those constants while remaining within reach of two of Texas' most dynamic cities.",
    },
  },
  {
    slug: "exotic-wildlife-ranches",
    name: "Exotic Wildlife Ranches",
    county: "Texas",
    kind: "theme",
    heroEyebrow: "SPECIALIZED ADVISORY",
    heroHeadline: "Texas Ranches With Managed Exotic Wildlife",
    heroImage: exoticWildlifeHeroAsset.url,
    positioning:
      "A specialized advisory practice for ranches with axis deer, blackbuck, oryx, zebra, fallow deer, and other managed exotic wildlife.",
    metaTitle: "Texas Exotic Wildlife Ranches for Sale | Echelon Property Group",
    metaDescription:
      "Texas ranches with axis deer, blackbuck, oryx, zebra, and other managed exotic wildlife. Echelon Property Group advises on exotic wildlife ranch acquisition.",
    overview: [
      "Texas is uniquely permissive in its treatment of privately owned exotic wildlife. Across the Hill Country, South Texas, and the Edwards Plateau, select ranches operate as long-established homes to axis deer, blackbuck antelope, fallow deer, oryx, aoudad, zebras, and other exotic species.",
      "Acquiring an exotic wildlife ranch is a different transaction than buying recreational land. The diligence extends beyond water, fencing, and habitat into herd composition, conservation programs, operating history, and the relationships that support ongoing stewardship.",
    ],
    buyerDraw: [
      "Established herd populations with multi-year management history",
      "High game fencing, water systems, and habitat infrastructure already in place",
      "Recreational, conservation, and income-producing operating models",
      "A buyer pool that values stewardship, not just acreage",
    ],
    agentIntel: {
      medianPricePerAcre: "$8,000 – $25,000 (improvements and herds priced separately)",
      typicalRanchSize: "200 – 5,000+ acres",
      buyerProfile:
        "Long-hold conservation buyers, multi-generational ranching families, and principals seeking ranches that combine recreation, stewardship, and curated wildlife collections.",
      recreationalDemand: "Very high — managed hunts, wildlife observation, and breeding operations.",
      developmentActivity:
        "Minimal. The category is defined by preservation and operating continuity, not subdivision or near-term entitlement plays.",
      longTermOutlook:
        "Stable to strong. The combination of large contiguous acreage, scarce permitting for new high-fence operations, and rising interest in conservation-grade ownership supports durable value.",
    },
    propertyTypes: [
      "Ranches",
      "Hunting Properties",
      "Recreational Land",
      "Waterfront & River Tracts",
      "Agricultural Land",
    ],
    whyBuyers: [
      {
        title: "A category defined by stewardship",
        body: "Exotic wildlife ranches are operating ecosystems. Buyers are acquiring herd genetics, habitat history, and the people who have managed both — not simply land with a fence around it.",
      },
      {
        title: "Texas-specific advantage",
        body: "Texas law allows private ownership and management of a wide range of exotic species, which has built the deepest concentration of exotic wildlife ranches in North America. That regulatory landscape is part of the underwriting.",
      },
      {
        title: "Relationship-driven access",
        body: "The best exotic wildlife ranches almost never reach open marketing. Acquisition typically happens through long-standing relationships with operators, managers, and adjacent owners.",
      },
    ],
    lifestyle: {
      eyebrow: "RECREATION",
      headline: "Axis, blackbuck, oryx, zebra — and the ranches that steward them",
      body: "Ownership in this category is closer to running a private reserve than maintaining a recreational tract. Days are organized around herds, water, fence lines, and managed hunts, with a way of life that has very few peers anywhere else in the country.",
      image: exoticWildlifeRecreationAsset.url,
    },
  },
];



export const getLandRanchMarket = (slug?: string) =>
  landRanchMarkets.find((m) => m.slug === slug);

export const landRanchMarketSlugs = landRanchMarkets.map((m) => m.slug);
