class Menu extends State {
  constructor() {
    // call the parent class
    super();

    // store flashing lines here (Frameline objects)
    this.flashingLines = [];

    // create the flashing lines
    this.createFlashingLines();

    this.ui;
    this.font = "Helvetica"; // change this font in the future
    this.slogan = {
      x: 500,
      y: 635,
    };
    this.nameInput;

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

    this.nameInput = createInput();
    this.nameInput.position(windowWidth / 4, windowHeight / 2);
    this.nameInput.size(750);

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
    let noiseValue = noise(frameRate());
    noiseValue = map(noiseValue, 0, 1, -100, 300);
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

  displayText() {
    push();
    textAlign(LEFT);
    textSize(94);
    textFont(this.font);
    fill(200, 200, 200, 100);
    text(`ENTER UR NAME`, -12, 300);
    pop();
  }

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

  wrapSlogan() {
    this.slogan.x -= 2;
    if (this.slogan.x < -625) {
      this.slogan.x = 750;
    }
  }
}
