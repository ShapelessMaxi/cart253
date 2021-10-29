class Moto extends Vehicle {
  constructor(x, y) {
    super(x, y);

    this.w = 20;
    this.h = 15;
    this.speed = 8;
  }

  display() {
    super.display();

    push();
    fill(255, 255, 100);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
