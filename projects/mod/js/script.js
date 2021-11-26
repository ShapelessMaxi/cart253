/**
mod()
Maxime Perreault

this is the project 2 prototype (name is a placeholder).

probably a narrative sandbox game that makes you think about what it means to
have a body, to have authority over it, and to modify it.

to learn more about the program plan, the concept, the story and everything
in-between, see the proposal's pdf.

also im using p5.2dcollide librairy to confine atoms into the bodyparts (complex polygons).


**********ascii code algorithm thing
it wont actually be ascii code, idk what to do with the numbers. ill make my own
letter to number code with numbers usable for a rgb value.

1- in a class, define the code for every letter (a-z)
  i.e.: let a = 0; b = 5; (?? figure this out lol)
2- define a min (3) and a max of characters for the name?
  would like not too, but i think if the name has too many characters, it'll give me really intense values...
3- look at the amount of letters in the name
4- each value in the currentCharactersArray will be r, g or b values
  3 letter name -> r = 1st letter, g = 2nd letter, b = 3rd letter
  if more than 3 letters, distribute the letters semi-equally.
  4 letter name -> r = 1st + 4th letter, g = 2nd letter, b = 3rd letter
  5 letter name -> r = 1st + 4th letter, g = 2nd + 5th  letter, b = 3rd letter
  6 letter name -> r = 1st + 4th letter, g = 2nd + 5th  letter, b = 3rd + 6th letter
  (etc) basically loop through the array and assign it to a new array (r array, g array, b array) in order
5- compile every value in r, g and b array (addition?, average? -> depends on the actual codes chosen)
6- assign a part of the atoms array this color (probabilistic approach)
  this is run only once at startup of game state.

**********antena algorithm
looking at math logarithmic and other functions, would it be possible to make a kind of antena grow
from a random vertex of the body part selected?
-pause the use of the algorithm while its growing slowly
-color= name code?, random?
-draw with what? (ellipse?)
  Math.acosh() -> figure out how to change starting point and direction...
-accompanied by weird sound?
*/

"use strict";
// define variables for the states
let currentState; // possible state objects : Intro, Menu, Game

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

  // create a new state object
  currentState = new Intro();
}

// display elements specified in the the state classes
function draw() {
  currentState.update();
}

function keyPressed() {
  currentState.keyPressed();
}

function mousePressed() {
  currentState.mousePressed();
}
