// create an atom object, form a particle system inside the bodyparts
class Atom {
  constructor(x, y, minSize, maxSize) {
    // position and size is defined in the populate() method of the Body class
    this.x = x;
    this.y = y;
    this.size = {
      min: minSize,
      max: maxSize,
    };

    // define the basic color of the atoms
    this.basicColor = {
      r: 125,
      g: 255,
      b: 0,
      a: 150,
    };

    // define the colorized color of the atoms
    this.userColor = {
      r: nameColor.r,
      g: nameColor.g,
      b: nameColor.b,
      a: 150,
    };

    // keeps track of overlap with other atoms
    this.overlapping = undefined;
    // keeps track of being outside of the polygon shape it's associated with (body part)
    this.outside = undefined;
  }

  // diplay atoms
  display(colorizedAmount) {
    let size = random(this.size.min, this.size.max);

    let chance = random(0, 1);
    if (chance > colorizedAmount) {
      push();
      fill(
        this.basicColor.r,
        this.basicColor.g,
        this.basicColor.b,
        this.basicColor.a
      );
      noStroke();
      ellipse(this.x, this.y, size);
      pop();
    } else {
      push();
      fill(
        this.userColor.r,
        this.userColor.g,
        this.userColor.b,
        this.userColor.a
      );
      noStroke();
      ellipse(this.x, this.y, size);
      pop();
    }
  }
}
