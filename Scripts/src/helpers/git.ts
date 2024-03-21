import { exec, execSync } from "child_process";
import axios from "axios";
import { Octokit } from "@octokit/rest";

export type PushStatus =
  | "feat"
  | "fix"
  | "refactor"
  | "docs"
  | "style"
  | "test"
  | "chore";

const gh = new Octokit();

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
  item: string,
  message: string,
  desc: string[],
  autoAdd: boolean
) {
  return new Promise<void>((resolve, reject) => {
    exec(
      `${
        autoAdd ? "git add . &&" : ""
      } git commit -m "${type}(${item}): ${message}" -m "${desc.join(
        "\n"
      )}" && git push origin main`,
      (error, stdout, stderr) => {
        if (error || stderr) {
          const errorMessage: string = (error || stderr || stdout) as string;
          if (errorMessage.includes("Bypassed rule violations")) {
            console.log(
              "Warning: Bypassed rule violations occurred, but continuing..."
            );
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
  item: string,
  message: string,
  desc: string[]
) {
  return new Promise<void>((resolve, reject) => {
    exec(
      `git commit -m "${type}(${item}): ${message}" -m "${desc.join("\n")}"`,
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

export async function viewIssues(id?: string) {
  const issues = await gh.issues.listForRepo({
    owner: "vtuberwiki",
    repo: "wiki",
    state: "all",
  });

  const filteredIssues = issues.data.filter((issue) => issue.pull_request);

  if (!id) {
    return filteredIssues.map((issue) => {
      return {
        number: issue.number,
        title: issue.title,
        state: issue.state,
        url: issue.html_url,
        user: issue.user,
        createdAt: issue.created_at,
      };
    });
  } else {
    const issue = filteredIssues.find((issue) => issue.number === +id);
    if (issue) {
      return {
        number: issue.number,
        title: issue.title,
        state: issue.state,
        url: issue.html_url,
        user: issue.user,
        createdAt: issue.created_at,
      };
    } else {
      return "Issue not found.";
    }
  }
}

export async function viewPullRequests(id?: string) {
  const pulls = await gh.pulls.list({
    owner: "vtuberwiki",
    repo: "wiki",
    state: "all",
  });

  if (!id) {
    return pulls.data.map((pull) => {
      return {
        number: pull.number,
        title: pull.title,
        state: pull.state,
        url: pull.html_url,
        user: pull.user,
        createdAt: pull.created_at,
      };
    });
  } else {
    const pull = pulls.data.find((pull) => pull.number === +id);
    if (pull) {
      return {
        number: pull.number,
        title: pull.title,
        state: pull.state,
        url: pull.html_url,
        user: pull.user,
        createdAt: pull.created_at,
      };
    } else {
      return "Pull request not found.";
    }
  }
}

export async function viewIssueComments(id: string) {
  const comments = await gh.issues.listComments({
    owner: "vtuberwiki",
    repo: "wiki",
    issue_number: +id,
  });

  let number = 1;
  return comments.data.map((comment) => {
    return {
      user: comment.user,
      createdAt: comment.created_at,
      body: comment.body,
      index: number++,
    };
  });
}

export async function log() {
  try {
    const stdout = execSync("git log").toString();
    return stdout;
  } catch (error) {
    console.error(`exec error: ${error}`);
    return null;
  }
}
