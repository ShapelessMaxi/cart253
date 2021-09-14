/**
Week 1 - Alien
Maxime Perreault

Activity 2: Draw an alien
*/

/**
Draw an alien
*/
function setup() {
  createCanvas(480, 480);
  background(255, 181, 255);

  //Draw the body
  noStroke();
  fill(184, 75, 105);
  rect(275, 180, 180, 400, 90);
  fill(89, 32, 48);
  rect(300, 300, 15, 100, 90);
  rect(340, 300, 15, 100, 90);
  rect(300, 399, 15, 15, 15);
  rect(340, 399, 15, 15, 15);

  //Draw the head
  fill(237, 145, 171);
  rect(190, 110, 180, 70, 50);
  rect(180, 200, 200, 70, 50);
  rect(200, 170, 160, 40);

  //Draw the eyes
  fill(50);
  ellipse(260, 140, 30, 40);
  ellipse(305, 180, 40, 60);
  fill(0);
  ellipse(255, 140, 30, 40);
  ellipse(300, 180, 40, 60);
  fill(220);
  ellipse(255, 140, 25, 5);
  ellipse(300, 180, 35, 10);

  //Draw the nostrils
  fill(0);
  ellipse(220, 200, 6, 8);
  ellipse(235, 200, 6, 8);

  //Draw the mouth
  stroke(125, 17, 35);
  strokeWeight(9);
  rect(190, 226, 130, 20, 5);

}


/**
Nothing
*/
function draw() {
}
