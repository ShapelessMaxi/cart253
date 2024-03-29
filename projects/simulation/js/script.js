/**
The Cat - Simulation
Maxime Perreault

Who feeds a cat in the afterlife when they reach their limit of nine lives? What happens when you feed
random stuff to cat? Is there a place we go to when we die? This mini game brings you in a etheral world.
The backstory and the dialogues, with vague creepiness and sadness vibe, makes you wonder about what
happened between the main character and the cat before both of you got there. What type of relationship
did you have with this cat?

************************************************
`Where am I?

Although I'm sure I've never seen these plains,
I feel like I have some task to fulfill around here.

Im not sure ill ever get used to this form.
I thought being able to navigate so high up in the sky would be fun,
but my stomach, or whatever's in the place where my stomach was,
says the opposite.

Oh... this cat.
Me and this cat, man, we never really got along.
I was always trying to help him, I wanted to help him.
Now look at us, not doing so well, uh.`
************************************************

In this simulation game, you navigate from left to right, up and down, to go fetch some items.
You can hold one item at the time and each item can be fed to the "cat". Every item fed to the cat
has a different effect, see what each one of them do!

I wanted this game to have a spooky but cute atmosphere, complete with simple graphics,
a soft color palette and some slightly uncomfortable dialogues.

ps: sorry to whoever sees this code, the 'drawing the cat' portion of the code is very messy.
I will probably never draw a triangle in p5.js ever again :).
*/

"use strict";

// this line was taken from (https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance#p5-performance-tips)
// supposed to help with better framerate
p5.disableFriendlyErrors = true;

let ambiantSound = undefined;

let state = `info`; // possible states: info, intro, simulation, end

let cloudA = { img: undefined, x: 0, y: 20, vx: 0.2 };
let cloudB = { img: undefined, x: 100, y: 380, vx: 0.6 };
let cloudC = { img: undefined, x: 800, y: 200, vx: 0.3 };

let groundLevel = undefined;
let starSeed = 0;
let n = 0;

let ghost = {
  pos: { x: 200, y: undefined },
  bod: { w: 40, h: 100 },
  top: { x: undefined, y: undefined },
  color: { r: 240, g: 240, b: 140, a: 100 },
  eyes: {
    x1: undefined,
    y: undefined,
    x2: undefined,
    w1: 12,
    w2: 10,
    h: 17,
    color: { r: 50, g: 10, b: 10, a: 200 },
  },
};
let cat = {
  pos: { x: undefined, y: undefined },
  bod: { w: 50, h: 50 },
  top: { x: undefined, y: undefined },
  pupil: { x1: undefined, x2: undefined, w: 4, h: 10 },
  color: { r: 240, g: 240, b: 140, a: 100 },
  ear1: {
    x1: undefined,
    y1: undefined,
    x2: undefined,
    y2: undefined,
    x3: undefined,
    y3: undefined,
  },
  ear2: {
    x1: undefined,
    y1: undefined,
    x2: undefined,
    y2: undefined,
    x3: undefined,
    y3: undefined,
  },
  eyes: {
    x1: undefined,
    y1: undefined,
    x2: undefined,
    w1: 15,
    w2: 12,
    h: 17,
    color: { r: 50, g: 10, b: 10, a: 180 },
  },
  numOfTails: 1,
  tailGrowth: 1,
  tailHeight: 85,
  rightTail: {
    img: undefined,
    x: undefined,
    y: undefined,
    w: 100,
    h: 80,
    offset: 30,
  },
  leftTail: {
    img: undefined,
    x: undefined,
    y: undefined,
    w: 100,
    h: 80,
    offset: 130,
  },
  rightWings: {
    active: false,
    img: undefined,
    x: undefined,
    y: undefined,
    w: 100,
    h: 80,
    offset: 30,
  },
  leftWings: {
    active: false,
    img: undefined,
    x: undefined,
    y: undefined,
    w: 100,
    h: 80,
    offset: 130,
  },
};

