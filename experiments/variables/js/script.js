/**
everything has a name!
Maxime Perreault


*/
let background_rgba = [150, 220, 150, 20];
let ratio;
let circle_size;

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
  background(background_rgba);

  // How to invert?
  ratio = mouseX / 25;
  circle_size = ratio * 10;

  circle(mouseX, mouseY, circle_size);
}
