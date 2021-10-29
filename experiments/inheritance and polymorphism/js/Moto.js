class Moto extends Vehicle {
  constructor(x, y) {
    super(x, y);
    this.w = 30;
    this.h = 10;
    this.vx = 10;
  }

  display() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(255, 255, 0);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
