import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST() {
  try {
    const supabase = await createClient();
    
    // Delete in correct order to respect foreign key constraints
    await Promise.all([
      supabase.from('apartment_feature_links').delete().neq('apartment_id', '0'),
      supabase.from('apartment_rooms').delete().neq('id', '0'),
      supabase.from('apartment_features').delete().neq('id', '0'),
      supabase.from('apartments').delete().neq('id', '0')
    ]);

    return NextResponse.json({ message: 'Database cleaned successfully' });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json(
      { error: 'Failed to clean database' },
      { status: 500 }
    );
  }
} 