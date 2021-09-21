/**
Mona Lisa

During the class, let's try to draw the Mona Lisa in 30 minutes!
*/

"use strict";

/**
Description of setup
*/
function setup() {
  //background
  createCanvas(240, 350);
  background(103, 171, 121);

  //face
  noStroke();
  fill(204, 197, 118);
  ellipse(120, 90, 55, 80);

  //smile
  stroke(1);
  line(100, 100, 120, 105);

}