// store item object here
let items = [];
let butterflyIcon = undefined;
let potionIcon = undefined;
let flowerIcon = undefined;
let snakeIcon = undefined;

// store dialogue entries as strings here
let dialEntries = [];
let dialBox = {
  active: false,
  current: 0,
  x: undefined,
  y: undefined,
  w: undefined,
  h: undefined,
  color: { r: 80, g: 80, b: 97, a: 200 },
  corner: 20,
  colorStroke: { r: 240, g: 240, b: 140, a: 100 },
};
let dialogueFont = undefined;

// preloading the cloud, icon images, wings and tails image, font and sound
function preload() {
  // loading wings and tails images
  cat.rightWings.img = loadImage(`assets/images/wings_right.png`);
  cat.leftWings.img = loadImage(`assets/images/wings_left.png`);
  cat.rightTail.img = loadImage(`assets/images/tail_right.png`);
  cat.leftTail.img = loadImage(`assets/images/tail_left.png`);

  // loading cloud images
  cloudA.img = loadImage(`assets/images/cloud1.png`);
  cloudB.img = loadImage(`assets/images/cloud2.png`);
  cloudC.img = loadImage(`assets/images/cloud3.png`);

  // loading items images
  butterflyIcon = loadImage(`assets/images/item_butterfly.png`);
  potionIcon = loadImage(`assets/images/item_potion.png`);
  flowerIcon = loadImage(`assets/images/item_flower.png`);
  snakeIcon = loadImage(`assets/images/item_snake.png`);

  // loading font
  dialogueFont = loadFont(`assets/fonts/cour.ttf`);

  // loading sound
  ambiantSound = loadSound(`assets/sounds/forest.wav`);
}

// creating the canvas, setting interval, creating items objects and dialogues entries
function setup() {
  createCanvas(windowWidth, windowHeight);

  // defining an interval to change the position of the stars every few seconds
  setInterval(changeStarSeed, 2500);

  // creating items object (class)
  createItems();

  // creating dialogue entries (array of strings)
  dialogueEntries();
}

// drawing game elements and setting up states
function draw() {
  if (state === `info`) {
    // this tells you what are the controls
    info();
  } else if (state === `intro`) {
    // this is the backstory, the music starts here
    intro();
  } else if (state === `simulation`) {
    // this is the game part
    simulation();
  } else if (state === `end`) {
    // this is the end screen
    end();
  }
}

// info and commands screen (info state)
function info() {
  background(0);

  push();
  textAlign(CENTER);
  textFont(dialogueFont);
  fill(135, 41, 48);

  textSize(30);
  text(`press 'spacebar' to continue`, width / 2, height / 2);

  textSize(20);
  text(
    `navigate with 'arrow' keys             press 'x' to execute an action`,
    width / 2,
    (height * 7) / 8
  );

  pop();
}

// introduction backstory screen (intro state)
function intro() {
  background(169, 180, 199);

  push();
  textAlign(LEFT);
  textFont(dialogueFont);
  fill(135, 41, 48);

  textSize(20);
  text(
    `Where am I?

    Although I'm sure I've never seen these plains,
    I feel like I have some task to fulfill around here.


    Im not sure I'll ever get used to this form.
    I thought being able to fly so high up in the sky would be fun,
    but my stomach, or whatever's in the place where my stomach was,
    says the opposite.


    Oh... this cat.
    Me and this cat, man, we never really got along.
    I was always trying to help him,
    I wanted to help him.
    Now look at us, not doing so well, uh.`,
    200,
    200
  );
  fill(255);

  textSize(18);
  text(`press 'spacebar' to start the game`, (width * 5) / 8, (height * 8) / 9);

  pop();
}

// simulation (simulation state)
function simulation() {
  // draws background elements
  drawBackground();

  // draws characters
  drawCharacters();

  // define the character's movement and draws some characters elements
  movement();

  // draws the items
  displayItems();

  // draws the hint text (press 'x' to ...)
  displayText();

  // draws the dialogues boxes
  displayDialogue();
}

