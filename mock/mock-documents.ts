import { Document } from '@langchain/core/documents'

export interface MockApartmentDocument {
  title: string
  description: string
  apartmentType: 'studio' | 'apartment' | 'house' | 'villa'
  totalArea: number
  pricePerMonth: number
  bedroomCount: number
  bathroomCount: number
  maxOccupancy: number
  locationAddress: string
  locationCity: string
  locationCoordinates: { lat: number; lng: number }
  hasParking: boolean
  hasYard: boolean
  yardArea?: number
  rooms: Array<{
    roomType: 'bedroom' | 'living_room' | 'kitchen' | 'bathroom'
    area: number
    hasAC: boolean
    hasHeating: boolean
    bedCount?: number
    bedType?: string
  }>
  features: string[]
}

interface MockDocument extends Document {
  metadata: MockApartmentDocument
}

export const mockApartments: MockDocument[] = [
  {
    pageContent: '',
    metadata: {
      title: 'Family-Friendly Lake View Apartment',
      description:
        'Spacious 2-bedroom apartment near Sevan Lake. Perfect for families. Features AC in master bedroom, three single beds in second bedroom, and a cozy yard.',
      apartmentType: 'apartment',
      totalArea: 120,
      pricePerMonth: 800,
      bedroomCount: 2,
      bathroomCount: 1,
      maxOccupancy: 5,
      locationAddress: '123 Lakeview Street',
      locationCity: 'Sevan',
      locationCoordinates: { lat: 40.5473, lng: 44.9319 },
      hasParking: true,
      hasYard: true,
      yardArea: 30,
      rooms: [
        {
          roomType: 'bedroom',
          area: 25,
          hasAC: true,
          hasHeating: true,
          bedCount: 1,
          bedType: 'double',
        },
        {
          roomType: 'bedroom',
          area: 20,
          hasAC: false,
          hasHeating: true,
          bedCount: 3,
          bedType: 'single',
        },
        {
          roomType: 'living_room',
          area: 35,
          hasAC: true,
          hasHeating: true,
        },
        {
          roomType: 'kitchen',
          area: 25,
          hasAC: false,
          hasHeating: true,
        },
        {
          roomType: 'bathroom',
          area: 15,
          hasAC: false,
          hasHeating: true,
        },
      ],
      features: ['lake_view', 'family_friendly', 'furnished', 'internet', 'balcony'],
    },
  },
  {
    pageContent: '',
    metadata: {
      title: 'Modern Studio in City Center',
      description:
        'Newly renovated studio apartment in the heart of Yerevan. Perfect for young professionals. Features smart home system, modern appliances, and stunning city views.',
      apartmentType: 'studio',
      totalArea: 45,
      pricePerMonth: 600,
      bedroomCount: 0,
      bathroomCount: 1,
      maxOccupancy: 2,
      locationAddress: '45 Abovyan Street',
      locationCity: 'Yerevan',
      locationCoordinates: { lat: 40.1872, lng: 44.5152 },
      hasParking: false,
      hasYard: false,
      rooms: [
        {
          roomType: 'living_room',
          area: 30,
          hasAC: true,
          hasHeating: true,
          bedCount: 1,
          bedType: 'murphy',
        },
        {
          roomType: 'kitchen',
          area: 10,
          hasAC: false,
          hasHeating: true,
        },
        {
          roomType: 'bathroom',
          area: 5,
          hasAC: false,
          hasHeating: true,
        },
      ],
      features: ['city_view', 'smart_home', 'modern_appliances', 'elevator', 'security'],
    },
  },
  {
    pageContent: '',
    metadata: {
      title: 'Luxurious Villa with Pool',
      description:
        'Elegant 4-bedroom villa in Dilijan with private pool and mountain views. Features high-end finishes, smart home system, and professional landscaping.',
      apartmentType: 'villa',
      totalArea: 300,
      pricePerMonth: 2500,
      bedroomCount: 4,
      bathroomCount: 3,
      maxOccupancy: 8,
      locationAddress: '78 Mountain View Road',
      locationCity: 'Dilijan',
      locationCoordinates: { lat: 40.7417, lng: 44.8651 },
      hasParking: true,
      hasYard: true,
      yardArea: 500,
      rooms: [
        {
          roomType: 'bedroom',
          area: 40,
          hasAC: true,
          hasHeating: true,
          bedCount: 1,
          bedType: 'king',
        },
        {
          roomType: 'bedroom',
          area: 35,
          hasAC: true,
          hasHeating: true,
          bedCount: 1,
          bedType: 'queen',
        },
        {
          roomType: 'bedroom',
          area: 30,
          hasAC: true,
          hasHeating: true,
          bedCount: 2,
          bedType: 'single',
        },
        {
          roomType: 'bedroom',
          area: 30,
          hasAC: true,
          hasHeating: true,
          bedCount: 2,
          bedType: 'single',
        },
        {
          roomType: 'living_room',
          area: 80,
          hasAC: true,
          hasHeating: true,
        },
        {
          roomType: 'kitchen',
          area: 40,
          hasAC: true,
          hasHeating: true,
        },
        {
          roomType: 'bathroom',
          area: 15,
          hasAC: true,
          hasHeating: true,
        },
        {
          roomType: 'bathroom',
          area: 12,
          hasAC: true,
          hasHeating: true,
        },
        {
          roomType: 'bathroom',
          area: 12,
          hasAC: true,
          hasHeating: true,
        },
      ],
      features: ['mountain_view', 'pool', 'smart_home', 'luxury_finishes', 'garden', 'parking', 'security', 'gym'],
    },
  },
  {
    pageContent: '',
    metadata: {
      title: 'Cozy Traditional House',
      description:
        'Charming 3-bedroom house in Gyumri with traditional architecture. Features wood-burning fireplace, garden with fruit trees, and authentic details throughout.',
      apartmentType: 'house',
      totalArea: 150,
      pricePerMonth: 700,
      bedroomCount: 3,
      bathroomCount: 2,
      maxOccupancy: 6,
      locationAddress: '92 Heritage Street',
      locationCity: 'Gyumri',
      locationCoordinates: { lat: 40.7942, lng: 43.8453 },
      hasParking: true,
      hasYard: true,
      yardArea: 200,
      rooms: [
        {
          roomType: 'bedroom',
          area: 20,
          hasAC: false,
          hasHeating: true,
          bedCount: 1,
          bedType: 'double',
        },
        {
          roomType: 'bedroom',
          area: 18,
          hasAC: false,
          hasHeating: true,
          bedCount: 2,
          bedType: 'single',
        },
        {
          roomType: 'bedroom',
          area: 18,
          hasAC: false,
          hasHeating: true,
          bedCount: 2,
          bedType: 'single',
        },
        {
          roomType: 'living_room',
          area: 45,
          hasAC: false,
          hasHeating: true,
        },
        {
          roomType: 'kitchen',
          area: 30,
          hasAC: false,
          hasHeating: true,
        },
        {
          roomType: 'bathroom',
          area: 10,
          hasAC: false,
          hasHeating: true,
        },
        {
          roomType: 'bathroom',
          area: 9,
          hasAC: false,
          hasHeating: true,
        },
      ],
      features: ['traditional_architecture', 'fireplace', 'garden', 'fruit_trees', 'parking'],
    },
  },
  {
    pageContent: '',
    metadata: {
      title: 'Sunny Three-Bedroom near Swan Lake',
      description:
        'Bright 3-bedroom apartment with stunning lake views in Sevan. Each bedroom has different bed configurations. Master bedroom includes AC and en-suite bathroom. Large balcony perfect for outdoor dining.',
      apartmentType: 'apartment',
      totalArea: 140,
      pricePerMonth: 900,
      bedroomCount: 3,
      bathroomCount: 2,
      maxOccupancy: 6,
      locationAddress: '45 Lakeshore Drive',
      locationCity: 'Sevan',
      locationCoordinates: { lat: 40.5492, lng: 44.9334 },
      hasParking: true,
      hasYard: true,
      yardArea: 40,
      rooms: [
        {
          roomType: 'bedroom',
          area: 28,
          hasAC: true,
          hasHeating: true,
          bedCount: 1,
          bedType: 'king',
        },
        {
          roomType: 'bedroom',
          area: 22,
          hasAC: false,
          hasHeating: true,
          bedCount: 2,
          bedType: 'single',
        },
        {
          roomType: 'bedroom',
          area: 20,
          hasAC: false,
          hasHeating: true,
          bedCount: 3,
          bedType: 'single',
        },
        {
          roomType: 'living_room',
          area: 35,
          hasAC: true,
          hasHeating: true,
        },
        {
          roomType: 'kitchen',
          area: 20,
          hasAC: false,
          hasHeating: true,
        },
        {
          roomType: 'bathroom',
          area: 8,
          hasAC: false,
          hasHeating: true,
        },
        {
          roomType: 'bathroom',
          area: 7,
          hasAC: false,
          hasHeating: true,
        },
      ],
      features: ['lake_view', 'family_friendly', 'furnished', 'internet', 'balcony', 'parking'],
    },
  },
  {
    pageContent: '',
    metadata: {
      title: 'Compact Lake View Studio',
      description:
        'Efficient studio apartment in Sevan with direct lake views. Perfect for singles or couples. Features modern amenities and a small balcony overlooking the lake.',
      apartmentType: 'studio',
      totalArea: 35,
      pricePerMonth: 400,
      bedroomCount: 0,
      bathroomCount: 1,
      maxOccupancy: 2,
      locationAddress: '87 Shoreline Avenue',
      locationCity: 'Sevan',
      locationCoordinates: { lat: 40.5468, lng: 44.9327 },
      hasParking: false,
      hasYard: false,
      rooms: [
        {
          roomType: 'living_room',
          area: 25,
          hasAC: true,
          hasHeating: true,
          bedCount: 1,
          bedType: 'murphy',
        },
        {
          roomType: 'kitchen',
          area: 5,
          hasAC: false,
          hasHeating: true,
        },
        {
          roomType: 'bathroom',
          area: 5,
          hasAC: false,
          hasHeating: true,
        },
      ],
      features: ['lake_view', 'modern_appliances', 'furnished', 'internet', 'balcony'],
    },
  },
  {
    pageContent: '',
    metadata: {
      title: 'Lakefront Family House with Garden',
      description:
        'Spacious 4-bedroom house with unobstructed lake views. Large yard with playground equipment. Two rooms have AC, perfect for families with children.',
      apartmentType: 'house',
      totalArea: 180,
      pricePerMonth: 1200,
      bedroomCount: 4,
      bathroomCount: 2,
      maxOccupancy: 8,
      locationAddress: '12 Waterfront Road',
      locationCity: 'Sevan',
      locationCoordinates: { lat: 40.5483, lng: 44.9315 },
      hasParking: true,
      hasYard: true,
      yardArea: 300,
      rooms: [
        {
          roomType: 'bedroom',
          area: 25,
          hasAC: true,
          hasHeating: true,
          bedCount: 1,
          bedType: 'queen',
        },
        {
          roomType: 'bedroom',
          area: 22,
          hasAC: true,
          hasHeating: true,
          bedCount: 1,
          bedType: 'double',
        },
        {
          roomType: 'bedroom',
          area: 20,
          hasAC: false,
          hasHeating: true,
          bedCount: 2,
          bedType: 'single',
        },
        {
          roomType: 'bedroom',
          area: 20,
          hasAC: false,
          hasHeating: true,
          bedCount: 3,
          bedType: 'single',
        },
        {
          roomType: 'living_room',
          area: 45,
          hasAC: true,
          hasHeating: true,
        },
        {
          roomType: 'kitchen',
          area: 30,
          hasAC: false,
          hasHeating: true,
        },
        {
          roomType: 'bathroom',
          area: 10,
          hasAC: false,
          hasHeating: true,
        },
        {
          roomType: 'bathroom',
          area: 8,
          hasAC: false,
          hasHeating: true,
        },
      ],
      features: ['lake_view', 'family_friendly', 'furnished', 'internet', 'garden', 'parking', 'playground'],
    },
  },
  {
    pageContent: '',
    metadata: {
      title: 'Lake View Duplex with Three Bedrooms',
      description:
        'Two-story apartment near Sevan Lake. Three bedrooms, including master with AC and lake view. Two bathrooms and a private yard with BBQ area.',
      apartmentType: 'apartment',
      totalArea: 160,
      pricePerMonth: 1000,
      bedroomCount: 3,
      bathroomCount: 2,
      maxOccupancy: 6,
      locationAddress: '234 Lake Circle',
      locationCity: 'Sevan',
      locationCoordinates: { lat: 40.5465, lng: 44.9322 },
      hasParking: true,
      hasYard: true,
      yardArea: 50,
      rooms: [
        {
          roomType: 'bedroom',
          area: 30,
          hasAC: true,
          hasHeating: true,
          bedCount: 1,
          bedType: 'queen',
        },
        {
          roomType: 'bedroom',
          area: 25,
          hasAC: false,
          hasHeating: true,
          bedCount: 2,
          bedType: 'single',
        },
        {
          roomType: 'bedroom',
          area: 25,
          hasAC: false,
          hasHeating: true,
          bedCount: 3,
          bedType: 'single',
        },
        {
          roomType: 'living_room',
          area: 40,
          hasAC: true,
          hasHeating: true,
        },
        {
          roomType: 'kitchen',
          area: 25,
          hasAC: false,
          hasHeating: true,
        },
        {
          roomType: 'bathroom',
          area: 8,
          hasAC: false,
          hasHeating: true,
        },
        {
          roomType: 'bathroom',
          area: 7,
          hasAC: false,
          hasHeating: true,
        },
      ],
      features: ['lake_view', 'family_friendly', 'furnished', 'internet', 'bbq', 'parking'],
    },
  },
  {
    pageContent: '',
    metadata: {
      title: 'Cozy Lake View Two-Bedroom',
      description:
        'Comfortable 2-bedroom apartment close to Sevan Lake. Master bedroom has AC and lake views. Second bedroom has two single beds. Small yard with seating area.',
      apartmentType: 'apartment',
      totalArea: 85,
      pricePerMonth: 600,
      bedroomCount: 2,
      bathroomCount: 1,
      maxOccupancy: 4,
      locationAddress: '56 Lake View Street',
      locationCity: 'Sevan',
      locationCoordinates: { lat: 40.5477, lng: 44.9325 },
      hasParking: true,
      hasYard: true,
      yardArea: 20,
      rooms: [
        {
          roomType: 'bedroom',
          area: 20,
          hasAC: true,
          hasHeating: true,
          bedCount: 1,
          bedType: 'double',
        },
        {
          roomType: 'bedroom',
          area: 18,
          hasAC: false,
          hasHeating: true,
          bedCount: 2,
          bedType: 'single',
        },
        {
          roomType: 'living_room',
          area: 25,
          hasAC: false,
          hasHeating: true,
        },
        {
          roomType: 'kitchen',
          area: 15,
          hasAC: false,
          hasHeating: true,
        },
        {
          roomType: 'bathroom',
          area: 7,
          hasAC: false,
          hasHeating: true,
        },
      ],
      features: ['lake_view', 'furnished', 'internet', 'parking'],
    },
  },
  {
    pageContent: '',
    metadata: {
      title: 'Budget-Friendly Sevan Studio',
      description:
        'Affordable studio apartment with partial lake view. Includes Murphy bed and small kitchenette. Walking distance to the beach.',
      apartmentType: 'studio',
      totalArea: 30,
      pricePerMonth: 300,
      bedroomCount: 0,
      bathroomCount: 1,
      maxOccupancy: 2,
      locationAddress: '89 Beach Road',
      locationCity: 'Sevan',
      locationCoordinates: { lat: 40.547, lng: 44.933 },
      hasParking: false,
      hasYard: false,
      rooms: [
        {
          roomType: 'living_room',
          area: 22,
          hasAC: true,
          hasHeating: true,
          bedCount: 1,
          bedType: 'murphy',
        },
        {
          roomType: 'kitchen',
          area: 4,
          hasAC: false,
          hasHeating: true,
        },
        {
          roomType: 'bathroom',
          area: 4,
          hasAC: false,
          hasHeating: true,
        },
      ],
      features: ['lake_view', 'furnished', 'internet'],
    },
  },
]

