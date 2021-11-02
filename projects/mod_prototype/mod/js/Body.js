// this is the body class (superclass).
// it will be extended in multiple subclasses for each body parts ?(maybe).

class Body {
  // give the constructor each vertices coordinates as vectors.
  // keep in mind: va and vi need to connect to other body parts.
  constructor(va, vb, vc, vd, ve, vf, vg, vh, vi) {
    this.color = {
      r: 200,
      g: 0,
      b: 0,
      a: 120,
    };
    // vertices created with createVector() in main script
    this.perimeter = [va, vb, vc, vd, ve, vf, vg, vh, vi];
  }

  display() {
    // display border shape
    push();
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    noStroke();
    beginShape();
    for (let { x, y } of this.perimeter) vertex(x, y);
    endShape(CLOSE);
    pop();
  }
}
