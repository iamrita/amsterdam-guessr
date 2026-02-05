// Curated Amsterdam locations for GeoGuessr
// Each location has coordinates and a name for reference

const locations = [
  // Iconic Canals
  { lat: 52.3676, lng: 4.8845, name: "Dam Square" },
  { lat: 52.3752, lng: 4.8839, name: "Central Station" },
  { lat: 52.3702, lng: 4.8842, name: "Royal Palace" },
  
  // Canal Ring (UNESCO Heritage)
  { lat: 52.3667, lng: 4.8833, name: "Herengracht Canal" },
  { lat: 52.3728, lng: 4.8826, name: "Singel Canal" },
  { lat: 52.3649, lng: 4.8801, name: "Keizersgracht" },
  { lat: 52.3716, lng: 4.8831, name: "Prinsengracht North" },
  
  // Famous Landmarks
  { lat: 52.3752, lng: 4.8840, name: "Anne Frank House Area" },
  { lat: 52.3600, lng: 4.8852, name: "Rijksmuseum" },
  { lat: 52.3584, lng: 4.8811, name: "Van Gogh Museum" },
  { lat: 52.3579, lng: 4.8686, name: "Vondelpark Entrance" },
  { lat: 52.3663, lng: 4.8795, name: "Westerkerk" },
  
  // Jordaan Neighborhood
  { lat: 52.3750, lng: 4.8780, name: "Jordaan - Noordermarkt" },
  { lat: 52.3735, lng: 4.8765, name: "Jordaan - Lindengracht" },
  { lat: 52.3720, lng: 4.8750, name: "Jordaan - Elandsgracht" },
  
  // De Pijp
  { lat: 52.3545, lng: 4.8918, name: "Albert Cuypmarkt" },
  { lat: 52.3531, lng: 4.8935, name: "Sarphatipark" },
  
  // East Amsterdam
  { lat: 52.3676, lng: 4.9021, name: "Artis Zoo Entrance" },
  { lat: 52.3680, lng: 4.9085, name: "Oosterpark" },
  { lat: 52.3740, lng: 4.9165, name: "Dappermarkt" },
  
  // Unique Spots
  { lat: 52.3782, lng: 4.9003, name: "NEMO Science Museum" },
  { lat: 52.3785, lng: 4.8551, name: "Westerpark" },
  { lat: 52.3492, lng: 4.9157, name: "Amstel River" },
  { lat: 52.3731, lng: 4.8933, name: "Nieuwmarkt" },
  { lat: 52.3684, lng: 4.8966, name: "Rembrandtplein" },
  
  // Hidden Gems
  { lat: 52.3689, lng: 4.8778, name: "Nine Streets Area" },
  { lat: 52.3774, lng: 4.8975, name: "Brouwersgracht" },
  { lat: 52.3625, lng: 4.8888, name: "Leidseplein" },
  { lat: 52.3707, lng: 4.8900, name: "Spui Square" },
  { lat: 52.3659, lng: 4.9000, name: "Waterlooplein" },
];

export const getRandomLocation = () => {
  const index = Math.floor(Math.random() * locations.length);
  return locations[index];
};

export const AMSTERDAM_CENTER = { lat: 52.3676, lng: 4.9041 };
export const AMSTERDAM_BOUNDS = {
  north: 52.42,
  south: 52.32,
  east: 4.98,
  west: 4.80,
};

export default locations;
