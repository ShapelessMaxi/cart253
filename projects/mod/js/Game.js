/* this is the Game class extending the State class */
/* it takes care of creating the different elements in that specific state*/

class Game extends State {
  // create the ui and the body parts
  // create the sounds (heartbeats)
  constructor() {
    // call the parent class
    super();

    // hide the cursor
    noCursor();

    // store all body parts here
    this.bodyParts = [];
    // below is the list of body parts with their index number (order of creation), useful for future reference?
    /*
    head - bodyParts[0]
    torso - bodyParts[1]

    right shoulder - bodyParts[2]
    right shoulder - bodyParts[3]
    right hand - bodyParts[4]
    right thigh - bodyParts[5]
    right leg - bodyParts[6]
    right foot - bodyParts[7]

    left shoulder - bodyParts[8]
    left shoulder - bodyParts[9]
    left hand - bodyParts[10]
    left thigh - bodyParts[11]
    left leg - bodyParts[12]
    left foot - bodyParts[13]
*/

    // define variables for the eho algorithms
    this.fullOutlines = [];
    this.selectedOutlines = [];
    // store all the vertices forming the current body shape here
    this.fullPerimeter = [];

    // create all the body parts
    this.createBodyParts();

    // define variables for the extend algorithm
    this.angle = 1;
    this.x = 0;
    this.particleArray = [];

    // define variables used for the heartbeat oscillators
    this.firstBeat;
    this.firstDelay;
    this.secondBeat;
    this.secondDelay;
    // define variables for the repetition and the on/off fucntion of the heartbeat
    this.heartMetronome;
    this.heartbeatPace = {
      current: 2200, // time in milliseconds of the delay between each heartbeats, lower num = faster heartbeat
      min: 1700,
      max: 2200,
    };
    this.changePaceInterval;
    this.slowPaceInterval;

    // define variables for the highlighted body part animation
    this.t = 1;
    this.highlightWave;
    this.highlightedIndex = 0;

    // define variables for the background
    this.backgroundLines = [];

    // define variables for the ui
    this.frameLines = [];
    this.uiShape;
    this.nameUi;
    //define variables for the user's name
    this.nameText; // Instruction object

    // define variables for the overlay
    this.overlay = {
      color: { r: 0, g: 0, b: 0, a: 255 },
      revealSpeed: 50,
    };

    // define variables for the conversion of the name
    this.alphabet = [
      `a`,
      `b`,
      `c`,
      `d`,
      `e`,
      `f`,
      `g`,
      `h`,
      `i`,
      `j`,
      `k`,
      `l`,
      `m`,
      `n`,
      `o`,
      `p`,
      `q`,
      `r`,
      `s`,
      `t`,
      `u`,
      `v`,
      `w`,
      `x`,
      `y`,
      `z`,
    ];

    // store all instructions here
    this.instructions = [];

    // create oscillators for the heartbeat
    this.createHeartbeat();
    // start the heartbeat
    this.heartbeatInterval();

    // play soundtrack
    gameSoundtrack.play();
    gameSoundtrack.amp(0.1);
    gameSoundtrack.loop();

    // fade out intro music
    introSoundtrack.setVolume(0, 15);

    // lower the amp of the menu noise
    menuNoise.amp(0.018);

    // create background lines
    this.createBackgroundLines();

    // convert the name into r,g,b values
    this.convertName();

    // create the ui
    this.createUi();
    // create the name text to display
    this.createNameText();
    // create instructions
    this.createInstructions();
  }

  // vertex data is in separate file -> 'body-data.js'
  // assign the correct vertex data to the correct body part
  // call the createBodyPart method for each body part
  createBodyParts() {
    this.createBodyPart(bodyData.head);
    this.createBodyPart(bodyData.torso);
    this.createBodyPart(bodyData.rightShoulder);
    this.createBodyPart(bodyData.rightArm);
    this.createBodyPart(bodyData.rightHand);
    this.createBodyPart(bodyData.rightThigh);
    this.createBodyPart(bodyData.rightLeg);
    this.createBodyPart(bodyData.rightFoot);
    this.createBodyPart(bodyData.leftShoulder);
    this.createBodyPart(bodyData.leftArm);
    this.createBodyPart(bodyData.leftHand);
    this.createBodyPart(bodyData.leftThigh);
    this.createBodyPart(bodyData.leftLeg);
    this.createBodyPart(bodyData.leftFoot);
  }

  // create the body part using the assigned vertex data
  createBodyPart(data) {
    let perimeter = [];
    for (let i = 0; i < data.length; i++) {
      let vertex = createVector(data[i].x, data[i].y);
      perimeter.push(vertex);
    }
    let currentBodyPart = new BodyPart(perimeter);
    this.bodyParts.push(currentBodyPart);
  }

  // create the 2 beats with delays forming the heartbeat
  createHeartbeat() {
    let generalAmp = 0.5; // this affects the 2 heartbeats and the 2 delays
    this.createFirstBeat(generalAmp);
    this.createSecondBeat(generalAmp);
  }

