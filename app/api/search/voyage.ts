import { createClient } from '@/utils/supabase/server'
import { VoyageEmbeddings } from '@langchain/community/embeddings/voyage'
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'

export const getEmbedding = (inputType: 'document' | 'query') => {
  const embedding = new VoyageEmbeddings({
    // modelName: 'voyage-3-large',
    apiKey: process.env.VOYAGE_API_KEY, // In Node.js defaults to process.env.VOYAGEAI_API_KEY
    inputType, // Optional: specify input type as 'query', 'document', or omit for None / Undefined / Null
  })

  return embedding
}

export const getVectorStore = async (inputType: 'document' | 'query') => {
  const client = await createClient()

  return new SupabaseVectorStore(getEmbedding(inputType), {
    client,
    tableName: 'documents',
    queryName: 'match_documents',
  })
}
