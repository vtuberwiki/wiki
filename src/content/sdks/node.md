---
name: Node.js SDK
pubDate: "2023-12-05T02:10:07.816Z"
description: "The VtuberWiki SDK is a JavaScript library that provides a convenient interface to access various information related to Vtubers, software, guides, authors, changelogs, partners, topics, and blogs from the VtuberWiki API."
author: "withervt"
icon: "/static/sdks/nodejs.png"
---

<div style="text-align: center;">

[![npm downloads](https://img.shields.io/npm/dt/vtuberwiki-sdk)](https://www.npmjs.com/package/vtuberwiki-sdk)
[![npm version](https://img.shields.io/github/package-json/v/vtuberwiki/node-sdk)](https://www.npmjs.com/package/vtuberwiki-sdk)

</div>


The VtuberWiki SDK is a JavaScript library that provides a convenient interface to access various information related to Vtubers, software, guides, authors, changelogs, partners, topics, and blogs from the VtuberWiki API.

## Installation

You can install the VtuberWiki SDK using npm:

```bash
npm install vtuberwiki-sdk
```

## Usage

### Getting Started

```typescript
// Import the SDK
import Sdk from "vtuberwiki-sdk";

// Create an instance of the SDK
const sdk = Sdk.getInstance();

// Example: Get information about Vtubers
const vtubers = await sdk.getVtubers({ limit: 5 });
console.log("Vtubers:", vtubers);

// Example: Get information about Software
const software = await sdk.getSoftware({ limit: 3 });
console.log("Software:", software);

// Example: Get information about Guides
const guides = await sdk.getGuides({ limit: 1 });
console.log("Guides:", guides);

// Example: Get information about Authors
const authors = await sdk.getAuthors({ limit: 16 });
console.log("Authors:", authors);

// Example: Get information about Changelogs
const changelogs = await sdk.getChangelogs({ limit: 2 });
console.log("Changelogs:", changelogs);

// Example: Get information about Partners
const partners = await sdk.getPartners({ limit: 5 });
console.log("Partners:", partners);

// Example: Get information about Topics
const topics = await sdk.getTopics({ limit: 4 });
console.log("Topics:", topics);

// Example: Get information about Blogs
const blogs = await sdk.getBlogs({ limit: 6 });
console.log("Blogs:", blogs);
```

### Available Methods

`getVtubers(params?: VtuberParams): Promise<Object | Array>`

Retrieve information about Vtubers.

`getSoftware(params?: SoftwareParams): Promise<Object | Array>`

Retrieve information about software.

`getGuides(params?: GuideParams): Promise<Object | Array>`

Retrieve information about guides.

`getAuthors(params?: AuthorParams): Promise<Object | Array>`

Retrieve information about authors.

`getBlogs(params?: BlogParams): Promise<Object | Array>`

Retrieve information about blogs.

`getChangeLogs(params?: ChangeLogParams): Promise<Object | Array>`

Retrieve information about changelogs.

`getPartners(params?: PartnerParams): Promise<Object | Array>`

Retrieve information about partners.

`getTopics(params?: TopicParams): Promise<Object | Array>`

Retrieve information about topics.

### Available Parameters

Each data retrieval method supports specific parameters. See the [Parameter Interfaces](https://github.com/vtuberwiki/node-sdk/blob/main/src/interfaces/config/methods.ts) section for detailed information.

### Tests

Check out the [tests](./tests/index.ts) directory for more detailed usage examples.

### License

This project is licensed under the GPL-3.0 License - see the [LICENSE](./LICENSE) file for details.
