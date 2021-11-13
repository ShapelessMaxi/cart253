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

right shoulder - bodyParts[2]
right shoulder - bodyParts[3]
right hand - bodyParts[4]
right thigh - bodyParts[5]
right leg - bodyParts[6]
right foot - bodyParts[7]

left shoulder - bodyParts[8]
left shoulder - bodyParts[9]
left hand - bodyParts[10]
left thigh - bodyParts[11]
left leg - bodyParts[12]
left foot - bodyParts[13]
*/

// create the canvas, the body parts and populate the body parts with atoms
function setup() {
  // create canvas
  createCanvas(750, 750);

  // create the head object
  createHead();
  // create the torso object
  createTorso();

  // create the right shoulder object
  createRightShoulder();
  // create the right arm object
  createRightArm();
  // create the right hand object
  createRightHand();
  // create the right thigh object
  createRightThigh();
  // create the right leg object
  createRightLeg();
  // create the right foot object
  createRightFoot();

  // create the left shoulder object
  createLeftShoulder();
  // create the left arm object
  createLeftArm();
  // create the left hand object
  createLeftHand();
  // create the left thigh object
  createLeftThigh();
  // create the left leg object
  createLeftLeg();
  // create the left foot object
  createLeftFoot();
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

// create the right shoulder object
function createRightShoulder() {
  let x1 = 222; // (x1,y1) fixed - attached to head and torso
  let y1 = 240;
  let x2 = 216;
  let y2 = 251;
  let x3 = 211;
  let y3 = 270;
  let x4 = 215;
  let y4 = 288;
  let x5 = 229; // (x5,y5) fixed - attached to right arm
  let y5 = 312;
  let x6 = 236; // (x6,y6) fixed - attached to right arm
  let y6 = 301;
  let x7 = 232;
  let y7 = 284;
  let x8 = 231;
  let y8 = 269;
  let x9 = 237; // (x9,y9) fixed - attached to torso
  let y9 = 265;
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
// create the right arm object
function createRightArm() {
  let x1 = 229; // (x1,y1) fixed - attached to right shoulder
  let y1 = 312;
  let x2 = 248;
  let y2 = 316;
  let x3 = 259;
  let y3 = 323;
  let x4 = 271;
  let y4 = 339;
  let x5 = 282; // (x5,y5) fixed - attached to right hand
  let y5 = 345;
  let x6 = 288; // (x6,y6) fixed - attached to right hand
  let y6 = 335;
  let x7 = 276;
  let y7 = 319;
  let x8 = 255;
  let y8 = 306;
  let x9 = 236; // (x9,y9) fixed - attached to right arm
  let y9 = 301;
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
// create the right hand object
function createRightHand() {
  let x1 = 282; // (x1,y1) fixed - attached to right arm
  let y1 = 345;
  let x2 = 296;
  let y2 = 356;
  let x3 = 305;
  let y3 = 348;
  let x4 = 300;
  let y4 = 342;
  let x5 = 293;
  let y5 = 341;
  let x6 = 293;
  let y6 = 339;
  let x7 = 300;
  let y7 = 339;
  let x8 = 301;
  let y8 = 335;
  let x9 = 288; // (x9,y9) fixed - attached to right arm
  let y9 = 335;
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
// create the right thigh object
function createRightThigh() {
  let x1 = 308; // (x1,y1) fixed - attached to torso
  let y1 = 303;
  let x2 = 323;
  let y2 = 327;
  let x3 = 337;
  let y3 = 351;
  let x4 = 356;
  let y4 = 356;
  let x5 = 384; // (x5,y5) fixed - attached to right leg
  let y5 = 359;
  let x6 = 406; // (x6,y6) fixed - attached to right leg
  let y6 = 336;
  let x7 = 394;
  let y7 = 321;
  let x8 = 364;
  let y8 = 309;
  let x9 = 341; // (x9,y9) fixed - attached to torso
  let y9 = 287;
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
// create the right leg object
function createRightLeg() {
  let x1 = 384; // (x1,y1) fixed - attached to right thigh
  let y1 = 359;
  let x2 = 429;
  let y2 = 358;
  let x3 = 465;
  let y3 = 359;
  let x4 = 500;
  let y4 = 352;
  let x5 = 507; // (x5,y5) fixed - attached to right foot
  let y5 = 341;
  let x6 = 487; // (x6,y6) fixed - attached to right foot
  let y6 = 336;
  let x7 = 460;
  let y7 = 333;
  let x8 = 432;
  let y8 = 330;
  let x9 = 406; // (x9,y9) fixed - attached to right thigh
  let y9 = 336;
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
// create the right foot object
function createRightFoot() {
  let x1 = 500; // (x1,y1) fixed - attached to right leg
  let y1 = 352;
  let x2 = 513;
  let y2 = 354;
  let x3 = 512;
  let y3 = 369;
  let x4 = 528;
  let y4 = 372;
  let x5 = 526;
  let y5 = 356;
  let x6 = 532;
  let y6 = 341;
  let x7 = 527;
  let y7 = 335;
  let x8 = 518;
  let y8 = 336;
  let x9 = 507; // (x9,y9) fixed - attached to right leg
  let y9 = 341;
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

// create the left shoulder object
function createLeftShoulder() {
  let x1 = 236; // (x1,y1) fixed - attached to head and torso
  let y1 = 220;
  let x2 = 251;
  let y2 = 201;
  let x3 = 262;
  let y3 = 193;
  let x4 = 286;
  let y4 = 194;
  let x5 = 309; // (x5,y5) fixed - attached to left arm
  let y5 = 193;
  let x6 = 309; // (x6,y6) fixed - attached to left arm
  let y6 = 209;
  let x7 = 286;
  let y7 = 214;
  let x8 = 270;
  let y8 = 214;
  let x9 = 265; // (x9,y9) fixed - attached to torso
  let y9 = 227;
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
// create the left arm object
function createLeftArm() {
  let x1 = 309; // (x1,y1) fixed - attached to left shoulder
  let y1 = 209;
  let x2 = 328;
  let y2 = 199;
  let x3 = 352;
  let y3 = 190;
  let x4 = 366;
  let y4 = 189;
  let x5 = 376; // (x5,y5) fixed - attached to left hand
  let y5 = 179;
  let x6 = 367; // (x6,y6) fixed - attached to left hand
  let y6 = 179;
  let x7 = 351;
  let y7 = 179;
  let x8 = 326;
  let y8 = 186;
  let x9 = 309; // (x9,y9) fixed - attached to left arm
  let y9 = 193;
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
// create the left hand object
function createLeftHand() {
  let x1 = 366; // (x1,y1) fixed - attached to left arm
  let y1 = 189;
  let x2 = 373;
  let y2 = 201;
  let x3 = 376;
  let y3 = 200;
  let x4 = 372;
  let y4 = 191;
  let x5 = 382;
  let y5 = 200;
  let x6 = 389;
  let y6 = 198;
  let x7 = 394;
  let y7 = 190;
  let x8 = 388;
  let y8 = 180;
  let x9 = 376; // (x9,y9) fixed - attached to left arm
  let y9 = 179;
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
// create the left thigh object
function createLeftThigh() {
  let x1 = 341; // (x1,y1) fixed - attached to torso
  let y1 = 287;
  let x2 = 375;
  let y2 = 285;
  let x3 = 405;
  let y3 = 294;
  let x4 = 424;
  let y4 = 306;
  let x5 = 440; // (x5,y5) fixed - attached to left leg
  let y5 = 297;
  let x6 = 434; // (x6,y6) fixed - attached to left leg
  let y6 = 268;
  let x7 = 412;
  let y7 = 251;
  let x8 = 375;
  let y8 = 245;
  let x9 = 334; // (x9,y9) fixed - attached to torso
  let y9 = 253;
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
// create the left leg object
function createLeftLeg() {
  let x1 = 440; // (x1,y1) fixed - attached to left thigh
  let y1 = 297;
  let x2 = 470;
  let y2 = 300;
  let x3 = 497;
  let y3 = 296;
  let x4 = 529;
  let y4 = 286;
  let x5 = 544; // (x5,y5) fixed - attached to left foot
  let y5 = 275;
  let x6 = 537; // (x6,y6) fixed - attached to left foot
  let y6 = 265;
  let x7 = 499;
  let y7 = 271;
  let x8 = 466;
  let y8 = 270;
  let x9 = 434; // (x9,y9) fixed - attached to left thigh
  let y9 = 268;
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
// create the left foot object
function createLeftFoot() {
  let x1 = 544; // (x1,y1) fixed - attached to left leg
  let y1 = 275;
  let x2 = 556;
  let y2 = 284;
  let x3 = 565;
  let y3 = 293;
  let x4 = 572;
  let y4 = 282;
  let x5 = 562;
  let y5 = 267;
  let x6 = 561;
  let y6 = 251;
  let x7 = 548;
  let y7 = 249;
  let x8 = 539;
  let y8 = 254;
  let x9 = 537; // (x9,y9) fixed - attached to left leg
  let y9 = 265;
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
  background(14, 19, 28);

  // displaying body parts
  for (let i = 0; i < bodyParts.length; i++) {
    let currentBodyPart = bodyParts[i];
    currentBodyPart.displayPolygon();
  }

  // call methods from Body class every 3 frames and every 8 frames
  let framecountSteps = [3, 8];
  for (let i = 0; i < framecountSteps.length; i++) {
    let currentFramecount = framecountSteps[i];
    if (frameCount % currentFramecount === 0) {
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
  }

  // generative algorithm activated by pressing any key (only affects head for now)
  if (keyIsPressed === true) {
    let rightFoot = bodyParts[7];
    let numOfVerts = 5;
    stretch(rightFoot, numOfVerts);
  }
}

// lets try to make a gen algorithm, activate when you press a key
/*
when the shape gets too weird, the program crashes.
possible solutions:
look at neighboor verts,,,.. and do what lol
*/
function stretch(bodypart, numOfVerts) {
  // store all verts that will be modified here
  let modifiableVerts = [];

  // store these body parts in an array: head, right/left hand and foot
  // for these parts: the first and last vertex should not be moved (connect with other body part)
  let head = bodyParts[0];
  let rightHand = bodyParts[4];
  let rightFoot = bodyParts[7];
  let leftHand = bodyParts[10];
  let leftFoot = bodyParts[13];
  let fixed2Array = [head, rightHand, rightFoot, leftHand, leftFoot];

  // check if its the torso
  // torso is the ony body part that only the third and the seventh vertex are not fixed
  let torso = bodyParts[1];
  if (bodypart === torso) {
    for (let i = 0; i < numOfVerts; i++) {
      let currentVert = random(bodypart.perimeter);
      while (
        currentVert === bodypart.perimeter[0] ||
        currentVert === bodypart.perimeter[1] ||
        currentVert === bodypart.perimeter[3] ||
        currentVert === bodypart.perimeter[4] ||
        currentVert === bodypart.perimeter[5] ||
        currentVert === bodypart.perimeter[7] ||
        currentVert === bodypart.perimeter[8]
      ) {
        currentVert = random(bodypart.perimeter);
      }
      modifiableVerts.push(currentVert);
    }
  } else {
    // checks if the bodypart is inside this array, returns true or false
    let insideFixed2Array = checkInsideArray(bodypart, fixed2Array);
    if (insideFixed2Array) {
      for (let i = 0; i < numOfVerts; i++) {
        let currentVert = random(bodypart.perimeter);
        while (
          currentVert === bodypart.perimeter[0] ||
          currentVert === bodypart.perimeter[8]
        ) {
          currentVert = random(bodypart.perimeter);
        }
        modifiableVerts.push(currentVert);
      }
    } else {
      // if not the torso and not in the fixed 2 array, it will be right/left soulder, arm, thigh and leg
      // for these parts: the first, fifth, sixth and last vertex should not be moved (connect with other body part)
      let insideFixed4Array = checkInsideArray(bodypart, fixed2Array);
      for (let i = 0; i < numOfVerts; i++) {
        let currentVert = random(bodypart.perimeter);
        while (
          currentVert === bodypart.perimeter[0] ||
          currentVert === bodypart.perimeter[4] ||
          currentVert === bodypart.perimeter[5] ||
          currentVert === bodypart.perimeter[7] ||
          currentVert === bodypart.perimeter[8]
        ) {
          currentVert = random(bodypart.perimeter);
        }
        modifiableVerts.push(currentVert);
      }
    }
  }

  // this determines how the vertices move
  // maybe link this with the name value? (the sum of each letter converted into ASCII?)
  let strecthValue = sin(frameCount) * 4;

  // apply the movement to the selected vertices
  for (let i = 0; i < modifiableVerts.length; i++) {
    let currentVert = modifiableVerts[i];

    if (currentVert.x < bodypart.spawnBox.xCenter) {
      // the modifable vert is left of the center, to expand we substract the value
      currentVert.x -= strecthValue;
    } else {
      // the modifable vert is right of the center, to expand we add the value
      currentVert.x += strecthValue;
    }

    if (currentVert.y < bodypart.spawnBox.yCenter) {
      // the modifable vert is higher than the center, to expand we substract the value
      currentVert.y -= strecthValue;
    } else {
      // the modifable vert is lower than the center, to expand we add the value
      currentVert.y += strecthValue;
    }
  }
}

function checkInsideArray(item, array) {
  for (let i = 0; i < array.length; i++) {
    let currentItem = array[i];
    if (item === currentItem) {
      return true;
    } else {
      return false;
    }
  }
}
