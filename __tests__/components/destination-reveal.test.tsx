import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DestinationReveal } from "@/components/landing/destination-reveal";
import type { Destination } from "@/lib/types";

// Mock confetti
vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

// Mock destination details
vi.mock("@/lib/destination-details", () => ({
  DESTINATION_DETAILS: {
    "1": {
      unsplash_photo_id: "photo123",
      best_time_to_visit: "Apr-Jun",
      budget_range: { low: 100, high: 250, currency: "EUR" },
      visa_info: "Visa-free for 90 days",
      airport_code: "CDG",
      highlights: ["Eiffel Tower"],
      itinerary: [],
    },
  },
}));

// Mock the hero image component
vi.mock("@/components/destination-hero-image", () => ({
  default: () => <div data-testid="hero-image" />,
}));

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

const mockDestination: Destination = {
  id: "1",
  name: "Paris",
  country: "France",
  region: "Europe",
  latitude: 48.8566,
  longitude: 2.3522,
  description: "The City of Light",
  image_url: null,
};

const defaultProps = {
  destination: mockDestination,
  isSaved: false,
  onBookTrip: vi.fn(),
  onSpinAgain: vi.fn(),
  onSave: vi.fn(),
  onShare: vi.fn(),
};

describe("DestinationReveal", () => {
  it("renders destination name, country, region, and description", () => {
    render(<DestinationReveal {...defaultProps} />);
    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByText("Europe")).toBeInTheDocument();
    expect(screen.getByText("The City of Light")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<DestinationReveal {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: /book this trip/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /spin again/i })
    ).toBeInTheDocument();
  });

  it("calls onBookTrip when Book button clicked", async () => {
    const user = userEvent.setup();
    render(<DestinationReveal {...defaultProps} />);
    await user.click(screen.getByRole("button", { name: /book this trip/i }));
    expect(defaultProps.onBookTrip).toHaveBeenCalledOnce();
  });

  it("calls onSpinAgain when Spin Again clicked", async () => {
    const user = userEvent.setup();
    render(<DestinationReveal {...defaultProps} />);
    await user.click(screen.getByRole("button", { name: /spin again/i }));
    expect(defaultProps.onSpinAgain).toHaveBeenCalledOnce();
  });

  it("shows detail cards with Best Time, Budget, Visa", () => {
    render(<DestinationReveal {...defaultProps} />);
    expect(screen.getByText("Best Time")).toBeInTheDocument();
    expect(screen.getByText("Apr-Jun")).toBeInTheDocument();
    expect(screen.getByText("Daily Budget")).toBeInTheDocument();
    expect(screen.getByText("Visa")).toBeInTheDocument();
    expect(screen.getByText("Visa-free for 90 days")).toBeInTheDocument();
  });

  it("shows tagline text", () => {
    render(<DestinationReveal {...defaultProps} />);
    expect(screen.getByText("Your next adventure")).toBeInTheDocument();
  });
});
