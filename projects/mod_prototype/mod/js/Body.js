// this is the body class (superclass).
// it will be extended in multiple subclasses for each body parts.

class Body {
  // give the constructor each vertices coordinates as parameters (x1,y1,x2,y2 ...).
  // keep in mind: v1 and v9 need to connect to other body parts.
  constructor(
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    x4,
    y4,
    x5,
    y5,
    x6,
    y6,
    x7,
    y7,
    x8,
    y8,
    x9,
    y9
  ) {
    this.color = {
      r: 180,
      g: 25,
      b: 15,
      a: 80,
    };

    // v1={(x1,y1)} is the first vertex and is fixed
    this.v1 = {
      x1: x1,
      y1: y1,
      fixed: true,
    };
    this.v2 = {
      x2: x2,
      y2: y2,
      fixed: false,
    };
    this.v3 = {
      x3: x3,
      y3: y3,
      fixed: false,
    };
    this.v4 = {
      x4: x4,
      y4: y4,
      fixed: false,
    };
    this.v5 = {
      x5: x5,
      y5: y5,
      fixed: false,
    };
    this.v6 = {
      x6: x6,
      y6: y6,
      fixed: false,
    };
    this.v7 = {
      x7: x7,
      y7: y7,
      fixed: false,
    };
    this.v8 = {
      x8: x8,
      y8: y8,
      fixed: false,
    };
    // v9={(x9,y9)} is the last vertex and is fixed
    this.v9 = {
      x9: x9,
      y9: y9,
      fixed: true,
    };

    // store x values here
    this.xArray = [x1, x2, x3, x4, x5, x6, x7, x8, x9];
    // store y values here
    this.yArray = [y1, y2, y3, y4, y5, y6, y7, y8, y9];
  }

  display() {
    // display border shape
    push();
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    noStroke();
    beginShape();
    vertex(this.v1.x1, this.v1.y1);
    vertex(this.v2.x2, this.v2.y2);
    vertex(this.v3.x3, this.v3.y3);
    vertex(this.v4.x4, this.v4.y4);
    vertex(this.v5.x5, this.v5.y5);
    vertex(this.v6.x6, this.v6.y6);
    vertex(this.v7.x7, this.v7.y7);
    vertex(this.v8.x8, this.v8.y8);
    vertex(this.v9.x9, this.v9.y9);
    endShape(CLOSE);
    pop();
  }
}
