// COMMENT THIS BETTER hehe
class Menu extends State {
  constructor() {
    // call the parent class
    super();

    // store flashing lines here (Frameline objects)
    this.flashingLines = [];

    // create the flashing lines
    this.createFlashingLines();

    // define variables for the ui
    this.ui;
    this.font = "Helvetica"; // change this font in the future
    this.slogan = {
      x: 500,
      y: 635,
    };

    // define variables for the name input box
    this.nameInput;
    // look at this for text box -> https://p5js.org/reference/#/p5/key

    // define variables for the button
    this.button = {
      x: 455,
      y: 450,
      w: 500,
      h: 100,
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

    // create the ui
    this.createUi();
  }

  update() {
    // call the parent class
    super.update();

    // draw the background
    background(98, 117, 122);

    // draw the ui
    this.ui.display();
    this.displayText();
    this.displaySlogan();
    this.wrapSlogan();

    // draw the name input box
    this.nameInput = createInput();
    this.nameInput.position(windowWidth / 4, windowHeight / 2);
    this.nameInput.size(300);

    // draw the continue button
    this.drawButton();

    // draw flashing red lines
    for (let i = 0; i < this.flashingLines.length; i++) {
      this.flashingLines[i].display();
    }

    // apply the flashing method
    this.flash();
  }

  createFlashingLines() {
    let x1 = width - 100;
    let y1 = 0;
    let x2 = 100;
    let y2 = height;
    this.createLine(x1, y1, x2, y2);
    let x3 = width + 500;
    let y3 = 0;
    let x4 = 300;
    let y4 = height;
    this.createLine(x3, y3, x4, y4);
    let x5 = 170;
    let y5 = 0;
    let x6 = width - 50;
    let y6 = height;
    this.createLine(x5, y5, x6, y6);
  }

  // create the flashing lines
  createLine(x1, y1, x2, y2) {
    let va = createVector(x1, y1);
    let vb = createVector(x2, y2);

    let frameLine = new Frame(va, vb);
    // store the frame lines here
    this.flashingLines.push(frameLine);
  }

  // link alpha to noise value for a flashing effect
  flash() {
    let minAlpha = -100;
    let maxAlpha = 300;
    let noiseValue = noise(frameCount);
    noiseValue = map(noiseValue, 0, 1, minAlpha, maxAlpha);
    for (let i = 0; i < this.flashingLines.length; i++) {
      let currentLine = this.flashingLines[i];
      currentLine.color.a = noiseValue;
    }
  }

  // create the ui
  createUi() {
    this.createMainShape();
    this.createNameBox();
  }

  //create the main shape for the ui
  createMainShape() {
    let va = createVector(10, 250);
    let vb = createVector(110, 0);
    let vc = createVector(640, 0);
    let vd = createVector(710, 65);
    let ve = createVector(670, 400);
    let vf = createVector(765, 700);
    let vi = createVector(555, 765);
    let vg = createVector(-10, 725);
    let perimeter = [va, vb, vc, vd, ve, vf, vi, vg];

    this.ui = new Ui(perimeter);
  }

  // create the input box for the user's name
  createNameBox() {
    let va = createVector(0, 200);
    let vb = createVector(750, 200);
    let vc = createVector(750, 645);
    let vd = createVector(0, 645);
    let perimeter = [va, vb, vc, vd];

    this.ui = new Ui(perimeter);

    // change the color
    this.ui.color.r = 0;
    this.ui.color.g = 0;
    this.ui.color.b = 0;
    this.ui.color.a = 150;
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
    console.log(`heyyyyyyy`);
    // // check if mouse is hovering
    // let isHovering = this.checkHover();
    // if (isHovering) {
    //   currentState = new Game();
    // }
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

  // display the 'enter ur name text'
  displayText() {
    push();
    textAlign(LEFT);
    textSize(94);
    textFont(this.font);
    fill(200, 200, 200, 100);
    text(`ENTER UR NAME`, -12, 300);
    pop();
  }

  // display the slogan / advice
  displaySlogan() {
    push();
    textAlign(LEFT);
    textSize(18);
    textFont(this.font);
    fill(200, 200, 200, 100);
    text(
      `THIS IS VERY IMPORTANT AND WILL BE OF USE DURING THIS PROCESS`,
      this.slogan.x,
      this.slogan.y
    );
    pop();
  }

  // takes care of the scrolling movement and the wrapping of the slogan
  wrapSlogan() {
    this.slogan.x -= 2;
    if (this.slogan.x < -625) {
      this.slogan.x = 750;
    }
  }
}