export const getMockDocuments = () => {
  return mockApartments.map(
    (apt) =>
      new Document({
        pageContent: generatePageContent(apt.metadata),
        metadata: apt.metadata,
      }),
  )
}

export function generatePageContent(apt: MockApartmentDocument): string {
  const parts = [
    // Basic information
    `${apt.title}.`,
    apt.description,

    // Location and type
    `This ${apt.apartmentType} is located in ${apt.locationCity} at ${apt.locationAddress}.`,

    // Size and capacity
    `The property is ${apt.totalArea} square meters with ${apt.bedroomCount} bedrooms and ${apt.bathroomCount} bathrooms, suitable for up to ${apt.maxOccupancy} people.`,

    // Outdoor amenities
    apt.hasYard ? `It has a ${apt.yardArea} square meter yard.` : '',
    apt.hasParking ? 'Parking is available.' : '',

    // Rooms detail
    'Rooms include:',
    ...apt.rooms.map((room) => {
      const parts = [
        `- A ${room.area} square meter ${room.roomType}`,
        room.hasAC ? 'with air conditioning' : '',
        room.hasHeating ? 'with heating' : '',
        room.bedCount ? `containing ${room.bedCount} ${room.bedType} bed(s)` : '',
      ]
      return parts.filter(Boolean).join(' ')
    }),

    // Features and amenities
    'Property features:',
    apt.features.join(', '),

    // Price
    `Monthly rent is ${apt.pricePerMonth} USD.`,
  ]

  return parts.filter(Boolean).join(' ')
}
