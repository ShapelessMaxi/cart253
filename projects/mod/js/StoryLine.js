// create a line of text to form a story in the intro state
class StoryLine {
  constructor(string, lineNumber) {
    // define in the createStoryline method
    this.string = string;
    this.lineNumber = lineNumber;

    // define the formatting of the text
    this.marginLeft = 15;
    this.marginTop = 70;
    this.verticalSpacing = 22;
    this.size = 20;
    this.color = {
      r: 165,
      g: 195,
      b: 200,
      a: 0,
    };

    // define the speed
    this.appearingSpeed = 0.35;
  }

  // display the line of text
  display(xShift) {
    // xShift is an optinal variable, if not given as a parameter, it is undefined
    // in case we need to move a line horizontaly
    // used for the very last line of the story
    if (xShift === undefined) {
      xShift = 0;
    }

    // takes care of the position of the line
    let x = this.marginLeft + xShift;
    let y = this.marginTop + this.lineNumber * this.verticalSpacing;

    // draw the text line
    push();
    textAlign(LEFT, CENTER);
    textSize(this.size);
    textFont(fontSerif);
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    text(this.string, x, y);
    pop();
  }

  // makes the text appear slowly
  appear() {
    this.color.a += this.appearingSpeed;
    // constraining it so it doesn't get fully opaque
    this.color.a = constrain(this.color.a, 0, 200);
  }
}
