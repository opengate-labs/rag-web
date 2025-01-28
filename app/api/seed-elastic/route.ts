import { NextResponse } from 'next/server'
import { seedElastic } from '@/utils/elasticsearch/seed-documents'

export async function POST() {
  try {
    await seedElastic()

    return NextResponse.json({ message: 'Database seeded successfully' })
  } catch (error) {
    console.error('Seeding error:', error)

    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
  }
}
