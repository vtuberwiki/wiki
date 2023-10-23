
import { z, defineCollection } from "astro:content";


const vtuberCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    pubDate: z.date(),
    banner: z.string(),
    border_color: z.string().optional(),
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
    main_image: z.string(),
  })
});

const authorCollection = defineCollection({
  type: 'content',
  schema: z.object({
    login: z.string(),
    avatar_url: z.string(),
    html_url: z.string(),
  })
})

// const artistCollection = defineCollection({
//   type: 'content',
//   schema: z.object({
//     name: z.string(),
//     pubDate: z.date(),
//     description: z.string(),
//     author: z.string(),
//     image: z.string(),
//     links: z.array(z.string()),
//     priceRange: z.string(),
//     examples: z.array(z.string()),
//   })
// })


export const collections = {
  vtubers: vtuberCollection,
  guides: guideCollection,
  faq: faqCollection,
  software: softwareCollection,
  authors: authorCollection,
  // artists: artistCollection
};