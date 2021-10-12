// creating a alss for items
// stores behavior and looks for items

class Item {
  //location, size, color, image
  constructor(image, x, y) {
    this.img = image;
    this.x = x;
    this.y = y;
    this.size = 50;
    this.color = {
      r: 232,
      g: 106,
      b: 97,
    };
    this.active = true;
    this.picked = false;
  }
  // display an item
  display() {
    push();
    tint(this.color.r, this.color.g, this.color.b);
    image(this.img, this.x, this.y, this.size, this.size);
    pop();
  }
}
