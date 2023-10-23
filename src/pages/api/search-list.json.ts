export const prerender = true;
import { getCollection } from "astro:content";



export async function GET() {
    try {
        return {
            body: JSON.stringify({ status: 200, data: (await getCollection("vtubers")).map((vtuber) => ({
                label: `${vtuber.data.name}`,
                value: `/wiki/vtubers/${vtuber.slug}`,
              }))}),
        };
    } catch (error) {
        return {
            body: JSON.stringify({ status: 500, data: (error as Error).message }),
        };
    }
}