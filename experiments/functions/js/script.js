let bg = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(bg);

  textAlign(CENTER, CENTER);
  textSize(64);
  fill(255);
  text(key, width / 2, height / 2);

  if (keyIsDown(65)) {
    rect(200, 200, 200, 200);
  }
}

function keyPressed() {
  if (keyCode === 32) {
    bg = 127;
  } else {
    bg = 0;
  }
}
