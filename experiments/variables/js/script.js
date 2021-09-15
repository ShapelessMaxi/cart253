/**
everything has a name!
Maxime Perreault
*/

// setup of variables
let backgroundRgba = [150, 220, 150, 10];
let circle = {
  size: 50,
  speed: 0.15,
  x: 75,
  y:75,
};

// canvas
function setup() {
  createCanvas(500, 500);
}

// drawing stuff
function draw() {
  background(backgroundRgba);
  // background color change
  // background_rgba += 1

  ellipse(circle.x, circle.y, circle.size);
  circle.x += circle.speed;

  console.log(`circle.x = ${circle.x}`)
  //
}
