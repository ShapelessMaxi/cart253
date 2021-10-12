/**
Feed the cat - Simulation
Maxime Perreault

In this simulation game, you navigate from left to right, up and down, to go fetch some items.
You can hold one item at the time and each item can be fed to the "cat". Every item fed to the "cat"
has a different effect, see what each one of them do!

I want this game to have a spooky but cute atmosphere, complete with simple graphics,
a soft and dark color palette and some slightly uncomfortable dialogues.

ps: sorry to whoever sees this code, the 'drawing the cat' portion of the code is very messy. I will
probably never draw a triangle in p5.js ever again :).
*/

"use strict";

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
  tail: {
    x1: undefined,
    y1: undefined,
    x2: undefined,
    y2: undefined,
    x3: undefined,
    y3: undefined,
    x4: undefined,
    y4: undefined,
  },
};

// store item object here
let items = [];

let butterflyIcon = undefined;
let potionIcon = undefined;
let flowerIcon = undefined;

// preloading the cloud and icon images
function preload() {
  cloudA.img = loadImage(`assets/images/cloud1.png`);
  cloudB.img = loadImage(`assets/images/cloud2.png`);
  cloudC.img = loadImage(`assets/images/cloud3.png`);

  butterflyIcon = loadImage(`assets/images/item_butterfly.png`);
  potionIcon = loadImage(`assets/images/item_potion.png`);
  flowerIcon = loadImage(`assets/images/item_flower.png`);
}

// creating the canvas
// defining an interval to change the position of the stars every few seconds
function setup() {
  createCanvas(windowWidth, windowHeight);
  setInterval(changeStarSeed, 2500);

  createItems();
}

// drawing game elements and setting up states
function draw() {
  drawBackground();
  drawCharacters();
  movement();
  displayItems();
  displayText();
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
  // define a ratio to adjust the cloud size to screen size and define a tint
  let cloudRatio = windowWidth / 1000;
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
// drawing the ghot (user)
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
  // drawing ghost eyes
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
  // drawing the cat's tail
  push();
  noFill();
  stroke(cat.color.r, cat.color.g, cat.color.b, cat.color.a);
  strokeWeight(8);
  bezier(
    cat.tail.x1,
    cat.tail.y1,
    cat.tail.x2,
    cat.tail.y2,
    cat.tail.x3,
    cat.tail.y3,
    cat.tail.x4,
    cat.tail.y4
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
    ghost.bod.h += height / 90;
  } else if (keyIsDown(DOWN_ARROW)) {
    ghost.bod.h -= height / 90;
  }
  if (keyIsDown(LEFT_ARROW)) {
    ghost.pos.x -= width / 180;
    ghost.eyes.x1 = ghost.pos.x - 5;
    ghost.eyes.x2 = ghost.eyes.x1 - 15;
  } else if (keyIsDown(RIGHT_ARROW)) {
    ghost.pos.x += width / 180;
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
    // flipping the tail
    cat.tail.x1 = cat.pos.x + 100;
    cat.tail.x2 = cat.tail.x1 - 78;
    cat.tail.x3 = cat.tail.x1 + 10;
    cat.tail.x4 = cat.tail.x2 + 10;
    cat.tail.y1 = cat.top.y;
    cat.tail.y2 = cat.tail.y1;
    cat.tail.y3 = cat.tail.y1 + 50;
    cat.tail.y4 = cat.tail.y3 - 5;
  } else if (ghost.pos.x > cat.pos.x) {
    // flipping the eyes and pupils
    cat.eyes.x1 = cat.pos.x + 5;
    cat.eyes.x2 = cat.pos.x + 25;
    cat.pupil.x1 = cat.eyes.x1 + 2;
    cat.pupil.x2 = cat.eyes.x2 + 2;
    // flipping the tail
    cat.tail.x1 = cat.pos.x - 100;
    cat.tail.x2 = cat.tail.x1 + 78;
    cat.tail.x3 = cat.tail.x1 - 10;
    cat.tail.x4 = cat.tail.x2 - 10;
    cat.tail.y1 = cat.top.y;
    cat.tail.y2 = cat.tail.y1;
    cat.tail.y3 = cat.tail.y1 + 50;
    cat.tail.y4 = cat.tail.y3 - 5;
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
  let butterfly = new Item(
    butterflyIcon,
    random(100, width - 100),
    random(100, height - 160)
  );
  items.push(butterfly);
  // this item makes the cat grow bigger
  let potion = new Item(
    potionIcon,
    random(100, width - 100),
    random(100, height - 160)
  );
  items.push(potion);
  // this item changes the cat's color
  let flower = new Item(
    flowerIcon,
    random(100, width - 100),
    random(100, height - 160)
  );
  items.push(flower);
}
// displaying items
function displayItems() {
  for (let i = 0; i < items.length; i++) {
    if (items[i].active === true) {
      items[i].display();
    }
  }
}
// pressing 'x' to pick, drop or feed and item
function keyPressed() {
  console.log(`n is =`, n);
  if (!isOdd(n)) {
    pickUpItem();
  } else if (isOdd(n)) {
    if (catIsClose()) {
      feedItem();
    } else {
      putDownItem();
    }
  }
}
// check if n number is odd or not
function isOdd(n) {
  return n % 2;
}
// picking up an item
function pickUpItem() {
  for (let i = 0; i < items.length; i++) {
    if (key === "x") {
      if (itemIsPickable(items[i])) {
        items[i].picked = true;
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
        items[i].active = false;
        items[i].picked = false;
        n += 1;
        return n;
      }
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
  if (d < ghost.bod.w / 2 + cat.bod.w + 70 && item.picked) {
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

// display 'X' to drop or 'X' to pick
function displayText() {
  for (let i = 0; i < items.length; i++) {
    if (itemIsPickable(items[i])) {
      // `'X' to pick` when item is close to ghost and no item in hand
      if (!items[i].picked) {
        push();
        fill(255);
        textSize(18);
        text(`'X' to pick`, items[i].x, items[i].y - 25);
        pop();
        // `'X' to drop` when item iis in hand
      } else if (items[i].picked) {
        push();
        fill(255);
        textSize(32);
        text(`'X' to drop`, 100, 100);
        pop();
      }
    }
    if (itemIsFeedable(items[i])) {
      push();
      fill(255);
      textSize(18);
      text(`'X' to feed`, cat.pos.x, cat.pos.y);
      pop();
    }
  }
}
// display 'X' to pick, when close to items
function displayPickText() {}
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
