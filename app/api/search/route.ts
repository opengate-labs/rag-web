import { NextResponse } from 'next/server';
import { client, APARTMENTS_INDEX } from '@/utils/elasticsearch/client';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    const response = await client.search({
      index: APARTMENTS_INDEX,
      body: {
        query: {
          semantic: {
            field: 'searchableText',
            query,
          },
          bool: {
            should: [
              {
                semantic: {
                  field: 'searchableText',
                  query,
                }, 
              },
              {semantic: {
                field: 'description',
                query,
              }}
            ]
          }
          
          // bool: {
          //   should: [
          //     {
          //       semantic_text: {
          //         description: {
          //           query: query,
          //           model_id: '.elser_model_1',
          //           boost: 1
          //         }
          //       }
          //     },
          //     {
          //       semantic_text: {
          //         searchableText: {
          //           query: query,
          //           model_id: '.elser_model_1',
          //           boost: 2  // Give more weight to the combined text
          //         }
          //       }
          //     }
          //   ]
          // }
        }
      }
    });

    console.log("response: ", response.hits);
    

    return NextResponse.json({
      results: response.hits.hits.map(hit => ({
        id: hit._id,
        title: hit._source.title,
        description: hit._source.description,
        location: hit._source.location_city,
        price: hit._source.price_per_month,
        similarity: hit._score
      }))
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}