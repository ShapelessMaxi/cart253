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

// all of tis should be a class...
// define variables used for the heartbeat oscillators
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
let heartbeatPlaying = false;
let heartbeatTimer;
// time in seconds of the delay between each heartbeats, lower num = faster heartbeat
let singleHeartbeatDelay = 1.9;

// define variabes used for the generative oscillator function experiment
let oscillatorNum = 7;
let oscillators = [];
// this should be a class again........
let osci = {
  minFrequency: 100,
  maxFrequency: 1000,
  amp: 0.2,
  type: [`sine`, `sine`, `sine`, `sine`, `triangle`],
  created: false,
};

// create the canvas, create the oscillator and start the audio
function setup() {
  createCanvas(500, 500);
  userStartAudio();

  // create oscillators for the heartbeat
  heartbeat();

  // create the oscillator for the generative experiment
  // in my final program, I call the generative algorithm functions by the general effect they have on the body (twist, shrink, etc)
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

  // keep track of the heartbeat playing
  heartbeatPlaying = true;
}

// set the interval that plays the heartbeat
function heartbeatInterval() {
  // set interval so the single heart beat is repeated every 2 seconds
  heartbeatTimer = setInterval(singleHeartbeat, singleHeartbeatDelay * 1000);
}

// draw the background and the instructions
function draw() {
  background(217, 188, 178);

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
    text(`press space to start a weird noise`, width / 2, height / 4);
  } else {
    text(
      `press space to change the frequency of the weird noise`,
      width / 2,
      height / 4
    );
    text(`press enter to stop the weird noise`, width / 2, height / 5);
  }
  pop();
}

// start and stop the heartbeat when you click (theres a semi big delay btw!)
function mouseClicked() {
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

function keyPressed() {
  if (keyCode === 32) {
    if (!osci.created) {
      // press space to create the oscillators
      twist();
    } else if (osci.created) {
      // press space to change the tone of the oscillators
      for (let i = 0; i < oscillators.length; i++) {
        oscillators[i].freq(random(100, 1000));
      }
    }
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

// create the oscillator for the generative experiment
// in my final program, I call the generative algorithm functions by the general effect they have on the body (twist, shrink, etc)
function twist() {
  for (let i = 0; i < oscillatorNum; i++) {
    let currentOscillator = new p5.Oscillator();
    currentOscillator.setType(random(osci.type));
    currentOscillator.freq(random(osci.minFrequency, osci.maxFrequency));
    // scale amplitude to number of oscillators -> https://creative-coding.decontextualize.com/synthesizing-analyzing-sound/
    currentOscillator.amp(osci.amp / oscillatorNum);
    currentOscillator.start();
    oscillators.push(currentOscillator);
  }
  // keep track of the creation of these oscilators
  osci.created = true;
}
