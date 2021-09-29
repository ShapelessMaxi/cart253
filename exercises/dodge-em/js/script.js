/**
dodge the mad cat!
Maxime Perreault

*/

"use strict";

let enemy = {
  x: 0,
  y: 250,
  size: 125,
  vx: 5,
  vy: 5,
  img: undefined,
};

let victim = {
  x: 250,
  y: 250,
  size: 100,
  fill: {
    r: 200,
    g: 15,
    b: 40,
  },
};

let fuzzyCircles = {
  amount: 40,
  w: undefined,
  h: undefined,
  fill: {
    r: 250,
    g: 255,
    b: 200,
  },
};

// preloading image
function preload() {
  enemy.img = loadImage(`assets/images/cat.png`);
}

// setting up the canvas, the cursor and the enemy's height
function setup() {
  createCanvas(500, 500);
  noCursor();
  enemy.y = random(0, height);
}

function draw() {
  background(255, 186, 245);

  // creating fuzzy background with transparent rectangles
  for (let i = 0; i < fuzzyCircles.amount; i++) {
    fuzzyCircles.w = random(0, width);
    fuzzyCircles.h = random(0, height);
    let randomAlpha = random(0, 40);
    push();
    fill(
      fuzzyCircles.fill.r,
      fuzzyCircles.fill.g,
      fuzzyCircles.fill.b,
      randomAlpha
    );
    stroke(230, 188, 224);
    ellipse(fuzzyCircles.w, fuzzyCircles.h, width / 2);
    pop();
  }

  // setting up enemy speed
  enemy.x += enemy.vx;
  enemy.y += enemy.vy;

  //  user move with arrows
  if (keyIsDown(UP_ARROW)) {
    victim.y -= 5;
  } else if (keyIsDown(DOWN_ARROW)) {
    victim.y += 5;
  }
  if (keyIsDown(LEFT_ARROW)) {
    victim.x -= 5;
  } else if (keyIsDown(RIGHT_ARROW)) {
    victim.x += 5;
  }

  // respawing enemy
  if (enemy.x > width || enemy.y > height) {
    enemy.x = 0;
    enemy.y = random(0, height);
  }

  // user changes color when enemy is close
  let d = dist(victim.x, victim.y, enemy.x, enemy.y);
  if (d < 150) {
    victim.fill.r = 250;
    victim.fill.g = 250;
    victim.fill.b = 200;
  } else {
    victim.fill.r = 255;
    victim.fill.g = 184;
    victim.fill.b = 194;
  }

  // game over when victim touch enemy
  if (d < victim.size / 2 + enemy.size / 2) {
    victim.fill.r = 255;
    victim.fill.g = 0;
    victim.fill.b = 0;
    noLoop();
  }

  // drawing victim (user)
  stroke(230, 188, 224);
  fill(victim.fill.r, victim.fill.g, victim.fill.b);
  ellipse(victim.x, victim.y, victim.size);

  // drawing enemy with image
  image(enemy.img, enemy.x, enemy.y, enemy.size, enemy.size);
}
