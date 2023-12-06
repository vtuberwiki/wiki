
import { z, defineCollection } from "astro:content";


const vtuberCollection = defineCollection({
  type: "content",
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
    is_draft: z.boolean().optional(),
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


const changelogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    code_name: z.string(),
    date: z.date(),
    added: z.array(z.string()).optional(),
    changed: z.array(z.string()).optional(),
    deprecated: z.array(z.string()).optional(),
    fixed: z.array(z.string()).optional(),
    removed: z.array(z.string()).optional(),
    security: z.array(z.string()).optional(),
    unreleased: z.array(z.string()).optional(),
  })
});

const partnersCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    image: z.string(),
    url: z.string(),
    pubDate: z.date(),
    description: z.string(),
  })
})

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    author: z.string(),
  })
})

const topicsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
  })
});

const sdksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    pubDate: z.string(),
    description: z.string(),
    author: z.string(),
    icon: z.string(),
    github: z.string(),
  })
});

const api_collection = defineCollection({
  type: 'content',
  schema: z.object({
    version: z.number(),
    endpoints: z.array(z.string()),
    endpoint: z.string(),
  })
});

const agencyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    pubDate: z.date(),
    is_draft: z.boolean().optional(),
    description: z.string(),
    author: z.string(),
    links: z.array(z.object({
      name: z.string(),
      href: z.string(),
      icon: z.string().optional(),
    })),
  })
});

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
  changelog: changelogCollection,
  partners: partnersCollection,
  posts: postsCollection,
  topics: topicsCollection,
  sdks: sdksCollection,
  api_endpoints: api_collection,
  agencies: agencyCollection,
  // artists: artistCollection
};