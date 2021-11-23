/**
arc cosinus hyperbolique
*/

"use strict";

let circle = {
  x: undefined,
  y: undefined,
  size: 10,
};

let t = 0;
let f = 150;

/**
Description of setup
*/
function setup() {
  createCanvas(300, 300);
  background(0);
}

/**
Description of draw()
*/
function draw() {
  // goes down and left
  dlCurve();

  // goes up and right
  urCurve();
}

function dlCurve() {
  let y = Math.acosh(t);
  y *= 20;

  push();
  noStroke();
  fill(255, 200, 200, 10);
  ellipse(t, y, circle.size);
  pop();

  t += 0.1;
}

function urCurve() {
  let y = Math.acosh(f);
  y *= 25;

  push();
  noStroke();
  fill(0, 255, 255, 10);
  ellipse(f, y, circle.size);
  pop();

  f -= 0.1;
  // console.log(i, y);
}
