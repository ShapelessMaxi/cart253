class Intro extends State {
  constructor() {
    super();

    this.font = `Helvetica`;

    introSoundtrack.play();
    introSoundtrack.amp(0.008);
    introSoundtrack.loop();
  }

  update() {
    super.update();

    background(255, 80, 80);

    this.displayText();
  }

  // look at this to animate the tex -> https://creative-coding.decontextualize.com/text-and-type/
  displayText() {
    push();
    textAlign(LEFT);
    textSize(40);
    textFont(this.font);
    fill(200, 200, 200, 100);
    text(`ENTER UR NAME`, 25, 300);
    pop();
  }
}
