class Intro extends State {
  constructor() {
    super();

    this.font = `Helvetica`;

    // define variables for the button
    this.button = {
      x: 455,
      y: 150,
      w: 500,
      h: 400,
      corner: 10,
      color: {
        r: 240,
        g: 255,
        b: 240,
        a: 150,
      },
      firstShadow: {
        x: undefined,
        y: undefined,
        w: 500,
        h: undefined,
        corner: 10,
        color: 0,
        alpha: 50,
      },
      secondShadow: {
        x: undefined,
        y: undefined,
        w: 500,
        h: undefined,
        corner: 10,
      },
      text: {
        x: 755,
        y: 505,
      },
    };

    // play the intro music
    introSoundtrack.play();
    introSoundtrack.amp(0.005);
    introSoundtrack.loop();
  }

  update() {
    super.update();

    background(255, 80, 80);

    this.displayText();

    this.drawButton();
  }

  // look at this to animate the tex -> https://creative-coding.decontextualize.com/text-and-type/
  displayText() {
    push();
    textAlign(LEFT);
    textSize(20);
    textFont(this.font);
    fill(100, 250, 100);
    text(
      `if you are here, reading this, chances are you're the owner of a body.`,
      25,
      300
    );
    pop();
  }

  // draw the continue button
  drawButton() {
    // change the color and position of the button depeding on the user's mouse position
    this.hoverButton();

    // defining the position of the shadows according to the position of the button
    this.button.firstShadow.x = this.button.x - 20;
    this.button.firstShadow.y = this.button.y + 5;
    this.button.firstShadow.h = this.button.h + 20;
    this.button.secondShadow.x = this.button.x - 25;
    this.button.secondShadow.y = this.button.y + 8;
    this.button.secondShadow.h = this.button.firstShadow.h;

    // defining the position of the 'continue' text according to the position of the button
    this.button.text.x = this.button.x + 25;
    this.button.text.y = this.button.y + 55;
    // draw the shadow
    push();
    rectMode(CORNER);
    noStroke();
    fill(
      this.button.firstShadow.color,
      this.button.firstShadow.color,
      this.button.firstShadow.color,
      this.button.firstShadow.alpha
    );
    rect(
      this.button.firstShadow.x,
      this.button.firstShadow.y,
      this.button.firstShadow.w,
      this.button.firstShadow.h,
      this.button.firstShadow.corner
    );
    rect(
      this.button.secondShadow.x,
      this.button.secondShadow.y,
      this.button.secondShadow.w,
      this.button.secondShadow.h,
      this.button.secondShadow.corner
    );
    pop();

    // draw the main rectangle shape
    push();
    noStroke();
    rectMode(CORNER);
    fill(
      this.button.color.r,
      this.button.color.g,
      this.button.color.b,
      this.button.color.a
    );
    rect(
      this.button.x,
      this.button.y,
      this.button.w,
      this.button.h,
      this.button.corner
    );
    pop();

    // draw the 'continue' text
    push();
    textAlign(LEFT, CENTER);
    textSize(40);
    textFont(this.font);
    fill(0, 0, 0, 100);
    let triangle = `\u25B6`;
    text(`${triangle}   CONTINUE`, this.button.text.x, this.button.text.y);
    pop();
  }

  // click the button to go to next state
  mousePressed() {
    // check if mouse is hovering
    let isHovering = this.checkHover();
    if (isHovering) {
      currentState = new Menu();
    }
  }

  // apply some color and position change to the button
  hoverButton() {
    // from p5.2dcollide.js librairy
    // assumes rectMode(CORNER)
    let isHovering = this.checkHover();

    if (isHovering) {
      this.button.x = 457;
      this.button.y = 451;
      this.button.color.a = 255;
    } else {
      this.button.x = 455;
      this.button.y = 450;
      this.button.color.a = 180;
    }
  }

  // check if the user's mouse is hovering the buttton
  checkHover() {
    let isHovering = collidePointRect(
      mouseX,
      mouseY,
      this.button.x,
      this.button.y,
      this.button.w,
      this.button.h
    );
    // returns true or false
    return isHovering;
  }
}
