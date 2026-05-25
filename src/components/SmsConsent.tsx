interface SmsConsentProps {
  className?: string;
  align?: "left" | "center";
}

/**
 * Small helper text shown next to submit buttons on lead-capture forms
 * that collect a phone number. Inherits color from parent (uses opacity),
 * so it works on both light and dark form backgrounds without restyling.
 */
const SmsConsent = ({ className = "", align = "center" }: SmsConsentProps) => (
  <p
    className={`text-[11px] leading-relaxed opacity-60 ${
      align === "center" ? "text-center" : "text-left"
    } ${className}`}
  >
    By submitting this form, you agree to receive text messages from Echelon
    Property Group regarding your inquiry. Message/data rates may apply. Reply
    STOP to opt out.
  </p>
);

export default SmsConsent;