// endgame screen (end state)
function end() {
  background(25);

  push();
  textFont(dialogueFont);
  fill(135, 41, 48);

  textAlign(CENTER);
  textSize(20);
  text(`press 'spacebar ' to restart`, width / 2, (height * 7) / 8);

  textAlign(LEFT);
  textSize(35);
  text(
    `ps: it was not your fault.
              - the cat`,
    200,
    height / 4
  );

  pop();
}

// DRAWING BACKGROUND ELEMENTS
function drawBackground() {
  // still part of the background
  stillBackground();

  // animated part of the background
  animatedBackground();
}

// drawing the gradient sky, the hill and the frame
function stillBackground() {
  //DRAWING THE BACKGROUND
  background(101, 150, 138);
  noStroke();
  rectMode(CENTER);

  // drawing the sky
  fill(63, 92, 99, 100);
  rect(width / 2, 0, width, 800);
  rect(width / 2, 0, width, 500);
  rect(width / 2, 0, width, 200);

  // drawing the frame
  fill(169, 180, 199);
  beginShape();
  vertex(0, height);
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, height);
  vertex(width - 30, height);
  vertex(width - 30, 30);
  vertex(30, 30);
  vertex(30, height);
  endShape(CLOSE);

  // drawing the ground
  fill(63, 73, 94);
  ellipse(width / 2, height, width + 400, 180);
}

// drwaing the stars and the clouds
function animatedBackground() {
  // drawing the stars
  drawStars();

  // drawing the clouds
  drawClouds();
}

// drawing the stars with a loop
function drawStars() {
  // this seed changes every few seconds
  // effectivly, this changes the position of the set of stars (drawn by for loop) every few seconds
  randomSeed(starSeed);

  let numOfStars = 100;
  for (let i = 0; i < numOfStars; i++) {
    push();
    stroke(54, 143, 153, 200);
    strokeWeight(5);
    let x = random(30, width - 30);
    let y = random(30, height - 100);
    point(x, y);
    pop();
  }
}

// changing the random seed every few seconds, linked with setInterval() function in Setup()
function changeStarSeed() {
  starSeed = random(0, 20000);
}

// drawing the clouds and defining how they move
function drawClouds() {
  // define a ratio to adjust the cloud size to screen size
  let cloudRatio = windowWidth / 1000;

  // define color of the clouds
  tint(102, 113, 138, 200);

  // drawing Cloud A and resetting position when off-screen
  cloudA.x -= cloudA.vx;
  if (cloudA.x < -1001 * cloudRatio) {
    cloudA.x = width;
  }
  image(cloudA.img, cloudA.x, cloudA.y, 1001 * cloudRatio, 167 * cloudRatio);

  // drawing Cloud B and resetting position when off-screen
  cloudB.x -= cloudB.vx;
  if (cloudB.x < -1037.5 * cloudRatio) {
    cloudB.x = width;
  }
  image(cloudB.img, cloudB.x, cloudB.y, 1037 * cloudRatio, 131 * cloudRatio);

  // drawing Cloud C and resetting position when off-screen
  cloudC.x -= cloudC.vx;
  if (cloudC.x < -490.5 * cloudRatio) {
    cloudC.x = width;
  }
  image(cloudC.img, cloudC.x, cloudC.y, 550 * cloudRatio, 84 * cloudRatio);
}

// DRAWING CHARACTERS
function drawCharacters() {
  // defining the ground level
  groundLevel = height - 50;

  // drawing the ghost (user)
  drawGhost();

  // drawing the cat (entity to interact with)
  drawCat();
}

