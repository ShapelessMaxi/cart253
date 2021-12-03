// create a ui shape
class UiShape {
  constructor(perimeter) {
    // vertices created with createVector() in main script
    this.perimeter = perimeter;
    // define the border color of the shape
    this.borderColor = {
      r: 160,
      g: 110,
      b: 160,
      a: 15,
    };
    // define the color of the shape
    this.color = {
      r: 55,
      g: 55,
      b: 55,
      a: 25,
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
    for (let { x, y } of this.perimeter) vertex(x, y);
    endShape(CLOSE);
    pop();
  }
}
