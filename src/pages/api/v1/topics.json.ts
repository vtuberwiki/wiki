export const prerender = true;
import { getCollection } from "astro:content";



export async function GET() {
  try {      
    const data = (await getCollection("topics")).map((_) => ({
        slug: _.slug,
        title: _.data.title,
        description: _.data.description,
        pubDate: _.data.pubDate,
      }));

    return new Response(
      JSON.stringify(data), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    return {
      body: JSON.stringify({ status: 500, data: (error as Error).message }),
    };
  }
}
