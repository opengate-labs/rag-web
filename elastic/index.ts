import { ElasticVectorSearch, type ElasticClientArgs } from '@langchain/community/vectorstores/elasticsearch'
import { Client, type ClientOptions } from '@elastic/elasticsearch'
import * as fs from 'node:fs'
import { getEmbedding } from '@/app/api/search/voyage'

// const embeddings = new OpenAIEmbeddings({
//   model: 'text-embedding-3-small',
// })

const config: ClientOptions = {
  node: process.env.ELASTICSEARCH_URL ?? 'https://127.0.0.1:9200',
}

if (process.env.ELASTICSEARCH_API_KEY) {
  config.auth = {
    apiKey: process.env.ELASTICSEARCH_API_KEY,
  }
} else if (process.env.ELASTIC_USERNAME && process.env.ELASTIC_PASSWORD) {
  config.auth = {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  }
}
// Local Docker deploys require a TLS certificate
if (process.env.ELASTIC_CERT_PATH) {
  config.tls = {
    ca: fs.readFileSync(process.env.ELASTIC_CERT_PATH),
    rejectUnauthorized: false,
  }
}
const clientArgs: ElasticClientArgs = {
  client: new Client(config),
  // indexName: process.env.ELASTIC_INDEX ?? 'test_vectorstore_test',
  indexName: 'test_vectorstore_test',
}

export const getElasticVectorStore = async (inputType: 'document' | 'query') => {
  const embeddings = getEmbedding(inputType)
  const vectorStore = new ElasticVectorSearch(embeddings, clientArgs)

  return vectorStore
}
