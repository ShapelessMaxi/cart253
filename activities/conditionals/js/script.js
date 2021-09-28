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

/**
loading images
*/
function preload() {
  happyCat = loadImage(`assets/images/happy.jfif`);
  scaredCat = loadImage(`assets/images/scared.jfif`);
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
  image(happyCat, width / 2, height / 2);
}
