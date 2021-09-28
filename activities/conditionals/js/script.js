/**
live session conditionals
Maxime Perreault
*/

// multiple images (happy vs scared)
// for loops
// push pop
//

"use strict";

let happyCat = undefined;
let scaredCat = undefined;
let lookingCatLeft = undefined;
let lookingCatRight = undefined;

let face = {
  x: 250,
  y: 250,
  terror: 50,
  image: undefined,
};

/**
loading images
*/
function preload() {
  happyCat = loadImage(`assets/images/happy.jfif`);
  scaredCat = loadImage(`assets/images/scared.jfif`);
  lookingCatRight = loadImage(`assets/images/looking.jfif`);
  lookingCatLeft = loadImage(`assets/images/lookingleft.jfif`);
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
}

/**
Description of draw()
*/
function draw() {
  background(0);

  imageMode(CENTER);
  face.image = lookingCatLeft;

  let d = dist(mouseX, mouseY, face.x, face.y);
  if (d < face.terror) {
    face.image = scaredCat;
  } else {
    face.image = happyCat;
    if (mouseX < face.x) {
      face.image = lookingCatLeft;
    } else {
      face.image = lookingCatRight;
    }
  }

  image(face.image, face.x, face.y);
}
