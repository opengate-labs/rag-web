export type ApartmentNode = {
  title: string
  description: string

  // apartmentType: 'studio' | 'apartment' | 'house' | 'villa'
  maxOccupancy: number
  locationAddress: string
  locationCity: string

  totalArea: number
  pricePerMonth: number

  text: string
  embedding: number[]
}

export type RoomNode = {
  roomType: RoomType
  // area: number TOOD: maybe move area to relation props
  // bedCount?: number TODO: maybe move as a relation prop
  // bedType?: string TODO: maybe move as a separate node
}

// (Room)-[:HAS]->(AC)
// (Room)-[:HAS]->(Heating)

// export interface ACNode {}
// export type HeatingNode

export enum RoomType {
  BEDROOM = 'bedroom',
  LIVING_ROOM = 'living room',
  KITCHEN = 'kitchen',
  BATHROOM = 'bathroom',
}

export type Relation = {
  from: string
  to: string
  type: string
}

export enum PlaceAmenity {
  HEATING = 'heating',
  YARD = 'yard',
  PARKING = 'parking',
  WIFI = 'wifi',
  WASHER = 'washer',
  DRYER = 'dryer',
}

export enum Amenity {
  AC = 'ac',
  TV = 'tv',
  HEATING = 'heating',
}
