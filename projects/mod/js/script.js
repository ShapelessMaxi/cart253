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
  rgb values range form 0 to 255,.
  theres 26 letters possible
  map? 0-25 to 0-255
  255/26 = 9.8 kinda
  a - 0 - 0
  b - 1 - 10
  c - 2 - 20
  d - 3 - 30
  e - 4 - 40
  f - 5 - 50
  m - 13 - 130
  y - 25 - 250
  z - 26 - 260
  z kinda goes over a bit, but basicaly its the full range (= 255), and y is (= 250), so its still different...
  easy to convert, we can use a loop thingy
  array of the alphabet -> index * 10 = code
  array of the name -> check the index by checking if nameLetter === alphabetLetter, if true, return the index and multiply by 10.
  check if the 0, 2nd, 5th, 8th index in name array exist, if yes, add and divide by number of entreie and giv it to user.r variable.

    -? store these values in a dictionnary? we dont really need to keep track of the code value since its so easy to just convert letter to code

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
  currentState = new Game();
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
