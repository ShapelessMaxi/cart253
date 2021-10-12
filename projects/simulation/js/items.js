// creating a alss for items
// stores behavior and looks for items

class Item {
  //location, size, color, image
  constructor(/*img,*/ x, y) {
    // add img eventualy, for now its just a circle
    /*this.img = img;*/
    this.x = x;
    this.y = y;
    this.size = 30;
    this.color = {
      r: 255,
      g: 255,
      b: 255,
    };
    this.active = true;
    this.picked = false;
  }
  // display an item
  display() {
    push();
    // replace this with tint();
    fill(this.color.r, this.color.g, this.color.b);
    // replace this line with image();
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
