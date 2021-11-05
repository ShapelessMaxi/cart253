"use strict";
let mic;
let ghost = {
  x: undefined,
  y: undefined,
  vx: 0,
  img: undefined,
};

function setup() {
  createCanvas(500, 500);

  userStartAudio();

  ghost.x = 255;
  ghost.y = 250;
  ghost.img = loadImage(`assets/images/clown.png`);

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(5, 43, 15);
  let level = mic.getLevel();

  ghost.x += random(-1, 1);
  ghost.x += random(-1, 0);
  push();
  imageMode(CENTER);
  tint(255, 100);
  image(ghost.img, ghost.x, ghost.y);

  pop();

  if (level > 0.6) {
    ghost.vx = 20;
  }

  ghost.x += ghost.vx;
}

function keyPressed() {}
