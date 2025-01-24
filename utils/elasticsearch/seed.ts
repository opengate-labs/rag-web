import { client as esClient, APARTMENTS_INDEX } from './client';
import { mockApartments } from '@/database/mock-apartments';
import type { MockApartment } from '@/utils/seed-data';

export async function seedElasticsearch() {
  try {
    console.log("Starting bulk ingest...");

    const bulkResponse = await esClient.helpers.bulk({
      datasource: mockApartments,
      onDocument(apartment: MockApartment) {
        // Create rich searchable text from multiple fields
        const searchableText = [
          apartment.title,
          apartment.description,
          `${apartment.bedroomCount} bedroom ${apartment.apartmentType}`,
          `Located in ${apartment.locationCity}`,
          apartment.hasYard ? 'Has yard' : '',
          apartment.hasParking ? 'With parking' : '',
          apartment.rooms
            .filter(r => r.hasAC)
            .map(() => 'Air conditioned')
            .join(', '),
          apartment.features.join(', '),
          `Price: ${apartment.pricePerMonth} per month`
        ].filter(Boolean).join('. ');

        return {
          index: { _index: APARTMENTS_INDEX },
          document: {
            ...apartment,
            searchableText,
            location: {
              lat: apartment.locationCoordinates.lat,
              lon: apartment.locationCoordinates.lng
            }
          }
        };
      }
    });

    console.log('Bulk ingest response:', bulkResponse);

    // Refresh the index
    await esClient.indices.refresh({ index: APARTMENTS_INDEX });
    
    return { success: true, message: 'Data seeded successfully' };
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
} 