import { Quote } from "lucide-react";
import echelonIcon from "@/assets/echelon-icon.png";

const testimonials = [
{
  quote:
  "Taylor made selling our Barton Creek home seamless. His market knowledge and marketing strategy brought us multiple offers above asking within the first week.",
  name: "James & Sarah Mitchell",
  detail: "SELLER CLIENT"
},
{
  quote:
  "Taylor was fantastic to work with! He really understood what I was looking for and showed me great options that fit my specific criteria. When I was ready to make an offer, he helped things move quickly to meet a tight closing date. I've already recommended Taylor to my friends!",
  name: "Meredith Taylor",
  detail: "BUYER CLIENT"
},
{
  quote:
  "From staging to close, every step was handled with professionalism and care. We couldn't have asked for a better experience.",
  name: "Katherine & Robert Ellis",
  detail: "SELLER CLIENT"
}];


const Testimonials = () => {
  return (
    <section className="pt-16 pb-28 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-minimal text-gold mb-4 text-center font-extrabold">
            CLIENT TESTIMONIALS
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-light text-architectural mb-16 text-center">
            What Our Clients Say
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((t, i) =>
            <div
              key={i}
              className="relative bg-background p-10 flex flex-col justify-between">
              
                <div>
                  <Quote className="w-8 h-8 text-gold mb-6 opacity-60" />
                  <p className="text-muted-foreground leading-relaxed mb-8 italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="border-t border-border pt-6">
                  <p className="font-display text-lg text-foreground">
                    {t.name}
                  </p>
                  <p className="text-minimal text-muted-foreground mt-1">
                    {t.detail}
                  </p>
                </div>
                <img
                  src={echelonIcon}
                  alt=""
                  className="absolute bottom-4 right-4 h-10 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default Testimonials;