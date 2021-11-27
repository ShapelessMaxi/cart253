// create a moving line in the background of intro state
class BackgroundLine {
  constructor(x, y) {
    // position is defined in the game state (createBackgroundLines method)
    this.x1 = x;
    this.y1 = y;
    this.x2 = x;
    this.y2;

    // define the size, thickness and color of the lines
    this.size = random(50, 115);
    this.thickness = 4;
    this.color = {
      r: 150,
      g: 20,
      b: 20,
      a: 150,
    };

    // define the speed of the movement
    this.speed = 100;
  }

  // takes care of the movement of the lines
  movement() {
    // move bottom to top
    this.y1 -= this.speed;

    // spawns at the bottom of the screen when it reaches the top
    // the 'top' is a really small value, creating a delay before the lines respawn
    let delay = -3500;
    if (this.y2 < delay) {
      this.y1 = height;
      this.x1 = random(0, width);
      this.x2 = this.x1;
    }
  }

  // display the background line
  display() {
    this.y2 = this.y1 + this.size;
    push();
    noFill();
    strokeCap(SQUARE);
    strokeWeight(this.thickness);
    stroke(this.color.r, this.color.g, this.color.b, this.color.a);
    line(this.x1, this.y1, this.x2, this.y2);
    pop();
  }
}
