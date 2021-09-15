/**
everything has a name!
Maxime Perreault


*/

// setup of variables
let backgroundRgba = [150, 220, 150, 10];
let circleSize = 50;
let circleSpeed = 0.15;
let circleX = 75;
let circleY = 75;
/**
canvas
*/
function setup() {
  createCanvas(500, 500);
}

/**
trying variables stuff here
*/
function draw() {
  background(backgroundRgba);
  // background color change
  // background_rgba += 1

  circle(circleX, circleY, circleSize);
  circleX += circleSpeed;

  //
}
