import { getEmbedding } from '@/app/api/search/voyage'
import { v4 as uuidv4 } from 'uuid'
import { RoomType } from './nodes/types'

export interface MockApartmentDocument {
  embedding: number[]
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
    roomType: RoomType
    area: number
    hasAC: boolean
    hasHeating: boolean
    bedCount?: number
    bedType?: string
  }>
  features: string[]
  text: string
}

export const mockApartments: MockApartmentDocument[] = [
  {
    embedding: [],
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
        roomType: RoomType.BEDROOM,
        area: 25,
        hasAC: true,
        hasHeating: true,
        bedCount: 1,
        bedType: 'double',
      },
      {
        roomType: RoomType.BEDROOM,
        area: 20,
        hasAC: false,
        hasHeating: true,
        bedCount: 3,
        bedType: 'single',
      },
      {
        roomType: RoomType.LIVING_ROOM,
        area: 35,
        hasAC: true,
        hasHeating: true,
      },
      {
        roomType: RoomType.KITCHEN,
        area: 25,
        hasAC: false,
        hasHeating: true,
      },
      {
        roomType: RoomType.BATHROOM,
        area: 15,
        hasAC: false,
        hasHeating: true,
      },
    ],
    features: ['lake_view', 'family_friendly', 'furnished', 'internet', 'balcony'],
    text: '',
  },
  {
    embedding: [],
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
        roomType: RoomType.LIVING_ROOM,
        area: 30,
        hasAC: true,
        hasHeating: true,
        bedCount: 1,
        bedType: 'murphy',
      },
      {
        roomType: RoomType.KITCHEN,
        area: 10,
        hasAC: false,
        hasHeating: true,
      },
      {
        roomType: RoomType.BATHROOM,
        area: 5,
        hasAC: false,
        hasHeating: true,
      },
    ],
    features: ['city_view', 'smart_home', 'modern_appliances', 'elevator', 'security'],
    text: '',
  },
  {
    embedding: [],
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
        roomType: RoomType.BEDROOM,
        area: 40,
        hasAC: true,
        hasHeating: true,
        bedCount: 1,
        bedType: 'king',
      },
      {
        roomType: RoomType.BEDROOM,
        area: 35,
        hasAC: true,
        hasHeating: true,
        bedCount: 1,
        bedType: 'queen',
      },
      {
        roomType: RoomType.BEDROOM,
        area: 30,
        hasAC: true,
        hasHeating: true,
        bedCount: 2,
        bedType: 'single',
      },
      {
        roomType: RoomType.BEDROOM,
        area: 30,
        hasAC: true,
        hasHeating: true,
        bedCount: 2,
        bedType: 'single',
      },
      {
        roomType: RoomType.LIVING_ROOM,
        area: 80,
        hasAC: true,
        hasHeating: true,
      },
      {
        roomType: RoomType.KITCHEN,
        area: 40,
        hasAC: true,
        hasHeating: true,
      },
      {
        roomType: RoomType.BATHROOM,
        area: 15,
        hasAC: true,
        hasHeating: true,
      },
      {
        roomType: RoomType.BATHROOM,
        area: 12,
        hasAC: true,
        hasHeating: true,
      },
      {
        roomType: RoomType.BATHROOM,
        area: 12,
        hasAC: true,
        hasHeating: true,
      },
    ],
    features: ['mountain_view', 'pool', 'smart_home', 'luxury_finishes', 'garden', 'parking', 'security', 'gym'],
    text: '',
  },
  {
    embedding: [],
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
        roomType: RoomType.BEDROOM,
        area: 20,
        hasAC: false,
        hasHeating: true,
        bedCount: 1,
        bedType: 'double',
      },
      {
        roomType: RoomType.BEDROOM,
        area: 18,
        hasAC: false,
        hasHeating: true,
        bedCount: 2,
        bedType: 'single',
      },
      {
        roomType: RoomType.BEDROOM,
        area: 18,
        hasAC: false,
        hasHeating: true,
        bedCount: 2,
        bedType: 'single',
      },
      {
        roomType: RoomType.LIVING_ROOM,
        area: 45,
        hasAC: false,
        hasHeating: true,
      },
      {
        roomType: RoomType.KITCHEN,
        area: 30,
        hasAC: false,
        hasHeating: true,
      },
      {
        roomType: RoomType.BATHROOM,
        area: 10,
        hasAC: false,
        hasHeating: true,
      },
      {
        roomType: RoomType.BATHROOM,
        area: 9,
        hasAC: false,
        hasHeating: true,
      },
    ],
    features: ['traditional_architecture', 'fireplace', 'garden', 'fruit_trees', 'parking'],
    text: '',
  },
  {
    embedding: [],
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
        roomType: RoomType.BEDROOM,
        area: 28,
        hasAC: true,
        hasHeating: true,
        bedCount: 1,
        bedType: 'king',
      },
      {
        roomType: RoomType.BEDROOM,
        area: 22,
        hasAC: false,
        hasHeating: true,
        bedCount: 2,
        bedType: 'single',
      },
      {
        roomType: RoomType.BEDROOM,
        area: 20,
        hasAC: false,
        hasHeating: true,
        bedCount: 3,
        bedType: 'single',
      },
      {
        roomType: RoomType.LIVING_ROOM,
        area: 35,
        hasAC: true,
        hasHeating: true,
      },
      {
        roomType: RoomType.KITCHEN,
        area: 20,
        hasAC: false,
        hasHeating: true,
      },
      {
        roomType: RoomType.BATHROOM,
        area: 8,
        hasAC: false,
        hasHeating: true,
      },
      {
        roomType: RoomType.BATHROOM,
        area: 7,
        hasAC: false,
        hasHeating: true,
      },
    ],
    features: ['lake_view', 'family_friendly', 'furnished', 'internet', 'balcony', 'parking'],
    text: '',
  },
  {
    embedding: [],
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
        roomType: RoomType.LIVING_ROOM,
        area: 25,
        hasAC: true,
        hasHeating: true,
        bedCount: 1,
        bedType: 'murphy',
      },
      {
        roomType: RoomType.KITCHEN,
        area: 5,
        hasAC: false,
        hasHeating: true,
      },
      {
        roomType: RoomType.BATHROOM,
        area: 5,
        hasAC: false,
        hasHeating: true,
      },
    ],
    features: ['lake_view', 'modern_appliances', 'furnished', 'internet', 'balcony'],
    text: '',
  },
  {
    embedding: [],
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
        roomType: RoomType.BEDROOM,
        area: 25,
        hasAC: true,
        hasHeating: true,
        bedCount: 1,
        bedType: 'queen',
      },
      {
        roomType: RoomType.BEDROOM,
        area: 22,
        hasAC: true,
        hasHeating: true,
        bedCount: 1,
        bedType: 'double',
      },
      {
        roomType: RoomType.BEDROOM,
        area: 20,
        hasAC: false,
        hasHeating: true,
        bedCount: 2,
        bedType: 'single',
      },
      {
        roomType: RoomType.BEDROOM,
        area: 20,
        hasAC: false,
        hasHeating: true,
        bedCount: 3,
        bedType: 'single',
      },
      {
        roomType: RoomType.LIVING_ROOM,
        area: 45,
        hasAC: true,
        hasHeating: true,
      },
      {
        roomType: RoomType.KITCHEN,
        area: 30,
        hasAC: false,
        hasHeating: true,
      },
      {
        roomType: RoomType.BATHROOM,
        area: 10,
        hasAC: false,
        hasHeating: true,
      },
      {
        roomType: RoomType.BATHROOM,
        area: 8,
        hasAC: false,
        hasHeating: true,
      },
    ],
    features: ['lake_view', 'family_friendly', 'furnished', 'internet', 'garden', 'parking', 'playground'],
    text: '',
  },
  {
    embedding: [],
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
        roomType: RoomType.BEDROOM,
        area: 30,
        hasAC: true,
        hasHeating: true,
        bedCount: 1,
        bedType: 'queen',
      },
      {
        roomType: RoomType.BEDROOM,
        area: 25,
        hasAC: false,
        hasHeating: true,
        bedCount: 2,
        bedType: 'single',
      },
      {
        roomType: RoomType.BEDROOM,
        area: 25,
        hasAC: false,
        hasHeating: true,
        bedCount: 3,
        bedType: 'single',
      },
      {
        roomType: RoomType.LIVING_ROOM,
        area: 40,
        hasAC: true,
        hasHeating: true,
      },
      {
        roomType: RoomType.KITCHEN,
        area: 25,
        hasAC: false,
        hasHeating: true,
      },
      {
        roomType: RoomType.BATHROOM,
        area: 8,
        hasAC: false,
        hasHeating: true,
      },
      {
        roomType: RoomType.BATHROOM,
        area: 7,
        hasAC: false,
        hasHeating: true,
      },
    ],
    features: ['lake_view', 'family_friendly', 'furnished', 'internet', 'bbq', 'parking'],
    text: '',
  },
  {
    embedding: [],
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
        roomType: RoomType.BEDROOM,
        area: 20,
        hasAC: true,
        hasHeating: true,
        bedCount: 1,
        bedType: 'double',
      },
      {
        roomType: RoomType.BEDROOM,
        area: 18,
        hasAC: false,
        hasHeating: true,
        bedCount: 2,
        bedType: 'single',
      },
      {
        roomType: RoomType.LIVING_ROOM,
        area: 25,
        hasAC: false,
        hasHeating: true,
      },
      {
        roomType: RoomType.KITCHEN,
        area: 15,
        hasAC: false,
        hasHeating: true,
      },
      {
        roomType: RoomType.BATHROOM,
        area: 7,
        hasAC: false,
        hasHeating: true,
      },
    ],
    features: ['lake_view', 'furnished', 'internet', 'parking'],
    text: '',
  },
  {
    embedding: [],
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
        roomType: RoomType.LIVING_ROOM,
        area: 22,
        hasAC: true,
        hasHeating: true,
        bedCount: 1,
        bedType: 'murphy',
      },
      {
        roomType: RoomType.KITCHEN,
        area: 4,
        hasAC: false,
        hasHeating: true,
      },
      {
        roomType: RoomType.BATHROOM,
        area: 4,
        hasAC: false,
        hasHeating: true,
      },
    ],
    features: ['lake_view', 'furnished', 'internet'],
    text: '',
  },
]

export const getMockDocuments = async () => {
  const docs = mockApartments.map(async (apt) => {
    const text = generatePageContent(apt)
    const embeddings = await getEmbedding('document')
    const embedding = await embeddings.embedQuery(text)

    return {
      ...apt,
      id: uuidv4(),
      text,
      embedding,
    }
  })

  return Promise.all(docs)
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
