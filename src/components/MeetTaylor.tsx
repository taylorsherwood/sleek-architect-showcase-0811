import clhmsBadge from "@/assets/clhms-badge.png";

const MeetTaylor = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-display font-light text-architectural mb-1 md:w-1/2 text-center">
            Meet Taylor Sherwood
          </h3>
          <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground/60 mb-8 md:w-1/2 text-center">CLHMS</p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                alt="Taylor Sherwood"
                className="w-full h-[50vh] md:h-[60vh] object-contain"
                src="/lovable-uploads/537facb0-1fbc-450c-8c4a-c1d06c4aa924.jpg" />
              <img src={clhmsBadge} alt="CLHMS Guild Badge" className="w-14 h-14 mt-4 mx-auto md:mx-0 opacity-80" />
            </div>
            
            <div>
            <p className="text-muted-foreground leading-relaxed max-w-md text-xl">
              Taylor Sherwood is an Austin based real estate advisor specializing in distinctive homes, luxury properties, and land opportunities. Known for his attention to detail and thoughtful approach to marketing, he helps clients navigate complex transactions with confidence while showcasing properties in their best possible light.
              {"\n\n\n"}
              With a strong understanding of the local market and a focus on quality properties, he works closely with buyers and sellers to ensure every transaction is handled with care, discretion, and strategic insight.
            </p>
          </div>
          </div>
        </div>
      </div>
    </section>);

};

export default MeetTaylor;
