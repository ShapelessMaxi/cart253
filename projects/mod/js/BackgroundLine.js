class BackgroundLine {
  constructor(x, y) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = x;
    this.y2;
    this.size = random(50, 115);
    this.thickness = 2;
    this.color = {
      r: 150,
      g: 20,
      b: 20,
      a: 150,
    };
    this.speed = 100;
  }

  movement() {
    this.y1 -= this.speed;
    // spawns at the bottom of the screen when it reaches the top
    // the 'top' is a really small value, creating a delay before the lines respawn
    let delay = -3500;
    if (this.y2 < delay) {
      this.y1 = height;
      this.x1 = random(0, width);
      this.x2 = this.x1;
    }
  }

  display() {
    this.y2 = this.y1 + this.size;
    push();
    noFill();
    strokeCap(SQUARE);
    strokeWeight(this.thickness);
    stroke(this.color.r, this.color.g, this.color.b, this.color.a);
    line(this.x1, this.y1, this.x2, this.y2);
    pop();
  }
}
