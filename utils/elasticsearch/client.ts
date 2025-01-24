import { Client } from "@elastic/elasticsearch";

export const client = new Client({
  node: process.env.ELASTICSEARCH_URL,
  auth: {
    apiKey: process.env.ELASTICSEARCH_API_KEY!
  }
});

export const APARTMENTS_INDEX = "apartments-search";