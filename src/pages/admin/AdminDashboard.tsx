import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";

interface CommunityRow {
  id: string;
  slug: string;
  name: string;
  published: boolean;
  updated_at: string;
}

interface LeadRow {
  id: string;
  community_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  interest: string | null;
  created_at: string;
}

interface SiteLeadRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string;
  page_url: string | null;
  zapier_status: "pending" | "sent" | "failed" | "blocked";
  zapier_error: string | null;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [communities, setCommunities] = useState<CommunityRow[]>([]);
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [siteLeads, setSiteLeads] = useState<SiteLeadRow[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    Promise.all([
      supabase.from("communities").select("id, slug, name, published, updated_at").order("sort_order"),
      supabase
        .from("community_leads")
        .select("id, community_name, first_name, last_name, email, phone, interest, created_at")
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("leads")
        .select("id, name, email, phone, message, source, page_url, zapier_status, zapier_error, created_at")
        .order("created_at", { ascending: false })
        .limit(100),
    ]).then(([cRes, lRes, sRes]) => {
      setCommunities((cRes.data as CommunityRow[]) || []);
      setLeads((lRes.data as LeadRow[]) || []);
      setSiteLeads((sRes.data as SiteLeadRow[]) || []);
      setLoadingData(false);
    });
  }, [isAdmin]);

  if (loading) return <div className="min-h-screen bg-background" />;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin)
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-40 text-center">
          <h1 className="text-3xl font-display text-architectural mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">This account does not have admin access.</p>
          <button onClick={signOut} className="text-minimal border border-foreground px-6 py-3">
            SIGN OUT
          </button>
        </div>
      </div>
    );

  const createNew = async () => {
    const slug = prompt("New community slug (e.g. rob-roy):");
    if (!slug) return;
    const name = prompt("Community display name:");
    if (!name) return;
    const { data, error } = await supabase
      .from("communities")
      .insert({ slug, name, gate_enabled: true })
      .select("slug")
      .single();
    if (error) return alert(error.message);
    if (data) navigate(`/admin/communities/${data.slug}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-minimal text-gold mb-2 tracking-[0.2em]">ECHELON ADMIN</p>
              <h1 className="text-4xl font-display font-normal text-architectural">Dashboard</h1>
            </div>
            <button onClick={signOut} className="text-minimal border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors">
              SIGN OUT
            </button>
          </div>

          {loadingData ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Communities */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display text-architectural">Communities</h2>
                  <button
                    onClick={createNew}
                    className="text-sm text-gold hover:underline"
                  >
                    + New community
                  </button>
                </div>
                <div className="space-y-px bg-border">
                  {communities.map((c) => (
                    <Link
                      key={c.id}
                      to={`/admin/communities/${c.slug}`}
                      className="bg-background p-4 flex items-center justify-between hover:bg-secondary transition-colors"
                    >
                      <div>
                        <p className="font-display text-lg text-architectural">{c.name}</p>
                        <p className="text-xs text-muted-foreground">/{c.slug}</p>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 ${
                          c.published ? "bg-gold text-foreground" : "border border-border text-muted-foreground"
                        }`}
                      >
                        {c.published ? "PUBLISHED" : "DRAFT"}
                      </span>
                    </Link>
                  ))}
                  {communities.length === 0 && (
                    <p className="bg-background p-4 text-muted-foreground">No communities yet.</p>
                  )}
                </div>
              </section>

              {/* Leads */}
              <section>
                <h2 className="text-2xl font-display text-architectural mb-6">
                  Recent Leads <span className="text-sm text-muted-foreground">({leads.length})</span>
                </h2>
                <div className="space-y-px bg-border max-h-[600px] overflow-y-auto">
                  {leads.map((l) => (
                    <div key={l.id} className="bg-background p-4">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <p className="font-display text-architectural">
                          {l.first_name} {l.last_name}
                        </p>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(l.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-xs text-gold uppercase tracking-wider mb-1">{l.community_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {l.email} • {l.phone}
                        {l.interest && ` • ${l.interest}`}
                      </p>
                    </div>
                  ))}
                  {leads.length === 0 && (
                    <p className="bg-background p-4 text-muted-foreground">No leads yet.</p>
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
