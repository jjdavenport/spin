"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { DESTINATIONS } from "@/lib/mock-data";
import { DESTINATION_DETAILS } from "@/lib/destination-details";
import {
  getSkyscannerLink,
  getBookingLink,
  getViatorLink,
} from "@/lib/affiliate-links";
import DestinationHeroImage from "@/components/destination-hero-image";
import { useSavedDestinations } from "@/lib/hooks/use-saved-destinations";
import { useShare } from "@/lib/hooks/use-share";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  ArrowLeft,
  Plane,
  Hotel,
  Map,
  Heart,
  Share2,
  RotateCcw,
  Calendar,
  DollarSign,
  FileText,
  Check,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function DestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const { toggleSave, isSaved } = useSavedDestinations();
  const { share } = useShare();

  const destination = DESTINATIONS.find((d) => d.id === id);
  const details = DESTINATION_DETAILS[id];

  if (!destination) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Destination not found</h1>
          <Button
            variant="ghost"
            onClick={() => router.push("/spin")}
            className="mt-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Globe
          </Button>
        </div>
      </div>
    );
  }

  const saved = isSaved(destination.id);

  const handleSubscribe = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubscribing(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, destinationId: destination.id }),
      });

      if (res.ok) {
        setSubscribed(true);
        toast.success("You're on the list!");
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setSubscribing(false);
    }
  };

  const handleShare = async () => {
    const result = await share(destination);
    if (result === "copied") toast.success("Link copied to clipboard!");
  };

  const handleSave = () => {
    toggleSave(destination.id);
    toast.success(
      saved
        ? `Removed ${destination.name} from saved`
        : `Saved ${destination.name} for later`
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] sm:h-[60vh]">
        {details && (
          <DestinationHeroImage
            unsplashPhotoId={details.unsplash_photo_id}
            destinationName={destination.name}
            region={destination.region}
            className="absolute inset-0"
          />
        )}

        {/* Back button */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/spin")}
            className="text-white hover:text-white hover:bg-white/20 rounded-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Globe
          </Button>
        </div>

        {/* Save + Share buttons */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className={`rounded-full text-white hover:text-white hover:bg-white/20 ${
              saved ? "text-rose-400 hover:text-rose-400" : ""
            }`}
          >
            <Heart
              className="h-5 w-5"
              fill={saved ? "currentColor" : "none"}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="rounded-full text-white hover:text-white hover:bg-white/20"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Hero text overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-10">
          <Badge variant="secondary" className="mb-3">
            {destination.region}
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-bold text-white">
            {destination.name}
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 mt-1">
            {destination.country}
          </p>
          <p className="text-base text-white/60 mt-3 max-w-2xl leading-relaxed">
            {destination.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* Quick Stats */}
        {details && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Best Time to Visit
                  </p>
                  <p className="text-sm font-medium mt-1">
                    {details.best_time_to_visit}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Daily Budget
                  </p>
                  <p className="text-sm font-medium mt-1">
                    {details.budget_range.currency}{" "}
                    {details.budget_range.low}–{details.budget_range.high}{" "}
                    per day
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Visa Info</p>
                  <p className="text-sm font-medium mt-1">
                    {details.visa_info}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Booking Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Book Your Trip</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="group hover:border-primary/30 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Plane className="h-5 w-5 text-blue-400" />
                  </div>
                  <CardTitle className="text-base">Flights</CardTitle>
                </div>
                <CardDescription>
                  Find the best flights to{" "}
                  {details?.airport_code || destination.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={getSkyscannerLink(
                    details?.airport_code || destination.name
                  )}
                  target="_blank"
                  rel="noopener sponsored"
                >
                  <Button
                    variant="secondary"
                    className="w-full"
                    size="sm"
                  >
                    Search Flights
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/30 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Hotel className="h-5 w-5 text-green-400" />
                  </div>
                  <CardTitle className="text-base">Hotels</CardTitle>
                </div>
                <CardDescription>
                  Find places to stay in {destination.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={getBookingLink(
                    destination.name,
                    destination.country
                  )}
                  target="_blank"
                  rel="noopener sponsored"
                >
                  <Button
                    variant="secondary"
                    className="w-full"
                    size="sm"
                  >
                    Search Hotels
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/30 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <Map className="h-5 w-5 text-amber-400" />
                  </div>
                  <CardTitle className="text-base">Experiences</CardTitle>
                </div>
                <CardDescription>
                  Top tours and activities in {destination.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={getViatorLink(destination.name)}
                  target="_blank"
                  rel="noopener sponsored"
                >
                  <Button
                    variant="secondary"
                    className="w-full"
                    size="sm"
                  >
                    Browse Experiences
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mini Itinerary */}
        {details && details.itinerary.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">
              3 Days in {destination.name}
            </h2>
            <div className="space-y-4">
              {details.itinerary.map((day) => (
                <Card key={day.day}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          Day {day.day}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {day.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {day.description}
                        </p>
                        {day.booking_type === "experience" && (
                          <a
                            href={getViatorLink(
                              `${destination.name} ${day.title}`
                            )}
                            target="_blank"
                            rel="noopener sponsored"
                          >
                            <Button
                              variant="link"
                              size="sm"
                              className="px-0 mt-2 h-auto"
                            >
                              Book this experience
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Highlights */}
        {details && details.highlights.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {details.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="text-sm">{highlight}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <Separator />

        {/* Email Capture */}
        <section>
          <Card className="bg-muted/30 border-muted">
            <CardContent className="pt-6 text-center">
              {subscribed ? (
                <div className="py-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                    <Check className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    You&apos;re on the list!
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    We&apos;ll send you the best deals for{" "}
                    {destination.name}.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">
                    Want deals for {destination.name}?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    We&apos;ll send you the best flight and hotel deals
                    when prices drop.
                  </p>
                  <div className="flex items-center gap-2 max-w-sm mx-auto mt-4">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSubscribe()
                      }
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSubscribe}
                      disabled={subscribing}
                      size="sm"
                    >
                      {subscribing ? "..." : "Notify Me"}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Bottom spacer for sticky bar */}
        <div className="h-20 sm:h-0" />
      </div>

      {/* Sticky bottom bar (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-background/95 backdrop-blur-md border-t p-3 flex items-center gap-3">
        <Button
          className="flex-1 rounded-full"
          onClick={() => router.push("/spin")}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Spin Again
        </Button>
        <Button
          variant="secondary"
          className="rounded-full"
          onClick={handleSave}
        >
          <Heart
            className="h-4 w-4"
            fill={saved ? "currentColor" : "none"}
          />
        </Button>
      </div>
    </div>
  );
}
