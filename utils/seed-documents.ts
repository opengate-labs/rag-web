import { getVectorStore } from '@/app/api/search/voyage';
import { getMockDocuments } from '@/mock/mock-documents';

export async function seedDatabase() {
  try {
    const docs = getMockDocuments();

    const vectorStore = await getVectorStore('document');

    const result = await vectorStore.addDocuments(docs);

    console.log('Database seeded successfully!', result);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}