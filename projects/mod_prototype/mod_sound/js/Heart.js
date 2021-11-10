class Heart {
  constructor(amp, freq, type) {
    this.oscillator = undefined;
    this.amp = amp;
    this.freq = freq;
    this.type = type;
  }

  createOscillator() {
    // create the main oscillator for the heartbeat
    this.oscillator = new p5.Oscillator(this.freq, this.type);
    this.oscillator.amp(this.amp);
  }
}
