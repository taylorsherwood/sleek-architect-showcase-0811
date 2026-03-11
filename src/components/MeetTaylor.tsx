const MeetTaylor = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-display font-light text-architectural mb-8">
            Meet Taylor Sherwood
          </h3>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              alt="Taylor Sherwood"
              className="w-full h-[50vh] md:h-[60vh] object-contain"
              src="/lovable-uploads/537facb0-1fbc-450c-8c4a-c1d06c4aa924.jpg"
            />
            <div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Taylor Sherwood is a top-performing Austin real estate advisor specializing in commercial, luxury, and land development opportunities. With a background in economics and a reputation for precision deal-making, Taylor helps investors, developers, and high-net-worth clients identify, structure, and execute winning real estate strategies across Central Texas.
              {"\n\n"}
              Known for his sharp market insight and hands-on approach, Taylor advises on everything from off-market commercial acquisitions and land assemblages to luxury residential and development projects. His experience spans investment underwriting, land development strategy, value-add positioning, and high-end residential sales — giving clients a full-spectrum advantage.
              {"\n\n"}
              Taylor's clients value his ability to cut through noise, uncover hidden opportunities, and negotiate aggressively on their behalf. Whether it's sourcing development sites, positioning a luxury asset for maximum exposure, or structuring complex commercial transactions, Taylor brings clarity, confidence, and results.
              {"\n\n"}
              When he's not closing deals, Taylor stays deeply engaged in Austin's growth and development landscape — because in this city, tomorrow's best opportunities are being built today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTaylor;
