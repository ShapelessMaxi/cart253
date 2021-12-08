// create a travelling particle in the currently selected body part
// ** there's a problem somewhere in here to fix: the atom sometimes does not change direction as much as it should
class TravellingAtom {
  constructor(xCenter, yCenter, vertex1, vertex2, vertex3, vertex4) {
    // start position is center of the other vertices
    this.x = xCenter;
    this.y = yCenter;

    // positions of the ends of the different paths defined in the cruise method
    this.center = {
      x: xCenter,
      y: yCenter,
    };
    this.vertex1 = {
      x: vertex1.x,
      y: vertex1.y,
    };
    this.vertex2 = {
      x: vertex2.x,
      y: vertex2.y,
    };
    this.vertex3 = {
      x: vertex3.x,
      y: vertex3.y,
    };
    this.vertex4 = {
      x: vertex4.x,
      y: vertex4.y,
    };

    // define the size and the color
    this.size = 28;
    this.color = {
      r: nameColor.r,
      g: nameColor.g,
      b: nameColor.b,
      a: 30,
    };

    // define the speed
    this.speed = 0.1;

    // calculate the 5 directions
    this.currentDirection = {
      x: undefined,
      y: undefined,
    };

    // center to vertex1
    this.direction1 = {
      x: this.vertex1.x - this.center.x,
      y: this.vertex1.y - this.center.y,
      changed: false,
    };

    // vertex1 to vertex2
    this.direction2 = {
      x: this.vertex2.x - this.vertex1.x,
      y: this.vertex2.y - this.vertex1.y,
      changed: false,
    };

    // vertex2 to vertex3
    this.direction3 = {
      x: this.vertex3.x - this.vertex2.x,
      y: this.vertex3.y - this.vertex2.y,
      changed: false,
    };

    // vertex3 to vertex4
    this.direction4 = {
      x: this.vertex4.x - this.vertex3.x,
      y: this.vertex4.y - this.vertex3.y,
      changed: false,
    };

    // vertex4 to center
    this.direction5 = {
      x: this.center.x - this.vertex4.x,
      y: this.center.y - this.vertex4.y,
      changed: false,
    };
  }

  // display the atom
  display() {
    push();
    noStroke();
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // make the atom travel
  movement() {
    // depending on the position of each vertex relative to the next vertex,
    // check if the atom has reached the next vertex, then change the direction
    if (!this.direction1.changed) {
      // travel from center to vertex1
      this.changeDirection(this.direction1);
    } else if (this.direction1.changed && !this.direction2.changed) {
      // travel from vertex1 to vertex2
      let reached = this.nextVertexReached(this.center, this.vertex1);
      if (reached) {
        this.changeDirection(this.direction2);
      }
    } else if (
      this.direction1.changed &&
      this.direction2.changed &&
      !this.direction3.changed
    ) {
      // travel from vertex2 to vertex3
      let reached = this.nextVertexReached(this.vertex1, this.vertex2);
      if (reached) {
        this.changeDirection(this.direction3);
      }
    } else if (
      this.direction1.changed &&
      this.direction2.changed &&
      this.direction3.changed &&
      !this.direction4.changed
    ) {
      // travel from vertex3 to vertex4
      let reached = this.nextVertexReached(this.vertex2, this.vertex3);
      if (reached) {
        this.changeDirection(this.direction4);
      }
    } else if (
      this.direction1.changed &&
      this.direction2.changed &&
      this.direction3.changed &&
      this.direction4.changed &&
      !this.direction5.changed
    ) {
      // travel from vertex4 to center
      let reached = this.nextVertexReached(this.vertex3, this.vertex4);
      if (reached) {
        this.changeDirection(this.direction5);
      }
    }

    // apply the speed and the direction
    this.x += this.speed * this.currentDirection.x;
    this.y += this.speed * this.currentDirection.y;
  }

  // check if the next vertex has been reached
  nextVertexReached(startVertex, nextVertex) {
    // check if center is left or right, top or bottom, from vertex1
    // we need the info to know when the atom will have reached the vertex
    let vertexIsLeft = this.checkLeft(startVertex.x, nextVertex.y);
    let vertexIsTop = this.checkTop(startVertex.x, nextVertex.y);

    if (vertexIsLeft && vertexIsTop) {
      if (this.x > nextVertex.x && this.y > nextVertex.y) {
        return true;
      }
    } else if (!vertexIsLeft && vertexIsTop) {
      if (this.x < nextVertex.x && this.y > nextVertex.y) {
        return true;
      }
    } else if (!vertexIsLeft && !vertexIsTop) {
      if (this.x < nextVertex.x && this.y < nextVertex.y) {
        return true;
      }
    } else if (vertexIsLeft && !vertexIsTop) {
      if (this.x > nextVertex.x && this.y < nextVertex.y) {
        return true;
      }
    }
  }

  // check if a point is left or right of another point
  checkLeft(x1, x2) {
    if (x1 < x2) {
      return true;
    } else {
      return false;
    }
  }

  // check if a point is higher or lower than another point
  checkTop(y1, y2) {
    if (y1 < y2) {
      return true;
    } else {
      return false;
    }
  }

  // change the current direction to direction 1
  changeDirection(direction) {
    this.currentDirection.x = direction.x;
    this.currentDirection.y = direction.y;
    //keep track of the direction being changed (each direction only change once)
    direction.changed = true;
  }
}
