// create an atom object, form a particle system inside each bodypart
class Atom {
  constructor(x, y, minSize, maxSize) {
    // position and size is defined in the populate() method of the Body class
    this.position = {
      x: x,
      y: y,
    };
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
    // set the atom size to a random value
    let size = random(this.size.min, this.size.max);

    // colorized atoms variable is a percentage value set by the colorized method
    let chance = random(0, 1);
    if (chance > colorizedAmount) {
      // display the atom with the basic color
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
      // display the atom with the user color
      push();
      fill(
        this.userColor.r,
        this.userColor.g,
        this.userColor.b,
        this.userColor.a
      );
      noStroke();
      ellipse(this.position.x, this.position.y, size);
      pop();
    }
  }
}
