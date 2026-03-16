import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, Building2, MapPin, BarChart3, CheckCircle2, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import reportCover from "@/assets/multifamily-report-cover.png";

/* ─── data ─── */
const WHATS_INSIDE = [
  {
    icon: TrendingUp,
    title: "Rent Trend Analysis",
    description:
      "Year-over-year effective rent growth, concession trends, and submarket-level pricing data across Austin's key multifamily corridors.",
  },
  {
    icon: Building2,
    title: "Vacancy & Supply Forecast",
    description:
      "Current vacancy rates, construction pipeline status, projected deliveries through 2027, and how new supply is reshaping absorption.",
  },
  {
    icon: MapPin,
    title: "Austin Submarket Outlook",
    description:
      "Neighborhood-level analysis of cap rate movement, rent premiums, and which corridors are positioned for early recovery.",
  },
  {
    icon: BarChart3,
    title: "Investor Strategy & Opportunity Areas",
    description:
      "Capital markets conditions, deal flow trends, value-add positioning, and actionable frameworks for acquisition timing.",
  },
];

const TAKEAWAYS = [
  "2026 is likely a stabilization year, not a peak growth year",
  "Supply pressure is easing as new deliveries slow",
  "Select Austin submarkets may recover ahead of the broader market",
];

const reportSchema = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Austin Multifamily Market Outlook 2026",
  description:
    "Institutional-style market analysis covering rents, supply, vacancy, and Austin submarkets positioned for recovery.",
  author: {
    "@type": "Organization",
    name: "Echelon Property Group",
    url: "https://www.echelonpropertygroup.com",
  },
  datePublished: "2026-01-15",
  publisher: {
    "@type": "Organization",
    name: "Echelon Property Group",
  },
  genre: "Market Research Report",
  about: {
    "@type": "Place",
    name: "Austin, Texas",
  },
};

