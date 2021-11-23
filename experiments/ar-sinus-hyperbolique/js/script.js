/**
arc cosinus hyperbolique
*/

"use strict";

let circle = {
  x: 0,
  y: 0,
  size: 10,
  color: 255,
};

let t = 0;

/**
Description of setup
*/
function setup() {
  createCanvas(100, 100);
  background(0);
}

/**
Description of draw()
*/
function draw() {
  background(0, 0, 0, 15);
  let y = Math.acosh(t);
  y *= 10;

  push();
  noStroke();
  fill(255, 200, 200);
  ellipse(t, y, circle.size);
  pop();

  t += 0.1;

  console.log(t, y);
}

function displayCircle(x) {
  push();
  noStroke();
  fill(255, 20, 20, 100);
  ellipse(circle.x, x, circle.size);
  pop();
}
