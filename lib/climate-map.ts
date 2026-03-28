import { ClimateType } from "./types";

// Static climate classification for all 57 destinations
export const CLIMATE_MAP: Record<string, ClimateType[]> = {
  // EUROPE
  "1": ["temperate"],           // Paris
  "2": ["mediterranean"],       // Rome
  "3": ["mediterranean"],       // Barcelona
  "4": ["temperate"],           // Amsterdam
  "5": ["mediterranean"],       // Santorini
  "6": ["temperate"],           // Prague
  "7": ["cold"],                // Reykjavik
  "8": ["mediterranean"],       // Dubrovnik
  "9": ["temperate"],           // Edinburgh
  "10": ["temperate"],          // Vienna
  "11": ["mediterranean"],      // Lisbon
  "12": ["temperate"],          // Copenhagen
  // ASIA
  "13": ["temperate"],          // Tokyo
  "14": ["tropical"],           // Bali
  "15": ["tropical"],           // Bangkok
  "16": ["temperate"],          // Seoul
  "17": ["tropical"],           // Hanoi
  "18": ["temperate"],          // Kyoto
  "19": ["tropical"],           // Singapore
  "20": ["cold", "temperate"],  // Kathmandu
  "21": ["tropical"],           // Luang Prabang
  "22": ["arid"],               // Jaipur
  // AFRICA
  "23": ["mediterranean"],      // Cape Town
  "24": ["arid"],               // Marrakech
  "25": ["tropical"],           // Serengeti
  "26": ["tropical"],           // Zanzibar
  "27": ["tropical"],           // Victoria Falls
  "28": ["arid"],               // Luxor
  "29": ["tropical"],           // Madagascar
  "30": ["tropical"],           // Nairobi
  // NORTH AMERICA
  "31": ["temperate"],          // New York City
  "32": ["cold"],               // Banff
  "33": ["temperate"],          // Mexico City
  "34": ["tropical"],           // Havana
  "35": ["arid"],               // Grand Canyon
  "36": ["mediterranean"],      // San Francisco
  "37": ["tropical"],           // Tulum
  "38": ["temperate"],          // Vancouver
  // SOUTH AMERICA
  "39": ["tropical"],           // Rio de Janeiro
  "40": ["cold", "temperate"],  // Machu Picchu
  "41": ["temperate"],          // Buenos Aires
  "42": ["tropical"],           // Galápagos Islands
  "43": ["cold"],               // Patagonia
  "44": ["tropical"],           // Cartagena
  "45": ["arid", "cold"],       // Salar de Uyuni
  // OCEANIA
  "46": ["temperate"],          // Sydney
  "47": ["cold", "temperate"],  // Queenstown
  "48": ["tropical"],           // Great Barrier Reef
  "49": ["tropical"],           // Bora Bora
  "50": ["tropical"],           // Fiji
  "51": ["cold"],               // Milford Sound
  // MIDDLE EAST
  "52": ["arid"],               // Dubai
  "53": ["arid"],               // Petra
  "54": ["mediterranean"],      // Istanbul
  "55": ["mediterranean"],      // Jerusalem
  "56": ["arid"],               // Oman
  "57": ["arid"],               // Cappadocia
};

export const CLIMATE_OPTIONS: { value: ClimateType; label: string; icon: string }[] = [
  { value: "tropical", label: "Tropical", icon: "🌴" },
  { value: "arid", label: "Arid & Desert", icon: "🏜️" },
  { value: "temperate", label: "Temperate", icon: "🌿" },
  { value: "cold", label: "Cold & Alpine", icon: "🏔️" },
  { value: "mediterranean", label: "Mediterranean", icon: "☀️" },
];
