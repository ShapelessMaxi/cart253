/**
Inheritance Activity
Maxime Perreault

this is me following the Inheritance Activity tutorial (9.5)
*/

"use strict";

let pedestrian;

let vehicles = [];
let numCars = 15;
let numMotos = 8;
let numTrucks = 10;

let state = `simulation`;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // create vehicles
  for (let i = 0; i < numCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let car = new Car(x, y);
    vehicles.push(car);
  }
  for (let i = 0; i < numTrucks; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let truck = new Truck(x, y);
    vehicles.push(truck);
  }
  for (let i = 0; i < numMotos; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let moto = new Moto(x, y);
    vehicles.push(moto);
  }

  // set random directions
  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i];
    let r = random();
    if (r < 0.5) {
      vehicle.vx = -vehicle.speed;
    } else if (r > 0.5) {
      vehicle.vx = vehicle.speed;
    }
  }

  // create pedestrian
  let x = width / 2;
  let y = height;
  pedestrian = new Pedestrian(x, y);
}

function draw() {
  background(0);

  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `success`) {
    success();
  } else if (state === `dead`) {
    dead();
  }
}

function title() {
  displayText(`Pedestrian Palaver`);
}

function simulation() {
  pedestrian.handleInput();
  pedestrian.move();
  pedestrian.display();

  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i];
    vehicle.move();
    vehicle.wrap();
    vehicle.display();
    pedestrian.checkHit(vehicle);
  }

  if (!pedestrian.alive) {
    state = `dead`;
  }

  if (pedestrian.y < 0) {
    state = `success`;
  }
}

function success() {
  displayText(`u win`);
}

function dead() {
  displayText(`u dead`);
}

function displayText(string) {
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(string, width / 2, height / 2);
  pop();
}

function keyPressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}
