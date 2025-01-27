import { getElasticVectorStore } from '@/elastic'
import { getMockDocuments } from '@/mock/mock-documents'
import { Client } from '@elastic/elasticsearch'

export async function seedElastic() {
  try {
    const docs = await getMockDocuments()

    // const vectorStore = await getElasticVectorStore('document')

    const client = new Client({
      node: process.env.ELASTICSEARCH_URL,
      auth: {
        apiKey: process.env.ELASTICSEARCH_API_KEY!,
      },
    })

    // const operations = docs.flatMap((doc) => [{ index: { _index: 'apartment_index_final' } }, doc])

    const result = await client.helpers.bulk({
      index: 'apartment_index_final',
      datasource: docs,
      onDocument() {
        return {
          index: {},
        }
      },
    })

    // const result = await client.bulk({ operations })

    // const result = await vectorStore.addDocuments(docs)

    console.log('Elastic Database seeded successfully!', result)
  } catch (error) {
    console.error('Error seeding Elastic database:', error)
    throw error
  }
}
