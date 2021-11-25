class Intro extends State {
  constructor() {
    super();

    this.font = `Helvetica`;

    // define variables for the button
    this.button = {
      x: 100,
      y: 700,
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

    this.firstAnswer = `yes`; // make an animation that switches between yes and no with noise
    this.secondAnswer = `ya`; // make an animation that switches between ya and nmno with noise
    this.thirdAnswer = `best`; // make an animation that switches between best and worse with noise

    // play the intro music
    introSoundtrack.play();
    introSoundtrack.amp(0.007);
    introSoundtrack.loop();
  }

  update() {
    // call the parent class
    super.update();

    // draw the background
    background(180, 80, 80);

    // apply text animation
    this.flicker();

    // draw the text
    this.displayText();

    // draw continue button
    this.drawIntroButton();
  }

  // look at this to animate the tex -> https://creative-coding.decontextualize.com/text-and-type/
  displayText() {
    push();
    textAlign(LEFT);
    textSize(18);
    textFont(this.font);
    fill(200, 250, 190);
    text(
      `Oi!
hey yea you! if you're here, reading this, chances are you're the owner of a body.
do you like it ?    ${this.firstAnswer}
uh? what was that?    ${this.secondAnswer}
yeah i get it.. .
sometimes, it feels heavy, right? but also sometimes SOoo light, rigth?!

do you also think this body would be the ship you navigate the world with,
u know, doing things.. like grabbing stuff and all that.
every so often you feel it is actually limiting you, right. ..?
oh! like going place! can you GO Places if you dont have a physical body?
probably not... but who am i to tell you for sure...

anyway, the only thing i can tell you with confidence is;
ur body, it should be yours, and you should be able to control it? YEA! maybe?

that would be fun! right?
imagine not being confortable with the body you have..
maybe its too.. feminine? masculine? androgynous? Ding!
now ur gender cannot be perceived in your physical appearance!

imagine getting called some bad word coz ur skin is like, a color that ppl dont like,
maybe a specific shade of brown? who likes  brown, right! ha!
now u can just change it!!
what?
isn't that the    ${this.thirdAnswer}`,
      25,
      60
    );
    text(`idea ever ??????`, 218, 623);
    pop();
  }

  // draw the continue button
  drawIntroButton() {
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

  // link alpha to noise value for a flashing effect
  flicker() {
    let binaryValues = [0, 0, 0, 0, 1, 1, 1];
    let currentValue = random(binaryValues);
    if (frameCount % 3 === 0) {
      if (currentValue === 0) {
        this.firstAnswer = `YES`;
        this.secondAnswer = `YA`;
        this.thirdAnswer = `BEST`;
      } else {
        this.firstAnswer = `NO`;
        this.secondAnswer = `MNO`;
        this.thirdAnswer = `WORST`;
      }
    }
  }
}
