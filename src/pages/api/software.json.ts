export const prerender = true;
import { getCollection } from "astro:content";



export async function GET() {
  try {
    return {
      body: JSON.stringify({ status: 200, data: (await getCollection("software")).map((_) => ({
        label: _.data.title,
        value: `/wiki/software/${_.slug}`,
        description: _.data.description,
        author: _.data.author,
        image: _.data.image,
        body: _.body,
      }))}),
    };
  } catch (error) {
    return {
      body: JSON.stringify({ status: 500, data: (error as Error).message }),
    };
  }
}