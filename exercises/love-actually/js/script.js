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

let lover = {
  x: undefined,
  y: undefined,
  size: 100,
};

let newLover = {
  x: undefined,
  y: undefined,
  size: 120,
};

let state = `title`; // possible states: title, simulation, love, multipeLovers, sadness
let spawnState = false; // possible states: true or false

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

// setting up the first lover's speed and position
function setup() {
  createCanvas(750, 750);
  setupLover();
  setupColors();
}

// set random locaton for the first lover
function setupLover() {
  lover.x = random(0, width);
  lover.y = random(0, height);
}

// store the different possible colors
// assign a random color to the user and the first lover
function setupColors() {
  colors.push(red, green, blue, pink, aqua);
  randomColorUser = random(colors);
  randomColorLover = random(colors);
}

// running the program ????
function draw() {
  background(209, 186, 123);

  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();

    if (spawnState === true) {
      newLover.x = random(0, width);
      newLover.y = random(0, height);
      ellipse(newLover.x, newLover.y, newLover.size);
      spawnState = false;
    }
  } else if (state === `love`) {
    love();
  } else if (state === `sadness`) {
    sadness();
  }
}

// decrease the size of the lovers
// change the user's color
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }

  // this caps the amount of lovers to 4
  if (lover.size === 100) {
    lover.size -= 20;
  } else if (lover.size === 80) {
    lover.size -= 20;
  } else if (lover.size === 60) {
    lover.size -= 20;
  } else if (lover.size === 40) {
    lover.size -= 20;
  } else if (lover.size === 20) {
    lover.x = -5000;
    lover.y = -5000;
  }

  // create a new lover
  spawnState = true;
  // spawnState = false;
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
  text(`press the left mouse button to change color!`, width / 2, 140);
  text(`fin your perfect match (or matches!)`, width / 2, height / 2);
  text(`click to start...`, width / 2, 700);
  pop();
}

// start the simulation part
function simulation() {
  move();
  checkMatch();
  display();
}

// drawing the love end screen
function love() {
  push();
  textSize(62);
  fill(92, 35, 4);
  textAlign(CENTER, CENTER);
  text(`LOVE!`, width / 2, height / 2);
  pop();
}

// drawing the multiple lovers end screen
function multipeLovers() {
  // show homw many lovers were a match  on screen
  push();
  textSize(62);
  fill(92, 35, 4);
  textAlign(CENTER, CENTER);
  text(`plenty of love!`, width / 2, height / 2);
  pop();
}

// setting the user's movement
function move() {
  user.x = mouseX;
  user.y = mouseY;
}

// drawing the user and the lovers
function display() {
  noStroke();
  push();
  fill(randomColorUser.r, randomColorUser.g, randomColorUser.b);
  ellipse(user.x, user.y, user.size);
  pop();
  push();
  fill(randomColorLover.r, randomColorLover.g, randomColorLover.b);
  ellipse(lover.x, lover.y, lover.size);
  pop();
}

// checking if the colors match
// checking if the user is touching the lover
function checkMatch() {
  if (randomColorUser === randomColorLover) {
    let d = dist(user.x, user.y, lover.x, lover.y);
    if (d < user.size / 2 + lover.size / 2) {
      state = `love`;
    }
  }
}
