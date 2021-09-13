/**
Week 1 - Alien
Maxime Perreault

Activity 2: Draw an alien
*/

/**
Draw an alien
*/
function setup() {
  createCanvas(640, 480);
  background(255, 181, 255);

  //Draw the body
  noStroke();
  fill(125);
  ellipse(320, 480, 300, 200);

  //Draw the head
  fill(180);
  ellipse(320, 240, 250, 400);

  //Draw the eyes
  fill(0);
  ellipse(260, 242, 55, 190);
  ellipse(380, 242, 55, 190);

  //Draw the nostrils
  ellipse(325, 335, 6, 10);
  ellipse(315, 335, 6, 10);

  //Draw the mouth
  stroke(200, 15, 15);
  strokeWeight(9);
  rectMode(CENTER);
  rect(320, 360, 155, 20);

}


/**
Nothing
*/
function draw() {
}
