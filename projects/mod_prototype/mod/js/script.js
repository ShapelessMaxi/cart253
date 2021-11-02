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

// store all populating circles here (eventualy one array for each body part)
let headCircles = [];

// store all body parts here
let bodyParts = [];

function setup() {
  // create canvas
  createCanvas(400, 400);

  // create head outline
  createHead();

  // create a bunch of circle inside the head perimeter
  populateHead();
}

// create the head perimeter
function createHead() {
  // defining perimeter of the head, vertex a to vertex i
  let va = createVector(30, 80);
  let vb = createVector(100, 30);
  let vc = createVector(200, 50);
  let vd = createVector(250, 110);
  let ve = createVector(250, 200);
  let vf = createVector(200, 250);
  let vg = createVector(110, 300);
  let vh = createVector(30, 250);
  let vi = createVector(10, 160);
  // create head with Body class
  head = new Body(va, vb, vc, vd, ve, vf, vg, vh, vi);
  // store head in body parts array for future usage
  bodyParts.push(head);
}

// draw elements
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

  // reset the head circles array and repopulate it every frame
  headCircles = [];
  populateHead();
}

// create a bunch of circles inside the head
function populateHead() {
  // create an array of the x coordinate from the perimeter array (value inside are from createVertex())
  let xValues = [];
  for (let v = 0; v < head.perimeter.length; v++) {
    let currentVertX = head.perimeter[v].x;
    xValues.push(currentVertX);
  }
  // spread operator(...) to unpack values inside the arrays, used with Math.min() and Math.max() from:
  // -> https://medium.com/coding-at-dawn/the-fastest-way-to-find-minimum-and-maximum-values-in-an-array-in-javascript-2511115f8621
  // get the min and max value from the x coordinate array
  let xMinBorder = Math.min(...xValues);
  let xMaxBorder = Math.max(...xValues);

  // create an array of the y coordinate from the perimeter array
  let yValues = [];
  for (let v = 0; v < head.perimeter.length; v++) {
    let currentVertY = head.perimeter[v].y;
    yValues.push(currentVertY);
  }
  // get the min and max value from the y coordinate array
  let yMinBorder = Math.min(...yValues);
  let yMaxBorder = Math.max(...yValues);

  // create a bunch of circles
  let numCircles = 150;
  for (let i = 0; i < numCircles; i++) {
    let currentCircle = new Circle(
      random(xMinBorder, xMaxBorder),
      random(yMinBorder, yMaxBorder)
    );

    // check if current circle overlaps with other circles
    checkOverlap(currentCircle);
    // check if current circle is outside polygon perimeter
    checkOutsideHead(currentCircle);

    while (currentCircle.overlapping || currentCircle.outside) {
      currentCircle.x = random(xMinBorder, xMaxBorder);
      currentCircle.y = random(yMinBorder, yMaxBorder);

      // rerun the check, if one is true, redo the while loop
      checkOverlap(currentCircle);
      checkOutsideHead(currentCircle);
    }

    // add the current circle to the array
    headCircles.push(currentCircle);
  }
}

// check if the circles overlaps with each other
function checkOverlap(currentCircle) {
  // loop trough all the circles
  for (let j = 0; j < headCircles.length; j++) {
    let otherCircle = headCircles[j];
    let d = dist(
      otherCircle.x,
      otherCircle.y,
      currentCircle.x,
      currentCircle.y
    );
    if (d < currentCircle.size / 2 + otherCircle.size / 2) {
      currentCircle.overlapping = true;
      break;
    } else {
      currentCircle.overlapping = false;
    }
  }
}

// check if the circles are outside of the head perimeter using collide2D librairy
function checkOutsideHead(currentCircle) {
  if (
    collidePointPoly(currentCircle.x, currentCircle.y, head.perimeter, true)
  ) {
    currentCircle.outside = false;
  } else {
    currentCircle.outside = true;
  }
}