/**
everything has a name!
Maxime Perreault


*/

let circle_size = 10;
let ratio;

/**
Description of setup
*/
function setup() {
  createCanvas(500, 500);
}


/**
Description of draw()
*/
function draw() {
  background(40, 100, 100, 20);
  ratio = mouseX;
  circle(mouseX, mouseY, circle_size*ratio);
}
