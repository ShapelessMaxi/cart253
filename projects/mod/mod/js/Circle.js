// this is the class for circles that will populate each body parts
// adds elements to modify and play with!

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(10, 20);
    this.color = {
      r: 130,
      g: 175,
      b: 175,
      a: 100,
    };
    this.overlapping = false;
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
