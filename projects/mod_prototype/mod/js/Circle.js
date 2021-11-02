// this is the class for circles that will populate each body parts
// adds elements to modify and play with!

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(10, 15);
    this.color = {
      r: 210,
      g: 175,
      b: 235,
      a: 200,
    };
    this.overlapping = undefined;
    this.outside = undefined;
  }

  display() {
    // display populating circles
    push();
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
