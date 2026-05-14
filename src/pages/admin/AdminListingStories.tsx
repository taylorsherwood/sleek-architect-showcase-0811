import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";

interface Row {
  id: string;
  slug: string;
  title: string;
  is_published: boolean;
  updated_at: string;
  price: number | null;
  neighborhood: string | null;
}

const AdminListingStories = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    if (!isAdmin) return;
    supabase
      .from("listings")
      .select("id, slug, title, is_published, updated_at, price, neighborhood")
      .order("updated_at", { ascending: false })
      .then(({ data }) => setRows((data as Row[]) || []));
  }, [isAdmin]);

  if (loading) return <div className="min-h-screen bg-background" />;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/admin" replace />;

  const create = async () => {
    const slug = prompt("Slug for new listing (e.g. 1234-westlake-dr):");
    if (!slug) return;
    const title = prompt("Listing title:");
    if (!title) return;
    const { data, error } = await supabase
      .from("listings")
      .insert({ slug, title })
      .select("slug")
      .single();
    if (error) return alert(error.message);
    if (data) navigate(`/admin/listing-stories/${data.slug}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.3em] text-gold mb-2 uppercase">Echelon Admin</p>
              <h1 className="font-display text-3xl md:text-4xl text-architectural">Listing Stories</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-gold">
                ← Dashboard
              </Link>
              <button
                onClick={create}
                className="text-xs tracking-[0.3em] uppercase bg-foreground text-background px-5 py-3 hover:bg-gold hover:text-foreground transition-colors"
              >
                + New Listing
              </button>
            </div>
          </div>

          <div className="space-y-px bg-foreground/10">
            {rows.map((r) => (
              <Link
                key={r.id}
                to={`/admin/listing-stories/${r.slug}`}
                className="bg-background p-5 flex items-center justify-between hover:bg-[#FAFAF8] transition-colors"
              >
                <div>
                  <p className="font-display text-lg text-architectural">{r.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    /listing/{r.slug}
                    {r.neighborhood && ` · ${r.neighborhood}`}
                    {r.price && ` · $${Math.round(r.price).toLocaleString()}`}
                  </p>
                </div>
                <span
                  className={`text-[10px] tracking-[0.25em] uppercase px-3 py-1 ${
                    r.is_published ? "bg-gold text-foreground" : "border border-foreground/20 text-muted-foreground"
                  }`}
                >
                  {r.is_published ? "Live" : "Draft"}
                </span>
              </Link>
            ))}
            {rows.length === 0 && (
              <p className="bg-background p-6 text-muted-foreground text-center">
                No listings yet. Create your first listing story.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminListingStories;
