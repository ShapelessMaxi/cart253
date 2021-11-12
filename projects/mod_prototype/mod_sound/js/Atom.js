class Atom {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(8, 10);
    this.color = {
      r: 200,
      g: 5,
      b: 15,
      a: 100,
    };
  }

  display() {
    push();
    noStroke();
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
