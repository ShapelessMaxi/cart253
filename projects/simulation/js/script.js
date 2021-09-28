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

let ghost = {
  pos: { x: 200, y: undefined },
  bod: { w: 40, h: 100 },
  top: { x: undefined, y: undefined },
  color: { r: 240, g: 240, b: 140, a: 100 },
};

let cat = {
  x: 1000,
  y: 1000,
};

/**
Description of preload
*/
function preload() {}

/**
creating the canvas
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
}

/**
Description of draw()
*/
function draw() {
  // draw ghost
  // ghost.pos.x = 100;
  // ghost.pos.y = windowHeight - 100;

  //drawing the background
  background(92, 138, 126);
  noStroke();
  fill(63, 92, 99);
  ellipse(width / 2, height, 1300, 200);
  rectMode(CENTER);
  fill(63, 92, 99, 100);
  rect(width / 2, 0, width, 800);
  rect(width / 2, 0, width, 500);
  rect(width / 2, 0, width, 200);

  // moving the ghost with arrow keys
  if (keyIsDown(UP_ARROW)) {
    ghost.bod.h -= 10;
  } else if (keyIsDown(DOWN_ARROW)) {
    ghost.bod.h += 10;
  }
  if (keyIsDown(LEFT_ARROW)) {
    ghost.pos.x -= 5;
  } else if (keyIsDown(RIGHT_ARROW)) {
    ghost.pos.x += 5;
  }

  // drawing the ghost
  rectMode(CENTER);
  fill(ghost.color.r, ghost.color.g, ghost.color.b, ghost.color.a);

  ghost.pos.y = height - 100;
  rect(ghost.pos.x, ghost.pos.y, ghost.bod.w, ghost.bod.h);

  ghost.top.x = ghost.pos.x;
  ghost.top.y = ghost.pos.y - ghost.bod.h / 2;
  arc(ghost.top.x, ghost.top.y, ghost.bod.w, ghost.bod.w, PI, TWO_PI);
}

function keyIsDown() {}
