// this is the class for atoms that will populate each body parts

class Atom {
  constructor(x, y, minSize, maxSize) {
    // position and is defined in the populate() method of the Body class
    this.x = x;
    this.y = y;
    this.size = {
      min: minSize,
      max: maxSize,
    };
    // define the color of the atoms, eventualy make (r, g and b) a variable to be able to play with em
    this.color = {
      r: 125,
      g: 255,
      b: 0,
      a: 150,
    };

    // keeps track of overlap with other atoms
    this.overlapping = undefined;
    // keeps track of being outside of the polygon shape it's associated with (body part)
    this.outside = undefined;
  }

  // diplay atoms
  display() {
    let size = random(this.size.min, this.size.max);
    push();
    // fill(255, 0, 0);
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    noStroke();
    ellipse(this.x, this.y, size);
    pop();
  }
}
