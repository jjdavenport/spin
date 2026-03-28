-- Seed 57 destinations for Spin app

INSERT INTO public.destinations (id, name, country, region, latitude, longitude, description, image_url) VALUES
-- Europe
('1', 'Paris', 'France', 'Europe', 48.8566, 2.3522, 'The City of Light, home to the Eiffel Tower, Louvre Museum, and world-class cuisine.', NULL),
('2', 'Rome', 'Italy', 'Europe', 41.9028, 12.4964, 'The Eternal City with ancient ruins, Renaissance art, and incredible pasta.', NULL),
('3', 'Barcelona', 'Spain', 'Europe', 41.3874, 2.1686, 'Gaudí''s masterpieces, vibrant nightlife, and Mediterranean beaches.', NULL),
('4', 'Amsterdam', 'Netherlands', 'Europe', 52.3676, 4.9041, 'Canal-lined streets, world-class museums, and cycling culture.', NULL),
('5', 'Santorini', 'Greece', 'Europe', 36.3932, 25.4615, 'Stunning sunsets, white-washed buildings, and volcanic beaches.', NULL),
('6', 'Prague', 'Czech Republic', 'Europe', 50.0755, 14.4378, 'Gothic architecture, historic bridges, and legendary beer culture.', NULL),
('7', 'Reykjavik', 'Iceland', 'Europe', 64.1466, -21.9426, 'Northern lights, geothermal pools, and dramatic volcanic landscapes.', NULL),
('8', 'Dubrovnik', 'Croatia', 'Europe', 42.6507, 18.0944, 'Pearl of the Adriatic with medieval walls and crystal-clear waters.', NULL),
('9', 'Edinburgh', 'Scotland', 'Europe', 55.9533, -3.1883, 'Historic castle, cobblestone streets, and world-famous festivals.', NULL),
('10', 'Vienna', 'Austria', 'Europe', 48.2082, 16.3738, 'Imperial palaces, classical music, and legendary coffee houses.', NULL),
('11', 'Lisbon', 'Portugal', 'Europe', 38.7223, -9.1393, 'Colorful tiles, tram rides, and pastéis de nata.', NULL),
('12', 'Copenhagen', 'Denmark', 'Europe', 55.6761, 12.5683, 'Hygge culture, innovative cuisine, and colorful Nyhavn harbor.', NULL),

-- Asia
('13', 'Tokyo', 'Japan', 'Asia', 35.6762, 139.6503, 'Neon-lit streets, ancient temples, and the world''s best street food.', NULL),
('14', 'Bali', 'Indonesia', 'Asia', -8.3405, 115.092, 'Lush rice terraces, sacred temples, and world-class surfing.', NULL),
('15', 'Bangkok', 'Thailand', 'Asia', 13.7563, 100.5018, 'Ornate temples, bustling street markets, and legendary street food.', NULL),
('16', 'Seoul', 'South Korea', 'Asia', 37.5665, 126.978, 'K-pop culture, historic palaces, and incredible BBQ.', NULL),
('17', 'Hanoi', 'Vietnam', 'Asia', 21.0285, 105.8542, 'French colonial charm, pho, and bustling Old Quarter.', NULL),
('18', 'Kyoto', 'Japan', 'Asia', 35.0116, 135.7681, 'Thousand-year-old temples, geisha districts, and bamboo forests.', NULL),
('19', 'Singapore', 'Singapore', 'Asia', 1.3521, 103.8198, 'Futuristic skyline, hawker centers, and Gardens by the Bay.', NULL),
('20', 'Kathmandu', 'Nepal', 'Asia', 27.7172, 85.324, 'Gateway to Everest, ancient temples, and Himalayan views.', NULL),
('21', 'Luang Prabang', 'Laos', 'Asia', 19.8843, 102.1347, 'UNESCO town with Buddhist monks, night markets, and waterfalls.', NULL),
('22', 'Jaipur', 'India', 'Asia', 26.9124, 75.7873, 'The Pink City with majestic forts, palaces, and vibrant bazaars.', NULL),

-- Africa
('23', 'Cape Town', 'South Africa', 'Africa', -33.9249, 18.4241, 'Table Mountain, stunning coastlines, and world-class wine regions.', NULL),
('24', 'Marrakech', 'Morocco', 'Africa', 31.6295, -7.9811, 'Vibrant souks, ornate riads, and the magic of Jemaa el-Fnaa.', NULL),
('25', 'Serengeti', 'Tanzania', 'Africa', -2.3333, 34.8333, 'The Great Migration, big five safaris, and endless savanna.', NULL),
('26', 'Zanzibar', 'Tanzania', 'Africa', -6.1659, 39.1989, 'Spice island with turquoise waters and Stone Town''s winding alleys.', NULL),
('27', 'Victoria Falls', 'Zimbabwe', 'Africa', -17.9244, 25.8567, 'The Smoke That Thunders — one of the world''s largest waterfalls.', NULL),
('28', 'Luxor', 'Egypt', 'Africa', 25.6872, 32.6396, 'Valley of the Kings, Karnak Temple, and ancient Egyptian grandeur.', NULL),
('29', 'Madagascar', 'Madagascar', 'Africa', -18.7669, 46.8691, 'Unique wildlife, baobab trees, and pristine rainforests.', NULL),
('30', 'Nairobi', 'Kenya', 'Africa', -1.2921, 36.8219, 'Safari gateway, national park within a city, and vibrant culture.', NULL),

