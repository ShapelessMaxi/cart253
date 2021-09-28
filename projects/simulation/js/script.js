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
  pos: { x: undefined, y: undefined },
  bod: { w: 20, h: 50 },
  arm: { angle: 0, length: 10 },
  color: { r: 240, g: 240, b: 140, a: 80 },
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
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(92, 138, 126);
  noStroke();
  fill(63, 92, 99);
  ellipse(width / 2, height, 1200, 100);
  rectMode(CENTER);
  fill(63, 92, 99, 100);
  rect(width / 2, 0, width, 900);
  rect(width / 2, 0, width, 600);
  rect(width / 2, 0, width, 300);
}

/**
Description of draw()
*/
function draw() {
  // draw ghost
  ghost.pos.x = 100;
  ghost.pos.y = windowHeight - 100;
  rectMode(CORNER);
  fill(ghost.color.r, ghost.color.g, ghost.color.b, ghost.color.a);
  rect(ghost.pos.x, ghost.pos.y, ghost.bod.w, ghost.bod.h);
}

function keyIsPressed() {
  ghost.pos.x += 5;
}
