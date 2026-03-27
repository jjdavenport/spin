"use client";

import { Destination, DestinationDetails } from "@/lib/types";
import { DESTINATION_DETAILS } from "@/lib/destination-details";
import {
  getSkyscannerLink,
  getBookingLink,
  getViatorLink,
} from "@/lib/affiliate-links";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  Hotel,
  Map,
  Shield,
  ExternalLink,
  Calendar,
  DollarSign,
  FileText,
  Sparkles,
  Star,
} from "lucide-react";

interface TripBuilderProps {
  destination: Destination;
}

export function TripBuilder({ destination }: TripBuilderProps) {
  const details: DestinationDetails | undefined =
    DESTINATION_DETAILS[destination.id];

  if (!details) return null;

  return (
    <section
      id="trip-builder"
      className="relative bg-background py-16 sm:py-24 px-4"
    >
      {/* Section header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-amber-400/80 font-medium">
          Plan Your Trip
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
          Everything you need for {destination.name}
        </h2>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
          Flights, hotels, experiences, and travel essentials — all in one place.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="flights" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-muted/30 h-12">
            <TabsTrigger
              value="flights"
              className="flex items-center gap-2 text-sm data-[state=active]:bg-background"
            >
              <Plane className="h-4 w-4" />
              <span className="hidden sm:inline">Flights</span>
            </TabsTrigger>
            <TabsTrigger
              value="hotels"
              className="flex items-center gap-2 text-sm data-[state=active]:bg-background"
            >
              <Hotel className="h-4 w-4" />
              <span className="hidden sm:inline">Hotels</span>
            </TabsTrigger>
            <TabsTrigger
              value="experiences"
              className="flex items-center gap-2 text-sm data-[state=active]:bg-background"
            >
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Experiences</span>
            </TabsTrigger>
            <TabsTrigger
              value="essentials"
              className="flex items-center gap-2 text-sm data-[state=active]:bg-background"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Essentials</span>
            </TabsTrigger>
          </TabsList>

          {/* ── Flights ── */}
          <TabsContent value="flights" className="mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10">
                    <Plane className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Flights to {destination.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Airport: {details.airport_code} &middot; Compare prices on
                      Skyscanner
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/20 rounded-lg p-4 mb-4">
                  <p className="text-sm text-muted-foreground">
                    Search flights from your location to{" "}
                    <span className="text-foreground font-medium">
                      {destination.name} ({details.airport_code})
                    </span>
                    . Best prices typically found 2-3 months in advance.
                  </p>
                </div>
                <a
                  href={getSkyscannerLink(details.airport_code)}
                  target="_blank"
                  rel="noopener sponsored"
                >
                  <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-400 text-white">
                    Search Flights on Skyscanner
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Hotels ── */}
          <TabsContent value="hotels" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  tier: "Budget",
                  price: `${details.budget_range.currency} ${details.budget_range.low}`,
                  desc: "Hostels & guesthouses",
                  stars: 2,
                  color: "text-emerald-400",
                  bg: "bg-emerald-500/10",
                },
                {
                  tier: "Mid-Range",
                  price: `${details.budget_range.currency} ${Math.round((details.budget_range.low + details.budget_range.high) / 2)}`,
                  desc: "Boutique hotels",
                  stars: 3,
                  color: "text-amber-400",
                  bg: "bg-amber-500/10",
                },
                {
                  tier: "Luxury",
                  price: `${details.budget_range.currency} ${details.budget_range.high}+`,
                  desc: "Premium resorts & 5-star",
                  stars: 5,
                  color: "text-purple-400",
                  bg: "bg-purple-500/10",
                },
              ].map((hotel) => (
                <Card
                  key={hotel.tier}
                  className="border-border/50 hover:border-border transition-colors"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: hotel.stars }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${hotel.color} fill-current`}
                        />
                      ))}
                    </div>
                    <h3 className="font-bold text-base">{hotel.tier}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {hotel.desc}
                    </p>
                    <p className="text-lg font-bold mt-3">
                      {hotel.price}
                      <span className="text-xs font-normal text-muted-foreground">
                        {" "}
                        / night
                      </span>
                    </p>
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
                        size="sm"
                        className="w-full mt-4"
                      >
                        Browse Hotels
                        <ExternalLink className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ── Experiences ── */}
          <TabsContent value="experiences" className="mt-6">
            <div className="space-y-3">
              {details.itinerary.map((day) => (
                <Card key={day.day} className="border-border/50">
                  <CardContent className="py-4 px-5">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-amber-400">
                          Day {day.day}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold">{day.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                          {day.description}
                        </p>
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
                            className="px-0 mt-1.5 h-auto text-amber-400 hover:text-amber-300"
                          >
                            Book this experience
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <a
                href={getViatorLink(destination.name)}
                target="_blank"
                rel="noopener sponsored"
              >
                <Button variant="secondary" className="w-full mt-2">
                  Browse All Experiences in {destination.name}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </TabsContent>

          {/* ── Essentials ── */}
          <TabsContent value="essentials" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-border/50">
                <CardContent className="pt-6 flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Best Time to Visit</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {details.best_time_to_visit}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="pt-6 flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Daily Budget</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {details.budget_range.currency} {details.budget_range.low}
                      –{details.budget_range.high} per day
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="pt-6 flex items-start gap-3">
                  <FileText className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Visa Information</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {details.visa_info}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="pt-6 flex items-start gap-3">
                  <Shield className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Travel Insurance</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Recommended for international travel. Compare plans before
                      you go.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Highlights */}
            {details.highlights.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-3">
                  Highlights of {destination.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {details.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                    >
                      <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
