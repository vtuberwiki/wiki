export const prerender = true;
import { getCollection } from "astro:content";



export async function GET() {
  try {
    return {
      body: JSON.stringify({ status: 200, data: (await getCollection("partners")).map((_) => ({
        name: _.data.name,
        link: _.data.url,
        description: _.data.description,
        image: `/static/images/partners/${_.data.image}`,
      }))}),
    };
  } catch (error) {
    return {
      body: JSON.stringify({ status: 500, data: (error as Error).message }),
    };
  }
}