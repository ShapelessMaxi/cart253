/**
Chromatograph
Maxime Perreault

This is an interactive color selector. When I was planning this program,
my goal was to make a fake laboratory tool.

ps: I do know how to use map() and mouseY,
but I didn't find the need to use them in this particular program. Thanks!
*/

"use strict";

/**
Creating a canvas the size of the screen.
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
}

let basicColors = {
  dark: 30,
  mid: 90,
  light: 190,
  whiteish: 240,
  red: 0,
};

let middleLine = {
  slope: 0,
  b: 0,
  // 1 and 2 for outer rectangle
  x1: 85,
  y1: 0,
  x2: 0,
  y2: 0,
  // 3 and 4 for middle triangles
  x3: 0,
  y3: 0,
  x4: 0,
  y4: 0,
  // 5 and 6 for middle rectangle
  x5: 0,
  y5: 0,
  x6: 0,
  y6: 0,
};

let stripes = {
  totalWidth: 0,
  y: 0,
  width: 0,
  height: 0,

};

let bar = {
  y: 0,
  width: 0,
  height: 100,
  cornerValue: 50,
  darkWidht: 0,
  darkHeight: 0,
  darkCornerValue: 40,
};

let circle = {
  size: 0,
  y: 0,
};

let limits = {
  left: 0,
  right: 0,
  spacing: 0,
};

let block = {
  y1: 0,
  y2: 0,
  y3: 0,
};

/**
Description of draw()
*/
function draw() {
  noStroke();

  // beveled box frame
  // outer triangles
  fill(basicColors.dark);
  background(basicColors.mid);
  triangle(0, 0, width, 0, 0, height);

  // outer rectangle
  middleLine.slope = (0 - height) / (width - 0) ;
  middleLine.x2 = width - middleLine.x1;
  middleLine.b = height;
  middleLine.y1 = (middleLine.slope * middleLine.x1) + middleLine.b;
  middleLine.y2 = (middleLine.slope * middleLine.x2) + middleLine.b;
  fill(basicColors.light);
  rectMode(CORNERS);
  rect(middleLine.x2, middleLine.y2, middleLine.x1, middleLine.y1);

  // middle triangles
  middleLine.x3 = middleLine.x1 + 10;
  middleLine.y3 = (middleLine.slope * middleLine.x3) + middleLine.b;
  middleLine.x4 = width - middleLine.x3;
  middleLine.y4 = (middleLine.slope * middleLine.x4) + middleLine.b;
  fill(basicColors.mid);
  triangle(middleLine.x3, middleLine.y3, middleLine.x4, middleLine.y4, middleLine.x3, middleLine.y4);
  fill(basicColors.dark);
  triangle(middleLine.x3, middleLine.y3, middleLine.x4, middleLine.y4, middleLine.x4, middleLine.y3);

  // middle rectangle
  middleLine.x5 = middleLine.x3 + 100;
  middleLine.y5 = (middleLine.slope * middleLine.x5) + middleLine.b;
  middleLine.x6 = width - middleLine.x5;
  middleLine.y6 = (middleLine.slope * middleLine.x6) + middleLine.b;
  fill(basicColors.light);
  rect(middleLine.x5, middleLine.y5, middleLine.x6, middleLine.y6);

  // defining colors (color() method doesn't work outside of draw or setup)
  let randomAlpha = random(175, 250);
  let colors = {
    red: color(235, 56, 40, randomAlpha),
    orange: color(227, 148, 39, randomAlpha),
    yellow: color(237, 237, 85, randomAlpha),
    green: color(51, 189, 51, randomAlpha),
    blue: color(40, 107, 209, randomAlpha),
    purple: color(137, 61, 191, randomAlpha),
  };

  // setting up the rainbow size
  stripes.totalWidth = middleLine.x6 - middleLine.x5;
  stripes.width = stripes.totalWidth / 6;
  stripes.height = (middleLine.y5 - middleLine.y6) /2;
  stripes.y = middleLine.y6

  // drawing the rainbow
  rectMode(CORNER);
  let redX = middleLine.x5
  fill(colors.red);
  rect(redX, stripes.y, stripes.width, stripes.height);

  let orangeX = middleLine.x5 + stripes.width;
  fill(colors.orange);
  rect(orangeX, stripes.y, stripes.width, stripes.height);

  let yellowX = orangeX + stripes.width;
  fill(colors.yellow);
  rect(yellowX, stripes.y, stripes.width, stripes.height);

  let greenX = yellowX + stripes.width;
  fill(colors.green);
  rect(greenX, stripes.y, stripes.width, stripes.height);

  let blueX = greenX + stripes.width;
  fill(colors.blue);
  rect(blueX, stripes.y, stripes.width, stripes.height);

  let purpleX = blueX + stripes.width;
  fill(colors.purple);
  rect(purpleX, stripes.y, stripes.width, stripes.height);

  // color change function
  let rainbowColor;
  function colorChange(){
    if (mouseX < orangeX){
      rainbowColor = colors.red;
      return rainbowColor;

    } else if (mouseX >= orangeX && mouseX < yellowX){
      rainbowColor = colors.orange;
      return rainbowColor;

    } else if (mouseX >= yellowX && mouseX < greenX){
      rainbowColor = colors.yellow;
      return rainbowColor;

    } else if (mouseX >= greenX && mouseX < blueX){
      rainbowColor = colors.green;
      return rainbowColor;

    } else if (mouseX >= blueX && mouseX < purpleX){
      rainbowColor = colors.blue;
      return rainbowColor;

    } else if (mouseX < width){
      rainbowColor = colors.purple;
      return rainbowColor;
    };
  };

  // slider
  bar.width = stripes.totalWidth - 30;
  bar.y = middleLine.y5 - 70;

  rectMode(CENTER);
  colorChange();
  fill(rainbowColor);
  rect(width/2, bar.y, bar.width, bar.height, bar.cornerValue);

  bar.darkWidth = bar.width - 20;
  bar.darkHeight = bar.height - 20;
  fill(basicColors.dark);
  rect(width/2, bar.y, bar.darkWidth, bar.darkHeight, bar.darkCornerValue);

  // slider circle constrain
  limits.spacing = stripes.totalWidth - bar.width;
  limits.left = middleLine.x5 + limits.spacing + bar.darkCornerValue;
  limits.right = middleLine.x6 - limits.spacing - bar.darkCornerValue;
  mouseX = constrain(mouseX, limits.left, limits.right);
  // slider circle
  circle.size = bar.darkHeight - 15;
  circle.y = bar.y;
  fill(rainbowColor);
  ellipse(mouseX, circle.y, circle.size);

  // blocky pointer shape
  // defining the heights of each vertices
  block.y1 = middleLine.y6;
  block.y2 = middleLine.y6 + 20;
  block.y3 = height/2;
  block.y4 = block.y3 + 10;
  block.y5 = block.y3 + 80;
  block.y6 = bar.y - 80;

  // sorry this method is unreadable, but works fine for what im trying to do!
  let aim = mouseX
  fill(basicColors.dark);

  beginShape();
  aim = mouseX;
  aim = constrain(aim, limits.left, limits.right);
  vertex(aim, block.y3);

  aim = mouseX - orangeX;
  aim = constrain(aim, limits.left - orangeX, limits.right - orangeX);
  vertex(aim, block.y2);

  aim = mouseX - orangeX;
  aim = constrain(aim, limits.left - orangeX, limits.right - orangeX);
  vertex(aim, block.y1);

  aim = mouseX - width;
  aim = constrain(aim, limits.left - width, limits.right - width);
  vertex(aim, block.y1);

  aim = mouseX - width;
  aim = constrain(aim, limits.left - width, limits.right - width);
  vertex(aim, block.y6);

  aim = mouseX - stripes.width/2;
  aim = constrain(aim, limits.left - stripes.width/2, limits.right - stripes.width/2);
  vertex(aim, block.y6);

  aim = mouseX - stripes.width/2;
  aim = constrain(aim, limits.left - stripes.width/2, limits.right - stripes.width/2);
  vertex(aim, block.y5);

  aim = mouseX;
  aim = constrain(aim, limits.left, limits.right);
  vertex(aim, block.y4);

  aim = mouseX + stripes.width/2;
  aim = constrain(aim, limits.left + stripes.width/2, limits.right + stripes.width/2);
  vertex(aim, block.y5);

  aim = mouseX + stripes.width/2;
  aim = constrain(aim, limits.left + stripes.width/2, limits.right + stripes.width/2);
  vertex(aim, block.y6);

  aim = mouseX + width;
  aim = constrain(aim, limits.left + width, limits.right + width);
  vertex(aim, block.y6);

  aim = mouseX + width;
  aim = constrain(aim, limits.left + width, limits.right + width);
  vertex(aim, block.y1);

  aim = mouseX + orangeX;
  aim = constrain(aim, limits.left + orangeX, limits.right + orangeX);
  vertex(aim, block.y1);

  aim = mouseX + orangeX;
  aim = constrain(aim, limits.left + orangeX, limits.right + orangeX);
  vertex(aim, block.y2);
  endShape(CLOSE);

  // putting blocks over the blocky shape to hide it when it goes to the sides
  rectMode(CORNERS);
  fill(basicColors.light);
  rect(middleLine.x1, block.y1, middleLine.x3, block.y6);
  rect(middleLine.x4, block.y1, middleLine.x2, block.y6);
  fill(basicColors.mid);
  rect(middleLine.x3, block.y1, middleLine.x5, block.y6);
  rect(middleLine.x2, block.y1, width, block.y6);

  // vertical aiming dashed line
  aim = mouseX;
  aim = constrain(aim, limits.left, limits.right);
  strokeWeight(8);
  strokeCap(SQUARE);
  stroke(255, 0, 0);
  drawingContext.setLineDash([40, 5]);
  line(aim, 0, aim, height);

  // horizontal aiming dashed line
  line(aim-width, height/2, aim+width, height/2);

  // middle circles
  aim = mouseX;
  aim = constrain(aim, limits.left, limits.right);
  noStroke();
  basicColors.red = color(255, 0, 0);
  fill(basicColors.red);
  ellipse(aim, height/2, 40);
  fill(basicColors.dark);
  ellipse(aim, height/2, 20);
}
