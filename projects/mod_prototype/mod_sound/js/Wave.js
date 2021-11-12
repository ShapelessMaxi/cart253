class Wave {
  constructor(amp, freq, type) {
    this.oscillator = undefined;
    this.amp = amp;
    this.freq = freq;
    this.type = type;
    this.started = false;

    // define variables for the sine and noise filters
    this.angle = 0;
    this.t = 0;
  }

  createOscillator() {
    this.oscillator = new p5.Oscillator(this.freq, this.type);
    this.oscillator.amp(this.amp);
  }

  // apply a sine wave to the oscillator to make a wave sound
  applySine(atomAmount) {
    let sineAngle = sin(this.angle);
    let minFrequency = atomAmount;
    let frequencyGap = 2;
    let maxFrequency = atomAmount * frequencyGap;
    let newFrequency = map(sineAngle, -1, 1, minFrequency, maxFrequency);
    this.oscillator.freq(newFrequency);
    this.angle += 0.1;

    //apply noise filter over the sine wave
    this.applyNoise(newFrequency);
  }

  // apply a noise filter value over the sine wave
  applyNoise(currentFrequency) {
    let noiseValue = noise(this.t);
    let noiseFilter = map(noiseValue, 0, 1, -25, 25);

    // let currentFrequency = waveSound.oscillator.getFreq();
    let newFrequency = currentFrequency + noiseFilter;

    this.oscillator.freq(newFrequency);
    this.t += 0.1;
  }
}
