class Ball {
  constructor(x, y, note) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.fill = {
      r: random(200, 255),
      g: random(200, 255),
      b: random(200, 255),
    };
    this.speed = 3;
    this.vx = random(-this.speed, this.speed);
    this.vy = random(-this.speed, this.speed);

    // define oscillator values
    this.oscillator = new p5.Oscillator();
    this.nearFrequency = 220;
    this.farFrequency = 440;
    this.oscillator.amp(0.025);
    this.oscillator.start();

    // define synth values (for bounce sound)
    this.note = note;
    this.synth = new p5.PolySynth();
  }

  move() {
    // ball movement
    this.x += this.vx;
    this.y += this.vy;

    // oscillator frequency depending on ball position
    let distFromCenter = dist(this.x, this.y, width / 2, height / 2);
    let maxDistance = dist(0, 0, width / 2, height / 2);
    let newFrequency = map(
      distFromCenter,
      0,
      maxDistance,
      this.nearFrequency,
      this.farFrequency
    );
    this.oscillator.freq(newFrequency);
  }

  bounce() {
    if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > width) {
      // change direction of the ball
      this.vx = -this.vx;
      // play note
      this.playNote();
    }
    if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > height) {
      // change direction of the ball
      this.vy = -this.vy;
      // play note
      this.playNote();
    }
  }

  playNote() {
    this.synth.play(this.note, 0.4, 0, 0.1);
  }

  display() {
    push();
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
