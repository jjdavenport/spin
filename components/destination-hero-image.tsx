"use client";

import { useState } from "react";

// Region-themed gradient fallbacks
const REGION_GRADIENTS: Record<string, string> = {
  Europe: "from-blue-900 via-indigo-900 to-slate-900",
  Asia: "from-amber-900 via-orange-900 to-red-950",
  Africa: "from-yellow-900 via-amber-950 to-stone-900",
  "North America": "from-emerald-900 via-teal-900 to-cyan-950",
  "South America": "from-lime-900 via-green-900 to-emerald-950",
  Oceania: "from-cyan-900 via-sky-900 to-blue-950",
  "Middle East": "from-orange-900 via-amber-900 to-yellow-950",
};

interface DestinationHeroImageProps {
  unsplashPhotoId: string;
  destinationName: string;
  region: string;
  className?: string;
}

export function getUnsplashUrl(photoId: string, width = 1200, height = 800) {
  return `https://images.unsplash.com/photo-${photoId}?w=${width}&h=${height}&fit=crop&auto=format&q=80`;
}

export default function DestinationHeroImage({
  unsplashPhotoId,
  destinationName,
  region,
  className = "",
}: DestinationHeroImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const gradient = REGION_GRADIENTS[region] || "from-slate-900 via-gray-900 to-zinc-900";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient fallback / placeholder */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-opacity duration-500 ${
          loaded && !error ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Actual image */}
      {!error && (
        <img
          src={getUnsplashUrl(unsplashPhotoId)}
          alt={destinationName}
          loading="eager"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Bottom gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
    </div>
  );
}
