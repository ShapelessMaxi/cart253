/**
Sound Activity
Maxime Perreault

Following the sound activity video (10.5s).
*/

"use strict";

// store all ball objects here
let balls = [];

// store all possible notes here (F-minor scale)
let notes = [`F3`, `G3`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F4`];

// create the canvas
function setup() {
  createCanvas(600, 600);
  userStartAudio();
}

// draw simulation elements
function draw() {
  // draw the background color
  background(50, 168, 82);

  // display and apply movement methods to all the balls
  for (let i = 0; i < balls.length; i++) {
    let currentBall = balls[i];
    currentBall.move();
    currentBall.bounce();
    currentBall.display();
  }
}

// create a ball at mouse position when user clicks
function mousePressed() {
  let note = random(notes);
  createBall(mouseX, mouseY, note);
}

// create a ball
function createBall(x, y) {
  let ball = new Ball(x, y);
  balls.push(ball);
}
