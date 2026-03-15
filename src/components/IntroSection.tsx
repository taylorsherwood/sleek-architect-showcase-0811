import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Award, Shield, Globe } from "lucide-react";

const useCountUp = (
  end: number,
  duration = 2000,
  prefix = "",
  suffix = "",
) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, end, duration]);

  const display = `${prefix}${count}${suffix}`;
  return { ref, display };
};

const credentials = [
  {
    icon: Award,
    label: "Certified Luxury Home Marketing Specialist (CLHMS)",
  },
  {
    icon: Globe,
    label: "Member of the eXp Luxury Division",
  },
  {
    icon: Shield,
    label: "Brokered by eXp Realty",
  },
];

const IntroSection = () => {
  const stat1 = useCountUp(100, 3000, "$", "M+");
  const stat2 = useCountUp(11, 2500, "", "+");
  const stat3 = useCountUp(200, 3000, "", "+");
  const stat4 = useCountUp(1, 2000, "Top ", "%");

  return (
    <section className="pt-14 pb-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-minimal text-gold mb-4 font-extrabold">
                THE ECHELON DIFFERENCE
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-8">
                Unmatched Expertise in Austin Real Estate
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p className="whitespace-pre-line">
                  At Echelon Property Group we believe real estate is more than
                  transactions—it's about creating opportunities and building
                  lasting relationships. With expertise across residential,
                  commercial, and investment properties, our team provides
                  clients with clear guidance, innovative strategies, and
                  personalized service at every step. Whether you're buying your
                  first home, scaling a portfolio, or positioning a property for
                  market, we bring the local expertise and sharp negotiation
                  skills you need to achieve your goals.{"\n\n\n"}Buy. Sell.
                  Invest.
                </p>
              </div>
              <Link
                to="/about"
                className="inline-block mt-8 text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300 relative group"
              >
                LEARN MORE ABOUT US
                <span className="absolute bottom-0 left-0 w-full h-px bg-foreground group-hover:bg-muted-foreground transition-colors duration-300" />
              </Link>
            </div>

            <div className="space-y-6">
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-6">
                <div ref={stat1.ref} className="bg-secondary p-8 text-center rounded-lg">
                  <p className="text-4xl font-display font-light text-foreground mb-2">
                    {stat1.display}
                  </p>
                  <p className="text-minimal text-muted-foreground">
                    IN CAREER SALES VOLUME
                  </p>
                </div>
                <div ref={stat2.ref} className="bg-secondary p-8 text-center rounded-lg">
                  <p className="text-4xl font-display font-light text-foreground mb-2">
                    {stat2.display}
                  </p>
                  <p className="text-minimal text-muted-foreground">
                    YEARS EXPERIENCE
                  </p>
                </div>
                <div ref={stat3.ref} className="bg-secondary p-8 text-center rounded-lg">
                  <p className="text-4xl font-display font-light text-foreground mb-2">
                    {stat3.display}
                  </p>
                  <p className="text-minimal text-muted-foreground">
                    CLIENTS HELPED
                  </p>
                </div>
                <div ref={stat4.ref} className="bg-secondary p-8 text-center rounded-lg">
                  <p className="text-4xl font-display font-light text-foreground mb-2">
                    {stat4.display}
                  </p>
                  <p className="text-minimal text-muted-foreground">
                    AUSTIN REALTORS
                  </p>
                </div>
              </div>

              {/* Credentials */}
              <div className="bg-secondary/60 border border-border/40 rounded-lg p-6">
                <div className="space-y-4">
                  {credentials.map((cred, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <cred.icon className="w-4 h-4 text-gold shrink-0" />
                      <p className="text-sm text-muted-foreground font-light">
                        {cred.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
