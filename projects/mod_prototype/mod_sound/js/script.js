/**
mod(sound)
Maxime Perreault

This is a prototype in which I explore sound generation for my final project.
A- I want to generate a heartbeat sound to use in the background
B- I wanr to experiment with a generative algorithm using an oscilaltor. my
goal with this is to generate a cool organic sound and a cool visual modification
of the body (see project 2 proposal and project 2 mod() prototype).

I see 1 main challenge here and it's how hard it'll be to generate organic sounds
since synthetizers and oscillators are not exactly, well... organic sounding.
*/

"use strict";

let heart = {
  main: undefined,
  secondary: undefined,
};

let delay = {
  main: {
    oscillator: undefined,
    amp: 0.9,
  },
  secondary: undefined,
};

// create the canvas, create the oscillator and start the audio
function setup() {
  createCanvas(500, 500);
  userStartAudio();

  // create oscillators for the heartbeat
  heartbeat();
  // start the heartbeat oscillators
  startHeartbeat();
}

// create oscillators for the heartbeat
function heartbeat() {
  // create the main oscillator for the heartbeat
  heart.main = new p5.Oscillator(75, `sine`);
  heart.main.amp(delay.main.amp);
  // delay (echo) the main oscillator
  delay.main = new p5.Delay();
  delay.main.amp(0.05);
  delay.main.process(heart.main, 0.1, 0.2);

  // create the secondary oscillator for the heartbeat
  heart.secondary = new p5.Oscillator(70, `sine`);
  heart.secondary.amp(0.6);
  // delay (echo) the secondary oscillator
  delay.secondary = new p5.Delay();
  delay.secondary.amp(0.1);
  delay.secondary.process(heart.secondary, 0.1, 0.1);
}

// start and stop the heart oscillators (once)
function singleHeartbeat() {
  // start the main heartbeat oscillator with a 0.13 second delay
  heart.main.start(0.33);
  // stop the main heartbeat oscillator after 0.1 second
  heart.main.stop(0.43);

  // start the secondary heartbeat oscillator a bit before the main heartbeat
  heart.secondary.start();
  // stop the secondary heartbeat oscillator after 0.1 second
  heart.secondary.stop(0.1);
}

// set the interval that plays the heartbeat
function startHeartbeat() {
  // set interval so the single heart beat is repeated every 2 seconds
  setInterval(singleHeartbeat, 1900);
}

// draw the background
function draw() {
  background(217, 188, 178);
}
