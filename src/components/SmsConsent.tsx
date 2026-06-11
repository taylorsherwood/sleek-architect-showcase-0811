interface SmsConsentProps {
  className?: string;
  align?: "left" | "center";
}

/**
 * Small helper text shown next to submit buttons on lead-capture forms
 * that collect a phone number. Inherits color from parent (uses opacity),
 * so it works on both light and dark form backgrounds without restyling.
 */
const SmsConsent = ({ className = "" }: SmsConsentProps) => (
  <p className={`text-[11px] leading-relaxed opacity-60 ${className}`}>
    {"\n"}
  </p>
);

export default SmsConsent;
