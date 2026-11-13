export function validateGuideLead(body: unknown): { name: string; email: string; phone: string; page_url: string } | null {
  if (!body || typeof body !== "object") return null;
  const values = body as Record<string, unknown>;
  const read = (key: string) => typeof values[key] === "string" ? values[key].trim() : "";
  const name = read("name"), email = read("email").toLowerCase(), phone = read("phone");
  if (!name || name.length > 200 || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length > 40) return null;
  return { name, email, phone, page_url: read("page_url").slice(0, 2000) };
}