// drawing the ghost (user)
function drawGhost() {
  push();
  rectMode(CENTER);
  fill(ghost.color.r, ghost.color.g, ghost.color.b, ghost.color.a);

  // drawing main rectangle
  ghost.pos.y = groundLevel;
  rect(ghost.pos.x, ghost.pos.y - ghost.bod.h / 2, ghost.bod.w, ghost.bod.h);

  // drawing top half circle
  ghost.top.x = ghost.pos.x;
  ghost.top.y = ghost.pos.y - ghost.bod.h;
  arc(ghost.top.x, ghost.top.y, ghost.bod.w, ghost.bod.w, PI, TWO_PI);
  pop();

  // drawing the ghost's eyes
  push();
  fill(
    ghost.eyes.color.r,
    ghost.eyes.color.g,
    ghost.eyes.color.b,
    ghost.eyes.color.a
  );
  ghost.eyes.y = ghost.pos.y - ghost.bod.h + 15;
  ellipse(ghost.eyes.x1, ghost.eyes.y, ghost.eyes.w1, ghost.eyes.h);
  ellipse(ghost.eyes.x2, ghost.eyes.y, ghost.eyes.w2, ghost.eyes.h);
  pop();
}

// drawing the cat (entity to interact with)
function drawCat() {
  push();
  rectMode(CENTER);
  fill(cat.color.r, cat.color.g, cat.color.b, cat.color.a);

  // drawing the cat's body (main rectangle)
  cat.pos.y = groundLevel;
  cat.pos.x = width - 350;
  rect(cat.pos.x, cat.pos.y - cat.bod.h / 2, cat.bod.w, cat.bod.h);

  // drawing the cat's head (top half circle)
  cat.top.x = cat.pos.x;
  cat.top.y = cat.pos.y - cat.bod.h;
  arc(cat.top.x, cat.top.y, cat.bod.w, cat.bod.h, PI, TWO_PI);

  // drawing the cat's right ear
  cat.ear1.x1 = cat.pos.x - 15;
  cat.ear1.x2 = cat.ear1.x1 + 13;
  cat.ear1.x3 = cat.ear1.x2 + 3;
  cat.ear1.y1 = cat.top.y - cat.bod.h / 2 - 3;
  cat.ear1.y2 = cat.ear1.y1 - 30;
  cat.ear1.y3 = cat.ear1.y1;
  triangle(
    cat.ear1.x1,
    cat.ear1.y1,
    cat.ear1.x2,
    cat.ear1.y2,
    cat.ear1.x3,
    cat.ear1.y3
  );

  // drawing the cats's left ear
  cat.ear2.x1 = cat.ear1.x1 + 20;
  cat.ear2.x2 = cat.ear2.x1 + 13;
  cat.ear2.x3 = cat.ear2.x2 + 3;
  cat.ear2.y1 = cat.ear1.y1;
  cat.ear2.y2 = cat.ear1.y2;
  cat.ear2.y3 = cat.ear1.y1;
  triangle(
    cat.ear2.x1,
    cat.ear2.y1,
    cat.ear2.x2,
    cat.ear2.y2,
    cat.ear2.x3,
    cat.ear2.y3
  );
  pop();

  // drawing the cat's eyes
  cat.eyes.y = cat.pos.y - cat.bod.h + 5;
  push();
  fill(cat.eyes.color.r, cat.eyes.color.g, cat.eyes.color.b, cat.eyes.color.a);
  ellipse(cat.eyes.x1, cat.eyes.y, cat.eyes.w1, cat.eyes.h);
  ellipse(cat.eyes.x2, cat.eyes.y, cat.eyes.w2, cat.eyes.h);
  pop();

  // drawing the cat's pupils
  push();
  fill(0);
  ellipse(cat.pupil.x1, cat.eyes.y, cat.pupil.w, cat.pupil.h);
  ellipse(cat.pupil.x2, cat.eyes.y, cat.pupil.w, cat.pupil.h);
  pop();
}

// draw tails on the right
function drawRightTails(yOffset) {
  // setting x postion (same for all sets of tails)
  cat.rightTail.x = cat.pos.x + cat.rightTail.offset;

  // setting y position (different for all sets of tails, determined by yOffset variable)
  cat.rightTail.y = groundLevel - cat.tailHeight - yOffset;

  // drawing the tail
  push();
  tint(cat.color.r, cat.color.g, cat.color.b, cat.color.a);
  image(
    cat.rightTail.img,
    cat.rightTail.x,
    cat.rightTail.y,
    cat.rightTail.w * cat.tailGrowth,
    cat.rightTail.h * cat.tailGrowth
  );
  pop();
}

