export function validateGuideLead(body: unknown): { name: string; email: string; phone: string; page_url: string } | null {
  if (!body || typeof body !== "object") return null;
  const values = body as Record<string, unknown>;
  const read = (key: string) => typeof values[key] === "string" ? values[key].trim() : "";
  const name = read("name"), email = read("email").toLowerCase(), phone = read("phone");
  if (!name || name.length > 200 || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[+\d\s().-]+$/.test(phone) || phone.length > 40 || phone.replace(/\D/g, "").length < 7 || phone.replace(/\D/g, "").length > 15) return null;
  return { name, email, phone, page_url: read("page_url").slice(0, 2000) };
}