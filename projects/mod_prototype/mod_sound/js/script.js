/**
mod(sound)
Maxime Perreault

This is a prototype in which I explore sound generation for my final project.
A- I want to generate a heartbeat sound to use in the background.
B- I want to experiment with a generative algorithm using an oscillator. my
goal with this is to generate a cool organic sound and a cool visual modification
of the body (see project 2 proposal and project 2 mod() prototype).

I see one main challenge here and it's how hard it'll be to generate organic sounds
since synthetizers and oscillators are not exactly, well... organic sounding.
*/

"use strict";

// define variables used for the heartbeat oscillators
let firstBeat;
let firstDelay;
let secondBeat;
let secondDelay;

// define variables for the repetition and the on/off fucntion of the heartbeat
let heartbeatPlaying = false;
let heartbeatTimer;
// time in seconds of the delay between each heartbeats, lower num = faster heartbeat
let singleHeartBeatDelay = 1.9;

// define variabes used for the generative oscillator function experiment
let oscillatorNum = 7;
// store all the oscillators here
let oscillators = [];
// this should be a class........
let osci = {
  amp: 0.1,
  type: [`sine`, `sine`, `sine`, `sine`, `triangle`],
  created: false,
};

// this also sould be a class....
let circle = {
  x: undefined,
  y: undefined,
  size: 8,
};

// create the canvas, create the oscillator and start the audio
function setup() {
  createCanvas(500, 500);
  userStartAudio();

  // create oscillators for the heartbeat
  createHeartbeat();
}

// create the 2 beats with delays forming the heartbeat
function createHeartbeat() {
  createFirstBeat();
  createSecondBeat();
}

// create the oscillators for the first beat of the heart beat and a delay
function createFirstBeat() {
  // create the first heartbeat
  let amp = 0.6;
  let freq = 70;
  let type = `sine`;
  firstBeat = new Heart(amp, freq, type);
  firstBeat.oscillator = new p5.Oscillator(firstBeat.freq, firstBeat.type);
  firstBeat.oscillator.amp(firstBeat.amp);

  // create the first delay
  let delayAmp = 0.1;
  let delayTime = 0.1;
  let feedback = 0.1;
  firstDelay = new HeartDelay(delayAmp, delayTime, feedback);
  firstDelay.obj = new p5.Delay();
  firstDelay.obj.amp(firstDelay.amp);
  firstDelay.obj.process(
    firstBeat.oscillator,
    firstDelay.delayTime,
    firstDelay.feedback
  );
}

// create the oscillators for the second beat of the heart beat and a delay
function createSecondBeat() {
  // create the first heartbeat
  let amp = 0.9;
  let freq = 75;
  let type = `sine`;
  secondBeat = new Heart(amp, freq, type);
  secondBeat.oscillator = new p5.Oscillator(secondBeat.freq, secondBeat.type);
  secondBeat.oscillator.amp(secondBeat.amp);

  // create the first delay
  let delayAmp = 0.05;
  let delayTime = 0.1;
  let feedback = 0.2;
  secondDelay = new HeartDelay(delayAmp, delayTime, feedback);
  secondDelay.obj = new p5.Delay();
  secondDelay.obj.amp(secondDelay.amp);
  secondDelay.obj.process(
    secondBeat.oscillator,
    secondDelay.delayTime,
    secondDelay.feedback
  );
}

// set the interval that plays the heartbeat
function heartbeatInterval() {
  // set interval so the single heart beat is repeated every 2 seconds
  heartbeatTimer = setInterval(singleHeartbeat, singleHeartBeatDelay * 1000);
}

// start and stop the heart oscillators (once)
function singleHeartbeat() {
  // start the main heartbeat oscillator with a 0.13 second delay
  firstBeat.oscillator.start(0.23);
  // stop the main heartbeat oscillator after 0.1 second
  firstBeat.oscillator.stop(0.33);

  // start the secondary heartbeat oscillator a bit before the main heartbeat
  secondBeat.oscillator.start();
  // stop the secondary heartbeat oscillator after 0.1 second
  secondBeat.oscillator.stop(0.1);

  // keep track of the heartbeat playing
  heartbeatPlaying = true;
}

// draw the background and the instructions
function draw() {
  // draw the background
  background(217, 188, 178);

  // draw the instructions
  drawInstructions();

  // draw some circles (represent the atoms inside the body in my program)
  drawAtoms();
}

// draw the instructions
function drawInstructions() {
  // draw instructions for the heartbeat
  push();
  textSize(16);
  textAlign(CENTER);
  fill(255);
  if (heartbeatPlaying) {
    text(`click the mouse to stop the heartbeat`, width / 2, height / 2);
  } else {
    text(`click the mouse to start the heartbeat`, width / 2, height / 2);
  }
  pop();

  // draw instructions for the weird noise
  push();
  textSize(16);
  textAlign(CENTER);
  fill(255);
  if (!osci.created) {
    text(`press space to start a weird noise`, width / 2, height / 6);
  } else {
    text(
      `press space to change the frequency of the weird noise`,
      width / 2,
      height / 6
    );
    text(`press enter to stop the weird noise`, width / 2, height / 8);
  }
  pop();
}

// draw some atoms
function drawAtoms() {
  let numCircles = 100;
  for (let i = 0; i < numCircles; i++) {
    circle.x = random(100, 200);
    circle.y = random(100, 200);
    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(circle.x, circle.y, circle.size);
    pop();
  }
}

// start and stop the heartbeat when you click
function mousePressed() {
  if (!heartbeatPlaying) {
    // start the heartbeat oscillators
    heartbeatInterval();
  } else if (heartbeatPlaying) {
    // clear the interval (stop the timer)
    clearInterval(heartbeatTimer);
    // keep track of the heartbeat not playing anymore
    heartbeatPlaying = false;
  }
}

// create the oscillator for the generative experiment
// in my final program, I call the generative algorithm functions by the general effect they have on the body (twist, shrink, etc)
function twist() {
  generateSound();
}

function generateSound() {
  for (let i = 0; i < oscillatorNum; i++) {
    // define cosine equation to generate frequency
    let minFrequency = Math.cos(random(0, frameRate));
    let maxFrequency = Math.cos(random(500, frameRate * 1000));

    let currentOscillator = new p5.Oscillator();
    currentOscillator.setType(random(osci.type));
    currentOscillator.freq(random(minFrequency, maxFrequency));
    // scale amplitude to number of oscillators -> https://creative-coding.decontextualize.com/synthesizing-analyzing-sound/
    currentOscillator.amp(osci.amp / oscillatorNum);
    currentOscillator.start();
    oscillators.push(currentOscillator);
  }
  // keep track of the creation of these oscilators
  osci.created = true;
}

// start, stop and modify the generative algorithm
function keyPressed() {
  if (keyCode === 32) {
    // first time you press space, create the sounds
    if (!osci.created) {
      // press space to create the sounds (bunch of oscillators)
      twist();
    } else if (osci.created) {
      // press space to modify the algorithm
      for (let i = 0; i < oscillators.length; i++) {
        let newFreq = Math.sin(random(-100, oscillatorNum * random(1, 10)));
        oscillators[i].freq(random(100, 1000));
      }
    }
    // press enter to stop the sounds
  } else if (keyCode === 13) {
    // press enter to stop the oscillators
    for (let i = 0; i < oscillators.length; i++) {
      oscillators[i].stop();
    }
    // reset the array so we can start again cleanly
    oscillators = [];
    osci.created = false;
  }
}
