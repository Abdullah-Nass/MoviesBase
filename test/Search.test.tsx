import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, vi, Mock, it } from "vitest";
import { searchMovies } from "@/lib/tmdb-client";
import Search from "@/components/Search";
import { render, screen, waitFor } from "./test-utils";
import userEvent from "@testing-library/user-event";

describe("Search Component", () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as Mock).mockReturnValue({ push: mockPush });
  });

  it("renders the input and button", () => {
    render(<Search />);
    expect(screen.getByPlaceholderText("Search movies...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("submits a search via the button and navigates to the search page", async () => {
    const user = userEvent.setup();

    render(<Search />);
    const input = screen.getByPlaceholderText("Search movies...");
    const button = screen.getByRole("button", { name: "Search" });

    await user.type(input, "Spider");
    await user.click(button);

    expect(mockPush).toHaveBeenCalledWith("/en/search?q=Spider&page=1");

    expect(input).toHaveValue("");
  });

  it("does not submit if the input is empty", async () => {
    const user = userEvent.setup();
    render(<Search />);

    const button = screen.getByRole("button", { name: "Search" });
    await user.click(button);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("displays dropdown results when typing", async () => {
    const user = userEvent.setup();

    (searchMovies as Mock).mockResolvedValue({
      results: [
        { id: 1, title: "Spider Man 1" },
        { id: 2, title: "Spider Man 2" },
      ],
    });

    render(<Search />);
    const input = screen.getByPlaceholderText("Search movies...");

    await user.type(input, "Spid");

    await waitFor(() => {
      expect(screen.getByText("Spider Man 1")).toBeInTheDocument();
      expect(screen.getByText("Spider Man 2")).toBeInTheDocument();
    });
  });

  it("renders the correct href for dropdown results", async () => {
    const user = userEvent.setup();

    (searchMovies as Mock).mockResolvedValue({
      results: [{ id: 123, title: "Batman" }],
    });

    render(<Search />);
    const input = screen.getByPlaceholderText("Search movies...");

    await user.type(input, "Bat");

    const resultLink = await screen.findByText("Batman");
    await user.click(resultLink);

    expect(resultLink).toHaveAttribute("href", "/en/movie/123");
  });
});
