import { client, APARTMENTS_INDEX } from './client';

// Elasticsearch mapping for apartments
export const apartmentMapping = {
  properties: {
    title: { type: 'text', analyzer: 'english' },
    description: { 
      type: "semantic_text"  // This will use ELSER model for semantic search
    },
    searchableText: {
      type: "semantic_text",  // Another semantic field for combined text
    },
    apartmentType: { type: 'keyword' },
    totalArea: { type: 'float' },
    pricePerMonth: { type: 'float' },
    bedroomCount: { type: 'integer' },
    bathroomCount: { type: 'integer' },
    maxOccupancy: { type: 'integer' },
    locationAddress: { type: 'text' },
    locationCity: { type: 'keyword' },
    location: { type: 'geo_point' },
    hasParking: { type: 'boolean' },
    hasYard: { type: 'boolean' },
    yardArea: { type: 'float' },
    rooms: {
      type: 'nested',
      properties: {
        roomType: { type: 'keyword' },
        area: { type: 'float' },
        hasAC: { type: 'boolean' },
        hasHeating: { type: 'boolean' },
        bedCount: { type: 'integer' },
        bedType: { type: 'keyword' }
      }
    },
    features: { type: 'keyword' }
  }
};

export async function setupElasticsearch() {
  // Create index if it doesn't exist
  
  console.log("HERE");
  const indexExists = await client.indices.exists({
    index: APARTMENTS_INDEX
  });
  console.log("indexExists: ", indexExists);

  if (!indexExists) {

    console.log("Creating index");
    await client.indices.create({
      index: APARTMENTS_INDEX,
      mappings: apartmentMapping
    });
  }
} 