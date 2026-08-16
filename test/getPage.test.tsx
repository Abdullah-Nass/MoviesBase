import { describe, it, expect } from "vitest";
import getPage from "@/lib/getPage";

describe("getPage", () => {
  it("returns 1 for undefined", () => {
    expect(getPage(undefined)).toBe(1);
  });

  it("returns 1 for a non-numeric string", () => {
    expect(getPage("abc")).toBe(1);
  });

  it("returns 1 for zero", () => {
    expect(getPage("0")).toBe(1);
  });

  it("returns 1 for a negative number", () => {
    expect(getPage("-5")).toBe(1);
  });

  it("returns the correct page for a valid string", () => {
    expect(getPage("3")).toBe(3);
  });

  it("returns the first number when 1+ numbers entered", () => {
    expect(getPage(["2", "5"])).toBe(2);
  });
  it("returns 1 when invalid values entered", () => {
    expect(getPage(["abc", "5"])).toBe(1);
  });
});
