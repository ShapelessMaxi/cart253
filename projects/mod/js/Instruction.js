class Instruction {
  constructor(x, y, alignMode, stringBefore, stringAfter) {
    // define the position of the text
    this.x = x;
    this.y = y;

    // define the formating of the text
    this.size = 14;
    this.font = "Helvetica"; // change this font in the future
    this.color = {
      r: 255,
      g: 255,
      b: 255,
      a: 100,
    };
    this.align = alignMode;

    // define what the instruction says before discovery
    this.stringBefore = stringBefore;
    // define what the instruction says after discovery
    this.stringAfter = stringAfter;
    // keep track of the discovery of the Instruction
    this.discovered = false;
  }

  display(string) {
    push();
    textAlign(this.align);
    textSize(this.size);
    textFont(this.font);
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    text(string, this.x, this.y);
    pop();
  }
}
