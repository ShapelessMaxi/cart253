"use strict";

function preload() {}

let circle = {
  x: undefined,
  y: undefined,
  size: undefined,
  color: { r: 100, g: 150, b: 100, a: 200 },
};

function setup() {
  createCanvas(2550, 3300);
}

function draw() {
  background(105, 88, 87, 10);

  circle.x = mouseX;
  circle.y = mouseY;

  circle.size = random(380, 450);

  push();
  noStroke();
  fill(circle.color.r, circle.color.g, circle.color.b, circle.color.a);
  ellipse(circle.x, circle.y, circle.size);
  pop();
}

function mousePressed() {
  console.log(`ooo`);
  circle.color.r = 80;
  circle.color.g = 180;
  circle.color.b = 150;
  circle.color.a = 100;
}

function mouseReleased() {
  circle.color.r = 100;
  circle.color.g = 150;
  circle.color.b = 100;
  circle.color.a = 200;
}