-- North America
('31', 'New York City', 'United States', 'North America', 40.7128, -74.006, 'The city that never sleeps — Broadway, Central Park, and pizza.', NULL),
('32', 'Banff', 'Canada', 'North America', 51.1784, -115.5708, 'Turquoise lakes, Rocky Mountain peaks, and wildlife encounters.', NULL),
('33', 'Mexico City', 'Mexico', 'North America', 19.4326, -99.1332, 'Ancient Aztec ruins, world-class museums, and incredible tacos.', NULL),
('34', 'Havana', 'Cuba', 'North America', 23.1136, -82.3666, 'Vintage cars, salsa music, and colorful colonial architecture.', NULL),
('35', 'Grand Canyon', 'United States', 'North America', 36.1069, -112.1129, 'A mile-deep natural wonder carved over millions of years.', NULL),
('36', 'San Francisco', 'United States', 'North America', 37.7749, -122.4194, 'Golden Gate Bridge, cable cars, and foggy coastal charm.', NULL),
('37', 'Tulum', 'Mexico', 'North America', 20.2114, -87.4654, 'Mayan ruins overlooking Caribbean beaches and cenotes.', NULL),
('38', 'Vancouver', 'Canada', 'North America', 49.2827, -123.1207, 'Mountains meet ocean with world-class dining and nature.', NULL),

-- South America
('39', 'Rio de Janeiro', 'Brazil', 'South America', -22.9068, -43.1729, 'Christ the Redeemer, Copacabana Beach, and Carnival.', NULL),
('40', 'Machu Picchu', 'Peru', 'South America', -13.1631, -72.545, 'Ancient Incan citadel perched high in the Andes clouds.', NULL),
('41', 'Buenos Aires', 'Argentina', 'South America', -34.6037, -58.3816, 'Tango, steak, and European-flavored South American culture.', NULL),
('42', 'Galápagos Islands', 'Ecuador', 'South America', -0.9538, -90.9656, 'Darwin''s living laboratory with unique wildlife found nowhere else.', NULL),
('43', 'Patagonia', 'Argentina', 'South America', -50.3402, -72.2646, 'Glaciers, jagged peaks, and some of Earth''s last wild frontiers.', NULL),
('44', 'Cartagena', 'Colombia', 'South America', 10.391, -75.5144, 'Colorful colonial walled city on the Caribbean coast.', NULL),
('45', 'Salar de Uyuni', 'Bolivia', 'South America', -20.1338, -67.4891, 'World''s largest salt flat — a surreal mirror in the sky.', NULL),

-- Oceania
('46', 'Sydney', 'Australia', 'Oceania', -33.8688, 151.2093, 'Iconic Opera House, harbour bridge, and golden beaches.', NULL),
('47', 'Queenstown', 'New Zealand', 'Oceania', -45.0312, 168.6626, 'Adventure capital with bungee jumping, skiing, and fjords.', NULL),
('48', 'Great Barrier Reef', 'Australia', 'Oceania', -18.2871, 147.6992, 'World''s largest coral reef system with incredible marine life.', NULL),
('49', 'Bora Bora', 'French Polynesia', 'Oceania', -16.5004, -151.7415, 'Overwater bungalows, turquoise lagoon, and volcanic peaks.', NULL),
('50', 'Fiji', 'Fiji', 'Oceania', -17.7134, 178.065, 'Paradise islands with warm hospitality and coral reefs.', NULL),
('51', 'Milford Sound', 'New Zealand', 'Oceania', -44.6414, 167.8974, 'Dramatic fjord with towering peaks, waterfalls, and dolphins.', NULL),

-- Middle East
('52', 'Dubai', 'UAE', 'Middle East', 25.2048, 55.2708, 'Futuristic skyline, luxury shopping, and desert adventures.', NULL),
('53', 'Petra', 'Jordan', 'Middle East', 30.3285, 35.4444, 'Rose-red ancient city carved into desert cliffs.', NULL),
('54', 'Istanbul', 'Turkey', 'Middle East', 41.0082, 28.9784, 'Where East meets West — mosques, bazaars, and Bosphorus views.', NULL),
('55', 'Jerusalem', 'Israel', 'Middle East', 31.7683, 35.2137, 'Holy city for three faiths with ancient walls and sacred sites.', NULL),
('56', 'Oman', 'Oman', 'Middle East', 23.5859, 58.4059, 'Dramatic fjords, desert forts, and Arabian hospitality.', NULL),
('57', 'Cappadocia', 'Turkey', 'Middle East', 38.6431, 34.8289, 'Hot air balloons over fairy chimneys and cave hotels.', NULL)
ON CONFLICT (id) DO NOTHING;
