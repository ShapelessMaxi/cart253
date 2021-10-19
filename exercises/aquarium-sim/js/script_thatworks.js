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
let group = [];

let groupNum = 2;
let groupRange = 10;

let entityNum = 100;
let entityLen = 8;

/**
create canvas
*/
function setup() {
  // creating canvas
  createCanvas(1000, 500);

  // creating entities and pushing them into group array
  createGroup();
}

/**
drawing simulaion elements
*/
function draw() {
  // drawing backgroup
  background(25);

  // iterating through the group, and displaying the elements

  for (let i = 0; i < group.length; i++) {
    displayEntity(group[i]);
    moveEntity(group[i]);
  }
}

function createGroup() {
  for (let i = 0; i < entityNum; i++) {
    // creating entities
    let entity = createEntity(random(0, width), random(0, height));
    // adding entities to group array
    group.push(entity);
  }
}

function createEntity(x, y) {
  let entity = {
    x1: x,
    y1: y,
    x2: x + entityLen,
    y2: y,
    vx: undefined,
    vy: undefined,
  };
  return entity;
}

// function createGroup(topLimit) {
//   let group = {
//     array: [],
//     topLimit: topLimit,
//     botLimit: topLimit + groupRange,
//   };
//
//   return group;
// }

function displayEntity(entity) {
  push();
  noFill();
  stroke(200);
  strokeWeight(5);
  line(entity.x1, entity.y1, entity.x2, entity.y2);
  pop();
}

function moveEntity(entity, group) {
  // horizontal movement
  entity.vx = random(1, 3);
  entity.x1 += entity.vx;
  entity.x2 += entity.vx;

  // vertical movement
  let chance = random(0, 1);
  // higher chance to go up (and faster)
  if (chance < 0.08) {
    entity.vy = 5;
    entity.y1 -= entity.vy;
    entity.y2 -= entity.vy;
  } else if (chance > 0.95) {
    entity.vy = random(1, 3);
    entity.y1 += entity.vy;
    entity.y2 += entity.vy;
  }

  // loop back on the right when entities goes off canvas (on the left)
  if (entity.x1 > width) {
    entity.x1 = 0 - entityLen;
    entity.x2 = entity.x1 + entityLen;
    entity.y1 = random(0, height);
    entity.y2 = entity.y1;
  }

  // // constrain y positon to group's range
  // constrain(entity.y1, group.topLimit, group.botLimit);
}
