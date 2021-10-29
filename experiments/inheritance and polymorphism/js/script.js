"use strict";

let cars = [];
let numCars = 20;

let motos = [];
let numMoto = 20;

function setup() {
  createCanvas(750, 500);

  for (let i = 0; i < numCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let car = new Car(x, y);
    cars.push(car);
  }

  for (let i = 0; i < numMoto; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let moto = new Moto(x, y);
    cars.push(moto);
  }
}

function draw() {
  background(0);

  for (let i = 0; i < cars.length; i++) {
    let currentCar = cars[i];
    currentCar.move();
    currentCar.wrap();
    currentCar.display();
  }

  for (let i = 0; i < motos.length; i++) {
    let currentMoto = motos[i];
    currentMoto.move();
    currentMoto.wrap();
    currentMoto.display();
  }
}
