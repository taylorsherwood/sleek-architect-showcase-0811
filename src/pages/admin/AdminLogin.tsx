import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user && isAdmin) navigate("/admin", { replace: true });
  }, [user, isAdmin, loading, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (signUpError) throw signUpError;
        setInfo("Account created. You can now sign in.");
        setMode("login");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Authentication failed.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <p className="text-minimal text-gold mb-4 tracking-[0.2em]">ECHELON ADMIN</p>
            <h1 className="text-4xl font-display font-normal text-architectural mb-8">
              {mode === "login" ? "Sign in" : "Create account"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-background border border-border text-foreground focus:outline-none focus:border-gold transition-colors"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 bg-background border border-border text-foreground focus:outline-none focus:border-gold transition-colors"
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              {info && <p className="text-sm text-gold">{info}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full text-minimal bg-primary text-primary-foreground hover:bg-gold hover:text-foreground px-8 py-4 transition-colors disabled:opacity-50"
              >
                {submitting
                  ? "PLEASE WAIT..."
                  : mode === "login"
                  ? "SIGN IN"
                  : "CREATE ACCOUNT"}
              </button>
            </form>

            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError(null);
                setInfo(null);
              }}
              className="mt-6 text-sm text-muted-foreground hover:text-foreground"
            >
              {mode === "login"
                ? "Need to create the first admin account? →"
                : "← Back to sign in"}
            </button>

            {user && !isAdmin && !loading && (
              <p className="mt-8 text-sm text-destructive border border-destructive p-4">
                Signed in as {user.email}, but this account does not have admin access.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
