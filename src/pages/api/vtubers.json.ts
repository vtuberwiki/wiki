export const prerender = true;
import { getCollection } from "astro:content";



export async function GET() {
  try {
    return {
      body: JSON.stringify({ status: 200, data: (await getCollection("vtubers")).map((vtuber) => ({
        name: vtuber.data.name,
        link: `/wiki/vtubers/${vtuber.slug}`,
        description: vtuber.data.description,
        author: vtuber.data.author,
        image: vtuber.data.image,
        banner: vtuber.data.banner,
        category: vtuber.data.category,
        links: vtuber.data.links,
        graduated: vtuber.data.graduated ? "Yes" : "No",
        is_draft: vtuber.data.is_draft ? "Yes" : "No",
        border_color: vtuber.data.border_color,
        body: vtuber.body,
      }))}),
    };
  } catch (error) {
    return {
      body: JSON.stringify({ status: 500, data: (error as Error).message }),
    };
  }
}