  // create the oscillators for the first beat of the heart beat and a delay
  createFirstBeat(generalAmp) {
    // create the first heartbeat
    let amp = generalAmp * 0.6;
    let freq = 70;
    let type = `sine`;
    let delayAmp = generalAmp * 1;
    let delayTime = 0.2;
    let feedback = 0.1;
    this.firstBeat = new HeartBeat(
      amp,
      freq,
      type,
      delayAmp,
      delayTime,
      feedback
    );
  }

  // create the oscillators for the second beat of the heart beat and a delay
  createSecondBeat(generalAmp) {
    // create the second heartbeat
    let amp = generalAmp * 0.9;
    let freq = 75;
    let type = `sine`;
    let delayAmp = generalAmp * 0.2;
    let delayTime = 0.1;
    let feedback = 0.2;
    this.secondBeat = new HeartBeat(
      amp,
      freq,
      type,
      delayAmp,
      delayTime,
      feedback
    );
  }

  // start and stop the heart oscillators (once)
  singleHeartbeat() {
    // start the main heartbeat oscillator with a 0.38 second delay
    this.firstBeat.oscillator.start(0.38);
    // stop the main heartbeat oscillator after 0.48 second
    this.firstBeat.oscillator.stop(0.48);

    // start the secondary heartbeat oscillator a bit before the main heartbeat
    this.secondBeat.oscillator.start();
    // stop the secondary heartbeat oscillator after 0.1 second
    this.secondBeat.oscillator.stop(0.1);

    // clear the heartbeat metronome interval and restart it after every heart beat (reset the pace)
    this.resetHeartbeatMetronome();
  }

  // set the interval that plays the heartbeat
  heartbeatInterval() {
    // define the speedUp variable as 1 (no speed up)
    let speedUp = 1;

    // set interval to change the pace of the heartbeat
    this.changePaceInterval = setInterval(
      this.changePace.bind(this),
      this.heartbeatPace.current,
      speedUp
    );

    // set interval to slow down the pace of the heartbeat if its goin too fast
    let paceThreshold = 1900;
    let slowingAgent = 10;
    if (this.heartbeatPace.current < paceThreshold) {
      this.slowPaceInterval = setInterval(
        this.slowPace.bind(this),
        this.heartbeatPace.current,
        slowingAgent
      );
    }

    // set interval so the single heart beat is repeated every 2 seconds
    this.heartMetronome = setInterval(
      this.singleHeartbeat.bind(this),
      this.heartbeatPace.current
    );
  }

  // change the pace of the heartbeat at every heartbeat
  changePace(speedUp) {
    this.heartbeatPace.current = this.heartbeatPace.current / speedUp;
    this.heartbeatPace.max = this.heartbeatPace.max / speedUp;
    this.heartbeatPace.min = this.heartbeatPace.min / speedUp;

    let speedRandomizer = random(0.8, 1.2);
    this.heartbeatPace.current *= speedRandomizer;
    this.heartbeatPace.current = constrain(
      this.heartbeatPace.current,
      this.heartbeatPace.min,
      this.heartbeatPace.max
    );
    return this.heartbeatPace.current;
  }

  // slowly bring back the heartbeat to a peacefull pace
  slowPace(slowingAgent) {
    this.heartbeatPace.current += slowingAgent;

    let normalMinPace = 1700;
    if (this.heartbeatPace.min < normalMinPace) {
      this.heartbeatPace.min += slowingAgent;
    }

    let normalMaxPace = 2700;
    if (this.heartbeatPace.max < normalMaxPace) {
      this.heartbeatPace.max += slowingAgent;
    }

    return this.heartbeatPace.current;
  }

  // reset the metronome and update the pace
  resetHeartbeatMetronome() {
    // clear the interval
    clearInterval(this.heartMetronome);
    this.heartbeatInterval();
  }

  // create some lines in the background
  createBackgroundLines() {
    let numOfLines = 5;
    for (let i = 0; i < numOfLines; i++) {
      let x = random(0, width);
      let y = random(0, height);
      let currentLine = new BackgroundLine(x, y);
      this.backgroundLines.push(currentLine);
    }
  }

  // create the ui
  createUi() {
    // create the framing lines
    let x1 = 75;
    let y1 = 421;
    let x2 = 75;
    let y2 = 0;
    this.createFrameLine(x1, y1, x2, y2);
    let x3 = 675;
    let y3 = 421;
    let x4 = 675;
    let y4 = 0;
    this.createFrameLine(x3, y3, x4, y4);

    // create the main ui shape
    this.createMainShape();

    // create the name ui box
    this.createNameUi();
  }

  // create the framing lines of the ui
  createFrameLine(x1, y1, x2, y2) {
    let va = createVector(x1, y1);
    let vb = createVector(x2, y2);

    let frameLine = new Frameline(va, vb);
    // store the frame lines here
    this.frameLines.push(frameLine);
  }

