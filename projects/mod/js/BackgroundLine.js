// create a moving line in the background of intro state
class BackgroundLine {
  constructor(x, y) {
    // position is defined in the game state
    this.position = {
      x1: x,
      y1: y,
      x2: x,
      y2: undefined,
    };

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
    this.position.y1 -= this.speed;

    // spawns at the bottom of the screen when it reaches the top
    // the 'top' is a really small value, creating a delay before the lines respawn
    let delay = -3500;
    if (this.position.y2 < delay) {
      this.position.y1 = height;
      this.position.x1 = random(0, width);
      this.position.x2 = this.position.x1;
    }
  }

  // display the background line
  display() {
    this.position.y2 = this.position.y1 + this.size;
    push();
    noFill();
    strokeCap(SQUARE);
    strokeWeight(this.thickness);
    stroke(this.color.r, this.color.g, this.color.b, this.color.a);
    line(
      this.position.x1,
      this.position.y1,
      this.position.x2,
      this.position.y2
    );
    pop();
  }
}
