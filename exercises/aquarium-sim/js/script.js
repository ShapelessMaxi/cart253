/**
balance is key
Maxime Perreault

ps: I will leave this here to go back to it for a future project, but dont get too
attached to this plan and inspo story!

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

*********** ok so in the middle of writing code i had another idea that came from a 'bug'
so the plan is off ! (will reuse it maybe eventualy)

NEW PROJECT DIRECTION:
You are in a field of grass, and you control the sun. The sun grows when you press the mouse.
With great power comes great resposibility. You have to be careful to not let the grass die.
If the sun shines for too long, the grass willl burn. If the sun is not strong enough, the
grass will perish.
*/

"use strict";
let grassGroup = [];
let botLimit = undefined;
let topLimit = undefined;

let grassNum = 300;

// this affects the slope of the grass blades. bigger number means more slanted.
// distance from x1 and x2
let grassLen = 20;

let sun = {
  x: 100,
  y: 100,
  size: 50,
  grow: 10,
  color: {
    r: 70,
    g: 2,
    b: 20,
    a: 100,
  },
};
let light = {
  r: 255,
  g: 250,
  b: 215,
  a: 0,
};
let button = {
  x: undefined,
  y: undefined,
  size: 550,
  color: {
    r: 245,
    g: 180,
    b: 140,
  },
  hovering: false,
};

// day timer
let numSecondsDay = 30;
let numMinutesDay = 2;

// night timer
let numSecondsNight = 30;
let numMinutesNight = 2;

// will display timers
let isDay = false;

// timer text
let dayTimeText = undefined;
let nightTimeText = undefined;

// states
let state = `intro`; //possible state: intro, simulation, endBurn, endRot
let burnImg = undefined;
let rotImg = undefined;

// preloading images for endings
function preload() {
  burnImg = loadImage(`assets/images/fire.png`);
  rotImg = loadImage(`assets/images/rot.png`);
}
// create canvas and create entities
function setup() {
  // creating canvas
  createCanvas(1000, 500);

  // creating individual grass and pushing them into grassGroup array
  createGrassGroup();
}

// drawing simulaion elements
function draw() {
  if (state === `intro`) {
    intro();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `endBurn`) {
    endBurn();
  } else if (state === `endRot`) {
    endRot();
  }
}

// contains intro elements
function intro() {
  background(153, 132, 142);

  drawButton();
  buttonChange();

  // text
  push();
  textSize(16);
  textAlign(LEFT);
  fill(245, 180, 140);
  text(
    `"I have to let you know but, you are in a grass field now, and you control the sun.
The sun grows when you 'press the mouse'. It's weird, I know, but with great power
comes great resposibility.

You have to be careful not to let the grass die.
If the sun shines for too long, the grass willl burn, and maybe you will too.
If the sun is not strong enough, the grass will perish and rot, like any future plans you had."`,
    50,
    335
  );
  pop();
}

// contains simulation elements
function simulation() {
  // drawing backgroud
  drawBg();

  // drawing sun
  drawSun();

  // iterating through the grassGroup, and displaying the elements
  for (let i = 0; i < grassGroup.length; i++) {
    displayGrass(grassGroup[i]);
    moveGrass(grassGroup[i]);
  }

  // allow the day timer to start
  dayTimer();
  // allow the night timer to start
  nightTimer();
}

// contains first ending elements
function endBurn() {
  // backgroung color
  background(161, 21, 35);
  // fire image
  push();
  tint(82, 4, 30);
  image(burnImg, 270, 60, 750, 450);
  pop();
  // text
  push();
  fill(82, 4, 30);
  textSize(18);
  textAlign(LEFT);
  text(
    `"Hey, you were not able to take care of the grass... That's OK.
I hope you enjoyed the landscape.

Now burn."`,
    50,
    50
  );
  pop();
}

// contains second ending elements
function endRot() {
  // backgroung color
  background(33, 24, 38);
  // fire image
  push();
  tint(138, 129, 106);
  image(rotImg, -100, 340, 1200, 450);
  pop();
  // text
  push();
  fill(138, 129, 106);
  textSize(18);
  textAlign(LEFT);
  text(
    `"Hey, you were not able to take care of the grass... That's OK.
I hope you enjoyed the landscape.

Now rot."`,
    50,
    50
  );
  pop();
}

// buttons changes color if mouse is hovering
function buttonChange() {
  button.hovering = checkHover();
  if (button.hovering) {
    button.color.r = 190;
    button.color.g = 145;
    button.color.b = 125;
  } else {
    button.color.r = 245;
    button.color.g = 180;
    button.color.b = 140;
  }
}

