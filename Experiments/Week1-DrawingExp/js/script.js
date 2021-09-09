/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";


/**
Description of preload
*/
function preload() {
  }


/**
Description of setup
*/
function setup() {
  createCanvas(500, 500);
  background(237, 200, 157);

  noStroke();
// atmos
  rectMode(CENTER);
  fill(255, 158, 218, 90);
  rect(250, 250, 50)
  rect(250, 250, 100)
  rect(250, 250, 150)
  rect(250, 250, 200)

  rectMode(CORNER);
  rect(0, 250, 400);
  rect(250, 250, 400);
  rect(20, 100, 400);
  rect(200, 0, 40, 500);
  rect(220, 0, 60, 500);
  rect(220, 0, 750, 500);


  rectMode(CENTER);
  fill(199, 246, 255, 110);
// middle
  square(250, 10, 10);
  square(250, 10, 10);
  square(250, 10, 10);
  square(250, 30, 10);
  square(250, 30, 10);
  square(250, 30, 10);
  square(250, 50, 10);
  square(250, 50, 10);
  square(250, 70, 10);
  square(250, 90, 10);
  square(250, 110, 10);
  square(250, 130, 10);
  square(250, 150, 10);
  square(250, 170, 10);
  square(250, 170, 10);
  square(250, 110, 10);
  square(250, 130, 10);
  square(250, 150, 10);
  square(250, 170, 10);
  square(250, 190, 10);
  square(250, 210, 10);
  square(250, 210, 10);
  square(250, 230, 10);
  square(250, 250, 10);
  square(250, 230, 10);
  square(250, 250, 10);
  square(250, 230, 10);
  square(250, 250, 10);
  square(250, 270, 10);
  square(250, 290, 10);
  square(250, 310, 10);
  square(250, 330, 10);
  square(250, 350, 10);
  square(250, 370, 10);
  square(250, 390, 10);
  square(250, 410, 10);
  square(250, 430, 10);
  square(250, 450, 10);
  square(250, 470, 10);
  square(250, 490, 10);

// 2nd level
  square(270, 15, 20);
  square(270, 45, 20);
  square(270, 75, 20);
  square(270, 105, 20);
  square(270, 135, 20);
  square(270, 165, 20);
  square(270, 195, 20);
  square(270, 215, 20);
  square(270, 215, 20);
  square(270, 245, 20);
  square(270, 275, 20);
  square(270, 305, 20);
  square(270, 365, 20);

  square(230, 15, 20);
  square(230, 45, 20);
  square(230, 75, 20);
  square(230, 105, 20);
  square(230, 135, 20);
  square(230, 165, 20);
  square(230, 195, 20);
  square(230, 225, 20);
  square(230, 255, 20);
  square(230, 285, 20);
  square(230, 315, 20);
  square(230, 345, 20);

// 3rd
  square(303, 20, 30);
  square(303, 20, 30);
  square(303, 20, 30);
  square(303, 60, 30);
  square(303, 100, 30);
  square(303, 140, 30);
  square(303, 180, 30);
  square(303, 220, 30);
  square(303, 260, 30);
  square(303, 300, 30);
  square(303, 340, 30);
  square(303, 300, 30);
  square(303, 360, 30);
  square(303, 470, 30);

  square(197, 20, 30);
  square(197, 40, 30);
  square(197, 40, 30);
  square(197, 80, 30);
  square(197, 100, 30);
  square(197, 160, 30);
  square(197, 200, 30);
  square(197, 240, 30);
  square(197, 240, 30);
  square(197, 280, 30);
  square(197, 280, 30);
  square(197, 320, 30);
  square(197, 360, 30);
  square(197, 400, 30);
  square(197, 440, 30);

// 4th
  square(352, 30, 50);
  square(352, 90, 50);
  square(352, 120, 50);
  square(352, 120, 50);
  square(352, 160, 50);
  square(352, 220, 50);
  square(352, 280, 50);
  square(352, 220, 50);
  square(352, 280, 50);
  square(352, 340, 50);
  square(352, 400, 50);
  square(352, 460, 50);

  square(148, 30, 50);
  square(148, 90, 50);
  square(148, 150, 50);
  square(148, 190, 50);
  square(148, 250, 50);
  square(148, 310, 50);
  square(148, 370, 50);
  square(148, 430, 50);

// 5th
  square(417, 35, 60);
  square(417, 35, 60);
  square(417, 105, 60);
  square(417, 175, 60);
  square(417, 245, 60);
  square(417, 335, 60);

  square(83, 35, 60);
  square(83, 35, 60);
  square(83, 105, 60);
  square(83, 165, 60);
  square(83, 245, 60);
  square(83, 245, 60);
  square(83, 315, 60);
  square(83, 315, 60);
  square(83, 385, 60);

// last
  square(491, 40, 70);
  square(491, 120, 70);
  square(491, 200, 70);
  square(491, 280, 70);
  square(491, 360, 70);
  square(491, 360, 70);
  square(491, 440, 70);

  square(9, 40, 70);
  square(9, 120, 70);
  square(9, 120, 70);
  square(9, 200, 70);
  square(9, 280, 70);
  square(9, 360, 70);
  square(9, 440, 70);

// top layer
  fill(128, 4, 35, 25);
  rectMode(CORNER);
  rect(243, 0, 15, 500);
  rect(213, 0, 70, 500);
  rect(243, 45, 15, 500);
  fill(28, 17, 150, 10);
  rect(100, 0, 300, 500);



}


/**
Description of draw()
*/
function draw() {

}
