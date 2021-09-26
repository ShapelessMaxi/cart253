/**
Conditionals tutorial
Maxime Perreault
*/

"use strict";

let angle = 0;
let rectScale = 0;
let clownImg;

function preload() {
  clownImg = loadImage("assets/images/clown.png");
}

function setup() {
  createCanvas(500, 500);
  background(100, 100, 200);
}

function draw() {
  imageMode(CENTER);
  image(clownImg, 0, 0);

  push();
  fill(200, 20, 20, 5);
  rectMode(CENTER);
  translate(width / 2, height / 2);
  rotate(angle);
  scale(rectScale);
  rect(0, 0, 100, 100);
  pop();

  angle += 0.05;
  rectScale += 0.008;
}
