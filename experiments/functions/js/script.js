function setup() {
  createCanvas(500, 500);
}

let hello = {
  string: `hi tis is maxi`,
  x: 0,
  y: 250,
  vx: 5,
  vy: 1,
};

function draw() {
  background(20);

  hello.x += hello.vx;
  hello.y += hello.vy;

  fill(255, 145, 12);
  textAlign(CENTER, CENTER);
  textSize(64);
  stroke(255, 0, 0);
  strokeWeight(3);
  text(hello.string, hello.x, hello.y);
}
