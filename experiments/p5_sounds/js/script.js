"use strict";

let oscillator;
let t = 0;
let x = 0;

function setup() {
  createCanvas(500, 500);
  background(5, 43, 15);
  userStartAudio();

  oscillator = new p5.Oscillator(400, `sine`);
  oscillator.amp(0.1);
}

function draw() {
  let noiseValue = noise(t);
  let newFreq = map(noiseValue, 0, 1, 440, 540);
  oscillator.freq(newFreq);
  t += 0.5;

  fill(255, 200, 200, 40);
  noStroke();

  ellipse(x, newFreq - 300, 10);

  x += 0.5;
}

function mousePressed() {
  oscillator.start();
}

function mouseReleased() {
  oscillator.stop();
}
