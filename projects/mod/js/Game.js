/* this is the Game class extending the State class */
/* it takes care of creating the different elements in that specific state,
including the body parts, the ui, the heartbeat sound, the modifying methods and some small animations */

class Game extends State {
  // create the ui and the body parts
  // create the sounds (heartbeats)
  constructor() {
    super();

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

    // create all the body parts
    this.createBodyParts();

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

    //  define variables for the background
    this.backgroundLines = [];

    // define variables for the ui
    this.frameLines = [];
    this.ui;
    this.nameUi;
    //define variables for the user's name
    this.name = `maxi`; // user input in the future
    this.nameText; // Instruction object

    // define variables for instructions
    this.instructions = [];
    this.selectInstruction;
    this.deselectInstruction;
    this.stretchInstruction;
    this.internalGrowthInstruction;
    this.internalShrinkageInstruction;

    // create oscillators for the heartbeat
    this.createHeartbeat();
    // start the heartbeat
    this.heartbeatInterval();

    // create background lines
    this.createBackgroundLines();

    // create the ui
    this.createUi();
    // create the name text to display
    this.createNameText(this.name);
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
    let currentBodyPart = new Body(perimeter);
    this.bodyParts.push(currentBodyPart);
  }

  // create the 2 beats with delays forming the heartbeat
  createHeartbeat() {
    let generalAmp = 0.04; // this affects the 2 heartbeats and the 2 delays
    this.createFirstBeat(generalAmp);
    this.createSecondBeat(generalAmp);
  }

  // create the oscillators for the first beat of the heart beat and a delay
  createFirstBeat(generalAmp) {
    // create the first heartbeat
    let amp = generalAmp * 0.6;
    let freq = 70;
    let type = `sine`;
    this.firstBeat = new Heartbeat(amp, freq, type);
    this.firstBeat.createOscillator();

    // create the first delay
    let delayAmp = generalAmp * 1;
    let delayTime = 0.2;
    let feedback = 0.1;
    this.firstDelay = new HeartDelay(delayAmp, delayTime, feedback);
    this.firstDelay.createDelay(this.firstBeat);
  }

