import fs from "fs";
import path from "path";
import {
  checkGitInstallation,
  createPush,
  PushStatus,
  createCommit,
  status,
  getCurrentBranch,
  isUpToDate,
} from "./helpers/git";
import { exec } from "child_process";
import {
  askQuestion,
  slugify,
  closeRL,
  createLoadingBar,
  destoryLoadingBar,
} from "./helpers/cmd";
import chalk from "chalk";

const options = [
  {
    name: "add",
    description: "Add file contents to the git index",
  },
  {
    name: "commit",
    description: "Record changes to the repository",
  },
  {
    name: "push",
    description: "Update remote refs along with associated objects",
  },
  {
    name: "pull",
    description:
      "Fetch from and integrate with another repository or a local branch",
  },
  {
    name: "status",
    description: "Show the working tree status",
  },
  {
    name: "log",
    description: "Show commit logs",
  },
  {
    name: "restore",
    description: "Restore working tree files",
  },
];

async function main() {
  const gitUser = await checkGitInstallation();

  console.log(`Welcome to the Custom GIT CLI tool.`);
  console.log(`Logged in as ${gitUser}`);

  let option = "";

  const optionTypes = options.map((option) => option.name);

  console.log(
    `Available options:\n${optionTypes
      .map((option) => `    - ${chalk.green(option)}`)
      .join("\n")}\n`
  );

  option = await askQuestion(`What would you like to do?`, "string");

  if (!optionTypes.includes(option)) {
    console.log(
      `Invalid option. Please select one of the following options: ${optionTypes.join(
        ", "
      )}`
    );
    closeRL();
    return;
  }

  const optionLowerCase = option.toLowerCase();

  switch (optionLowerCase) {
    case "add":
      const files = await askQuestion(
        `Enter the files you would like to add (separated by a space or add a period to add all files):`,
        "string"
      );
      exec(`git add ${files}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        const out = stdout ? stdout : stderr;

        console.log(out + "\n");
        process.exit(0);
      });
      break;
    case "push":
      const branch = "origin";
      let message;
      let desc = [];
      let descInput = "";

      console.log(
        `Available options:
        - ${chalk.green(
          "chore"
        )}: Changes to the build process or auxiliary tools and libraries such as documentation generation
        - ${chalk.green("docs")}: Documentation only changes
        - ${chalk.green("feat")}: A new feature
        - ${chalk.green("fix")}: A bug fix
        - ${chalk.green(
          "refactor"
        )}: A code change that neither fixes a bug nor adds a feature
        - ${chalk.green(
          "style"
        )}: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
        - ${chalk.green(
          "test"
        )}: Adding missing tests or correcting existing tests
        `
      );

      const type = await askQuestion(`Enter the type of push:`, "string");
      message = await askQuestion(
        `Enter the item changed (Example: Vtubers):`,
        "string"
      );
      descInput = await askQuestion(
        `Enter the description (For New Lines add a \\n):`,
        "string"
      );

      desc = descInput.split("\\n");

      for (let i = 0; i < desc.length - 1; i++) {
        if (desc[i] === "" && desc[i + 1] === "") {
          desc.splice(i, 1);
          i--;
        }
      }

      desc = desc.filter((desc) => desc !== "");

      const autoAdd = await askQuestion(
        `Would you like to add all files? (yes/no)`,
        "yesno"
      );

      await createPush(type as PushStatus, message, desc, autoAdd === "yes");
      process.exit(0);
      break;
    case "status":
      const stdout = await status();
      if (!stdout) {
        console.log(`No changes to be committed`);
        return;
      }
      const branch_STATUS = await getCurrentBranch();
      const upToDate_STATUS = await isUpToDate();
      console.log(`On branch ${branch_STATUS}`);
      console.log(
        `\n${
          upToDate_STATUS
            ? chalk.green("Up to date")
            : chalk.red("Not up to date")
        } with remote (https://github.com/vtuberwiki/wiki)\n`
      );
      if (stdout.changes && stdout.changes.length > 0) {
        console.log(`Changes to be committed:`);
        console.log(` (Use "add <file>..." to update what will be committed)`);
        console.log(
          ` (Use "restore <file>..." to discard changes in working directory)\n`
        );
        stdout.changes.forEach((change) => {
          if (change) {
            console.log(`\t${change.status} ${change.file}`);
          }
        });
      } else {
        console.log(`No changes to be committed`);
      }

      if (stdout.untracked && stdout.untracked.length > 0) {
        console.log(`Untracked files:`);
        console.log(
          ` (Use "add <file>..." to include in what will be committed)\n`
        );
        stdout.untracked.forEach((untracked: any) => {
          console.log(`\t${untracked}`);
        });
      } else {
        console.log(`No untracked files`);
      }
      process.exit(0);
      break;
    case "commit":
      const branch_ = "origin";
      let message_ = "";
      let desc_: any[] = [];
      let descInput_ = "";

      console.log(
        `Available options:
        - ${chalk.green(
          "chore"
        )}: Changes to the build process or auxiliary tools and libraries such as documentation generation
        - ${chalk.green("docs")}: Documentation only changes
        - ${chalk.green("feat")}: A new feature
        - ${chalk.green("fix")}: A bug fix
        - ${chalk.green(
          "refactor"
        )}: A code change that neither fixes a bug nor adds a feature
        - ${chalk.green(
          "style"
        )}: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
        - ${chalk.green(
          "test"
        )}: Adding missing tests or correcting existing tests
        `
      );

      const type_ = await askQuestion(`Enter the type of push:`, "string");
      message_ = await askQuestion(
        `Enter the item changed (Example: Vtubers):`,
        "string"
      );
      descInput_ = await askQuestion(
        `Enter the description (For New Lines add a \\n):`,
        "string"
      );

      desc_ = descInput_.split("\\n");

      for (let i = 0; i < desc_.length - 1; i++) {
        if (desc_[i] === "" && desc_[i + 1] === "") {
          desc_.splice(i, 1);
          i--;
        }
      }

      desc_ = desc_.filter((desc) => desc !== "");

      await createCommit(type_ as PushStatus, message_, desc_);
      process.exit(0);
      break;
    case "pull":
      exec(`git pull`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        const out = stdout ? stdout : stderr;

        console.log(out);
        process.exit(0);
      });
      break;
    case "log":
      exec(`git log`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        const out = stdout ? stdout : stderr;

        console.log(out);
      });
      break;
    case "restore":
      const files_ = await askQuestion(
        `Enter the files you would like to restore (separated by a space or add a period to restore all files):`,
        "string"
      );
      exec(`git restore ${files_}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        const out = stdout ? stdout : stderr;

        console.log(out);
        process.exit(0);
      });
      break;
    default:
      console.log(
        `Invalid option. Please select one of the following options: ${optionTypes.join(
          ", "
        )}`
      );
      process.exit(0);
  }
}

main();