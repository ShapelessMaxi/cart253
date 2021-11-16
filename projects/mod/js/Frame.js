class Frame {
  constructor(va, vb) {
    // vertices created with createVector() in main script
    this.va = va;
    this.vb = vb;

    // define the color of the shape
    this.color = {
      r: 255,
      g: 80,
      b: 80,
      a: 75,
    };

    // define the line thickness
    this.thickness = 6;
  }

  display() {
    // display the border
    push();
    noFill();
    strokeCap(SQUARE);
    strokeWeight(this.thickness);
    stroke(this.color.r, this.color.g, this.color.b, this.color.a);
    line(this.va.x, this.va.y, this.vb.x, this.vb.y);
    pop();
  }
}
