export const prerender = true;
import { getCollection } from "astro:content";



export async function GET() {
  try {
    const data = (await getCollection("partners")).map((_) => ({
        name: _.data.name,
        link: _.data.url,
        description: _.data.description,
        image: `/static/images/partners/${_.data.image}`,
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
