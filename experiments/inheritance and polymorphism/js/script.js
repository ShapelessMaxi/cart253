"use strict";

let vehicles = [];
let numCars = 20;
let numMoto = 20;
let numSportCars = 3;

function setup() {
  createCanvas(750, 500);

  for (let i = 0; i < numCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let car = new Car(x, y);
    vehicles.push(car);
  }

  for (let i = 0; i < numMoto; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let moto = new Moto(x, y);
    vehicles.push(moto);
  }

  for (let i = 0; i < numSportCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let sportCar = new SportCar(x, y);
    vehicles.push(sportCar);
  }
}

function draw() {
  background(0);

  for (let i = 0; i < vehicles.length; i++) {
    let currentVehicle = vehicles[i];
    currentVehicle.move();
    currentVehicle.wrap();
    currentVehicle.display();
  }
}
