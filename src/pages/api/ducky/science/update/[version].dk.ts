import { getCollection } from "astro:content";
import axios from "axios";

const RELEASE_URL = "https://api.github.com/repos/vtuberwiki/ducky/releases";

export async function getStaticPaths() {
  try {
    const response = await axios.get(RELEASE_URL);
    const releases = response.data;

    return releases.map((release: any) => ({
      params: {
        version: release.tag_name,
      },
    }));
  } catch (error) {
    console.error("Error fetching release data:", error);
    return [];
  }
}

//@ts-ignore
export async function GET({ params }) {
  if (!params.version) {
    return new Response(
      JSON.stringify({ status: 400, data: "Missing version" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const response = await axios.get(RELEASE_URL);
    const releases = response.data;

    const release = releases.find((r: any) => r.tag_name === params.version);

    if (!release) {
      return new Response(
        JSON.stringify({ status: 404, data: "Release not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const filesUrl = `https://api.github.com/repos/vtuberwiki/ducky/releases/${release.id}/assets`;
    const filesResponse = await axios.get(filesUrl);
    const downloadUrl = filesResponse.data[0].browser_download_url;

    return new Response(
      JSON.stringify({ status: 200, data: downloadUrl }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching release data:", error);
    return new Response(
      JSON.stringify({ status: 500, data: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
