import * as readline from "readline/promises";
import { stdin, stdout } from "process";

const rl = readline.createInterface({ input: stdin, output: stdout });

type InputType =
  | "url"
  | "hex"
  | "string"
  | "int"
  | "array"
  | "obj"
  | "boolean"
  | "yesno";

async function askQuestion(
  questionText: string,
  type: InputType
): Promise<any> {
  let userInput;
  do {
    userInput = await rl.question(`${questionText}\n\n> `);
    userInput = userInput.trim(); // Trim leading and trailing spaces
    if (!(await validateInput(userInput, type))) {
      console.log(`Invalid input. Please enter a valid ${type}.`);
    }
  } while (!(await validateInput(userInput, type)));
  return userInput;
}

async function validateInput(input: string, type: InputType): Promise<boolean> {
  switch (type) {
    case "url":
      try {
        const url = new URL(input);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch (error) {
        return false;
      }
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
    case "boolean":
      return input.toLowerCase() === "true" || input.toLowerCase() === "false";
    case "yesno":
      return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
    default:
      throw new TypeError("Invalid type");
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

async function closeRL() {
  await rl.close();
}

async function createLoadingBar(): Promise<NodeJS.Timeout> {
  let i = 0;
  const frames = ["-", "\\", "|", "/"]; // Animation frames
  const interval = setInterval(() => {
    process.stdout.clearLine(0); // Clear the current line
    process.stdout.cursorTo(0); // Move cursor to beginning of line
    process.stdout.write("Loading " + frames[i] + " ");
    i = (i + 1) % frames.length;
  }, 100); // Adjust the interval for smoother animation
  return interval;
}

async function destoryLoadingBar(interval: NodeJS.Timeout) {
  clearInterval(interval);
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
}

function processLinks(links: string): string[] {
  let o: string[] = [];

  if (links === "") return o;

  o = links.split(",").map((link) => link.trim());

  o.map((link) => {
    if (link.startsWith("http://")) {
      link = link.replace("http://", "https://");
    }

    // Remove any subdomains
    const url = new URL(link);

    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.replace("www.", "");
    }

    o.push(url.toString());
  });

  return o;
}



export {
  askQuestion,
  slugify,
  closeRL,
  createLoadingBar,
  processLinks,
  destoryLoadingBar,
};
