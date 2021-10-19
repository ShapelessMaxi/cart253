// creating a class for groups
// stores behavior and arrays for groups

class Group {
  constructor(y, xVel) {
    // starting point of the first array member
    this.x = 0;
    this.y = y;
    this.xVel = xVel;
    this.yVel = random(0, 1);
  }
  move() {}
}