  // create the main box shape of the ui
  createMainShape() {
    let va = createVector(25, 425);
    let vb = createVector(125, 425);
    let vc = createVector(150, 450);
    let vd = createVector(600, 450);
    let ve = createVector(625, 425);
    let vf = createVector(725, 425);
    let vi = createVector(725, 725);
    let vg = createVector(25, 725);
    let perimeter = [va, vb, vc, vd, ve, vf, vi, vg];

    this.uiShape = new UiShape(perimeter);
  }

  // create the name ui
  createNameUi() {
    let va = createVector(125, -10);
    let vb = createVector(625, -10);
    let vc = createVector(625, 75);
    let vd = createVector(575, 75);
    let ve = createVector(550, 60);
    let vf = createVector(200, 60);
    let vi = createVector(175, 75);
    let vg = createVector(125, 75);
    let perimeter = [va, vb, vc, vd, ve, vf, vi, vg];

    this.nameUi = new UiShape(perimeter);
  }

  // create the name text so it can be displayed
  createNameText() {
    let stringBefore = nameString;
    let stringAfter = undefined;
    let alignMode = CENTER;
    let x = width / 2;
    let y = 35;
    this.nameText = new Instruction(x, y, alignMode, stringBefore, stringAfter);

    // change the size, the font and the color of the text
    this.nameText.size = 22;
    this.nameText.font = fontSans;
    this.nameText.color.r = nameColor.r;
    this.nameText.color.g = nameColor.g;
    this.nameText.color.b = nameColor.b;
  }

  // create instructions
  createInstructions() {
    let firstColumn = 75;
    let secondColumn = 675;

    let firstRow = 500; // first row has bigger spacing
    let secondRow = 550;
    let thirdRow = 575;
    let fourthRow = 600;
    let fifthRow = 625;
    let sixthRow = 650;

    // first row, 'main' instructions (if you dont have anything selected, you cant interact)
    this.createInstruction(firstColumn, firstRow, LEFT, `S`, `select`);
    this.createInstruction(secondColumn, firstRow, RIGHT, `D`, `deselect`);

    // first column, key used : 0-4
    this.createInstruction(firstColumn, secondRow, LEFT, `0`, `stretch`);
    this.createInstruction(firstColumn, thirdRow, LEFT, `1`, `grow`);
    this.createInstruction(firstColumn, fourthRow, LEFT, `2`, `shrink`);
    this.createInstruction(firstColumn, fifthRow, LEFT, `3`, `extend`);
    this.createInstruction(firstColumn, sixthRow, LEFT, `4`, `withdraw`);

    // second column, key used : 5-9
    this.createInstruction(secondColumn, secondRow, RIGHT, `5`, `colorize`);
    this.createInstruction(secondColumn, thirdRow, RIGHT, `6`, `decolorize`);
    this.createInstruction(secondColumn, fourthRow, RIGHT, `7`, `fully echo`);
  }

  // create an instruction using parameters given in the createInstructions() method
  createInstruction(x, y, alignMode, key, instruction) {
    let stringBefore = `press '${key}' to ... .  .`;
    let stringAfter = `press '${key}' to ${instruction} ..?`;

    let currentInstruction = new Instruction(
      x,
      y,
      alignMode,
      stringBefore,
      stringAfter
    );
    this.instructions.push(currentInstruction);
  }

  // conversion of the name into r,g,b values
  convertName() {
    // check the position of each letter and store into 3 arrays
    // r array -> index[0], [3], [6], [...]
    let rPosition = 0; // keep track of the increment
    let rValues = []; // store the converted values of the letters here
    let rSum = 0; // store the sum of the r values here
    let rMean = 0; // store the mean value of all the r values here

    // g array -> index[1], [4], [7], [...]
    let gPosition = 1; // keep track of the increment
    let gValues = []; // store the converted values of the letters here
    let gSum = 0; // store the sum of the g values here
    let gMean = 0; // store the mean value of all the g values here

    // b array -> index[2], [5], [8], [...]
    let bPosition = 2; // keep track of the increment
    let bValues = []; // store the converted values of the letters here
    let bSum = 0; // store the sum of the b values here
    let bMean = 0; // store the mean value of all the b values here

    // loop through the name array containing the letters of the name
    for (let i = 0; i < nameArray.length; i++) {
      let currentLetter = nameArray[i];

      // get the alphabet index the current letter corresponds to
      let alphabetIndex = this.checkAplhabetIndex(currentLetter);

      // apply the conersion value
      let currentValue = alphabetIndex * 10;

      // store the letters and the converted values in the corresponding arrays
      if (i === rPosition) {
        // store the converted value here
        rValues.push(currentValue);

        // go to next r position (+3 from the last)
        rPosition += 3;
      } else if (i === gPosition) {
        // store the converted value here
        gValues.push(currentValue);

        // go to next g position (+3 from the last)
        gPosition += 3;
      } else if (i === bPosition) {
        // store the converted value here
        bValues.push(currentValue);

        // go to next b position (+3 from the last)
        bPosition += 3;
      }
    }

    // calculate the final color value
    // check if theres enough letters to convert
    if (nameArray.length === 1) {
      // only 1 letter to convert, g and b are default values
      nameColor.r = this.calculateColorValue(rSum, rValues);
      nameColor.g = 100;
      nameColor.b = 100;
    } else if (nameArray.length === 2) {
      // only 2 letter to convert, b is default value
      nameColor.r = this.calculateColorValue(rSum, rValues);
      nameColor.g = this.calculateColorValue(gSum, gValues);
      nameColor.b = 100;
    } else {
      // 3 letters or more to convert, no default values
      nameColor.r = this.calculateColorValue(rSum, rValues);
      nameColor.g = this.calculateColorValue(gSum, gValues);
      nameColor.b = this.calculateColorValue(bSum, bValues);
    }
  }

