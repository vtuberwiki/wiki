export const prerender = true;
import { getCollection } from "astro:content";
const changelogCollection = await getCollection("changelog");
import { fDate, fTime } from "developer-toolkit-utils";



export async function GET() {
  try {
    return {
      body: JSON.stringify({
        status: 200,
        data: changelogCollection.map((changelog) => ({
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
        })),
      }),
    }
  } catch (error) {
    return {
      body: JSON.stringify({ status: 500, data: (error as Error).message }),
    };
  }
}