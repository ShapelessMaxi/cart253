// class taking care of displaying and making the intro text appear
class StoryLine {
  constructor(string, lineNumber) {
    this.string = string;
    this.marginLeft = 15;
    this.marginTop = 70;
    this.verticalSpacing = 22;
    this.size = 18;
    this.color = {
      r: 165,
      g: 195,
      b: 200,
      a: 0,
    };
    this.lineNumber = lineNumber;
    this.appearingSpeed = 0.35;
  }

  // display the lines of the text
  display(xShift) {
    // xShift is an optinal variable, if not given as a parameter, it is undefined
    if (xShift === undefined) {
      xShift = 0;
    }

    // takes care of the position of the lines
    let x = this.marginLeft + xShift;
    let y = this.marginTop + this.lineNumber * this.verticalSpacing;

    // draw the text lines
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
    // constraining it so it doesn't go up to 255
    this.color.a = constrain(this.color.a, 0, 200);
  }
}
