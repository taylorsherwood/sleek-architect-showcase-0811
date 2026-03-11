import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(20).optional(),
  interest: z.string().min(1, "Please select your interest"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be under 2000 characters")
});

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
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
          access_key: "81cc426e-b1a8-4e5e-b2a0-0d25738dfe12",
          subject: "New Contact Form Submission",
          from_name: "Echelon Property Group Website",
          to: "taylor@echelonpropertygroup.com,echelonpropertygroup@followupboss.me",
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          "Interest": form.interest,
          "Message": form.message,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast({
          title: "Message Sent",
          description: "Thank you for reaching out. We'll be in touch shortly."
        });
        setForm({ name: "", email: "", phone: "", interest: "", message: "" });
      } else {
        toast({
          title: "Submission Failed",
          description: "Something went wrong. Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const inputClass = "w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-foreground placeholder:text-muted-foreground/50 transition-colors duration-300";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-28">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20">
              <div>
                <p className="text-minimal text-gold mb-4">CONTACT US</p>
                <h1 className="text-5xl md:text-6xl font-display font-light text-architectural mb-8">
                  Let's Start a
                  <br />
                  Conversation
                </h1>
                <p className="text-muted-foreground leading-relaxed mb-12">Whether you're considering selling or searching for your next property in Austin, we'd love to hear from you.


                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">EMAIL</h3>
                    <a href="mailto:info@echelonpropertygroup.com" className="text-lg hover:text-muted-foreground transition-colors duration-300">taylor@echelonpropertygroup.com

                    </a>
                  </div>
                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">PHONE</h3>
                    <a href="tel:+15125551234" className="text-lg hover:text-muted-foreground transition-colors duration-300">(512) 661-3843

                    </a>
                  </div>
                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">OFFICE</h3>
                    <address className="text-lg not-italic">2105 East MLK Boulevard Ste 227
Austin, Texas 78702
                    </address>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    maxLength={100} />
                  
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    maxLength={255} />
                  
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (Optional)"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                    maxLength={20} />
                  
                </div>
                <div>
                  <select
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className={`${inputClass} bg-background`}>
                    
                    <option value="">I'm interested in...</option>
                    <option value="selling">Selling My Home</option>
                    <option value="buying">Buying a Home</option>
                    <option value="consultation">Free Consultation</option>
                    <option value="valuation">Home Valuation</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.interest && <p className="text-destructive text-sm mt-1">{errors.interest}</p>}
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Tell us about your goals..."
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    maxLength={2000} />
                  
                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="text-minimal bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-4 transition-colors duration-300 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                  
                  {submitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

};

export default Contact;