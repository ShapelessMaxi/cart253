// create a falling leaf in the background of intro state
class BackgroundLeaf {
  constructor(x, y, w, h) {
    // position and size is defined in intro state (createLeaf method)
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // define the color of the leaf
    this.color = {
      r: 65,
      g: 80,
      b: 30,
      a: 1.8,
    };

    // define the speed of the movement
    this.verticalSpeed = random(0.8, 1.4);
    this.horizontalSpeed = random(0, 2);
  }

  // takes care of moving the leaves
  movement() {
    // move from top to bottom
    this.y += this.verticalSpeed;

    // if the leaves moves from left to right, bigger chance of continuing moving in that direction
    if (this.horizontalSpeed < 0) {
      let chance = random(0, 1);
      if (chance < 0.95) {
        this.x -= this.horizontalSpeed;
      } else {
        this.x += this.horizontalSpeed;
      }
    } else {
      this.x += this.horizontalSpeed;
    }

    // changes the horizontal direction half of the time
    let chance = random(0, 1);
    if (chance < 0.5) {
      this.x -= this.horizontalSpeed;
    }

    // spawns at the top of the screen when it reaches the bottom
    if (this.y > height) {
      this.y = 0;
      this.x = random(0, width);
    }
  }

  // display the leaf
  display() {
    push();
    noStroke();
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    ellipse(this.x, this.y, this.w, this.h);
    pop();
  }
}
