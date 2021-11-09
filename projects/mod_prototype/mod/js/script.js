/**
mod()
Maxime Perreault

this is the project 2 prototype (name is a placeholder).

probably a narrative sandbox game that makes you think about what it means to
have a body, to have authority over it, and to modify it.

to learn more about the program plan, the concept, the story and everything
in-between, see the proposal's pdf.

also im using p5.2dcollide librairy to cofine circles into the bodyparts (complex polygons).
*/

"use strict";

// body parts
let head;
let torso;
// let rightUpperArm;

// store all populating circles here (eventualy one array for each body part)
let headCircles = [];
let torsoCircles = [];
// let rightUpperArmCircles = [];

// store all circles array here
let circleArrays = [];

// store all body parts here
let bodyParts = [];

// create the canvas, the body parts and populate the body parts with circles
function setup() {
  // create canvas
  createCanvas(750, 750);

  // create the head object, index[0] of bodyParts array
  createHead();
  head = bodyParts[0];

  // create the torso object, index[1] of bodyParts array
  createTorso();
  torso = bodyParts[1];

  // create the right upper arm object, index[2] of bodyParts array
  // createRighUpperArm();
  // rightUpperArm = bodyParts[2];
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

// create head object (body Class)
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
// create torso object (body Class)
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
// create right upper arm object (body Class)
// function createRighUpperArm() {}

// draw elements
function draw() {
  // background
  background(37, 19, 69);

  // displaying body parts
  for (let i = 0; i < bodyParts.length; i++) {
    bodyParts[i].display();
  }

  // repopulate the circle arrays every few frames
  if (frameCount % 3 === 0) {
    // reset the circles arrays every frame
    head.circleArray = [];
    torso.circleArray = [];
    // rightUpperArm.circleArray = [];

    // populate each arrays with circles
    head.populate();
    torso.populate();
    // rightUpperArm.populate();
  }

  // generative algorithm activated by pressing any key (only affects head for now)
  if (keyIsPressed === true) {
    stretch();
  }
}

// lets try to make a gen algorithm, activate when you press a key
function stretch() {
  // this chooses which vert to modify
  let numOfVerts = 3;
  let modifiableVerts = [];

  // loop through the vertex array and select some at random
  for (let i = 0; i < numOfVerts; i++) {
    let currentVert = random(head.perimeter);
    // check if the selected vertex is the first or last.
    // these connect with other body parts and should not be moved.
    while (
      currentVert === head.perimeter[0] ||
      currentVert === head.perimeter[8]
    ) {
      currentVert = random(head.perimeter);
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
