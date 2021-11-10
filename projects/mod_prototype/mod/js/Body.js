// every Body object is some kind of irregular polygon populated by a semi-regular density of atoms.

class Body {
  // give the constructor each vertices coordinates as vectors.
  constructor(va, vb, vc, vd, ve, vf, vg, vh, vi) {
    // define the color of the shape
    this.color = {
      r: 130,
      g: 62,
      b: 25,
      a: 100,
    };

    // vertices created with createVector() in main script
    this.perimeter = [va, vb, vc, vd, ve, vf, vg, vh, vi];

    // store the atoms inside an array
    this.atomArray = [];

    // define the density of atoms
    this.atomRatio = 0.01;
  }

  // populate the polyganal shape with atoms
  populate() {
    // create an array of the x coordinate from the perimeter array
    let xValues = [];
    for (let v = 0; v < this.perimeter.length; v++) {
      let currentVertX = this.perimeter[v].x;
      xValues.push(currentVertX);
    }

    // spread operator(...) to unpack values inside the arrays, used with Math.min() and Math.max() -> https://medium.com/coding-at-dawn/the-fastest-way-to-find-minimum-and-maximum-values-in-an-array-in-javascript-2511115f8621
    // get the min and max value from the x coordinate array
    let xMinBorder = Math.min(...xValues);
    let xMaxBorder = Math.max(...xValues);

    // create an array of the y coordinate from the perimeter array
    let yValues = [];
    for (let v = 0; v < this.perimeter.length; v++) {
      let currentVertY = this.perimeter[v].y;
      yValues.push(currentVertY);
    }

    // get the min and max value from the y coordinate array
    let yMinBorder = Math.min(...yValues);
    let yMaxBorder = Math.max(...yValues);

    // calculate possible spawn surface
    let boxArea = (xMaxBorder - xMinBorder) * (yMaxBorder - yMinBorder);

    // calculate the number of atoms to spawn, depending ont the overall size of the body part
    let numAtoms = int(this.atomRatio * boxArea);

    // create a bunch of atoms in the spawn area
    for (let i = 0; i < numAtoms; i++) {
      let currentAtom = new Atom(
        random(xMinBorder, xMaxBorder),
        random(yMinBorder, yMaxBorder)
      );

      // check if current atom overlaps with other atoms
      this.checkOverlap(currentAtom);
      // check if current atom is outside polygon perimeter
      this.checkOutside(currentAtom);

      while (currentAtom.overlapping || currentAtom.outside) {
        currentAtom.x = random(xMinBorder, xMaxBorder);
        currentAtom.y = random(yMinBorder, yMaxBorder);

        // rerun the check, if one is true, redo the while loop
        this.checkOverlap(currentAtom);
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
