import evLogo from "@/assets/engel-volkers-villa-logo.webp.asset.json";
import evWordmark from "@/assets/engel-volkers-wordmark.svg.asset.json";

const BrokerageLogoBand = ({ privateSeller = false }: { privateSeller?: boolean }) => (
  <div className={`brokerage-logo-band${privateSeller ? " brokerage-logo-band--private" : ""} w-full flex flex-col justify-center items-center gap-4 md:gap-5`}>
    <img
      src={evLogo.url}
      alt="Engel & Völkers"
      title="Brokered by Engel & Völkers Austin"
      width={664}
      height={276}
      className="w-[112px] sm:w-[130.667px] md:w-[149.333px] h-auto object-contain"
      loading="lazy"
      decoding="async"
    />
    <img
      src={evWordmark.url}
      alt="Engel & Völkers"
      title="Brokered by Engel & Völkers Austin"
      width={543}
      height={119}
      className="w-[101.333px] sm:w-[118.667px] md:w-[136px] h-auto object-contain"
      loading="lazy"
      decoding="async"
    />
  </div>
);

export default BrokerageLogoBand;