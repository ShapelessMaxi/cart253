class Car extends Vehicle {
  constructor(x, y) {
    super(x, y);
    this.w = 50;
    this.h = 20;
    this.vx = 5;
  }

  display() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
