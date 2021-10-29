class Truck extends Vehicle {
  constructor(x, y) {
    super(x, y);

    this.w = 80;
    this.h = 25;
    this.speed = 2;
  }

  display() {
    super.display();

    push();
    fill(255, 100, 255);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
