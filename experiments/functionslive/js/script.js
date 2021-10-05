"use strict";

/**

√ Conditionals: if versus if-else versus if-else-if
√ functions with return values
√ dragging an object onto another object to do something
  - map() and constrain()
  - making things appear and disappear with conditionals
  - functions in general

*/

let shape = {
  x: undefined,
  y: undefined,
  size: 200,
  isBeingDragged: false,
  alpha: 255,
  active: true,
};

let x = 10;

function setup() {
  createCanvas(700, 300);
  shape.x = width / 4;
  shape.y = height / 2;
}

function draw() {
  background(0);

  if (shape.active) {
    handleDragging();
    drawShape();
  }
  drawBoundary();
}

function handleDragging() {
  if (shape.isBeingDragged) {
    shape.x = mouseX;
    shape.y = mouseY;

    shape.x = constrain(shape.x, 0, width);
    shape.y = constrain(shape.y, 0, height);
  }
}

function drawShape() {
  push();
  // Select the fill based on mouseover
  if (shape.isBeingDragged) {
    // Yes means red
    fill(255, 0, 0, shape.alpha);
  } else {
    // No means yellow
    fill(255, 255, 0, shape.alpha);
  }

  ellipse(shape.x, shape.y, shape.size);
  pop();
}

/**
Returns true if the mouse is inside our circle and false otherwise
*/
function mouseIsInsideShape() {
  let d = dist(mouseX, mouseY, shape.x, shape.y);
  if (d < shape.size / 2) {
    return true;
  } else {
    return false;
  }
}

/**
Draws the centreline
*/
function drawBoundary() {
  push();
  stroke(255);
  line(width / 2, 0, width / 2, height);
  pop();
}

function mousePressed() {
  if (shape.active && mouseIsInsideShape()) {
    shape.isBeingDragged = true;
  }
}

function mouseReleased() {
  if (shape.isBeingDragged && shape.x > width / 2) {
    shape.active = false;
  }
  shape.isBeingDragged = false;
}

// "use strict";
//
// let shape = {
//   x: undefined,
//   y: undefined,
//   size: 200,
//   beingDragged: false,
//   active: true,
// };
//
// function setup() {
//   createCanvas(800, 300);
//   shape.x = 200;
//   shape.y = height / 2;
// }
//
// function draw() {
//   background(0);
//   if (shape.active) {
//     handleDragging();
//     drawShape();
//   }
//   handleDragging();
//   drawShape();
//   drawBoudary();
// }
//
// function drawShape() {
//   push();
//   if (shape.beingDragged) {
//     fill(255, 0, 0);
//   } else {
//     fill(0, 255, 0);
//   }
//   ellipse(shape.x, shape.y, shape.size);
//   pop();
// }
//
// function isMouseInsideShape() {
//   let d = dist(mouseX, mouseY, shape.x, shape.y);
//   if (d < shape.size / 2) {
//     return true;
//   }
// }
//
// function drawBoudary() {
//   push();
//   stroke(255);
//   line(width / 1.5, 0, width / 1.5, height);
//   pop();
// }
//
// function handleDragging() {
//   if (shape.beingDragged) {
//     shape.x = mouseX;
//   }
// }
//
// function mousePressed() {
//   if (isMouseInsideShape()) {
//     shape.beingDragged = true;
//   }
// }
//
// function mouseReleased() {
//   if (shape.beingDragged && shape.x > width / 2) {
//     shape.active = false;
//   }
//   shape.beingDragged = false;
// }
