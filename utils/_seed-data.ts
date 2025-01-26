// @ts-nocheck
// import { VoyageEmbedding } from '@/app/api/search/voyage';
import { createClient } from '@/utils/supabase/server'
import type { Database } from '@/database.types'
import { MockApartment, mockApartments } from '@/mock/mock-apartments'
import { getEmbedding } from '@/app/api/search/voyage'

export function generateEmbeddingText(apt: MockApartment): string {
  // Build a detailed text description that captures all relevant apartment attributes
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

export async function seedDatabase() {
  try {
    const supabase = await createClient()

    console.log('Here')

    // First, insert features
    const uniqueFeatures = new Set(mockApartments.flatMap((apt) => apt.features))
    for (const feature of uniqueFeatures) {
      await supabase.from('apartment_features').upsert(
        {
          name: feature,
          category: getCategoryForFeature(feature),
        },
        { onConflict: 'name' },
      )
    }

    // Get feature IDs
    const { data: featureData } = await supabase.from('apartment_features').select('id, name')

    const featureMap = new Map(featureData?.map((f) => [f.name, f.id]))

    // Insert apartments and their related data
    for (const apt of mockApartments) {
      // Generate comprehensive embedding text

      const embeddingText = generateEmbeddingText(apt)
      console.log('embeddingText', embeddingText)

      // Generate embedding for the comprehensive text
      const embedQuery = getEmbedding('query')

      console.log('embedding: ', embedQuery)

      vectorStore.addDocuments([apt])

      // Insert apartment
      const { data: apartmentData, error: apartmentError } = await supabase
        .from('apartments')
        .insert({
          title: apt.title,
          description: apt.description,
          apartment_type: apt.apartmentType,
          total_area: apt.totalArea,
          price_per_month: apt.pricePerMonth,
          bedroom_count: apt.bedroomCount,
          bathroom_count: apt.bathroomCount,
          max_occupancy: apt.maxOccupancy,
          location_address: apt.locationAddress,
          location_city: apt.locationCity,
          location_coordinates: `(${apt.locationCoordinates.lat},${apt.locationCoordinates.lng})`,
          has_parking: apt.hasParking,
          has_yard: apt.hasYard,
          yard_area: apt.yardArea,
          embedding: embedding as unknown as string,
        } satisfies Database['public']['Tables']['apartments']['Insert'])
        .select('id')
        .single()

      if (apartmentError) throw apartmentError

      // Insert rooms
      for (const room of apt.rooms) {
        await supabase.from('apartment_rooms').insert({
          apartment_id: apartmentData.id,
          room_type: room.roomType,
          area: room.area,
          has_ac: room.hasAC,
          has_heating: room.hasHeating,
          bed_count: room.bedCount,
          bed_type: room.bedType,
        })
      }

      // Insert feature links
      for (const feature of apt.features) {
        const featureId = featureMap.get(feature)
        if (featureId) {
          await supabase.from('apartment_feature_links').insert({
            apartment_id: apartmentData.id,
            feature_id: featureId,
          })
        }
      }
    }

    console.log('Database seeded successfully!')
  } catch (error) {
    // console.error('Error seeding database:', error);
    throw error
  }
}

// Helper function to categorize features
function getCategoryForFeature(feature: string): string {
  const categories = {
    amenity: [
      'internet',
      'smart_home',
      'modern_appliances',
      'elevator',
      'security',
      'pool',
      'gym',
      'fireplace',
      'parking',
    ],
    view: ['lake_view', 'city_view', 'mountain_view'],
    outdoor: ['garden', 'balcony', 'fruit_trees'],
    style: ['luxury_finishes', 'traditional_architecture'],
    characteristic: ['family_friendly', 'furnished'],
  }

  for (const [category, features] of Object.entries(categories)) {
    if (features.includes(feature)) {
      return category
    }
  }

  return 'other'
}
