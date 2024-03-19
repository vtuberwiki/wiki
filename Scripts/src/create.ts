import fs from "fs";
import path from "path";
import * as readline from "readline/promises";
import { stdin, stdout } from "process";
import axios from "axios";
import { promisify } from "util";
import url from "url";
import Editors from "./helpers/editors";
import { checkGitInstallation } from "./helpers/git";


const rl = readline.createInterface({ input: stdin, output: stdout });

const config = {
  name: "n/a",
  description: "n/a",
  avatarUrl:
    "https://via.placeholder.com/512x512.png?text=Avatar+Image+Placeholder",
  bannerUrl:
    "https://via.placeholder.com/1920x1080.png?text=Banner+Image+Placeholder",
  borderColor: "#000000",
  author: "n/a",
  links: [],
  slug: "default",
  graduated: false,
  is_draft: true,
};

async function checkIfImageExists(url: string): Promise<boolean> {
  try {
    const response = await axios.get(url);
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

const paths = {
  vtuberMarkdown: path.resolve(
    __dirname,
    "..",
    "..",
    "src",
    "content",
    "vtubers"
  ),
  vtuberStatic: path.resolve(
    __dirname,
    "..",
    "..",
    "public",
    "static",
    "vtubers"
  ),
};

async function validateInput(input: string, type: any): Promise<boolean> {
  switch (type) {
    case "url":
      const hostname = new URL(input).hostname;
      const firstLayer =
        input.startsWith("http://") || input.startsWith("https://");
      return firstLayer;
      break;
    case "hex":
      return /^#[0-9A-F]{6}$/i.test(input);
    case "string":
      return typeof input === "string";
    case "int":
      return Number.isInteger(Number(input));
    case "array":
      return Array.isArray(input);
    case "obj":
      return (
        typeof input === "object" && input !== null && !Array.isArray(input)
      );
    default:
      throw new TypeError("Invalid type");
  }
}

async function validateLinks(links: string[]): Promise<boolean> {
  for (let link of links) {
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      return false;
    }
  }
  return true;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

async function askQuestion(questionText: string, type: string): Promise<any> {
  let userInput;
  do {
    userInput = await rl.question(questionText);
    userInput = userInput.trim(); // Trim leading and trailing spaces
    if (!(await validateInput(userInput, type))) {
      console.log(`Invalid input. Please enter a valid ${type}.`);
    }
  } while (!(await validateInput(userInput, type)));
  return userInput;
}

async function isEditorInstalled(editorCommand: string) {
  const { exec } = require("child_process");
  return new Promise((resolve, reject) => {
    const command =
      process.platform === "win32"
        ? `where ${editorCommand}`
        : `which ${editorCommand}`;
    exec(command, (error: any, stdout: any, stderr: any) => {
      if (error || stderr) {
        resolve(false); // Editor is not installed
      } else {
        resolve(true); // Editor is installed
      }
    });
  });
}

async function downloadImage(url: string, dest: string) {
  try {
    const writer = fs.createWriteStream(dest);
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error;
  }
}

const createvt = async () => {
  let author = await checkGitInstallation();

  

  console.log("Welcome to the createvt CLI tool.");
  console.log("This tool will help you create a new vtuber entry.");
  console.log("Please answer the following questions to get started.");


  config.name = await askQuestion("Name: ", "string");
  config.description = await askQuestion("Description: ", "string");
  config.avatarUrl = await askQuestion("Avatar Url: ", "url");
  config.bannerUrl = await askQuestion("Banner Url: ", "url");
  config.borderColor = await askQuestion("Border Color: ", "hex");
  let links = await askQuestion("Links (comma separated): ", "string");
  config.links = links.split(",").map((link: string) => link.trim());
  let graduated = await askQuestion("Graduated? (Y/N): ", "string");
  config.slug = slugify(config.name);
  config.author = author as string;

  if (graduated.toLowerCase() === "y") {
    config.graduated = true;
  } else {
    config.graduated = false;
  }

  console.clear();
  console.log(`Does this look correct?`);
  console.log("");
  console.log(`Vtuber ${config.name} with description ${config.description}`);
  console.log("");
  console.log(`With avatar ${config.avatarUrl} and banner ${config.bannerUrl}`);
  console.log("");
  console.log(
    `With border color ${config.borderColor} and links ${config.links}?`
  );
  console.log("");

  let confirmation = await askQuestion("Y/N: ", "string");

  if (confirmation.toLowerCase() !== "y") {
    console.log("Exiting...");
    process.exit(0);
  }

  console.clear();

  console.log(`Creating BASE entry for ${config.name}...`);


  const $links = config.links.map((link: string) => {
    if (link.startsWith("http://")) {
        link = link.replace("http://", "https://");
    }

    // Remove the subdomain from the url
    const parsedUrl = new URL(link);
    parsedUrl.hostname = parsedUrl.hostname.replace(/^www\./, '');
    return parsedUrl.toString();
});


  const vtuberMarkdownPath = path.resolve(
    paths.vtuberMarkdown,
    `${config.slug}.md`
  );
  const vtuberStaticPath = path.resolve(paths.vtuberStatic, config.slug);

  fs.mkdirSync(vtuberStaticPath);
  await downloadImage(
    config.avatarUrl,
    path.resolve(vtuberStaticPath, "photo.jpg")
  );
  await downloadImage(
    config.bannerUrl,
    path.resolve(vtuberStaticPath, "banner.jpg")
  );

  fs.writeFileSync(
    vtuberMarkdownPath,
    `---
name: ${config.name}
pubDate: ${new Date().toISOString()}
banner: "/static/vtubers/${config.slug}/banner.jpg"
category: Unknown
description: "${config.description}"
author: ${config.author}
image: "/static/vtubers/${config.slug}/photo.jpg"
border_color: "${config.borderColor}"
graduated: ${config.graduated}
is_draft: ${config.is_draft}
links: ${$links
      .map(
        (link) => `
  - "${link}"
`
      )
      .join("\n")}
---
    `
  );

  console.log(`Entry created!`);

  console.log(`Please choose an editor to open the file with:`);
  let num = 0; // Start from 0
  for (let [key, value] of Object.entries(Editors)) {
    const installed = await isEditorInstalled(value.split(" ")[0]);
    if (installed) {
      console.log(`${num}. ${key}`);
      num++;
    }
  }

  if (num === 0) {
    console.log("No editors installed. Exiting...");
    process.exit(0);
  }

  let editorChoice = await askQuestion("Choice: ", "int");
  editorChoice = Number(editorChoice); // Convert user input to a number

  // Check if the choice is within the valid range
  if (editorChoice < 0 || editorChoice >= Object.keys(Editors).length) {
    console.log("Invalid choice. Exiting...");
    process.exit(0);
  }

  let selectedEditor;
  let count = 0;
  for (let [key, value] of Object.entries(Editors)) {
    const installed = await isEditorInstalled(value.split(" ")[0]);
    if (installed) {
      if (count === editorChoice) {
        selectedEditor = key;
        break;
      }
      count++;
    }
  }

  console.log(`Opening file with ${selectedEditor}...`);

  const editorCommand = Editors[selectedEditor as keyof typeof Editors];
  const editorPath = vtuberMarkdownPath;
  const editorArgs = [editorPath];

  const { exec } = require("child_process");

  exec(
    `${editorCommand} ${editorArgs.join(" ")}`,
    (err: any, stdout: any, stderr: any) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );

  console.log(
    `If the file did not open, please open the file manually: ${vtuberMarkdownPath}`
  );

  console.log(
    `To lean more about formatting, please visit: https://vtubers.wiki/wiki/guides/using-createcli`
  );

  rl.close();
  process.exit(0);
};


createvt();
