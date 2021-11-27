// create the two sound object forming a delay for the heartbeat (makes it a bit more alive!)
class HeartDelay {
  constructor(delayAmp, delayTime, feedback, beat) {
    // sound variables defined in the game createHeartbeatDelay method
    this.obj;
    this.amp = delayAmp;
    this.delayTime = delayTime;
    this.feedback = feedback;

    // create the delay sound with process method (p5.sound method)
    this.obj = new p5.Delay();
    this.obj.amp(this.amp);
    this.obj.process(beat.oscillator, this.delayTime, this.feedback);
  }
}
