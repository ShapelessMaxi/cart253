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

let cloudA = undefined;

let ghost = {
  pos: { x: 200, y: undefined },
  bod: { w: 40, h: 100 },
  top: { x: undefined, y: undefined },
  eyes: {
    x1: undefined,
    y1: undefined,
    x2: undefined,
    w1: 12,
    w2: 10,
    h: 17,
    color: { r: 50, g: 10, b: 10, a: 200 },
  },
  color: { r: 240, g: 240, b: 140, a: 100 },
};
let cat = {
  x: undefined,
  y: undefined,
  size: 50,
};

/**
preloading images
*/
function preload() {}

/**
creating the canvas and preloading images
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  cloudA = image(`assets/images/could1.png`);
}

/**
drawing fun stuff
*/
function draw() {
  //DRAWING THE BACKGROUND
  background(92, 138, 126);
  noStroke();
  rectMode(CENTER);
  // drawing the sky
  fill(63, 92, 99, 100);
  rect(width / 2, 0, width, 800);
  rect(width / 2, 0, width, 500);
  rect(width / 2, 0, width, 200);
  // drwaing the clouds

  // drawing the frame
  fill(237, 230, 242);
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
  fill(63, 92, 99);
  ellipse(width / 2, height, 1400, 180);

  // moving the ghost and flipping the eyes with arrow keys
  ghost.pos.x = constrain(ghost.pos.x, 62, width - 62);
  ghost.bod.h = constrain(ghost.bod.h, 80, 468);
  if (keyIsDown(UP_ARROW)) {
    ghost.bod.h += 5;
  } else if (keyIsDown(DOWN_ARROW)) {
    ghost.bod.h -= 5;
  }
  if (keyIsDown(LEFT_ARROW)) {
    ghost.pos.x -= 5;
    ghost.eyes.x1 = ghost.pos.x - 5;
    ghost.eyes.x2 = ghost.eyes.x1 - 15;
  } else if (keyIsDown(RIGHT_ARROW)) {
    ghost.pos.x += 5;
    ghost.eyes.x1 = ghost.pos.x + 5;
    ghost.eyes.x2 = ghost.eyes.x1 + 15;
  }

  // DRAWING THE GHOST
  rectMode(CENTER);
  fill(ghost.color.r, ghost.color.g, ghost.color.b, ghost.color.a);
  // drawing main rectangle
  ghost.pos.y = height - 50;
  rect(ghost.pos.x, ghost.pos.y - ghost.bod.h / 2, ghost.bod.w, ghost.bod.h);
  // drawint top half circle
  ghost.top.x = ghost.pos.x;
  ghost.top.y = ghost.pos.y - ghost.bod.h;
  arc(ghost.top.x, ghost.top.y, ghost.bod.w, ghost.bod.w, PI, TWO_PI);
  // drawing eyes
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

  // drawing the cat (replace with image later?)
  rectMode(CORNER);
  cat.x = width - 200;
  cat.y = height - 100;
  rect(cat.x, cat.y, cat.size);

  rect(0, 0, 500, 200);
}

function keyIsDown() {}
