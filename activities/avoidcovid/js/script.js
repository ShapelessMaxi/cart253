/**
dodging covid activity
Maxime Perreault
*/

"use strict";

let covid = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 25,
  fill: {
    r: 180,
    g: 20,
    b: 20,
  },
};

let victim = {
  x: 250,
  y: 250,
  size: 100,
  fill: 255,
};

let staticAmount = 2500;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();

  covid.y = random(0, height);
  covid.vx = covid.speed;
}

function draw() {
  background(0);

  for (let i = 0; i < staticAmount; i++) {
    let x = random(0, width);
    let y = random(0, height);
    stroke(200);
    point(x, y);
  }

  covid.x += covid.vx;
  covid.y += covid.vy;

  victim.x = mouseX;
  victim.y = mouseY;

  if (covid.x > width) {
    covid.x = 0;
    covid.y = random(0, height);
  }

  let d = dist(victim.x, victim.y, covid.x, covid.y);
  if (d < victim.size / 2 + covid.size / 2) {
    victim.fill = 15;
    noLoop();
  }

  noStroke();
  fill(victim.fill);
  rectMode(CENTER);
  rect(victim.x, victim.y, victim.size);

  fill(covid.fill.r, covid.fill.g, covid.fill.b);
  ellipse(covid.x, covid.y, covid.size);
}
