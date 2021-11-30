// create the two sound object forming the heartbeat
class HeartBeat {
  constructor(amp, freq, type, delayAmp, delayTime, feedback) {
    // sound variables for the heart beat, defined in the game createHeartbeat method
    this.amp = amp;
    this.freq = freq;
    this.type = type;

    // create the oscillator
    this.oscillator = new p5.Oscillator(this.freq, this.type);
    this.oscillator.amp(this.amp);

    // sound variables for the delay
    this.delayAmp = delayAmp;
    this.delayTime = delayTime;
    this.feedback = feedback;

    // create the delay
    this.delay = new p5.Delay();
    this.delay.amp(this.delayAmp);
    this.delay.process(this.oscillator, this.delayTime, this.feedback);
  }
}
