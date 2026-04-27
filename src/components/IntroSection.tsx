import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Award, Shield, Globe } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const useCountUp = (
end: number,
duration = 2000,
prefix = "",
suffix = "") =>
{
  const [count, setCount] = useState(end);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const startTime = performance.now();
    let raf: number;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [visible, end, duration]);

  const display = `${prefix}${count}${suffix}`;
  return { ref, display };
};

const useCountDown = (start: number, end: number, duration = 2000) => {
  const [count, setCount] = useState(end);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const startTime = performance.now();
    let raf: number;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start - eased * (start - end)));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [visible, start, end, duration]);

  const display = `Top ${count}%`;
  return { ref, display };
};

const credentials = [
{
  icon: Award,
  label: "Certified Luxury Home Marketing Specialist (CLHMS)"
},
{
  icon: Globe,
  label: "Member of the eXp Luxury Division"
},
{
  icon: Shield,
  label: "Brokered by eXp Realty"
}];


const IntroSection = () => {
  const stat1 = useCountUp(125, 3000, "$", "M+");
  const stat2 = useCountUp(11, 2500, "", "+");
  const stat3 = useCountUp(200, 3000, "", "+");
  const stat4 = useCountDown(20, 1, 2000);

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <p className="text-minimal text-gold mb-4 font-extrabold">
                  THE ECHELON DIFFERENCE
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-normal text-architectural mb-8 whitespace-pre-line">Performance That Speaks{"\n"}for Itself</h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p className="whitespace-pre-line">
                    At Echelon Property Group we believe real estate is more than
                    transactions—it's about creating opportunities and building
                    lasting relationships. With expertise across residential,
                    commercial, and investment properties, our team provides
                    clients with clear guidance, innovative strategies, and
                    personalized service at every step. Whether you're <Link to="/buy" className="text-foreground underline hover:text-gold transition-colors">buying your
                    first home</Link>, scaling a portfolio, or <Link to="/sell" className="text-foreground underline hover:text-gold transition-colors">positioning a property for
                    market</Link>, we bring the local expertise and sharp negotiation
                    skills you need to achieve your goals.{"\n\n"}<em>Buy. Sell.
                    Invest.</em>
                  </p>
                </div>
                <Link
                  to="/about"
                  className="inline-block mt-8 text-minimal text-foreground hover:text-gold transition-colors duration-300 relative group">
                  
                  LEARN MORE ABOUT US
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
            <div className="space-y-6">
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-6">
                <div ref={stat1.ref} className="bg-secondary p-8 text-center rounded-lg border border-border/40" style={{ boxShadow: "0 2px 12px hsl(40 10% 50% / 0.06)" }}>
                  <p className="text-4xl font-display font-normal text-foreground mb-2">
                    {stat1.display}
                  </p>
                  <p className="text-minimal text-muted-foreground">
                    IN CAREER SALES VOLUME
                  </p>
                </div>
                <div ref={stat2.ref} className="bg-secondary p-8 text-center rounded-lg border border-border/40" style={{ boxShadow: "0 2px 12px hsl(40 10% 50% / 0.06)" }}>
                  <p className="text-4xl font-display font-normal text-foreground mb-2">
                    {stat2.display}
                  </p>
                  <p className="text-minimal text-muted-foreground">
                    YEARS EXPERIENCE
                  </p>
                </div>
                <div ref={stat3.ref} className="bg-secondary p-8 text-center rounded-lg border border-border/40" style={{ boxShadow: "0 2px 12px hsl(40 10% 50% / 0.06)" }}>
                  <p className="text-4xl font-display font-normal text-foreground mb-2">
                    {stat3.display}
                  </p>
                  <p className="text-minimal text-muted-foreground">
                    CLIENTS HELPED
                  </p>
                </div>
                <div ref={stat4.ref} className="bg-secondary p-8 text-center rounded-lg border border-border/40" style={{ boxShadow: "0 2px 12px hsl(40 10% 50% / 0.06)" }}>
                  <p className="text-4xl font-display font-normal text-foreground mb-2">
                    {stat4.display}
                  </p>
                  <p className="text-minimal text-muted-foreground">
                    AUSTIN REALTORS
                  </p>
                </div>
              </div>

            </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>);

};

export default IntroSection;