import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Copy, Check } from "lucide-react";

const SITE = "https://www.echelonpropertygroup.com";

const mcpUrl = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/mcp`;

const AgentIntegrations = () => {
  const [copied, setCopied] = useState(false);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(mcpUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* no-op */
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Agent Integrations | Echelon Property Group"
        description="Connect ChatGPT or Claude to Echelon Property Group to browse Austin luxury neighborhoods and editorial content directly inside your AI assistant."
        canonical={`${SITE}/agent-integrations`}
        noindex
      />

      <Navigation />

      <div className="h-24 md:h-32" aria-hidden="true" />

      {/* ── Header ── */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-minimal text-gold mb-5">AGENT INTEGRATIONS</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-architectural leading-[1.12] mb-6">
            Connect Echelon to your AI assistant.
          </h1>
          <p className="text-muted-foreground leading-relaxed text-[1.02rem] max-w-2xl">
            Bring Echelon Property Group's Austin community guides and editorial library into
            ChatGPT or Claude. Once connected, you can ask your assistant about neighborhoods,
            price ranges, and recent articles directly in the chat.
          </p>
        </div>
      </section>

      {/* ── Server URL ── */}
      <section className="py-10 md:py-14 bg-secondary">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-minimal text-gold mb-4">SERVER URL</p>
          <h2 className="text-xl sm:text-2xl font-display font-normal text-architectural mb-6">
            Copy this address, then paste it into ChatGPT or Claude.
          </h2>

          <div className="flex flex-col sm:flex-row items-stretch gap-3 bg-background border border-border/60 rounded-md p-3">
            <code
              className="flex-1 px-3 py-3 text-[13px] sm:text-sm font-mono text-foreground break-all select-all"
              style={{ letterSpacing: "0.01em" }}
            >
              {mcpUrl}
            </code>
            <button
              type="button"
              onClick={copyUrl}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0C0F24] text-white text-[12px] tracking-[0.2em] uppercase font-medium hover:bg-[#b9a06c] transition-colors duration-300 rounded"
              aria-label="Copy server URL"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </section>

      {/* ── ChatGPT ── */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-minimal text-gold mb-4">CHATGPT</p>
          <h2 className="text-2xl sm:text-3xl font-display font-normal text-architectural mb-8">
            Connect from ChatGPT.
          </h2>
          <ol className="space-y-5 text-muted-foreground leading-relaxed text-[1.02rem] list-decimal pl-5 marker:text-gold marker:font-normal">
            <li>
              Open{" "}
              <a
                href="https://chatgpt.com/#settings/Connectors/Advanced"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-[#b9a06c]/40 underline-offset-2 hover:decoration-[#b9a06c] transition-colors"
              >
                ChatGPT connector settings
              </a>{" "}
              and enable Developer mode. Take a moment to read the risk notice shown there.
            </li>
            <li>
              In the chat composer, open the <span className="text-foreground">"+"</span> menu and
              turn on Developer mode.
            </li>
            <li>
              Click <span className="text-foreground">Add sources</span>, then{" "}
              <span className="text-foreground">Connect more</span>.
            </li>
            <li>
              Name the connector (for example, <em>Echelon Property Group</em>) and paste the server
              URL above.
            </li>
            <li>Return to the chat and ask ChatGPT about Austin neighborhoods or recent articles.</li>
          </ol>
        </div>
      </section>

      {/* ── Claude ── */}
      <section className="py-14 md:py-20 bg-secondary">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-minimal text-gold mb-4">CLAUDE</p>
          <h2 className="text-2xl sm:text-3xl font-display font-normal text-architectural mb-8">
            Connect from Claude.
          </h2>
          <ol className="space-y-5 text-muted-foreground leading-relaxed text-[1.02rem] list-decimal pl-5 marker:text-gold marker:font-normal">
            <li>
              Open{" "}
              <a
                href="https://claude.ai/customize/connectors?modal=add-custom-connector"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-[#b9a06c]/40 underline-offset-2 hover:decoration-[#b9a06c] transition-colors"
              >
                Claude's custom connector settings
              </a>
              .
            </li>
            <li>
              Name the connector (for example, <em>Echelon Property Group</em>) and paste the server
              URL above.
            </li>
            <li>
              Enable the connector from the chat composer, then ask Claude about Austin luxury
              communities or blog posts.
            </li>
          </ol>
        </div>
      </section>

      {/* ── What the assistant can do ── */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-minimal text-gold mb-4">WHAT YOUR ASSISTANT CAN DO</p>
          <p className="text-muted-foreground leading-relaxed text-[1.02rem] max-w-2xl">
            Once connected, your assistant can browse Echelon's Austin community guides, look up a
            specific neighborhood by name, and surface recent editorial articles from the Echelon
            journal. All content is public and read only.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AgentIntegrations;
