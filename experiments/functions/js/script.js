let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2,
};

let state = `title`; // possible states: title, animation, ending

function setup() {
  createCanvas(500, 500);
  circle.vx = circle.speed;

  textSize(32);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(20);

  if (state === `title`) {
    title();
  } else if (state === `animation`) {
    animation();
  } else if (state === `ending`) {
    ending();
  }
}

function keyPressed() {
  if (state === `title`) {
    state = `animation`;
  }
  // animation
  else if (circle.x > width) {
    state = `ending`;
  }
}

function title() {
  fill(255);
  text(`life lol`, width / 2, height / 2);
}
function animation() {
  circle.x += circle.vx;
  circle.y += circle.vy;
  ellipse(circle.x, circle.y, circle.size);
}
function ending() {
  fill(127);
  text(`its all over lol`, width / 2, height / 2);
}