// drawing the button
function drawButton() {
  // button shape
  push();
  noStroke();
  fill(button.color.r, button.color.g, button.color.b);
  button.x = width;
  button.y = height / 2;
  ellipse(button.x, button.y, button.size);
  pop();
  // button arrow
  push();
  stroke(153, 132, 142);
  strokeWeight(15);
  line(900, 210, 950, height / 2, 600, 500, 900, height / 2);
  line(900, 290, 950, height / 2, 600, 500, 900, height / 2);
  pop();
}

// check if mouse is on button
function checkHover() {
  let d = dist(mouseX, mouseY, button.x, button.y);
  if (d < button.size / 2) {
    return true;
  }
}

// creates individual grass and push them in the grass group
function createGrassGroup() {
  for (let i = 0; i < grassNum; i++) {
    // creating entities
    let grass = createGrass(random(0, width), random(0, height));
    // adding entities to grassGroup array
    grassGroup.push(grass);
  }
}

// create individual grass blades
function createGrass(x, y) {
  let grass = {
    x1: x,
    y1: y,
    x2: x + grassLen,
    y2: y,
    vx: undefined,
    vy: undefined,
    color: {
      r: random(50, 90),
      g: random(40, 90),
      b: random(30, 50),
    },
    maxH: 170,
  };
  return grass;
}

// draws the grass
function displayGrass(grass) {
  push();
  noFill();
  strokeWeight(5);
  stroke(grass.color.r, grass.color.g, grass.color.b);
  line(grass.x1, grass.y1, grass.x2, grass.y2);
  pop();
}

// handle the grass movement
function moveGrass(grass, grassGroup) {
  // horizontal movement
  grass.vx = random(1, 3);
  grass.x1 += grass.vx;
  grass.x2 += grass.vx;

  // vertical movement
  let chance = random(0, 1);
  // higher chance to go up (and faster)
  if (chance < 0.08) {
    grass.vy = 15;
    grass.y1 -= grass.vy;
    grass.y2 -= grass.vy;
  } else if (chance > 0.95) {
    grass.vy = random(1, 15);
    grass.y1 += grass.vy;
    grass.y2 += grass.vy;
  }

  // loop back on the right when gras goes off canvas (on the left)
  if (grass.x1 > width) {
    grass.x1 = 0 - grassLen;
    grass.x2 = grass.x1 + grassLen;
    grass.y1 = random(0, height);
    grass.y2 = grass.y1;
  }

  // mappping the length of the grass to the size of the sun
  let grassTop = map(sun.size, 50, 1000, 450, 20);

  // constrain y1 and y2 in a way that it looks like grass? this was honestly a mistake, but it looks great
  // also, it gave me a great idea so the 300 word plan i wrote is put aside :3
  botLimit = 500;
  topLimit = random(grass.maxH, grassTop);
  grass.y1 = constrain(grass.y1, topLimit, botLimit);
  grass.y2 = constrain(grass.y2, botLimit, botLimit);
}

// draws the sun and handle the growth when mouse is pressed
function drawSun() {
  push();
  noStroke();
  fill(sun.color.r, sun.color.g, sun.color.b, sun.color.a);
  ellipse(sun.x, sun.y, sun.size);
  pop();

  // constrain sun size
  sun.size = constrain(sun.size, 50, 1000);

  // sun grows when mouse is pressed and shrink when mouse is not pressed
  if (mouseIsPressed) {
    sun.size += sun.grow;
  } else {
    sun.size -= sun.grow;
  }
}

// draws the main background
function drawBg() {
  // draw the main color bg
  background(145, 140, 90);

  // control the alpha channel of the blue rectangle over the bg
  light.a = map(sun.size, 50, 1000, 0, 255);

  // draws a transparent white rectangle over
  push();
  rectMode(CORNERS);
  noStroke();
  fill(light.r, light.g, light.b, light.a);
  rect(0, 0, width, height);
  pop();
}

// starts day timer and displays it
function dayTimer() {
  // start timer
  if (mouseIsPressed && sun.size > 700) {
    // this is dayTime tracking variable
    isDay = true;
    // draws the text if sun if big and mouse pressed
    drawTimer(isDay);
    // resetting seconds and counting down minutes when seconds timer gets to 0
    countDown(isDay);

    // when sun is up for too long (1min before timer ends), the grass burns
    if (totalSeconds(isDay) <= 100) {
      for (let i = 0; i < grassGroup.length; i++) {
        grassGroup[i].color.r += 0.7;
        grassGroup[i].color.g -= 0.5;
      }
    }

    // the grass also starts to shrink (30 seconds before timer ends)
    if (totalSeconds(isDay) <= 45) {
      grassShrink();
    }
  }

  // simulation ends when time's out
  endingTrigger(isDay);
}

