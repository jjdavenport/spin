import { DestinationDetails } from "./types";

// Curated metadata for all 57 destinations, keyed by destination ID
// Unsplash photo IDs are hand-picked for stunning hero images
export const DESTINATION_DETAILS: Record<string, DestinationDetails> = {
  // ============ EUROPE ============
  "1": {
    // Paris
    unsplash_photo_id: "1502602898657-3e91760cbb34",
    airport_code: "CDG",
    best_time_to_visit: "April to June, September to October",
    visa_info: "Schengen zone — 90-day visa-free for most nationalities.",
    budget_range: { low: 100, high: 250, currency: "EUR" },
    highlights: [
      "Climb the Eiffel Tower at sunset",
      "Explore the Louvre and Musee d'Orsay",
      "Stroll through Montmartre",
      "Cruise the Seine at night",
      "Indulge in patisseries and wine bars",
    ],
    itinerary: [
      { day: 1, title: "Iconic Paris", description: "Eiffel Tower, Champs-Elysees, and a Seine river cruise at sunset.", booking_type: "experience" },
      { day: 2, title: "Art & Culture", description: "Morning at the Louvre, afternoon in Montmartre, evening cabaret show.", booking_type: "experience" },
      { day: 3, title: "Hidden Gems", description: "Le Marais neighborhood, Saint-Germain-des-Pres, and a cooking class.", booking_type: "experience" },
    ],
  },
  "2": {
    // Rome
    unsplash_photo_id: "1552832230-c0197dd311b5",
    airport_code: "FCO",
    best_time_to_visit: "April to June, September to October",
    visa_info: "Schengen zone — 90-day visa-free for most nationalities.",
    budget_range: { low: 80, high: 200, currency: "EUR" },
    highlights: [
      "Tour the Colosseum and Roman Forum",
      "Throw a coin in the Trevi Fountain",
      "Visit Vatican City and the Sistine Chapel",
      "Eat authentic cacio e pepe in Trastevere",
      "Explore the Pantheon",
    ],
    itinerary: [
      { day: 1, title: "Ancient Rome", description: "Colosseum, Roman Forum, and Palatine Hill. Evening walk to Trevi Fountain.", booking_type: "experience" },
      { day: 2, title: "Vatican & Art", description: "Vatican Museums, Sistine Chapel, and St. Peter's Basilica. Afternoon at Piazza Navona.", booking_type: "experience" },
      { day: 3, title: "La Dolce Vita", description: "Trastevere food tour, Borghese Gallery, and sunset from Pincian Hill.", booking_type: "experience" },
    ],
  },
  "3": {
    // Barcelona
    unsplash_photo_id: "1583422409516-2895a77efded",
    airport_code: "BCN",
    best_time_to_visit: "May to June, September to October",
    visa_info: "Schengen zone — 90-day visa-free for most nationalities.",
    budget_range: { low: 80, high: 200, currency: "EUR" },
    highlights: [
      "Marvel at Sagrada Familia",
      "Wander Park Guell's mosaics",
      "Explore La Boqueria market",
      "Relax on Barceloneta Beach",
      "Bar-hop through the Gothic Quarter",
    ],
    itinerary: [
      { day: 1, title: "Gaudi's Barcelona", description: "Sagrada Familia, Park Guell, and Casa Batllo. Evening tapas on Las Ramblas.", booking_type: "experience" },
      { day: 2, title: "Beach & Culture", description: "Barceloneta Beach morning, Picasso Museum, and Gothic Quarter evening.", booking_type: "experience" },
      { day: 3, title: "Food & Views", description: "La Boqueria market, Montjuic cable car, and a flamenco show.", booking_type: "experience" },
    ],
  },
  "4": {
    // Amsterdam
    unsplash_photo_id: "1534351590666-13e3e96b5017",
    airport_code: "AMS",
    best_time_to_visit: "April to May, September to November",
    visa_info: "Schengen zone — 90-day visa-free for most nationalities.",
    budget_range: { low: 90, high: 220, currency: "EUR" },
    highlights: [
      "Cruise the canal ring",
      "Visit the Van Gogh Museum",
      "Explore the Anne Frank House",
      "Cycle through Vondelpark",
      "Browse the Jordaan neighborhood",
    ],
    itinerary: [
      { day: 1, title: "Canal City", description: "Canal cruise, Anne Frank House, and the Jordaan neighborhood.", booking_type: "experience" },
      { day: 2, title: "Art & Parks", description: "Van Gogh Museum, Rijksmuseum, and a bike ride through Vondelpark.", booking_type: "experience" },
      { day: 3, title: "Beyond the Center", description: "Day trip to Zaanse Schans windmills and Keukenhof gardens (seasonal).", booking_type: "experience" },
    ],
  },
  "5": {
    // Santorini
    unsplash_photo_id: "1570077188670-e3a8d69ac5ff",
    airport_code: "JTR",
    best_time_to_visit: "April to June, September to October",
    visa_info: "Schengen zone — 90-day visa-free for most nationalities.",
    budget_range: { low: 120, high: 300, currency: "EUR" },
    highlights: [
      "Watch the sunset from Oia",
      "Swim at Red Beach",
      "Explore ancient Akrotiri ruins",
      "Wine tasting at volcanic vineyards",
      "Sail the caldera",
    ],
    itinerary: [
      { day: 1, title: "Oia & Sunsets", description: "Explore Oia's blue domes, wine tasting, and the famous sunset.", booking_type: "experience" },
      { day: 2, title: "Sea & History", description: "Caldera sailing cruise with swimming stops, then Akrotiri ruins.", booking_type: "experience" },
      { day: 3, title: "Beach Day", description: "Red Beach, Perissa black sand beach, and Fira town evening stroll.", booking_type: "experience" },
    ],
  },
  "6": {
    // Prague
    unsplash_photo_id: "1519677100203-a0e668c92439",
    airport_code: "PRG",
    best_time_to_visit: "May to September",
    visa_info: "Schengen zone — 90-day visa-free for most nationalities.",
    budget_range: { low: 50, high: 130, currency: "EUR" },
    highlights: [
      "Walk across Charles Bridge at dawn",
      "Explore Prague Castle",
      "Drink Czech beer in historic pubs",
      "Visit the Astronomical Clock",
      "Wander the Jewish Quarter",
    ],
    itinerary: [
      { day: 1, title: "Old Town", description: "Old Town Square, Astronomical Clock, and Charles Bridge at sunset.", booking_type: "experience" },
      { day: 2, title: "Castle District", description: "Prague Castle, St. Vitus Cathedral, and Golden Lane. Evening river cruise.", booking_type: "experience" },
      { day: 3, title: "Beer & Beyond", description: "Jewish Quarter tour, traditional Czech lunch, and a brewery experience.", booking_type: "experience" },
    ],
  },
  "7": {
    // Reykjavik
    unsplash_photo_id: "1504829857797-ddff29c27927",
    airport_code: "KEF",
    best_time_to_visit: "June to August for midnight sun, September to March for northern lights",
    visa_info: "Schengen zone — 90-day visa-free for most nationalities.",
    budget_range: { low: 150, high: 350, currency: "EUR" },
    highlights: [
      "Chase the Northern Lights",
      "Soak in the Blue Lagoon",
      "Drive the Golden Circle",
      "Hike between tectonic plates at Thingvellir",
      "Whale watching from the harbor",
    ],
    itinerary: [
      { day: 1, title: "Reykjavik & Relax", description: "City walk, Hallgrimskirkja church, and Blue Lagoon evening soak.", booking_type: "experience" },
      { day: 2, title: "Golden Circle", description: "Thingvellir, Geysir geothermal area, and Gullfoss waterfall.", booking_type: "experience" },
      { day: 3, title: "South Coast", description: "Seljalandsfoss, Skogafoss waterfalls, and Reynisfjara black sand beach.", booking_type: "experience" },
    ],
  },
  "8": {
    // Dubrovnik
    unsplash_photo_id: "1555990538-1e8c0d07e4e0",
    airport_code: "DBV",
    best_time_to_visit: "May to June, September to October",
    visa_info: "Schengen zone — 90-day visa-free for most nationalities.",
    budget_range: { low: 70, high: 180, currency: "EUR" },
    highlights: [
      "Walk the ancient city walls",
      "Take the cable car to Mount Srd",
      "Kayak around the old town",
      "Visit Lokrum Island",
      "Explore Game of Thrones filming locations",
    ],
    itinerary: [
      { day: 1, title: "Old Town Walls", description: "Walk the city walls, explore Stradun, and sunset drinks at Buza Bar.", booking_type: "experience" },
      { day: 2, title: "Island Escape", description: "Ferry to Lokrum Island, sea kayaking, and cable car to Mt. Srd.", booking_type: "experience" },
      { day: 3, title: "Coast & Culture", description: "Game of Thrones tour, Elaphiti Islands day trip.", booking_type: "experience" },
    ],
  },
  "9": {
    // Edinburgh
    unsplash_photo_id: "1506377585622-bedcbb027afc",
    airport_code: "EDI",
    best_time_to_visit: "May to September, August for festivals",
    visa_info: "UK visa rules apply — many nationalities visa-free for 6 months.",
    budget_range: { low: 80, high: 200, currency: "GBP" },
    highlights: [
      "Tour Edinburgh Castle",
      "Hike Arthur's Seat",
      "Explore the Royal Mile",
      "Visit the Scotch Whisky Experience",
      "Ghost tour through underground vaults",
    ],
    itinerary: [
      { day: 1, title: "Royal Edinburgh", description: "Edinburgh Castle, Royal Mile, and Holyrood Palace.", booking_type: "experience" },
      { day: 2, title: "Nature & Whisky", description: "Hike Arthur's Seat, Scotch Whisky Experience, and a ghost tour.", booking_type: "experience" },
      { day: 3, title: "Beyond the City", description: "Day trip to the Scottish Highlands and Loch Ness.", booking_type: "experience" },
    ],
  },
  "10": {
    // Vienna
    unsplash_photo_id: "1516550893923-42d28e5677af",
    airport_code: "VIE",
    best_time_to_visit: "April to May, September to October",
    visa_info: "Schengen zone — 90-day visa-free for most nationalities.",
    budget_range: { low: 80, high: 200, currency: "EUR" },
    highlights: [
      "Tour Schonbrunn Palace",
      "Attend a classical concert",
      "Visit the Belvedere for Klimt's The Kiss",
      "Coffee and cake at a traditional Kaffeehaus",
      "Explore the MuseumsQuartier",
    ],
    itinerary: [
      { day: 1, title: "Imperial Vienna", description: "Schonbrunn Palace, Hofburg, and a Sachertorte at Hotel Sacher.", booking_type: "experience" },
      { day: 2, title: "Art & Music", description: "Belvedere Gallery, MuseumsQuartier, and an evening concert at Musikverein.", booking_type: "experience" },
      { day: 3, title: "Local Life", description: "Naschmarkt food stalls, Prater amusement park, and Heuriger wine tavern.", booking_type: "experience" },
    ],
  },
  "11": {
    // Lisbon
    unsplash_photo_id: "1585208798174-348f0d4e0770",
    airport_code: "LIS",
    best_time_to_visit: "March to May, September to October",
    visa_info: "Schengen zone — 90-day visa-free for most nationalities.",
    budget_range: { low: 60, high: 160, currency: "EUR" },
    highlights: [
      "Ride Tram 28 through Alfama",
      "Eat pasteis de nata in Belem",
      "Explore the Bairro Alto nightlife",
      "Visit Jeronimos Monastery",
      "Day trip to Sintra's fairytale palaces",
    ],
    itinerary: [
      { day: 1, title: "Historic Lisbon", description: "Tram 28, Alfama neighborhood, Sao Jorge Castle, and fado music evening.", booking_type: "experience" },
      { day: 2, title: "Belem & Beyond", description: "Belem Tower, Jeronimos Monastery, pasteis de nata, and LX Factory.", booking_type: "experience" },
      { day: 3, title: "Sintra Day Trip", description: "Pena Palace, Moorish Castle, and Quinta da Regaleira.", booking_type: "experience" },
    ],
  },
  "12": {
    // Copenhagen
    unsplash_photo_id: "1513622508809-712ceaa773bd",
    airport_code: "CPH",
    best_time_to_visit: "May to September",
    visa_info: "Schengen zone — 90-day visa-free for most nationalities.",
    budget_range: { low: 120, high: 280, currency: "DKK" },
    highlights: [
      "Stroll colorful Nyhavn harbor",
      "Visit Tivoli Gardens",
      "Explore Christiania freetown",
      "Tour the Round Tower",
      "Eat smorrebroed at Torvehallerne",
    ],
    itinerary: [
      { day: 1, title: "Classic Copenhagen", description: "Nyhavn, Little Mermaid, Amalienborg Palace, and Tivoli Gardens.", booking_type: "experience" },
      { day: 2, title: "Food & Design", description: "Torvehallerne market, Design Museum, and Christiania.", booking_type: "experience" },
      { day: 3, title: "Castles & Coast", description: "Rosenborg Castle, bike along the coast, and Louisiana Museum of Modern Art.", booking_type: "experience" },
    ],
  },

  // ============ ASIA ============
  "13": {
    // Tokyo
    unsplash_photo_id: "1540959733332-eab44bc7b179",
    airport_code: "NRT",
    best_time_to_visit: "March to May for cherry blossoms, October to November for autumn",
    visa_info: "Visa-free for most nationalities for 90 days.",
    budget_range: { low: 80, high: 250, currency: "USD" },
    highlights: [
      "Explore Shibuya Crossing and Shinjuku",
      "Visit Senso-ji temple in Asakusa",
      "Eat at a Michelin-star ramen shop",
      "Experience Akihabara's electric town",
      "See Mount Fuji on a clear day",
    ],
    itinerary: [
      { day: 1, title: "Modern Tokyo", description: "Shibuya Crossing, Harajuku, Meiji Shrine, and Shinjuku nightlife.", booking_type: "experience" },
      { day: 2, title: "Traditional Tokyo", description: "Senso-ji temple, Tsukiji Outer Market, and Imperial Palace gardens.", booking_type: "experience" },
      { day: 3, title: "Day Trip", description: "Mount Fuji or Kamakura Great Buddha and coastal temples.", booking_type: "experience" },
    ],
  },
  "14": {
    // Bali
    unsplash_photo_id: "1537996194471-e657df975ab4",
    airport_code: "DPS",
    best_time_to_visit: "April to October (dry season)",
    visa_info: "Visa on arrival for most nationalities — 30 days, extendable.",
    budget_range: { low: 40, high: 150, currency: "USD" },
    highlights: [
      "Watch sunrise from Mount Batur",
      "Explore Ubud's rice terraces",
      "Surf at Uluwatu",
      "Visit Tanah Lot temple at sunset",
      "Relax at a beachfront villa in Seminyak",
    ],
    itinerary: [
      { day: 1, title: "Ubud Culture", description: "Tegallalang rice terraces, Ubud Monkey Forest, and a traditional dance show.", booking_type: "experience" },
      { day: 2, title: "Temples & Surf", description: "Uluwatu temple, cliff-top Kecak dance, and surfing lesson.", booking_type: "experience" },
      { day: 3, title: "Sunrise & Spa", description: "Mount Batur sunrise trek, hot springs, and a Balinese spa treatment.", booking_type: "experience" },
    ],
  },
  "15": {
    // Bangkok
    unsplash_photo_id: "1508009603885-50cf7c579365",
    airport_code: "BKK",
    best_time_to_visit: "November to February (cool season)",
    visa_info: "Visa-free for most nationalities for 30-60 days.",
    budget_range: { low: 30, high: 120, currency: "USD" },
    highlights: [
      "Visit the Grand Palace and Wat Phra Kaew",
      "Explore floating markets",
      "Eat street food on Yaowarat Road",
      "Get a Thai massage",
      "Cruise the Chao Phraya River",
    ],
    itinerary: [
      { day: 1, title: "Temples & Palace", description: "Grand Palace, Wat Pho reclining Buddha, and Wat Arun at sunset.", booking_type: "experience" },
      { day: 2, title: "Markets & Food", description: "Chatuchak weekend market, Chinatown street food tour, and rooftop bar.", booking_type: "experience" },
      { day: 3, title: "River & Relax", description: "Floating market morning, Chao Phraya river cruise, and Thai massage.", booking_type: "experience" },
    ],
  },
  "16": {
    // Seoul
    unsplash_photo_id: "1534274867514-d5b47ef89ed7",
    airport_code: "ICN",
    best_time_to_visit: "March to May, September to November",
    visa_info: "Visa-free for most nationalities for 90 days.",
    budget_range: { low: 60, high: 180, currency: "USD" },
    highlights: [
      "Explore Gyeongbokgung Palace in hanbok",
      "Shop in Myeongdong and Hongdae",
      "Eat Korean BBQ in Gangnam",
      "Visit the DMZ",
      "Hike Bukhansan National Park",
    ],
    itinerary: [
      { day: 1, title: "Historic Seoul", description: "Gyeongbokgung Palace in hanbok, Bukchon Hanok Village, and Insadong.", booking_type: "experience" },
      { day: 2, title: "K-Culture", description: "Myeongdong shopping, Korean BBQ in Gangnam, and Hongdae nightlife.", booking_type: "experience" },
      { day: 3, title: "Nature & History", description: "Bukhansan National Park hike or DMZ tour.", booking_type: "experience" },
    ],
  },
  "17": {
    // Hanoi
    unsplash_photo_id: "1509030450996-dd1a26dda07a",
    airport_code: "HAN",
    best_time_to_visit: "October to December, March to April",
    visa_info: "E-visa available for most nationalities — 30 days.",
    budget_range: { low: 25, high: 80, currency: "USD" },
    highlights: [
      "Slurp pho at a street stall",
      "Explore the Old Quarter on foot",
      "Watch a water puppet show",
      "Cruise Ha Long Bay",
      "Sip egg coffee at a hidden cafe",
    ],
    itinerary: [
      { day: 1, title: "Old Quarter", description: "Walking tour of the 36 streets, Hoan Kiem Lake, and street food dinner.", booking_type: "experience" },
      { day: 2, title: "Ha Long Bay", description: "Full-day cruise through limestone karsts with kayaking and swimming.", booking_type: "experience" },
      { day: 3, title: "Culture & Coffee", description: "Ho Chi Minh Mausoleum, Temple of Literature, and egg coffee tour.", booking_type: "experience" },
    ],
  },
  "18": {
    // Kyoto
    unsplash_photo_id: "1493976040374-85c8e12f0c0e",
    airport_code: "KIX",
    best_time_to_visit: "March to May for cherry blossoms, November for autumn foliage",
    visa_info: "Visa-free for most nationalities for 90 days.",
    budget_range: { low: 80, high: 220, currency: "USD" },
    highlights: [
      "Walk through Fushimi Inari's thousand torii gates",
      "Visit Kinkaku-ji (Golden Pavilion)",
      "Stroll the Arashiyama Bamboo Grove",
      "Spot a geisha in Gion",
      "Experience a traditional tea ceremony",
    ],
    itinerary: [
      { day: 1, title: "Temples & Shrines", description: "Fushimi Inari, Kinkaku-ji, and Gion district evening walk.", booking_type: "experience" },
      { day: 2, title: "Bamboo & Zen", description: "Arashiyama Bamboo Grove, monkey park, and a tea ceremony.", booking_type: "experience" },
      { day: 3, title: "Day Trip to Nara", description: "Nara deer park, Todai-ji temple, and traditional kaiseki dinner.", booking_type: "experience" },
    ],
  },
  "19": {
    // Singapore
    unsplash_photo_id: "1525625293386-3f8f99389edd",
    airport_code: "SIN",
    best_time_to_visit: "February to April (driest months)",
    visa_info: "Visa-free for most nationalities for 30-90 days.",
    budget_range: { low: 80, high: 250, currency: "USD" },
    highlights: [
      "See the Supertree Grove light show",
      "Eat at hawker centers",
      "Explore Marina Bay Sands",
      "Visit Sentosa Island",
      "Shop on Orchard Road",
    ],
    itinerary: [
      { day: 1, title: "Marina Bay", description: "Gardens by the Bay, Marina Bay Sands, and Supertree light show.", booking_type: "experience" },
      { day: 2, title: "Culture & Food", description: "Chinatown, Little India, hawker center food tour, and Clarke Quay.", booking_type: "experience" },
      { day: 3, title: "Island Fun", description: "Sentosa Island beaches, Universal Studios, or S.E.A. Aquarium.", booking_type: "experience" },
    ],
  },
  "20": {
    // Kathmandu
    unsplash_photo_id: "1544735716-392fe2489ffa",
    airport_code: "KTM",
    best_time_to_visit: "October to December, March to April",
    visa_info: "Visa on arrival available for most nationalities — 30/90 days.",
    budget_range: { low: 20, high: 70, currency: "USD" },
    highlights: [
      "Visit Boudhanath Stupa",
      "Explore Durbar Square",
      "Hike to Nagarkot for Himalaya views",
      "Trek to Everest Base Camp (if time allows)",
      "Explore the medieval city of Bhaktapur",
    ],
    itinerary: [
      { day: 1, title: "Sacred Kathmandu", description: "Boudhanath Stupa, Pashupatinath Temple, and Thamel evening market.", booking_type: "experience" },
      { day: 2, title: "Ancient Cities", description: "Bhaktapur Durbar Square and Patan's golden temples.", booking_type: "experience" },
      { day: 3, title: "Mountain Views", description: "Sunrise at Nagarkot with panoramic Himalaya views, then Changu Narayan hike.", booking_type: "experience" },
    ],
  },
  "21": {
    // Luang Prabang
    unsplash_photo_id: "1583417319070-4a69db38a482",
    airport_code: "LPQ",
    best_time_to_visit: "November to March (cool, dry season)",
    visa_info: "Visa on arrival for most nationalities — 30 days.",
    budget_range: { low: 25, high: 80, currency: "USD" },
    highlights: [
      "Watch the dawn monk alms-giving ceremony",
      "Swim at Kuang Si waterfalls",
      "Browse the night market",
      "Cruise the Mekong River",
      "Visit Pak Ou caves",
    ],
    itinerary: [
      { day: 1, title: "UNESCO Town", description: "Alms-giving ceremony at dawn, Royal Palace Museum, and night market.", booking_type: "experience" },
      { day: 2, title: "Waterfalls", description: "Kuang Si waterfall swim, bear sanctuary, and sunset on the Mekong.", booking_type: "experience" },
      { day: 3, title: "River Journey", description: "Mekong cruise to Pak Ou caves and riverside villages.", booking_type: "experience" },
    ],
  },
  "22": {
    // Jaipur
    unsplash_photo_id: "1477587458883-47145ed94245",
    airport_code: "JAI",
    best_time_to_visit: "October to March (cool season)",
    visa_info: "E-visa available for most nationalities.",
    budget_range: { low: 25, high: 100, currency: "USD" },
    highlights: [
      "Explore Amber Fort by elephant or jeep",
      "Visit the Hawa Mahal (Palace of Winds)",
      "Shop for textiles and jewelry in bazaars",
      "Dine at a rooftop restaurant overlooking the city",
      "Visit the Jantar Mantar observatory",
    ],
    itinerary: [
      { day: 1, title: "The Pink City", description: "Hawa Mahal, City Palace, and Jantar Mantar. Evening bazaar shopping.", booking_type: "experience" },
      { day: 2, title: "Fort & Palace", description: "Amber Fort, Jal Mahal (Water Palace), and Nahargarh Fort sunset.", booking_type: "experience" },
      { day: 3, title: "Royal Experiences", description: "Block-printing workshop, traditional Rajasthani cooking class, and elephant sanctuary.", booking_type: "experience" },
    ],
  },

  // ============ AFRICA ============
  "23": {
    // Cape Town
    unsplash_photo_id: "1580060839134-75a5edca2e99",
    airport_code: "CPT",
    best_time_to_visit: "November to March (summer)",
    visa_info: "Visa-free for many nationalities for 90 days.",
    budget_range: { low: 50, high: 180, currency: "USD" },
    highlights: [
      "Take the cable car up Table Mountain",
      "Drive the Cape Peninsula to Cape Point",
      "Visit Kirstenbosch Botanical Garden",
      "Tour the Winelands of Stellenbosch",
      "See penguins at Boulders Beach",
    ],
    itinerary: [
      { day: 1, title: "Table Mountain & Waterfront", description: "Cable car up Table Mountain, V&A Waterfront, and Robben Island.", booking_type: "experience" },
      { day: 2, title: "Cape Peninsula", description: "Chapman's Peak drive, Cape Point, Boulders Beach penguins, and Simon's Town.", booking_type: "experience" },
      { day: 3, title: "Wine Country", description: "Stellenbosch and Franschhoek wine tasting day trip.", booking_type: "experience" },
    ],
  },
  "24": {
    // Marrakech
    unsplash_photo_id: "1489749798305-4fea3ae63d43",
    airport_code: "RAK",
    best_time_to_visit: "March to May, September to November",
    visa_info: "Visa-free for many nationalities for 90 days.",
    budget_range: { low: 40, high: 150, currency: "USD" },
    highlights: [
      "Get lost in the Medina souks",
      "Visit Jardin Majorelle",
      "Experience Jemaa el-Fnaa at night",
      "Stay in a traditional riad",
      "Take a day trip to the Atlas Mountains",
    ],
    itinerary: [
      { day: 1, title: "Medina Magic", description: "Jemaa el-Fnaa, souk exploration, and Bahia Palace.", booking_type: "experience" },
      { day: 2, title: "Gardens & Palaces", description: "Jardin Majorelle, Saadian Tombs, and a traditional hammam.", booking_type: "experience" },
      { day: 3, title: "Atlas Mountains", description: "Day trip to Ourika Valley or Ouzoud waterfalls.", booking_type: "experience" },
    ],
  },
  "25": {
    // Serengeti
    unsplash_photo_id: "1516426122078-c23e76319801",
    airport_code: "JRO",
    best_time_to_visit: "June to October for the Great Migration",
    visa_info: "Visa on arrival for most nationalities — $50 USD.",
    budget_range: { low: 150, high: 500, currency: "USD" },
    highlights: [
      "Witness the Great Migration",
      "See the Big Five on safari",
      "Hot air balloon ride over the savanna",
      "Visit a Maasai village",
      "Camp under the African stars",
    ],
    itinerary: [
      { day: 1, title: "Arrival & First Safari", description: "Fly to Serengeti, afternoon game drive spotting lions and elephants.", booking_type: "experience" },
      { day: 2, title: "Full Day Safari", description: "Dawn game drive, hot air balloon ride, and Maasai village visit.", booking_type: "experience" },
      { day: 3, title: "Migration & Departure", description: "Early morning migration viewing, final drive, and bush breakfast.", booking_type: "experience" },
    ],
  },
  "26": {
    // Zanzibar
    unsplash_photo_id: "1547471080-7cc2caa01a7e",
    airport_code: "ZNZ",
    best_time_to_visit: "June to October (dry season)",
    visa_info: "Visa on arrival for most nationalities — $50 USD.",
    budget_range: { low: 50, high: 200, currency: "USD" },
    highlights: [
      "Explore Stone Town's winding alleys",
      "Relax on Nungwi Beach",
      "Take a spice tour",
      "Snorkel at Mnemba Atoll",
      "Visit Prison Island's giant tortoises",
    ],
    itinerary: [
      { day: 1, title: "Stone Town", description: "Walking tour of Stone Town, House of Wonders, and Forodhani night market.", booking_type: "experience" },
      { day: 2, title: "Spice & Sea", description: "Morning spice tour, afternoon snorkeling at Mnemba Atoll.", booking_type: "experience" },
      { day: 3, title: "Beach Paradise", description: "Nungwi Beach relaxation, Prison Island tortoises, and dhow sunset sail.", booking_type: "experience" },
    ],
  },
  "27": {
    // Victoria Falls
    unsplash_photo_id: "1518709766631-a6a7f45921c3",
    airport_code: "VFA",
    best_time_to_visit: "February to May for full flow, August to December for activities",
    visa_info: "KAZA UniVisa ($50) covers Zimbabwe and Zambia.",
    budget_range: { low: 80, high: 300, currency: "USD" },
    highlights: [
      "See Victoria Falls from both countries",
      "Bungee jump from the bridge",
      "Swim in Devil's Pool (seasonal)",
      "Sunset cruise on the Zambezi",
      "White water rafting the gorge",
    ],
    itinerary: [
      { day: 1, title: "The Falls", description: "Victoria Falls rainforest walk, bridge tour, and Zambezi sunset cruise.", booking_type: "experience" },
      { day: 2, title: "Adrenaline Day", description: "Bungee jumping, zip-lining, and white water rafting.", booking_type: "experience" },
      { day: 3, title: "Zambia Side", description: "Devil's Pool swim (seasonal), Livingstone Island tour, and craft market.", booking_type: "experience" },
    ],
  },
  "28": {
    // Luxor
    unsplash_photo_id: "1539650116574-8efeb43e2750",
    airport_code: "LXR",
    best_time_to_visit: "October to April (cooler months)",
    visa_info: "Visa on arrival for most nationalities — $25 USD.",
    budget_range: { low: 30, high: 120, currency: "USD" },
    highlights: [
      "Explore the Valley of the Kings",
      "Visit Karnak Temple at sunrise",
      "See Hatshepsut's mortuary temple",
      "Hot air balloon over the Nile",
      "Cruise the Nile from Luxor to Aswan",
    ],
    itinerary: [
      { day: 1, title: "East Bank", description: "Karnak Temple, Luxor Temple, and Luxor Museum.", booking_type: "experience" },
      { day: 2, title: "West Bank", description: "Hot air balloon at dawn, Valley of the Kings, and Temple of Hatshepsut.", booking_type: "experience" },
      { day: 3, title: "Nile Journey", description: "Felucca sailing, Banana Island, and evening sound & light show at Karnak.", booking_type: "experience" },
    ],
  },
  "29": {
    // Madagascar
    unsplash_photo_id: "1580746738099-1cb14d6e3c6b",
    airport_code: "TNR",
    best_time_to_visit: "April to November (dry season)",
    visa_info: "Visa on arrival for most nationalities — 30 days.",
    budget_range: { low: 40, high: 150, currency: "USD" },
    highlights: [
      "See lemurs in their natural habitat",
      "Walk the Avenue of the Baobabs at sunset",
      "Explore Tsingy de Bemaraha",
      "Snorkel off Nosy Be island",
      "Visit Ranomafana rainforest",
    ],
    itinerary: [
      { day: 1, title: "Antananarivo", description: "Royal Hill of Ambohimanga, Lemurs Park, and craft markets.", booking_type: "experience" },
      { day: 2, title: "Rainforest", description: "Andasibe-Mantadia National Park, Indri lemurs, and night walk.", booking_type: "experience" },
      { day: 3, title: "Baobabs", description: "Avenue of the Baobabs sunset and Kirindy Forest wildlife.", booking_type: "experience" },
    ],
  },
  "30": {
    // Nairobi
    unsplash_photo_id: "1611348524140-53c9a25263d6",
    airport_code: "NBO",
    best_time_to_visit: "July to October, January to February",
    visa_info: "E-visa required for most nationalities — apply online.",
    budget_range: { low: 50, high: 200, currency: "USD" },
    highlights: [
      "Visit the David Sheldrick Elephant Orphanage",
      "Safari in Nairobi National Park",
      "Feed giraffes at Giraffe Centre",
      "Explore Karen Blixen Museum",
      "Day trip to Amboseli with Kilimanjaro views",
    ],
    itinerary: [
      { day: 1, title: "City Safari", description: "Nairobi National Park game drive, Giraffe Centre, and Karen Blixen Museum.", booking_type: "experience" },
      { day: 2, title: "Elephants & Culture", description: "David Sheldrick elephant orphanage, Kazuri Beads factory, and Carnivore restaurant.", booking_type: "experience" },
      { day: 3, title: "Amboseli Day Trip", description: "Day trip to Amboseli National Park with views of Mount Kilimanjaro.", booking_type: "experience" },
    ],
  },

  // ============ NORTH AMERICA ============
  "31": {
    // New York City
    unsplash_photo_id: "1496442226666-8d4d0e62e6e9",
    airport_code: "JFK",
    best_time_to_visit: "April to June, September to November",
    visa_info: "ESTA required for Visa Waiver Program countries, otherwise B1/B2 visa.",
    budget_range: { low: 120, high: 350, currency: "USD" },
    highlights: [
      "Walk through Central Park",
      "See a Broadway show",
      "Visit the Statue of Liberty",
      "Explore the Met or MoMA",
      "Eat pizza in Brooklyn",
    ],
    itinerary: [
      { day: 1, title: "Manhattan Icons", description: "Statue of Liberty, 9/11 Memorial, Wall Street, and Brooklyn Bridge walk.", booking_type: "experience" },
      { day: 2, title: "Culture & Park", description: "Central Park, Metropolitan Museum of Art, and a Broadway show.", booking_type: "experience" },
      { day: 3, title: "Neighborhoods", description: "High Line, Chelsea Market, SoHo shopping, and Greenwich Village dinner.", booking_type: "experience" },
    ],
  },
  "32": {
    // Banff
    unsplash_photo_id: "1503614472-8c93d56e92ce",
    airport_code: "YYC",
    best_time_to_visit: "June to September for hiking, December to March for skiing",
    visa_info: "ETA required for visa-exempt nationals, otherwise visitor visa.",
    budget_range: { low: 100, high: 300, currency: "CAD" },
    highlights: [
      "Canoe on Lake Louise",
      "Hike to the top of Sulphur Mountain",
      "Drive the Icefields Parkway",
      "Soak in Banff Upper Hot Springs",
      "Spot wildlife — elk, bears, and eagles",
    ],
    itinerary: [
      { day: 1, title: "Banff Town", description: "Banff Gondola to Sulphur Mountain, Bow Falls, and Banff Avenue.", booking_type: "experience" },
      { day: 2, title: "Lake Louise", description: "Canoe on Lake Louise, hike to Lake Agnes Tea House, and Moraine Lake.", booking_type: "experience" },
      { day: 3, title: "Icefields Parkway", description: "Drive the Icefields Parkway, Columbia Icefield Skywalk, and Peyto Lake.", booking_type: "experience" },
    ],
  },
  "33": {
    // Mexico City
    unsplash_photo_id: "1518659526054-190340b32735",
    airport_code: "MEX",
    best_time_to_visit: "March to May (warm and dry)",
    visa_info: "Visa-free for most nationalities for 180 days.",
    budget_range: { low: 40, high: 130, currency: "USD" },
    highlights: [
      "Explore the ancient pyramids of Teotihuacan",
      "Visit Frida Kahlo's Blue House",
      "Eat tacos al pastor in the street",
      "Wander through Chapultepec Park and castle",
      "Cruise the floating gardens of Xochimilco",
    ],
    itinerary: [
      { day: 1, title: "Historic Center", description: "Zocalo, Templo Mayor, Palacio de Bellas Artes, and street tacos.", booking_type: "experience" },
      { day: 2, title: "Pyramids & Art", description: "Teotihuacan pyramids, Frida Kahlo Museum, and Coyoacan.", booking_type: "experience" },
      { day: 3, title: "Parks & Markets", description: "Chapultepec Castle, Xochimilco boat ride, and Roma Norte food tour.", booking_type: "experience" },
    ],
  },
  "34": {
    // Havana
    unsplash_photo_id: "1500759285222-a95626b934cb",
    airport_code: "HAV",
    best_time_to_visit: "November to April (dry season)",
    visa_info: "Tourist card required — available at airline check-in or embassy.",
    budget_range: { low: 40, high: 130, currency: "USD" },
    highlights: [
      "Ride in a vintage American car",
      "Walk along the Malecon at sunset",
      "Visit Old Havana's colonial plazas",
      "Sip a mojito at La Bodeguita del Medio",
      "Listen to live salsa music",
    ],
    itinerary: [
      { day: 1, title: "Old Havana", description: "Plaza de la Catedral, El Capitolio, vintage car tour, and Malecon sunset.", booking_type: "experience" },
      { day: 2, title: "Culture & Music", description: "Museum of the Revolution, cigar factory, and Buena Vista Social Club show.", booking_type: "experience" },
      { day: 3, title: "Beyond Havana", description: "Vinales Valley tobacco farms and limestone mogotes day trip.", booking_type: "experience" },
    ],
  },
  "35": {
    // Grand Canyon
    unsplash_photo_id: "1474044159687-1ee9f3a51722",
    airport_code: "FLG",
    best_time_to_visit: "March to May, September to November",
    visa_info: "ESTA required for Visa Waiver Program countries, otherwise B1/B2 visa.",
    budget_range: { low: 80, high: 250, currency: "USD" },
    highlights: [
      "Hike the Bright Angel Trail",
      "Watch sunrise from Mather Point",
      "Helicopter flight over the canyon",
      "Raft the Colorado River",
      "Drive the Desert View Watchtower route",
    ],
    itinerary: [
      { day: 1, title: "South Rim", description: "Mather Point sunrise, Rim Trail walk, and Yavapai Geology Museum.", booking_type: "experience" },
      { day: 2, title: "Into the Canyon", description: "Bright Angel Trail hike, mule ride, or helicopter tour.", booking_type: "experience" },
      { day: 3, title: "East Rim Drive", description: "Desert View Watchtower, Lipan Point, and Navajo trading post.", booking_type: "experience" },
    ],
  },
  "36": {
    // San Francisco
    unsplash_photo_id: "1501594907352-04cda38ebc29",
    airport_code: "SFO",
    best_time_to_visit: "September to November (warmest months)",
    visa_info: "ESTA required for Visa Waiver Program countries, otherwise B1/B2 visa.",
    budget_range: { low: 120, high: 300, currency: "USD" },
    highlights: [
      "Walk across the Golden Gate Bridge",
      "Ride a cable car",
      "Visit Alcatraz Island",
      "Explore Fisherman's Wharf",
      "Stroll through the Painted Ladies neighborhood",
    ],
    itinerary: [
      { day: 1, title: "Iconic SF", description: "Golden Gate Bridge walk, cable car ride, and Fisherman's Wharf.", booking_type: "experience" },
      { day: 2, title: "Island & Culture", description: "Alcatraz Island tour, Chinatown, and North Beach Italian dinner.", booking_type: "experience" },
      { day: 3, title: "Neighborhoods", description: "Haight-Ashbury, Golden Gate Park, and Mission District murals & tacos.", booking_type: "experience" },
    ],
  },
  "37": {
    // Tulum
    unsplash_photo_id: "1504730030853-aeeb886d3964",
    airport_code: "CUN",
    best_time_to_visit: "November to April (dry season)",
    visa_info: "Visa-free for most nationalities for 180 days.",
    budget_range: { low: 60, high: 200, currency: "USD" },
    highlights: [
      "Visit the cliff-top Mayan ruins",
      "Swim in cenotes",
      "Relax at a beach club",
      "Explore the Sian Ka'an biosphere reserve",
      "Eat fresh ceviche by the sea",
    ],
    itinerary: [
      { day: 1, title: "Ruins & Beach", description: "Tulum archaeological zone, beach below the ruins, and sunset cocktails.", booking_type: "experience" },
      { day: 2, title: "Cenote Day", description: "Gran Cenote, Cenote Dos Ojos, and Casa Cenote snorkeling.", booking_type: "experience" },
      { day: 3, title: "Nature Reserve", description: "Sian Ka'an biosphere boat tour, floating canals, and beach picnic.", booking_type: "experience" },
    ],
  },
  "38": {
    // Vancouver
    unsplash_photo_id: "1559511260-66a68e7c3764",
    airport_code: "YVR",
    best_time_to_visit: "June to September",
    visa_info: "ETA required for visa-exempt nationals, otherwise visitor visa.",
    budget_range: { low: 90, high: 250, currency: "CAD" },
    highlights: [
      "Walk the Stanley Park Seawall",
      "Cross the Capilano Suspension Bridge",
      "Explore Granville Island Market",
      "Ski or snowboard at Grouse Mountain",
      "Eat sushi in Richmond",
    ],
    itinerary: [
      { day: 1, title: "Stanley Park & Downtown", description: "Seawall walk, Vancouver Aquarium, and Gastown steam clock.", booking_type: "experience" },
      { day: 2, title: "Nature Adventures", description: "Capilano Suspension Bridge, Grouse Mountain, and Lynn Canyon.", booking_type: "experience" },
      { day: 3, title: "Food & Culture", description: "Granville Island Market, Richmond sushi, and sunset at English Bay.", booking_type: "experience" },
    ],
  },

  // ============ SOUTH AMERICA ============
  "39": {
    // Rio de Janeiro
    unsplash_photo_id: "1483729558449-99ef09a8c325",
    airport_code: "GIG",
    best_time_to_visit: "December to March for Carnival, May to September for mild weather",
    visa_info: "Visa-free for many nationalities for 90 days. E-visa for some.",
    budget_range: { low: 50, high: 180, currency: "USD" },
    highlights: [
      "Visit Christ the Redeemer",
      "Relax on Copacabana and Ipanema beaches",
      "Take the cable car to Sugarloaf Mountain",
      "Explore the Selaron Steps",
      "Experience a samba show",
    ],
    itinerary: [
      { day: 1, title: "Icons of Rio", description: "Christ the Redeemer, Sugarloaf Mountain cable car, and Copacabana sunset.", booking_type: "experience" },
      { day: 2, title: "Beach & Culture", description: "Ipanema Beach, Selaron Steps, Santa Teresa neighborhood, and samba show.", booking_type: "experience" },
      { day: 3, title: "Nature & Favela", description: "Tijuca Forest hike, community tour, and Brazilian BBQ dinner.", booking_type: "experience" },
    ],
  },
  "40": {
    // Machu Picchu
    unsplash_photo_id: "1526392060635-9d6019884377",
    airport_code: "CUZ",
    best_time_to_visit: "May to September (dry season)",
    visa_info: "Visa-free for most nationalities for 90-183 days.",
    budget_range: { low: 60, high: 200, currency: "USD" },
    highlights: [
      "Hike the Inca Trail",
      "Watch sunrise over the citadel",
      "Explore Cusco's Inca walls and colonial churches",
      "Visit the Sacred Valley markets",
      "Try ceviche and pisco sour",
    ],
    itinerary: [
      { day: 1, title: "Cusco", description: "Plaza de Armas, Sacsayhuaman fortress, San Pedro Market, and pisco sour.", booking_type: "experience" },
      { day: 2, title: "Sacred Valley", description: "Ollantaytambo ruins, Pisac market, and train to Aguas Calientes.", booking_type: "experience" },
      { day: 3, title: "Machu Picchu", description: "Dawn entry to Machu Picchu, guided tour, and optional Huayna Picchu hike.", booking_type: "experience" },
    ],
  },
  "41": {
    // Buenos Aires
    unsplash_photo_id: "1589909202802-8f4aadce1849",
    airport_code: "EZE",
    best_time_to_visit: "March to May, September to November",
    visa_info: "Visa-free for most nationalities for 90 days.",
    budget_range: { low: 40, high: 150, currency: "USD" },
    highlights: [
      "Watch a tango show in San Telmo",
      "Eat the best steak of your life",
      "Explore colorful La Boca",
      "Visit Recoleta Cemetery",
      "Browse the Sunday San Telmo antique fair",
    ],
    itinerary: [
      { day: 1, title: "Historic BA", description: "Plaza de Mayo, Casa Rosada, San Telmo, and evening tango show.", booking_type: "experience" },
      { day: 2, title: "Neighborhoods", description: "La Boca's Caminito, Recoleta Cemetery, and Palermo Soho.", booking_type: "experience" },
      { day: 3, title: "Food & Culture", description: "Asado cooking class, Mataderos gaucho fair, and Palermo wine bars.", booking_type: "experience" },
    ],
  },
  "42": {
    // Galapagos Islands
    unsplash_photo_id: "1544979590-37e9b47eb705",
    airport_code: "GPS",
    best_time_to_visit: "June to September for wildlife, December to May for warm water",
    visa_info: "No visa needed beyond Ecuador entry (90 days visa-free). $100 park fee.",
    budget_range: { low: 150, high: 500, currency: "USD" },
    highlights: [
      "Snorkel with sea lions and marine iguanas",
      "See giant Galapagos tortoises",
      "Walk on pristine volcanic beaches",
      "Spot blue-footed boobies",
      "Dive with hammerhead sharks",
    ],
    itinerary: [
      { day: 1, title: "Santa Cruz Island", description: "Charles Darwin Research Station, giant tortoise highlands, and Tortuga Bay beach.", booking_type: "experience" },
      { day: 2, title: "Island Hopping", description: "Boat to Isabela Island, snorkel with sea turtles, and flamingo lagoon.", booking_type: "experience" },
      { day: 3, title: "Marine Life", description: "Snorkeling at Kicker Rock, blue-footed booby colony, and frigate birds.", booking_type: "experience" },
    ],
  },
  "43": {
    // Patagonia
    unsplash_photo_id: "1531794480808-3e1f2eb38b68",
    airport_code: "ECA",
    best_time_to_visit: "November to March (Patagonian summer)",
    visa_info: "Visa-free for most nationalities for 90 days.",
    budget_range: { low: 80, high: 250, currency: "USD" },
    highlights: [
      "Hike to the base of Fitz Roy",
      "See Perito Moreno Glacier calving",
      "Trek in Torres del Paine",
      "Spot condors and guanacos",
      "Camp under pristine southern skies",
    ],
    itinerary: [
      { day: 1, title: "El Chalten", description: "Hike to Laguna de los Tres for Fitz Roy views.", booking_type: "experience" },
      { day: 2, title: "Perito Moreno", description: "Glacier walkways, optional ice trekking, and boat safari.", booking_type: "experience" },
      { day: 3, title: "Torres del Paine", description: "Drive to Chile side, Base Torres hike or Grey Glacier boat tour.", booking_type: "experience" },
    ],
  },
  "44": {
    // Cartagena
    unsplash_photo_id: "1583531172067-71bb1074af2d",
    airport_code: "CTG",
    best_time_to_visit: "December to April (dry season)",
    visa_info: "Visa-free for most nationalities for 90 days.",
    budget_range: { low: 40, high: 150, currency: "USD" },
    highlights: [
      "Walk the colorful walled city",
      "Visit Castillo San Felipe",
      "Boat to the Rosario Islands",
      "Dance salsa in Getsemani",
      "Eat fresh ceviche at a street stall",
    ],
    itinerary: [
      { day: 1, title: "Walled City", description: "Old Town walking tour, Castillo San Felipe, and Getsemani street art.", booking_type: "experience" },
      { day: 2, title: "Island Paradise", description: "Boat to Rosario Islands, snorkeling, beach relaxation, and seafood.", booking_type: "experience" },
      { day: 3, title: "Culture & Dance", description: "Gold Museum, Bazurto market food tour, and salsa dancing lesson.", booking_type: "experience" },
    ],
  },
  "45": {
    // Salar de Uyuni
    unsplash_photo_id: "1510786015198-b4f8e3ab0da4",
    airport_code: "UYU",
    best_time_to_visit: "January to April for mirror effect, May to November for dry flats",
    visa_info: "Visa-free for most nationalities for 90 days.",
    budget_range: { low: 30, high: 100, currency: "USD" },
    highlights: [
      "Take perspective photos on the salt flats",
      "Visit Isla Incahuasi (cactus island)",
      "Watch sunrise paint the salt mirror",
      "See the Train Cemetery",
      "Explore the Eduardo Avaroa Reserve",
    ],
    itinerary: [
      { day: 1, title: "Salt Flats", description: "Colchani salt village, perspective photos, and Isla Incahuasi sunset.", booking_type: "experience" },
      { day: 2, title: "Desert Wonders", description: "Train Cemetery, Laguna Colorada (red lake), and Sol de Manana geysers.", booking_type: "experience" },
      { day: 3, title: "Lagoons & Hot Springs", description: "Laguna Verde, Polques hot springs, and Salvador Dali Desert.", booking_type: "experience" },
    ],
  },

  // ============ OCEANIA ============
  "46": {
    // Sydney
    unsplash_photo_id: "1506973035872-a4ec16b8e8d9",
    airport_code: "SYD",
    best_time_to_visit: "September to November, March to May",
    visa_info: "ETA required for most nationalities — apply online.",
    budget_range: { low: 100, high: 280, currency: "AUD" },
    highlights: [
      "See the Opera House and Harbour Bridge",
      "Surf at Bondi Beach",
      "Walk the Bondi to Coogee coastal trail",
      "Explore the Rocks historic area",
      "Ferry to Manly Beach",
    ],
    itinerary: [
      { day: 1, title: "Harbour Icons", description: "Opera House tour, Harbour Bridge climb, and The Rocks markets.", booking_type: "experience" },
      { day: 2, title: "Beach Life", description: "Bondi Beach, Bondi to Coogee walk, and Bronte ocean pool.", booking_type: "experience" },
      { day: 3, title: "Manly & Wildlife", description: "Ferry to Manly Beach, Taronga Zoo, and Darling Harbour dinner.", booking_type: "experience" },
    ],
  },
  "47": {
    // Queenstown
    unsplash_photo_id: "1506197603052-3cc9c3a201bd",
    airport_code: "ZQN",
    best_time_to_visit: "December to February for summer activities, June to August for skiing",
    visa_info: "NZeTA required for visa-waiver nationalities — apply online.",
    budget_range: { low: 100, high: 300, currency: "NZD" },
    highlights: [
      "Bungee jump at the original AJ Hackett site",
      "Cruise Milford Sound",
      "Ski at The Remarkables",
      "Jet boat on the Shotover River",
      "Ride the Skyline Gondola",
    ],
    itinerary: [
      { day: 1, title: "Adventure Town", description: "Skyline Gondola, luge rides, and bungee jumping at Kawarau Bridge.", booking_type: "experience" },
      { day: 2, title: "Milford Sound", description: "Full-day cruise through Milford Sound with waterfalls and wildlife.", booking_type: "experience" },
      { day: 3, title: "Lake & Rivers", description: "Jet boat on Shotover River, lake cruise to Walter Peak, and Fergburger.", booking_type: "experience" },
    ],
  },
  "48": {
    // Great Barrier Reef
    unsplash_photo_id: "1546026423-cc4642628d2b",
    airport_code: "CNS",
    best_time_to_visit: "June to October (dry season, best visibility)",
    visa_info: "ETA required for most nationalities — apply online.",
    budget_range: { low: 100, high: 300, currency: "AUD" },
    highlights: [
      "Snorkel or dive the reef",
      "Take a scenic helicopter flight",
      "Visit the Daintree Rainforest",
      "Sail the Whitsunday Islands",
      "Spot sea turtles and manta rays",
    ],
    itinerary: [
      { day: 1, title: "Reef Day", description: "Boat to outer reef, snorkeling with tropical fish, and glass-bottom boat.", booking_type: "experience" },
      { day: 2, title: "Rainforest & Reef", description: "Daintree Rainforest tour, Cape Tribulation, and reef helicopter flight.", booking_type: "experience" },
      { day: 3, title: "Island Hopping", description: "Green Island snorkeling, Fitzroy Island hike, or Kuranda scenic railway.", booking_type: "experience" },
    ],
  },
  "49": {
    // Bora Bora
    unsplash_photo_id: "1589197331516-4d84b72ebede",
    airport_code: "BOB",
    best_time_to_visit: "May to October (dry season)",
    visa_info: "Visa-free for EU/US/UK citizens for 90 days. Others may need visa.",
    budget_range: { low: 200, high: 600, currency: "USD" },
    highlights: [
      "Stay in an overwater bungalow",
      "Snorkel in the turquoise lagoon",
      "4WD tour of the volcanic peaks",
      "Swim with sharks and rays",
      "Watch sunset from Matira Beach",
    ],
    itinerary: [
      { day: 1, title: "Lagoon Paradise", description: "Overwater bungalow check-in, lagoon snorkeling, and Matira Beach sunset.", booking_type: "experience" },
      { day: 2, title: "Marine Life", description: "Shark and ray feeding tour, coral garden snorkel, and Polynesian dinner.", booking_type: "experience" },
      { day: 3, title: "Island Explorer", description: "4WD mountain tour, WWII ruins, and spa treatment over the lagoon.", booking_type: "experience" },
    ],
  },
  "50": {
    // Fiji
    unsplash_photo_id: "1532408840957-031d8034aeef",
    airport_code: "NAN",
    best_time_to_visit: "May to October (dry season)",
    visa_info: "Visa-free for most nationalities for 120 days.",
    budget_range: { low: 80, high: 300, currency: "USD" },
    highlights: [
      "Island-hop the Mamanuca or Yasawa chains",
      "Swim in natural waterfall pools",
      "Experience a traditional kava ceremony",
      "Snorkel pristine coral reefs",
      "Relax in an overwater bure",
    ],
    itinerary: [
      { day: 1, title: "Nadi & Culture", description: "Sri Siva temple, Garden of the Sleeping Giant, and kava ceremony.", booking_type: "experience" },
      { day: 2, title: "Island Escape", description: "Boat to Mamanuca Islands, beach snorkeling, and island BBQ.", booking_type: "experience" },
      { day: 3, title: "Waterfalls & Village", description: "Tavoro Waterfalls hike, Fijian village visit, and lovo feast.", booking_type: "experience" },
    ],
  },
  "51": {
    // Milford Sound
    unsplash_photo_id: "1506461883276-594a12b11cf3",
    airport_code: "ZQN",
    best_time_to_visit: "December to March (warmer, longer days)",
    visa_info: "NZeTA required for visa-waiver nationalities — apply online.",
    budget_range: { low: 80, high: 250, currency: "NZD" },
    highlights: [
      "Cruise past Mitre Peak",
      "Kayak among waterfalls",
      "Spot dolphins and fur seals",
      "Hike the Milford Track",
      "Take a scenic flight over the fjord",
    ],
    itinerary: [
      { day: 1, title: "The Drive In", description: "Te Anau to Milford via Homer Tunnel, Mirror Lakes, and The Chasm walk.", booking_type: "experience" },
      { day: 2, title: "Fjord Cruise", description: "Full-day cruise past Stirling Falls, Mitre Peak, and seal colonies.", booking_type: "experience" },
      { day: 3, title: "Kayak & Hike", description: "Morning kayak through the fjord and Routeburn Track day hike.", booking_type: "experience" },
    ],
  },

  // ============ MIDDLE EAST ============
  "52": {
    // Dubai
    unsplash_photo_id: "1512453913323-39c941e5d2cc",
    airport_code: "DXB",
    best_time_to_visit: "November to March (cooler months)",
    visa_info: "Visa on arrival for many nationalities for 30-90 days.",
    budget_range: { low: 100, high: 400, currency: "USD" },
    highlights: [
      "Visit the top of Burj Khalifa",
      "Shop at the Dubai Mall",
      "Desert safari with dune bashing",
      "Explore the Gold and Spice Souks",
      "Take an abra across Dubai Creek",
    ],
    itinerary: [
      { day: 1, title: "Modern Dubai", description: "Burj Khalifa at sunset, Dubai Mall aquarium, and Dubai Fountain show.", booking_type: "experience" },
      { day: 2, title: "Desert Adventure", description: "Morning desert safari, dune bashing, camel ride, and BBQ dinner.", booking_type: "experience" },
      { day: 3, title: "Old Dubai", description: "Gold Souk, Spice Souk, abra ride, and Al Fahidi Historic District.", booking_type: "experience" },
    ],
  },
  "53": {
    // Petra
    unsplash_photo_id: "1579606032821-4e6161c81571",
    airport_code: "AMM",
    best_time_to_visit: "March to May, September to November",
    visa_info: "Jordan Pass ($70-80) includes visa and Petra entry.",
    budget_range: { low: 60, high: 180, currency: "USD" },
    highlights: [
      "Walk through the Siq to the Treasury",
      "Climb to the Monastery (Ad Deir)",
      "See Petra by Night (candlelit)",
      "Hike the High Place of Sacrifice",
      "Stay in a Bedouin camp in Wadi Rum",
    ],
    itinerary: [
      { day: 1, title: "The Treasury", description: "Walk the Siq, the Treasury reveal, Street of Facades, and Royal Tombs.", booking_type: "experience" },
      { day: 2, title: "The Monastery", description: "Climb 800 steps to Ad Deir, High Place of Sacrifice, and Petra by Night.", booking_type: "experience" },
      { day: 3, title: "Wadi Rum", description: "4WD desert tour, Bedouin camp, and stargazing under desert skies.", booking_type: "experience" },
    ],
  },
  "54": {
    // Istanbul
    unsplash_photo_id: "1524231757912-21f4fe3a7200",
    airport_code: "IST",
    best_time_to_visit: "April to May, September to November",
    visa_info: "E-visa required for most nationalities — $20-60 online.",
    budget_range: { low: 50, high: 160, currency: "USD" },
    highlights: [
      "Visit the Hagia Sophia",
      "Explore the Grand Bazaar",
      "Cruise the Bosphorus",
      "See the Blue Mosque",
      "Eat street food in Kadikoy",
    ],
    itinerary: [
      { day: 1, title: "Sultanahmet", description: "Hagia Sophia, Blue Mosque, Basilica Cistern, and Turkish bath.", booking_type: "experience" },
      { day: 2, title: "Bazaars & Bosphorus", description: "Grand Bazaar, Spice Bazaar, and Bosphorus cruise.", booking_type: "experience" },
      { day: 3, title: "Asian Side", description: "Ferry to Kadikoy, street food tour, Camlica Hill, and Maiden's Tower.", booking_type: "experience" },
    ],
  },
  "55": {
    // Jerusalem
    unsplash_photo_id: "1552423314-cf29ab68ad73",
    airport_code: "TLV",
    best_time_to_visit: "March to May, September to November",
    visa_info: "Visa-free for most nationalities for 90 days.",
    budget_range: { low: 80, high: 220, currency: "USD" },
    highlights: [
      "Visit the Western Wall",
      "Walk the Via Dolorosa",
      "Explore the Church of the Holy Sepulchre",
      "Tour the Mount of Olives",
      "Browse the Old City's four quarters",
    ],
    itinerary: [
      { day: 1, title: "Old City", description: "Western Wall, Dome of the Rock viewpoint, Church of the Holy Sepulchre.", booking_type: "experience" },
      { day: 2, title: "Holy Sites", description: "Mount of Olives, Via Dolorosa, and Mahane Yehuda market.", booking_type: "experience" },
      { day: 3, title: "Dead Sea Day Trip", description: "Float in the Dead Sea, Ein Gedi nature reserve, and Masada fortress.", booking_type: "experience" },
    ],
  },
  "56": {
    // Oman
    unsplash_photo_id: "1559339352-11d035aa65de",
    airport_code: "MCT",
    best_time_to_visit: "October to March (cooler months)",
    visa_info: "E-visa available for most nationalities — 10-30 days.",
    budget_range: { low: 60, high: 200, currency: "USD" },
    highlights: [
      "Visit the Sultan Qaboos Grand Mosque",
      "Swim in Wadi Shab's emerald pools",
      "Camp in the Wahiba Sands desert",
      "Explore the Musandam fjords",
      "Snorkel the Daymaniyat Islands",
    ],
    itinerary: [
      { day: 1, title: "Muscat", description: "Sultan Qaboos Mosque, Mutrah Souq, and Royal Opera House.", booking_type: "experience" },
      { day: 2, title: "Wadis & Forts", description: "Wadi Shab hike and swim, Bimmah Sinkhole, and Sur dhow harbor.", booking_type: "experience" },
      { day: 3, title: "Desert Night", description: "Wahiba Sands dune drive, Bedouin camp, and sunrise over the dunes.", booking_type: "experience" },
    ],
  },
  "57": {
    // Cappadocia
    unsplash_photo_id: "1570939274717-7140e76a262c",
    airport_code: "NAV",
    best_time_to_visit: "April to June, September to November",
    visa_info: "E-visa required for most nationalities — $20-60 online.",
    budget_range: { low: 50, high: 180, currency: "USD" },
    highlights: [
      "Hot air balloon ride at sunrise",
      "Explore underground cities",
      "Stay in a cave hotel",
      "Hike through fairy chimneys in Love Valley",
      "Watch sunset from Uchisar Castle",
    ],
    itinerary: [
      { day: 1, title: "Balloon & Caves", description: "Sunrise hot air balloon ride, Goreme Open Air Museum, and cave hotel.", booking_type: "experience" },
      { day: 2, title: "Underground", description: "Derinkuyu underground city, Ihlara Valley hike, and Selime Monastery.", booking_type: "experience" },
      { day: 3, title: "Valleys & Views", description: "Love Valley and Red Valley hike, pottery workshop, and Uchisar Castle sunset.", booking_type: "experience" },
    ],
  },
};
