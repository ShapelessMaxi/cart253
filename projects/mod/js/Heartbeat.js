// create the two sound object forming the heartbeat
class Heartbeat {
  constructor(amp, freq, type, delayAmp) {
    // sound variables defined in the game createHeartbeat method
    this.amp = amp;
    this.freq = freq;
    this.type = type;

    // create the oscillator
    this.oscillator = new p5.Oscillator(this.freq, this.type);
    this.oscillator.amp(this.amp);
  }
}
