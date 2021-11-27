// every Body object is an irregular polygon of 7 segments and 9 vertices
// populated by a semi-regular density of atoms

class Bodypart {
  // the constructor is given a perimeter when object is created in the game state
  constructor(perimeter) {
    // define the color of the shape
    this.color = {
      r: 88,
      g: 224,
      b: 135,
      a: 10,
    };

    // vertices created with createVector() in main script
    this.perimeter = perimeter;

    // define spawn box related variables
    this.spawnBox = {
      boxArea: undefined,
      xMinBorder: undefined,
      yMinBorder: undefined,
      xMaxBorder: undefined,
      yMaxBorder: undefined,
      xCenter: undefined,
      yCenter: undefined,
    };

    // store the atoms inside an array
    this.atomArray = [];
    // define the density of atoms
    this.atomRatio = 0.015;
    // define the size of atoms in this body part
    this.atomSize = {
      min: 3,
      max: 4,
    };

    // keep track of the bodypart being selected
    this.selected = false;
  }

  // calculate the possible spaw area and the density of atoms, and the center of the box
  spawnboxMath() {
    // create an array of the x coordinate from the perimeter array
    let xValues = [];
    for (let v = 0; v < this.perimeter.length; v++) {
      let currentVertX = this.perimeter[v].x;
      xValues.push(currentVertX);
    }

    // spread operator(...) to unpack values inside the arrays, used with Math.min() and Math.max() -> https://medium.com/coding-at-dawn/the-fastest-way-to-find-minimum-and-maximum-values-in-an-array-in-javascript-2511115f8621
    // get the min and max value from the x coordinate array
    this.spawnBox.xMinBorder = Math.min(...xValues);
    this.spawnBox.xMaxBorder = Math.max(...xValues);

    // create an array of the y coordinate from the perimeter array
    let yValues = [];
    for (let v = 0; v < this.perimeter.length; v++) {
      let currentVertY = this.perimeter[v].y;
      yValues.push(currentVertY);
    }

    // get the min and max value from the y coordinate array
    this.spawnBox.yMinBorder = Math.min(...yValues);
    this.spawnBox.yMaxBorder = Math.max(...yValues);

    // calculate possible spawn surface
    this.spawnBox.boxArea =
      (this.spawnBox.xMaxBorder - this.spawnBox.xMinBorder) *
      (this.spawnBox.yMaxBorder - this.spawnBox.yMinBorder);

    // find the center of the box
    this.spawnBox.xCenter =
      (this.spawnBox.xMaxBorder + this.spawnBox.xMinBorder) / 2;
    this.spawnBox.yCenter =
      (this.spawnBox.yMaxBorder + this.spawnBox.yMinBorder) / 2;
  }

  // populate the polyganal shape with atoms
  populate() {
    // calculate the possible spawn area of atoms and the density
    this.spawnboxMath();

    // calculate the number of atoms to spawn, depending ont the overall size of the body part
    let numAtoms = int(this.atomRatio * this.spawnBox.boxArea);

    // create a bunch of atoms in the spawn area
    for (let i = 0; i < numAtoms; i++) {
      let currentAtom = new Atom(
        random(this.spawnBox.xMinBorder, this.spawnBox.xMaxBorder),
        random(this.spawnBox.yMinBorder, this.spawnBox.yMaxBorder),
        this.atomSize.min,
        this.atomSize.max
      );

      // 7.5% of the time, don't check if atoms overlap (fix algorithm crash)
      let chance = random(0, 1);
      let unchecked = 0.075;
      if (chance > unchecked) {
        // check if current atom overlaps with other atoms
        this.checkOverlap(currentAtom);
      }
      // check if current atom is outside polygon perimeter
      this.checkOutside(currentAtom);

      // respawn the atom if its overlapping with another or if outside of the perimeter
      while (currentAtom.overlapping || currentAtom.outside) {
        currentAtom.x = random(
          this.spawnBox.xMinBorder,
          this.spawnBox.xMaxBorder
        );
        currentAtom.y = random(
          this.spawnBox.yMinBorder,
          this.spawnBox.yMaxBorder
        );

        // rerun the checks, if one is true, redo the while loop
        let chance = random(0, 1);
        if (chance > unchecked) {
          this.checkOverlap(currentAtom);
        }
        this.checkOutside(currentAtom);
      }

      // add the current atom to the array
      this.atomArray.push(currentAtom);
    }
  }

  // check if the atoms overlaps with each other
  checkOverlap(currentAtom) {
    // loop trough all the atoms
    for (let j = 0; j < this.atomArray.length; j++) {
      let otherAtom = this.atomArray[j];

      // calculate the distance between the center of the two atoms
      let d = dist(otherAtom.x, otherAtom.y, currentAtom.x, currentAtom.y);

      // if the distance is smaller than the two radius combined, the atoms touch
      if (d < currentAtom.size / 2 + otherAtom.size / 2) {
        currentAtom.overlapping = true;
        // break the loop because they overlap
        break;
      } else {
        currentAtom.overlapping = false;
      }
    }
  }

  // check if the atoms are outside of the polygon perimeter
  checkOutside(currentAtom) {
    // using collidePointPoly method from p5.2dcollide library,
    // calculate if the current atom touches the perimeter of the shape.
    // last boolean value is to check if it is inside of the shape.
    let isInside = collidePointPoly(
      currentAtom.x,
      currentAtom.y,
      this.perimeter,
      true
    );

    if (isInside) {
      currentAtom.outside = false;
    } else {
      currentAtom.outside = true;
    }
  }

  // display the polygon border shape
  displayPolygon() {
    push();
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    noStroke();
    beginShape();
    // line below is from collide2D librairy documentation -> https://github.com/bmoren/p5.collide2D#collidelinepoly
    for (let { x, y } of this.perimeter) vertex(x, y);
    endShape(CLOSE);
    pop();
  }

  // display the atoms
  displayAtoms() {
    // loop trough
    for (let j = 0; j < this.atomArray.length; j++) {
      let currentAtom = this.atomArray[j];
      currentAtom.display();
    }
  }
}
