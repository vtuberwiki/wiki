export const prerender = true;
import { getCollection } from "astro:content";



export async function GET() {
  try {
      const data = (await getCollection("software")).map((_) => ({
        label: _.data.title,
        value: `/wiki/software/${_.slug}`,
        description: _.data.description,
        author: _.data.author,
        image: _.data.image,
        body: _.body,
      }))

    return new Response(
    JSON.stringify(data), {
        status: 200,
        headers: {
        "Content-Type": "application/json"
        }
    }
    )
  } catch (error) {
    return {
      body: JSON.stringify({ status: 500, data: (error as Error).message }),
    };
  }
}