  // create the oscillators for the second beat of the heart beat and a delay
  createSecondBeat(generalAmp) {
    // create the second heartbeat
    let amp = generalAmp * 0.9;
    let freq = 75;
    let type = `sine`;
    this.secondBeat = new Heartbeat(amp, freq, type);
    this.secondBeat.createOscillator();

    // create the second delay
    let delayAmp = generalAmp * 0.2;
    let delayTime = 0.1;
    let feedback = 0.2;
    this.secondDelay = new HeartDelay(delayAmp, delayTime, feedback);
    this.secondDelay.createDelay(this.secondBeat);
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

  // reset the metronome (update the pace)
  resetHeartbeatMetronome() {
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

    let frameLine = new Frame(va, vb);
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

    this.ui = new Ui(va, vb, vc, vd, ve, vf, vi, vg);
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

    this.nameUi = new Ui(va, vb, vc, vd, ve, vf, vi, vg);
  }

  // create the name text so it can be displayed
  createNameText(name) {
    let stringBefore = name;
    let stringAfter = undefined;
    let alignMode = CENTER;
    let x = width / 2;
    let y = 35;
    this.nameText = new Instruction(x, y, alignMode, stringBefore, stringAfter);

    // set the discover parameter to true (maybe something cool to do in the futur with that??)
    this.nameText.discovered = true;
    // change the size of the text
    this.nameText.size = 22;
  }

  // create instructions
  createInstructions() {
    let firstColumnX = 75;
    let secondColumnX = 675;

    let firstRowY = 500; // first row has bigger spacing
    let secondRowY = 550;
    let thirdRowY = 575;
    let fourthRowY = 600;

    this.createSelectInstruction(firstColumnX, firstRowY);
    this.createDeselectInstruction(secondColumnX, firstRowY);
    this.createStretchInstruction(firstColumnX, secondRowY);
    this.createInternalGrowInstruction(firstColumnX, thirdRowY);
    this.createInternalShrinkageInstruction(firstColumnX, fourthRowY);
  }

  // create the select instruction
  createSelectInstruction(x, y) {
    let stringBefore = `press 'S' to ... .  .`;
    let stringAfter = `press 'S' to select a part of your body`;
    let alignMode = LEFT;
    this.selectInstruction = new Instruction(
      x,
      y,
      alignMode,
      stringBefore,
      stringAfter
    );
    this.instructions.push(this.selectInstruction);
  }

  // create the deselect instruction
  createDeselectInstruction(x, y) {
    let stringBefore = `press 'D' to ... .  .`;
    let stringAfter = `press 'D' to deselect a part of your body`;
    let alignMode = RIGHT;
    this.deselectInstruction = new Instruction(
      x,
      y,
      alignMode,
      stringBefore,
      stringAfter
    );
    this.instructions.push(this.deselectInstruction);
  }

  // create the strech instruction
  createStretchInstruction(x, y) {
    let stringBefore = `press '1' to ... .  .`;
    let stringAfter = `press '1' to strech ?`;
    let alignMode = LEFT;
    this.stretchInstruction = new Instruction(
      x,
      y,
      alignMode,
      stringBefore,
      stringAfter
    );
    this.instructions.push(this.stretchInstruction);
  }

  // create the internal growth instruction
  createInternalGrowInstruction(x, y) {
    let stringBefore = `press '2' for ... .  .`;
    let stringAfter = `press '2' for internal growth ?`;
    let alignMode = LEFT;
    this.internalGrowthInstruction = new Instruction(
      x,
      y,
      alignMode,
      stringBefore,
      stringAfter
    );
    this.instructions.push(this.internalGrowthInstruction);
  }

  // create the internal shrinkage instruction
  createInternalShrinkageInstruction(x, y) {
    let stringBefore = `press '3' for ... .  .`;
    let stringAfter = `press '3' for internal shrinkage ?`;
    let alignMode = LEFT;
    this.internalShrinkageInstruction = new Instruction(
      x,
      y,
      alignMode,
      stringBefore,
      stringAfter
    );
    this.instructions.push(this.internalShrinkageInstruction);
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
    this.ui.display();
    this.nameUi.display();
    this.nameText.display(this.nameText.stringBefore);
    this.frameLines[0].display();
    this.frameLines[1].display();

    // resets the frame line color (changes when algorithms are activated)
    this.frameLines[0].color.a = 75;
    this.frameLines[1].color.a = 75;

    // display the instructions
    for (let i = 0; i < this.instructions.length; i++) {
      let currentInstruction = this.instructions[i];
      if (!currentInstruction.discovered) {
        currentInstruction.display(currentInstruction.stringBefore);
      } else {
        currentInstruction.display(currentInstruction.stringAfter);
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

    // makes the highlighted bodypart blink slowly
    this.highlightAnimation();
  }

  // select/deselect
  // strecth algorithm
  // internal growth / shrinkage method
  keyPressed() {
    // select a body part with `S` key, deselect with `D` key
    this.selectDeselect();

    // generative algorithm that stretch the selected bodypart in a weird way
    this.strecthSelected();

    // interactive method that makes the atoms grow or shrink
    this.internalGrowth();
    this.internalShrinkage();
  }

  // select the next bodypart, or deselect the current selected bodypart
  selectDeselect() {
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
        if (!this.selectInstruction.discovered) {
          this.selectInstruction.discovered = true;
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
        if (!this.selectInstruction.discovered) {
          this.selectInstruction.discovered = true;
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
        if (!this.deselectInstruction.discovered) {
          this.deselectInstruction.discovered = true;
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
    // define the intesity of the streching
    let intensity = random(3, 6);

    // 49 -> `1` key
    if (keyCode === 49) {
      for (let i = 0; i < this.bodyParts.length; i++) {
        let currentBodyPart = this.bodyParts[i];
        if (currentBodyPart.selected) {
          // discover the select instruction
          if (!this.stretchInstruction.discovered) {
            this.stretchInstruction.discovered = true;
          }
          // activate the strech method
          this.stretch(currentBodyPart, intensity);

          // speed up the heartbeat
          if (this.heartbeatPace.current > 800) {
            let speedUp = 1.8;
            this.changePace(speedUp);
          }
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

    // make the ui frame lines a bit more vibrant
    this.frameLightUp();
  }

  // make the atoms of the selected grow semi-randomly
  internalGrowth() {
    // 50 -> `2` key
    if (keyCode === 50) {
      for (let i = 0; i < this.bodyParts.length; i++) {
        let currentBodyPart = this.bodyParts[i];
        if (currentBodyPart.selected) {
          // discover the select instruction
          if (!this.internalGrowthInstruction.discovered) {
            this.internalGrowthInstruction.discovered = true;
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
    // 51 -> `3` key
    if (keyCode === 51) {
      for (let i = 0; i < this.bodyParts.length; i++) {
        let currentBodyPart = this.bodyParts[i];
        if (currentBodyPart.selected) {
          // discover the select instruction
          if (!this.internalShrinkageInstruction.discovered) {
            this.internalShrinkageInstruction.discovered = true;
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

  // check if an item is inside an array
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