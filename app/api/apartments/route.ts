import { createClient } from '@/utils/supabase/server';
import { syncApartmentToElasticsearch } from '@/utils/sync-elasticsearch';

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const data = await request.json();

    // First, update Supabase
    const { data: apartment, error } = await supabase
      .from('apartments')
      .update(data)
      .eq('id', data.id)
      .select()
      .single();

    if (error) throw error;

    // Then sync to Elasticsearch
    await syncApartmentToElasticsearch(apartment.id);

    return Response.json({ success: true, data: apartment });
  } catch (error) {
    return Response.json({ error: 'Failed to update apartment' }, { status: 500 });
  }
} 