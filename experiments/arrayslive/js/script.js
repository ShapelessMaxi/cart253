"use strict";

let user = {
  x: undefined,
  y: undefined,
  size: 100,
};

let coins = [];
let numOfCoins = 10;

function setup() {
  createCanvas(500, 500);
  noCursor();
}

function createCoin() {
  let newCoin = {
    x: random(0, width),
    y: random(0, height),
    size: 50,
    stroke: color(255, 255, 0),
    collected: false,
  };
  return newCoin;
}

function draw() {
  background(20);

  handleInput();

  for (let i = 0; i < numOfCoins; i++) {
    let newCoin = createCoin();
    coins.push(newCoin);
  }

  for (let i = 0; i < coins.length; i++){
    collect(user, coins[i]);
    displayCoin(coins[i]);
  }

  displayUser(user);
}

function handleInput() {
  user.x = mouseX;
  user.y = mouseY;
}

function collect(user, coins[i]) {
  if (!coins[i].collected) {
    let d = dist(user.x, user.y, coins[i].x, coins[i].y);
    if (d < user.size / 2 + coin[i].size / 2) {
      coins[i].collected = true;
    }
  }
}

function displayUser(user) {
  push();
  noFill();
  stroke(255, 0, 0);
  ellipse(user.x, user.y, user.size);
  pop();
}

function displayCoin(coin[i]) {
  if (!coins[i].collected) {
    push();
    noFill();
    stroke(coins[i].stroke);
    ellipse(coins[i].x, coins[i].y, coins[i].size);
    pop();
  }
}
