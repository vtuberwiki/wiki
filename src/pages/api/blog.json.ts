export const prerender = true;
import { getCollection } from "astro:content";



export async function GET() {
  try {
    return {
      body: JSON.stringify({ status: 200, data: (await getCollection("posts")).map((_) => ({
        slug: _.slug,
        title: _.data.title,
        description: _.data.description,
        author: _.data.author,
      }))}),
    };
  } catch (error) {
    return {
      body: JSON.stringify({ status: 500, data: (error as Error).message }),
    };
  }
}