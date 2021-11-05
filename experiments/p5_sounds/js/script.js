"use strict";

let synth;

let notes = [`F4`, `G4`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F5`];
let currentNote = 0;

function setup() {
  createCanvas(500, 500);
  background(5, 43, 15);
  userStartAudio();

  synth = new p5.PolySynth();
}

function draw() {}

function keyPressed() {
  setInterval(playNote, 500);
}

function playNote() {
  let note = notes[currentNote];
  synth.play(note, 1, 0, 0.2);

  currentNote += 1;
  if (currentNote === notes.length) {
    currentNote = 0;
  }
}
