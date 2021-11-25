class Particle {
  constructor(originX, originY, j, r) {
    this.origin = {
      x: originX,
      y: originY,
    };
    this.x = j;
    this.y = r;
    this.size = 8;
    this.color = {
      r: 255,
      g: 0,
      b: 0,
      a: 10,
    };
  }

  display() {
    push();
    noStroke();
    translate(this.origin.x, this.origin.y);
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
