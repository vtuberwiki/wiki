
import { z, defineCollection } from "astro:content";


const vtuberCollection = defineCollection({
    type: 'content',
    schema: z.object({
      name: z.string(),
      pubDate: z.date(),
      banner: z.string(),
      category: z.string(),
      description: z.string(),
      author: z.string(),
      image: z.string(),
      links: z.array(z.string()),
      graduated: z.boolean().optional(),
    })
});

const guideCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
  })
});

const faqCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  })
})

const softwareCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.string(),
  })
})


export const collections = {
  vtubers: vtuberCollection,
  guides: guideCollection,
  faq: faqCollection,
 software: softwareCollection
};