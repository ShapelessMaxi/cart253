/**
mod()
Maxime Perreault

this is the project 2 prototype (name is a placeholder).

probably a narrative sandbox game that makes you think about what it means to
have a body, to have authority over it, and to modify it.

to learn more about the program plan, the concept, the story and everything
in-between, see the proposal's pdf.

also im using p5.2dcollide librairy to confine atoms into the bodyparts (complex polygons).
*/

"use strict";

// store all body parts here
let bodyParts = [];
// below is the list of body parts with their index number (order of creation), useful for future reference?
/*
head - bodyParts[0]
torso - bodyParts[1]
*/

// create the canvas, the body parts and populate the body parts with atoms
function setup() {
  // create canvas
  createCanvas(750, 750);

  // create the head object
  createHead();

  // create the torso object
  createTorso();
}

// create a body part using a total of 18 parameters (9 (x,y) coordinate points).
// format of the paramters is: x1,y1,x2,y2,(...),x9,y9.
// paramters are given in specific bodypart creation functions, ie.: createHead().
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
  // defining perimeter of the body part, vertex a = x1,y1 - vertex i = x9,y9
  let va = createVector(x1, y1);
  let vb = createVector(x2, y2);
  let vc = createVector(x3, y3);
  let vd = createVector(x4, y4);
  let ve = createVector(x5, y5);
  let vf = createVector(x6, y6);
  let vg = createVector(x7, y7);
  let vh = createVector(x8, y8);
  let vi = createVector(x9, y9);
  // create body part with Body class
  let currentBodyPart = new Body(va, vb, vc, vd, ve, vf, vg, vh, vi);
  // store head in body parts array for future usage
  bodyParts.push(currentBodyPart);
}

// create the head object
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

// create the torso object
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

// draw the background, the body and the atoms
// call generative algorithms (keyIsPressed)
function draw() {
  // background
  background(37, 19, 69);

  // displaying body parts
  for (let i = 0; i < bodyParts.length; i++) {
    let currentBodyPart = bodyParts[i];
    currentBodyPart.displayPolygon();
  }

  // call methods from Body class every 3 frames
  if (frameCount % 3 === 0) {
    // itterate through the list of body parts
    for (let i = 0; i < bodyParts.length; i++) {
      let currentBodyPart = bodyParts[i];

      // reset the atoms arrays
      currentBodyPart.atomArray = [];

      // populate each arrays with atoms
      currentBodyPart.populate();

      // display atoms
      currentBodyPart.displayAtoms();
    }
  }

  // generative algorithm activated by pressing any key (only affects head for now)
  if (keyIsPressed === true) {
    stretchHead();
  }
}

// lets try to make a gen algorithm, activate when you press a key
/*
when the shape gets too small, since the atoms cannot overlap, the program crashes.
possible solutions:
- check if the area is too small and stop the user from using this algorithm (boring, I don't want an specific ending)
- link the size of the atoms to the surface area (prob wont fix completely, but it'll help, maybe?)
(surface area is already calculated in populate() method of body class)

- check on which side the modifable vert is from the center of the shape, and apply
the movement in a way the shape will stretch more than it'll shrink.
exemple for the x position:
33% chance of verts left of center getting the movementValue added and verts right of center getting it substracted (shrink)
66% chance of verts left of center getting the movementValue substracted and verts right of center getting it added (stretch)
(still have stop the algo if the area is too small or something)

- make another algorithm to separate to stretching and shrinking
(still have stop the algo if the area is too small or something)
*/
function stretchHead() {
  // single out the head from the bodyParts array
  let head = bodyParts[0];

  // choose a number of vertices to modify
  let numOfVerts = 3;
  let modifiableVerts = [];

  // loop through the perimeter array and select some at random
  for (let i = 0; i < numOfVerts; i++) {
    let currentVert = random(head.perimeter);
    // check if the selected vertex is the first or last
    // (these connect with other body parts and should not be moved)
    while (
      currentVert === head.perimeter[0] ||
      currentVert === head.perimeter[8]
    ) {
      currentVert = random(head.perimeter);
    }
    modifiableVerts.push(currentVert);
  }

  // this determines how the vertices move
  // maybe link this with the name value? (the sum of each letter converted into ASCII?)
  let movementValue = sin(100 * frameRate());

  // get a float value between 0 and 1
  let chance = random(0, 1);

  // apply the movement to the selected vertices
  for (let i = 0; i < modifiableVerts.length; i++) {
    let currentVert = modifiableVerts[i];
    if (chance > 0.66) {
      // add the value 33% of the time
      currentVert.y += movementValue;
      currentVert.x += movementValue;
    } else {
      // substract the value 66% of the time
      currentVert.y -= movementValue;
      currentVert.x -= movementValue;
    }
  }
}
