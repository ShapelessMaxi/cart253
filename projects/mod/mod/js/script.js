/**
mod()
Maxime Perreault

this is the project 2 prototype (name is a placeholder).

probably a narrative sandbox game that makes you think about what it means to
have a body, to have authority over it, and to modify it.

to learn more about the program plan, the concept, the story and everything
in-between, see the proposal's pdf.
*/

"use strict";

// body parts
let head;
// let leftArm;
// let rightArm;

// store all body parts here
let bodyParts = [];
// store all populating circles here (eventualy one array for each body part)
let headCircles = [];

function preload() {}

function setup() {
  createCanvas(750, 750);

  createHead();
}

function createHead() {
  // defining perimeter of the head
  let x1 = 30;
  let y1 = 80;
  let x2 = 100;
  let y2 = 30;
  let x3 = 200;
  let y3 = 50;
  let x4 = 250;
  let y4 = 110;
  let x5 = 250;
  let y5 = 200;
  let x6 = 200;
  let y6 = 250;
  let x7 = 110;
  let y7 = 300;
  let x8 = 30;
  let y8 = 250;
  let x9 = 10;
  let y9 = 160;
  // create head with Body class
  head = new Body(
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    x4,
    y4,
    x5,
    y5,
    x6,
    y6,
    x7,
    y7,
    x8,
    y8,
    x9,
    y9
  );
  // store head in body parts array for future usage
  bodyParts.push(head);

  // populating the head with circles
  populateHead();
}

function draw() {
  // background
  background(0);

  // displaying body parts
  head.display();

  // displaying the circles in all body parts
  for (let i = 0; i < headCircles.length; i++) {
    let currentCircle = headCircles[i];
    currentCircle.display();
  }
}

function populateHead() {
  let numCircles = 10;

  // spread operator(...) to unpack values inside the arrays, used with Math.min() and Math.max() from:
  // -> https://medium.com/coding-at-dawn/the-fastest-way-to-find-minimum-and-maximum-values-in-an-array-in-javascript-2511115f8621
  let xMinBorder = Math.min(...head.xArray);
  let xMaxBorder = Math.max(...head.xArray);
  let yMinBorder = Math.min(...head.yArray);
  let yMaxBorder = Math.max(...head.yArray);

  for (let i = 0; i < numCircles; i++) {
    let currentCircle = new Circle(
      random(xMinBorder, xMaxBorder),
      random(yMinBorder, yMaxBorder)
    );
    checkOverlap(currentCircle);
    if (!currentCircle.overlapping) {
      headCircles.push(currentCircle);
    }
  }
}

function checkOverlap(currentCircle) {
  for (let j = 0; j < headCircles.length; j++) {
    let otherCircle = headCircles[j];
    let d = dist(
      otherCircle.x,
      otherCircle.y,
      currentCircle.x,
      currentCircle.y
    );
    if ((d < currentCircle.size / 2, otherCircle.size / 2)) {
      currentCircle.overlapping = true;
    }
  }
}

// lets do math to know if circles are inside polygon shape...
// maybe solution in there -> http://www.jeffreythompson.org/collision-detection/point-circle.php
function checkOutside() {
  for (let i = 0; i < headCircles.length; i++) {
    let currentCircle = headCircles[i];
  }
}
