export const prerender = true;
import { getCollection } from "astro:content";



export async function GET() {
  try {
    const data = (await getCollection("authors")).map((_) => ({
        login: _.data.login,
        avatar_url: _.data.avatar_url,
        html_url: _.data.html_url,
      }))

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
