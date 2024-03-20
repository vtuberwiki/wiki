import fs from "fs";
import path from "path";
import { checkGitInstallation } from "./helpers/git";
import { askQuestion, slugify, closeRL } from "./helpers/cmd";

const Creators = [
  {
    name: "Vtuber Entry",
    path: path.resolve(__dirname, "create", "vtubers.ts"),
  },
  // {
  //   name: "Vtuber Agency",
  //   path: path.resolve(__dirname, "create", "agencies.ts"),
  // },
  // {
  //   name: "Guide Entry",
  //   path: path.resolve(__dirname, "create", "guides.ts"),
  // },
  // {
  //   name: "Software Entry",
  //   path: path.resolve(__dirname, "create", "software.ts"),
  // }
];

async function main() {
  const gitUser = await checkGitInstallation();

  console.log("Welcome to the VtuberWiki Create CLI tool.");
  console.log(`Logged in as ${gitUser}`);

  let creatorType = "";

  const creatorTypes = Creators.map((creator) => creator.name);
  creatorType = await askQuestion(
    `What would you like to create? (${creatorTypes.join(", ")})`,
    "string"
  );

  const creator = Creators.find(
    (creator) => creator.name.toLowerCase() === creatorType.toLowerCase()
  );

  if (!creator) {
    console.error("Invalid creator type.");
    process.exit(1);
  }

  const creatorModule = await import(creator.path);
  await creatorModule.create({ author: gitUser });
  await closeRL();
}

main();
