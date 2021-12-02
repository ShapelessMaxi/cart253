/**
mod()
Maxime Perreault

this is the project 2 prototype (name is a placeholder).

probably a narrative sandbox game that makes you think about what it means to
have a body, to have authority over it, and to modify it.

to learn more about the program plan, the concept, the story and everything
in-between, see the proposal's pdf.

also im using p5.2dcollide librairy to confine atoms into the bodyparts (complex polygons).

6- assign a part of the atoms array this color (probabilistic approach)
  this is run only once at startup of game state.
*/

"use strict";

// define variables for changing state
let currentState; // possible states: Intro, Menu, Game

// define variables used for sounds
let gameSoundtrack;
let introSoundtrack;
let menuNoise;

// define variable for the fonts used
let fontSerif;
let fontSans;
let fontSansThin;

// define variables for the name
let nameArray = [];
let nameString;
let nameColor = {
  r: 0,
  g: 0,
  b: 0,
};

// preload the sounds and the fonts
function preload() {
  // sounds
  gameSoundtrack = loadSound(`assets/sounds/soundtrack.wav`);
  introSoundtrack = loadSound(`assets/sounds/guitar.wav`);
  menuNoise = loadSound(`assets/sounds/noise.wav`);

  // fonts
  fontSerif = loadFont(`assets/fonts/ZillaSlab-Regular.ttf`);
  fontSans = loadFont(`assets/fonts/Chivo-Bold.ttf`);
  fontSansThin = loadFont(`assets/fonts/Chivo-Light.ttf`);
}

// create the canvas, the ui and the body parts
// create the sounds (heartbeats)
function setup() {
  // create canvas
  createCanvas(750, 750);

  // audio starts only when user interacts with the webpage
  userStartAudio();

  // create a new state object, the program starts with the intro state
  currentState = new Menu();
}

// display elements (specified in the the state classes)
function draw() {
  currentState.update();
}

// intro state: nothing
// menu state: used when typing the name
// game state: used for different method (ie: select/deselect, grow/shrink, etc.)
function keyPressed() {
  currentState.keyPressed();
}

// intro state: start the narrative, click continue button
// menu state: click continue button
// game state: nothing
function mousePressed() {
  currentState.mousePressed();
}
