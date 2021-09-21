/**
Moving pictures activity
Maxime Perreault

following the mving picture activity video.
*/

let bg = {
  r: 0,
  g: 0,
  b: 0,
};

let circleA = {
  x: 0,
  y: 250,
  size: 100,
  speed: 2,
  growR: 2,
  fill: 255,
  alpha: 200,
};

let circleB = {
  x: 500,
  y: 250,
  size: 80,
  relativeRatio: 0.75,
  speed: -2,
  fill: 255,
  alpha: 200,
};

/**
Setup
*/
function setup() {
  createCanvas(500, 500);
  noStroke();
  circleA.y = height/2;
  circleB.x = width;
  circleB.y = height/2;
}

/**
Drawing the moving stuff
*/
function draw() {
  // background
  background(bg.r, bg.g, bg.b);
  bg.r = map(circleA.size, 100, width, 0, 255);

  // left circle (A)
  circleA.x += circleA.speed;
  circleA.x = constrain(circleA.x, 0, width/2);
  circleA.size += circleA.growR;
  circleA.size = constrain(circleA.size, 0, width);
  fill(circleA.fill, circleA.alpha);
  ellipse(circleA.x, circleA.y, circleA.size);

  // right circle (B)
  circleB.x += circleB.speed;
  circleB.x = constrain(circleB.x, width/2, width)
  circleB.size = circleA.size * circleB.relativeRatio;
  fill(circleB.fill, circleB.alpha);
  ellipse(circleB.x, circleB.y, circleB.size);
}
