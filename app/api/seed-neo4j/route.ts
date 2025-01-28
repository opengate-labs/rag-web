// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck dont check this file
// import { getNeo4jGraph } from '@/ai/graph/neo4'
// import { mockQuery } from '@/mock/nodes/mock-nodes'
import { mockApartments } from '@/mock/mock-apartments'
import { ApartmentNode, RoomNode, RoomType } from '@/mock/nodes/types'
import neo4j, { Driver } from 'neo4j-driver'
import {
  seedAmenities,
  seedCities,
  seedPlaces,
  seedPlaceToLocationRelations,
  seedPlaceToRoomsRoomsToAmenitiesRelations,
} from './utils'

export async function POST() {
  // const { graph, model } = await getNeo4jGraph()

  // graph.query(mockQuery)

  const URI = process.env.NEO4J_URL || 'bolt://localhost:7687'
  const USER = process.env.NEO4J_USERNAME || 'neo4j'
  const PASSWORD = process.env.NEO4J_PASSWORD || 'pleaseletmein'

  let driver: Driver | null = null

  // Connect to database
  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    const serverInfo = await driver.getServerInfo()
    console.log('serverInfo: ', serverInfo)
  } catch (err) {
    console.log(`Connection error\n${err}`)
    await driver?.close()
    return
  }

  await seedCities(driver)

  await seedAmenities(driver)

  await seedPlaces(driver)

  await seedPlaceToRoomsRoomsToAmenitiesRelations(driver)

  await seedPlaceToLocationRelations(driver)

  return new Response('ok')
  const amenities: AmenityNode[] = Object.values(AmenityType).map((amenityType) => ({
    name: amenityType,
  }))

  const rooms: RoomNode[] = Object.values(RoomType).map((roomType) => ({
    roomType,
  }))

  const apartments: ApartmentNode[] = mockApartments.map((apartment) => {
    const { title, description, apartmentType, maxOccupancy, locationAddress, locationCity, totalArea, pricePerMonth } =
      apartment

    return {
      title,
      description,
      apartmentType,
      maxOccupancy,
      locationAddress,
      locationCity,

      totalArea,
      pricePerMonth,

      text: '',
      embedding: [],
    }
  })

  // Create some nodes
  for (const room of rooms) {
    await driver.executeQuery('MERGE (p:Room {roomType: $room.roomType})', { room: room }, { database: 'neo4j' })
  }

  for (const amenity of amenities) {
    await driver.executeQuery(
      'MERGE (p:Amenity {amenityType: $amenity.amenityType})',
      { amenity: amenity },
      { database: 'neo4j' },
    )
  }

  for (const apartment of apartments) {
    await driver.executeQuery(
      'MERGE (p:Apartment {title: $apartment.title, description: $apartment.description, apartmentType: $apartment.apartmentType, maxOccupancy: $apartment.maxOccupancy, locationAddress: $apartment.locationAddress, locationCity: $apartment.locationCity, totalArea: $apartment.totalArea, pricePerMonth: $apartment.pricePerMonth, text: $apartment.text, embedding: $apartment.embedding})',
      { apartment: apartment },
      { database: 'neo4j' },
    )
  }

  // Create some relationships
  // Create random relationships between rooms and amenities
  for (const room of rooms) {
    const randomAmenityCount = getRandomInt(2, 5)
    const randomAmenities = getRandomItems(amenities, randomAmenityCount)

    await driver.executeQuery(
      `
    MATCH (room:Room {roomType: $room.roomType})
    UNWIND $amenities as amenity
    MATCH (a:Amenity {amenityType: amenity.amenityType})
    MERGE (room)-[:HAS]->(a)
    `,
      { room, amenities: randomAmenities },
      { database: 'neo4j' },
    )
  }

  // Create relationships between apartments and rooms
  for (const apartment of apartments) {
    const randomRoomCount = getRandomInt(2, 4)
    const randomRooms = getRandomItems(rooms, randomRoomCount)

    await driver.executeQuery(
      `
    MATCH (apt:Apartment {title: $apartment.title})
    UNWIND $rooms as room
    MATCH (r:Room {roomType: room.roomType})
    MERGE (apt)-[:CONTAINS]->(r)
    `,
      { apartment, rooms: randomRooms },
      { database: 'neo4j' },
    )
  }

  // Keep the existing rooms -> amenity relationships
  for (const room of rooms) {
    const randomAmenityCount = getRandomInt(2, 5)
    const randomAmenities = getRandomItems(rooms, randomAmenityCount)

    await driver.executeQuery(
      `
      MATCH (r:Room {roomType: $room.roomType})
      UNWIND $amenities as amenity
      MATCH (a:Amenity {amenityType: amenity.amenityType})
      MERGE (r)-[:HAS]->(a)
      `,
      { room, amenities: randomAmenities },
      { database: 'neo4j' },
    )
  }

  // Keep the existing apartment -> amenity relationships
  // for (const apartment of apartments) {
  //   const randomAmenityCount = getRandomInt(2, 5)
  //   const randomAmenities = getRandomItems(amenities, randomAmenityCount)

  //   await driver.executeQuery(
  //     `
  //     MATCH (apt:Apartment {title: $apartment.title})
  //     UNWIND $amenities as amenity
  //     MATCH (a:Amenity {amenityType: amenity.amenityType})
  //     MERGE (apt)-[:HAS]->(a)
  //     `,
  //     { apartment, amenities: randomAmenities },
  //     { database: 'neo4j' },
  //   )
  // }

  // Retrieve Alice's friends who are under 40
  // const result = await driver.executeQuery(
  //   `
  //   MATCH (p:Person {name: $name})-[:KNOWS]-(friend:Person)
  //   WHERE friend.age < $age
  //   RETURN friend
  //   `,
  //   { name: 'Alice', age: 40 },
  //   { database: 'neo4j' },
  // )

  // // Loop through results and do something with them
  // for (const person of result.records) {
  //   // `person.friend` is an object of type `Node`
  //   console.log(person.get('friend'))
  // }

  // Summary information
  // console.log(
  //   `The query \`${result.summary.query.text}\` ` +
  //     `returned ${result.records.length} records ` +
  //     `in ${result.summary.resultAvailableAfter} ms.`,
  // )

  await driver.close()
}

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
