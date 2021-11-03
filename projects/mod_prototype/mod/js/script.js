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
let torso;
// let leftLeg;

// store all populating circles here (eventualy one array for each body part)
let headCircles = [];
let torsoCircles = [];
// let leftLegCircles = [];

// store all circles array here
let circleArrays = [headCircles, torsoCircles];

// store all body parts here
let bodyParts = [];

// create the canvas, the body parts and populate the body parts with circles
function setup() {
  // create canvas
  createCanvas(750, 750);

  // create the head object, index[0] of bodyParts array
  createHead();
  // create the torso object, index[1] of bodyParts array
  createTorso();

  // create a bunch of circle inside the body parts perimeters
  // for (let i = 0; i < bodyParts.length; i++) {
  //   populate(bodyParts[i], circleArrays[i]);
  // }
  populate(bodyParts[0], headCircles);
  populate(bodyParts[1], torsoCircles);
}

function createBodyPart(
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
) {
  // defining perimeter of the body part, vertex a to vertex i
  let coordinates = [
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
    y9,
  ];
  let va = createVector(coordinates[0], coordinates[1]);
  let vb = createVector(coordinates[2], coordinates[3]);
  let vc = createVector(coordinates[4], coordinates[5]);
  let vd = createVector(coordinates[6], coordinates[7]);
  let ve = createVector(coordinates[8], coordinates[9]);
  let vf = createVector(coordinates[10], coordinates[11]);
  let vg = createVector(coordinates[12], coordinates[13]);
  let vh = createVector(coordinates[14], coordinates[15]);
  let vi = createVector(coordinates[16], coordinates[17]);
  // create body part with Body class
  let currentBodyPart = new Body(va, vb, vc, vd, ve, vf, vg, vh, vi);
  // store head in body parts array for future usage
  bodyParts.push(currentBodyPart);
}

