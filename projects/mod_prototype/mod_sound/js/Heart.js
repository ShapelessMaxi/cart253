class Heart {
  constructor() {
    this.main = {
      oscillator: undefined,
      amp: 0.9,
      freq: 75,
      type: `sine`,
    };
    this.secondary = {
      oscillator: undefined,
      amp: 0.6,
      freq: 70,
      type: `sine`,
    };
  }
}