// draw tails on the left
function drawLeftTails(yOffset) {
  // setting x postion (same for all sets of tails)
  cat.leftTail.x = cat.pos.x - cat.leftTail.offset;

  // setting y position (different for all sets of tails, determined by yOffset variable)
  cat.leftTail.y = groundLevel - cat.tailHeight - yOffset;

  // drawing the tail
  push();
  tint(cat.color.r, cat.color.g, cat.color.b, cat.color.a);
  image(
    cat.leftTail.img,
    cat.leftTail.x,
    cat.leftTail.y,
    cat.leftTail.w * cat.tailGrowth,
    cat.leftTail.h * cat.tailGrowth
  );
  pop();
}

// defining movemements of the characters and items
function movement() {
  // defining movemements for the ghost (user)
  ghostMovement();

  // defining movemements for the cat
  catMovement();

  // defining movements for picked items
  pickedItemMovement();
}

// controlling the movement of the ghost (user) with arrow keys
function ghostMovement() {
  // constraining the ghost's position to a bit less than the frame
  ghost.pos.x = constrain(ghost.pos.x, 62, width - 62);
  ghost.bod.h = constrain(ghost.bod.h, 80, height - 110);

  // controlling the ghost and flipping the eyes with arrow keys and
  if (keyIsDown(UP_ARROW)) {
    ghost.bod.h += height / 100;
  } else if (keyIsDown(DOWN_ARROW)) {
    ghost.bod.h -= height / 100;
  }
  if (keyIsDown(LEFT_ARROW)) {
    ghost.pos.x -= width / 150;
    ghost.eyes.x1 = ghost.pos.x - 5;
    ghost.eyes.x2 = ghost.eyes.x1 - 15;
  } else if (keyIsDown(RIGHT_ARROW)) {
    ghost.pos.x += width / 150;
    ghost.eyes.x1 = ghost.pos.x + 5;
    ghost.eyes.x2 = ghost.eyes.x1 + 15;
  }
}

// flipping the cat according to the ghost's position
function catMovement() {
  // flipping the cat's eyes and tail with ghost position
  if (ghost.pos.x < cat.pos.x) {
    // flipping the eyes and pupils
    cat.eyes.x1 = cat.pos.x - 5;
    cat.eyes.x2 = cat.pos.x - 25;
    cat.pupil.x1 = cat.eyes.x1 - 2;
    cat.pupil.x2 = cat.eyes.x2 - 2;

    // drawing the wings on the right side (deactivated until fed the butterfly)
    if (cat.rightWings.active) {
      push();
      cat.rightWings.x = cat.pos.x + cat.rightWings.offset;
      cat.rightWings.y = cat.ear1.y1 - 25;
      tint(cat.color.r, cat.color.g, cat.color.b, cat.color.a);
      image(
        cat.rightWings.img,
        cat.rightWings.x,
        cat.rightWings.y,
        cat.rightWings.w,
        cat.rightWings.h
      );
      pop();
    }

    // drawing the tails on the left (1 or more)
    if (cat.numOfTails === 1) {
      drawRightTails(0);
    } else if (cat.numOfTails === 2) {
      drawRightTails(0);
      drawRightTails(40);
    } else if (cat.numOfTails === 3) {
      drawRightTails(0);
      drawRightTails(40);
      drawRightTails(80);
    } else if (cat.numOfTails > 3) {
      // drawing 3 sets of tails on the right and left
      drawRightTails(0);
      drawRightTails(40);
      drawRightTails(80);
      drawLeftTails(0);
      drawLeftTails(40);
      drawLeftTails(80);
    }
  } else if (ghost.pos.x > cat.pos.x) {
    // flipping the eyes and pupils
    cat.eyes.x1 = cat.pos.x + 5;
    cat.eyes.x2 = cat.pos.x + 25;
    cat.pupil.x1 = cat.eyes.x1 + 2;
    cat.pupil.x2 = cat.eyes.x2 + 2;

    // drawing the wings on the left side (deactivated until fed the butterfly)
    if (cat.leftWings.active) {
      push();
      cat.leftWings.x = cat.pos.x - cat.leftWings.offset;
      cat.leftWings.y = cat.ear1.y1 - 25;
      tint(cat.color.r, cat.color.g, cat.color.b, cat.color.a);
      image(
        cat.leftWings.img,
        cat.leftWings.x,
        cat.leftWings.y,
        cat.leftWings.w,
        cat.leftWings.h
      );
      pop();
    }

    // drawing the tails on the left (1 or more)
    if (cat.numOfTails === 1) {
      drawLeftTails(0);
    } else if (cat.numOfTails === 2) {
      drawLeftTails(0);
      drawLeftTails(40);
    } else if (cat.numOfTails === 3) {
      drawLeftTails(0);
      drawLeftTails(40);
      drawLeftTails(80);
    } else if (cat.numOfTails > 3) {
      // drawing 3 sets of tails on the right and left
      drawLeftTails(0);
      drawLeftTails(40);
      drawLeftTails(80);
      drawRightTails(0);
      drawRightTails(40);
      drawRightTails(80);
    }
  }
}

