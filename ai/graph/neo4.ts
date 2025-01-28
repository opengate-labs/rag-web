import { Neo4jGraph } from '@langchain/community/graphs/neo4j_graph'
import { ChatOpenAI } from '@langchain/openai'
// import { GraphCypherQAChain } from '@langchain/community/chains/graph_qa/cypher'

/**
 * This example uses Neo4j database, which is native graph database.
 * To set it up follow the instructions on https://neo4j.com/docs/operations-manual/current/installation/.
 */

export const getNeo4jGraph = async () => {
  const url = process.env.NEO4J_URL || 'bolt://localhost:7687'
  const username = process.env.NEO4J_USERNAME || 'neo4j'
  const password = process.env.NEO4J_PASSWORD || 'pleaseletmein'

  const graph = await Neo4jGraph.initialize({ url, username, password, enhancedSchema: true })
  // const model = new ChatOpenAI({ temperature: 0, apiKey: process.env.OPENAI_API_KEY, modelName: 'gpt-4o' })
  const model = new ChatOpenAI({ temperature: 0, apiKey: process.env.OPENAI_API_KEY, modelName: 'gpt-4o' })

  return { graph, model }
}

// Populate the database with two nodes and a relationship

// await graph.query("CREATE (a:Actor {name:'Bruce Willis'})" + "-[:ACTED_IN]->(:Movie {title: 'Pulp Fiction'})")

// Refresh schema
// await graph.refreshSchema()

// const chain = GraphCypherQAChain.fromLLM({
//   llm: model,
//   graph,
// })

// const res = await chain.run('Who played in Pulp Fiction?')
// console.log(res)
// Bruce Willis played in Pulp Fiction.
