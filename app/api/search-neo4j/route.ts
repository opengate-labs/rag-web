import { NextResponse } from 'next/server'
import { getNeo4jGraph } from '@/ai/graph/neo4'
import { GraphCypherQAChain } from '@langchain/community/chains/graph_qa/cypher'
import { PlaceNode } from '../seed-neo4j/utils'

export async function POST(request: Request) {
  try {
    const { query } = await request.json()

    const { graph, model } = await getNeo4jGraph()

    const schema = graph.getSchema()

    console.log('schema: ', schema)

    const graphChain = GraphCypherQAChain.fromLLM({
      llm: model,
      graph,
      returnDirect: true,
    })

    const results = await graphChain.invoke(
      {
        query: `
          before using the user input, please consider the following:
          - if the user input is in armenian (it can be written with english letters), please translate it to english
          - return the most relevant Place nodes based on the following query:
          user input: """ ${query} """
        `,
        schema,
      },
      {
        callbacks: [
          {
            handleChainStart(chain) {
              console.log('----chain start: ', chain)
            },
            handleChainEnd(chain) {
              console.log('----chain end: ', chain)
            },
          },
        ],
      },
    )

    console.log('----query: ', query)
    console.log('----results: ', results)

    return NextResponse.json({
      results: results.result.map(({ p: place }: { p: PlaceNode }) => {
        console.log('----place: ', place)

        // Object.keys(result).forEach((key) => {
        //   console.log('----key: ', key)
        //   console.log('----value: ', result[key])
        // })

        return {
          // id: result.id,
          title: place.title,
          description: place.description,
          location: place.locationAddress,
          price: place.pricePerMonth,
          similarity: 0,
        }
      }),
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
