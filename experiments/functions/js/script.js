function setup() {
  createCanvas(500, 500);

  let hotCelsius = toCelsius(100);
  console.log(`100 degress Farenheit is ${hotCelsius} degrees celius`);
}

function draw() {
  background(0);
}

function toCelsius(fahrenheit) {
  let celsius = ((fahrenheit - 32) * 5) / 9;
  return celsius;
}
