// this is the class for atoms that will populate each body parts

class Atom {
  constructor(x, y) {
    // position is defined in the populate() method of the Body class
    this.x = x;
    this.y = y;

    // for now, size is a random value between 4 and 6. eventualy make it a variable to be able to play with it
    this.size = random(3, 5);

    // define the color of the atoms, eventualy make (r, g and b) a variable to be able to play with em
    this.color = {
      r: 210,
      g: 175,
      b: 235,
      a: 200,
    };

    // keeps track of overlap with other atoms
    this.overlapping = undefined;

    // keeps track of being outside of the polygon shape it's associated with (body part)
    this.outside = undefined;
  }

  // diplay atoms
  display() {
    push();
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
