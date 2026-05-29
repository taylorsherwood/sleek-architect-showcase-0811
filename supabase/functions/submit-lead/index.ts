const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const META_PIXEL_ID = "3408564002648259";
const META_GRAPH_VERSION = "v19.0";

/** SHA-256 hex hash (Meta CAPI requirement for PII). */
async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function normPhoneForHash(v: string): string {
  // Meta wants digits only, country code included. Assume US if 10 digits.
  const digits = v.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `1${digits}`;
  return digits;
}

/**
 * Fire a Meta Conversions API "Lead" event. Safe-fails: never throws.
 * Logs success/failure WITHOUT exposing PII or the access token.
 * The caller-supplied event_id is shared with the browser Pixel for dedupe.
 */
async function sendMetaCapiLead(args: {
  eventId: string;
  eventSourceUrl: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  userAgent?: string;
  clientIp?: string;
  fbp?: string;
  fbc?: string;
}): Promise<void> {
  const token = Deno.env.get("META_CAPI_ACCESS_TOKEN");
  if (!token) {
    console.warn("[Meta CAPI] skipped — META_CAPI_ACCESS_TOKEN not configured");
    return;
  }

  const user_data: Record<string, unknown> = {};
  if (args.email) user_data.em = [await sha256Hex(args.email.trim().toLowerCase())];
  if (args.phone) {
    const normed = normPhoneForHash(args.phone);
    if (normed) user_data.ph = [await sha256Hex(normed)];
  }
  if (args.firstName) user_data.fn = [await sha256Hex(args.firstName.trim().toLowerCase())];
  if (args.lastName) user_data.ln = [await sha256Hex(args.lastName.trim().toLowerCase())];
  if (args.userAgent) user_data.client_user_agent = args.userAgent;
  if (args.clientIp) user_data.client_ip_address = args.clientIp;
  if (args.fbp) user_data.fbp = args.fbp;
  if (args.fbc) user_data.fbc = args.fbc;

  const event = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: args.eventId,
    event_source_url: args.eventSourceUrl,
    action_source: "website",
    user_data,
  };

  const url = `https://graph.facebook.com/${META_GRAPH_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [event] }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error(
        `[Meta CAPI] Lead event failed status=${res.status} event_id=${args.eventId} detail=${detail.slice(0, 300)}`
      );
      return;
    }
    console.log(`[Meta CAPI] Lead event sent event_id=${args.eventId}`);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    console.error(`[Meta CAPI] dispatch error event_id=${args.eventId} err=${msg}`);
  }
}

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

    // Build the `extra` JSONB for the leads table by capturing EVERY
    // non-canonical, non-UTM field the client sent — both via the explicit
    // `extra` object and any fields flattened onto the payload. This is a
    // fallback serializer: new/unknown form fields are stored automatically
    // without requiring a code change here.
    const canonicalKeys = new Set([
      "name", "email", "phone", "message", "source", "page", "page_url",
      "time", "submittedAt", "fields_summary", "fields_json",
    ]);
    const extraForDb: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(body?.extra || {})) {
      if (value === undefined || value === null || key.startsWith("utm_")) continue;
      extraForDb[key] = value;
    }
    for (const [key, value] of Object.entries(incoming)) {
      if (value === undefined || value === null) continue;
      if (canonicalKeys.has(key) || key.startsWith("utm_")) continue;
      if (key in extraForDb) continue;
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
    console.error("[Lead submit] unhandled error", message);
    return json({ ok: false, error: "An unexpected error occurred. Please try again." }, 500);
  }
});
