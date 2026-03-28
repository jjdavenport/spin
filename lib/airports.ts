export interface Airport {
  code: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
}

// Major world airports for home airport selection and nearest-airport detection
export const AIRPORTS: Airport[] = [
  // North America
  { code: "JFK", name: "John F. Kennedy International", city: "New York", lat: 40.6413, lng: -73.7781 },
  { code: "LAX", name: "Los Angeles International", city: "Los Angeles", lat: 33.9425, lng: -118.4081 },
  { code: "ORD", name: "O'Hare International", city: "Chicago", lat: 41.9742, lng: -87.9073 },
  { code: "ATL", name: "Hartsfield-Jackson Atlanta International", city: "Atlanta", lat: 33.6407, lng: -84.4277 },
  { code: "DFW", name: "Dallas/Fort Worth International", city: "Dallas", lat: 32.8998, lng: -97.0403 },
  { code: "SFO", name: "San Francisco International", city: "San Francisco", lat: 37.6213, lng: -122.379 },
  { code: "MIA", name: "Miami International", city: "Miami", lat: 25.7959, lng: -80.287 },
  { code: "SEA", name: "Seattle-Tacoma International", city: "Seattle", lat: 47.4502, lng: -122.3088 },
  { code: "BOS", name: "Logan International", city: "Boston", lat: 42.3656, lng: -71.0096 },
  { code: "DEN", name: "Denver International", city: "Denver", lat: 39.8561, lng: -104.6737 },
  { code: "IAD", name: "Dulles International", city: "Washington D.C.", lat: 38.9531, lng: -77.4565 },
  { code: "YYZ", name: "Toronto Pearson International", city: "Toronto", lat: 43.6777, lng: -79.6248 },
  { code: "YVR", name: "Vancouver International", city: "Vancouver", lat: 49.1947, lng: -123.1839 },
  { code: "YUL", name: "Montréal-Trudeau International", city: "Montréal", lat: 45.4707, lng: -73.7407 },
  { code: "MEX", name: "Benito Juárez International", city: "Mexico City", lat: 19.4363, lng: -99.0721 },
  { code: "CUN", name: "Cancún International", city: "Cancún", lat: 21.0365, lng: -86.8771 },
  // Europe
  { code: "LHR", name: "Heathrow", city: "London", lat: 51.47, lng: -0.4543 },
  { code: "CDG", name: "Charles de Gaulle", city: "Paris", lat: 49.0097, lng: 2.5479 },
  { code: "AMS", name: "Schiphol", city: "Amsterdam", lat: 52.3105, lng: 4.7683 },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", lat: 50.0379, lng: 8.5622 },
  { code: "MAD", name: "Adolfo Suárez Madrid–Barajas", city: "Madrid", lat: 40.4983, lng: -3.5676 },
  { code: "BCN", name: "Josep Tarradellas Barcelona-El Prat", city: "Barcelona", lat: 41.2974, lng: 2.0833 },
  { code: "FCO", name: "Leonardo da Vinci–Fiumicino", city: "Rome", lat: 41.8003, lng: 12.2389 },
  { code: "IST", name: "Istanbul Airport", city: "Istanbul", lat: 41.2753, lng: 28.7519 },
  { code: "MUC", name: "Munich Airport", city: "Munich", lat: 48.3537, lng: 11.775 },
  { code: "ZRH", name: "Zürich Airport", city: "Zürich", lat: 47.4647, lng: 8.5492 },
  { code: "CPH", name: "Copenhagen Airport", city: "Copenhagen", lat: 55.618, lng: 12.656 },
  { code: "OSL", name: "Oslo Gardermoen", city: "Oslo", lat: 60.1976, lng: 11.1004 },
  { code: "ARN", name: "Stockholm Arlanda", city: "Stockholm", lat: 59.6519, lng: 17.9186 },
  { code: "LIS", name: "Humberto Delgado", city: "Lisbon", lat: 38.7756, lng: -9.1354 },
  { code: "VIE", name: "Vienna International", city: "Vienna", lat: 48.1103, lng: 16.5697 },
  { code: "PRG", name: "Václav Havel", city: "Prague", lat: 50.1008, lng: 14.26 },
  { code: "DUB", name: "Dublin Airport", city: "Dublin", lat: 53.4264, lng: -6.2499 },
  { code: "EDI", name: "Edinburgh Airport", city: "Edinburgh", lat: 55.95, lng: -3.3725 },
  { code: "KEF", name: "Keflavík International", city: "Reykjavik", lat: 63.985, lng: -22.6056 },
  // Asia
  { code: "NRT", name: "Narita International", city: "Tokyo", lat: 35.7647, lng: 140.3864 },
  { code: "HND", name: "Haneda", city: "Tokyo", lat: 35.5494, lng: 139.7798 },
  { code: "PEK", name: "Beijing Capital International", city: "Beijing", lat: 40.0799, lng: 116.6031 },
  { code: "PVG", name: "Shanghai Pudong International", city: "Shanghai", lat: 31.1443, lng: 121.8083 },
  { code: "HKG", name: "Hong Kong International", city: "Hong Kong", lat: 22.308, lng: 113.9185 },
  { code: "SIN", name: "Changi", city: "Singapore", lat: 1.3644, lng: 103.9915 },
  { code: "BKK", name: "Suvarnabhumi", city: "Bangkok", lat: 13.6811, lng: 100.7472 },
  { code: "ICN", name: "Incheon International", city: "Seoul", lat: 37.4602, lng: 126.4407 },
  { code: "DEL", name: "Indira Gandhi International", city: "Delhi", lat: 28.5562, lng: 77.1 },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj International", city: "Mumbai", lat: 19.0896, lng: 72.8656 },
  { code: "DPS", name: "Ngurah Rai International", city: "Bali", lat: -8.7482, lng: 115.1672 },
  { code: "KTM", name: "Tribhuvan International", city: "Kathmandu", lat: 27.6966, lng: 85.3591 },
  { code: "HAN", name: "Noi Bai International", city: "Hanoi", lat: 21.2212, lng: 105.807 },
  // Middle East
  { code: "DXB", name: "Dubai International", city: "Dubai", lat: 25.2532, lng: 55.3657 },
  { code: "DOH", name: "Hamad International", city: "Doha", lat: 25.2609, lng: 51.6138 },
  { code: "AUH", name: "Abu Dhabi International", city: "Abu Dhabi", lat: 24.443, lng: 54.6511 },
  { code: "TLV", name: "Ben Gurion", city: "Tel Aviv", lat: 32.0055, lng: 34.8854 },
  { code: "AMM", name: "Queen Alia International", city: "Amman", lat: 31.7226, lng: 35.9932 },
  { code: "MCT", name: "Muscat International", city: "Muscat", lat: 23.5933, lng: 58.2844 },
  // Africa
  { code: "CPT", name: "Cape Town International", city: "Cape Town", lat: -33.9649, lng: 18.6017 },
  { code: "JNB", name: "O.R. Tambo International", city: "Johannesburg", lat: -26.1392, lng: 28.246 },
  { code: "NBO", name: "Jomo Kenyatta International", city: "Nairobi", lat: -1.3192, lng: 36.9278 },
  { code: "CAI", name: "Cairo International", city: "Cairo", lat: 30.1219, lng: 31.4056 },
  { code: "RAK", name: "Marrakech Menara", city: "Marrakech", lat: 31.6069, lng: -8.0363 },
  { code: "CMN", name: "Mohammed V International", city: "Casablanca", lat: 33.3675, lng: -7.5898 },
  // South America
  { code: "GRU", name: "São Paulo–Guarulhos International", city: "São Paulo", lat: -23.4356, lng: -46.4731 },
  { code: "GIG", name: "Rio de Janeiro–Galeão International", city: "Rio de Janeiro", lat: -22.8099, lng: -43.2506 },
  { code: "EZE", name: "Ministro Pistarini International", city: "Buenos Aires", lat: -34.8222, lng: -58.5358 },
  { code: "LIM", name: "Jorge Chávez International", city: "Lima", lat: -12.0219, lng: -77.1143 },
  { code: "BOG", name: "El Dorado International", city: "Bogotá", lat: 4.7016, lng: -74.1469 },
  { code: "SCL", name: "Arturo Merino Benítez International", city: "Santiago", lat: -33.393, lng: -70.7858 },
  // Oceania
  { code: "SYD", name: "Sydney Kingsford Smith", city: "Sydney", lat: -33.9461, lng: 151.1772 },
  { code: "MEL", name: "Melbourne Airport", city: "Melbourne", lat: -37.6733, lng: 144.8433 },
  { code: "AKL", name: "Auckland Airport", city: "Auckland", lat: -37.0082, lng: 174.7917 },
  { code: "ZQN", name: "Queenstown Airport", city: "Queenstown", lat: -45.021, lng: 168.7392 },
  { code: "BNE", name: "Brisbane Airport", city: "Brisbane", lat: -27.3842, lng: 153.1175 },
  { code: "PPT", name: "Faa'a International", city: "Tahiti", lat: -17.5537, lng: -149.6073 },
  { code: "NAN", name: "Nadi International", city: "Fiji", lat: -17.7554, lng: 177.4431 },
];

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function findNearestAirport(lat: number, lng: number): Airport {
  let nearest = AIRPORTS[0];
  let minDist = Infinity;
  for (const airport of AIRPORTS) {
    const dist = haversineDistance(lat, lng, airport.lat, airport.lng);
    if (dist < minDist) {
      minDist = dist;
      nearest = airport;
    }
  }
  return nearest;
}

export function searchAirports(query: string): Airport[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return AIRPORTS.filter(
    (a) =>
      a.code.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q)
  ).slice(0, 8);
}

export function getAirportByCode(code: string): Airport | undefined {
  return AIRPORTS.find((a) => a.code === code);
}

export function distanceBetween(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  return haversineDistance(lat1, lng1, lat2, lng2);
}
