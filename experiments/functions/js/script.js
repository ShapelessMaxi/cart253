let circle = {
  x: 100,
  y: 300,
  vx: 1,
  vy: 1,
  size: 100,
  speed: 10,
};

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  // let change = random();
  // if (change < 0.05) {
  //   circle.vx = random(-circle.speed, circle.speed);
  //   circle.vy = random(-circle.speed, circle.speed);
  // }

  let dx = circle.x - mouseX;
  let dy = circle.y - mouseY;
  if (dx < 0) {
    circle.vx = circle.speed;
  } else if (dx > 0) {
    circle.vx = -circle.speed;
  }
  if (dy < 0) {
    circle.vy = circle.speed;
  } else if (dy > 0) {
    circle.vy = -circle.speed;
  }

  circle.x += circle.vx;
  circle.y += circle.vy;
  ellipse(circle.x, circle.y, circle.size);
}
