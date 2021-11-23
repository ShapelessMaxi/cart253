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
let i = 15;
let u = -50;

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
  // goes down and left
  dlCurve();

  // goes up and right
  // ulCurve();

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
  let y = Math.acosh(i);
  y *= 25;

  push();
  noStroke();
  fill(0, 255, 255, 10);
  ellipse(i, y, circle.size);
  pop();

  i -= 0.1;
  console.log(i, y);
}
//
// function ulCurve() {
//   let y = Math.acosh(u);
//   y *= -20;
//
//   push();
//   noStroke();
//   fill(0, 0, 255, 10);
//   ellipse(u, y, circle.size);
//   pop();
//
//   u += 0.1;
//
//   console.log(u, y);
// }
