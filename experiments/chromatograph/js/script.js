/**
chromatograph
Maxime Perreault

*/

/**
creating bakcground
*/
function setup() {
  createCanvas(1200, 925);
  background(255);

}

// setting up variables
let randomAlpha;
let selection = {
  aimingPosition: 0,
  circlePosition: 0,
  rightLimit : 50,
  leftLimit : 1150,
};
/**
Description of draw()
*/
function draw() {
  background(200);
  // Rainbow stripe
  noStroke();
  // basic colors
  fill(228,2,3);
  rect(0, 0, 200, 400);
  fill(255,140,1);
  rect(200, 0, 200, 400);
  fill(254,237,1);
  rect(400, 0, 200, 400);
  fill(0,129,39);
  rect(600, 0, 200, 400);
  fill(0,77,255);
  rect(800, 0, 200, 400);
  fill(118,7,135);
  rect(1000, 0, 200, 400);
  // in-between-rainbow-flickering-transparent colors
  randomAlpha = random(120, 250);
  fill(201, 0, 57, randomAlpha);
  rect(0, 0, 100, 400);
  fill(255, 60, 0, randomAlpha);
  rect(100, 0, 200, 400);
  fill(255, 187, 0, randomAlpha);
  rect(300, 0, 200, 400);
  fill(133, 222, 0, randomAlpha);
  rect(500, 0, 200, 400);
  fill(0, 188, 201, randomAlpha);
  rect(700, 0, 200, 400);
  fill(78, 0, 212, randomAlpha);
  rect(900, 0, 200, 400);
  fill(207, 19, 203, randomAlpha);
  rect(1100, 0, 100, 400);
  // toning down the colors a bit
  fill(150, 147, 116, 80);
  rect(0, 0, width, 400);

  // Selection bar basic shape
  fill(0);
  rect(0, 800, 1200, 100, 50);
  fill(200);
  rect(10, 810, 1180, 80, 40);
  fill(0);
  rect(20, 820, 1160, 60, 30);
  // selection bar interactive circle
  fill(255, 255, 255, 75);
  selection.circlePosition = mouseX - 30;
  selection.circlePosition = constrain(selection.circlePosition, selection.rightLimit, selection.leftLimit);
  circle(selection.circlePosition, 850, 40);
  selection.circlePosition = mouseX + 30;
  selection.circlePosition = constrain(selection.circlePosition, selection.rightLimit, selection.leftLimit);
  circle(selection.circlePosition, 850, 40);
  selection.circlePosition = mouseX - 15;
  selection.circlePosition = constrain(selection.circlePosition, selection.rightLimit, selection.leftLimit);
  circle(selection.circlePosition, 850, 40);
  selection.circlePosition = mouseX + 15;
  selection.circlePosition = constrain(selection.circlePosition, selection.rightLimit, selection.leftLimit);
  circle(selection.circlePosition, 850, 40);
  selection.circlePosition = mouseX;
  selection.circlePosition = constrain(selection.circlePosition, selection.rightLimit, selection.leftLimit);
  fill(255);
  circle(selection.circlePosition, 850, 40);

  // main block pointing shape
  fill(0);
  beginShape();
  selection.aimingPosition = mouseX + 2400;
  selection.aimingPosition = constrain(selection.aimingPosition, selection.rightLimit + 2400, selection.leftLimit + 2400);
  vertex(selection.aimingPosition, 0);
  selection.aimingPosition = mouseX + 600;
  selection.aimingPosition = constrain(selection.aimingPosition, selection.rightLimit + 600, selection.leftLimit + 600);
  vertex(selection.aimingPosition, 0);
  selection.aimingPosition = mouseX + 500;
  selection.aimingPosition = constrain(selection.aimingPosition, selection.rightLimit + 500, selection.leftLimit + 500);
  vertex(selection.aimingPosition, 0);
  vertex(selection.aimingPosition, 20);
  selection.aimingPosition = mouseX;
  selection.aimingPosition = constrain(selection.aimingPosition, selection.rightLimit, selection.leftLimit);
  vertex(selection.aimingPosition, 285);
  selection.aimingPosition = mouseX - 500;
  selection.aimingPosition = constrain(selection.aimingPosition, selection.rightLimit - 500, selection.leftLimit - 500);
  vertex(selection.aimingPosition, 20);
  vertex(selection.aimingPosition, 0);
  selection.aimingPosition = mouseX - 600;
  selection.aimingPosition = constrain(selection.aimingPosition, selection.rightLimit - 600, selection.leftLimit - 600);
  vertex(selection.aimingPosition, 0);
  selection.aimingPosition = mouseX - 1200;
  selection.aimingPosition = constrain(selection.aimingPosition, selection.rightLimit - 1200, selection.leftLimit - 1200);
  vertex(selection.aimingPosition, 0);
  vertex(selection.aimingPosition, 750);
  selection.aimingPosition = mouseX - 600;
  selection.aimingPosition = constrain(selection.aimingPosition, selection.rightLimit - 600, selection.leftLimit - 600);
  vertex(selection.aimingPosition, 750);
  selection.aimingPosition = mouseX - 150;
  selection.aimingPosition = constrain(selection.aimingPosition, selection.rightLimit - 150, selection.leftLimit - 150);
  vertex(selection.aimingPosition, 750);
  vertex(selection.aimingPosition, 500);
  selection.aimingPosition = mouseX;
  selection.aimingPosition = constrain(selection.aimingPosition, selection.rightLimit, selection.leftLimit);
  vertex(selection.aimingPosition, 405);
  selection.aimingPosition = mouseX + 150;
  selection.aimingPosition = constrain(selection.aimingPosition, selection.rightLimit + 150, selection.leftLimit + 150);
  vertex(selection.aimingPosition, 500);
  vertex(selection.aimingPosition, 750);
  selection.aimingPosition = mouseX + 600;
  selection.aimingPosition = constrain(selection.aimingPosition, selection.rightLimit + 600, selection.leftLimit + 600);
  vertex(selection.aimingPosition, 750);
  selection.aimingPosition = mouseX + 1200;
  selection.aimingPosition = constrain(selection.aimingPosition, selection.rightLimit + 1200, selection.leftLimit + 1200);
  vertex(selection.aimingPosition, 750);
  endShape(CLOSE);

  // interactive vertical aiming dashed lines
  strokeCap(SQUARE);
  strokeWeight(6);
  stroke(252, 5, 5);
  selection.aimingPosition = mouseX;
  selection.aimingPosition = constrain(selection.aimingPosition, selection.rightLimit, selection.leftLimit);
  line(selection.aimingPosition, 740, selection.aimingPosition, 790);
  line(selection.aimingPosition, 680, selection.aimingPosition, 730);
  line(selection.aimingPosition, 620, selection.aimingPosition, 670);
  line(selection.aimingPosition, 560, selection.aimingPosition, 610);
  line(selection.aimingPosition, 500, selection.aimingPosition, 550);
  line(selection.aimingPosition, 440, selection.aimingPosition, 490);
  line(selection.aimingPosition, 380, selection.aimingPosition, 430);
  line(selection.aimingPosition, 320, selection.aimingPosition, 370);
  line(selection.aimingPosition, 260, selection.aimingPosition, 310);
  line(selection.aimingPosition, 200, selection.aimingPosition, 250);
  line(selection.aimingPosition, 140, selection.aimingPosition, 190);
  line(selection.aimingPosition, 80, selection.aimingPosition, 130);
  line(selection.aimingPosition, 20, selection.aimingPosition, 70);
  line(selection.aimingPosition, -40, selection.aimingPosition, 10);

  // interactive horizontal aiming dashed lines
  selection.aimingPosition = mouseX;
  selection.aimingPosition = constrain(selection.aimingPosition, selection.rightLimit, selection.leftLimit);
  line(selection.aimingPosition - 25, 405, selection.aimingPosition + 25, 405);
  line(selection.aimingPosition - 25, 285, selection.aimingPosition + 25, 285);
  strokeWeight(4);
  circle(selection.aimingPosition, 405, 10);
  circle(selection.aimingPosition, 285, 10);
  strokeWeight(6);
  // 1st vertical line
  line(selection.aimingPosition + 85, 285, selection.aimingPosition + 35, 285);
  line(selection.aimingPosition + 145, 285, selection.aimingPosition + 95, 285);
  line(selection.aimingPosition + 205, 285, selection.aimingPosition + 155, 285);
  line(selection.aimingPosition + 265, 285, selection.aimingPosition + 215, 285);
  line(selection.aimingPosition + 325, 285, selection.aimingPosition + 275, 285);
  line(selection.aimingPosition + 385, 285, selection.aimingPosition + 335, 285);
  line(selection.aimingPosition + 445, 285, selection.aimingPosition + 395, 285);
  line(selection.aimingPosition + 505, 285, selection.aimingPosition + 455, 285);
  line(selection.aimingPosition + 565, 285, selection.aimingPosition + 515, 285);
  line(selection.aimingPosition + 625, 285, selection.aimingPosition + 575, 285);
  line(selection.aimingPosition + 685, 285, selection.aimingPosition + 635, 285);
  line(selection.aimingPosition + 745, 285, selection.aimingPosition + 695, 285);
  line(selection.aimingPosition + 805, 285, selection.aimingPosition + 755, 285);
  line(selection.aimingPosition + 865, 285, selection.aimingPosition + 815, 285);
  line(selection.aimingPosition + 925, 285, selection.aimingPosition + 875, 285);
  line(selection.aimingPosition + 985, 285, selection.aimingPosition + 935, 285);
  line(selection.aimingPosition + 1045, 285, selection.aimingPosition + 995, 285);
  line(selection.aimingPosition + 1095, 285, selection.aimingPosition + 1055, 285);
  line(selection.aimingPosition + 1155, 285, selection.aimingPosition + 1105, 285);
  line(selection.aimingPosition - 85, 285, selection.aimingPosition - 35, 285);
  line(selection.aimingPosition - 145, 285, selection.aimingPosition - 95, 285);
  line(selection.aimingPosition - 205, 285, selection.aimingPosition - 155, 285);
  line(selection.aimingPosition - 265, 285, selection.aimingPosition - 215, 285);
  line(selection.aimingPosition - 325, 285, selection.aimingPosition - 275, 285);
  line(selection.aimingPosition - 385, 285, selection.aimingPosition - 335, 285);
  line(selection.aimingPosition - 445, 285, selection.aimingPosition - 395, 285);
  line(selection.aimingPosition - 505, 285, selection.aimingPosition - 455, 285);
  line(selection.aimingPosition - 565, 285, selection.aimingPosition - 515, 285);
  line(selection.aimingPosition - 625, 285, selection.aimingPosition - 575, 285);
  line(selection.aimingPosition - 685, 285, selection.aimingPosition - 635, 285);
  line(selection.aimingPosition - 745, 285, selection.aimingPosition - 695, 285);
  line(selection.aimingPosition - 805, 285, selection.aimingPosition - 755, 285);
  line(selection.aimingPosition - 865, 285, selection.aimingPosition - 815, 285);
  line(selection.aimingPosition - 925, 285, selection.aimingPosition - 875, 285);
  line(selection.aimingPosition - 985, 285, selection.aimingPosition - 935, 285);
  line(selection.aimingPosition - 1045, 285, selection.aimingPosition - 995, 285);
  line(selection.aimingPosition - 1095, 285, selection.aimingPosition - 1055, 285);
  line(selection.aimingPosition - 1155, 285, selection.aimingPosition - 1105, 285);
  // 2nd vertical line
  line(selection.aimingPosition + 85, 405, selection.aimingPosition + 35, 405);
  line(selection.aimingPosition + 145, 405, selection.aimingPosition + 95, 405);
  line(selection.aimingPosition + 205, 405, selection.aimingPosition + 155, 405);
  line(selection.aimingPosition + 265, 405, selection.aimingPosition + 215, 405);
  line(selection.aimingPosition + 325, 405, selection.aimingPosition + 275, 405);
  line(selection.aimingPosition + 385, 405, selection.aimingPosition + 335, 405);
  line(selection.aimingPosition + 445, 405, selection.aimingPosition + 395, 405);
  line(selection.aimingPosition + 505, 405, selection.aimingPosition + 455, 405);
  line(selection.aimingPosition + 565, 405, selection.aimingPosition + 515, 405);
  line(selection.aimingPosition + 625, 405, selection.aimingPosition + 575, 405);
  line(selection.aimingPosition + 685, 405, selection.aimingPosition + 635, 405);
  line(selection.aimingPosition + 745, 405, selection.aimingPosition + 695, 405);
  line(selection.aimingPosition + 805, 405, selection.aimingPosition + 755, 405);
  line(selection.aimingPosition + 865, 405, selection.aimingPosition + 815, 405);
  line(selection.aimingPosition + 925, 405, selection.aimingPosition + 875, 405);
  line(selection.aimingPosition + 985, 405, selection.aimingPosition + 935, 405);
  line(selection.aimingPosition + 1045, 405, selection.aimingPosition + 995, 405);
  line(selection.aimingPosition + 1095, 405, selection.aimingPosition + 1055, 405);
  line(selection.aimingPosition + 1155, 405, selection.aimingPosition + 1105, 405);
  line(selection.aimingPosition - 85, 405, selection.aimingPosition - 35, 405);
  line(selection.aimingPosition - 145, 405, selection.aimingPosition - 95, 405);
  line(selection.aimingPosition - 205, 405, selection.aimingPosition - 155, 405);
  line(selection.aimingPosition - 265, 405, selection.aimingPosition - 215, 405);
  line(selection.aimingPosition - 325, 405, selection.aimingPosition - 275, 405);
  line(selection.aimingPosition - 385, 405, selection.aimingPosition - 335, 405);
  line(selection.aimingPosition - 445, 405, selection.aimingPosition - 395, 405);
  line(selection.aimingPosition - 505, 405, selection.aimingPosition - 455, 405);
  line(selection.aimingPosition - 565, 405, selection.aimingPosition - 515, 405);
  line(selection.aimingPosition - 625, 405, selection.aimingPosition - 575, 405);
  line(selection.aimingPosition - 685, 405, selection.aimingPosition - 635, 405);
  line(selection.aimingPosition - 745, 405, selection.aimingPosition - 695, 405);
  line(selection.aimingPosition - 805, 405, selection.aimingPosition - 755, 405);
  line(selection.aimingPosition - 865, 405, selection.aimingPosition - 815, 405);
  line(selection.aimingPosition - 925, 405, selection.aimingPosition - 875, 405);
  line(selection.aimingPosition - 985, 405, selection.aimingPosition - 935, 405);
  line(selection.aimingPosition - 1045, 405, selection.aimingPosition - 995, 405);
  line(selection.aimingPosition - 1095, 405, selection.aimingPosition - 1055, 405);
  line(selection.aimingPosition - 1155, 405, selection.aimingPosition - 1105, 405);

}
