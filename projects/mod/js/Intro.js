class Intro extends State {
  constructor() {
    // call the parent class
    super();

    // keep track of the number of times the user has clicked
    this.clickCount = 0;

    // define variables for the button
    this.button = {
      x: undefined, // defined in hover method
      y: undefined,
      w: 305,
      h: 108,
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
        y: 600,
      },
    };

    // define variables for flickering answers
    this.firstAnswer = {
      created: false,
      str: `YES`,
      color: {
        r: 40,
        g: 100,
        b: 90,
        a: 0,
      },
    };
    this.secondAnswer = {
      created: false,
      str: `YA`,
      color: {
        r: 40,
        g: 100,
        b: 90,
        a: 0,
      },
    };
    this.thirdAnswer = {
      created: false,
      str: `WORSE`,
      color: {
        r: 40,
        g: 100,
        b: 90,
        a: 0,
      },
    };

    // store all the text lines here
    this.storylines = [];

    // store all background leaves here
    this.backgroundLeaves = [];

    // create a bunch of leaves
    this.createLeaves();

    // play the intro music
    introSoundtrack.play();
    introSoundtrack.amp(0.017);
    introSoundtrack.loop();
  }

  // create a bunch of leaves in the background
  createLeaves() {
    let numOfLeaves = 100;
    for (let i = 0; i < numOfLeaves; i++) {
      let x = random(0, width);
      let y = random(-50, height);
      let w = random(250, 300);
      let h = random(150, 200);
      let currentLeaf = new BackgroundLeaf(x, y, w, h);
      this.backgroundLeaves.push(currentLeaf);
    }
  }

  // create the first paragraph
  createParagraph1() {
    this.createStoryLine(textData.line1.str, 1);
    this.createStoryLine(textData.line2.str, 2);
    this.createStoryLine(textData.line3.str, 3);

    this.createStoryLine(textData.line4.str, 4);
    this.createStoryLine(textData.line5.str, 5);
    this.createStoryLine(textData.line6.str, 6);
    this.createStoryLine(``, 7);
  }

  // ceate the second paragraph
  createParagraph2() {
    this.createStoryLine(textData.line7.str, 8);
    this.createStoryLine(textData.line8.str, 9);
    this.createStoryLine(textData.line9.str, 10);
    this.createStoryLine(textData.line10.str, 11);
    this.createStoryLine(textData.line11.str, 12);
    this.createStoryLine(``, 13);
  }

  // create the third paragraph
  createParagraph3() {
    this.createStoryLine(textData.line12.str, 14);
    this.createStoryLine(textData.line13.str, 15);
    this.createStoryLine(textData.line14.str, 16);
    this.createStoryLine(``, 17);
  }

  // create the fourth paragraph
  createParagraph4() {
    this.createStoryLine(textData.line15.str, 18);
    this.createStoryLine(textData.line16.str, 19);
    this.createStoryLine(textData.line17.str, 20);
    this.createStoryLine(``, 21);
  }

  // create the fifth paragraph
  createParagraph5() {
    this.createStoryLine(textData.line18.str, 22);
    this.createStoryLine(textData.line19.str, 23);
    this.createStoryLine(textData.line20.str, 24);
    this.createStoryLine(``, 25);
  }

  // create the sixth paragraph
  createParagraph6() {
    this.createStoryLine(textData.line21.str, 26);
    this.createStoryLine(textData.line22.str, 27);
    this.createStoryLine(textData.line23.str, 27);
  }

  //create a line of the text
  createStoryLine(string, lineNumber) {
    let currentLine = new StoryLine(string, lineNumber);
    this.storylines.push(currentLine);
  }

  update() {
    // call the parent class
    super.update();

    // draw the background
    background(10, 15, 18);

    // display start instructions
    if (this.clickCount === 0) {
      this.startInstructions();
    }

    // display the story
    for (let i = 0; i < this.storylines.length; i++) {
      // if its the last line of the story, apply offset
      // last line is actualy made of 3 steps :
      // 1- string, 2- flickering answer, 3- string
      if (i === this.storylines.length - 1) {
        let currentLine = this.storylines[i];
        currentLine.display(200);
        currentLine.appear();
      } else {
        let currentLine = this.storylines[i];
        currentLine.display();
        currentLine.appear();
      }
    }

    if (this.firstAnswer.created) {
      let x = 149;
      let y = 137;
      this.displayAnswer(this.firstAnswer, x, y);
      this.answerAppear(this.firstAnswer);
    }
    if (this.secondAnswer.created) {
      let x = 191;
      let y = 159;
      this.displayAnswer(this.secondAnswer, x, y);
      this.answerAppear(this.secondAnswer);
    }
    if (this.thirdAnswer.created) {
      let x = 133;
      let y = 665;
      this.displayAnswer(this.thirdAnswer, x, y);
      this.answerAppear(this.thirdAnswer);
    }

    // apply text animation
    this.flicker();

    // draw continue button
    if (this.clickCount > 0) {
      this.drawIntroButton();
    }

    // display the background leaves every 1, 12, and 51 frames for a flickering effect
    // (there's 3x 51 to have the leaves brigther at that step)
    let framecountSteps = [1, 12, 51, 51, 51];
    for (let i = 0; i < framecountSteps.length; i++) {
      let currentFramecount = framecountSteps[i];
      if (frameCount % currentFramecount === 0) {
        for (let i = 0; i < this.backgroundLeaves.length; i++) {
          let currentLeaf = this.backgroundLeaves[i];
          currentLeaf.display();
          currentLeaf.movement();
        }
      }
    }
  }

  // display start instructions
  startInstructions() {
    push();
    textAlign(CENTER);
    textSize(45);
    textFont(fontSerif);
    fill(255, 200, 200, 100);
    text(`click the mouse to start`, width / 2, height / 4);
    pop();
  }

  // draw the continue button
  drawIntroButton() {
    // defining the position of the shadows according to the position of the button
    this.button.firstShadow.x = this.button.x - 20;
    this.button.firstShadow.y = this.button.y + 5;
    this.button.firstShadow.h = this.button.h + 20;
    this.button.secondShadow.x = this.button.x - 25;
    this.button.secondShadow.y = this.button.y + 8;
    this.button.secondShadow.h = this.button.firstShadow.h;

    // defining the position of the 'continue' text according to the position of the button
    this.button.text.x = this.button.x + 18;
    this.button.text.y = this.button.y + 45;

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
    // rectMode(CORNER);
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
    textSize(46);
    textFont(fontSans);
    fill(0, 0, 0, 100);
    text(`— CONTINUE`, this.button.text.x, this.button.text.y);
    pop();

    // change the color and position of the button depeding on the user's mouse position
    this.hoverButton();
  }

  // click the button to go to next state
  mousePressed() {
    this.clickCount += 1;
    if (this.clickCount === 1) {
      setTimeout(this.createParagraph1.bind(this), 1000);
      setTimeout(this.createAnswer.bind(this), 1000, this.firstAnswer);
      setTimeout(this.createAnswer.bind(this), 1000, this.secondAnswer);
      setTimeout(this.createParagraph2.bind(this), 11000);
      setTimeout(this.createParagraph3.bind(this), 21000);
      setTimeout(this.createParagraph4.bind(this), 31000);
      setTimeout(this.createParagraph5.bind(this), 41000);
      setTimeout(this.createParagraph6.bind(this), 51000);
      setTimeout(this.createAnswer.bind(this), 51000, this.thirdAnswer);

      this.clickCount += 1;
    } else {
      this.clickCount += 1;
    }

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
      this.button.y = 652;
      this.button.color.a = 255;
    } else {
      this.button.x = 455;
      this.button.y = 650;
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

  // keeps track of which answer has been created
  createAnswer(answer) {
    answer.created = true;
  }

  // make the answers appear slowly
  answerAppear(answer) {
    answer.color.a += 0.35;
    answer.color.a = constrain(answer.color.a, 0, 200);
  }

  // display the answers
  displayAnswer(answer, x, y) {
    push();
    textAlign(LEFT, CENTER);
    textSize(20);
    textFont(fontSans);
    fill(answer.color.r, answer.color.g, answer.color.b, answer.color.a);
    text(`${answer.str}`, x, y);
    pop();
  }

  // switches between two answers
  flicker() {
    let binaryValues = [0, 0, 0, 0, 1, 1, 1];
    let currentValue = random(binaryValues);

    if (frameCount % 3 === 0) {
      if (currentValue === 0) {
        this.firstAnswer.str = `YES`;
        this.secondAnswer.str = `YA`;
        this.thirdAnswer.str = `BEST`;
      } else {
        this.firstAnswer.str = `NO`;
        this.secondAnswer.str = `MNO`;
        this.thirdAnswer.str = `WORST`;
      }
    }
  }
}