// picked item movement controlled byt the user
function pickedItemMovement() {
  for (let i = 0; i < items.length; i++) {
    if (items[i].picked) {
      if (isLeft()) {
        items[i].x = ghost.pos.x - 40;
        items[i].y = ghost.eyes.y + 25;
      } else if (!isLeft()) {
        items[i].x = ghost.pos.x + 40;
        items[i].y = ghost.eyes.y + 25;
      }
      if (keyIsDown(LEFT_ARROW)) {
        items[i].x = ghost.pos.x - 40;
      } else if (keyIsDown(RIGHT_ARROW)) {
        items[i].x = ghost.pos.x + 40;
      }
    } else if (!items[i].picked) {
      items[i].x = items[i].x;
      items[i].y = items[i].y;
    }
  }
}

// CREATING ITEMS
function createItems() {
  // this item gives the cat wings
  createButterfly();

  // this item makes the cat grow bigger
  createPotion();

  // this item changes the cat's color
  createFlower();

  // this item gives the cat's more tails
  createSnake();
}

// creating a butterfly item
function createButterfly() {
  let butterfly = new Item(
    butterflyIcon,
    random(100, width - 100),
    random(100, height - 160)
  );
  items.push(butterfly);
}

// creating a potion item
function createPotion() {
  let potion = new Item(
    potionIcon,
    random(100, width - 100),
    random(100, height - 160)
  );
  items.push(potion);
}

// creating a flower item
function createFlower() {
  let flower = new Item(
    flowerIcon,
    random(100, width - 100),
    random(100, height - 160)
  );
  items.push(flower);
}

// creating a snake
function createSnake() {
  let snake = new Item(
    snakeIcon,
    random(100, width - 100),
    random(100, height - 160)
  );
  items.push(snake);
}

// displaying items
function displayItems() {
  for (let i = 0; i < items.length; i++) {
    if (items[i].active === true) {
      items[i].display();
    }
  }
}

// delete (deactivate) item being fed
function deleteItem(item) {
  item.active = false;
  item.picked = false;

  // n variable for the 'isOdd' function
  // this lets the program know wether its time to pickup of put down an item
  n += 1;
  return n;
}

// respawn some items after being fed depending on item type
function respawnFedItems(item) {
  // respawn the grow potion until cat is too big
  if (item.img === potionIcon && cat.bod.w < 800) {
    createPotion();
    // respawn the flower, always
  } else if (item.img === flowerIcon) {
    createFlower();
    // respawn the snake until 6 tails
  } else if (item.img === snakeIcon && cat.numOfTails < 3) {
    createSnake();
  }
  // never respawn the butterfly
}

