import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type BookingRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  start_at: string;
  display_date: string | null;
  display_time: string | null;
  status: string;
  created_at: string;
};

const BookingRequestsPanel = () => {
  const [rows, setRows] = useState<BookingRequest[]>([]);
  const [busy, setBusy] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase
      .from("booking_requests")
      .select("id, name, email, phone, start_at, display_date, display_time, status, created_at")
      .order("created_at", { ascending: false })
      .limit(50);
    setRows((data as BookingRequest[]) || []);
  };

  useEffect(() => {
    load();
  }, []);

  const decide = async (id: string, action: "approve" | "decline") => {
    setBusy(id);
    const { data, error } = await supabase.functions.invoke("book-consultation", { body: { action, id } });
    setBusy(null);
    if (error || !data?.ok) alert(data?.error || "Could not update this request.");
    load();
  };

  return (
    <section className="mt-16">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-2xl font-display text-architectural">Call Requests</h2>
        <p className="text-xs text-muted-foreground">Approved requests go on your calendar and the visitor gets the invitation.</p>
      </div>
      <div className="space-y-px bg-border max-h-[500px] overflow-y-auto">
        {rows.map((r) => (
          <div key={r.id} className="bg-background p-4 flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-architectural">{r.name}</p>
              <p className="text-sm text-muted-foreground">{r.email} • {r.phone}</p>
              <p className="text-sm text-foreground/80 mt-1">
                {r.display_date ?? new Date(r.start_at).toLocaleDateString()} · {r.display_time ?? new Date(r.start_at).toLocaleTimeString()} CT
              </p>
            </div>
            {r.status === "pending" ? (
              <div className="flex gap-2 whitespace-nowrap">
                <button disabled={busy === r.id} onClick={() => decide(r.id, "approve")} className="text-minimal border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors disabled:opacity-50">
                  APPROVE
                </button>
                <button disabled={busy === r.id} onClick={() => decide(r.id, "decline")} className="text-minimal px-4 py-2 text-muted-foreground hover:text-foreground disabled:opacity-50">
                  DECLINE
                </button>
              </div>
            ) : (
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{r.status}</span>
            )}
          </div>
        ))}
        {rows.length === 0 && <p className="bg-background p-4 text-muted-foreground">No call requests yet.</p>}
      </div>
    </section>
  );
};

export default BookingRequestsPanel;
