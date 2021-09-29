/**
dodge-em
Maxime Perreault

move the circle with the arrow keys and dodge the enemies!
*/

"use strict";

let enemy = {
  x: 0,
  y: undefined,
  size: 50,
  vx: 0.5,
  vy: 0.5,
  speed: 25,
  fill: {
    r: 180,
    g: 20,
    b: 20,
  },
};

let victim = {
  x: 250,
  y: 250,
  size: 100,
  fill: 255,
};

/**
prealoading image
function preload() {
  loadimage();
}

/**
setting up canvas and setting up first enemy
*/
function setup() {
  createCanvas(500, 500);
  noCursor();

  enemy.x = random(-50, 0);
  enemy.y = random(0, height);
  enemy.vx *= enemy.speed;
}

/**
drawing enemies and victim
*/
function draw() {}
