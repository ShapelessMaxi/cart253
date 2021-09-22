/**
chromatograph
Maxime Perreault

this is the first draft of the chromatograph
*/

/**
creating bakcground
*/
function setup() {
  // createCanvas(1200, 925);
  createCanvas(1200, 650);
}

// setting up variables
let selection = {
  aimingPosition: 0,
  circlePosition: 0,
  rightLimit : 50,
  leftLimit : 1150,
};


  // drawingContext.setLineDash([20, 5, 5, 5, 5, 5, 5, 5]);

//
/**
Description of draw()
*/
function draw() {

  background(200);

  rectMode(CORNER);
  noStroke();

  // rainbow stripes basic colors
  // make color class varibales
  let red = color(228,2,3);
  fill(red);
  rect(0, 0, 200, 400);

  let orange = color(255,140,1);
  fill(orange);
  rect(200, 0, 200, 400);

  let yellow = color(254,237,1);
  fill(yellow);
  rect(400, 0, 200, 400);

  let green = color(0,129,39);
  fill(green);
  rect(600, 0, 200, 400);

  let blue = color(0,77,255);
  fill(blue);
  rect(800, 0, 200, 400);

  let purple = color(118,7,135);
  fill(purple);
  rect(1000, 0, 200, 400);

  // in-between-rainbow-flickering-transparent colors
  // *************make rainbow colors class object
  let randomAlpha = random(120, 250);

  let rainbowPink = color(201 ,0 , 57, randomAlpha);
  fill(rainbowPink);
  rect(0, 0, 100, 400);

  let rainbowRedOrange = color(255, 60, 0, randomAlpha);
  fill(rainbowRedOrange);
  rect(100, 0, 200, 400);

  let rainbowYellowOrange = color(255, 187, 0, randomAlpha);
  fill(rainbowYellowOrange);
  rect(300, 0, 200, 400);

  let rainbowYellowGreen = color(133, 222, 0, randomAlpha);
  fill(rainbowYellowGreen);
  rect(500, 0, 200, 400);

  let rainbowAqua = color(0, 188, 201, randomAlpha);
  fill(rainbowAqua);
  rect(700, 0, 200, 400);

  let rainbowPurpleBlue = color(78, 0, 212, randomAlpha);
  fill(rainbowPurpleBlue);
  rect(900, 0, 200, 400);

  let rainbowMagenta = color(207, 19, 203, randomAlpha);
  fill(rainbowMagenta);
  rect(1100, 0, 100, 400);

  // toning down the colors a bit
  // tone down the colors before... then  reuse the colors for the interactive bar
  fill(150, 147, 116, 80);
  rect(0, 0, width, 400);

  // selection bar color change function
  // rainbowColor = rainbowOrange (from the colors class object)
  let rainbowColor;
  function rainbowColorChange(){
    if (mouseX <= 100){
      rainbowColor = color(227, 64, 64);
      return rainbowColor;

    } else if (mouseX > 100 && mouseX <= 200){
      rainbowColor = color(217, 98, 13);
      return rainbowColor;

    } else if (mouseX > 200 && mouseX <= 300){
      rainbowColor = color(222, 115, 33);
      return rainbowColor;

    } else if (mouseX > 300 && mouseX <= 400){
      rainbowColor = color(245, 179, 37);
      return rainbowColor;

    } else if (mouseX > 400 && mouseX <= 500){
      rainbowColor = color(232, 220, 51);
      return rainbowColor;

    } else if (mouseX > 500 && mouseX <= 600){
      rainbowColor = color(151, 212, 38);
      return rainbowColor;

    } else if (mouseX > 600 && mouseX <= 700){
      rainbowColor = color(30, 179, 40);
      return rainbowColor;

    } else if (mouseX > 700 && mouseX <= 800){
      rainbowColor = color(32, 158, 129);
      return rainbowColor;

    } else if (mouseX > 800 && mouseX <= 900){
      rainbowColor = color(33, 146, 166);
      return rainbowColor;

    } else if (mouseX > 900 && mouseX <= 1000){
      rainbowColor = color(30, 93, 176);
      return rainbowColor;

    } else if (mouseX > 1000 && mouseX <= 1100){
      rainbowColor = color(101, 30, 176);
      return rainbowColor;

    } else if (mouseX > 1100){
      rainbowColor = color(214, 66, 194);
      return rainbowColor;
    };
  };

  // selection bar basic shape
  fill(0);
  rect(0, 525, 1200, 100, 50);

  rainbowColorChange();
  fill(rainbowColor);
  rect(10, 535, 1180, 80, 40);

  fill(0);
  rect(20, 545, 1160, 60, 30);

  // selection bar interactive circle
  fill(255, 255, 255, 75);
  selection.circlePosition = mouseX - 30;
  selection.circlePosition = constrain(selection.circlePosition, selection.rightLimit, selection.leftLimit);
  circle(selection.circlePosition, 575, 40);

  selection.circlePosition = mouseX + 30;
  selection.circlePosition = constrain(selection.circlePosition, selection.rightLimit, selection.leftLimit);
  circle(selection.circlePosition, 575, 40);

  selection.circlePosition = mouseX - 15;
  selection.circlePosition = constrain(selection.circlePosition, selection.rightLimit, selection.leftLimit);
  circle(selection.circlePosition, 575, 40);

  selection.circlePosition = mouseX + 15;
  selection.circlePosition = constrain(selection.circlePosition, selection.rightLimit, selection.leftLimit);

  circle(selection.circlePosition, 575, 40);
  selection.circlePosition = mouseX;
  selection.circlePosition = constrain(selection.circlePosition, selection.rightLimit, selection.leftLimit);

  rainbowColorChange();
  fill(rainbowColor);
  circle(selection.circlePosition, 575, 40);

  // main block pointing shape
  // dont need class for aiming position (just define mouseX + n before each vertex)
  fill(20);
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
  mouseY = constrain(mouseY, 200, 850);
  vertex(selection.aimingPosition, mouseY);



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

  // overlays
  fill(0, 0, 0, 100);
  noStroke();
  rect(selection.aimingPosition - 1200, 200, 985, 300);
  rect(selection.aimingPosition - 1200, 200, 750, 300);
  rect(selection.aimingPosition - 1200, 200, 505, 300);

  rect(selection.aimingPosition + 215, 200, 985, 300);
  rect(selection.aimingPosition + 450, 200, 750, 300);
  rect(selection.aimingPosition + 695, 200, 505, 300);
}
