import { exec, execSync } from "child_process";
import axios from "axios";

export type PushStatus =
  | "feat"
  | "fix"
  | "refactor"
  | "docs"
  | "style"
  | "test"
  | "chore";

export function checkGitInstallation(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    exec("git --version", (error, stdout, stderr) => {
      if (error || stderr) {
        reject(
          new Error("Git is not installed. Please install Git and try again.")
        );
      } else {
        exec(
          "git config user.email",
          async (userError, userStdout, userStderr) => {
            if (userError || userStderr) {
              reject(new Error("Failed to retrieve Git email."));
            } else {
              const gitUserEmail = userStdout.trim();

              try {
                const { data } = await axios.get(
                  `https://api.github.com/search/users?q=${gitUserEmail}`,
                  {
                    headers: {
                      Accept: "application/vnd.github.v3+json",
                    },
                  }
                );
                const name = data.items[0].login;

                resolve(name);
              } catch (axiosError) {
                reject(new Error("Failed to fetch user data from GitHub API."));
              }
            }
          }
        );
      }
    });
  });
}

export function createPush(
  type: PushStatus,
  message: string,
  desc: string[],
  autoAdd: boolean
) {
  return new Promise<void>((resolve, reject) => {
    exec(
      `${
        autoAdd ? "git add . &&" : ""
      } git commit -m "${type}: ${message}" -m "${desc.join(
        "\n"
      )}" && git push origin main`,
      (error, stdout, stderr) => {
        if (error || stderr) {
          const errorMessage: string = (error || stderr || stdout) as string;
          if (errorMessage.includes("Bypassed rule violations")) {
            console.log("Warning: Bypassed rule violations occurred, but continuing...");
            resolve(); // Resolve without rejecting
          } else {
            reject(new Error(`Failed to push to GitHub: ${errorMessage}`));
          }
        } else {
          resolve();
        }
      }
    );
  });
}


export function createCommit(
  type: PushStatus,
  message: string,
  desc: string[]
) {
  return new Promise<void>((resolve, reject) => {
    exec(
      `git commit -m "${type}: ${message}" -m "${desc.join("\n")}"`,
      (error, stdout, stderr) => {
        if (error || stderr) {
          reject(
            new Error(
              `Failed to commit to GitHub: ${error || stderr || stdout}`
            )
          );
        } else {
          resolve();
        }
      }
    );
  });
}

export function status() {
  const oldwd = process.cwd();
  process.chdir("../");
  try {
    const stdout = execSync("git status").toString();
    const lines = stdout.split("\n");

    const changes = lines
      .filter((line) => line.startsWith("\tmodified:"))
      .map((line) => {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 2) {
          const status = parts[0];
          const file = parts.slice(1).join(" ");
          return { status, file };
        } else {
          console.error("Unexpected format for line:", line);
          return null;
        }
      })
      .filter((change) => change !== null);

    const untrackedIndex = lines.indexOf("Untracked files:");
    let untracked: any[] = [];
    if (untrackedIndex !== -1) {
      untracked = lines
        .slice(untrackedIndex + 1)
        .filter(
          (line) =>
            line.trim() !== "" &&
            !line.startsWith("  (use") &&
            line !==
              'no changes added to commit (use "git add" and/or "git commit -a")'
        )
        .map((line) => line.trim().replace("\t", ""));
    }

    process.chdir(oldwd);
    return { changes, untracked };
  } catch (error) {
    console.error(`exec error: ${error}`);
    return null;
  }
}

export function getCurrentBranch() {
  try {
    const stdout = execSync("git branch --show-current").toString();
    return stdout.trim();
  } catch (error) {
    console.error(`exec error: ${error}`);
    return null;
  }
}

export function isUpToDate() {
  try {
    const stdout = execSync("git status").toString();
    return stdout.includes("Your branch is up to date with");
  } catch (error) {
    console.error(`exec error: ${error}`);
    return null;
  }
}
