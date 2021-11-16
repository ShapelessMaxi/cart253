class Ui {
  constructor(va, vb, vc, vd, ve, vf, vi, vg) {
    // vertices created with createVector() in main script
    this.perimeter = [va, vb, vc, vd, ve, vf, vi, vg];

    // define the border color of the shape
    this.borderColor = {
      r: 180,
      g: 130,
      b: 180,
      a: 25,
    };

    // define the color of the shape
    this.color = {
      r: 75,
      g: 75,
      b: 75,
      a: 85,
    };

    // define the border thickness
    this.borderThickness = 8;
  }

  display() {
    // display the main shape
    push();
    noStroke();
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    beginShape();

    // line below is from collide2D librairy documentation -> https://github.com/bmoren/p5.collide2D#collidelinepoly
    for (let { x, y } of this.perimeter) vertex(x, y);
    endShape(CLOSE);
    pop();
    // display the border
    push();
    noFill();
    strokeWeight(this.borderThickness);
    stroke(
      this.borderColor.r,
      this.borderColor.g,
      this.borderColor.b,
      this.borderColor.a
    );
    beginShape();
    // line below is from collide2D librairy documentation -> https://github.com/bmoren/p5.collide2D#collidelinepoly
    for (let { x, y } of this.perimeter) vertex(x, y);
    endShape(CLOSE);
    pop();
  }
}