  // check if an item is inside an array, return true or false
  checkAplhabetIndex(letter) {
    let j = 0;
    while (j < this.alphabet.length) {
      let currentAlphabetLetter = this.alphabet[j];
      if (letter.toLowerCase() === currentAlphabetLetter) {
        return j;
      } else {
        j++;
      }
    }
  }

  // calculate the mean of the array
  calculateColorValue(sum, valuesArray) {
    for (let i = 0; i < valuesArray.length; i++) {
      let currentValue = valuesArray[i];
      sum += currentValue;
    }
    let mean = sum / valuesArray.length;

    // map the mean to have a lighter color (dark color on dark background isnt really satisfying..)
    mean = map(mean, 0, 255, 100, 255);
    return mean;
  }

  // draw an overlay rectangle
  drawOverlay() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(
      this.overlay.color.r,
      this.overlay.color.g,
      this.overlay.color.b,
      this.overlay.color.a
    );
    rect(width / 2, height / 2, width, height);
    pop();

    // decrease the alpha to reveal the menu
    this.overlay.color.a -= this.overlay.revealSpeed;
  }

  // draw the background, the ui, the body and the atoms
  // start the selection highlight animation
  update() {
    // call the parent class
    super.update();

    // draw the background
    background(5, 8, 10);

    // display background animation
    for (let i = 0; i < this.backgroundLines.length; i++) {
      let currentLine = this.backgroundLines[i];
      currentLine.display();
      currentLine.movement();
    }

    // display the ui
    this.uiShape.display();
    this.nameUi.display();
    this.nameText.display();
    this.frameLines[0].display();
    this.frameLines[1].display();

    // resets the frame line color (changes when algorithms are activated)
    this.frameLines[0].color.a = 75;
    this.frameLines[1].color.a = 75;

    // display the instructions
    for (let i = 0; i < this.instructions.length; i++) {
      let currentInstruction = this.instructions[i];
      if (!currentInstruction.discovered) {
        currentInstruction.display();
      } else {
        currentInstruction.display();
      }
    }

    // displaying body parts
    for (let i = 0; i < this.bodyParts.length; i++) {
      let currentBodyPart = this.bodyParts[i];
      currentBodyPart.displayPolygon();
    }

    // call methods from Body class every 3 frames and every 8 frames
    let framecountSteps = [3, 8];
    for (let i = 0; i < framecountSteps.length; i++) {
      let currentFramecount = framecountSteps[i];
      if (frameCount % currentFramecount === 0) {
        // itterate through the list of body parts
        for (let i = 0; i < this.bodyParts.length; i++) {
          let currentBodyPart = this.bodyParts[i];

          // reset the atoms arrays
          currentBodyPart.atomArray = [];

          // populate each arrays with atoms
          currentBodyPart.populate();

          // display atoms
          currentBodyPart.displayAtoms();
        }
      }
    }

    // display the particles in the particle array
    // array is filled with extend() method
    for (let i = 0; i < this.particleArray.length; i++) {
      let currentParticle = this.particleArray[i];
      currentParticle.display();
      currentParticle.flicker();
    }

    // makes the highlighted bodypart blink slowly
    this.highlightAnimation();

    // draw the overlay
    if (this.overlay.color.a > 0) {
      this.drawOverlay();
    }

    //display the new polygons
    for (let i = 0; i < this.fullOutlines.length; i++) {
      let currentOutline = this.fullOutlines[i];
      currentOutline.displayFullOutline();
      console.log(currentOutline.fullPerimeter.xCenter);
    }
  }

  // select/deselect
  // strecth algorithm
  // internal growth / shrinkage method
  // extend algorithm / remove extension method
  // colorize / decolorize
  keyPressed() {
    // select a body part with `S` key, deselect with `D` key
    this.selectDeselect();

    // generative algorithm that stretch the selected bodypart in a weird way
    // press '0'
    this.strecthSelected();

    // interactive method that makes the atoms grow or shrink
    // press '1'
    this.internalGrowth();
    // press '2'
    this.internalShrinkage();

    // define the length of the acosh curve
    let numOfSteps = 300;
    // generative algorithm that extends an external growth
    // press '3'
    this.extendSelected(numOfSteps);
    // press '4' to remove first extension
    this.removeExtension(numOfSteps);

    // interactive method that makes the atoms change color (defined by user name)
    // press '5' to colorize some of the atoms
    this.colorize();
    // press '6' to decolorize some of the atoms
    this.decolorize();

    // generative algorithm that creates instances of the current body shape
    // press '7' to produce a full body echo
    this.fullBodyEcho();
  }

  // select the next bodypart, or deselect the current selected bodypart
  selectDeselect() {
    // single out the select and deselect instruction from instructions array
    let selectInstruction = this.instructions[0];
    let deselectInstruction = this.instructions[1];

    // loop back to the start of the array
    if (this.highlightedIndex >= this.bodyParts.length) {
      this.highlightedIndex = 0;
    }

    // loop through the bodyparts
    let currentIndex = this.highlightedIndex;
    // when current index is at 0, cannot substract 1 to get the previous bodypart
    if (currentIndex === 0) {
      // the last selected bodypart will be the last of the array
      let lastIndex = 13;
      // 83 -> `S` key
      if (keyCode === 83) {
        // discover the select instruction
        if (!selectInstruction.discovered) {
          selectInstruction.discovered = true;
        }

        // change the selected bodypart color to the highlight color
        this.selectedColorChange(currentIndex);
        // keep track of the selected bodypart
        this.bodyParts[currentIndex].selected = true;

        // reset the last bodypart color to normal
        this.deselectedColorChange(lastIndex);
        // keep track of the deselected bodypart
        this.bodyParts[lastIndex].selected = false;

        // add 1 to the counter
        this.highlightedIndex += 1;

        // 68 -> `D` key
      } else if (keyCode === 68) {
        // reset the highlighted bodypart selected color to normal
        // now previous because we counted +1 when selecting it
        this.deselectedColorChange(lastIndex);

        // keep track of the deselected bodypart
        this.bodyParts[lastIndex].selected = false;
      }
    } else {
      // when current index is not at 0, substract 1 to get the previous bodypart
      let previousIndex = currentIndex - 1;
      // 83 -> `S` key
      if (keyCode === 83) {
        // discover the select instruction
        if (!selectInstruction.discovered) {
          selectInstruction.discovered = true;
        }

        // reset the last bodypart selected color to normal
        this.selectedColorChange(currentIndex);
        // keep track of the selected bodypart
        this.bodyParts[currentIndex].selected = true;

        // change the selected bodypart color to the highlight color
        this.deselectedColorChange(previousIndex);
        // keep track of the deselected bodypart
        this.bodyParts[previousIndex].selected = false;

        // add 1 to the counter
        this.highlightedIndex += 1;

        // 68 -> `D` key
      } else if (keyCode === 68) {
        // discover the deselect instruction
        if (!deselectInstruction.discovered) {
          deselectInstruction.discovered = true;
        }

        // reset the highlighted bodypart selected color to normal
        // now previous because we counted +1 when selecting it
        this.deselectedColorChange(previousIndex);

        // keep track of the deselected bodypart
        this.bodyParts[previousIndex].selected = false;
      }
    }
  }

  // takes care of the color change when selecting a bodypart
  selectedColorChange(bodypartIndex) {
    // define the highlight color
    let highlightColor = {
      r: 207,
      g: 112,
      b: 157,
      a: 40,
    };

    // apply the color change
    this.bodyParts[bodypartIndex].color.r = highlightColor.r;
    this.bodyParts[bodypartIndex].color.g = highlightColor.g;
    this.bodyParts[bodypartIndex].color.b = highlightColor.b;
    this.bodyParts[bodypartIndex].color.a = highlightColor.a;
  }

  // takes care of the color change when deselecting a bodypart
  deselectedColorChange(bodypartIndex) {
    // define the normal unhighlighted color
    let normalColor = {
      r: 88,
      g: 224,
      b: 135,
      a: 10,
    };

    this.bodyParts[bodypartIndex].color.r = normalColor.r;
    this.bodyParts[bodypartIndex].color.g = normalColor.g;
    this.bodyParts[bodypartIndex].color.b = normalColor.b;
    this.bodyParts[bodypartIndex].color.a = normalColor.a;
  }

  // makes the highlighted bodypart blink slowly
  highlightAnimation() {
    let animationSpeed = 0.05;
    let darkestAlpha = 35;
    let lightestAlpha = 100;

    this.highlightWave = sin(this.t);
    this.highlightWave = map(
      this.highlightWave,
      -1,
      1,
      darkestAlpha,
      lightestAlpha
    );
    this.t += animationSpeed;
    for (let i = 0; i < this.bodyParts.length; i++) {
      if (this.bodyParts[i].selected) {
        this.bodyParts[i].color.a = this.highlightWave;
      }
    }
  }

  // make the ui frame lines a bit more vibrant
  frameLightUp() {
    this.frameLines[0].color.a = 190;
    this.frameLines[1].color.a = 190;
  }

  // generative algorithm activated by pressing `1` key
  strecthSelected() {
    // single out the stretch instruction from instructions array
    let stretchInstruction = this.instructions[2];

    // define the intesity of the streching
    let intensity = random(3, 6);

    // 48 and 96 -> `0` key
    if (keyCode === 48 || keyCode === 96) {
      for (let i = 0; i < this.bodyParts.length; i++) {
        let currentBodyPart = this.bodyParts[i];
        if (currentBodyPart.selected) {
          // discover the select instruction
          if (!stretchInstruction.discovered) {
            stretchInstruction.discovered = true;
          }
          // activate the strech method
          this.stretch(currentBodyPart, intensity);

          // speed up the heartbeat
          if (this.heartbeatPace.current > 800) {
            let speedUp = 1.8;
            this.changePace(speedUp);
          }

          // make the ui frame lines a bit more vibrant
          this.frameLightUp();
        }
      }
    }
  }

  // stretch a body part in a weird way
  stretch(bodypart, intensity) {
    // store all verts that will be modified here
    let modifiableVerts = [];

    // store these body parts in an array: head, right/left hand and foot
    // for these parts: the first and last vertex should not be moved (connect with other body part)
    let head = this.bodyParts[0];
    let rightHand = this.bodyParts[4];
    let rightFoot = this.bodyParts[7];
    let leftHand = this.bodyParts[10];
    let leftFoot = this.bodyParts[13];
    let fixed2Array = [head, rightHand, rightFoot, leftHand, leftFoot];

    // check if its the torso
    // torso is the only body part that just the third and the seventh vertex are not fixed
    let torso = this.bodyParts[1];
    if (bodypart === torso) {
      // define the number of vertices that will be modified (torso only has 2 not-fixed vertices)
      let numOfVerts = floor(random(1, 3));
      for (let i = 0; i < numOfVerts; i++) {
        let currentVert = random(bodypart.perimeter);
        while (
          currentVert === bodypart.perimeter[0] ||
          currentVert === bodypart.perimeter[1] ||
          currentVert === bodypart.perimeter[3] ||
          currentVert === bodypart.perimeter[4] ||
          currentVert === bodypart.perimeter[5] ||
          currentVert === bodypart.perimeter[7] ||
          currentVert === bodypart.perimeter[8]
        ) {
          currentVert = random(bodypart.perimeter);
        }
        modifiableVerts.push(currentVert);
      }
    } else {
      // define the number of vertices that will be modified (these parts have 7 not-fixed vertices)
      let numOfVerts = floor(random(2, 8));
      // checks if the bodypart is inside this array, returns true or false
      // for these parts: the first and the last vertex should not be moved (connect with other body part)
      let insideFixed2Array = this.checkInsideArray(bodypart, fixed2Array);
      if (insideFixed2Array) {
        for (let i = 0; i < numOfVerts; i++) {
          let currentVert = random(bodypart.perimeter);
          while (
            currentVert === bodypart.perimeter[0] ||
            currentVert === bodypart.perimeter[8]
          ) {
            currentVert = random(bodypart.perimeter);
          }
          modifiableVerts.push(currentVert);
        }
      } else {
        // define the number of vertices that will be modified (these parts have 4 not-fixed vertices)
        let numOfVerts = floor(random(2, 5));
        // if not the torso and not in the fixed 2 array, it will be right/left soulder, arm, thigh and leg
        // for these parts: the first, fifth, sixth and last vertex should not be moved (connect with other body part)
        for (let i = 0; i < numOfVerts; i++) {
          let currentVert = random(bodypart.perimeter);
          while (
            currentVert === bodypart.perimeter[0] ||
            currentVert === bodypart.perimeter[4] ||
            currentVert === bodypart.perimeter[5] ||
            currentVert === bodypart.perimeter[7] ||
            currentVert === bodypart.perimeter[8]
          ) {
            currentVert = random(bodypart.perimeter);
          }
          modifiableVerts.push(currentVert);
        }
      }
    }

    // make the selected vertices move
    this.stretchMovement(bodypart, intensity, modifiableVerts);
  }

  // apply a movement to vertices of a body part
  stretchMovement(bodypart, intensity, modifiableVerts) {
    // this determines how the vertices move
    let strecthValue = sin(frameCount) * intensity;

    // apply the movement to the selected vertices
    for (let i = 0; i < modifiableVerts.length; i++) {
      let currentVert = modifiableVerts[i];

      if (currentVert.x < bodypart.spawnBox.xCenter) {
        // the modifable vert is left of the center, to expand we substract the value
        currentVert.x -= strecthValue;
      } else {
        // the modifable vert is right of the center, to expand we add the value
        currentVert.x += strecthValue;
      }

      if (currentVert.y < bodypart.spawnBox.yCenter) {
        // the modifable vert is higher than the center, to expand we substract the value
        currentVert.y -= strecthValue;
      } else {
        // the modifable vert is lower than the center, to expand we add the value
        currentVert.y += strecthValue;
      }
    }
  }

  // make the atoms of the selected grow semi-randomly
  internalGrowth() {
    // single out the internal growth instruction from instructions array
    let internalGrowthInstruction = this.instructions[3];

    // 49 and 97 -> `1` key
    if (keyCode === 49 || keyCode === 97) {
      for (let i = 0; i < this.bodyParts.length; i++) {
        let currentBodyPart = this.bodyParts[i];
        if (currentBodyPart.selected) {
          // discover the select instruction
          if (!internalGrowthInstruction.discovered) {
            internalGrowthInstruction.discovered = true;
          }
          // start the growth
          let chance = random();
          if (chance < 0.5) {
            let growValue = random(0, 2);
            currentBodyPart.atomSize.max += growValue;
          }
          // speed up the heartbeat
          if (this.heartbeatPace.current > 800) {
            let speedUp = 1.8;
            this.changePace(speedUp);
          }
          // make the ui frame lines a bit more vibrant
          this.frameLightUp();
        }
      }
    }
  }

  // make the atoms of the selected shrink semi-randomly
  internalShrinkage() {
    // single out the internal shrinkage instruction from instructions array
    let internalShrinkageInstruction = this.instructions[4];

    // 50 and 98 -> `2` key
    if (keyCode === 50 || keyCode === 98) {
      for (let i = 0; i < this.bodyParts.length; i++) {
        let currentBodyPart = this.bodyParts[i];
        if (currentBodyPart.selected) {
          // discover the select instruction
          if (!internalShrinkageInstruction.discovered) {
            internalShrinkageInstruction.discovered = true;
          }
          // start the growth
          let chance = random();
          if (chance < 0.5) {
            let growValue = random(0, 2);
            currentBodyPart.atomSize.max -= growValue;
          }
          // make the ui frame lines a bit more vibrant
          this.frameLightUp();
        }
      }
    }
  }

  // grow an external shape from one of the selected body part's vertex
  extendSelected(numOfSteps) {
    // single out the extend instruction from instructions array
    let extendInstruction = this.instructions[5];

    // 51 and 99 -> `3` key
    if (keyCode === 51 || keyCode === 99) {
      for (let i = 0; i < this.bodyParts.length; i++) {
        let currentBodyPart = this.bodyParts[i];
        if (currentBodyPart.selected) {
          // discover the select instruction
          if (!extendInstruction.discovered) {
            extendInstruction.discovered = true;
          }

          // activate the extend method
          let intensity = random(0, 50); // intensity of the curve
          this.extend(
            numOfSteps,
            currentBodyPart,
            intensity,
            this.particleArray
          );

          // speed up the heartbeat (make a function soon)
          if (this.heartbeatPace.current > 800) {
            let speedUp = 1.8;
            this.changePace(speedUp);
          }

          // make the ui frame lines a bit more vibrant
          this.frameLightUp();
        }
      }
    }
  }

  // generative algorithm using hyperbolic arc-cosine from Math object
  // from -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh
  extend(numOfSteps, bodypart, intensity, storageArray) {
    // select a random vertex to be the origin of the growth
    let origin = random(bodypart.perimeter);

    // reset the angle every time the method is called
    this.angle = 1;

    for (let j = 0; j < numOfSteps; j++) {
      let r = Math.acosh(this.angle) * intensity;

      // check if selected vertex is left from center of the body part (return true or false)
      let isLeft = this.checkLeft(origin.x, bodypart.spawnBox.xCenter);

      // check if selected vertex is higher than center of the body part (return true or false)
      let isTop = this.checkTop(origin.y, bodypart.spawnBox.yCenter);

      // if the vertex selected is left from the center of the body part, draw the curve from right to left
      // j needs to be negative
      if (isLeft) {
        let newX = -j;

        // if the vertex selected is higher than the center of the body part, draw the curve from bottom to top
        // r needs to be negative
        if (isTop) {
          let newY = -r;
          let currentStep = new Particle(origin.x, origin.y, newX, newY);
          storageArray.push(currentStep);

          // if the vertex selected is lower than the center of the body part, draw the curve from bottom to top
          // r needs to be negative
        } else {
          let newY = r;
          let currentStep = new Particle(origin.x, origin.y, newX, newY);
          storageArray.push(currentStep);
        }

        // if the vertex selected is right from the center of the body part, draw the curve from right to left
        // j needs to be positive
      } else {
        let newX = j;

        // if the vertex selected is higher than the center of the body part, draw the curve from bottom to top
        // r needs to be negative
        if (isTop) {
          let newY = -r;
          let currentStep = new Particle(origin.x, origin.y, newX, newY);
          storageArray.push(currentStep);

          // if the vertex selected is lower than the center of the body part, draw the curve from bottom to top
          // r needs to be negative
        } else {
          let newY = r;
          let currentStep = new Particle(origin.x, origin.y, newX, newY);
          storageArray.push(currentStep);
        }
      }

      // increase the angle given to the acosh equation
      this.angle += 0.05;
    }
  }

  // remove the first acosh curve generated with extend algorithm
  removeExtension(numOfSteps) {
    // 52 and 100 -> `4` key
    if (keyCode === 52 || keyCode === 100) {
      if (this.particleArray.length > 0) {
        // single out the removeExtension instruction from instructions array
        let removeExtensionInstruction = this.instructions[6];
        // discover the select instruction
        if (!removeExtensionInstruction.discovered) {
          removeExtensionInstruction.discovered = true;
        }
      }
      for (let i = 0; i < numOfSteps; i++) {
        this.particleArray.shift();
      }
    }
  }

  // algorithm to add more color to the atoms
  colorize() {
    // single out the extend instruction from instructions array
    let colorizeInstruction = this.instructions[7];

    // 53 and 101 -> `5` key
    if (keyCode === 53 || keyCode === 101) {
      for (let i = 0; i < this.bodyParts.length; i++) {
        let currentBodyPart = this.bodyParts[i];
        if (currentBodyPart.selected) {
          // discover the select instruction
          if (!colorizeInstruction.discovered) {
            colorizeInstruction.discovered = true;
          }

          // up the percentage of colorized atoms for this bodypart
          currentBodyPart.colorizedAtoms += 0.05;
          currentBodyPart.colorizedAtoms = constrain(
            currentBodyPart.colorizedAtoms,
            0,
            1
          );

          // speed up the heartbeat (make a function soon)
          if (this.heartbeatPace.current > 800) {
            let speedUp = 1.8;
            this.changePace(speedUp);
          }

          // make the ui frame lines a bit more vibrant
          this.frameLightUp();
        }
      }
    }
  }

  // algorithm to substract color to the atoms
  decolorize() {
    // single out the extend instruction from instructions array
    let decolorizeInstruction = this.instructions[8];

    // 54 and 102 -> `6` key
    if (keyCode === 54 || keyCode === 102) {
      for (let i = 0; i < this.bodyParts.length; i++) {
        let currentBodyPart = this.bodyParts[i];
        if (currentBodyPart.selected) {
          // discover the select instruction
          if (currentBodyPart.colorizedAtoms > 0) {
            if (!decolorizeInstruction.discovered) {
              decolorizeInstruction.discovered = true;
            }
          }

          // up the percentage of colorized atoms for this bodypart
          currentBodyPart.colorizedAtoms -= 0.05;
          currentBodyPart.colorizedAtoms = constrain(
            currentBodyPart.colorizedAtoms,
            0,
            1
          );
        }
      }
    }
  }

  // algorithm that creates a echoing outline of the current body shape
  fullBodyEcho() {
    // single out the extend instruction from instructions array
    let fullEchoInstruction = this.instructions[9];

    // 55 and 103 -> `7` key
    if (keyCode === 55 || keyCode === 103) {
      // discover the full body echo instruction
      if (!fullEchoInstruction.discovered) {
        fullEchoInstruction.discovered = true;
      }

      // loop through the array containing all the body parts
      for (let i = 0; i < this.bodyParts.length; i++) {
        let currentBodyPart = this.bodyParts[i];
        // loop through the perimeter array of each body parts
        for (let j = 0; j < currentBodyPart.perimeter.length; j++) {
          let currentVector = currentBodyPart.perimeter[j];
          this.fullPerimeter.push(currentVector);
        }
      }

      // create the outline objects
      let smallScale = 1.35;
      let smallOutline = new BodyOutline(
        this.fullPerimeter,
        undefined,
        smallScale
      );
      this.fullOutlines.push(smallOutline);
    }
    // create an instance of the all the perimeters combined (full body shape)
    // have the color be user name value
    // actually have multiple instances, each one is a bit bigger than the privous
    // animate the alpha of the instance to decrease as soon as created
    // when the alpha of the first instance is down to like 5, display the next instance
  }

  // algorithm that creates a echoing outline of the selected body part
  localEcho() {
    // same as full body, but for the selected part only
  }

  // check if a point is left or right of another point
  checkLeft(x1, x2) {
    if (x1 < x2) {
      return true;
    } else {
      return false;
    }
  }

  // check if a point is higher or lower than another point
  checkTop(y1, y2) {
    if (y1 < y2) {
      return true;
    } else {
      return false;
    }
  }

  // check if an item is inside an array, return true or false
  checkInsideArray(item, array) {
    for (let i = 0; i < array.length; i++) {
      let currentItem = array[i];
      if (item === currentItem) {
        return true;
      } else {
        return false;
      }
    }
  }
}
