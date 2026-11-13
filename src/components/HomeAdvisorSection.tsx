import evLogo from "@/assets/engel-volkers-echelon-logo.png.asset.json";
import taylorBoatImg from "@/assets/taylor-headshot.webp";
import taylorSignature from "@/assets/taylor-signature.webp";
import echelonWatermarkLogo from "@/assets/echelon-watermark-logo.png";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";

const AdvisorSection = () => (
  <section className="bg-secondary pt-12 md:pt-20">
    <div className="max-w-[1400px] mx-auto">
       <div className="grid lg:grid-cols-[minmax(480px,520px)_1fr] items-start" style={{ gap: 0 }}>
         {/* Left, editorial portrait */}
          <div className="relative flex flex-col items-center bg-secondary w-full overflow-hidden">
            <div className="relative w-full p-4 md:pt-14">
              <img
                src={taylorBoatImg}
                alt="Taylor Sherwood, Austin luxury real estate advisor and founder of Echelon Property Group"
                title="Taylor Sherwood, Echelon Property Group"
                className="w-full h-[400px] md:h-[700px] object-cover object-center rounded-sm"
                loading="lazy" decoding="async"
                sizes="(max-width: 1024px) 100vw, 480px"
                width={520}
                height={693}
                style={{ filter: "brightness(0.96) contrast(1.03)" }}
              />
              <div className="absolute inset-4 rounded-sm pointer-events-none" style={{
                boxShadow: "inset 0 0 60px 20px hsl(var(--secondary) / 0.15)",
              }} />
            </div>

            {/* Brokerage logo */}
            <div className="flex w-full justify-center pt-8 pb-2 px-4">
              <img src={evLogo.url} alt="Engel & Völkers Echelon Property Group logo" className="w-full max-w-[260px] h-auto" loading="lazy" decoding="async" width={1916} height={398} />
            </div>
          </div>

        {/* Right, content */}
        <div className="flex flex-col justify-center bg-secondary lg:-mt-14" style={{ padding: "clamp(36px, 5vw, 64px)" }}>
          <ScrollReveal>
            <Link to="/taylor-sherwood" className="inline-block text-minimal text-gold mb-6 hover:opacity-80 transition-opacity">
              TAYLOR SHERWOOD, FOUNDER
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2 className="font-display text-[1.85rem] md:text-[2.6rem] font-normal text-foreground leading-[1.06] tracking-[0.03em] mb-6">
              Access Meets Expertise
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <p className="text-foreground text-lg md:text-[1.3rem] font-medium leading-[1.4] mb-7 tracking-[-0.01em]" style={{ fontFamily: '"Jost", sans-serif', fontWeight: 400 }}>
              Most people search for properties. My clients <i>acquire</i> them.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="relative overflow-visible">
              <img
                src={echelonWatermarkLogo}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute pointer-events-none select-none hidden md:block"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-32%, -72%)',
                  height: '100%',
                  width: 'auto',
                  opacity: 0.06,
                }}
              />
            <div className="relative space-y-4 mb-14" style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300 }}>
                  <p className="text-foreground/70 text-[16px] leading-[1.8]">
                    In Austin's upper tier, the best opportunities are rarely public. They are negotiated, sourced, and secured through relationships, timing, and leverage- not search portals.
                  </p>
                <p className="text-foreground/70 text-[16px] leading-[1.8]">
                  I operate in that space.
                </p>
                <p className="text-foreground/70 text-[16px] leading-[1.8]">
                  I work with a select group of buyers, sellers, and investors to navigate high-value real estate with precision. That includes private and off-market opportunities, strategic acquisitions, and positioning properties to command maximum value.
                </p>
                <p className="text-foreground/70 text-[16px] leading-[1.8]">
                  This is <strong className="underline">not</strong> a volume business. It's a strategy business. In fact, ~95%+ of my sales never touch MLS or Zillow.
                </p>
                <p className="text-foreground/70 text-[16px] leading-[1.8]">
                  Every move is intentional, from how a property is sourced, to how it's negotiated, to how it's presented to the market. The difference isn't subtle. It's measurable in outcomes.
                </p>
                <p className="text-foreground/70 text-[16px] leading-[1.8]">
                  If you're looking for <em>access</em>, <em>clarity</em>, and <em>execution</em> at a higher level, you're ready to join the <em>upper echelon</em>. 
                  You don't need more listings, you need a <em>smarter approach</em>. &nbsp;
                </p>
                 <p className="text-foreground/55 text-[15px] leading-[1.8] mt-4 font-serif italic whitespace-pre-wrap">
                   {"Buy. Sell. Invest. \n\n"}
                   <span className="font-normal text-foreground/70">Let's get to work,</span>
                 </p>
                 <div className="!mt-0 !pt-0 -mb-8"><img src={taylorSignature} alt="Taylor Sherwood signature" className="block h-[140px] opacity-80 -translate-y-4" loading="lazy" decoding="async" width={341} height={140} /></div>
              </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-[auto_auto] items-center gap-y-12 gap-x-10 justify-start">
              {/* Row 1, CTAs */}
              <Link
                to="/contact"
                className="inline-block text-minimal px-8 py-3.5 transition-all duration-300"
                style={{
                  border: "1px solid hsl(var(--gold))",
                  color: "hsl(var(--gold))",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "hsl(var(--gold))";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "hsl(var(--gold))";
                }}
              >
                WORK WITH ME
              </Link>
              <Link to="/past-transactions"
                className="relative inline-flex items-center text-muted-foreground/45 hover:text-gold transition-colors duration-[450ms] group/link"
                style={{ fontFamily: '"Jost", sans-serif', fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 400 }}>
                VIEW PAST TRANSACTIONS
                <span aria-hidden="true" className="ml-1.5 inline-block transition-transform duration-500 ease-out group-hover/link:translate-x-1">→</span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-gold scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>

              {/* Row 2, Socials */}
              <a
                href="https://www.instagram.com/theinvestorbroker/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold group/ig"
                style={{ fontFamily: '"Jost", sans-serif', fontSize: "9.5px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 300 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span className="relative leading-none font-semibold">
                  @THEINVESTORBROKER
                  <span className="absolute left-0 -bottom-0.5 w-full h-px bg-gold scale-x-0 group-hover/ig:scale-x-100 transition-transform duration-500 origin-center" />
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/taylorsherwood/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 text-gold group/li"
                style={{ fontFamily: '"Jost", sans-serif', fontSize: "9.5px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 300 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="flex-shrink-0"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <span className="relative leading-none font-semibold">
                  TAYLOR SHERWOOD
                  <span className="absolute left-0 -bottom-0.5 w-full h-px bg-gold scale-x-0 group-hover/li:scale-x-100 transition-transform duration-500 origin-center" />
                </span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
);

export default AdvisorSection;
