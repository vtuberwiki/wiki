export const prerender = true;
import { getCollection } from "astro:content";



export async function GET() {
  try {
    const data = (await getCollection("guides")).map((guide) => ({
        title: guide.data.title,
        description: guide.data.description,
        pubDate: guide.data.pubDate,
        author: guide.data.author,
        body: guide.body,
        slug: guide.slug
      }))

    return new Response(
    JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    })
  } catch (error) {
    return {
      body: JSON.stringify({ status: 500, data: (error as Error).message }),
    };
  }
}
