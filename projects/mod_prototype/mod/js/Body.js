// this is the body class (superclass).
// it will be extended in multiple subclasses for each body parts ?(maybe).
// every body part will be some kind of irregular polygon and will have the same color

class Body {
  // give the constructor each vertices coordinates as vectors.
  // keep in mind: va and vi need to connect to other body parts.
  constructor(va, vb, vc, vd, ve, vf, vg, vh, vi) {
    this.color = {
      r: 200,
      g: 0,
      b: 0,
      a: 50,
    };
    // vertices created with createVector() in main script
    this.perimeter = [va, vb, vc, vd, ve, vf, vg, vh, vi];
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
  }
}
