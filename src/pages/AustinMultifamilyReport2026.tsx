import { useState } from "react";
import { Link } from "react-router-dom";
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
import { TrendingUp, Building2, MapPin, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WHATS_INSIDE = [
  {
    icon: TrendingUp,
    title: "Rent & Occupancy Trends",
    description:
      "Submarket-level rent growth data, vacancy rates, and absorption trends across Austin's key corridors.",
  },
  {
    icon: Building2,
    title: "Pipeline & Supply Forecast",
    description:
      "Current construction pipeline, projected deliveries, and how new supply impacts pricing through 2027.",
  },
  {
    icon: MapPin,
    title: "Top Investment Submarkets",
    description:
      "Neighborhood-level analysis of cap rates, rent premiums, and value-add opportunity zones.",
  },
  {
    icon: BarChart3,
    title: "Capital Markets Overview",
    description:
      "Debt market conditions, investor sentiment, and deal flow activity in Austin's multifamily sector.",
  },
];

const AustinMultifamilyReport2026 = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    investmentFocus: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your first name, last name, and email.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Request received",
        description:
          "We'll send the report to your inbox shortly. Thank you for your interest.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        investmentFocus: "",
      });
    }, 1200);
  };

  const scrollToForm = () => {
    document
      .getElementById("report-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Austin Multifamily Market Outlook 2026"
        description="Download the 2026 Austin Multifamily Market Outlook. Rent trends, supply forecasts, top investment submarkets, and capital markets analysis from Echelon Property Group."
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-minimal text-[hsl(var(--gold))] mb-5">
              INVESTOR REPORT
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-light text-primary-foreground leading-[1.1] mb-6">
              Austin Multifamily Market Outlook 2026
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto mb-10">
              Data-driven insights on rent growth, supply pipelines, and
              investment opportunities across Austin's multifamily sector.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToForm}
                className="bg-[hsl(var(--gold))] text-primary-foreground hover:bg-[hsl(var(--gold-light))] px-8 py-6 text-sm tracking-widest uppercase font-medium"
              >
                Download the Report
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-sm tracking-widest uppercase font-medium"
              >
                <Link to="/connect">Schedule a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Report Matters */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-light text-architectural mb-6">
              Why This Report Matters
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Austin's multifamily market is at an inflection point. Record
              deliveries are reshaping submarket dynamics, while sustained
              population growth and employer expansion continue to drive
              demand. Whether you're evaluating acquisitions, planning a
              disposition, or exploring Austin for the first time, this
              report equips you with the data and local perspective to make
              confident decisions.
            </p>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-20 md:py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-light text-architectural text-center mb-14">
              What's Inside
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {WHATS_INSIDE.map((item) => (
                <Card
                  key={item.title}
                  className="border-border/60 bg-card shadow-sm"
                >
                  <CardContent className="p-6 md:p-8">
                    <item.icon
                      className="h-6 w-6 text-[hsl(var(--gold))] mb-4"
                      strokeWidth={1.5}
                    />
                    <h3 className="text-lg font-display font-medium text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="report-form" className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-light text-architectural text-center mb-4">
              Get the Full Report
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Enter your details and we'll send the 2026 Austin Multifamily
              Outlook directly to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                    <SelectItem value="general-research">
                      General Research
                    </SelectItem>
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
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-light text-primary-foreground leading-tight mb-5">
              Ready to Discuss Your Investment Strategy?
            </h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Connect with Taylor Sherwood for a confidential consultation on
              Austin multifamily opportunities tailored to your portfolio goals.
            </p>
            <Button
              asChild
              className="bg-[hsl(var(--gold))] text-primary hover:bg-[hsl(var(--gold-light))] px-10 py-6 text-sm tracking-widest uppercase font-medium"
            >
              <Link to="/connect">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AustinMultifamilyReport2026;
