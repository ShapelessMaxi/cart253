"use strict";

let barkSFX;

function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

function setup() {
  createCanvas(500, 500);
  userStartAudio();
}

function draw() {
  background(150, 150, 55);

  let newRate = map(mouseX, 0, width, -0.1, -5);
  barkSFX.rate(newRate);
}

function mousePressed() {
  barkSFX.loop();
}
