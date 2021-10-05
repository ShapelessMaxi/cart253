/**
Feed the cat - Simulation
Maxime Perreault

In this simulation game, you navigate from left to right, up and down, to go fetch some items.
You can hold one item at the time and each item can be fed to the "cat". Every item fed to the "cat"
has a different effect, see what each one of them do!

I want this game to have a spooky but cute atmosphere, complete with simple graphics,
a soft and dark color palette and some slightly uncomfortable dialogues.
*/

"use strict";

let cloudA = { img: undefined, x: 0, y: 20, vx: 0.2 };
let cloudB = { img: undefined, x: 200, y: 380, vx: 0.5 };
let cloudC = { img: undefined, x: 500, y: 160, vx: 0.4 };

let groundLevel = undefined;

let ghost = {
  pos: { x: 200, y: undefined },
  bod: { w: 40, h: 100 },
  top: { x: undefined, y: undefined },
  color: { r: 240, g: 240, b: 140, a: 100 },
  eyes: {
    x1: undefined,
    y1: undefined,
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

// preloading images
function preload() {
  cloudA.img = loadImage(`assets/images/cloud1.png`);
  cloudB.img = loadImage(`assets/images/cloud2.png`);
  cloudC.img = loadImage(`assets/images/cloud1.png`);
}

// creating the canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// drawing fun stuff
function draw() {
  drawBackground();
  movement();
  drawCharacters();
}

// drawing background
function drawBackground() {
  // still part of the background
  stillBackground();
  // animated part of the background
  animatedBackground();
}
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
// defining movemements for background elements
function animatedBackground() {
  stars();
  clouds();
}
function stars() {
  let numOfStars = 50;
  for (let i = 0; i < numOfStars; i++) {
    push();
    stroke(54, 143, 153, 300);
    strokeWeight(5);
    let x = random(30, width - 30);
    let y = random(30, height - 100);
    point(x, y);
    pop();
  }
}
function clouds() {
  // drawing the clouds and adding movement to them
  tint(102, 113, 138, 200);
  cloudA.x -= cloudA.vx;
  if (cloudA.x < -1001) {
    cloudA.x = width;
  }
  // change size of the clouds bigger if screen is bigger
  image(cloudA.img, cloudA.x, cloudA.y, 1001, 167);
  cloudB.x -= cloudB.vx;
  if (cloudB.x < -1037.5) {
    cloudB.x = width;
  }
  image(cloudB.img, cloudB.x, cloudB.y, 1037.5, 131.5);
  cloudC.x -= cloudC.vx;
  if (cloudC.x < -490.5) {
    cloudC.x = width;
  }
  image(cloudC.img, cloudC.x, cloudC.y, 490.5, 84);
}

// drawing characters
function drawCharacters() {
  // defining the ground level
  groundLevel = height - 50;
  drawGhost();
  drawCat();
}
function drawGhost() {
  // DRAWING THE GHOST
  rectMode(CENTER);
  fill(ghost.color.r, ghost.color.g, ghost.color.b, ghost.color.a);
  // drawing main rectangle
  ghost.pos.y = groundLevel;
  rect(ghost.pos.x, ghost.pos.y - ghost.bod.h / 2, ghost.bod.w, ghost.bod.h);
  // drawing top half circle
  ghost.top.x = ghost.pos.x;
  ghost.top.y = ghost.pos.y - ghost.bod.h;
  arc(ghost.top.x, ghost.top.y, ghost.bod.w, ghost.bod.w, PI, TWO_PI);
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
function drawCat() {
  // DRAWING THE CAT
  rectMode(CENTER);
  fill(cat.color.r, cat.color.g, cat.color.b, cat.color.a);
  // drawing main rectangle
  cat.pos.y = groundLevel;
  cat.pos.x = width - 350;
  rect(cat.pos.x, cat.pos.y - cat.bod.h / 2, cat.bod.w, cat.bod.h);
  // drawing top half circle
  cat.top.x = cat.pos.x;
  cat.top.y = cat.pos.y - cat.bod.h;
  arc(cat.top.x, cat.top.y, cat.bod.w, cat.bod.h, PI, TWO_PI);
  // drawing the ears
  push();
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
  // drawing cat eyes
  cat.eyes.y = cat.pos.y - cat.bod.h + 5;
  push();
  fill(cat.eyes.color.r, cat.eyes.color.g, cat.eyes.color.b, cat.eyes.color.a);
  ellipse(cat.eyes.x1, cat.eyes.y, cat.eyes.w1, cat.eyes.h);
  ellipse(cat.eyes.x2, cat.eyes.y, cat.eyes.w2, cat.eyes.h);
  pop();
  // drawing the pupils
  push();
  fill(0);
  ellipse(cat.pupil.x1, cat.eyes.y, cat.pupil.w, cat.pupil.h);
  ellipse(cat.pupil.x2, cat.eyes.y, cat.pupil.w, cat.pupil.h);
  pop();
  // drawing the tail
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

// defining movemements of the characters
function movement() {
  ghostMovement();
  catMovement();
}
function ghostMovement() {
  // moving the ghost and flipping the eyes with arrow keys
  ghost.pos.x = constrain(ghost.pos.x, 62, width - 62);
  ghost.bod.h = constrain(ghost.bod.h, 80, height - 110);
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
function catMovement() {
  // moving the cat's eyes and tail with ghost position
  if (ghost.pos.x < cat.pos.x) {
    // eyes and pupils
    cat.eyes.x1 = cat.pos.x - 5;
    cat.eyes.x2 = cat.pos.x - 25;
    cat.pupil.x1 = cat.eyes.x1 - 2;
    cat.pupil.x2 = cat.eyes.x2 - 2;
    // tail
    cat.tail.x1 = cat.pos.x + 100;
    cat.tail.x2 = cat.tail.x1 - 78;
    cat.tail.x3 = cat.tail.x1 + 10;
    cat.tail.x4 = cat.tail.x2 + 10;
    cat.tail.y1 = cat.top.y;
    cat.tail.y2 = cat.tail.y1;
    cat.tail.y3 = cat.tail.y1 + 50;
    cat.tail.y4 = cat.tail.y3 - 5;
  } else if (ghost.pos.x > cat.pos.x) {
    // eyes and pupils
    cat.eyes.x1 = cat.pos.x + 5;
    cat.eyes.x2 = cat.pos.x + 25;
    cat.pupil.x1 = cat.eyes.x1 + 2;
    cat.pupil.x2 = cat.eyes.x2 + 2;
    // tail
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
