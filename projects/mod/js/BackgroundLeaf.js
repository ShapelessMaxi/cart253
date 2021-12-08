// create a falling 'leaf' in the background of the intro state
class BackgroundLeaf {
  constructor(x, y, w, h) {
    // position and size is defined in intro state
    this.position = {
      x: x,
      y: y,
    };
    this.size = {
      w: w,
      h: h,
    };

    // define the color of the leaf
    this.color = {
      r: 65,
      g: 80,
      b: 30,
      a: 9,
    };

    // define the speed of the movement
    this.speed = {
      vertical: random(0.8, 1.4),
      horizontal: random(0, 2),
    };
  }

  // takes care of moving the leaves
  movement() {
    // move from top to bottom
    this.position.y += this.speed.vertical;

    // if the leaves moves from left to right, bigger chance of continuing moving in that direction
    if (this.horizontalSpeed < 0) {
      let chance = random(0, 1);
      if (chance < 0.95) {
        this.position.x -= this.speed.horizontal;
      } else {
        this.position.x += this.speed.horizontal;
      }
    } else {
      this.position.x += this.speed.horizontal;
    }

    // changes the horizontal direction half of the time
    let chance = random(0, 1);
    if (chance < 0.5) {
      this.position.x -= this.speed.horizontal;
    }

    // spawns at the top of the screen when it reaches the bottom
    if (this.position.y > height) {
      this.position.y = 0;
      this.position.x = random(0, width);
    }
  }

  // display the leaf
  display() {
    push();
    noStroke();
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    ellipse(this.position.x, this.position.y, this.size.w, this.size.h);
    pop();
  }
}
