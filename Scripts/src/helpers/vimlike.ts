import readline from "readline";

export default class VimLike {
  private text: string;
  private lines: string[];
  private cursorPosition: number;
  private TEXT_LENGTH: number;

  constructor(text: string) {
    this.text = text;
    this.lines = text.split("\n");
    this.cursorPosition = 0;
    this.TEXT_LENGTH = this.calculateTextLength();
    this.initKeyPress();
    this.scrollDown();
    this.listenForResize();
  }

  private initKeyPress() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on("keypress", (str, key) => {
      if (key.name === "q") {
        process.exit();
      } else if (key.name === "up") {
        this.scrollUp();
      } else if (key.name === "down") {
        this.scrollDown();
      }
    });
  }

  private calculateTextLength(): number {
    const { rows } = process.stdout;
    // Subtracting 2 to account for prompt and a bit of buffer space
    return Math.max(0, rows - 2);
  }

  private listenForResize() {
    process.stdout.on("resize", () => {
      this.TEXT_LENGTH = this.calculateTextLength();
      this.display();
    });
  }

  scrollUp() {
    if (this.cursorPosition > 0) {
      this.cursorPosition--;
      this.display();
    }
  }

  scrollDown() {
    if (this.cursorPosition < this.lines.length - 1) {
      this.cursorPosition++;
      this.display();
    }
  }

  private display() {
    // Clear terminal
    console.clear();

    // Display text
    let start = Math.max(0, this.cursorPosition - process.stdout.rows + 1);
    let end = Math.min(this.lines.length, start + process.stdout.rows);
    if (end - start > this.TEXT_LENGTH) {
      start = end - this.TEXT_LENGTH;
    }
    for (let i = start; i < end; i++) {
      console.log(this.lines[i]);
    }

    // Display prompt
    process.stdout.write("\n");
    process.stdout.write(":");
  }
}
