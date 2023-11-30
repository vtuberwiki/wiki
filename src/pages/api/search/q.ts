export const prerender = true;
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

interface Vtuber {
  name: string;
  link: string;
  description: string;
  image: string;
  border_color: string | undefined;
  category: string;
  date: Date;
  links: string[];
}

interface Guide {
  name: string;
  description: string;
  date: Date;
  link: string;
}

interface Partner {
  name: string;
  link: string;
  description: string;
  image: string;
  date: Date;
}

interface Software {
  name: string;
  link: string;
  description: string;
  image: string;
  date: Date;
}

interface Data {
  vtubers: Vtuber[];
  guides: Guide[];
  partners: Partner[];
  software: Software[];
}

const getData = async () => {
  const vtubers = await getCollection("vtubers");
  const guides = await getCollection("guides");
  const partners = await getCollection("partners");
  const software = await getCollection("software");

  const data: Data = {
    vtubers: vtubers.map((vtuber) => ({
      name: vtuber.data.name,
      link: `https://vtubers.wiki/wiki/vtubers/${vtuber.slug}`,
      description: vtuber.data.description,
      image: `${vtuber.data.image}`,
      border_color: vtuber.data.border_color,
      category: vtuber.data.category,
      date: vtuber.data.pubDate,
      links: vtuber.data.links,
    })),
    guides: guides.map((guide) => ({
      name: guide.data.title,
      description: guide.data.description,
      link: `https://vtubers.wiki/wiki/guides/${guide.slug}`,
      date: guide.data.pubDate,
    })),
    partners: partners.map((partner) => ({
      name: partner.data.name,
      link: partner.data.url,
      description: partner.data.description,
      image: `/images/partners/${partner.data.image}`,
      date: partner.data.pubDate,
    })),
    software: software.map((software) => ({
      name: software.data.title,
      link: `https://vtubers.wiki/wiki/software/${software.slug}`,
      description: software.data.description,
      image: software.data.main_image,
      date: software.data.pubDate,
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
