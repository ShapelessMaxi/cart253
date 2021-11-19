class Heartbeat {
  constructor(amp, freq, type) {
    this.oscillator;
    this.amp = amp;
    this.freq = freq;
    this.type = type;
  }

  createOscillator() {
    this.oscillator = new p5.Oscillator(this.freq, this.type);
    this.oscillator.amp(this.amp);
  }
}