function createHead() {
  let x1 = 236; // (x1,y1) fixed - attached to torso and left arm
  let y1 = 220;
  let x2 = 230;
  let y2 = 194;
  let x3 = 209;
  let y3 = 180;
  let x4 = 183;
  let y4 = 186;
  let x5 = 170;
  let y5 = 207;
  let x6 = 174;
  let y6 = 224;
  let x7 = 184;
  let y7 = 231;
  let x8 = 195;
  let y8 = 238;
  let x9 = 222; // (x9,y9) fixed - attached to torso and right arm
  let y9 = 240;
  createBodyPart(
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
}
function createTorso() {
  let x1 = 236; // (x1,y1) fixed - attached to head and left arm
  let y1 = 220;
  let x2 = 265; // (x2,y2) fixed - attached to left arm
  let y2 = 227;
  let x3 = 303;
  let y3 = 236;
  let x4 = 334; // (x4,y4) fixed - attached to left tigh
  let y4 = 253;
  let x5 = 341; // (x5,y5) fixed - attached to left and right thighs
  let y5 = 287;
  let x6 = 308; // (x6,y6) fixed - attached to right tigh
  let y6 = 303;
  let x7 = 260;
  let y7 = 287;
  let x8 = 237; //(x8,y8) fixed - attached to right arm
  let y8 = 265;
  let x9 = 222; // (x9,y9) fixed - attached to head and right arm
  let y9 = 240;
  createBodyPart(
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
}

// draw elements
function draw() {
  // background
  background(15, 0, 26);

  // displaying body parts
  for (let i = 0; i < bodyParts.length; i++) {
    bodyParts[i].display();
  }

  // displaying the circles in all body parts
  // for (let i = 0; i < circleArrays.length; i++) {
  //   let currentArray = circleArrays[i];
  //   for (let j = 0; j < currentArray.length; j++) {
  //     let currentCircle = currentArray[j];
  //     currentCircle.display();
  //   }
  // }

  for (let i = 0; i < headCircles.length; i++) {
    let currentCircle = headCircles[i];
    currentCircle.display();
  }
  for (let i = 0; i < torsoCircles.length; i++) {
    let currentCircle = torsoCircles[i];
    currentCircle.display();
  }

  // reset the circles arrays every frame
  headCircles = [];
  torsoCircles = [];

  // repopulating the body parts every frame
  // for (let i = 0; i < bodyParts.length; i++) {
  //   populate(bodyParts[i], circleArrays[i]);
  // }
  populate(bodyParts[0], circleArrays[0]);
  populate(bodyParts[1], circleArrays[1]);

  // generative algorithm activated by pressing any key
  if (keyIsPressed === true) {
    stretch();
  }
}

// create a bunch of circles inside the head
// maybe the number of circles could start low (with bigger size), and go up as the number of user interactions go up?
function populate(bodyPart, circleArray) {
  // create an array of the x coordinate from the perimeter array (value inside are from createVertex())
  let xValues = [];
  for (let v = 0; v < bodyPart.perimeter.length; v++) {
    let currentVertX = bodyPart.perimeter[v].x;
    xValues.push(currentVertX);
  }
  // spread operator(...) to unpack values inside the arrays, used with Math.min() and Math.max() -> https://medium.com/coding-at-dawn/the-fastest-way-to-find-minimum-and-maximum-values-in-an-array-in-javascript-2511115f8621
  // get the min and max value from the x coordinate array
  let xMinBorder = Math.min(...xValues);
  let xMaxBorder = Math.max(...xValues);

  // create an array of the y coordinate from the perimeter array
  let yValues = [];
  for (let v = 0; v < bodyPart.perimeter.length; v++) {
    let currentVertY = bodyPart.perimeter[v].y;
    yValues.push(currentVertY);
  }
  // get the min and max value from the y coordinate array
  let yMinBorder = Math.min(...yValues);
  let yMaxBorder = Math.max(...yValues);

  // create a bunch of circles
  let numCircles = 5;
  for (let i = 0; i < numCircles; i++) {
    let currentCircle = new Circle(
      random(xMinBorder, xMaxBorder),
      random(yMinBorder, yMaxBorder)
    );

    // check if current circle overlaps with other circles
    checkOverlap(currentCircle, circleArray);
    // check if current circle is outside polygon perimeter
    checkOutsideHead(currentCircle);

    while (currentCircle.overlapping || currentCircle.outside) {
      currentCircle.x = random(xMinBorder, xMaxBorder);
      currentCircle.y = random(yMinBorder, yMaxBorder);

      // rerun the check, if one is true, redo the while loop
      checkOverlap(currentCircle, circleArray);
      checkOutsideHead(currentCircle);
    }

    // add the current circle to the array
    circleArray.push(currentCircle);
  }
}

// check if the circles overlaps with each other
function checkOverlap(currentCircle, circleArray) {
  // loop trough all the circles
  for (let j = 0; j < circleArray.length; j++) {
    let otherCircle = circleArray[j];
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
    collidePointPoly(
      currentCircle.x,
      currentCircle.y,
      bodyParts[0].perimeter,
      true
    )
  ) {
    currentCircle.outside = false;
  } else {
    currentCircle.outside = true;
  }
}

// lets try to make a gen algorithm, activate when you press a key
function stretch() {
  // this chooses which vert to modify
  let numOfVerts = 5;
  let modifiableVerts = [];

  // loop through the vertex array and select some at random
  for (let i = 0; i < numOfVerts; i++) {
    let currentVert = random(bodyParts[0].perimeter);
    // check if the selected vertex is the first or last.
    // these connect with other body parts and should not be moved.
    while (
      currentVert === bodyParts[0].perimeter[0] ||
      currentVert === bodyParts[0].perimeter[8]
    ) {
      currentVert = random(bodyParts[0].perimeter);
    }
    modifiableVerts.push(currentVert);
  }

  // this determines how the vertices move
  // maybe link this with the name value (the sum of each letter converted into ASCII?)
  let movementValue = sin(100 * frameRate());
  let chance = random();

  // apply the movement to the selected vertices
  for (let i = 0; i < modifiableVerts.length; i++) {
    let currentVert = modifiableVerts[i];

    if (chance > 0.66) {
      currentVert.y += movementValue;
      currentVert.x += movementValue;
    } else currentVert.y -= movementValue;
    currentVert.x -= movementValue;
  }
}
