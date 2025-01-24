import { createClient } from '@/utils/supabase/server';
import { client as esClient, APARTMENTS_INDEX } from './elasticsearch/client';

export async function syncApartmentToElasticsearch(apartmentId: string) {
  const supabase = await createClient();
  
  // Get apartment data from Supabase
  const { data: apartment } = await supabase
    .from('apartments')
    .select(`
      *,
      rooms:apartment_rooms(*),
      features:apartment_feature_links(
        feature:apartment_features(*)
      )
    `)
    .eq('id', apartmentId)
    .single();

  if (apartment) {
    // Update Elasticsearch index
    await esClient.index({
      index: APARTMENTS_INDEX,
      id: apartment.id,
      document: {
        title: apartment.title,
        description: apartment.description,
        apartment_type: apartment.apartment_type,
        price_per_month: apartment.price_per_month,
        // ... other fields
      }
    });
  }
}

export function setupRealtimeSync() {
  const supabase = createClient();

  supabase
    .channel('apartment-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'apartments'
      },
      async (payload) => {
        switch (payload.eventType) {
          case 'INSERT':
          case 'UPDATE':
            await syncApartmentToElasticsearch(payload.new.id);
            break;
          case 'DELETE':
            await esClient.delete({
              index: APARTMENTS_INDEX,
              id: payload.old.id
            });
            break;
        }
      }
    )
    .subscribe();
} 