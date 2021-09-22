"use strict";

let rectangle = {
  x: 150,
  y: 150,
  size: 150,
  speed: 1.01,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  strokeWeight(3);
  stroke(255);
  drawingContext.setLineDash([20, 5, 5, 5, 5, 5, 5, 5]);
  line(10, 50, 390, 50);

  noFill();
  stroke(255);
  rectMode(CENTER);
  rectangle.y = height/2;
  rect(rectangle.x, rectangle.y, rectangle.size, rectangle.size);
  rectangle.x *= rectangle.speed;
  rectangle.x = constrain(rectangle.x, 0, width);
}
