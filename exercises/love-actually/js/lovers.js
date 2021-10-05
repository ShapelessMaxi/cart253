// Sharon helped me (a lot) with this! thx!
// Stores behaviour for lover

class Lover {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 120;
    this.color = {
      r: 0,
      g: 0,
      b: 0,
    };
    this.active = true;
  }
  // Display my lover as a circle
  display() {
    ellipse(this.x, this.y, this.size);
  }
}
