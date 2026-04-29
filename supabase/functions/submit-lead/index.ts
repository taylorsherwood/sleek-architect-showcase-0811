const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
  page?: string;
  time?: string;
  [key: string]: unknown;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json().catch(() => null) as null | {
      payload?: LeadPayload;
      webhookUrl?: string;
      extra?: Record<string, unknown>;
      utm?: Record<string, unknown>;
      referrer?: string;
      userAgent?: string;
    };

    const incoming = body?.payload || {};
    const payload: Record<string, string> = {
      name: clean(incoming.name),
      email: clean(incoming.email),
      phone: clean(incoming.phone),
      message: clean(incoming.message),
      source: clean(incoming.source) || "Website Form",
      page: clean(incoming.page),
      time: clean(incoming.time),
    };

    for (const [key, value] of Object.entries(incoming)) {
      if (key in payload || value === undefined || value === null) continue;
      payload[key] = String(value).trim();
    }

    if (!payload.name || !payload.email || (!payload.phone && !payload.message) || !emailRegex.test(payload.email)) {
      console.warn("Submission blocked: missing required fields", payload);
      return json({ ok: false, blocked: true, error: "Submission blocked: missing required fields" }, 400);
    }

    console.log("Validation passed");
    console.log("[Lead submit] outgoing payload", payload);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Lead capture backend is not configured.");
    }

    const extraForDb: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(body?.extra || {})) {
      if (value === undefined || value === null || key.startsWith("utm_")) continue;
      extraForDb[key] = value;
    }

    const utmMerged = { ...(body?.utm || {}), ...(body?.extra || {}) };
    const leadId = crypto.randomUUID();

    const insertRes = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        id: leadId,
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null,
        message: payload.message || null,
        source: payload.source,
        page_url: payload.page || null,
        referrer: clean(body?.referrer) || null,
        user_agent: clean(body?.userAgent) || null,
        utm_source: clean(utmMerged.utm_source) || null,
        utm_medium: clean(utmMerged.utm_medium) || null,
        utm_campaign: clean(utmMerged.utm_campaign) || null,
        utm_term: clean(utmMerged.utm_term) || null,
        utm_content: clean(utmMerged.utm_content) || null,
        extra: extraForDb,
        zapier_status: "pending",
      }),
    });

    if (!insertRes.ok) {
      const detail = await insertRes.text();
      console.error("[Lead capture] DB insert failed", detail);
      return json({ ok: false, error: "Lead could not be saved." }, 500);
    }

    const webhookUrl = clean(body?.webhookUrl);
    if (!webhookUrl || !webhookUrl.startsWith("https://hooks.zapier.com/hooks/catch/")) {
      return json({ ok: false, error: "Invalid lead webhook." }, 400);
    }

    let zapierStatus: "sent" | "failed" = "sent";
    let zapierError: string | null = null;

    try {
      const zapierRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: new URLSearchParams(payload).toString(),
      });

      if (!zapierRes.ok) {
        zapierStatus = "failed";
        zapierError = `Zapier returned ${zapierRes.status}`;
      }
    } catch (error) {
      zapierStatus = "failed";
      zapierError = error instanceof Error ? error.message : "Zapier dispatch failed";
    }

    await fetch(`${supabaseUrl}/rest/v1/leads?id=eq.${leadId}`, {
      method: "PATCH",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ zapier_status: zapierStatus, zapier_error: zapierError }),
    }).catch(() => null);

    if (zapierStatus === "failed") {
      console.error("[Zapier lead submission] dispatch failed", zapierError);
      return json({ ok: false, error: zapierError || "Zapier dispatch failed" }, 502);
    }

    console.log("Payload sent");
    return json({ ok: true, leadId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Lead submit] error", message);
    return json({ ok: false, error: message }, 500);
  }
});
