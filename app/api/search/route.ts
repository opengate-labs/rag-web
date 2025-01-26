import { NextResponse } from 'next/server'
import { getSelfQueryRetriever } from '@/app/ai/self-query-retriever'
import { Serialized } from '@langchain/core/load/serializable'

export async function POST(request: Request) {
  try {
    const { query } = await request.json()

    const selfQueryRetriever = await getSelfQueryRetriever()

    const results = await selfQueryRetriever.invoke(
      `
      before using the user input, please consider the following:
      - if the user input is in armenian (it can be written with english letters), please translate it to english
      user input: """ ${query} """`,
      {
        callbacks: [
          {
            handleLLMStart: (llm: Serialized) => {
              console.log('----- LLM STARTED: ', llm)
            },
          },
          {
            handleRetrieverStart: (retriever: Serialized) => {
              console.log('----- RETRIEVER STARTED: ', retriever)
            },
          },
          {
            handleRetrieverError: (retriever: Serialized) => {
              console.log('----- RETRIEVER ERROR: ', retriever)
            },
          },
          {
            handleRetrieverEnd: (documents, runId, parentRunId, tags) => {
              console.log('----- RETRIEVER END: ', documents, runId, parentRunId, tags)
            },
          },
        ],
      },
    )

    return NextResponse.json({
      results: results.map((result) => ({
        id: result.id,
        title: result.metadata.title,
        description: result.metadata.description,
        location: result.metadata.locationCity,
        price: result.metadata.pricePerMonth,
        similarity: 0,
      })),
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
