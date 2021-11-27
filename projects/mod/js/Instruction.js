// creates instructions displayed in the game state ui
class Instruction {
  constructor(x, y, alignMode, stringBefore, stringAfter) {
    // define the position of the text
    this.x = x;
    this.y = y;

    // define the formating of the text
    this.size = 20;
    this.align = alignMode;
    this.color = {
      r: 255,
      g: 255,
      b: 255,
      a: 100,
    };

    // define what the instruction says before discovery
    this.stringBefore = stringBefore;
    // define what the instruction says after discovery
    this.stringAfter = stringAfter;
    // keep track of the discovery of the Instruction
    this.discovered = false;
  }

  // display the instruction
  display() {
    let string;
    if (!this.discovered) {
      string = this.stringBefore;
    } else {
      string = this.stringAfter;
    }
    push();
    textAlign(this.align);
    textSize(this.size);
    textFont(fontSansThin);
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    text(string, this.x, this.y);
    pop();
  }
}
