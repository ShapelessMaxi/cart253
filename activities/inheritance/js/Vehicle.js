class Vehicle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = undefined;
    this.h = undefined;
    this.speed = undefined;
    this.vx = 0;
    this.vy = 0;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  wrap() {
    if (this.x > width) {
      this.x -= width;
    } else if (this.x < 0) {
      this.x += width;
    }
  }

  display() {
    //defined in subclasses
  }
}
