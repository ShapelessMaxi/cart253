// create a frameline (line framing the canvas, kinda)
// used in the menu and game state
class Frameline {
  constructor(va, vb) {
    // vertices defined in the createFrameLine method (game) and the createFlashingLines methd (menu)
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
    this.thickness = 5;
  }

  // display the line
  display() {
    push();
    noFill();
    strokeCap(SQUARE);
    strokeWeight(this.thickness);
    stroke(this.color.r, this.color.g, this.color.b, this.color.a);
    line(this.va.x, this.va.y, this.vb.x, this.vb.y);
    pop();
  }
}
