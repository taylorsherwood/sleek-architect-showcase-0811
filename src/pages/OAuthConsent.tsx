import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";

// Minimal typed wrapper around the beta supabase.auth.oauth namespace
type OAuthResult = {
  data?: {
    client?: { name?: string; client_uri?: string };
    scope?: string;
    redirect_url?: string;
    redirect_to?: string;
  };
  error?: { message: string };
};

const oauth = () => (supabase.auth as unknown as {
  oauth: {
    getAuthorizationDetails: (id: string) => Promise<OAuthResult>;
    approveAuthorization: (id: string) => Promise<OAuthResult>;
    denyAuthorization: (id: string) => Promise<OAuthResult>;
  };
}).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthResult["data"] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id.");
        setChecking(false);
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/admin/login?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        setChecking(false);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data ?? null);
      setChecking(false);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await oauth().approveAuthorization(authorizationId)
      : await oauth().denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto">
            <p className="text-minimal text-gold mb-4 tracking-[0.2em]">AGENT AUTHORIZATION</p>
            {checking && <p className="text-muted-foreground">Loading…</p>}
            {error && (
              <p className="text-sm text-destructive border border-destructive p-4">{error}</p>
            )}
            {details && (
              <>
                <h1 className="text-4xl font-display font-normal text-architectural mb-6">
                  Connect {details.client?.name ?? "an application"} to Echelon Property Group
                </h1>
                <p className="text-muted-foreground mb-8">
                  This lets {details.client?.name ?? "the client"} call Echelon Property Group tools while you are signed in. Only admin accounts can access tools that make changes. This does not bypass your existing access policies.
                </p>
                <div className="flex gap-3">
                  <button
                    disabled={busy}
                    onClick={() => decide(true)}
                    className="text-minimal bg-primary text-primary-foreground hover:bg-gold hover:text-foreground px-8 py-4 transition-colors disabled:opacity-50"
                  >
                    {busy ? "PLEASE WAIT..." : "APPROVE"}
                  </button>
                  <button
                    disabled={busy}
                    onClick={() => decide(false)}
                    className="text-minimal border border-border hover:border-foreground px-8 py-4 transition-colors disabled:opacity-50"
                  >
                    CANCEL
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuthConsent;
