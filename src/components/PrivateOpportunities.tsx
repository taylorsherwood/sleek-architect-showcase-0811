import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Landmark, Building2, TrendingUp } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { formatPhoneNumber, buildWeb3Payload } from "@/lib/formUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  investmentRange: z.string().optional(),
});

const BULLETS = [
  { icon: Home, label: "Off-Market Homes" },
  { icon: Landmark, label: "Development Sites" },
  { icon: Building2, label: "Multifamily Investment Opportunities" },
  { icon: TrendingUp, label: "Value-Add Properties" },
];

interface PrivateOpportunitiesProps {
  /** Use dark variant for pages with navy backgrounds (e.g. Connect page) */
  variant?: "light" | "dark";
}

const PrivateOpportunities = ({ variant = "light" }: PrivateOpportunitiesProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", investmentRange: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "5728f4e2-7269-4f9f-8a06-62557292e699",
          subject: "🔒 New Private Opportunities Request",
          from_name: "Echelon Property Group Website",
          to: "taylor@echelonpropertygroup.com,echelonpropertygroup@followupboss.me",
          name: form.name,
          email: form.email,
          phone: form.phone,
          "Investment Range": form.investmentRange || "Not specified",
          source: "Private Opportunities Section",
        }),
      });
      const data = await response.json();
      if (data.success) {
        navigate("/private-opportunities");
      } else {
        toast({
          title: "Submission Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isDark = variant === "dark";

  return (
    <section
      id="private-opportunities-banner"
      ref={sectionRef}
      className={`py-16 md:py-20 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${isDark ? "" : "bg-muted"}`}
      style={isDark ? { backgroundColor: "hsl(233, 42%, 12%)" } : undefined}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left — Copy */}
            <div>
              <p
                className="text-minimal tracking-widest mb-3"
                style={{ color: "hsl(42, 37%, 57%)" }}
              >
                PRIVATE ACCESS
              </p>
              <h2
                className={`text-3xl md:text-4xl font-display font-light leading-tight mb-4 ${
                  isDark ? "text-white" : "text-foreground"
                }`}
              >
                Private Austin Opportunities
              </h2>
              <p
                className={`text-lg leading-relaxed mb-8 ${
                  isDark ? "text-white/60" : "text-muted-foreground"
                }`}
              >
                Access select off-market homes, development sites, and investment
                opportunities before they reach the public market.
              </p>

              <div className="space-y-4">
                {BULLETS.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <item.icon
                      className="w-5 h-5 flex-shrink-0"
                      strokeWidth={1.4}
                      style={{ color: "hsl(42, 37%, 57%)" }}
                    />
                    <span
                      className={`text-base ${
                        isDark ? "text-white/80" : "text-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form Card */}
            <div
              className={`rounded-lg p-6 md:p-8 ${
                isDark
                  ? "bg-white/5 border border-white/10"
                  : "bg-background border border-border shadow-[var(--shadow-elegant)]"
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    maxLength={100}
                    className={`w-full px-4 py-3 rounded text-sm transition-colors focus:outline-none ${
                      isDark
                        ? "bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:border-[hsl(42,37%,57%)]"
                        : "bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:border-[hsl(var(--gold))]"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    maxLength={255}
                    className={`w-full px-4 py-3 rounded text-sm transition-colors focus:outline-none ${
                      isDark
                        ? "bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:border-[hsl(42,37%,57%)]"
                        : "bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:border-[hsl(var(--gold))]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    maxLength={20}
                    className={`w-full px-4 py-3 rounded text-sm transition-colors focus:outline-none ${
                      isDark
                        ? "bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:border-[hsl(42,37%,57%)]"
                        : "bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:border-[hsl(var(--gold))]"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-destructive text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <Select
                    value={form.investmentRange}
                    onValueChange={(v) => setForm({ ...form, investmentRange: v })}
                  >
                    <SelectTrigger
                      className={`w-full py-3 text-sm ${
                        isDark
                          ? "bg-white/10 border-white/15 text-white"
                          : "bg-muted border-border text-foreground"
                      }`}
                    >
                      <SelectValue placeholder="Investment Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1m-3m">$1M – $3M</SelectItem>
                      <SelectItem value="3m-7m">$3M – $7M</SelectItem>
                      <SelectItem value="7m-15m">$7M – $15M</SelectItem>
                      <SelectItem value="15m+">$15M+</SelectItem>
                      <SelectItem value="browsing">Just Browsing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full px-5 py-3 text-sm font-medium tracking-widest uppercase rounded transition-all duration-200 disabled:opacity-50 ${
                    isDark
                      ? "bg-primary text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground hover:text-primary hover:font-bold"
                      : "bg-primary text-primary-foreground hover:bg-[hsl(var(--gold))] hover:text-white"
                  }`}
                >
                  {submitting ? "Submitting…" : "Request Private Access"}
                </button>
                <p
                  className={`text-xs text-center ${
                    isDark ? "text-white/40" : "text-muted-foreground"
                  }`}
                >
                  Discreet updates from Echelon Property Group. No spam.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivateOpportunities;
