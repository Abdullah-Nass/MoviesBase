import { describe, it, expect } from "vitest";
import { render, screen } from "./test-utils";
import Button from "@/components/Button";

describe("Button", () => {
  it("renders item content", () => {
    render(<Button content="Show All" path="trending" />);
    expect(screen.getByText("Show All")).toBeInTheDocument();
  });

  it("give correct href", () => {
    render(<Button content="Show All" path="trending" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/en/trending");
  });
  it("renders icon", () => {
    render(<Button content="Show All" path="trending" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
  it("renders go to home", () => {
    render(<Button content="Go Home" direction="back" path="/" />);
    expect(screen.getByText("Go Home")).toBeInTheDocument();
  });
});
