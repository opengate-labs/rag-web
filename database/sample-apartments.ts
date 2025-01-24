export const sampleApartments = [
  {
    apartment_type: "apartment",
    bathroom_count: 2,
    bedroom_count: 3,
    description: "Spacious family apartment with stunning mountain views. Located in a quiet neighborhood, this apartment features modern amenities, a fully equipped kitchen, and a cozy living room. Perfect for families who enjoy outdoor activities with easy access to hiking trails.",
    features: ["mountain_view", "modern_amenities", "family_friendly"],
    has_parking: true,
    has_yard: true,
    location: {
      lat: 40.7128,
      lon: -74.006
    },
    location_city: "Yerevan",
    price_per_month: 800,
    rooms: [
      {
        bed_count: 2,
        bed_type: "single",
        has_ac: true,
        room_type: "bedroom"
      },
      {
        bed_count: 1,
        bed_type: "king",
        has_ac: true,
        room_type: "bedroom"
      }
    ],
    title: "Family Mountain View Apartment",
    total_area: 120
  },
  {
    apartment_type: "studio",
    bathroom_count: 1,
    bedroom_count: 0,
    description: "Modern studio apartment in the heart of the city. Perfect for students or young professionals. Features high-speed internet, built-in workspace, and modern appliances. Walking distance to universities and city center.",
    features: ["city_view", "student_friendly", "high_speed_internet"],
    has_parking: false,
    has_yard: false,
    location: {
      lat: 40.1833,
      lon: 44.5167
    },
    location_city: "Yerevan",
    price_per_month: 400,
    rooms: [
      {
        bed_count: 1,
        bed_type: "single",
        has_ac: true,
        room_type: "living_room"
      }
    ],
    title: "Modern City Center Studio",
    total_area: 35
  },
  {
    apartment_type: "villa",
    bathroom_count: 3,
    bedroom_count: 4,
    description: "Luxurious lakeside villa with breathtaking views of Sevan Lake. Features a private beach access, spacious yard, and modern amenities. Perfect for large families or vacation rentals. Includes high-end appliances and smart home features.",
    features: ["lake_view", "beach_access", "luxury", "smart_home"],
    has_parking: true,
    has_yard: true,
    location: {
      lat: 40.5497,
      lon: 44.9319
    },
    location_city: "Sevan",
    price_per_month: 1500,
    rooms: [
      {
        bed_count: 1,
        bed_type: "king",
        has_ac: true,
        room_type: "bedroom"
      },
      {
        bed_count: 2,
        bed_type: "single",
        has_ac: true,
        room_type: "bedroom"
      }
    ],
    title: "Luxury Sevan Lake Villa",
    total_area: 250
  }
]; 