// cat reacting differetnyl depending on item being fed
function catReactions(item) {
  if (item.img === butterflyIcon) {
    cat.rightWings.active = true;
    cat.leftWings.active = true;
  } else if (item.img === potionIcon) {
    // cat body grow
    cat.bod.w *= 1.5;
    cat.bod.h *= 1.5;

    // cat wings grow and adjustment
    cat.rightWings.w *= 1.3;
    cat.rightWings.h *= 1.3;
    cat.rightWings.offset *= 1.4;
    cat.leftWings.w *= 1.3;
    cat.leftWings.h *= 1.3;
    cat.leftWings.offset *= 1.3;

    // cat tails grow and adjustment
    cat.tailGrowth += 0.8;
    cat.tailHeight += 100;
    cat.leftTail.offset += 100;
    cat.rightTail.offset += 20;
  } else if (item.img === flowerIcon) {
    // cat color changes randomly
    cat.color.r = random(0, 255);
    cat.color.g = random(0, 255);
    cat.color.b = random(0, 255);
  } else if (item.img === snakeIcon) {
    // cat gets another tail
    cat.numOfTails += 1;
  }
}

// pressing 'x' to pick, drop or feed and item, pressing 'space' changes states
function keyPressed() {
  // state navigation with spacebar
  if (state === `info` && keyCode === 32) {
    state = `intro`;

    // start playing ambiant sound here
    ambiantSound.play();
  } else if (state === `intro` && keyCode === 32) {
    state = `simulation`;

    // show first dialogue box and hide it after timer
    dialBox.active = true;
    setTimeout(hideDialogue, 5000);
  } else if (state === `simulation` && keyCode === 32) {
    state = `end`;
  } else if (state === `end` && keyCode === 32) {
    location.reload();
  }

  // actions with 'x' key
  if (!isOdd(n)) {
    // pick item with 'x'
    pickUpItem();
  } else if (isOdd(n)) {
    // check if cat is close
    if (catIsClose()) {
      // feed item with 'x'
      feedItem();
      // say something after cat is fed
      dialogueBox();
    } else {
      // put down item if cat is not close
      putDownItem();
    }
  }
}

// check if n number is odd or not (determines if you pickup or putdown/feed an item)
function isOdd(n) {
  return n % 2;
}

// check the item is to the left of the ghost (user) or not (to the right)
function isLeft() {
  for (let i = 0; i < items.length; i++) {
    if (items[i].x < ghost.pos.x) {
      return true;
    } else if (items[i].x > ghost.pos.x) {
      return false;
    }
  }
}

// check if the user is close enough to an item to pick it up (returns true or false)
function itemIsPickable(item) {
  let d = dist(ghost.eyes.x1, ghost.eyes.y, item.x, item.y);
  if (item.active && d < ghost.bod.w / 2 + item.size / 2 + 5) {
    return true;
  }
}

// check if the user has picked an item and is close to cat
function itemIsFeedable(item) {
  let d = dist(ghost.eyes.x1, ghost.eyes.y, cat.pos.x, cat.pos.y);
  if (d < ghost.bod.w / 2 + cat.bod.w + 20 && item.picked) {
    return true;
  }
}

// check if the ghost is close to the cat
function catIsClose() {
  let d = dist(ghost.eyes.x1, ghost.eyes.y, cat.pos.x, cat.pos.y);
  if (d < ghost.bod.w / 2 + cat.bod.w + 70) {
    return true;
  }
}

// picking up an item
function pickUpItem() {
  for (let i = 0; i < items.length; i++) {
    if (key === "x") {
      if (itemIsPickable(items[i])) {
        items[i].picked = true;

        // n variable for the 'isOdd' function
        // this lets the program know wether its time to pickup of put down an item
        n += 1;
        return n;
      }
    }
  }
}

// putting down an item
function putDownItem() {
  for (let i = 0; i < items.length; i++) {
    if (key === "x") {
      if (items[i].picked) {
        items[i].picked = false;

        // n variable for the 'isOdd' function
        // this lets the program know wether its time to pickup of put down an item
        n += 1;
        return n;
      }
    }
  }
}

