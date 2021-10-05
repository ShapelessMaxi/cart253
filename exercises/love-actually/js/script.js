/**
Love, actually
Maxime Perreault

We're often looking for love anywhere we can find it... because we feel like we need it!
The problem is that the amount of compatible matches are limited. I know, there's plenty
of fish in the sea... but let's be realistic here. In this simulation, I want to explore
the idea that not every 'love interest' is a good one. I also want to add the idea that
there isn't just one perfect match.

As the player, you control a circle that starts grey. There's another circle at the start,
it's your first love interest. Every time yo click the left-mouse button, you change color randomly.
Every time you click, another randomly colored circle appears, but the other circles shrink in size.
There will be a maximum nuber of circles on the screen, the smaller circles get eliminated.
You have to find the color to match the another circle.

Easter egg: if there is more than one matching circle, you can go around and love them all!
*/

"use strict";

let user = {
  x: undefined,
  y: undefined,
  size: 100,
};

// storing lover objects
let lovers = [];
// total number of lovers
let numLovers = 4;
// keeps track of which lover is shown next
let numLoversToShow = 0;

let state = `title`; // possible states: title, simulation, love, multipeLovers, sadness

// creating possible colors for the user and the lovers
let red = { r: 186, g: 58, b: 25 };
let green = { r: 44, g: 107, b: 46 };
let blue = { r: 62, g: 88, b: 176 };
let pink = { r: 168, g: 79, b: 122 };
let aqua = { r: 60, g: 144, b: 163 };
// storing the possible colors
let colors = [];
let randomColorUser = undefined;
let randomColorLover = undefined;

// setting up the canvas, the colors and the starting lovers
function setup() {
  createCanvas(800, 800);
  setupColors();
  setupOriginLovers();
}
// store the different possible colors and assign them to the lovers and user
function setupColors() {
  colors.push(red, green, blue, pink, aqua);
  // assign a random color to the user and the first lover
  randomColorUser = random(colors);
  randomColorLover = random(colors);
}
// creating and adding 4 lovers to the lovers array
function setupOriginLovers() {
  // create 4 new lovers
  for (let i = 0; i < numLovers; i++) {
    // setting a random position for each lovers
    let tempLover = new Lover(random(0, width), random(0, height));
    // add this temporary lover to lovers array
    lovers.push(tempLover);
  }
}

// changing the state of the program and displaying the lovers
function draw() {
  background(209, 186, 123);
  // changing the program's states
  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `love`) {
    love();
  } else if (state === `sadness`) {
    sadness();
  }
}

function mousePressed() {
  // starting the simulation
  if (state === `title`) {
    state = `simulation`;
  }
  // adding new lovers to the array
  addingLovers();
  // keeping track of which numLovers to show
  numLoversToShow += 1;
  // decreasing the size of every lovers
  loversDecreasingSize();
  // changing colors
  loversChangeColor();
}

// adding new lovers to the array
function addingLovers() {
  if (lovers.length >= numLovers) {
    let tempNewLover = new Lover(random(0, width), random(0, height));
    lovers.push(tempNewLover);
  }
}
// decreasing the size of every lovers
function loversDecreasingSize() {
  for (let i = 0; i < numLoversToShow; i++) {
    if (lovers[i].size >= 120) {
      lovers[i].size -= 20;
    } else if (lovers[i].size >= 100) {
      lovers[i].size -= 20;
    } else if (lovers[i].size >= 80) {
      lovers[i].size -= 20;
    } else if (lovers[i].size >= 60) {
      lovers[i].size -= 20;
    } else if (lovers[i].size >= 40) {
      lovers[i].size -= 20;
    } else if (lovers[i].size >= 20) {
      // deactivating the lovers that has become too small
      lovers[i].active = false;
    }
  }
}
// changing color of individual loversChangeColor
function loversChangeColor() {
  for (let i = 0; i < numLoversToShow; i++) {
    lovers[i].color = random(colors);
  }
}

// drawing the title screen
function title() {
  push();
  textSize(62);
  fill(200, 100, 100);
  textAlign(CENTER, CENTER);
  text(`LOVE???????`, width / 2, 75);
  textSize(24);
  text(`control your circle with the mouse`, width / 2, 120);
  text(
    `press the left mouse button to find your perfect match (or matches!)`,
    width / 2,
    height / 2
  );
  text(`click to start...`, width / 2, 700);
  pop();
}

// start the simulation part
function simulation() {
  // controlling user circle with the mouse
  moveUser();
  // siplaying the user and the lovers
  displayUser();
  displayLovers();
  // check if there's a match (color + distance)
  checkMatch();
}

// controlling the user circle with the mouse
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

// checking if there's a match
function checkMatch() {
  for (let i = 0; i < numLoversToShow; i++) {
    // checking if the colors match
    if (randomColorUser.r === lovers[i].color.r) {
      // checking if the user is touching the lover
      let d = dist(user.x, user.y, lovers[i].x, lovers[i].y);
      if (d < user.size / 2 + lovers[i].size / 2) {
        state = `love`;
      }
    }
  }
}

function checkNumMatches(numMatches) {
  for (let i = 0; i < numLoversToShow; i++) {
    if (randomColorUser.r === lovers[i].color.r) {
      numMatches += 1;
    }
  }
}

// drawing the multiple lovers end screen
function love() {
  // displaying matching lovers
  for (let i = 0; i < numLoversToShow; i++) {
    if (randomColorUser.r === lovers[i].color.r) {
      lovers[i].display();
      noLoop();
    }
  } // basic end text
  push();
  textSize(62);
  fill(92, 35, 4);
  textAlign(CENTER, CENTER);
  text(`plenty of love!`, width / 2, height / 2);
  pop();
}

// drawing the user
function displayUser() {
  noStroke();
  push();
  fill(randomColorUser.r, randomColorUser.g, randomColorUser.b);
  ellipse(user.x, user.y, user.size);
  pop();
}

function displayLovers() {
  // Display all lovers
  for (let i = 0; i < numLoversToShow; i++) {
    if (lovers[i].active === true) {
      fill(lovers[i].color.r, lovers[i].color.g, lovers[i].color.b);
      lovers[i].display();
    }
  }
}
