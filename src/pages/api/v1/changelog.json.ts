export const prerender = true;
import { getCollection } from "astro:content";
const changelogCollection = await getCollection("changelog");
import { fDate, fTime } from "developer-toolkit-utils";



export async function GET() {
  try {
    const data = changelogCollection.map((changelog) => ({
          name: changelog.data.name,
          code_name: changelog.data.code_name,
          date: fDate(new Date(changelog.data.date)),
          added: changelog.data.added || [],
          changed: changelog.data.changed || [],
      deprecated: changelog.data.deprecated || [],
          fixed: changelog.data.fixed || [],
          removed: changelog.data.removed || [],
          security: changelog.data.security || [],
          unreleased: changelog.data.unreleased || [],
          body: changelog.body,
          slug: changelog.slug,
          id: changelog.id
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
