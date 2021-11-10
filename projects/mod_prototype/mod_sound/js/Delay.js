class Delay {
  constructor(delayAmp, delayTime, feedback) {
    this.obj = undefined;
    this.amp = delayAmp;
    this.delayTime = delayTime;
    this.feedback = feedback;
  }

  createOscillator(beat) {
    // delay (echo) the main oscillator
    this.obj = new p5.Delay();
    this.obj.amp(this.amp);
    this.obj.process(beat.oscillator, this.delayTime, this.feedback);
  }
}
