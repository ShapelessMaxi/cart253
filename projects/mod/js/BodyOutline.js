// create an object from the current body shape (full body or selected body part)
class BodyOutline {
  constructor(fullPerimeter, localPerimeter, scale) {
    // define the color
    this.color = { r: nameColor.r, g: nameColor.g, b: nameColor.b, a: 215 };

    // define variables for the full body outline
    this.fullPerimeter = {
      array: fullPerimeter,
      xMaxBorder: undefined,
      xMinBorder: undefined,
      yMaxBorder: undefined,
      yMinBorder: undefined,
      xCenter: undefined,
      yCenter: undefined,
    };

    // define variables for the selected body part outline
    this.localPerimeter = {
      array: localPerimeter,
      xMaxBorder: undefined,
      xMinBorder: undefined,
      yMaxBorder: undefined,
      yMinBorder: undefined,
      xCenter: undefined,
      yCenter: undefined,
    };

    this.scale = scale; // possible scale values : 1.35, 1.5, 2
    this.translateRatio = undefined; // possible ratios : -3, -2, -1

    this.hideSpeed = 1;

    this.visible = false;

    // set the appropriate translate ratio
    this.setTranslateRatio();

    // check which center to calculate, then calcualte the full body or the local center
    this.calculateCheck();
  }

  // check if we need to calculate full or local center
  calculateCheck() {
    // check if we need to calculate full or local center
    if (this.localPerimeter.array === undefined) {
      this.calculateFullCenter();
    } else {
      this.calculateLocalCenter();
    }
  }

  // calculate the approximate center point of the current full body to act as the origin point
  calculateFullCenter() {
    // create an array of the x coordinate from the perimeter array
    let xValues = [];
    for (let i = 0; i < this.fullPerimeter.array.length; i++) {
      let currentVertX = this.fullPerimeter.array[i].x;
      xValues.push(currentVertX);
    }

    // spread operator(...) to unpack values inside the arrays, used with Math.min() and Math.max() -> https://medium.com/coding-at-dawn/the-fastest-way-to-find-minimum-and-maximum-values-in-an-array-in-javascript-2511115f8621
    // get the min and max value from the x coordinate array
    this.fullPerimeter.xMinBorder = Math.min(...xValues);
    this.fullPerimeter.xMaxBorder = Math.max(...xValues);

    // create an array of the y coordinate from the perimeter array
    let yValues = [];
    for (let i = 0; i < this.fullPerimeter.array.length; i++) {
      let currentVertY = this.fullPerimeter.array[i].y;
      yValues.push(currentVertY);
    }

    // get the min and max value from the y coordinate array
    this.fullPerimeter.yMinBorder = Math.min(...yValues);
    this.fullPerimeter.yMaxBorder = Math.max(...yValues);

    // find the center of the box
    this.fullPerimeter.xCenter =
      (this.fullPerimeter.xMaxBorder + this.fullPerimeter.xMinBorder) / 2;
    this.fullPerimeter.yCenter =
      (this.fullPerimeter.yMaxBorder + this.fullPerimeter.yMinBorder) / 2;
  }

  // calculate the approximate center point of the current body part to act as the origin point
  calculateLocalCenter() {
    // create an array of the x coordinate from the perimeter array
    let xValues = [];
    for (let i = 0; i < this.localPerimeter.array.length; i++) {
      let currentVertX = this.localPerimeter.array[i].x;
      xValues.push(currentVertX);
    }

    // spread operator(...) to unpack values inside the arrays, used with Math.min() and Math.max() -> https://medium.com/coding-at-dawn/the-fastest-way-to-find-minimum-and-maximum-values-in-an-array-in-javascript-2511115f8621
    // get the min and max value from the x coordinate array
    this.localPerimeter.xMinBorder = Math.min(...xValues);
    this.localPerimeter.xMaxBorder = Math.max(...xValues);

    // create an array of the y coordinate from the perimeter array
    let yValues = [];
    for (let i = 0; i < this.localPerimeter.array.length; i++) {
      let currentVertY = this.localPerimeter.array[i].y;
      yValues.push(currentVertY);
    }

    // get the min and max value from the y coordinate array
    this.localPerimeter.yMinBorder = Math.min(...yValues);
    this.localPerimeter.yMaxBorder = Math.max(...yValues);

    // find the center of the box
    this.localPerimeter.xCenter =
      (this.localPerimeter.xMaxBorder + this.localPerimeter.xMinBorder) / 2;
    this.localPerimeter.yCenter =
      (this.localPerimeter.yMaxBorder + this.localPerimeter.yMinBorder) / 2;
  }

  // set the appropriate translate ratio (this was a 'essai-erreur' process...)
  setTranslateRatio() {
    if (this.scale === 1.35) {
      this.translateRatio = -3;
    } else if (this.scale === 1.5) {
      this.translateRatio = -2;
    } else if (this.scale === 3) {
      this.translateRatio = -0.5;
    } else {
      this.translateRatio = -1;
    }
  }

  // display a full body outline
  displayFullOutline() {
    if (this.visible) {
      push();
      fill(this.color.r, this.color.g, this.color.b, this.color.a);
      noStroke();
      translate(
        this.fullPerimeter.xCenter / this.translateRatio,
        this.fullPerimeter.yCenter / this.translateRatio
      );
      scale(this.scale);
      beginShape(TRIANGLES);
      // line below is from collide2D librairy documentation -> https://github.com/bmoren/p5.collide2D#collidelinepoly
      for (let { x, y } of this.fullPerimeter.array) vertex(x, y);
      endShape(CLOSE);
      pop();
    }
  }

  // display a selected body part outline
  displaySelectedOutline() {
    if (this.visible) {
      push();
      fill(this.color.r, this.color.g, this.color.b, this.color.a);
      noStroke();
      translate(
        this.localPerimeter.xCenter / this.translateRatio,
        this.localPerimeter.yCenter / this.translateRatio
      );
      scale(this.scale);
      beginShape(QUAD_STRIP);
      // line below is from collide2D librairy documentation -> https://github.com/bmoren/p5.collide2D#collidelinepoly
      for (let { x, y } of this.localPerimeter.array) vertex(x, y);
      endShape(CLOSE);
      pop();
    }
  }
}
