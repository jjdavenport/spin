"use client";

import { Destination } from "@/lib/types";
import { CountryFlag } from "@/components/country-flag";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DestinationCardProps {
  destination: Destination;
  show: boolean;
}

export default function DestinationCard({
  destination,
  show,
}: DestinationCardProps) {
  if (!show) return null;

  return (
    <Card
      className="w-full max-w-sm mx-4 sm:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {destination.region}
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">
            {destination.latitude.toFixed(2)}°, {destination.longitude.toFixed(2)}°
          </span>
        </div>
        <CardTitle className="text-2xl mt-2">{destination.name}</CardTitle>
        <CardDescription className="text-base flex items-center gap-1.5">
          <CountryFlag country={destination.country} size={16} /> {destination.country}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {destination.description}
        </p>
      </CardContent>
    </Card>
  );
}
