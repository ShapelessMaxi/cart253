/**
mod(sound)
Maxime Perreault

This is a prototype in which I explore sound generation for my final project.
A- I want to generate a heartbeat sound to use in the background. (it works well,
but it sounds very robotic :/, oh well...)
B- I want to experiment with a generative algorithm using an oscillator. my
goal with this is to generate a cool organic sound and a cool visual modification
of the body (see project 2 proposal and project 2 mod() prototype).

I see one main challenge here and it's how hard it'll be to generate organic sounds
since synthetizers and oscillators are not exactly, well... organic sounding.
9 nov update: after the live coding session, i decided that this was ways too hard
to do without any musical knowledge :/

After experimenting with gerenating a bunch of oscillatorss I have realized how
hard it was to make random oscillators sound good(let alone just a regular oscillator :/)
I leave the twist function there as a trace of my experiment, but I hate it, thx.

After all these failures, I will try one last experiment
C- I want to generate an oscillator. the frequency will be a sine wave linked to
the number of atoms. in my project, the number of atoms changes depending on the
body part size. I will also add a random noise parameter that will make it a bit
more variable.
*/

"use strict";

// define variables used for the heartbeat oscillators (A)
let firstBeat;
let firstDelay;
let secondBeat;
let secondDelay;

// define variables for the repetition and the on/off fucntion of the heartbeat
let heartbeatPlaying = false;
let heartMetronome;
// time in seconds of the delay between each heartbeats, lower num = faster heartbeat
let heartbeatPace = {
  current: 2200,
  min: 1700,
  max: 2700,
};
let changePaceInterval;

// define variabes used for the generative oscillator function experiment (B)
/* experiemnt was not successful... will not be using that...
sorry i did not take the time to clean this part of the code properly **/
let oscillatorNum = 7;
// store all the oscillators here
let oscillators = [];
// this should be a class........
let osci = {
  amp: 0.1,
  type: [`sine`, `sine`, `sine`, `sine`, `triangle`],
  created: false,
};

// define variables for atom generation
let atomAmount = 20;
let spawnBox = {
  xMinBorder: 100,
  yMinBorder: 100,
  xMaxBorder: 400,
  yMaxBorder: 400,
};

// define variables for the generated wave sound (C)
let waveSound;

// create the canvas, create the oscillator and start the audio
function setup() {
  // create canvas
  createCanvas(500, 500);

  // audio starts only when user interacts with the webpage
  userStartAudio();

  // create oscillators for the heartbeat
  createHeartbeat();

  // create the wave sound
  createWaveSound();
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
  firstBeat.createOscillator();

  // create the first delay
  let delayAmp = 1;
  let delayTime = 0.2;
  let feedback = 0.1;
  firstDelay = new HeartDelay(delayAmp, delayTime, feedback);
  firstDelay.createDelay(firstBeat);
}

// create the oscillators for the second beat of the heart beat and a delay
function createSecondBeat() {
  // create the second heartbeat
  let amp = 0.9;
  let freq = 75;
  let type = `sine`;
  secondBeat = new Heart(amp, freq, type);
  secondBeat.createOscillator();

  // create the second delay
  let delayAmp = 0.2;
  let delayTime = 0.1;
  let feedback = 0.2;
  secondDelay = new HeartDelay(delayAmp, delayTime, feedback);
  secondDelay.createDelay(secondBeat);
}

// start and stop the heart oscillators (once)
function singleHeartbeat() {
  // start the main heartbeat oscillator with a 0.13 second delay
  firstBeat.oscillator.start(0.38);
  // stop the main heartbeat oscillator after 0.1 second
  firstBeat.oscillator.stop(0.48);

  // start the secondary heartbeat oscillator a bit before the main heartbeat
  secondBeat.oscillator.start();
  // stop the secondary heartbeat oscillator after 0.1 second
  secondBeat.oscillator.stop(0.1);

  // keep track of the heartbeat playing
  heartbeatPlaying = true;
}

// set the interval that plays the heartbeat
function heartbeatInterval() {
  // set interval to change the pace of the heartbeat
  changePaceInterval = setInterval(changePace, heartbeatPace.current);

  // set interval so the single heart beat is repeated every 2 seconds
  heartMetronome = setInterval(singleHeartbeat, heartbeatPace.current);
}

// change the pace of the heartbeat at every heartbeat
function changePace() {
  let speedRandomizer = random(0.8, 1.2);
  heartbeatPace.current *= speedRandomizer;
  heartbeatPace.current = constrain(
    heartbeatPace.current,
    heartbeatPace.min,
    heartbeatPace.max
  );
  return heartbeatPace.current;
}

// create the wave sound
function createWaveSound() {
  let amp = 0.45;
  let freq = 300;
  let type = `sine`;
  waveSound = new Wave(amp, freq, type);
  waveSound.createOscillator();
}

// draw the background, the instructions, the atoms
// apply filters to wave sound
function draw() {
  // draw the background
  background(217, 188, 178);

  // draw the instructions
  drawInstructions();

  // draw some atoms (represent the atoms inside the body in my program)
  drawAtoms();

  // apply sine and noise filters to the wave sound oscillator
  waveSound.applySine(atomAmount);
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

  // draw instructions for the wave sound
  push();
  textSize(16);
  textAlign(CENTER);
  fill(255);
  if (!waveSound.started) {
    text(`press G to start a wave sound`, width / 2, height / 1.1);
  } else {
    text(`press G to stop a wave sound`, width / 2, height / 1.1);
    text(`and change the wave frequency`, width / 2, height / 1.25);
  }
  pop();

  // draw insrtructions for adding atoms
  push();
  textSize(16);
  textAlign(CENTER);
  fill(255);
  text(
    `scroll the mouse wheel to add or substract atoms`,
    width / 2,
    height / 1.3
  );
  pop();
}

// draw some atoms
function drawAtoms() {
  for (let i = 0; i < atomAmount; i++) {
    let x = random(spawnBox.xMinBorder, spawnBox.xMaxBorder);
    let y = random(spawnBox.yMinBorder, spawnBox.yMaxBorder);
    let currentAtom = atomAmount[i];
    currentAtom = new Atom(x, y);
    currentAtom.display();
  }
}

// start and stop the heartbeat when you click
function mousePressed() {
  if (!heartbeatPlaying) {
    // start the heartbeat oscillators
    heartbeatInterval();
  } else if (heartbeatPlaying) {
    // clear the interval (stop the timer)
    clearInterval(heartMetronome);
    // keep track of the heartbeat not playing anymore
    heartbeatPlaying = false;
  }
}

// create the oscillator for the generative experiment
// in my final program, I call the generative algorithm functions by the general effect they have on the body (twist, shrink, etc)
function twist() {
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

// start, stop and modify the generative algorithm experimenting with space
// start and stop the wave sound with G key
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
  } else if (keyCode === 71) {
    // press G key to start the wave sound
    if (!waveSound.started) {
      waveSound.oscillator.start();
      waveSound.started = true;
    } else {
      // press G key to stop the wave sound
      waveSound.oscillator.stop();
      waveSound.started = false;
    }
  }
}

// add or substract atoms whit the mouswheel
function mouseWheel() {
  if (event.delta < 0) {
    atomAmount += 1;
  } else {
    atomAmount -= 1;
  }
}
