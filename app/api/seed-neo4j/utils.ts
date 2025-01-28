import { mockPlaces } from '@/mock/nodes/mock-nodes'
import { Amenity, PlaceAmenity, RoomType } from '@/mock/nodes/types'
import { type Driver } from 'neo4j-driver'

// Locations
export type CityNode = {
  name: string
}

export async function seedCities(driver: Driver) {
  const cities: CityNode[] = Array.from(new Set(mockPlaces.map((place) => place.locationCity))).map((city) => ({
    name: city,
  }))

  const query = `
    CREATE (city:City { name: $city.name })
  `

  await Promise.all(cities.map((city) => driver.executeQuery(query, { city })))
}

// Amenities
export type AmenityNode = {
  name: Amenity
}
export type PlaceAmenityNode = {
  name: PlaceAmenity
}

export async function seedAmenities(driver: Driver) {
  const amenities: AmenityNode[] = Object.values(Amenity).map((amenity) => ({
    name: amenity,
  }))

  const placeAmenities: PlaceAmenityNode[] = Object.values(PlaceAmenity).map((amenity) => ({
    name: amenity,
  }))

  const amenityQuery = `
    CREATE (amenity:Amenity { name: $amenity.name })
  `

  const placeAmenityQuery = `
    CREATE (placeAmenity:PlaceAmenity { name: $placeAmenity.name })
  `

  await Promise.all(amenities.map((amenity) => driver.executeQuery(amenityQuery, { amenity })))
  await Promise.all(placeAmenities.map((placeAmenity) => driver.executeQuery(placeAmenityQuery, { placeAmenity })))
}

// Places
export type PlaceNode = {
  title: string
  description: string
  pricePerMonth?: number

  maxPeople: number
  locationAddress: string
}

export async function seedPlaces(driver: Driver) {
  const places: PlaceNode[] = mockPlaces.map((place) => ({
    title: place.title,
    description: place.description,
    maxPeople: place.maxOccupancy,
    locationAddress: place.locationAddress,
    pricePerMonth: place.pricePerMonth,
  }))

  const createPlaceQuery = `
  CREATE (place:Place { 
    title: $place.title, 
    description: $place.description, 
    maxPeople: $place.maxPeople, 
    locationAddress: $place.locationAddress, 
    pricePerMonth: $place.pricePerMonth 
  })
`

  await Promise.all(places.map((place) => driver.executeQuery(createPlaceQuery, { place })))

  const createAmenityRelationsQuery = `
  MATCH (place:Place { title: $place.title })
  MATCH (placeAmenity:PlaceAmenity)
  WHERE placeAmenity.name IN $place.amenities
  MERGE (place)-[:HAS]->(placeAmenity)
`

  await Promise.all(
    mockPlaces.map((place) =>
      driver.executeQuery(createAmenityRelationsQuery, {
        place: {
          title: place.title,
          amenities: place.amenities || [],
        },
      }),
    ),
  )
}

// Room Types
// export async function seedRoomTypes(driver: Driver) { ... }

// Rooms
export type RoomNode = {
  roomType: RoomType
}

// export async function seedRooms(driver: Driver) {
//   const rooms: RoomNode[] = mockApartments.flatMap((apt) => apt.rooms.map((room) => ({}))) //roomType: room .roomType

//   const query = `
//     CREATE (room:Room { roomType: $room.roomType })
//   `

//   await Promise.all(rooms.map((room) => driver.executeQuery(query, { room })))
// }

// --- Relations ---
// Place to Room relations
export async function seedPlaceToRoomsRoomsToAmenitiesRelations(driver: Driver) {
  const roomsByPlaces: Record<string, RoomWithAmenities[]> = {}

  mockPlaces.forEach((place) => {
    roomsByPlaces[place.title] = place.rooms.map((room) => ({
      roomType: room.roomType,
      amenities: room.amenities || [],
    }))
  })

  // First create rooms
  const createRoomQuery = `
    MATCH (place:Place { title: $place.title })
    CREATE (place)-[:HAS]->(room:Room { roomType: $room.roomType })
    RETURN room
  `

  // Then create relationships to amenities
  const createAmenityRelationQuery = `
    MATCH (place:Place { title: $place.title })
    MATCH (room:Room { roomType: $room.roomType })
    WHERE (place)-[:HAS]->(room)
    MATCH (amenity:Amenity)
    WHERE amenity.name IN $room.amenities
    MERGE (room)-[:HAS]->(amenity)
  `

  // Execute in sequence to avoid duplicates
  for (const [placeTitle, rooms] of Object.entries(roomsByPlaces)) {
    for (const room of rooms) {
      // First create the room
      await driver.executeQuery(createRoomQuery, {
        place: { title: placeTitle },
        room,
      })

      // Then create amenity relationships if there are any
      if (room.amenities.length > 0) {
        await driver.executeQuery(createAmenityRelationQuery, {
          place: { title: placeTitle },
          room,
        })
      }
    }
  }
}

interface RoomWithAmenities {
  roomType: RoomType
  amenities: Amenity[]
}

// Place to Location relations
export async function seedPlaceToLocationRelations(driver: Driver) {
  const query = `
    MATCH (place:Place { title: $place.title })
    MATCH (location:City { name: $place.city })
    MERGE (place)-[:LOCATED_AT]->(location)
  `

  await Promise.all(
    mockPlaces.map((place) =>
      driver.executeQuery(query, {
        place: {
          title: place.title,
          city: place.locationCity,
        },
      }),
    ),
  )
}
