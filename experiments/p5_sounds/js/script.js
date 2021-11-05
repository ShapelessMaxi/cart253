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
}

function mousePressed() {
  barkSFX.play();
}
