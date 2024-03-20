import { exec } from "child_process";

async function isEditorInstalled(editorCommand: string) {
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

const Editors = {
  "Visual Studio Code": "code",
  "Sublime Text": "subl",
  NeoVim: "nvim",
  Vim: "vim",
  Emacs: "emacs",
  "Notepad++": "notepad++",
  Notepad: "notepad",
  Nano: "nano",
  Atom: "atom",
  Brackets: "brackets",
  gedit: "gedit",
  "IntelliJ IDEA": "idea",
  Eclipse: "eclipse",
  NetBeans: "netbeans",
  TextMate: "mate",
};

export { isEditorInstalled, Editors };
