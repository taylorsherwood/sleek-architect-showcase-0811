import React from "react";

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  className?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  title = "Stay Informed",
  description = "A curated note on the Austin market — luxury listings, development trends, and notable local insights.",
  className = "",
}) => {
  return (
    <section className={`bg-secondary ${className}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-foreground"
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              fontWeight: 400,
              letterSpacing: "0.02em",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
            }}
          >
            {title}
          </h2>
          <p
            className="text-foreground/60"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)",
              fontWeight: 300,
              lineHeight: 1.7,
              maxWidth: "520px",
              margin: "0 auto 2.5rem",
            }}
          >
            {description}
          </p>

          <div className="relative w-full overflow-hidden">
            <iframe
              src="https://00a111c2.sibforms.com/v2/serve/MUIFAN8bXYcpoPm94yrwccMYEQRJ8Ifrxf2KRdAekdE_s9K6iWYcxrlTjQ4bz9AJ5VXKTBDTb34a6LjTvnVOO8AF2Ft9yDFzBTToQjBhGwnTqYwaTnFHCTbkSpaVy9K10aXlCQlFVxvvt4tx-290Jp14jL33mMx8VFtlL8j4Nu94VJYS-9M1ga5pNZBonjhUyXaj-a-Ls7Y8m252gA=="
              width="540"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              title="Newsletter Signup"
              className="h-[540px] md:h-[480px] lg:h-[450px]"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "100%",
                width: "100%",
                border: "none",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
