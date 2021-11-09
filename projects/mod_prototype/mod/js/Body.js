// this is the body class (superclass).
// it will be extended in multiple subclasses for each body parts ?(maybe).
// every body part will be some kind of irregular polygon and will have the same color

class Body {
  // give the constructor each vertices coordinates as vectors.
  // keep in mind: va and vi need to connect to other body parts.
  constructor(va, vb, vc, vd, ve, vf, vg, vh, vi) {
    this.color = {
      r: 200,
      g: 25,
      b: 25,
      a: 100,
    };

    // vertices created with createVector() in main script
    this.perimeter = [va, vb, vc, vd, ve, vf, vg, vh, vi];

    // store the circles inside an array
    this.circleArray = [];
  }

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

    // calculate possible spawn area
    let rectArea = (xMaxBorder - xMinBorder) * (yMaxBorder - yMinBorder);
    // define a ratio so there isn't way to many circles (crashes when there's too much cause they can't overlap)
    let circleRatio = 0.01;
    // calculate the number of circles to spawn, depending ont the overall size of the body part
    let numCircles = int(circleRatio * rectArea);

    // create a bunch of circles
    for (let i = 0; i < numCircles; i++) {
      let currentCircle = new Circle(
        random(xMinBorder, xMaxBorder),
        random(yMinBorder, yMaxBorder)
      );

      // check if current circle overlaps with other circles
      this.checkOverlap(currentCircle);
      // check if current circle is outside polygon perimeter
      this.checkOutsideHead(currentCircle);

      while (currentCircle.overlapping || currentCircle.outside) {
        currentCircle.x = random(xMinBorder, xMaxBorder);
        currentCircle.y = random(yMinBorder, yMaxBorder);

        // rerun the check, if one is true, redo the while loop
        this.checkOverlap(currentCircle);
        this.checkOutsideHead(currentCircle);
      }

      // add the current circle to the array
      this.circleArray.push(currentCircle);
    }
  }

  // check if the circles overlaps with each other
  checkOverlap(currentCircle) {
    // loop trough all the circles
    for (let j = 0; j < this.circleArray.length; j++) {
      let otherCircle = this.circleArray[j];
      let d = dist(
        otherCircle.x,
        otherCircle.y,
        currentCircle.x,
        currentCircle.y
      );
      if (d < currentCircle.size / 2 + otherCircle.size / 2) {
        currentCircle.overlapping = true;
        break;
      } else {
        currentCircle.overlapping = false;
      }
    }
  }

  // check if the circles are outside of the head perimeter using collide2D librairy
  checkOutsideHead(currentCircle) {
    if (
      collidePointPoly(currentCircle.x, currentCircle.y, this.perimeter, true)
    ) {
      currentCircle.outside = false;
    } else {
      currentCircle.outside = true;
    }
  }

  display() {
    // display polygon
    push();
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    noStroke();
    beginShape();
    // line from collide2D librairy documentation -> https://github.com/bmoren/p5.collide2D#collidelinepoly
    for (let { x, y } of this.perimeter) vertex(x, y);
    endShape(CLOSE);
    pop();

    // displaying the circles
    for (let j = 0; j < this.circleArray.length; j++) {
      let currentCircle = this.circleArray[j];
      currentCircle.display();
    }
  }
}