// feeding an item
function feedItem() {
  for (let i = 0; i < items.length; i++) {
    if (key === "x") {
      if (itemIsFeedable(items[i])) {
        // respawns some item based on item types
        respawnFedItems(items[i]);

        // deactivate (delete) current item
        deleteItem(items[i]);

        // have the cat react to the item
        catReactions(items[i]);

        // show the next dialogue boxes
        dialBox.active = true;

        // dialogue box stays for 4 seconds before disapearing
        setTimeout(hideDialogue, 4000);
      }
    }
  }
}

// display 'X' to drop or 'X' to pick
function displayText() {
  for (let i = 0; i < items.length; i++) {
    // 'spacebar' to leave always displayed
    push();
    fill(101, 150, 138);
    textAlign(RIGHT);
    textSize(16);
    text(` press 'spacebar' to leave`, (width * 7.7) / 8, (height * 7.8) / 8);
    pop();

    if (itemIsPickable(items[i])) {
      // `'X' to pick` when item is close to ghost and no item in hand
      if (!items[i].picked) {
        push();
        fill(255);
        textSize(18);
        text(`'X' to pick`, items[i].x, items[i].y - 25);
        pop();
        // `'X' to drop` when item is in hand
      } else if (items[i].picked) {
        push();
        fill(255);
        textSize(32);
        text(`'X' to drop`, 80, 100);
        pop();
      }
    }
    // `'X' to feed` when item is near the cat
    if (itemIsFeedable(items[i])) {
      push();
      fill(255);
      textSize(18);
      textAlign(CENTER);
      text(`'X' to feed`, cat.pos.x, (height * 7.8) / 8);
      pop();
    }
  }
}

// display text dialogue box for a few seconds each after the cat is fed
function displayDialogue() {
  if (dialBox.active) {
    dialogueBox();
  }
}

// hide dialogue box after timer
function hideDialogue() {
  dialBox.active = false;
  dialBox.current += 1;
  // returns to the second dialogue entry if every entries has been said
  if (dialBox.current >= dialEntries.length) {
    dialBox.current = 1;
  }
}

// create dialogue boxes
function dialogueBox() {
  // draw the box
  drawDialogueBox();

  // draw the next dialogue entrie
  push();
  textAlign(CENTER);
  textFont(dialogueFont);
  fill(255);
  textSize(24);
  text(dialEntries[dialBox.current], dialBox.x, dialBox.y);
  pop();
}

// drawing dialogue the dialogue box
function drawDialogueBox() {
  dialBox.x = width / 2;
  dialBox.y = height / 4;
  dialBox.w = (width * 55) / 100;
  dialBox.h = 80;

  push();
  rectMode(CENTER);
  fill(dialBox.color.r, dialBox.color.g, dialBox.color.b, dialBox.color.a);
  stroke(
    dialBox.colorStroke.r,
    dialBox.colorStroke.g,
    dialBox.colorStroke.b,
    dialBox.colorStroke.a
  );
  strokeWeight(10);
  rect(dialBox.x, dialBox.y, dialBox.w, dialBox.h, dialBox.corner);
  pop();
}

// create different dialogue entries
function dialogueEntries() {
  let dialogueFirst = `What happens when you feed random stuff to a cat ?`;
  let dialogueA = `I'm not sure this is right`;
  let dialogueB = `I used to be scared of heights`;
  let dialogueC = `will I get in trouble for this?`;
  let dialogueD = `I think this may be a mistake`;
  let dialogueE = `no reason to stop now i guess..`;
  let dialogueF = `This is getting out of hands`;
  let dialogueG = `Ridiculous...`;
  let dialogueH = `There's no way this is good news`;
  let dialogueI = `oh... why did I do that?`;
  let dialogueJ = `I might have created a monster`;

  dialEntries.push(
    dialogueFirst,
    dialogueA,
    dialogueB,
    dialogueC,
    dialogueD,
    dialogueE,
    dialogueF,
    dialogueG,
    dialogueH,
    dialogueI,
    dialogueJ
  );
}
