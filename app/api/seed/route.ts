import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { setupElasticsearch } from '@/utils/elasticsearch/mapping';
import { seedElasticsearch } from '@/utils/elasticsearch/seed';

export async function POST() {
  try {

    // Setup Elasticsearch (creates index with mapping)
    console.log("ZZZ");
    
    await setupElasticsearch();

    // Seed both databases
    await seedElasticsearch();

    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
} 