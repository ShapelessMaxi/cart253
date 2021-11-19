class HeartDelay {
  constructor(delayAmp, delayTime, feedback) {
    this.obj;
    this.amp = delayAmp;
    this.delayTime = delayTime;
    this.feedback = feedback;
  }

  createDelay(beat) {
    this.obj = new p5.Delay();
    this.obj.amp(this.amp);
    this.obj.process(beat.oscillator, this.delayTime, this.feedback);
  }
}