/* ─── component ─── */
const AustinMultifamilyReport2026 = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    investmentFocus: "",
  });

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const scrollToForm = () =>
    document.getElementById("report-form")?.scrollIntoView({ behavior: "smooth" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your first name, last name, and email.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Report on the way",
        description: "Check your inbox — the 2026 Austin Multifamily Outlook is being delivered now.",
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Austin Multifamily Market Outlook 2026"
        description="Download the Austin Multifamily Market Outlook 2026 from Echelon Property Group. Review rent trends, vacancy, supply, and investor opportunities across Austin."
        ogTitle="Austin Multifamily Market Outlook 2026"
        ogDescription="Institutional-style Austin multifamily market analysis from Echelon Property Group."
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reportSchema)}</script>
      </Helmet>
      <Navigation />

      {/* ════════ HERO ════════ */}
      <section className="relative pt-28 pb-14 md:pt-32 md:pb-16 bg-primary overflow-hidden">
        {/* subtle architectural texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gold)/0.06)_0%,transparent_60%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* text */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-minimal text-[hsl(var(--gold))] mb-3">INVESTOR REPORT</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-primary-foreground leading-[1.1] mb-4">
                Austin Multifamily Market Outlook 2026
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/65 leading-relaxed max-w-xl mb-3">
                Institutional-style market analysis covering rents, supply, vacancy, and Austin submarkets positioned for recovery
              </p>
              <p className="text-sm text-[hsl(var(--gold))] tracking-widest uppercase mb-6">
                By Echelon Property Group
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button
                  onClick={scrollToForm}
                  className="bg-[hsl(var(--gold))] text-primary-foreground hover:bg-[hsl(var(--gold-light))] px-8 py-6 text-sm tracking-widest uppercase font-medium transition-all duration-200"
                >
                  Download the Report
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-6 text-sm tracking-widest uppercase font-medium transition-all duration-300"
                >
                  <Link to="/connect">Schedule a Consultation</Link>
                </Button>
              </div>
            </div>
            {/* report mockup — desktop */}
            <div className="hidden md:flex flex-shrink-0 justify-center">
              <img
                src={reportCover}
                alt="Austin Multifamily Market Outlook 2026 report cover"
                title="Austin Multifamily Market Outlook 2026 — Echelon Property Group"
                className="w-80 lg:w-[26rem] drop-shadow-2xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ WHY THIS REPORT MATTERS ════════ */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-minimal text-[hsl(var(--gold))] mb-3">MARKET CONTEXT</p>
            <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-5">
              Why Austin Investors Are Watching 2026 Closely
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Austin's multifamily market is moving from oversupply toward stabilization.
              This report summarizes the major forces shaping the next phase of the cycle,
              including rent trends, new supply, vacancy pressures, and submarkets that
              may recover first.
            </p>
          </div>
        </div>
      </section>

      <div className="border-t border-border/40 max-w-4xl mx-auto" />

      {/* ════════ WHAT'S INSIDE ════════ */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-minimal text-[hsl(var(--gold))] mb-3">REPORT OVERVIEW</p>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural">
                What's Inside
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              {WHATS_INSIDE.map((item) => (
                <Card key={item.title} className="border-border/50 bg-card shadow-none hover:shadow-[var(--shadow-elegant)] transition-shadow duration-500">
                  <CardContent className="p-5 md:p-6">
                    <item.icon className="h-5 w-5 text-[hsl(var(--gold))] mb-3" strokeWidth={1.4} />
                    <h3 className="text-lg font-display font-medium text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ KEY TAKEAWAYS ════════ */}
      <section className="py-12 md:py-16 bg-secondary/40">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-minimal text-[hsl(var(--gold))] mb-3">KEY TAKEAWAYS</p>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural">
                What the Data Tells Us
              </h2>
            </div>
            <div className="space-y-4">
              {TAKEAWAYS.map((text, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-card border border-border/50 rounded-sm">
                  <CheckCircle2 className="h-5 w-5 text-[hsl(var(--gold))] mt-0.5 flex-shrink-0" strokeWidth={1.6} />
                  <p className="text-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ ABOUT ECHELON ════════ */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-minimal text-[hsl(var(--gold))] mb-3">ABOUT</p>
            <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-5">
              Echelon Property Group
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Echelon Property Group provides strategic Austin real estate advisory across luxury homes,
              investment property, commercial real estate, and development opportunities. Our approach
              combines discreet representation with data-driven market intelligence for buyers, sellers,
              and investors.
            </p>
          </div>
        </div>
      </section>

      <div className="border-t border-border/40 max-w-4xl mx-auto" />

      {/* ════════ LEAD FORM ════════ */}
      <section id="report-form" className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-minimal text-[hsl(var(--gold))] mb-3">ACCESS THE REPORT</p>
              <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-3">
                Get the Full Report
              </h2>
              <p className="text-muted-foreground">
                Enter your information to access the report.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-5">
                <CheckCircle2 className="h-12 w-12 text-[hsl(var(--gold))] mx-auto" strokeWidth={1.2} />
                <h3 className="text-2xl font-display font-light text-architectural">
                  Thank You
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  The Austin Multifamily Market Outlook 2026 is on its way to your inbox.
                  In the meantime, schedule a consultation to discuss your investment strategy.
                </p>
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm tracking-widest uppercase font-medium"
                >
                  <Link to="/connect">Schedule a Consultation</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      placeholder="First name"
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      placeholder="Last name"
                      maxLength={100}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="you@example.com"
                    maxLength={255}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="(512) 555-0000"
                    maxLength={20}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="investmentFocus">Investment Focus</Label>
                  <Select
                    value={formData.investmentFocus}
                    onValueChange={(v) => handleChange("investmentFocus", v)}
                  >
                    <SelectTrigger id="investmentFocus">
                      <SelectValue placeholder="Select your focus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acquisition">Acquisition</SelectItem>
                      <SelectItem value="disposition">Disposition</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="value-add">Value-Add</SelectItem>
                      <SelectItem value="general-research">General Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-sm tracking-widest uppercase font-medium"
                >
                  {isSubmitting ? "Sending…" : "Send Me the Report"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ════════ CONSULTATION CTA ════════ */}
      <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--gold)/0.05)_0%,transparent_60%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-minimal text-[hsl(var(--gold))] mb-5">NEXT STEP</p>
            <h2 className="text-3xl md:text-4xl font-display font-light text-primary-foreground leading-tight mb-5">
              Want a Tailored Multifamily Acquisition Strategy?
            </h2>
            <p className="text-primary-foreground/60 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Schedule a private consultation for submarket guidance, acquisition criteria review, or investor matchmaking.
            </p>
            <Button
              asChild
              className="bg-[hsl(var(--gold))] text-primary-foreground hover:bg-[hsl(var(--gold-light))] px-10 py-6 text-sm tracking-widest uppercase font-medium transition-all duration-200"
            >
              <Link to="/connect">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* ════════ STICKY CTA ════════ */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-t border-primary-foreground/10 py-3 px-6 transition-all duration-300 ${
          showSticky ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between gap-4 max-w-5xl">
          <p className="text-primary-foreground text-sm font-medium hidden sm:block">
            Download 2026 Austin Multifamily Report
          </p>
          <Button
            onClick={scrollToForm}
            size="sm"
            className="bg-[hsl(var(--gold))] text-primary-foreground hover:bg-[hsl(var(--gold-light))] text-xs tracking-widest uppercase font-medium px-6 py-2 ml-auto sm:ml-0 transition-all duration-200"
          >
            <ArrowDown className="h-3.5 w-3.5 mr-1.5" />
            Get the Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AustinMultifamilyReport2026;
