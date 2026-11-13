import { describe, expect, test } from "bun:test";
import { validateGuideLead } from "../supabase/functions/unlock-relocation-guide/validation";
describe("relocation guide access", () => {
  test("requires client name", () => expect(validateGuideLead({ email: "buyer@example.com" })).toBeNull());
  test("requires valid email", () => {
    expect(validateGuideLead({ name: "Buyer" })).toBeNull();
    expect(validateGuideLead({ name: "Buyer", email: "invalid" })).toBeNull();
  });
  test("phone is optional", () => expect(validateGuideLead({ name: "Buyer", email: "buyer@example.com" })?.phone).toBe(""));
  test("retains provided phone", () => expect(validateGuideLead({ name: "Buyer", email: "buyer@example.com", phone: "5125550123" })?.phone).toBe("5125550123"));
});