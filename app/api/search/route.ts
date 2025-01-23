import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { VoyageEmbedding } from './voyage';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    // Get vector embedding for the search query
    const embedding = await VoyageEmbedding.getEmbedding(query);
    const supabase = await createClient();

    // Perform pure vector similarity search
    const { data: results, error } = await supabase.rpc('match_apartments', {
      query_embedding: embedding as string,
      match_threshold: 0.6,
      match_count: 5
    });

    console.log("results: ", results);
    
    

    if (error) throw error;

    return NextResponse.json(
      { results: results.map(
        (result) => ({
          id: result.id,
          title: result.title,
          description: result.description,
          location: result.location_city,
          price: result.price_per_month,
          similarity: result.similarity
        })) 
      }
    );
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}