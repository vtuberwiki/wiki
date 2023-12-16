export const prerender = true;
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

interface Vtuber {
  name: string;
  link: string;
  description: string;
  image: string;
  border_color: string | undefined;
  date: Date;
  links: string[];
  category: string;
}

interface Sdk {
  name: string;
  link: string;
  description: string;
  date: string;
  category: string;
}

interface Blog {
  name: string;
  link: string;
  description: string;
  date: string;
  category: string;
}

interface Guide {
  name: string;
  description: string;
  date: Date;
  link: string;
  category: string;
}

interface Topic {
  name: string;
  link: string;
  image: string;
  description: string;
  date: Date;
  category: string;
}

interface Software {
  name: string;
  link: string;
  description: string;
  image: string;
  category: string;
  date: Date;
}

interface Data {
  vtubers: Vtuber[];
  guides: Guide[];
  software: Software[];
  blogs: Blog[];
  topics: Topic[];
  sdks: Sdk[];
}

const getData = async () => {
  const vtubers = await getCollection("vtubers");
  const guides = await getCollection("guides");
  const partners = await getCollection("partners");
  const software = await getCollection("software");
  const blogs = await getCollection("posts");
  const topics = await getCollection("topics");
  const sdks = await getCollection("sdks");

  const data: Data = {
    vtubers: vtubers.map((vtuber) => ({
      name: vtuber.data.name,
      link: `https://vtubers.wiki/wiki/vtubers/${vtuber.slug}`,
      description: vtuber.data.description,
      image: `${vtuber.data.image}`,
      border_color: vtuber.data.border_color,
      date: vtuber.data.pubDate,
      links: vtuber.data.links,
      category: "Vtubers"
    })),
    guides: guides.map((guide) => ({
      name: guide.data.title,
      description: guide.data.description,
      link: `https://vtubers.wiki/wiki/guides/${guide.slug}`,
      date: guide.data.pubDate,
      category: "Guides"
    })),
    software: software.map((software) => ({
      name: software.data.title,
      link: `https://vtubers.wiki/wiki/software/${software.slug}`,
      description: software.data.description,
      image: software.data.main_image,
      date: software.data.pubDate,
      category: "Software"
    })),
    blogs: blogs.map((blog) => ({
      name: blog.data.title,
      link: `https://vtubers.wiki/blog/${blog.slug}`,
      description: blog.data.description,
      date: blog.data.pubDate as string,
      category: "Blog"
    })),
    topics: topics.map((topic) => ({
      name: topic.data.title,
      link: `https://vtubers.wiki/wiki/${topic.slug}`,
      image: `/static/icons/misc/topics/${topic.slug}.svg`,
      description: topic.data.description,
      date: topic.data.pubDate,
      category: "Topics"
    })),
    sdks: sdks.map((sdk) => ({
      name: sdk.data.name,
      link: `https://vtubers.wiki/sdk/${sdk.slug}`,
      description: sdk.data.description,
      date: sdk.data.pubDate,
      category: "SDKs"
    })),
  };

  return data;
};

function createLookupTable(dataKeys: string[]) {
  const lookupTable: Record<string, number> = {};

  dataKeys.forEach((key, index) => {
    lookupTable[key] = index;
  });

  return lookupTable;
}

export const GET: APIRoute = async () => {
  try {
    const data = await getData();
    const dataKeys = Object.keys(data);


    const dataWithTable = {
      ...data,
      lookupTable: createLookupTable(dataKeys)
    };

    return {
      body: JSON.stringify({ status: 200, data: dataWithTable }),
    };
  } catch (error) {
    return {
      body: JSON.stringify({ status: 500, error: (error as Error).message }),
    };
  }
};
