// comment this also fdgagdsa
class Particle {
  constructor(originX, originY, newX, r) {
    this.origin = {
      x: originX,
      y: originY,
    };
    this.x = newX;
    this.y = r;
    this.size = 8;
    this.color = {
      r: 160,
      g: 230,
      b: 50,
      a: 20,
    };
  }

  display() {
    push();
    noStroke();
    translate(this.origin.x, this.origin.y);
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  flicker() {
    let minAlpha = 0;
    let maxAlpha = 60;
    let speedReducer = 12; // higher number means slower flicker
    let noiseValue = noise(frameCount / speedReducer);
    noiseValue = map(noiseValue, 0, 1, minAlpha, maxAlpha);
    this.color.a = noiseValue;
  }
}
