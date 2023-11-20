---
title: Creating a VTuber Page
description: A Comprehensive Guide to Crafting a VTuber Profile
pubDate: 2023-10-24
author: withervt
---

When constructing a VTuber page for The Vtuber Wiki, it is imperative to furnish the following essential details:

- `name`: Name of the VTuber
- `pubDate`: Inauguration Date
- `banner`: Banner Image URL
- `category`: Content Category
- `description`: VTuber Description
- `author`: Author's Name or Username (Github)
- `image`: VTuber Avatar Image URL
- `links`: Array of Relevant Links
- `border_color`: The VTuber's Border Color (For profile cards)

## Standard Format Example

```markdown
---
name: "Your VTuber Name"
pubDate: 20XX-XX-XX
banner: "URL to Your Banner Image"
category: "Select Category"
description: "A concise description of your VTuber persona."
author: "Your Author Name or Username"
image: "URL to VTuber Avatar Image"
border_color: "Your VTuber's Border Color"
links: 
  - "URL to Discord Server"
  - "URL to Social Media Profile"
  - "URL to Streaming Platform"
```

## Providing Information

When compiling a VTuber page, it's essential to include a **comprehensive** amount of information about the VTuber. This practice greatly aids the community in discovering the VTuber or finding similar ones.

Information that **SHOULD NOT** be provided includes:

- Personal Information
- Private Details
- Contact Information
- Family Information

## Getting Started

To get started, follow these steps:

1. Fork the repository by clicking the "Fork" button at the top of the [GitHub repository](https://https://github.com/vtuberwiki/wiki).

2. Clone your forked repository to your local machine

```bash
  git clone https://github.com/your-username/wiki.git
  cd wiki
```

3. Create a new branch for your contributions:

```bash
  git checkout -b feature/your-feature-name
```

## Making Changes

1. Make the necessary code changes and improvements in your branch.

2. Commit your changes with a meaningful commit message:

```bash
  git commit -m "Add new feature: Your feature description"
```

3. Push your changes to your forked repository:

```bash
  git push origin feature/your-feature-name
```

4. Create a pull request (PR) by navigating to the original repository and clicking the "New Pull Request" button. Provide a clear title and description for your PR.

## Reporting Issues

If you encounter any issues or bugs in the wiki, please create an issue on the repository. Provide as much detail as possible, including the steps to reproduce the issue.


## Code of Conduct

We adhere to the [Code of Conduct](https://github.com/vtuberwiki/wiki/blob/main/CODE_OF_CONDUCT.md) for maintaining a respectful and welcoming environment for all contributors.