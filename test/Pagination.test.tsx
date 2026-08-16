import { describe, expect, it } from "vitest";
import { render, screen } from "./test-utils";
import Pagination from "@/components/Pagination";

describe("Pagination", () => {
  it("render navigation element", () => {
    render(<Pagination currentPage={1} totalPages={10} path="trending" />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
  it("disables previous on first page", () => {
    render(<Pagination currentPage={1} totalPages={10} path="trending" />);
    screen.debug();
    const prev = screen.getByText("Previous");
    expect(prev.tagName).toBe("SPAN");
  });
  it("show next as link on first page", () => {
    render(<Pagination currentPage={1} totalPages={10} path="trending" />);
    const next = screen.getByText("Next");
    expect(next.tagName).toBe("A");
  });
  it("disable next on last page", () => {
    render(<Pagination currentPage={10} totalPages={10} path="trending" />);
    const next = screen.getByText("Next");
    expect(next.tagName).toBe("SPAN");
  });
  it("show previous on last page", () => {
    render(<Pagination currentPage={10} totalPages={10} path="trending" />);
    const prev = screen.getByText("Previous");
    expect(prev.tagName).toBe("A");
  });
  it("show both on middle page", () => {
    render(<Pagination currentPage={5} totalPages={10} path="trending" />);
    const prev = screen.getByText("Previous");
    const next = screen.getByText("Next");
    expect(prev.tagName).toBe("A");
    expect(next.tagName).toBe("A");
  });
  it("builds the correct next URL", () => {
    render(<Pagination currentPage={5} totalPages={10} path="trending" />);
    expect(screen.getByText("Next")).toHaveAttribute(
      "href",
      "/trending?page=6",
    );
  });
  it("builds the correct previous URL", () => {
    render(<Pagination currentPage={5} totalPages={10} path="trending" />);
    expect(screen.getByText("Previous")).toHaveAttribute(
      "href",
      "/trending?page=4",
    );
  });

  it("includes the correct params", () => {
    render(
      <Pagination
        path="search"
        currentPage={4}
        totalPages={10}
        query="Spider Man"
      />,
    );

    expect(screen.getByText("Previous")).toHaveAttribute(
      "href",
      "/search?q=Spider+Man&page=3",
    );
    expect(screen.getByText("Next")).toHaveAttribute(
      "href",
      "/search?q=Spider+Man&page=5",
    );
  });
});
