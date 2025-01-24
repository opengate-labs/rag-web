export class VoyageEmbedding {
  static async getEmbedding(text: string): Promise<unknown> {
    const apiKey = process.env.VOYAGE_API_KEY;
    const response = await fetch('https://api.voyageai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'voyage-3-large',
        input: text,
      }),
    });

    if (!response.ok) {
      console.error(response);
      
      throw new Error('Failed to get embedding from Voyage AI');
    }

    const data = await response.json();
    return data.data[0].embedding;
  }
} 