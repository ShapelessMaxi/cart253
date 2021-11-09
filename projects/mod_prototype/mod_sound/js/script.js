/**
mod(sound)
Maxime Perreault

This is a prototype in which I explore sound generation for my final project.
A- I want to generate a heartbeat sound to use in the background
B- I want to experiment with a generative algorithm using an oscillator. my
goal with this is to generate a cool organic sound and a cool visual modification
of the body (see project 2 proposal and project 2 mod() prototype).

I see 1 main challenge here and it's how hard it'll be to generate organic sounds
since synthetizers and oscillators are not exactly, well... organic sounding.
*/

"use strict";

let heart = {
  main: {
    oscillator: undefined,
    amp: 0.9,
    freq: 75,
    type: `sine`,
  },
  secondary: {
    oscillator: undefined,
    amp: 0.6,
    freq: 70,
    type: `sine`,
  },
};

let delay = {
  main: {
    obj: undefined,
    amp: 0.05,
    delayTime: 0.1,
    feedback: 0.2,
  },
  secondary: {
    obj: undefined,
    amp: 0.1,
    delayTime: 0.1,
    feedback: 0.1,
  },
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
  heart.main.oscillator = new p5.Oscillator(heart.main.freq, heart.main.type);
  heart.main.oscillator.amp(heart.main.amp);
  // delay (echo) the main oscillator
  delay.main.obj = new p5.Delay();
  delay.main.obj.amp(delay.main.amp);
  delay.main.obj.process(
    heart.main.oscillator,
    delay.main.delayTime,
    delay.main.feedback
  );

  // create the secondary oscillator for the heartbeat
  heart.secondary.oscillator = new p5.Oscillator(
    heart.secondary.freq,
    heart.secondary.type
  );
  heart.secondary.oscillator.amp(heart.secondary.amp);
  // delay (echo) the secondary oscillator
  delay.secondary.obj = new p5.Delay();
  delay.secondary.obj.amp(delay.secondary.amp);
  delay.secondary.obj.process(
    heart.secondary.oscillator,
    delay.secondary.delayTime,
    delay.secondary.feedback
  );
}

// start and stop the heart oscillators (once)
function singleHeartbeat() {
  // start the main heartbeat oscillator with a 0.13 second delay
  heart.main.oscillator.start(0.23);
  // stop the main heartbeat oscillator after 0.1 second
  heart.main.oscillator.stop(0.33);

  // start the secondary heartbeat oscillator a bit before the main heartbeat
  heart.secondary.oscillator.start();
  // stop the secondary heartbeat oscillator after 0.1 second
  heart.secondary.oscillator.stop(0.1);
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
