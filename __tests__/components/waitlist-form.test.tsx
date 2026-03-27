import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WaitlistForm } from "@/components/landing/waitlist-form";

describe("WaitlistForm", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("renders email input and submit button", () => {
    render(<WaitlistForm />);
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /join the waitlist/i })
    ).toBeInTheDocument();
  });

  it("displays custom button text", () => {
    render(<WaitlistForm buttonText="Get Early Access" />);
    expect(
      screen.getByRole("button", { name: /get early access/i })
    ).toBeInTheDocument();
  });

  it("shows loading state during submission", async () => {
    const user = userEvent.setup();
    // Fetch never resolves to keep loading state visible
    (fetch as any).mockReturnValue(new Promise(() => {}));

    render(<WaitlistForm />);
    await user.type(screen.getByLabelText("Email address"), "test@example.com");
    await user.click(screen.getByRole("button", { name: /join the waitlist/i }));

    expect(screen.getByText("Joining...")).toBeInTheDocument();
  });

  it("shows success message after successful submission", async () => {
    const user = userEvent.setup();
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, position: 2848 }),
    });

    render(<WaitlistForm />);
    await user.type(screen.getByLabelText("Email address"), "test@example.com");
    await user.click(screen.getByRole("button", { name: /join the waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText(/you're in/i)).toBeInTheDocument();
    });
  });

  it("shows error message on API error", async () => {
    const user = userEvent.setup();
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Invalid email" }),
    });

    render(<WaitlistForm />);
    await user.type(screen.getByLabelText("Email address"), "test@example.com");
    await user.click(screen.getByRole("button", { name: /join the waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });

  it("shows fallback error on network failure", async () => {
    const user = userEvent.setup();
    (fetch as any).mockRejectedValueOnce(new Error("Network error"));

    render(<WaitlistForm />);
    await user.type(screen.getByLabelText("Email address"), "test@example.com");
    await user.click(screen.getByRole("button", { name: /join the waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
