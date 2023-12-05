export const prerender = true;
import { getCollection } from "astro:content";



export async function GET() {
  try {
    return {
      body: JSON.stringify({ status: 200, data: (await getCollection("guides")).map((guide) => ({
        title: guide.data.title,
        description: guide.data.description,
        pubDate: guide.data.pubDate,
        author: guide.data.author,
        body: guide.body,
        slug: guide.slug
      }))}),
    };
  } catch (error) {
    return {
      body: JSON.stringify({ status: 500, data: (error as Error).message }),
    };
  }
}