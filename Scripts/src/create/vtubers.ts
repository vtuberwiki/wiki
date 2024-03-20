import {
  askQuestion,
  createLoadingBar,
  slugify,
  processLinks,
} from "../helpers/cmd";
import path from "path";
import fs from "fs";
import axios from "axios";
import { Editors, isEditorInstalled } from "../helpers/editors";
import ICreate from "../interfaces/ICreate";
import { exec } from "child_process";

async function checkIfImageExists(url: string): Promise<boolean> {
  try {
    const response = await axios.get(url);
    return response.status === 200;
  } catch (error) {
    return false;
  }
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

const paths = {
  vtuberMarkdown: path.resolve(
    __dirname,
    "..",
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
    "..",
    "public",
    "static",
    "vtubers"
  ),
};

interface VtuberConfig {
  name: string;
  description: string;
  slug: string;
  author: string;
  borderColor: string;
  graduated: boolean;
  is_draft: boolean;
  links: string[];
  banner: string;
  avatar: string;
}

const config: VtuberConfig = {
  name: "",
  description: "",
  slug: "",
  author: "",
  borderColor: "",
  graduated: false,
  is_draft: true,
  links: [],
  banner: "",
  avatar: "",
};

const createData = () => {
  return `---
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
    links: ${config.links
      .map(
        (link) => `
      - "${link}"
    `
      )
      .join("\n")}
    ---

    # ${config.name}

    [@YamiDeveloper](https://x.com/YamiDeveloper) wants [@CottontailVA](https://x.com/CottontailVA) to dominate her and step on her while Yami calls her mommy :3
    `;
};

export async function create(c: ICreate) {
  console.log(c);
  config.name = await askQuestion("What is the name of the vtuber?", "string");
  config.slug = slugify(config.name);
  config.description = await askQuestion(
    "What is the description of the vtuber?",
    "string"
  );
  config.author = c.author;
  config.borderColor = await askQuestion(
    "What is the border color of the vtuber?",
    "hex"
  );
  config.graduated = await askQuestion(
    "Has the vtuber graduated? (yes/no)",
    "yesno"
  );

  const links: string[] = [];

  let rawLinks = await askQuestion(
    "What are the links of the vtuber? (comma separated)",
    "string"
  );

  links.push(...processLinks(rawLinks));

  config.links = links;

  config.banner = await askQuestion(
    "What is the banner URL of the vtuber?",
    "string"
  );

  config.avatar = await askQuestion(
    "What is the avatar URL of the vtuber?",
    "string"
  );

  const vtuberMarkdown = path.resolve(
    paths.vtuberMarkdown,
    `${config.slug}.md`
  );

  const vtuberStatic = path.resolve(paths.vtuberStatic, config.slug);

  if (!fs.existsSync(vtuberStatic)) {
    fs.mkdirSync(vtuberStatic);
  }

  if (await checkIfImageExists(config.banner)) {
    await downloadImage(
      config.banner,
      path.resolve(vtuberStatic, "banner.jpg")
    );
  } else {
    console.error("Banner image does not exist.");
  }

  if (await checkIfImageExists(config.avatar)) {
    await downloadImage(config.avatar, path.resolve(vtuberStatic, "photo.jpg"));
  } else {
    console.error("Avatar image does not exist.");
  }

  const data = createData();

  fs.writeFileSync(vtuberMarkdown, data);

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
  const editorPath = vtuberMarkdown;
  const editorArgs = [editorPath];

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
    `If the file did not open, please open the file manually: ${vtuberMarkdown}`
  );

  console.log(
    `To lean more about formatting, please visit: https://vtubers.wiki/wiki/guides/using-createcli`
  );
}
