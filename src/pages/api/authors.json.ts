export const prerender = true;
import { getCollection } from "astro:content";



export async function GET() {
  try {
    return {
      body: JSON.stringify({ status: 200, data: (await getCollection("authors")).map((_) => ({
        login: _.data.login,
        avatar_url: _.data.avatar_url,
        html_url: _.data.html_url,
      }))}),
    };
  } catch (error) {
    return {
      body: JSON.stringify({ status: 500, data: (error as Error).message }),
    };
  }
}