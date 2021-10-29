class Car extends Vehicle {
  constructor(x, y) {
    super(x, y);

    this.w = 50;
    this.h = 20;
    this.speed = 5;
  }

  display() {
    super.display();

    push();
    fill(100, 255, 255);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
