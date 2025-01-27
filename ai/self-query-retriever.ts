import { ChatOpenAI } from '@langchain/openai'
import { SelfQueryRetriever } from 'langchain/retrievers/self_query'
import type { AttributeInfo } from 'langchain/chains/query_constructor'
import { SupabaseTranslator } from '@langchain/community/structured_query/supabase'
import { getVectorStore } from '@/app/api/search/voyage'
import { Serialized } from '@langchain/core/load/serializable'

const attributeInfo: AttributeInfo[] = [
  {
    name: 'title',
    description: 'The title of the property listing',
    type: 'string',
  },
  {
    name: 'description',
    description: 'Detailed description of the property',
    type: 'string',
  },
  // {
  //   name: "apartmentType",
  //   description: "Type of property (house, apartment, studio, villa)",
  //   type: "string",
  // },
  {
    name: 'totalArea',
    description: 'Total area of the property in square meters',
    type: 'number',
  },
  {
    name: 'pricePerMonth',
    description:
      'Monthly rental price but if user asks for cheap or expensive use 500 USD as the average price per month',
    type: 'number',
  },
  {
    name: 'bedroomCount',
    description: 'Number of bedrooms',
    type: 'number',
  },
  {
    name: 'bathroomCount',
    description: 'Number of bathrooms',
    type: 'number',
  },
  {
    name: 'maxOccupancy',
    description: 'Maximum number of occupants allowed',
    type: 'number',
  },
  {
    name: 'locationAddress',
    description: 'Street address of the property',
    type: 'string',
  },
  {
    name: 'locationCity',
    description: 'City where the property is located',
    type: 'string',
  },
  {
    name: 'locationCoordinates.lat',
    description: 'Latitude coordinate of the property',
    type: 'number',
  },
  {
    name: 'locationCoordinates.lng',
    description: 'Longitude coordinate of the property',
    type: 'number',
  },
  {
    name: 'hasParking',
    description: 'Whether the property has parking available',
    type: 'boolean',
  },
  {
    name: 'hasYard',
    description: 'Whether the property has a yard',
    type: 'boolean',
  },
  {
    name: 'yardArea',
    description: 'Area of the yard in square meters',
    type: 'number',
  },
  // {
  //   name: 'features',
  //   description: 'List of property features and amenities',
  //   type: 'string[]',
  // },
]

export async function getSelfQueryRetriever() {
  const llm = new ChatOpenAI({
    // temperature: 0.5,
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4o',
    // verbose: true,
  })

  const vectorStore = await getVectorStore('query')

  return SelfQueryRetriever.fromLLM({
    llm: llm,
    vectorStore: vectorStore,
    documentContents: 'Detailed description of an apartment',
    attributeInfo: attributeInfo,
    structuredQueryTranslator: new SupabaseTranslator(),
    verbose: true,
  })
}
