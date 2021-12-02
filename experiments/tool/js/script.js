"use strict";

function preload() {}

let circle = {
  x: undefined,
  y: undefined,
  size: undefined,
  color: { r: 100, g: 150, b: 100, a: 200 },
};

function setup() {
  createCanvas(638, 825);
}

function draw() {
  background(105, 88, 87, 10);

  circle.x = mouseX;
  circle.y = mouseY;

  circle.size = random(95, 110);

  push();
  noStroke();
  fill(circle.color.r, circle.color.g, circle.color.b, circle.color.a);
  ellipse(circle.x, circle.y, circle.size);
  pop();

  push();
  textStyle(BOLD);
  textAlign(CENTER);
  textFont("Helvetica");
  fill(255);
  textSize(85);
  text(`MOUSE INPUT`, width / 2, 100);
  pop();

  push();
  textAlign(LEFT);
  fill(255);
  textStyle(NORMAL);
  textFont("Helvetica");
  textSize(17);
  text(
    `In my mixed digital media practice, I make use of various tools.
I think one of the most important one that is often taken for granted
is the mouse input. I work mostly on computers, and without a mouse
or a trackpad, I wouldn’t be close to being able to produce the images
and animations I love to create. It’s also a great way to have people
interact with the programs I write. `,
    28,
    150
  );
  pop();

  push();
  textAlign(CENTER);
  fill(255);
  textStyle(NORMAL);
  textFont("Helvetica");
  textSize(15);
  text(
    `What you see here in the background is a small
interactive program I coded to display the position of my mouse`,
    width / 2,
    780
  );
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