// starts night timer and displays it
function nightTimer() {
  // start timer
  if (sun.size < 70) {
    // this is dayTime tracking variable
    isDay = false;
    // draws the text if sun if big and mouse pressed
    drawTimer(isDay);
    // resetting seconds and counting down minutes when seconds timer gets to 0
    countDown(isDay);

    // when sun is up down too long (50 seconds before timer ends), the grass rots
    if (totalSeconds(isDay) <= 50) {
      for (let i = 0; i < grassGroup.length; i++) {
        grassGroup[i].color.r -= 2;
        grassGroup[i].color.g -= 2;
        grassGroup[i].color.b -= 2;
      }
    }

    // the grass also starts to shrink (30 seconds before timer ends)
    if (totalSeconds(isDay) <= 30) {
      grassShrink();
    }
  }

  // simulation ends when time's out
  endingTrigger(isDay);
}

// ending gets triggered
function endingTrigger(isDay) {
  if (isDay && totalSeconds(isDay) < 0) {
    state = `endBurn`;
  } else if (!isDay && totalSeconds(isDay) < 0) {
    state = `endRot`;
  }
}

// reset day timer when mouse is released
function mouseReleased(isDay) {
  // cant be reset if timer is less than 50 seconds
  if (totalSeconds(isDay) > 50) {
    timerReset(isDay);
    grassColorReset();
  }
}

// resets timer when simulation, changes from intro to simulation state
function mousePressed() {
  if (state === `intro` && button.hovering === true) {
    state = `simulation`;
  }

  // cant be reset if timer is less than 50 seconds
  if (totalSeconds(isDay) > 50) {
    timerReset(isDay);
    grassColorReset();
  }
}

// display timers
function drawTimer(isDay) {
  push();
  fill(125, 16, 27);
  textSize(24);
  textAlign(RIGHT);
  // display day or night timer
  if (isDay) {
    dayTimeText = `0${numMinutesDay} : ${displayNumSeconds(
      isDay
    )} before everything burns and die`;
    text(dayTimeText, width - 25, 50);
  } else if (!isDay) {
    nightTimeText = `0${numMinutesNight} : ${displayNumSeconds(
      isDay
    )} before everything rots and die`;
    text(nightTimeText, width - 25, 50);
  }
  pop();
}

// display num seconds (adds 0 when s < 10 )
function displayNumSeconds(isDay) {
  if (isDay) {
    if (numSecondsDay >= 10) {
      let numSecond = int(numSecondsDay);
      return numSecond;
    } else if (numSecondsDay < 10) {
      let numSecond = `0` + str(int(numSecondsDay));
      return numSecond;
    }
  } else if (!isDay) {
    if (numSecondsNight >= 10) {
      let numSecond = int(numSecondsNight);
      return numSecond;
    } else if (numSecondsNight < 10) {
      let numSecond = `0` + str(int(numSecondsNight));
      return numSecond;
    }
  }
}

// calculate toal amount of seconds
function totalSeconds(isDay) {
  if (isDay) {
    let totalDay = numMinutesDay * 60 + numSecondsDay;
    return totalDay;
  } else if (!isDay) {
    let totalNight = numMinutesNight * 60 + numSecondsNight;
    return totalNight;
  }
}

// counting down seconds and minutes
function countDown(isDay) {
  if (isDay) {
    numSecondsDay -= 0.5;
    if (numSecondsDay <= 0) {
      numSecondsDay = 60;
      numMinutesDay -= 1;
    }
  } else if (!isDay) {
    numSecondsNight -= 0.5;
    if (numSecondsNight <= 0) {
      numSecondsNight = 60;
      numMinutesNight -= 1;
    }
  }
}

// reset timers
function timerReset(isDay) {
  if (isDay) {
    numMinutesDay = 2;
    numSecondsDay = 30;
  } else if (!isDay) {
    numMinutesNight = 2;
    numSecondsNight = 30;
  }
}

// makes the grass smaller
function grassShrink() {
  for (let i = 0; i < grassGroup.length; i++) {
    grassGroup[i].maxH += 9;
  }
}

// reset grass color
function grassColorReset() {
  for (let i = 0; i < grassGroup.length; i++) {
    grassGroup[i].color.r = random(50, 90);
    grassGroup[i].color.g = random(40, 90);
    grassGroup[i].color.b = random(30, 50);
  }
}
