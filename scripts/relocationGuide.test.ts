import { describe, expect, test } from "bun:test";
import { validateGuideLead } from "../supabase/functions/unlock-relocation-guide/validation";
describe("relocation guide access", () => {
  test("requires client name", () => expect(validateGuideLead({ email: "buyer@example.com", phone: "5125550123" })).toBeNull());
  test("requires valid email", () => {
    expect(validateGuideLead({ name: "Buyer", phone: "5125550123" })).toBeNull();
    expect(validateGuideLead({ name: "Buyer", email: "invalid", phone: "5125550123" })).toBeNull();
  });
  test("requires phone before visitor access", () => {
    for (const phone of [undefined, "", "   ", "abc", "123", "1234567890123456"]) {
      expect(validateGuideLead({ name: "Buyer", email: "buyer@example.com", phone })).toBeNull();
    }
  });
  test("retains provided phone", () => expect(validateGuideLead({ name: "Buyer", email: "buyer@example.com", phone: "5125550123" })?.phone).toBe("5125550123"));
});