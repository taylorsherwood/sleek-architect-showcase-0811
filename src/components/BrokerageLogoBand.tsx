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
      className="w-[168px] sm:w-[196px] md:w-[224px] h-auto object-contain"
      loading="lazy"
      decoding="async"
    />
    <img
      src={evWordmark.url}
      alt="Engel & Völkers"
      title="Brokered by Engel & Völkers Austin"
      width={543}
      height={119}
      className="w-[152px] sm:w-[178px] md:w-[204px] h-auto object-contain"
      loading="lazy"
      decoding="async"
    />
  </div>
);

export default BrokerageLogoBand;