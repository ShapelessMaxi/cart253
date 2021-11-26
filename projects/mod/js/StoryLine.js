class StoryLine {
  constructor(string, lineNumber) {
    this.string = string;
    this.marginLeft = 15;
    this.marginTop = 50;
    this.verticalSpacing = 22;
    this.size = 18;
    this.color = {
      r: 190,
      g: 210,
      b: 215,
      a: 0,
    };
    this.lineNumber = lineNumber;
    this.appearingSpeed = 0.35;
  }

  display(xShift) {
    if (xShift === undefined) {
      xShift = 0;
    }

    let x = this.marginLeft + xShift;
    let y = this.marginTop + this.lineNumber * this.verticalSpacing;

    push();
    textAlign(LEFT, CENTER);
    textSize(this.size);
    textFont(font);
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    text(this.string, x, y);
    pop();
  }

  // the text appear slowly
  appear() {
    this.color.a += this.appearingSpeed;
    this.color.a = constrain(this.color.a, 0, 255);
  }
}
