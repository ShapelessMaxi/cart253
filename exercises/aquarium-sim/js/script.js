/**
aquarium simulation?
Maxime Perreault

I found this generative artist a few months ago that had a very detailed blog with
different generative projects he did, he would describe the algorihtms and the methods used,
with some code available. I unfortunately cant remember the name, but ill try to link the
blog here and the specific blog entry I talk about in the next paragraph if I find him again!

One blog entry is still stuck in my mind because of its simplicity (from the start I was
like 'hey I think I could make this without too much trouble') and because of how it
looked in the end. It was a bunch of 'handdrawn' lines. Basicaly each vertex of the current
line was generated using the previous line's vertex. I'm trying to be concise here so this
description is very diminutive and not clear woops. in the en it made this wavy lines
pattern ressembling water flow or something. This is my inspo for this project.

here is my plan:
- the 'fishes' are gona be line segments
- there will be multiple arrays of 'fishes', resulting in, I hope, kind of aerodynamic lines
that we see in car commercials
- the 'fishes' will move from left to right, with some sin functions so the follow a wavy path
and with a random 'noise' making the movement a bit more interesting
- when the user clicks the mouse, it will add an 'obstacle' circle, and i hope to be able
to make the fish avoid them
- not sure what to do for the endings yet...
- ending 1: if theres too much obstacle (check % of obstacles vs canvas size?)
- ending 2: timer? press 'x' top stop?
*/

"use strict";

/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/
function setup() {
  background(255, 255, 55);
}

/**
Description of draw()
*/
function draw() {}
